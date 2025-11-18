from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('recipe', RecipeViewset, basename='recipe')
router.register('meal', MealViewset, basename='meal')
router.register('comment', CommentViewset, basename='comment')
router.register('register', RegisterViewset, basename='register')
router.register('login', LoginViewset, basename='login')

urlpatterns = router.urls