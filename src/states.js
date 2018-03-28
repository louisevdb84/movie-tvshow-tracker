import Home from './containers/Home';
import Movies from './containers/Movies';
import Login from './containers/Login';
import Register from './containers/Register';
import Watchlist from './containers/Watchlist';


const appState = {
    name: 'app',
    redirectTo: 'home',
    component: Home
};
  

const homeState = {
    parent: 'app',
    name: 'home',
    url: '/',
    component: Home
};

const moviesState = {    
    name: 'movies',
    url: '/movies/:username',
    params: {entry: null},
    component: Movies
  };
  
  const loginState = {    
    name: 'login',
    url: '/login',
    component: Login          
};

const registerState = {    
    name: 'register',
    url: '/register',
    component: Register
};

const watchlistState = {    
    name: 'watchlist',
    url: '/watchlist/:username',
    component: Watchlist
};

export default [watchlistState, moviesState, registerState, homeState, appState, loginState];
