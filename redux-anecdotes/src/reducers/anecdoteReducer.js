
import * as anecdotesService from '../services/anecdotes'

// const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0,
  };
};

// const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = [], action) => {
  const { type } = action;

  switch (type) {
    case '@ANECDOTE/VOTE':
      const { id } = action;
      const newState = state.map((anecdote) => {
        if (anecdote.id === id) {
          return { ...anecdote, votes: anecdote.votes + 1 };
        }
        return anecdote;
      });

      return newState;

    case '@ANECDOTE/NEW_ANECDOTE':
      const { data } = action;
      return state.concat(data);

    case '@ANECDOTE/INIT':
      return action.data;

    default:
      return state;
  }
};

export const addVote = (id) => {
  return {
    id,
    type: '@ANECDOTE/VOTE',
  };
};

export const createNewAnecdote = (content) => {
  return async dispatch => {
    const anecdote = anecdotesService.createNew(asObject(content))
    dispatch({
      type: '@ANECDOTE/NEW_ANECDOTE',
      data: anecdote,
    })
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: '@ANECDOTE/INIT',
      data: anecdotes
    })
  }
}

export default reducer;
