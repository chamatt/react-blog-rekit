import React from 'react';
import { shallow } from 'enzyme';
import { AddPost } from '../../../src/features/common/AddPost';

describe('common/AddPost', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AddPost {...props} />
    );

    expect(
      renderedComponent.find('.common-add-post').length
    ).toBe(1);
  });
});
