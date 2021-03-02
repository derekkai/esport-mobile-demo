/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import style from './style.scss';

export const withCSSTransition = (WrappedComponent, className) => props => (
  <CSSTransition
    in={props.in}
    timeout={300}
    appear
    unmountOnExit
    classNames={className}
  >
    <WrappedComponent {...props} />
  </CSSTransition>
);

export const withMask = (WrappedComponent, className) => props => (
  <div className={classNames(style.mask, props.in && style.visible)}>
    {withCSSTransition(WrappedComponent, className)(props)}
  </div>
);
