from api.models import  Movie, User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
   class Meta:
        model = User
        fields = '__all__'
      
      
class MovieSerializer(serializers.ModelSerializer):
   class Meta:
        model = Movie
        fields = '__all__'

