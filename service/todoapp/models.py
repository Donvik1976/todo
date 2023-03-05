from django.db import models
from users.models import User


# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=256)
    repo_url = models.URLField(unique=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class TODO(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField(null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.user
