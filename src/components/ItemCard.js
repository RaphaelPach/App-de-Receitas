import React from 'react';
import PropTypes from 'prop-types';

export default function ItemCard(props) {
  const { name, img, index } = props;
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h2 data-testid={ `${index}-card-name` }>{ name }</h2>
      <img
        data-testid={ `${index}-card-img` }
        src={ img }
        alt={ name }
        style={ { width: '100%' } }
      />
    </div>
  );
}

ItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
