import React from 'react';
import { connect } from 'react-redux';

import {createNewAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
  const addAnecdote = (evt) => {
    evt.preventDefault();
    const content = evt.target.anecdote.value;
    if (content === '') {
      return;
    }

    props.createNewAnecdote(content);
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

const mapDispatchToProps = {
  createNewAnecdote
}

const connectedAnecdoteForm = connect(undefined, mapDispatchToProps)(AnecdoteForm)

export default connectedAnecdoteForm;
