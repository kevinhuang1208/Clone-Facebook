from sqlalchemy.sql import text
from app.models.posts import Post
from app.models.db import db, environment, SCHEMA
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(
        status='"May the Force be with you." - Star Wars', upload='', created_at=date(2023, 1, 11), user_id=1)
    post2 = Post(
        status='"To infinity and beyond!" - Toy Story', upload='', created_at=date(2023, 1, 17), user_id=2)
    post3 = Post(
        status='"Hasta la vista, baby." - Terminator 2: Judgment Day', upload='', created_at=date(2023, 2, 6), user_id=3)
    post4 = Post(
        status='"I solemnly swear that I am up to no good." - Harry Potter series', upload='', created_at=date(2023, 2, 22), user_id=4)
    post5 = Post(
        status='"Why so serious?" - The Dark Knight', upload='', created_at=date(2023, 3, 3), user_id=5)
    post6 = Post(
        status='"I feel the need...the need for speed!" - Top Gun', upload='', created_at=date(2023, 3, 11), user_id=6)
    post7 = Post(
        status='"The only thing we have to fear is fear itself." - Franklin D. Roosevelt', upload='', created_at=date(2023, 4, 20), user_id=7)
    post8 = Post(
        status='"I have a dream." - Martin Luther King Jr.', upload='', created_at=date(2023, 4, 26), user_id=8)
    post9 = Post(
        status='"The greatest glory in living lies not in never falling, but in rising every time we fall." - Nelson Mandela', upload='', created_at=date(2023, 5, 12), user_id=9)
    post10 = Post(
        status='"The only way to do great work is to love what you do." - Steve Jobs', upload='', created_at=date(2023, 5, 19), user_id=10)


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
