
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
// import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { WATER_ACTIONS } from '../../redux/actions/waterActions'
import '../../styles/Modal.css'
import { connect } from 'react-redux';

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

const mapStateToProps = state => ({
  user: state.user,
  events: state,
});
class SimpleModal extends React.Component {
  state = {
    open: false,
    userEvent: {
      date: '',
      water_amount: '',
      username: '',
    }
  };


  handleOpen = (id) => {
    this.setState({ open: true });
  };
  
  handleClose = () => {
    this.setState({ open: false });
  };

  // updates the water DB
  updateEvent = (id) => {
    let toUpdate = {
      event_id: id,
      userEvent: this.state.userEvent
    }
    this.props.dispatch({ type: WATER_ACTIONS.UPDATE_EVENT, payload: toUpdate});
    this.handleClose();
  } // end updateEvent

  // handles change of inputs
  handleEvent = (key) => (event) => {
      this.setState({
        userEvent: {
            ...this.state.userEvent,
            [key]: event.target.value,
            username: this.props.user.userName
        }
    })
    console.log(this.state.userEvent);
  } // end handleEvent

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div onClick={() => this.handleOpen(this.props.updateId)}><EditIcon/></div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
          {/* <pre>{JSON.stringify(this.props.updateId)}</pre> */}
            <Typography variant="title" id="modal-title">
              Edit your water event:
            </Typography>
            <form id="update_form" onSubmit={()=>{this.updateEvent(this.props.updateId)} }>
              {/* <input type='date' placeholder="Date (xx/xx/xxxx)" onChange={this.handleEvent('date')} 
              value={this.state.userEvent.date} /> */}
              <input type='text' placeholder='Amount (in oz)' onChange={this.handleEvent('water_amount')} 
              value={this.state.userEvent.water_amount} />
              <input type='submit' value='Submit' />
            </form>
            <SimpleModalWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default connect(mapStateToProps)(SimpleModalWrapped);