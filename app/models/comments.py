from .db import db, add_prefix_for_prod, SCHEMA, environment
# from .reviews import Reviews
# from .episodes import Episodes
from .user import User
from datetime import date
class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    description = db.Column(db.String(1000), nullable = False)
    created_at = db.Column(db.Date, default=date.today())
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)


    commentuserid = db.relationship("User", back_populates = 'comment')

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'createdAt': self.created_at,
            'postId': self.post_id,
            'userId': self.user_id
        }
