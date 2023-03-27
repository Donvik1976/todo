import graphene
from graphene import ObjectType, Schema, String, List
from graphene_django import DjangoObjectType
from users.models import User
from todoapp.models import Project, TODO


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'


class Query(ObjectType):

    all_user = List(UserType)
    all_project = List(ProjectType)
    all_todo = List(TODOType)

    def resolve_all_user(root, info):
        return User.objects.all()

    def resolve_all_project(root, info):
        return Project.objects.all()

    def resolve_all_todo(root, info):
        return TODO.objects.all()


schema = Schema(query=Query)
