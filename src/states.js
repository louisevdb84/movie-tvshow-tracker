import Home from './containers/Home';
import Movies from './containers/Movies';
import Upcoming from './containers/MoviesUpcoming';
import TopRated from './containers/MoviesTopRated';
import Popular from './containers/MoviesPopular';
import NowPlaying from './containers/MoviesNowPlaying';
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
  
const upcomingState = {    
    name: 'upcoming',
    url: '/upcoming/:username',
    params: {entry: null},
    component: Upcoming
};
  
const topRatedState = {    
    name: 'toprated',
    url: '/toprated/:username',
    params: {entry: null},
    component: TopRated
};
  
const popularState = {    
    name: 'popular',
    url: '/popular/:username',
    params: {entry: null},
    component: Popular
};
  
const nowPlayingState = {    
    name: 'nowPlaying',
    url: '/nowPlaying/:username',
    params: {entry: null},
    component: NowPlaying
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

export default [popularState, nowPlayingState, topRatedState, upcomingState, watchlistState, moviesState, registerState, homeState, appState, loginState];
