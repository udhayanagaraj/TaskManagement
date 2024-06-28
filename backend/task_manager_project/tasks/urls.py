from django.urls import path
from .views import TaskListCreateApiView,TaskDetailAPIView

urlpatterns = [
    path('tasks/', TaskListCreateApiView.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', TaskDetailAPIView.as_view(), name='task-detail'),
]