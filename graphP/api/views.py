import email
import os
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from api import serializers
from api.models import Movie
from api.serializers import MovieSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import  IsAuthenticated
from rest_framework.response import Response


# Create your views here.

@api_view(['GET'])
def getAllMovies(request):
    movies= Movie.objects.all()
    serializer=MovieSerializer(movies,many=True)
    return Response(serializer.data)



@api_view(['GET'])
def getSingleMovie(request,id):
    movies= Movie.objects.get(pk=id)
    serializer=MovieSerializer(movies,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createMovie(request):
    movie=Movie.objects.create(
        name=request.data['name'],
        hero=request.data['hero']
    )
    serializer=MovieSerializer(movie,many=False)
    return Response(serializer.data)