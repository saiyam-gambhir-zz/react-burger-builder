import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
  <header className="Toolbar">
    <Logo />
    <NavigationItems />
  </header>
);

export default toolbar;
