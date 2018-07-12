import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';
import { triggerLogout } from '../../redux/actions/loginActions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';


const mapStateToProps = state => ({
  user: state.user,
});

class WaterTablePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      waterEvents: [],
      userEvent: {
        date: '',
        water_amount: '',
        username: '',
    }
  
  }}
  

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getWaterEvents();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  getWaterEvents(){
    axios.get('/api/water')
      .then((response) => {
        this.setState({
          waterEvents: response.data
        })
      })
  }

  submitWater = (event) => {
    event.preventDefault();
    axios.post('/api/water', this.state.userEvent)
        .then((response) => {
          console.log('in the water POST');
          this.setState({
            userEvent: {
              date: '',
              water_amount: '',
            }
          });
          this.getWaterEvents();
        })
        .catch((error) => {
          console.log(`There's been an error`, error)
        });
    } // end submitWater
  
    handleEvent = (key) => (event) => {
      console.log(this.props.user.userName)
      this.setState({
          userEvent: {
              ...this.state.userEvent,
              [key]: event.target.value,
              username: this.props.user.userName
          }
      })
      console.log(this.state.userEvent);
    } // end handleEvent

  // logout = () => {
  //   this.props.dispatch(triggerLogout());
  //   // this.props.history.push('home');
  // }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <div>
            <h3>Add a watering event</h3>
              <form onSubmit={this.submitWater}>
                <input type='text' placeholder='Date (xx/xx/xxxx)' onChange={this.handleEvent('date')} value={this.state.userEvent.date} />
                <input type='text' placeholder='Amount (in oz)' onChange={this.handleEvent('water_amount')} value={this.state.userEvent.water_amount} />
                {/* <select>
                    <option selected value="gal">gal</option>
                    <option value="liter">L</option>
                </select> */}
                <input type='submit' value='Submit' />
              </form>
          </div>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Water Amount</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.waterEvents.map(event => {
                    return (
                      <TableRow key={event.event_id}>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.water_amount} oz</TableCell>
                        <TableCell><Button><EditIcon /></Button></TableCell>
                        <TableCell><Button><DeleteIcon /></Button></TableCell>
                        {/* <Button><DeleteIcon /></Button> */}
                        {/* <TableCell><DeleteIcon /></TableCell> */}
                      </TableRow>
                    );
                  })}
                </TableBody>
            </Table>
          </Paper>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(WaterTablePage);

