import React from 'react';
import { shallow } from 'enzyme';
import { Footer } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Footer />);
  expect(renderedComponent.find('.home-footer').length).toBe(1);
});
