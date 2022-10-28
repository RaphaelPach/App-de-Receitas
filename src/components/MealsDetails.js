import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function MealsDetails(props) {
  const { match: { params: { id } } } = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchId = async (itemId) => {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`;
      const response = await fetch(URL);
      const { meals } = await response.json();

      setData(meals[0]);
    };

    fetchId(id);
  }, [id]);

  return <div>{ data.idMeals }</div>;
}

MealsDetails.propTypes = {
  match: PropTypes.shape().isRequired,
};
