import graphene
from graphene import ObjectType, Schema, String, List, Field, Int
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

    # Simple scheme
    # all_user = List(UserType)
    # all_project = List(ProjectType)
    # all_todo = List(TODOType)
    #
    # def resolve_all_user(root, info):
    #     return User.objects.all()
    #
    # def resolve_all_project(root, info):
    #     return Project.objects.all()
    #
    # def resolve_all_todo(root, info):
    #     return TODO.objects.all()


    # Scheme with parameter

    project_by_id = Field(ProjectType, id=Int(required=True))

    def resolve_project_by_id(root, info, id=None):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    todo_by_user = List(TODOType, first_name=String(required=False))

    def resolve_todo_by_user(root, info, first_name=None):
        todos = TODO.objects.all()
        if first_name:
            todos = todos.filter(user__first_name=first_name)
        return todos


schema = Schema(query=Query)
