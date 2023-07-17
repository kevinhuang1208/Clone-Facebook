from flask import request
from flask_socketio import SocketIO, emit, join_room, leave_room
import os
from app.models.db import environment

if environment == 'production':
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

#BELOW IS A SKELETON FUNCTION THAT A SOCKET WILL TYPICALLY LOOK LIKE
# @socketio.on("event-type")
# def function_to_handle_event(data_included_with_event):
#     # code to follow

users = {}
# handle chat messages
@socketio.on("chat")
def handle_chat(data):
        emit("chat", data, broadcast=True)
