
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
      const { id } = action.data;
      const newState = state.map((anecdote) => {
        if (anecdote.id === id) {
          return  action.data;
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

export const voteFor = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.update({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch({
      type: '@ANECDOTE/VOTE',
      data: updatedAnecdote
    })
  }
}

export default reducer;
