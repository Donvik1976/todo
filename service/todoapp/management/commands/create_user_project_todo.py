from django.core.management import BaseCommand

from todoapp.models import Project, TODO
from users.models import User


class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        user = User.objects.create(username='Victor', password='123', email='admin@admin.ru', )

        project = Project.objects.create(name='test1', repo_url='https://github.com/test1/1')
        project.users.add(user.id)

        project_instance = Project.objects.get(id=project.id)
        user_instance = User.objects.get(id=user.id)
        TODO.objects.create(project=project_instance, text='Наша заметка', user=user_instance)
