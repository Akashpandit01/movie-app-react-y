import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetail() {
  const { id } = useParams(); // Get movie ID from the URL
  const [movie, setMovie] = useState(null); // State to hold movie details
  const [cast, setCast] = useState([]); // State to hold cast details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [currentPage, setCurrentPage] = useState(1); // Current page for cast
  const castPerPage = 5; // Number of cast members to show per page
  const API_KEY = '409475ec39f13caa1695b68f730b2494'; // Replace with your TMDB API key
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for movie poster images
  const ACTOR_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200'; // Base URL for actor photos

  useEffect(() => {
    // Fetch movie details
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        return response.json();
      })
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });

    // Fetch cast details
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
      .then(response => response.json())
      .then(data => setCast(data.cast))
      .catch(error => console.error('Error fetching cast:', error));
  }, [id]);

  // Pagination logic
  const indexOfLastCast = currentPage * castPerPage;
  const indexOfFirstCast = indexOfLastCast - castPerPage;
  const currentCast = cast.slice(indexOfFirstCast, indexOfLastCast); // Get cast for the current page

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="movie-detail">
      {movie && (
        <>
          {/* Movie Poster, Title, Overview, and Rating */}
          <div className="movie-info">
            {movie.poster_path && (
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
            )}
            <div className="movie-meta">
              <h1>{movie.title}</h1>
              <p><strong>Rating:</strong> {movie.vote_average}/10</p>
              <p><strong>Overview:</strong> {movie.overview}</p>
              <p><strong>Release Date:</strong> {movie.release_date}</p>
              <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
            </div>
          </div>

          {/* Cast Section */}
          <h2>Cast</h2>
          <div className="cast-grid">
            {currentCast && currentCast.length > 0 ? (
              currentCast.map((actor) => (
                <div key={actor.cast_id} className="actor-card">
                  {actor.profile_path ? (
                    <img
                      src={`${ACTOR_IMAGE_BASE_URL}${actor.profile_path}`}
                      alt={actor.name}
                      className="actor-photo"
                    />
                  ) : (
                    <div className="no-image">No Image Available</div>
                  )}
                  <p><strong>{actor.name}</strong></p>
                  <p>as {actor.character}</p>
                </div>
              ))
            ) : (
              <p>No cast information available.</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button onClick={handleNextPage} disabled={indexOfLastCast >= cast.length}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetail;
