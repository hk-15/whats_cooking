from django.db import models

class Recipe(models.Model):
    name = models.CharField(max_length=100, unique=True)
    url_source = models.URLField(null=True, blank=True, verbose_name='url')
    source = models.CharField(null=True, blank=True)
    times_cooked = models.PositiveIntegerField(default=0, verbose_name='number of times cooked')
    average_rating = models.PositiveIntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Meal(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(default=0)
    date_cooked = models.DateField()
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.recipe.name} cooked on {self.date_cooked}'

class Comment(models.Model):
    text = models.TextField()
    meal = models.OneToOneField(Meal, on_delete=models.CASCADE, primary_key=True)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Comment on {self.recipe.name} at {self.created}'