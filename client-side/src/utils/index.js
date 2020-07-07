import moment from 'jalali-moment';
/* eslint-disable import/no-cycle */
import { Provider } from 'react-redux';
import React from 'react';
import type { Node } from 'react';
import configureStore from '../store/store';

export const dateFormat = (date) => (date ? moment(date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD') : '');

type reduxProviderProps = {
  children: Array<Node> | Node,
  initialState: Object,
};

/* store wrapper for covering redux-hooks in tests */
export const ReduxProvider = ({
  children,
  initialState,
}: reduxProviderProps) => (
  <Provider store={configureStore(initialState)}>{children}</Provider>
);
