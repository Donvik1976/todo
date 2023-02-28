from django.core.management.base import BaseCommand
from users.models import User
from django.utils.crypto import get_random_string


class Command(BaseCommand):
    help = 'This command to automatically create a superuser and a few test users'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Указывает сколько пользователей необходимо создать')
        parser.add_argument('-A', '--admin', action='store_true', help='Дать пользователю права администратора')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        admin = kwargs['admin']

        for i in range(total):
            if admin:
                User.objects.create_superuser(username=admin, email='admin@admin.ru', password='123')
            else:
                username = get_random_string(5)
                User.objects.create_user(username=username, email=f'{username}@mail.ru')
