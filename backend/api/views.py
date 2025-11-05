from django.shortcuts import render
from api.serializers import RecipeSerializer
from rest_framework import viewsets, permissions
from .models import *
from rest_framework import response

class RecipeViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def list(self, request):
        queryset = Recipe.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return response(serializer.data)