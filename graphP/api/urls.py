from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
   path('allMovies',views.getAllMovies),
   path('movie/<int:id>',views.getSingleMovie),
   path('createMovie',views.createMovie),

]
