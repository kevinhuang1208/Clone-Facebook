from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstname='Demo', lastname='User', email='demo@aa.io', password='password')
    marnie = User(
        firstname='Marnie', lastname='Marn', email='marnie@aa.io', password='password')
    bobbie = User(
        firstname='Bobbie', lastname='Anderson', email='bobbie@aa.io', password='password')
    rose = User(
        firstname='Rose', lastname='Parker', email='roseparker@aa.io', password='password4')
    mary = User(
        firstname='Mary', lastname='Lamb', email='marylamb@aa.io', password='password5')
    kayla = User(
        firstname='Kayla', lastname='Johnson', email='kaylajohnson@aa.io', password='password6')
    keith = User(
        firstname='Keith', lastname='Mendes', email='keithmendes@aa.io', password='password7')
    chris = User(
        firstname='Chris', lastname='Mason', email='chrismason@aa.io', password='password8')
    gromp = User(
        firstname='Grompy', lastname='Gromp', email='grompygromp@aa.io', password='password9')
    ian = User(
        firstname='Ian', lastname='Ten', email='ianten@aa.io', password='password10')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(rose)
    db.session.add(mary)
    db.session.add(kayla)
    db.session.add(keith)
    db.session.add(chris)
    db.session.add(gromp)
    db.session.add(ian)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
