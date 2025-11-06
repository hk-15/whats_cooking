from rest_framework import serializers
from .models import *

class MealSerializer(serializers.ModelSerializer):
    comment = serializers.SlugRelatedField(slug_field="text", queryset=Comment.objects.all())

    class Meta:
        model = Meal
        fields = ('id', 'name', 'recipe', 'rating', 'date_cooked', 'comment')

class RecipeSerializer(serializers.ModelSerializer):
    comments = serializers.SlugRelatedField(many=True, slug_field="text", queryset=Comment.objects.all())
    meals = serializers.SlugRelatedField(many=True, slug_field="id", queryset=Meal.objects.all())

    class Meta:
        model = Recipe
        fields = ('id', 'name', 'url_source', 'source', 'times_cooked', 'average_rating', 'comments', 'meals')