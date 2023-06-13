from sqlalchemy.sql import text
from app.models.comments import Comment
from app.models.db import db, environment, SCHEMA
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(
        description='Your dreams and aspirations are within reach. Believe in yourself, stay focused, and work hard. You have the power to turn your dreams into reality.', upload='', created_at=date(2023, 2, 7), user_id=10, post_id=1)
    comment2 = Comment(
        description='Embrace the journey of self-discovery and personal growth. Each step you take, no matter how small, brings you closer to becoming the best version of yourself.', upload='', created_at=date(2023, 2, 26), user_id=9, post_id=2)
    comment3 = Comment(
        description='This has to be the great qutoe of all time!', upload='', created_at=date(2023, 2, 8), user_id=8, post_id=3)
    comment4 = Comment(
        description='I solemnly swear that I agree with you.', upload='', created_at=date(2023, 3, 1), user_id=7, post_id=4)
    comment5 = Comment(
        description='The Dark Knight is the GMOAT forreal!', upload='', created_at=date(2023, 3, 6), user_id=6, post_id=5)
    comment6 = Comment(
        description='This quote is the best!', upload='', created_at=date(2023, 3, 15), user_id=5, post_id=6)
    comment7 = Comment(
        description='This hits hard....', upload='', created_at=date(2023, 4, 27), user_id=4, post_id=7)
    comment8 = Comment(
        description='There is no better quote than this and that is a fact.', upload='', created_at=date(2023, 4, 30), user_id=3, post_id=8)
    comment9 = Comment(
        description='You are capable of overcoming any adversity that comes your way. Trust in your resilience and inner strength. Remember, challenges are opportunities for growth and transformation. Keep pushing forward, and you will emerge stronger and wiser.', upload='', created_at=date(2023, 5, 28), user_id=2, post_id=9)
    comment10 = Comment(
        description='You have the power to create a positive impact in your life and the lives of others.', upload='', created_at=date(2023, 5, 28), user_id=1, post_id=10)


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
