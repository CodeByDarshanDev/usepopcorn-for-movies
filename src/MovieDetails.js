import { useEffect, useState } from "react";
import StarRating from "./StarRating";
// import Loader from "./App";
const APIKEY = "20198a8e";

function MovieDetailes({
  SelectedId,
  handleCloseselectedMovie,
  handleAddWatched,
  watched,
}) {
  const [rating, setRating] = useState("");
  const [movie, setMovie] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const isWatched = watched.map((movie) => movie.imdbID).includes(SelectedId);
  const WatchedMovieUserRaating = watched.find(
    (movie) => movie.imdbID === SelectedId
  )?.rating;
  console.log(WatchedMovieUserRaating);

  const {
    Title,
    Year,
    Poster,
    Runtime,
    imdbRating,
    Plot,
    Released,
    Actors,
    Director,
    Genre,
  } = movie;

  useEffect(
    function () {
      async function getMovieDetail() {
        setisLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${APIKEY}&i=${SelectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setisLoading(false);
      }
      getMovieDetail();
    },
    [SelectedId]
  );

  useEffect(
    function () {
      if (!Title) return;
      document.title = `Movie | ${Title}`;
      return function () {
        document.title = "UsePopCorn";
      };
    },
    [Title]
  );

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: SelectedId,
      Title,
      Year,
      Poster,
      imdbRating: Number(imdbRating),
      Runtime: Number(Runtime.split(" ").at(0)),
      rating,
    };

    handleAddWatched(newWatchedMovie);
    // onCloseMovie(handleCloseselectedMovie);
    handleCloseselectedMovie();
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <header>
            <button className="btn-back" onClick={handleCloseselectedMovie}>
              &larr;
            </button>
            <img src={Poster} alt={`Movie OF ${Poster}`} />
            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {Released} &bull; {Runtime}
              </p>
              <p>{Genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setRating}
                    defaultRating={Number(rating)}
                  />
                  {rating > 0 && (
                    <button className="btn-add" onClick={() => handleAdd()}>
                      + add to list
                    </button>
                  )}
                </>
              ) : (
                <>
                  <p>You Have Added {movie.Title} To Your Watch List</p>
                  <StarRating
                    defaultRating={WatchedMovieUserRaating}
                    maxRating={10}
                    size={24}
                  />
                </>
              )}
            </div>
            <p>
              <em>{Plot} </em>{" "}
            </p>
            <p>Staring By {Actors}</p>
            <p>Directed By {Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function Loader() {
  return <p className="loader">Is Loading ....</p>;
}

export default MovieDetailes;
