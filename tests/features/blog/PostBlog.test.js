import React from 'react';
import { shallow } from 'enzyme';
import { PostBlog } from '../../../src/features/blog/PostBlog';

describe('blog/PostBlog', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PostBlog {...props} />
    );

    expect(
      renderedComponent.find('.blog-post-blog').length
    ).toBe(1);
  });
});
