import React from 'react';
import Header from './Header';

function Recipes(props) {
  return (
    <Header { ...props } title="Meals" search profile />
  );
}

export default Recipes;
