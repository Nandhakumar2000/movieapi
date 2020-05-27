import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
class LoginPage extends Component {
  
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
      isVisible: true,
      isOpen: false,
    };

    var username = localStorage.getItem("username");
    if(username === '' || username == null){
      this.state = {isVisible: true}
    }
    else{
      this.state = {isVisible: false}
    }
    this.object2 = {event2: "", time2: "", date2: ""};
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
    this.signOut = this.signOut.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }

  signOut(){
    window.alert("Signed Out");
    localStorage.setItem('password', '');
    localStorage.setItem('username','');
    this.setState({    username : "",
    password : "",
    error:"",
    isVisible : true});
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

    if(this.state.username === 'admin' && this.state.password === 'admin'){
      localStorage.setItem('username', this.state.username);
      localStorage.setItem('password', this.state.password);
    
      return this.setState({ error: '',isVisible : false });
    }
    else{
      return this.setState({ error: 'Invalid Details' });
    }

  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  render(){
    return (
      this.state.isVisible?<div class="cont"><div className="Login">
        <form onSubmit={this.handleSubmit} class="form">
        <h1>Login</h1>
          {
            this.state.error &&
            <h3 data-test="error" onClick={this.dismissError}>
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          }
          <label>User Name</label>
          <input type="text" data-test="username" class="user" placeholder="UserName" value={this.state.username} onChange={this.handleUserChange} />
  
          <label>Password</label>
          <input type="password" data-test="password" class="pass" placeholder="Password" value={this.state.password} onChange={this.handlePassChange} />
  
          <input type="submit" value="Log In" data-test="submit" class="login" />
        </form></div></div>
         :<div><div class="cont"><h1>Welcome {this.state.username} </h1>
         <table id="myTable">
           <tr>
         <th>S.No</th>
      <th>Event</th>
      <th>Date</th>
      <th>Time</th>
      </tr>
      <CardContainer></CardContainer>
  </table>
  <br/>
         <center><button class="btn" onClick={this.toggleModal}>ADD Event</button></center>
         <button onClick={this.signOut} class="login" >Sign Out</button></div>
         <Modal show={this.state.isOpen}>
        </Modal>
          </div>
    );
        }

}

class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      eventname: '',
      date: '',
      time: '',
      emptyErr: ''
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.dismissEmptyError = this.dismissEmptyError.bind(this);
    this.object1 = {event1: "", time1: "", date1: ""};
    this.state = {
      arr : []
    }
  }

  handleAdd(){
    if (!this.state.eventname) {
      return this.setState({ emptyErr: 'Event is required' });
    }

    if (!this.state.time) {
      return this.setState({ emptyErr: 'Time is required' });
    }

    if (!this.state.date) {
      return this.setState({ emptyErr: 'Date is required' });
    }
    this.state.object1= {event1: this.state.eventname, time1: this.state.time, date1: this.state.date};
    this.state.arr = JSON.parse(localStorage.getItem("array"));
    if(this.state.arr == null){
      var array = [this.state.object1];
      localStorage.setItem("array", JSON.stringify(array));
      this.state.arr = [];
      this.state.arr = JSON.parse(localStorage.getItem("array"));
      console.log(this.state.arr);
    }
    else{
      this.state.arr.push(this.state.object1);
      localStorage.setItem("array", JSON.stringify(this.state.arr));
      this.state.arr = [];
      this.state.arr = JSON.parse(localStorage.getItem("array"));
      console.log(this.state.arr);
    }
    window.location.reload(); 
    window.alert("Added");
    this.setState({
      eventname : '',
      time: '',
      date: '',
      isOpen: false
    });
  }

  dismissEmptyError() {
    this.setState({emptyErr: '' });
  }

  handleEventChange(evt) {
    this.setState({
      eventname: evt.target.value,
    });
  };

  handleTimeChange(evt) {
    this.setState({
      time: evt.target.value,
    });
  }
  handleDateChange(evt) {
    this.setState({
      date: evt.target.value,
    });
  }
  render() {
    if(!this.props.show){
      return null;
    }
    return (
      <div id="id01" class="modal">
      <div class="modal-content animate">
        <div class="container">
        {
            this.state.emptyErr &&
            <h3 data-test="error" onClick={this.dismissEmptyError}>
              <button onClick={this.dismissEmptyError}>✖</button>
              {this.state.emptyErr}
            </h3>
          }
            <label for="start"><b>Event</b></label>
          <input type="text" placeholder="Event" name="start" required class="modal_input" value={this.state.eventname} onChange={this.handleEventChange}/>
         <label for="time"><b>Time</b></label>
          <input type="time" id="time" class="modal_input" name="time" required value={this.state.time} onChange={this.handleTimeChange}/>
          <label for="date"><b>Date:</b></label>
           <input type="date" id="date" name="date" class="modal_input" required value={this.state.date} onChange={this.handleDateChange}/>
          <button type="submit" class="modal_button" onClick={this.handleAdd}>Add Event</button>
            </div>
            </div>
          </div>
       
    );
  }
}
Modal.propTypes = {
  show: PropTypes.bool
}

class CardContainer extends React.Component {   
  constructor() {
    super();
    this.state = {
      arr2 :[]
    };
    this.takeData = this.takeData.bind(this);
  }


  takeData(){
    console.log("startted");
    this.state.arr = [];
    this.state.arr = JSON.parse(localStorage.getItem("array"));
    if(this.state.arr != null){
    for(var i = 0; i < this.state.arr.length; i++){

    }
    }
  }

  render() {
      this.state.arr = [];
      var sno=[];
      var ev =[];
      var da =[];
      var tm =[];
      this.state.arr = JSON.parse(localStorage.getItem("array"));
      console.log(this.state.arr);
      if(this.state.arr != null){
      for(var i = 0; i < this.state.arr.length; i++){
        sno.push(<p>{i}</p>);
        ev.push(<p>{this.state.arr[i].event1}</p>);
        da.push(<p>{this.state.arr[i].date1}</p>);
        tm.push(<p>{this.state.arr[i].time1}</p>);        
            }
      return (
        <tr>
          <td>{sno}</td>
          <td>{ev}</td>
          <td>{da}</td>
          <td>{tm}</td>
        </tr>
    );
      }
      else{
        return(
          <div></div>
        )
      }

  }
}

export default LoginPage;