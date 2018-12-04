import React from 'react';
import { shallow } from 'enzyme';
import { AddPost } from '../../../src/features/blog/AddPost';

describe('blog/AddPost', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AddPost {...props} />
    );

    expect(
      renderedComponent.find('.blog-add-post').length
    ).toBe(1);
  });
});
