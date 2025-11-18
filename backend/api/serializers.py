from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model()

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
        fields = ('id', 'name', 'url_source', 'source', 'ratings_sum', 'comments', 'meals')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('text', 'meal', 'recipe')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password')
        extra_kwargs = {'password':{'write_only':True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop('password', None)
        return ret