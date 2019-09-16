import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CssPage from '@/page/css/index';
import NotFoundPage from '@/page/404/index';

import './index.less';

function BodySection() {
  const isLogin = sessionStorage.getItem('isLogin');
  if (!isLogin) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="bodySectionDiv">
      <Switch>
        <Route path="/home/:module" component={CssPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default BodySection;
