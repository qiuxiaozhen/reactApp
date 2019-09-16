const express = require('express'); // 引入express
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const JSzip = require('jszip');
const path = require('path');

const mongoFun = require('./mongoFun.js');
const config = require('../config/index.js'); // 引入路径等配置文件

const app = express();
const SECRT = 'YOUR_SCRET_STRING';

app.use(cookieParser());

// bodyParser API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function verifyUser(token, callback) {
  jwt.verify(token, SECRT, (err, decoded) => {
    if (err && !decoded) {
      callback(null);
      return;
    }
    mongoFun.findData({ userName: decoded.userName }, (response) => {
      if (response.length !== 0) {
        callback(response);
      } else {
        callback(null);
      }
    });
  });
}

// 登录
app.post('/userMange/login', (req, res) => {
  const userInfo = req.body;
  mongoFun.findData({ userName: userInfo.userName }, (response) => {
    if (response.length === 0) {
      res.send({
        code: -1,
        message: '该用户未注册',
      });
    } else if (response[0].password === userInfo.password) {
      jwt.sign({
        userName: response[0].userName,
      }, SECRT, (err, val) => {
        if (err) {
          return;
        }
        res.cookie('token', val, { maxAge: 600000, httpOnly: true, path: '/', expires: new Date(Date.now() + 86400000) });
        res.send({
          code: 0,
          message: 'success',
          data: {
            userName: response[0].userName,
            userId: response[0].userId,
            isLogin: true,
            token: val,
          },
        });
      });
    } else {
      res.send({
        code: -1,
        message: '用户名或密码不正确',
      });
    }
  });
});

// 判断用户是否登录
app.get('/userManage/isLogin', (req, res) => {
  const token = req.cookies.token;
  verifyUser(token, (response) => {
    console.log('response: ', response);
    if (response) {
      res.send({
        code: 0,
        data: {
          userName: response.userName,
          isLogin: true,
        },
        message: 'success',
      });
    } else {
      res.send({
        code: 0,
        data: {
          isLogin: false,
        },
        message: 'success',
      });
    }
  });
});

// 退出
app.get('/userManage/logout', (req, res) => {
  const token = req.cookies.token;
  verifyUser(token, (response) => {
    if (response) {
      res.clearCookie('token');
      res.send({
        code: 0,
        message: 'success',
      });
    } else {
      res.send({
        code: -1,
        message: '用户已经退出',
      });
    }
  });
});

// 查询用户: test
app.get('/userMange/getUserInfo', (req, res) => {
  const token = req.cookies.token;
  verifyUser(token, (response) => {
    if (response) {
      fs.readdir(path.resolve(__dirname, 'assets/canvas/'), (error, files) => {
        const filesArr = [];
        if (error) {
          return;
        }
        files.forEach((file) => {
          filesArr.push(file);
        });
        res.send(filesArr);
      });
    }
  });
});

// 获取模块的demo列表
app.get('/fileManage/getModuleList', (req, res) => {
  const token = req.cookies.token;
  verifyUser(token, (response) => {
    if (response) {
      const dir = req.query.module;
      fs.readdir(path.resolve(__dirname, `../src/component/${dir}/`), (err, files) => {
        const filesArr = [];
        if (err) {
          return console.error(err);
        }
        files.forEach((file) => {
          if (file !== '.DS_Store') {
            filesArr.push(file);
          }
        });
        res.send({
          code: 0,
          data: filesArr,
          message: 'success',
        });
      });
    } else {
      res.send({
        code: -1,
        message: '没有权限',
      });
    }
  });
});

// 读取文件内容
app.get('/fileManage/getFileContent', (req, res) => {
  const token = req.cookies.token;
  verifyUser(token, (response) => {
    if (response) {
      const filePath = req.query;
      const css = fs.readFileSync(path.resolve(__dirname, `../src/component/${filePath.module}/${filePath.name}/index.less`));
      const render = fs.readFileSync(path.resolve(__dirname, `../src/component/${filePath.module}/${filePath.name}/render.jsx`));
      const js = fs.readFileSync(path.resolve(__dirname, `../src/component/${filePath.module}/${filePath.name}/index.jsx`));
      res.send({
        code: 0,
        data: {
          css: css.toString(),
          render: render.toString(),
          js: js.toString(),
        },
        message: 'success',
      });
    } else {
      res.send({
        code: -1,
        message: '没有权限',
      });
    }
  });
});

// 下载文件
app.get('/fileManage/download', (req, res) => {
  const { module, demo } = req.query;
  const zip = new JSzip();
  // 读取目录及文件
  const readDir = (obj, nowPath) => {
    const files = fs.readdirSync(nowPath); // 读取目录中的所有文件及文件夹（同步操作）
    files.forEach(function (fileName, index) { // 遍历检测目录中的文件
      console.log(fileName, index);// 打印当前读取的文件名
      const fillPath = `${nowPath}/${fileName}`;
      const file = fs.statSync(fillPath); // 获取一个文件的属性
      if (file.isDirectory()) { // 如果是目录的话，继续查询
        const dirlist = zip.folder(fileName); // 压缩对象中生成该目录
        readDir(dirlist, fillPath); // 重新检索目录文件
      } else {
        obj.file(fileName, fs.readFileSync(fillPath)); // 压缩目录添加文件
      }
    });
  };

  // 开始压缩文件
  const startZIP = () => {
    const currPath = __dirname; // 文件的绝对路径 当前当前js所在的绝对路径
    const targetDir = path.join(currPath, `../src/component/${module}/${demo}`);
    readDir(zip, targetDir);
    zip.generateAsync({ // 设置压缩格式，开始打包
      type: 'nodebuffer', // nodejs用
      compression: 'DEFLATE', // 压缩算法
      compressionOptions: { // 压缩级别
        level: 9,
      },
    }).then((content) => {
      console.log('content: ', content);
      res.set({
        'Content-Type': 'application/octet-stream', // 告诉浏览器这是一个二进制文件
        'Content-Disposition': `attachment; filename=${demo}.zip`, // 告诉浏览器这是一个需要下载的文件
      });
      res.write(content);
      res.end();
    });
  };
  const token = req.cookies.token;
  verifyUser(token, (response) => {
    if (response) {
      startZIP();
    } else {
      res.send({
        code: -1,
        message: '没有权限',
      });
    }
  });
});

// 增加用户
app.post('/userMange/addUser', (req, res) => {
  const user = req.body;
  mongoFun.findData({ userName: user.userName }, (response) => {
    if (response.length === 0) {
      mongoFun.insertData({ ...user, userId: 1 }); // 向数据库插入数据
      res.send({
        code: 0,
        message: 'success',
        data: {
          userName: user.userName,
          userId: user.userId,
        },
      });
    } else {
      res.send({
        code: -1,
        message: '该用户名已存在',
      });
    }
  });
});

// 更新密码
app.post('/userManage/updateUser', (req, res) => {
  const user = req.body;
  mongoFun.findData({ userName: user.userName }, (response) => {
    if (response.length === 0) {
      res.send({
        code: -1,
        message: '该用户未注册',
      });
    } else if (user.password === response[0].password) {
      mongoFun.updateData({
        userName: user.userName,
        password: user.passwordAgain,
      });
      res.send({
        code: 0,
        message: 'success',
        data: {
          userName: user.userName,
          userId: user.userId,
        },
      });
    } else {
      res.send({
        code: -1,
        message: '用户密码不正确',
      });
    }
  });
});

const server = app.listen(config.serverPort, function () {
  console.log('Express app server listening on port %d', server.address().port);
});
