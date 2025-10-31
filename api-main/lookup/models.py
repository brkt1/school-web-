from django.db import models
from commons.utils.model_utils import CommonsModel

# Create your models here.
class Level(CommonsModel):
    name = models.TextField()
    description = models.TextField()

class Package(CommonsModel):
    name = models.TextField()
    description = models.TextField()

class ClassType(CommonsModel):
    name = models.TextField()
    description = models.TextField()

class Shift(CommonsModel):
    name = models.TextField()
    description = models.TextField()