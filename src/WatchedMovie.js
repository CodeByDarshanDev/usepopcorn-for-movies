function WatchedMovie({ movie, HandleDeleteWatchedMovie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.rating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime.toFixed(2)} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => HandleDeleteWatchedMovie(movie.imdbID)}
        >
          ⛔
        </button>
      </div>
    </li>
  );
}

export default WatchedMovie;
