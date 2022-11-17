import { gql } from "@apollo/client";
export const GET_MOVIES = gql`
query{
    allMovies{
        id
        name
        hero
    }
}`

export const ADD_MOVIE = gql`
mutation($name: String!) {
    createMovie(name: $name){
      movie{
        id
        name
        hero
      }
    }
  }`


export const GET_SINGLE_MOVIE = gql`
query($id: Int!) {
    movie(id:$id){
        id
        name
        hero

    }
    
  }`


  export const DELETE_MOVIE = gql`
  mutation($id: Int!) {
    deleteMovie(id:$id){
      movie{
        id
      }
    }
    
  }`

  
  export const UPDATE_MOVIE = gql`
  mutation($id: Int!,$name: String!,$hero: String!) {
    updateMovie(id:$id,name:$name,hero:$hero){
      movie{
        id
        name
        hero
      }
    }
    
  }`
