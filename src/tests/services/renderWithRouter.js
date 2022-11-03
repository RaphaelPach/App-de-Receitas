// import React from 'react';
// import { Router } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
// import { render } from '@testing-library/react';
// import App from '../../App';

// const renderWithRouter = (path) => {
//   const history = createBrowserHistory();
//   history.push(path);
//   const { ...resources } = render(
//     <Router history={ history }>
//       <App />
//     </Router>,
//   );
//   return { ...resources, history };
// };

// export default renderWithRouter;
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
// import App from '../../App';

const renderWithRouter = (component, path = ['/']) => {
  const history = createMemoryHistory({ initialEntries: path });
  // history.push(path);
  const { ...resources } = render(
    <Router history={ history }>
      {component}
    </Router>,
  );
  return { ...resources, history };
};

export default renderWithRouter;
