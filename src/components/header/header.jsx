import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './header.scss';

class Header extends React.Component {
  searchToName = (e) => {
    const { filterPokemons } = this.props;
    filterPokemons(e.target.value);
  }

  render() {
    const { history, location, filterValue } = this.props;
    return (
      <div className='header'>
        <h1>Pokemons</h1>
        <div className='header-controls'>
          {
          location.pathname !== '/' ? (
            <button type='button' className='header-controls__back-button' onClick={history.goBack}>
              Back
            </button>
          ) : (
            <>
              <div />
              <input
                type='text'
                className='header-controls__filter-input'
                onChange={this.searchToName}
                placeholder='Search...'
                value={filterValue}
              />
            </>
          )
          }
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  filterPokemons: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default connect(
  (state) => ({
    pokemons: state.pokemons,
    filterValue: state.filterValue
  }),
  (dispatch) => ({
    filterPokemons: (param) => dispatch({ type: 'POKEMONS/FILTER', payload: param })
  })
)(Header);
