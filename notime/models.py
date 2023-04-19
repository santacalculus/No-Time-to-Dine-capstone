from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class WaitTime(models.Model) :
    wait_time = models.IntegerField()
    creation_time = models.DateTimeField(auto_now_add = True)

class Line(models.Model) :
    num_people = models.IntegerField()


