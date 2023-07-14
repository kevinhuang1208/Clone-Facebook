from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User
from app.models.db import db
from app.models.messages import Message
from app.forms.message_form import MessageForm

message_routes = Blueprint('messages', __name__)


@message_routes.route('')
@login_required
def get_all_messages():

    all_messages = Message.query.all()

    res = [message.to_dict() for message in all_messages]

    return {"messages": res}

@message_routes.route("/<int:userid>/messages")
def get_user_messages(userid):
    """Route to get messages for a specific user"""

    user_messages = Message.query.filter(Message.user_id == userid).all()
    if user_messages:
        res = []
        for message in user_messages:
            message_dict = message.to_dict()
            message_dict["user"] = message.messageuserid.to_dict()
            res.append(message_dict)
        return {"messages": res}
    else:
        return {"messages": []}

@message_routes.route("/new", methods=["POST"])
@login_required
def post_message():
    """Route to message in the log"""
    form = MessageForm()

    user_id = current_user.id

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_message = Message(
            user_id=user_id,
            message=form.data["message"]
        )
        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()
    else:
        return jsonify({'error': form.errors})




@message_routes.route("/<int:message_id>", methods=["PUT"])
def edit_message_route(message_id):
    """Route to edit a message"""

    message = Message.query.get(message_id)

    form = MessageForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        message.message = form.data["message"]
        db.session.commit()
        edited_message = message.to_dict()
        return edited_message
    else:
        return {'error': form.errors}




@message_routes.route('/<int:message_id>/delete', methods =['DELETE'])
def delete_message_route(message_id):
    message_to_delete = Message.query.get(message_id)

    if message_to_delete is None:
        return {'Message': 'Message cannot be found'}

    db.session.delete(message_to_delete)
    db.session.commit()
    return {'Message': 'Message deleted!'}
