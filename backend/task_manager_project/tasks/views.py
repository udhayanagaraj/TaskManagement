from django.shortcuts import render
from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer


class TaskListCreateApiView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer