import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../css/carousel.css';

function Carousel(props) {
  const { show, type } = props;
  const [recomendations, setRecomendations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(recomendations.length);
  const [touchPosition, setTouchPosition] = useState(null);

  const MAX_CAROUSEL = 6;

  useEffect(() => {
    console.log();
  }, [currentIndex]);

  const next = () => currentIndex < (length - show)
    && setCurrentIndex((prevState) => prevState + 1);
  const prev = () => currentIndex > 0
    && setCurrentIndex((prevState) => prevState - 1);

  const handleTouchStart = (event) => {
    const touchDown = event.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (event) => {
    const touchNext = 5;
    const touchPrev = -5;
    const touchDown = touchPosition;
    if (touchDown === null) { return; }
    const currentTouch = event.touches[0].clientX;
    const diff = touchDown - currentTouch;
    if (diff > touchNext) { next(); }
    if (diff < touchPrev) { prev(); }
    setTouchPosition(null);
  };

  const recomendationItemCard = ({ id, name, img, index, visible }) => (
    <Link className={ visible && 'hidden' } key={ id } to={ `/${type}/${id}` }>
      <div>
        <h6 data-testid={ `${index}-recommendation-title` }>{ name }</h6>
        <img
          data-testid={ `${index}-recommendation-card` }
          src={ img }
          alt={ name }
          style={ { width: '100%' } }
        />
      </div>
    </Link>
  );

  const renderDrinkCarouselItems = async () => {
    const getDrinkList = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const { drinks } = await response.json();
      const data = drinks
        .filter((_, index) => index < MAX_CAROUSEL)
        .map((e, index) => (
          index === 0 || index === 1 ? (
            recomendationItemCard({
              id: e.idDrink,
              name: e.strDrink,
              img: e.strDrinkThumb,
              index,
            }))
            : recomendationItemCard({
              id: e.idDrink,
              name: e.strDrink,
              img: e.strDrinkThumb,
              index,
              visible: 'not',
            })
        ));
      return data;
    };
    setRecomendations(await getDrinkList());
  };

  const renderMealsCarouselItems = async () => {
    const getMealsList = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const { meals } = await response.json();
      const data = meals
        .filter((_, index) => index < MAX_CAROUSEL)
        .map((e, index) => (
          index === 0 || index === 1 ? (
            recomendationItemCard({ id: e.idMeal,
              name: e.strMeal,
              img: e.strMealThumb,
              index }))
            : recomendationItemCard({
              id: e.idMeal,
              name: e.strMeal,
              img: e.strMealThumb,
              index,
              visible: 'not-visible',
            })
        ));
      return data;
    };
    setRecomendations(await getMealsList());
  };

  useEffect(() => { setLength(recomendations.length); }, [recomendations]);

  useEffect(() => {
    if (type === 'meals') { renderMealsCarouselItems(); }
    if (type === 'drinks') { renderDrinkCarouselItems(); }
  }, []);

  return (
    <div
      className="carousel-container"
      style={ { display: 'block', width: '100%', padding: '20px' } }
    >
      <div className="carousel-wrapper">
        {
          currentIndex > 0 && (
            <button type="button" onClick={ prev } className="left-arrow">&lt;</button>
          )
        }
        <div
          className="carousel-content-wrapper"
          onTouchStart={ handleTouchStart }
          onTouchMove={ handleTouchMove }
        >
          <div
            className={ `carousel-content show-${show}` }
            style={ { transform: `translateX(-${currentIndex * (100 / show)}%)` } }
          >
            {recomendations}
          </div>
        </div>
        {
          currentIndex < (length - show) && (
            <button type="button" onClick={ next } className="right-arrow">&gt;</button>
          )
        }
      </div>
    </div>
  );
}

Carousel.propTypes = {
  show: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Carousel;
