import React, { useState, useEffect } from 'react';
import "./row.css";
import axios from "../../../utils/axios";
import movieTrailer from 'movie-trailer';
import Youtube from 'react-youtube';

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]); 
  const [trailerUrl,setTrailerUrl]=useState('')
  const baseUrl = "https://image.tmdb.org/t/p/w500"; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetch URL:", fetchUrl);
        const request = await axios.get(fetchUrl);
        console.log("Request data:", request.data);
        setMovies(request.data.results);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, [fetchUrl]);  
  
  //the handle click function
   const handleClick=(movie)=>{
    if(trailerUrl){
      setTrailerUrl(''); // this is to set the trailer url to empty when clicking another image
    }else{
      
        movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url)=>{
          console.log("url" ,url)
          const urlParams= new URLSearchParams(new URL (url).search);
          console.log(urlParams)
          console.log(urlParams.get('v'))
          setTrailerUrl(urlParams.get("v"))
        })
      
    }
   }
//this one is an object 
const opts ={
  height: "390",
  width : "100%",
  playerVars :{
    autoplay : 1,
  }
}
  return (
    <div className="row">
      <h1> {title}</h1>
      <div className="row-posters">
        {movies?.map((movie,index)=>(
      <img
      onClick={()=>handleClick(movie)}
       key={index} src={`${baseUrl}${isLargeRow? movie.poster_path : movie.backdrop_path}`} alt={movie.name} 
      className={`row-poster ${isLargeRow && "row-posterLarge"}`} />))}
      <div>
      <div className="row-youtube-container">
        <div style={{padding: "40px"}}>
          {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
        </div> </div>
      </div>
      
      </div>
    </div>
  );
};

export default Row;
