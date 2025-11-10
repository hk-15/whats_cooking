from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('recipe', RecipeViewset, basename='recipe')
router.register('meal', MealViewset, basename='meal')
router.register('comment', CommentViewset, basename='comment')

urlpatterns = router.urls