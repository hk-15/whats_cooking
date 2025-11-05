from rest_framework import serializers
from .models import *

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('recipe', 'meal', 'text')

class MealSerializer(serializers.ModelSerializer):
    comment = CommentSerializer()

    class Meta:
        model = Meal
        fields = ('id', 'recipe', 'rating', 'date_cooked', 'comment')

class RecipeSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    meals = MealSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = ('id', 'name', 'url_source', 'source', 'times_cooked', 'average_rating', 'comments', 'meals')