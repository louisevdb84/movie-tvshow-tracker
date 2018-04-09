import Home from './containers/Home';
import Movies from './containers/Movies';
import Upcoming from './containers/MoviesUpcoming';
import TopRated from './containers/MoviesTopRated';
import Popular from './containers/MoviesPopular';
import NowPlaying from './containers/MoviesNowPlaying';
import Login from './containers/Login';
import Register from './containers/Register';
import Watchlist from './containers/Watchlist';

import TVPopular from './containers/TVPopular';
import TVAiringToday from './containers/TVAiringToday';
import TVOnTheAir from './containers/TVOnTheAir';
import TVTopRated from './containers/TVTopRated';


const appState = {
    name: 'app',
    redirectTo: 'movies/:username',
    component: Movies
};
  
const homeState = {
    parent: 'app',
    name: 'home',
    url: '/',
    component: Home
};

//#region Movies

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
  

const watchlistState = {    
    name: 'watchlist',
    url: '/watchlist/:username',
    component: Watchlist
};

//#endregion Movies

//#region TVShows

const TVPopularState = {    
    name: 'TVpopular',
    url: '/TVpopular/:username',
    params: {entry: null},
    component: TVPopular
};

const TVAiringTodayState = {    
    name: 'TVairingToday',
    url: '/TVairingToday/:username',
    params: {entry: null},
    component: TVAiringToday
};

const TVOnTheAirState = {    
    name: 'TVOnTheAir',
    url: '/TVOnTheAir/:username',
    params: {entry: null},
    component: TVOnTheAir
};

const TVTopRatedState = {    
    name: 'TVTopRated',
    url: '/TVTopRated/:username',
    params: {entry: null},
    component: TVTopRated
};

//#endregion
  
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


export default [TVOnTheAirState,TVTopRatedState, TVAiringTodayState,TVPopularState, popularState, nowPlayingState, topRatedState, upcomingState, watchlistState, moviesState, registerState, homeState, appState, loginState];
