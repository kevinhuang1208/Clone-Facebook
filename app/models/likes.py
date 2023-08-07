from .db import db, add_prefix_for_prod, SCHEMA, environment
from .user import User
from datetime import date
class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    like = db.Column(db.Boolean, default = False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)


    likeuserid = db.relationship("User", back_populates = 'comment')

    def to_dict(self):

        user = User.query.get(self.user_id)

        return {
            'id': self.id,
            'like': self.like,
            'userFirstName': user.firstname,
            'userLastName': user.lastname,
            'postId': self.post_id,
            'userId': self.user_id
        }
