const initialState = {
  pokemons: [],
  filterValue: '',
  currentPokemon: null,
  currentAbility: null
};

export default function reducer(state = initialState, action) {
  if (action.type === 'POKEMONS/SET') {
    return {
      ...state,
      pokemons: [...action.payload]
    };
  }
  if (action.type === 'POKEMONS/FILTER') {
    return {
      ...state,
      filterValue: action.payload
    };
  }
  if (action.type === 'POKEMONS/SET_CURRENT') {
    return {
      ...state,
      currentPokemon: { ...action.payload }
    };
  }
  if (action.type === 'POKEMONS/SET_CURRENT_ABILITY') {
    return {
      ...state,
      currentAbility: { ...action.payload }
    };
  }
  return state;
}
