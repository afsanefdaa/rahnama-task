import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { BrowserRouter as Router } from 'react-router-dom';
import { PostCard } from '../index';
import { ReduxProvider } from '../../utils/index';

describe('<PostCard /> test', () => {
  let component;

  const mockState = {};

  beforeEach(() => {
    component = (
      <Router>
        <ReduxProvider initialState={mockState}>
          <PostCard />
        </ReduxProvider>
      </Router>
    );
  });

  it('postcard should renders correctly - snapshot', () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(component);
    expect(tree).toMatchSnapshot();
  });
});
