import graphene
from .models import Movie,User
from graphene_django.types import DjangoObjectType
import graphql_jwt

from django.contrib.auth.hashers import make_password,check_password

class MovieType(DjangoObjectType):
    class Meta:
        model=Movie


class UserType(DjangoObjectType):
    class Meta:
        model=User

class Query(graphene.ObjectType):
    all_movies = graphene.List(MovieType)
    movie = graphene.Field(MovieType, id=graphene.Int())
    search_movie = graphene.List(MovieType, name=graphene.String())

    def resolve_all_movies(self,info,**kwargs):
        return Movie.objects.all()

    def resolve_movie(self,info,id):
        # id = kwargs.get('id')
        # name=kwargs.get('name')
        if id is not None:
            return Movie.objects.get(pk=id)
       
            
    def resolve_search_movie(self,info,name):   
        # name=kwargs.get('name')
        return Movie.objects.filter(name__icontains=name)


# creating
class MovieCreateMutation(graphene.Mutation):
    class Arguments:
        
      name=graphene.String(required=True)

    movie = graphene.Field(MovieType)
    def mutate(self,info,name):
        # name=kwargs.get('name')
        movie = Movie.objects.create(name=name)
        
        return MovieCreateMutation(movie=movie)

# updating
class MovieUpdate(graphene.Mutation):
    class Arguments:
      id=graphene.Int(required=True)
      name=graphene.String(required=True)
      hero=graphene.String(required=True)
    
    movie = graphene.Field(MovieType)
    def mutate(self,info,id,name,hero):
        newMovie = Movie.objects.get(pk=id)
        if(newMovie is not None):
            newMovie.name = name
            newMovie.hero=hero
        newMovie.save()
        return MovieUpdate(movie=newMovie)

# deleting
class Moviedelete(graphene.Mutation):
    class Arguments:
       id=graphene.Int(required=True)

    movie = graphene.Field(MovieType)
    def mutate(self,info,id):
        movie = Movie.objects.get(pk=id)
        
        movie.delete()
        
        return Moviedelete(movie=None)


class Signingup(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    user=graphene.Field(UserType)
    def mutate(self,info,email,password):
            newUser = User.objects.create(
                email=email, password = make_password(password)
            )
            newUser.save()
            return Signingup(user=newUser)


class Mutation:
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    create_movie= MovieCreateMutation.Field()
    update_movie=MovieUpdate.Field()
    delete_movie=Moviedelete.Field()


    signup = Signingup.Field()
