import React from 'react';
import { Route } from 'react-router-dom';
import SideBar from '@/component/common/sideBar/index';
import Content from '@/component/common/content/index';
import './index.less';

function CssPage(props) {
  return (
    <div className="css-page">
      <div className="nav-wrap">
        <SideBar module={props.match.params.module} history={props.history} />
      </div>
      <div className="content">
        <Route path="/home/:module/:demo" component={Content} />
      </div>
    </div>
  );
}

export default CssPage;
