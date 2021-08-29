import React from 'react';
import { useDispatch } from 'react-redux';

import {createNewAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (evt) => {
    evt.preventDefault();
    const content = evt.target.anecdote.value;
    if (content === '') {
      return;
    }

    dispatch(createNewAnecdote(content));
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
