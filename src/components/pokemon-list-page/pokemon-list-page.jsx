import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './pokemon-list-page.scss';
import PokemonCard from '../pokemon-card/pokemon-card';

class PokemonListPage extends React.Component {
  componentDidMount() {
    const { setCurrentPokemon } = this.props;
    setCurrentPokemon({});
  }

  render() {
    const { pokemons, filterValue } = this.props;
    return (
      <div className='pokemon'>
        <div className='pokemon-list'>
          {
            pokemons.filter((el) => el.name.includes(filterValue)).map((item, index) => (
              <PokemonCard key={index} name={item.name} />
            ))
          }
        </div>
      </div>
    );
  }
}

PokemonListPage.propTypes = {
  pokemons: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired,
  filterValue: PropTypes.string.isRequired,
  setCurrentPokemon: PropTypes.func.isRequired
};

export default connect(
  (state) => ({
    pokemons: state.pokemons,
    filterValue: state.filterValue
  }),
  (dispatch) => ({
    setCurrentPokemon: (param) => dispatch({ type: 'POKEMONS/SET_CURRENT', payload: param })
  })
)(PokemonListPage);
