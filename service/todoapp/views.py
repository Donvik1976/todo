from rest_framework.mixins import DestroyModelMixin, UpdateModelMixin, ListModelMixin, CreateModelMixin, RetrieveModelMixin
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer

from .filters import ProjectFilter, TODOFilter
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


class TODODestroyModelMixin(DestroyModelMixin):
    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()


class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TODOModelViewSet(CreateModelMixin, ListModelMixin, UpdateModelMixin, RetrieveModelMixin, TODODestroyModelMixin, GenericViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    filterset_class = TODOFilter
    pagination_class = TODOLimitOffsetPagination
