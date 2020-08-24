import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import api from '../../services/api';

import './estilo.scss';

export default class Movie extends Component {
  state = {
    movie: {},
    genres: [],
  };

  componentDidMount() {
    this.loadMovie();
  }

  loadMovie = async () => {
    const { id } = this.props.match.params;
    const response = await api.get(
      `movie/${id}?api_key=941d452609a3a292dcce2cbb24a18e0a&language=pt-BR`,
    );

    this.setState({ movie: response.data });
    this.setState({ genres: response.data.genres });
  };

  render() {
    const { movie, genres } = this.state;

    return (
      <div className="movie-info">
        <img
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={`${movie.title} | React App Movies`}
        ></img>
        <h1>{movie.title}</h1>
        <h2>
          <b>{movie.tagline}</b>
        </h2>
        <p>{movie.overview}</p>
        <p>
          URL:{' '}
          <a href={movie.homepage} target="_blank">
            {movie.homepage}
          </a>
        </p>
        <p>
          Gêneros:
          {genres.map((genre) => (
            <span key={genre.id} className="movie-tag">
              <small>{genre.name}</small>
            </span>
          ))}
        </p>
        <p>
          Data de lançamento:{' '}
          <Moment format="DD/MM/YYYY">{movie.release_date}</Moment>
        </p>
        <Link className="btn" to={`/`}>
          Voltar para página principal
        </Link>
      </div>
    );
  }
}
