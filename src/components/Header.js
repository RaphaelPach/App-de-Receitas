import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { title, profile, search } = props;

  return (
    <header>
      <h1 data-testid="page-title">{ title }</h1>
      { profile
      && <img
        src={ profileIcon }
        alt="icone-cabeçalho"
        data-testid="profile-top-btn"
      />}
      { search
      && <img
        src={ searchIcon }
        alt="icone-pesquisa"
        data-testid="search-top-btn"
      />}
    </header>
  );
}

export default Header;
