import React from 'react';
import { shallow } from 'enzyme';
import { PostBlog } from '../../../src/features/common/PostBlog';

describe('common/PostBlog', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PostBlog {...props} />
    );

    expect(
      renderedComponent.find('.common-post-blog').length
    ).toBe(1);
  });
});
