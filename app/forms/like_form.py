from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length, NumberRange

class LikeForm(FlaskForm):
    pass
