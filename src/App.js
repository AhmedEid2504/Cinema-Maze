import { useEffect, useState } from "react";
import React from "react";
import './App.css'
import searchIcon from './search.svg';
import MovieCard from './components/MovieCard';

// omdb api key
// d3a97ed5

const API_URL = 'http://www.omdbapi.com/?apikey=d3a97ed5';

// const movieExample = {
//     "Title": "Cars",
//     "Year": "2006",
//     "imdbID": "tt0317219",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg"
// }

const App  = () => {

    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) =>{
        const response = await fetch (`${API_URL}&s=${title}`); 
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('cars');
    }, []);

    return  (

        <div className="app">
            <h1>CinemaMaze</h1>

            <div className="search">
                <input 
                    placeholder="Search for Movie"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={searchIcon} 
                    alt="Search Icon"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            
            {
                movies?.length > 0 ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No results found.</h2>
                    </div>
                )
            }

        </div>
    );
}

export default App;