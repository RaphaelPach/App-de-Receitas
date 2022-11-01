import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/footer.css';

export default function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="icone-drinks"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/meals">
        <img
          src={ mealIcon }
          alt="icone-meals"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </div>
  );
}
