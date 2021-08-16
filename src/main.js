// Este é o ponto de entrada da sua aplicação

// import { myFunction } from './lib/index.js';

// myFunction();

import home from './pages/home/index.js';
import register from './pages/register/index.js';
import login from './pages/login/index.js';
import feed from './pages/feed/index.js';

export const init = () => {
  const page = document.querySelector('#root');
  page.innerHTML = '';
  switch (window.location.hash) {
    case '#home':
      page.appendChild(home());
      break;
    case '#register':
      page.appendChild(register());
      break;
    case '#login':
      page.appendChild(login());
      break;
    case '#feed':
      page.appendChild(feed());
      break;
    default:
      page.appendChild(home());
  }
};

window.addEventListener('hashchange', init);
window.addEventListener('load', init);
