import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_OBTER_POSTS_BEGIN,
  COMMON_OBTER_POSTS_SUCCESS,
  COMMON_OBTER_POSTS_FAILURE,
  COMMON_OBTER_POSTS_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  obterPosts,
  dismissObterPostsError,
  reducer,
} from '../../../../src/features/common/redux/obterPosts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/obterPosts', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when obterPosts succeeds', () => {
    const store = mockStore({});

    return store.dispatch(obterPosts())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_OBTER_POSTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_OBTER_POSTS_SUCCESS);
      });
  });

  it('dispatches failure action when obterPosts fails', () => {
    const store = mockStore({});

    return store.dispatch(obterPosts({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_OBTER_POSTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_OBTER_POSTS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissObterPostsError', () => {
    const expectedAction = {
      type: COMMON_OBTER_POSTS_DISMISS_ERROR,
    };
    expect(dismissObterPostsError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_OBTER_POSTS_BEGIN correctly', () => {
    const prevState = { obterPostsPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_OBTER_POSTS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.obterPostsPending).toBe(true);
  });

  it('handles action type COMMON_OBTER_POSTS_SUCCESS correctly', () => {
    const prevState = { obterPostsPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_OBTER_POSTS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.obterPostsPending).toBe(false);
  });

  it('handles action type COMMON_OBTER_POSTS_FAILURE correctly', () => {
    const prevState = { obterPostsPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_OBTER_POSTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.obterPostsPending).toBe(false);
    expect(state.obterPostsError).toEqual(expect.anything());
  });

  it('handles action type COMMON_OBTER_POSTS_DISMISS_ERROR correctly', () => {
    const prevState = { obterPostsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_OBTER_POSTS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.obterPostsError).toBe(null);
  });
});

