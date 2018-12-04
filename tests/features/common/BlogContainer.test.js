import React from 'react';
import { shallow } from 'enzyme';
import { BlogContainer } from '../../../src/features/common/BlogContainer';

describe('common/BlogContainer', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <BlogContainer {...props} />
    );

    expect(
      renderedComponent.find('.common-blog-container').length
    ).toBe(1);
  });
});
