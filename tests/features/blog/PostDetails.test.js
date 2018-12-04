import React from 'react';
import { shallow } from 'enzyme';
import { PostDetails } from '../../../src/features/blog/PostDetails';

describe('blog/PostDetails', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PostDetails {...props} />
    );

    expect(
      renderedComponent.find('.blog-post-details').length
    ).toBe(1);
  });
});
