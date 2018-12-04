import React from 'react';
import { shallow } from 'enzyme';
import { BlogContainer } from '../../../src/features/blog/BlogContainer';

describe('blog/BlogContainer', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <BlogContainer {...props} />
    );

    expect(
      renderedComponent.find('.blog-blog-container').length
    ).toBe(1);
  });
});
