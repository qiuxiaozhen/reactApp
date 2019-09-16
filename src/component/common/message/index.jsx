import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

import './index.less';

class MessageTip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dispatch: props.dispatch,
    };

    this.closeMessage = this.closeMessage.bind(this);
  }

  closeMessage() {
    this.state.dispatch({
      type: 'CLOSE',
    });
  }

  render() {
    const option = this.props.messageReducer;
    const variantIcon = {
      success: CheckCircleIcon,
      warning: WarningIcon,
      error: ErrorIcon,
      info: InfoIcon,
    };
    const Icon = variantIcon[option.type];

    return (
      <Snackbar
        anchorOrigin={option.anchorOrigin}
        open={option.isOpen}
        autoHideDuration={option.autoHideDuration}
        onClose={this.closeMessage}
      >
        <SnackbarContent
          className={`snackbar-${option.type}`}
          aria-describedby="client-snackbar"
          message={(
            <span id="client-snackbar">
              <Icon />
              {option.message}
            </span>
          )}
        />
      </Snackbar>
    );
  }
}

const mapStateToProps = store => ({
  messageReducer: store.messageReducer,
});

export default connect(mapStateToProps)(MessageTip);
