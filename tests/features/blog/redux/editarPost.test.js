import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  BLOG_EDITAR_POST_BEGIN,
  BLOG_EDITAR_POST_SUCCESS,
  BLOG_EDITAR_POST_FAILURE,
  BLOG_EDITAR_POST_DISMISS_ERROR,
} from '../../../../src/features/blog/redux/constants';

import {
  editarPost,
  dismissEditarPostError,
  reducer,
} from '../../../../src/features/blog/redux/editarPost';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('blog/redux/editarPost', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when editarPost succeeds', () => {
    const store = mockStore({});

    return store.dispatch(editarPost())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BLOG_EDITAR_POST_BEGIN);
        expect(actions[1]).toHaveProperty('type', BLOG_EDITAR_POST_SUCCESS);
      });
  });

  it('dispatches failure action when editarPost fails', () => {
    const store = mockStore({});

    return store.dispatch(editarPost({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BLOG_EDITAR_POST_BEGIN);
        expect(actions[1]).toHaveProperty('type', BLOG_EDITAR_POST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissEditarPostError', () => {
    const expectedAction = {
      type: BLOG_EDITAR_POST_DISMISS_ERROR,
    };
    expect(dismissEditarPostError()).toEqual(expectedAction);
  });

  it('handles action type BLOG_EDITAR_POST_BEGIN correctly', () => {
    const prevState = { editarPostPending: false };
    const state = reducer(
      prevState,
      { type: BLOG_EDITAR_POST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editarPostPending).toBe(true);
  });

  it('handles action type BLOG_EDITAR_POST_SUCCESS correctly', () => {
    const prevState = { editarPostPending: true };
    const state = reducer(
      prevState,
      { type: BLOG_EDITAR_POST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editarPostPending).toBe(false);
  });

  it('handles action type BLOG_EDITAR_POST_FAILURE correctly', () => {
    const prevState = { editarPostPending: true };
    const state = reducer(
      prevState,
      { type: BLOG_EDITAR_POST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editarPostPending).toBe(false);
    expect(state.editarPostError).toEqual(expect.anything());
  });

  it('handles action type BLOG_EDITAR_POST_DISMISS_ERROR correctly', () => {
    const prevState = { editarPostError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: BLOG_EDITAR_POST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editarPostError).toBe(null);
  });
});

