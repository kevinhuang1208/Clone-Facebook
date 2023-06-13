from .db import db, add_prefix_for_prod, SCHEMA, environment
# from .reviews import Reviews
# from .episodes import Episodes
from .user import User
class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    status = db.Column(db.String(1000), nullable = False)
    upload = db.Column(db.String(500),nullable = False)
    created_at = db.Column(db.Date,nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)


    userid = db.relationship("User", back_populates = 'post')
