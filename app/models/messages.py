from .db import db, add_prefix_for_prod, SCHEMA, environment
from .user import User
from datetime import date
class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    message = db.Column(db.String(1000), nullable = False)
    created_at = db.Column(db.Date, default=date.today())
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)


    messageuserid = db.relationship("User", back_populates = 'message')

    def to_dict(self):

        user = User.query.get(self.user_id)

        return {
            'id': self.id,
            'message': self.message,
            'userFirstName': user.firstname,
            'userLastName': user.lastname,
            'createdAt': self.created_at,
            'userId': self.user_id
        }
