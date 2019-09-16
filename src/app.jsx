import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Home from '@/layout/home/index';
import Login from '@/page/login/index';
import Http from '@/lib/http';
import '../public/font.css';
import '@/app.less';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  componentDidMount() {
    Http.get('/api/userManage/isLogin').then((res) => {
      this.setState({
        isLogin: res.data.data.isLogin,
      }, () => {
        sessionStorage.setItem('isLogin', this.state.isLogin);
      });
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Route
          path="/"
          exact
          render={() => (
            this.state.isLogin ? (
              <Redirect to="/home" />
            ) : (
              <Redirect to="/login" />
            )
          )}
        />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
      </BrowserRouter>
    );
  }
}

export default App;
