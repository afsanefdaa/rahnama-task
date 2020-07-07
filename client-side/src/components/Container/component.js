// @flow
import React from 'react';
import classes from 'classnames';
import style from './index.module.scss';

type componentProps = {
  className?: string,
  children: any
};

export const Container = ({ children, className }: componentProps) => (
  <div className={classes(className, style.container)}>
    { children }
  </div>
);

Container.defaultProps = {
  className: '',
};

export default Container;
