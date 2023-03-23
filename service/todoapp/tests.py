from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase
from mixer.backend.django import mixer

from users.models import User
from todoapp.views import ProjectModelViewSet
from todoapp.models import Project

# Create your tests here.


class TestProjectViewSet(TestCase):

    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'admin_123'
        self.email = 'admin@admin.ru'
        self.admin = User.objects.create_superuser(username=self.name, password=self.password, email=self.email)
        self.data = {"name": "test 8", "repo_url": "https://github.com/test8/6", "users": 1}
        self.data_put = {"name": "test 10", "repo_url": "https://github.com/test10/5", "users": [4]}
        self.url = '/api/project/'

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data, format='json')
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def tearDown(self) -> None:
        pass


class TestTODOViewSet(APITestCase):
    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'admin_123'
        self.email = 'admin@admin.ru'
        self.data_user = {"username": "EvPetr", "first_name": "Евгений", "last_name": "Петров",
                          "email": "evpeter21@gmail.com"}
        self.user = User.objects.create(**self.data_user)
        self.data = {"name": "test 8", "repo_url": "https://github.com/test8/6", "users": self.user}
        self.data_put = {"name": "test 10", "repo_url": "https://github.com/test10/5", "users": self.user}
        self.admin = User.objects.create_superuser(username=self.name, password=self.password, email=self.email)
        self.url = '/api/project/'

    def test_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_admin(self):
        proj = Project.objects.create(**self.data)
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{proj.id}/', {"name": "test 10",
                                                                "repo_url": "https://github.com/test10/5",
                                                                "users": self.user})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_mixer(self):
        proj = mixer.blend(Project)
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{proj.id}/', {"name": "test 10",
                                                             "repo_url": "https://github.com/test10/5",
                                                             "users": self.user})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def tearDown(self) -> None:
        pass
