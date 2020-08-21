import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './estilo.css';

export default class Main extends Component {
  state = {
    movies: [],
    movieInfo: {},
    page: 1,
  };

  componentDidMount() {
    this.loadMovies();
  }
  loadMovies = async (page = 1) => {
    const response = await api.get(
      `discover/movie?api_key=941d452609a3a292dcce2cbb24a18e0a&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`,
    );

    const { movieInfo } = response.data;

    this.setState({ movies: response.data.results });
  };

  prevPage = () => {
    const { page, movieInfo } = this.state;
    if (page === 1) return;
    const pageNumber = page - 1;
    this.setState({ page: pageNumber });
    this.loadMovies(pageNumber);
  };

  nextPage = () => {
    const { page, movieInfo } = this.state;
    if (page === movieInfo.pages) return;
    const pageNumber = page + 1;
    this.setState({ page: pageNumber });
    this.loadMovies(pageNumber);
  };

  render() {
    const { movies, page, movieInfo } = this.state;
    return (
      <div className="movie-list">
        {movies.map((movie) => (
          <article key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} | React App Movies`}
            ></img>
            <div>
              <strong>
                <h1>{movie.title}</h1>
              </strong>
              <p>{movie.overview}</p>
              <Link to={`./movie/${movie.id}`}>Acessar filme</Link>
            </div>
          </article>
        ))}
        <div className="actions">
          <button disabled={page === 1} onClick={this.prevPage}>
            Anterior
          </button>
          <button disabled={page === movieInfo.pages} onClick={this.nextPage}>
            Próximo
          </button>
        </div>
      </div>
    );
  }
}
