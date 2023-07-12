from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User
from app.models.db import db
from app.models.posts import Post
from app.models.comments import Comment
from app.forms.post_form import PostForm
from app.forms.comment_form import CommentForm
from app.forms.edit_post_form import EditPostForm
from app.api.auth_routes import validation_errors_to_error_messages
from .aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

post_routes = Blueprint('posts', __name__)


@post_routes.route('')
@login_required
def get_all_posts():

    all_posts = Post.query.all()

    res = [post.to_dict() for post in all_posts]

    return {"posts": res}

@post_routes.route('/new', methods=['POST'])
@login_required
def post_post():
    '''This route posts a post'''
    form = PostForm()

    user_id = current_user.id

    form["csrf_token"].data = request.cookies["csrf_token"]


    if form.validate_on_submit():

        awsupload = form.data['upload']
        awsupload.filename = get_unique_filename(awsupload.filename)
        uploaded_upload = upload_file_to_s3(awsupload)
        aws_link = uploaded_upload['url']


        new_post = Post(
            user_id=int(user_id),
            status=form.data["status"],
            upload=aws_link
        )

        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@post_routes.route('/<int:id>')
def get_one_post(id):
    '''Route to get a single post based on id'''
    post = Post.query.get(id)
    post_dict = post.to_dict()
    return {'post': post_dict}


@post_routes.route('/<int:id>/edit', methods=["PUT"])
def edit_post(id):
    '''Route to get a single post based on id'''
    post = Post.query.get(id)

    form = EditPostForm()

    if form.data["upload"]:
        awsupload = form.data['upload']
        awsupload.filename = get_unique_filename(awsupload.filename)
        uploaded_upload = upload_file_to_s3(awsupload)
        aws_link = uploaded_upload['url']

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        post.status = form.data["status"]
        if len(aws_link) > 0:
            post.upload = aws_link
        db.session.commit()
        edited_post = post.to_dict()
        return edited_post
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@post_routes.route('/<int:id>', methods=['DELETE'])
def delete_post(id):

    post_to_delete = Post.query.get(id)

    file_delete = remove_file_from_s3(post_to_delete.upload)

    if file_delete:
        db.session.delete(post_to_delete)
        db.session.commit()
        return {'message': 'Post deleted!'}

    else:
        return "Did not work."

@post_routes.route('/comments')
@login_required
def get_all_comments():

    all_comments = Comment.query.all()

    res = [comment.to_dict() for comment in all_comments]

    return {"comments": res}

@post_routes.route("/<int:id>/comments")
def get_post_comments(id):
    """Route to get comments for a specific post"""

    post_comments = Comment.query.filter(Comment.post_id == id).all()
    if post_comments:
        res = []
        for comment in post_comments:
            commentDict = comment.to_dict()
            commentDict["user"] = comment.commentuserid.to_dict()
            res.append(commentDict)
        return {"comments": res}
    else:
        return {"comments": []}

@post_routes.route("/<int:id>/comments/new", methods=["POST"])
def post_post_comment(id):
    """Route to post a comment on a post"""
    user_id = current_user.id
    post_id=id
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_comment = Comment(
            user_id=user_id,
            post_id=post_id,
            description=form.data["description"]
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    else:
        return jsonify({'error': form.errors})




@post_routes.route("/<int:post_id>/comments/<int:comment_id>", methods=["PUT"])
def edit_comment_route(post_id, comment_id):
    """Route to edit a comment"""
    # user_id = current_user.id
    comment = Comment.query.get(comment_id)
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        comment.description = form.data["description"]
        db.session.commit()
        edited_comment = comment.to_dict()
        return edited_comment
    else:
        return {'error': form.errors}




@post_routes.route('/<int:post_id>/comments/<int:comment_id>/delete',methods =['DELETE'])
def delete_comment_route(post_id, comment_id):
    # print('what is this even working')
    comment_to_delete = Comment.query.get(comment_id)
    # print('------comment to delete------',comment_to_delete)

    if comment_to_delete is None:
        return {'message': 'Comment cannot be found'}

    db.session.delete(comment_to_delete)
    db.session.commit()
    return {'message': 'Comment deleted!'}
