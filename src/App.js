import { useState, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import AppBar from "./Components/AppBar/AppBar";
import Container from "./Components/Container/Container";
import "./App.css";
import NotFoundView from "./Components/Views/NotFoundView";
import SearchMoviesForm from "./Components/SearchMoviesForm/SearchMoviesForm";
import Spinner from "./Components/loader/Loader";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const HomePage = lazy(() =>
  import("./Components/Views/HomePage/HomePage.js" /* webpackChunkName: "HomePage"*/),
);
const MovieDetailsPage = lazy(() =>
  import("./Components/Views/MovieDetailsPage/MovieDetailsPage.js" /* webpackChunkName: "MovieDetailsPage"*/)
);
const SearchMovies = lazy(() =>
  import("./Components/SearchMovies/SearchMovies.js" /* webpackChunkName: "SearchMovies"*/)
);

export default function App() {
  const [searchFilm, setSearchFilm] = useState("");

  return (
    <Container>
      <Suspense fallback={<Spinner />}>
        <AppBar />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <SearchMoviesForm onSubmit={setSearchFilm} />
            <SearchMovies SearchMovies={searchFilm} />
          </Route>

          <Route path="/movies/:movieId" exact>
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
