import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const { title, profile, search } = props;
  const [isSearching, setIsSearching] = useState(false);
  return (
    <header>
      <h1 data-testid="page-title">{ title }</h1>
      { profile && (
        <Link to="/profile">
          <img
            src={ profileIcon }
            alt="icone-cabeçalho"
            data-testid="profile-top-btn"
          />
        </Link>
      )}
      { search && (
        <button type="button" onClick={ () => setIsSearching(!isSearching) }>
          <img
            src={ searchIcon }
            alt="icone-pesquisa"
            data-testid="search-top-btn"
          />
        </button>
      )}
      { isSearching && <SearchBar { ...props } /> }
    </header>
  );
}

Header.propTypes = {
  profile: PropTypes.bool,
  search: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  profile: false,
  search: false,
};

export default Header;
