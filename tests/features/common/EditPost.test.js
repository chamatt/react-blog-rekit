import React from 'react';
import { shallow } from 'enzyme';
import { EditPost } from '../../../src/features/common/EditPost';

describe('common/EditPost', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <EditPost {...props} />
    );

    expect(
      renderedComponent.find('.common-edit-post').length
    ).toBe(1);
  });
});
