import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import ErrorPage from '../error-page/error-page';
import './pokemon-ability.scss';

class PokemonAbility extends React.Component {
  componentDidMount() {
    const {
      match,
      currentPokemon,
      setCurrentAbility
    } = this.props;
    const abilityName = match.params.name;
    if (!currentPokemon) {
      return;
    }
    const currentAbility = currentPokemon
      ? currentPokemon.abilities.find((el) => (el.ability.name === abilityName)) : null;
    const currentAbilityUrl = currentAbility.ability.url;
    axios.get(currentAbilityUrl)
      .then((response) => {
        setCurrentAbility(response.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error!', err);
      });
  }

  render() {
    const { currentPokemon, currentAbility } = this.props;
    if (!currentPokemon || !currentAbility) {
      return (
        <ErrorPage />
      );
    }
    return (
      <div className='pokemon-ability'>
        <h2>{currentAbility.name.toUpperCase()}</h2>
        <h3>Effect Entries</h3>
        <ul className='pokemon-ability__effect-entries'>
          {currentAbility.effect_entries && currentAbility.effect_entries.map((el, i) => (
            <li key={i}>{el.effect}</li>
          ))}
        </ul>
        <h3>Flavor Text Entries</h3>
        <div className='pokemon-ability__entries'>
          {currentAbility.flavor_text_entries && currentAbility.flavor_text_entries.map((el, i) => (
            <div className='pokemon-ability__flavor-entries' key={i}>
              <div className='pokemon-ability__flavor-entries_text'>{el.flavor_text}</div>
              <div className='pokemon-ability__flavor-entries_name'>{el.version_group.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

PokemonAbility.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  setCurrentAbility: PropTypes.func.isRequired,
  currentPokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    abilities: PropTypes.array
  }),
  currentAbility: PropTypes.shape({
    name: PropTypes.string.isRequired,
    effect_entries: PropTypes.array,
    flavor_text_entries: PropTypes.array
  })
};


export default connect(
  (state) => ({
    currentPokemon: state.currentPokemon,
    currentAbility: state.currentAbility
  }),
  (dispatch) => ({
    setCurrentAbility: (param) => dispatch({ type: 'POKEMONS/SET_CURRENT_ABILITY', payload: param })
  })
)(PokemonAbility);
