import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import PokemonListPage from './components/pokemon-list-page/pokemon-list-page';
import Header from './components/header/header';
import PokemonDetails from './components/pokemon-detail-page/pokemon-detail-page';
import PokemonAbility from './components/pokemon-ability/pokemon-ability';

class App extends React.Component {
  componentDidMount() {
    const { setPokemons } = this.props;
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then((response) => {
        setPokemons(response.data.results);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error!', err);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <Route component={Header} />
        <Switch>
          <Route exact path='/' component={PokemonListPage} />
          <Route exact path='/pokemon/:name' component={PokemonDetails} />
          <Route exact path='/ability/:name' component={PokemonAbility} />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  setPokemons: PropTypes.func.isRequired
};

export default connect(
  (state) => ({
    pokemons: state.pokemons,
    filterValue: state.filterValue
  }),
  (dispatch) => ({
    setPokemons: (param) => dispatch({ type: 'POKEMONS/SET', payload: param })
  })
)(App);
