import React from 'react';
import renderer from 'react-test-renderer';
import { Container } from '..';

describe('<Container /> test', () => {
  let component;

  beforeEach(() => {
    component = (
      <Container />
    );
  });

  it('container should renders correctly - snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
