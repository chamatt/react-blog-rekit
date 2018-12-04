import React from 'react';
import { shallow } from 'enzyme';
import { EditPost } from '../../../src/features/blog/EditPost';

describe('blog/EditPost', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <EditPost {...props} />
    );

    expect(
      renderedComponent.find('.blog-edit-post').length
    ).toBe(1);
  });
});
