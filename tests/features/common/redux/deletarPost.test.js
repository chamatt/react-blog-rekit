import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_DELETAR_POST_BEGIN,
  COMMON_DELETAR_POST_SUCCESS,
  COMMON_DELETAR_POST_FAILURE,
  COMMON_DELETAR_POST_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  deletarPost,
  dismissDeletarPostError,
  reducer,
} from '../../../../src/features/common/redux/deletarPost';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/deletarPost', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deletarPost succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deletarPost())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_DELETAR_POST_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_DELETAR_POST_SUCCESS);
      });
  });

  it('dispatches failure action when deletarPost fails', () => {
    const store = mockStore({});

    return store.dispatch(deletarPost({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_DELETAR_POST_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_DELETAR_POST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDeletarPostError', () => {
    const expectedAction = {
      type: COMMON_DELETAR_POST_DISMISS_ERROR,
    };
    expect(dismissDeletarPostError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_DELETAR_POST_BEGIN correctly', () => {
    const prevState = { deletarPostPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_DELETAR_POST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deletarPostPending).toBe(true);
  });

  it('handles action type COMMON_DELETAR_POST_SUCCESS correctly', () => {
    const prevState = { deletarPostPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_DELETAR_POST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deletarPostPending).toBe(false);
  });

  it('handles action type COMMON_DELETAR_POST_FAILURE correctly', () => {
    const prevState = { deletarPostPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_DELETAR_POST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deletarPostPending).toBe(false);
    expect(state.deletarPostError).toEqual(expect.anything());
  });

  it('handles action type COMMON_DELETAR_POST_DISMISS_ERROR correctly', () => {
    const prevState = { deletarPostError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_DELETAR_POST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deletarPostError).toBe(null);
  });
});

