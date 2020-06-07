import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ErrorPage from '../error-page/error-page';
import './pokemon-detail-page.scss';

class PokemonDetails extends React.Component {
  componentDidMount() {
    const {
      pokemons,
      match,
      setCurrentPokemon
    } = this.props;
    const { name } = match.params;
    if (pokemons.length) {
      const currentPokemon = pokemons.find((el) => (el.name === name));
      axios.get(currentPokemon.url)
        .then((response) => {
          setCurrentPokemon(response.data);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('Error!', err);
        });
    }
  }

  componentDidUpdate(prevProps) {
    const { pokemons, match, setCurrentPokemon } = this.props;
    const { name } = match.params;
    if (prevProps.pokemons.length === 0 && pokemons.length) {
      const currentPokemon = pokemons.find((el) => (el.name === name));
      axios.get(currentPokemon.url)
        .then((response) => {
          setCurrentPokemon(response.data);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('Error!', err);
        });
    }
  }

  render() {
    const { currentPokemon } = this.props;
    if (!currentPokemon) {
      return <ErrorPage />;
    }
    const {
      types,
      name,
      stats,
      sprites,
      abilities
    } = currentPokemon;
    const pokemonTypes = types ? types.map((el) => (el.type.name)).join(', ') : '';
    const pokemonStats = stats ? stats.map((el) => (`${el.stat.name}: ${el.base_stat}`)).join(', ') : '';
    const pokemonImageFront = sprites ? sprites.front_default : '';
    const pokemonImageBack = sprites ? sprites.back_default : '';
    const pokemonImageFrontShiny = sprites ? sprites.front_shiny : '';
    const pokemonImageBackShiny = sprites ? sprites.back_shiny : '';
    return (
      <div className='pokemon-details'>
        <h2 className='pokemon-details__name'>{name ? name.toUpperCase() : ''}</h2>
        <div className='pokemon-details__description'>
          <div className='pokemon-details__pictures'>
            <div>
              <img className='pokemon-details__picture' src={pokemonImageFront} alt='pokemon' />
              <img className='pokemon-details__picture' src={pokemonImageBack} alt='pokemon' />
            </div>
            <div>
              <img className='pokemon-details__picture' src={pokemonImageFrontShiny} alt='pokemon' />
              <img className='pokemon-details__picture' src={pokemonImageBackShiny} alt='pokemon' />
            </div>
          </div>
          <div className='pokemon-details__type'>
            <p>{`Types: ${pokemonTypes}`}</p>
            <p>{`Stats: ${pokemonStats}`}</p>
            <div className='pokemon-details__abilities'>
              <p>Abilities:</p>
              <ul className='pokemon-details__abilities-list'>
                { abilities && abilities.map((el, i) => (
                  <li key={i}>
                    <Link to={`/ability/${el.ability.name}`}>
                      {el.ability.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PokemonDetails.propTypes = {
  pokemons: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  setCurrentPokemon: PropTypes.func.isRequired,
  currentPokemon: PropTypes.shape({
    types: PropTypes.array,
    sprites: PropTypes.shape({
      back_default: PropTypes.string.isRequired,
      back_shiny: PropTypes.string.isRequired,
      front_default: PropTypes.string.isRequired,
      front_shiny: PropTypes.string.isRequired
    }),
    name: PropTypes.string,
    stats: PropTypes.array,
    abilities: PropTypes.array
  })
};

export default connect(
  (state) => ({
    pokemons: state.pokemons,
    filterValue: state.filterValue,
    currentPokemon: state.currentPokemon
  }),
  (dispatch) => ({
    setCurrentPokemon: (param) => dispatch({ type: 'POKEMONS/SET_CURRENT', payload: param })
  })
)(PokemonDetails);
