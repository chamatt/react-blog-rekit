import React from 'react';
import { shallow } from 'enzyme';
import { BlogPost } from '../../../src/features/common/BlogPost';

describe('common/BlogPost', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <BlogPost {...props} />
    );

    expect(
      renderedComponent.find('.common-blog-post').length
    ).toBe(1);
  });
});
