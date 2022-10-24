import PropTypes from 'prop-types';
import { useMemo } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const contexto = useMemo(() => ({

  }), []);

  return (
    <AppContext.Provider value={ contexto }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
