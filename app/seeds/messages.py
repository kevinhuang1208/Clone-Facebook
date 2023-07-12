from sqlalchemy.sql import text
from app.models.messages import Message
from app.models.db import db, environment, SCHEMA
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_messages():
    message1 = Message(
        message='Wow this open discussion page is so cool!', created_at=date(2023, 7, 1), user_id=1)
    message2 = Message(
        message='I know right?? I am glad the CEO of FaceQuote was able to implement this feature!', created_at=date(2023, 7, 2), user_id=2)
    message3 = Message(
        message='Gromp.', created_at=date(2023, 7, 3), user_id=9)



    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
