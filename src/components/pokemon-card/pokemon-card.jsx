import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './pokemon-card.scss';
import pokeball from '../../assets/pokeball.png';

function PokemonCard(props) {
  const { name } = props;
  return (
    <Link to={`/pokemon/${name}`} style={{ textDecoration: 'none' }}>
      <div className='pokemon-card'>
        <img className='pokemon-card__img' src={pokeball} alt='pokeball' />
        <div className='pokemon-card__name'>
          {name.toUpperCase()}
        </div>
      </div>
    </Link>
  );
}

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired
};

export default PokemonCard;
