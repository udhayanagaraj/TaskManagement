from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=100)
    desc = models.TextField()
    status = models.BooleanField(default=False)
    due_date = models.DateField(null=True,blank=True)

    def __str__(self):
        return self.title