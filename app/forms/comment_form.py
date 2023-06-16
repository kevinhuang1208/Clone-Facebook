from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange

class CommentForm(FlaskForm):
    description = StringField('description', validators=[DataRequired(), Length(min=2, max=1000)])
