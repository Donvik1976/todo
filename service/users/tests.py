from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient

from users.views import UserModelViewSet
from users.models import User


# Create your tests here.

class TestUserViewSet(TestCase):

    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'admin_123'
        self.email = 'admin@admin.ru'

        self.data = {"username": "EvPetr", "first_name": "Евгений", "last_name": "Петров",
                     "email": "evpeter21@gmail.com"}
        self.data_put = {"username": "GrigMed", "first_name": "Григорий", "last_name": "Медведков",
                         "email": "grig_med@gmail.com"}
        self.url = '/api/users/'
        self.admin = User.objects.create_superuser(username=self.name, password=self.password, email=self.email)

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        client = APIClient()
        user = User.objects.create(**self.data)
        response = client.get(f'{self.url}{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest_api(self):
        client = APIClient()
        user = User.objects.create(**self.data)
        response = client.put(f'{self.url}{user.id}/', self.data_put)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin_api(self):
        client = APIClient()
        user = User.objects.create(**self.data)
        client.login(username=self.name, password=self.password)
        response = client.put(f'{self.url}{user.id}/', self.data_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        auth = User.objects.get(id=user.id)
        self.assertEqual(auth.first_name, 'Григорий')
        self.assertEqual(auth.last_name, 'Медведков')
        self.assertEqual(auth.email, "grig_med@gmail.com")

    def tearDown(self) -> None:
        pass
