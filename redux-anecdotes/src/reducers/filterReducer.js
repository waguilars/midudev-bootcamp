
const initialState = ''

const filterReducer =  (state = initialState, action) => {
  const { type, search } = action

  switch (type) {

  case '@FILTER/SEARCH':

    return search;

  default:
    return state
  }
}

export const filterAnecdote = searchTerm => {
  return {
    type: '@FILTER/SEARCH',
    search: searchTerm
  }
}

export default filterReducer