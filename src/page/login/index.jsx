import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Http from '@/lib/http';

import './index.less';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '', // 用户名输入框值
      password: '', // 密码输入框值
      passwordAgain: '', // 再次输入密码值
      isLogin: false, // 是否已经登录
      pageName: 'login', // 显示页面名称：'login': 登录，'register': 注册 ，'update'：忘记密码
      dispatch: props.dispatch,
    };

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.update = this.update.bind(this);
    this.goPage = this.goPage.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  // 输入框值改变事件
  handleChange(props, event) {
    this.setState({
      [props]: event.target.value,
    });
  }

  // 清空输入框的值
  clearInput() {
    this.setState({
      userName: '',
      password: '',
      passwordAgain: '',
    });
  }

  goPage(page) {
    this.clearInput(); // 清空输入框内容
    this.setState({
      pageName: page,
    });
  }

  // 登录
  login() {
    const { userName, password } = this.state;
    Http.post('/api/userMange/login', { userName, password }).then((res) => {
      if (res.data.code === 0) {
        const timer = setTimeout(() => {
          // this.clearInput();
          this.setState({
            isLogin: true,
          });
          sessionStorage.setItem('isLogin', true);
          sessionStorage.setItem('userName', res.data.data.userName);
          clearTimeout(timer);
        });
      }
    }).catch((err) => {
      this.state.dispatch({
        type: 'OPEN',
        payload: {
          isOpen: true,
          message: err.message,
          type: 'error',
        },
      });
    });
  }

  // 注册
  register() {
    const { userName, password } = this.state;
    Http.post('/api/userMange/addUser', { userName, password }).then((res) => {
      if (res.data.code === 0) {
        this.state.dispatch({
          type: 'OPEN',
          payload: {
            isOpen: true,
            message: '注册成功，请返回登录页进行登录',
            type: 'success',
          },
        });
        this.clearInput();
      }
    }).catch((err) => {
      this.state.dispatch({
        type: 'OPEN',
        payload: {
          isOpen: true,
          message: err.message,
          type: 'error',
        },
      });
    });
  }

  // 更新密码
  update() {
    const { userName, password, passwordAgain } = this.state;
    Http.post('/api/userManage/updateUser', { userName, password, passwordAgain }).then((res) => {
      if (res.data.code === 0) {
        this.state.dispatch({
          type: 'OPEN',
          payload: {
            isOpen: true,
            message: '密码重置成功，请返回登录页进行登录',
            type: 'success',
          },
        });
        this.clearInput();
      }
    }).catch((err) => {
      this.state.dispatch({
        type: 'OPEN',
        payload: {
          isOpen: true,
          message: err.message,
          type: 'error',
        },
      });
    });
  }

  render() {
    const { isLogin, pageName } = this.state;

    // 判断用户是否登录
    if (isLogin) {
      return <Redirect to="/home/css" />;
    }

    return (
      <div className="login">
        <div className="username">
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField id="userName" className="input" label="用户名" type="text" value={this.state.userName} onChange={(e) => { this.handleChange('userName', e); }} />
            </Grid>
          </Grid>
        </div>
        {pageName === 'login' || pageName === 'register' ? (
          <div className="password">
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <Lock />
              </Grid>
              <Grid item>
                <TextField id="password" className="input input-margin" label="密码" type="password" value={this.state.password} onChange={(e) => { this.handleChange('password', e); }} />
              </Grid>
            </Grid>
          </div>
        ) : (
          <div className="psd-wrap">
            <div className="password">
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <Lock />
                </Grid>
                <Grid item>
                  <TextField id="password" className="input input-margin" label="密码" type="password" value={this.state.password} onChange={(e) => { this.handleChange('password', e); }} />
                </Grid>
              </Grid>
            </div>
            <div className="password">
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <Lock />
                </Grid>
                <Grid item>
                  <TextField id="passwordAgain" className="input input-margin" label="确认密码" type="password" value={this.state.passwordAgain} onChange={(e) => { this.handleChange('passwordAgain', e); }} />
                </Grid>
              </Grid>
            </div>
          </div>
        )}
        <div className="btn-group">
          <Button className="btn" variant="contained" color="primary" onClick={this.state.pageName === 'login' ? this.login : this.state.pageName === 'register' ? this.register : this.update}>
            {this.state.pageName === 'login' ? '登录' : this.state.pageName === 'register' ? '注册' : '确认'}
          </Button>
          <div className="link-group">
            <span className="link" onClick={() => this.goPage(this.state.pageName === 'login' ? 'register' : 'login')}>
              {this.state.pageName === 'login' ? '免费注册' : '返回登录'}
            </span>
            <span className="link" onClick={() => this.goPage('update')}>
              {this.state.pageName === 'login' ? '忘记密码' : null}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
