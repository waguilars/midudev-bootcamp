import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter.length > 0) {
      const term = state.filter
      return state.anecdotes.filter(a => a.content.includes(term))
    }

    return state.anecdotes
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(voteFor(anecdote));
    dispatch(showNotification(`you voted '${anecdote.content}'`, 3))
  };

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
