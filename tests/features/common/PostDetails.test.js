import React from 'react';
import { shallow } from 'enzyme';
import { PostDetails } from '../../../src/features/common/PostDetails';

describe('common/PostDetails', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PostDetails {...props} />
    );

    expect(
      renderedComponent.find('.common-post-details').length
    ).toBe(1);
  });
});
