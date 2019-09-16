import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '@/reducers/store';
import App from '@/app';
import MessageTip from '@/component/common/message/index';

window.$store = store;

ReactDOM.render(
  <Provider store={store}>
    <App />
    <MessageTip />
  </Provider>,
  document.getElementById('rootApp'),
);
