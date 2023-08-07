from .db import db, add_prefix_for_prod, SCHEMA, environment
from .user import User
from .comments import Comment
from .likes import Like
from datetime import date

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    status = db.Column(db.String(1000), nullable = False)
    upload = db.Column(db.String(500),nullable = False)
    created_at = db.Column(db.Date, default=date.today())
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)


    userid = db.relationship("User", back_populates = 'post')

    def to_dict(self):

        comments_search = Comment.query.filter_by(post_id = self.id).all()
        comments = []
        for comment in comments_search:
            comments.append(comment.to_dict())
        comments_length = len(comments)

        likes_search = Like.query.filter_by(post_id = self.id).all()
        likes = []
        for like in likes_search:
            likes.append(like.to_dict())
        likes_length = len(likes)

        user = User.query.get(self.user_id)

        return {
            'id': self.id,
            'userId': self.user_id,
            'userFirstName': user.firstname,
            'userLastName': user.lastname,
            'status': self.status,
            'upload': self.upload,
            'createdAt': self.created_at,
            'comments': comments,
            'commentCount': comments_length,
            'likeCount': likes_length
        }
