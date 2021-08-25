import React from 'react';
import { useDispatch } from 'react-redux';

import { asObject, createNewAnecdote } from '../reducers/anecdoteReducer';
import * as anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (evt) => {
    evt.preventDefault();
    const content = evt.target.anecdote.value;
    if (content === '') {
      return;
    }

    anecdotesService.createNew(asObject(content))
      .then(newAnecdote => {
        dispatch(createNewAnecdote(newAnecdote));
      })
    evt.target.anecdote.value = '';
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
