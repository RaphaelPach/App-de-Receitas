import React from 'react';
import Header from './Header';

export default function Drinks(props) {
  return (
    <div>
      <Header { ...props } title="Drinks" profile search />
    </div>
  );
}
