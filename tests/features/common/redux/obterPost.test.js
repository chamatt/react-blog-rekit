import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_OBTER_POST_BEGIN,
  COMMON_OBTER_POST_SUCCESS,
  COMMON_OBTER_POST_FAILURE,
  COMMON_OBTER_POST_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  obterPost,
  dismissObterPostError,
  reducer,
} from '../../../../src/features/common/redux/obterPost';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/obterPost', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when obterPost succeeds', () => {
    const store = mockStore({});

    return store.dispatch(obterPost())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_OBTER_POST_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_OBTER_POST_SUCCESS);
      });
  });

  it('dispatches failure action when obterPost fails', () => {
    const store = mockStore({});

    return store.dispatch(obterPost({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_OBTER_POST_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_OBTER_POST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissObterPostError', () => {
    const expectedAction = {
      type: COMMON_OBTER_POST_DISMISS_ERROR,
    };
    expect(dismissObterPostError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_OBTER_POST_BEGIN correctly', () => {
    const prevState = { obterPostPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_OBTER_POST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.obterPostPending).toBe(true);
  });

  it('handles action type COMMON_OBTER_POST_SUCCESS correctly', () => {
    const prevState = { obterPostPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_OBTER_POST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.obterPostPending).toBe(false);
  });

  it('handles action type COMMON_OBTER_POST_FAILURE correctly', () => {
    const prevState = { obterPostPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_OBTER_POST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.obterPostPending).toBe(false);
    expect(state.obterPostError).toEqual(expect.anything());
  });

  it('handles action type COMMON_OBTER_POST_DISMISS_ERROR correctly', () => {
    const prevState = { obterPostError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_OBTER_POST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.obterPostError).toBe(null);
  });
});

