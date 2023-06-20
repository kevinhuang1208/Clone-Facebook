from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed,FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS
# from app.models import User


class PostForm(FlaskForm):
    """Form to create an anime page"""
    status = StringField('status', validators=[DataRequired()])
    # upload = StringField('upload', validators=[DataRequired()])
    upload = FileField('upload', validators=[FileRequired(),FileAllowed(list(ALLOWED_EXTENSIONS))])
