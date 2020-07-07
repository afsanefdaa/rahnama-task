import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import * as serviceWorker from './serviceWorker';
import { Layout } from './components';
import {
  Landing,
  CreatePost,
  SinglePost,
} from './pages';
import './index.module.scss';

import configureStore from './store/store';

const routing = (
  <Provider store={configureStore()}>
    <Router>
      <Switch>
        <ConfigProvider local="fa" direction="rtl">
          <Layout>
            <Route exact path="/" component={Landing} />
            <Route path="/post/:id" component={SinglePost} />
            <Route path="/create-post" component={CreatePost} />
          </Layout>
        </ConfigProvider>
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
