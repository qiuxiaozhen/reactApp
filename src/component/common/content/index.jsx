import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Editor from '@/component/common/monacoEditor/index';
import Http from '@/lib/http';

const Content = (props) => {
  const { match: { params: { module, demo } } } = props;
  const [code, setCode] = useState({});
  const { default: CustomCom } = require(`../../../component/${module}/${demo}/index.jsx`);

  const fetchCode = () => {
    Http.get('/api/fileManage/getFileContent', { module, name: demo }).then((res) => {
      setCode(res.data.data);
    });
  };

  const download = () => {
    window.open(`/api/fileManage/download?module=${module}&demo=${demo}`);
  };

  useEffect(() => {
    fetchCode();
  }, [module, demo]);

  return (
    <Grid container className="content-wrap">
      <div className="btn-wrap">
        <Button variant="contained" color="primary" onClick={download}>下载</Button>
      </div>
      <Grid item className="space">
        <span>index.jsx</span>
        <Editor language="javascript" className="editor" content={code.js} />
      </Grid>
      <Grid item>
        <span>render.jsx</span>
        <Editor language="javascript" className="editor" content={code.render} />
      </Grid>
      <Grid item className="space">
        <span>index.less</span>
        <Editor language="less" className="editor" content={code.css} />
      </Grid>
      <Grid item>
        <span>Result: </span>
        <div id="result">
          <CustomCom />
        </div>
      </Grid>
    </Grid>
  );
};

export default Content;
