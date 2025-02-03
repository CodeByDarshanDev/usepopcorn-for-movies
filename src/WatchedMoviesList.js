import WatchedMovie from "./WatchedMovie";

function WatchedMoviesList({ watched, HandleDeleteWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          HandleDeleteWatchedMovie={HandleDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
