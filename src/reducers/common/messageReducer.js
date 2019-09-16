const messageState = {
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
  autoHideDuration: 3000,
  message: '',
  isOpen: false,
  type: 'info',
};

const messageReducer = (state = { ...messageState }, action) => {
  switch (action.type) {
  case 'OPEN':
    return Object.assign({}, state, {
      ...action.payload,
    });
  case 'CLOSE':
    return Object.assign({}, state, {
      isOpen: false,
    });
  default:
    return Object.assign({}, state);
  }
};

export default messageReducer;
