import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Profile() {
  const getEmail = localStorage.getItem('user');
  const handleClickLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
  };
  return (
    <div>
      <Header title="Profile" profile />
      <h2 data-testid="profile-email">
        { getEmail }
      </h2>
      <Link to="/done-recipes">
        <button type="button" data-testid="profile-done-btn">
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button type="button" data-testid="profile-favorite-btn">
          Favorite Recipes
        </button>
      </Link>
      <Link to="/">
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ handleClickLogout }
        >
          Logout
        </button>
      </Link>
      <Footer />
    </div>
  );
}
