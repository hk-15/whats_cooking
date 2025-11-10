from rest_framework import serializers
from .models import *

class MealSerializer(serializers.ModelSerializer):
    comment = serializers.SlugRelatedField(slug_field="text", read_only=True)

    class Meta:
        model = Meal
        fields = ('id', 'name', 'recipe', 'rating', 'date_cooked', 'comment')

class RecipeSerializer(serializers.ModelSerializer):
    comments = serializers.SlugRelatedField(many=True, slug_field="text", read_only=True)
    meals = serializers.SlugRelatedField(many=True, slug_field="id", read_only=True)

    class Meta:
        model = Recipe
        fields = ('id', 'name', 'url_source', 'source', 'times_cooked', 'average_rating', 'comments', 'meals')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('text', 'meal', 'recipe')