import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function DetailsDrinks(props) {
  const { match: { params: { id } } } = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchId = async (itemId) => {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${itemId}`;
      const response = await fetch(URL);
      const { drinks } = await response.json();

      setData(drinks[0]);
    };

    fetchId(id);
  }, [id]);

  return <div>{ data.idDrink }</div>;
}

DetailsDrinks.propTypes = {
  match: PropTypes.shape().isRequired,
};
