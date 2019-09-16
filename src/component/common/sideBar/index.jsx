import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Edit from '@material-ui/icons/Edit';
import Http from '@/lib/http';

import './index.less';

function SideBar(props) {
  console.log('sideBar props: ', props);
  const { module, history } = props;
  const [sideBar, setSideBar] = useState([]);
  const [activateName, setActiveName] = useState('');

  const getSideBar = () => {
    Http.get(`/api/fileManage/getModuleList?module=${module}`).then((res) => {
      setSideBar(res.data.data);
      setActiveName(res.data.data[0]);
      console.log('sideBar: ', `/home/${module}/${res.data.data[0]}`);
      history.push(`/home/${module}/${res.data.data[0]}`);
    });
  };

  useEffect(() => {
    getSideBar();
  }, [module]);

  return (
    <Drawer
      variant="permanent"
    >
      <List>
        {sideBar ? sideBar.map(name => (
          <ListItem button key={name} className={`link-item ${name === activateName ? 'activated' : ''}`}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <Link to={`/home/${module}/${name}`} onClick={() => { setActiveName(name); }}>{name}</Link>
          </ListItem>
        )) : null}
      </List>
    </Drawer>
  );
}

export default SideBar;
