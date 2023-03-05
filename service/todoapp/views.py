from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer

from .filters import ProjectFilter
from .models import Project, TODO
from .serializers import ProjectModelSerializer, TODOModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination


class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    filterset_fields = ['project']
    pagination_class = TODOLimitOffsetPagination

