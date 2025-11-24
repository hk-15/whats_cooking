from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
from knox import views as knox_views

router = DefaultRouter()
router.register('recipe', RecipeViewset, basename='recipe')
router.register('meal', MealViewset, basename='meal')
router.register('comment', CommentViewset, basename='comment')
router.register('register', RegisterViewset, basename='register')
router.register('login', LoginViewset, basename='login')

urlpatterns = [
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('', include(router.urls)),
]