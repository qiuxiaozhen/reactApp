import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GroupWork from '@material-ui/icons/GroupWork';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import './index.less';
import Http from '@/lib/http';

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      openUserInfo: false,
      linkList: [{
        name: 'css',
        key: 'css',
      }, {
        name: 'webgl',
        key: 'webgl',
      }, {
        name: 'svg',
        key: 'svg',
      }, {
        name: 'canvas',
        key: 'canvas',
      }],
      activateKey: 'css',
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.logout = this.logout.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log('header: ', this.props);
    const href = window.location.href;
    const modulesArr = href.split('/');
    const modules = modulesArr[modulesArr.length - 2];
    console.log('header: ', modules);
    this.setState({
      activateKey: modules !== 'home' ? module : 'css',
    });
  }

  logout() {
    Http.get('/api/userManage/logout').then((res) => {
      if (res.data.code === 0) {
        this.setState({
          openUserInfo: false,
        });
        sessionStorage.removeItem('isLogin');
        window.location.href = 'http://localhost:9000/login';
      } else {
        window.location.href = 'http://localhost:9000/login';
      }
    });
  }

  handleToggle(event) {
    this.setState({
      anchorEl: event.currentTarget,
    });
    this.setState(prevState => ({
      openUserInfo: !prevState.openUserInfo,
    }));
  }

  handleClose() {
    this.setState({
      openUserInfo: false,
    });
  }

  handleChange(val) {
    this.setState({
      activateKey: val.key,
    });
  }

  render() {
    const userName = sessionStorage.getItem('userName');

    return (
      <div className="headerBar">
        <AppBar position="static">
          <Toolbar>
            <GroupWork />
            <Typography variant="h6">
              Study
            </Typography>
            <nav className="navBar">
              {
                this.state.linkList.map(val => (
                  <Link to={`/home/${val.name}`} key={val.key} className={`link-item ${val.key === this.state.activateKey ? 'activated' : ''}`} onClick={() => this.handleChange(val)}>{val.name.toUpperCase()}</Link>
                ))
              }
            </nav>
            <div className="user-info">
              <IconButton
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(event) => { this.handleToggle(event); }}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <span className="user-name">{userName}</span>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={this.state.openUserInfo}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.logout}>退出</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default HeaderBar;
