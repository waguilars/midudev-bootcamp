import deepFreeze from 'deep-freeze';
import counterReducer from './reducer';

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test('should return a proper initial state when called with undefined state', () => {
    // const state = {};
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('good is incremented', () => {
    const action = {
      type: 'GOOD',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  test('neutral is incremented', () => {
    const action = {
      type: 'OK',
    };
    const state = initialState;
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      ...state,
      ok: 1
    })
  });

  test('bad is incremented', () => {
    const action = {
      type: 'BAD',
    };
    const state = initialState;
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      ...state,
      bad: 1
    })
  });

  test('reset stats reset the state', () => {
    const action = { type: 'ZERO' }
    const ok = { type: 'OK' }
    const bad = { type: 'BAD' }
    const good = { type: 'GOOD' }
    let newState = counterReducer(initialState, ok)
    newState = counterReducer(newState, bad)
    newState = counterReducer(newState, good)
    expect(newState).toEqual({
      ok: 1, good: 1, bad: 1
    })

    newState = counterReducer(newState, action)
    expect(newState).toEqual(initialState)
  })
});
