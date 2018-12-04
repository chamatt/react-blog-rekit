import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_ENVIAR_POST_BEGIN,
  COMMON_ENVIAR_POST_SUCCESS,
  COMMON_ENVIAR_POST_FAILURE,
  COMMON_ENVIAR_POST_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  enviarPost,
  dismissEnviarPostError,
  reducer,
} from '../../../../src/features/common/redux/enviarPost';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/enviarPost', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when enviarPost succeeds', () => {
    const store = mockStore({});

    return store.dispatch(enviarPost())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_ENVIAR_POST_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_ENVIAR_POST_SUCCESS);
      });
  });

  it('dispatches failure action when enviarPost fails', () => {
    const store = mockStore({});

    return store.dispatch(enviarPost({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_ENVIAR_POST_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_ENVIAR_POST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissEnviarPostError', () => {
    const expectedAction = {
      type: COMMON_ENVIAR_POST_DISMISS_ERROR,
    };
    expect(dismissEnviarPostError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_ENVIAR_POST_BEGIN correctly', () => {
    const prevState = { enviarPostPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_ENVIAR_POST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.enviarPostPending).toBe(true);
  });

  it('handles action type COMMON_ENVIAR_POST_SUCCESS correctly', () => {
    const prevState = { enviarPostPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_ENVIAR_POST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.enviarPostPending).toBe(false);
  });

  it('handles action type COMMON_ENVIAR_POST_FAILURE correctly', () => {
    const prevState = { enviarPostPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_ENVIAR_POST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.enviarPostPending).toBe(false);
    expect(state.enviarPostError).toEqual(expect.anything());
  });

  it('handles action type COMMON_ENVIAR_POST_DISMISS_ERROR correctly', () => {
    const prevState = { enviarPostError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_ENVIAR_POST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.enviarPostError).toBe(null);
  });
});

