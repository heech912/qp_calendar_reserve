import React, { Component } from "react";
import "./App.css";

class SelectedDate extends Component {
  constructor(props) {
    super(props);
    this.state = { newReserveInfo: {} };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    this.setState((prevState) => ({
      newReserveInfo: {
        ...prevState.newReserveInfo,
        [target.name]: target.value
      }
    }));
  }

  render() {
    return (
      <p
        className={
          this.props.reserveBoxIshidden ? "reserveboxhidden" : "reservebox "
        }
      >
        {"selected date is :  " + this.props.date}
        <br />
        <p>
          name :
          <input type="string" name="name" onChange={this.handleChange} />
        </p>
        <p>
          people :
          <input type="number" name="people" onChange={this.handleChange} />
        </p>
        <p>
          startTime : <input name="startTime" onChange={this.handleChange} />
        </p>
        <p>
          endTime : <input name="endTime" onChange={this.handleChange} />
        </p>
        <button onClick={()=>this.props.handleSubmit(this.state.newReserveInfo)}> submit </button>
      </p>
    );
  }
}

export default SelectedDate;
