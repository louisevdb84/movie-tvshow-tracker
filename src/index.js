import React from 'react';
import ReactDOM from 'react-dom';
import { UIRouter, UIView } from '@uirouter/react';

import './index.css';
import 'tachyons';

import { router } from './router.config';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <UIRouter router={router}>
    <div>
      <UIView/>      
    </div>
  </UIRouter>,
    document.getElementById('root'));
registerServiceWorker();
