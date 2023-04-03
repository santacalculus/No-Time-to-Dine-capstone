from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Predictions(models.Model):
    curr_time = models.DateTimeField(auto_now=True)


