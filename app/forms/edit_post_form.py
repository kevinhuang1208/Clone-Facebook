from flask_wtf import FlaskForm
from wtforms import StringField, DateField, FileField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed,FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class EditPostForm(FlaskForm):
    """Form to edit a Post page"""
    status = StringField('status', validators=[DataRequired()])
    # upload = StringField('upload', validators=[DataRequired()])
    upload = FileField('upload', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
