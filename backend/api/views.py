from django.shortcuts import render
from api.serializers import *
from rest_framework import viewsets, permissions
from .models import *
from rest_framework.response import Response

class RecipeViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def list(self, request):
        queryset = Recipe.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
class MealViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Meal.objects.all()
    serializer_class = MealSerializer

    def list(self, request):
        queryset = Meal.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)