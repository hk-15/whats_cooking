from .views import RecipeViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('recipe', RecipeViewset, basename='recipe')

urlpatterns = router.urls