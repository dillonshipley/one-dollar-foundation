from django.db import models

# Create your models here.

class Donor(models.Model):
        firstName = models.CharField(max_length=50)
        lastName = models.CharField(max_length=50)
        email = models.CharField(max_length=200)
        processed = models.BooleanField()

        def _str_(self):
            return (self.firstName + " " + self.lastName) 
