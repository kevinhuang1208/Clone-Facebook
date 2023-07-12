from flask import request
from flask_socketio import SocketIO, emit, join_room, leave_room
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "https://facequote.onrender.com/"
    ]
else:
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
# @socketio.on("connect")
# def handle_connect():
#     print("Client Connected")

# @socketio.on("user_join")
# def handle_user_join(sessionId):
#     print(f"User {sessionId} has joined!")
#     users[sessionId] = request.sid

# @socketio.on("new_message")
# def handle_new_message(message):
#     sessionId = None
#     for user in users:
#         if users[user] == request.sid:
#             sessionId = user
#     emit("chat", {"message": message, "sessionId": sessionId})

# @socketio.on("send message")
# def message(data):
#     room = data['channel']
#     emit('broadcast message', data['message'], room=room)
# @socketio.on('join')
# def on_join(data):
#     firstname = data['firstname']
#     room = data['room']
#     join_room(room)
#     emit(firstname + ' has entered the room.', to=room)

# @socketio.on('leave')
# def on_leave(data):
#     firstname = data['firstname']
#     room = data['room']
#     leave_room(room)
#     emit(firstname + ' has left the room.', to=room)
