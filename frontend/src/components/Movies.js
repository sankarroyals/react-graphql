import React, { useEffect, useState } from 'react'

import { gql } from "@apollo/client";
import { useQuery,useMutation,useLazyQuery } from '@apollo/client';
import { ADD_MOVIE, DELETE_MOVIE,  GET_MOVIES, GET_SINGLE_MOVIE, UPDATE_MOVIE } from '../Queries';
// import { AllMovies } from '../FunctionsQueries';








const Movies = () => {
 
  const [name,setName] = useState('')
  const [data,setdata] = useState([])
  const [singleMovie,setSingleMovie] = useState('')

  // use the variable assign method when we have only to read data
  const get_all_movies = useQuery(GET_MOVIES)

  // use useLazyQuery when we need to pass variables to the query methods
  const [movie] = useLazyQuery(GET_SINGLE_MOVIE)
  
  const [createMovie] = useMutation(ADD_MOVIE) 
  const [deleteMovie] = useMutation(DELETE_MOVIE) 
  const [updateMovie] = useMutation(UPDATE_MOVIE) 
  
  
 

 
 
 useEffect(()=>{
  if(get_all_movies.data){
      
    console.log(get_all_movies.data['allMovies'])
   
    setdata(get_all_movies.data.allMovies)
   }
  
 },[get_all_movies])
 


  const Add = () =>{
    createMovie({variables:{name:name}}).then(res=>{
       setdata(prev=>[...prev,res.data.createMovie.movie])
       setName('')
      console.log(res)
     })
  }



  const DeletMovie = (index) =>{
   
   deleteMovie({variables:{id: +index}}).then(res=>{
  
    setdata(data.filter(d=>+d.id !== +index))
    console.log(res)
   })
  
  }

  const show = (index) =>{
   
    movie({variables:{id:+index}}).then(res=>{
   setSingleMovie(res.data.movie)
  console.log(res.data.movie)
 })
   }


   
  const update = (e,index) =>{
  
    updateMovie({variables:{id: +index,name:e.target.previousSibling.value,hero:"mukesh"}}).then(res=>{
      console.log(res)
    })
  }

  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
      <div>
      <input type="text" value={name} onChange={e=>{setName(e.target.value)}}/>
      <button onClick={Add}>add</button>

      
    </div>
    <div >
      {data.length>0 && data.map((m,index)=>(
        <div key={m.id}>{m.id} - {m.name} - {m.hero} 
        <button onClick={e=>DeletMovie(m.id)}>delete</button> 
        <button onClick={e=>show(m.id)}>Show</button>
        <input type="text" />
        <button onClick={e=>update(e,m.id)}>Update</button>
        
        </div>
      ))}
      </div>

      <div>Selected Movie</div>
      <div>
        {singleMovie!=='' && 
        <>{singleMovie.id}-{singleMovie.name}</>
        }
      </div>


      <button onClick={e=>{
        console.log(get_all_movies)
      }}>Show All</button>
    </div>

  )
}

export default Movies