import React, { Component } from "react";
import moment from "moment";
import './App.css'

class CalendarToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = { inputDate : ''}
    this.changeInput = this.changeInput.bind(this);
  }

  changeInput(e) {
    this.setState({ inputDate: e.target.value });
  }

  render() {
    return (
      <div>
        <div className = 'floatleft'>
          <button onClick={() => this.props.changeMonth("LY")}>
            previous year
          </button>
          <button onClick={() => this.props.changeMonth("LM")}>
            previous month
          </button>
          <button onClick={() => this.props.changeMonth("RM")}>
            next month
          </button>
          <button onClick={() => this.props.changeMonth("RY")}>
            next year
          </button>
        </div>
        <p className = 'floatleft'>{moment(this.props.selected).format("YYYYMM")}</p>
        <input className = 'floatleft' onChange={this.changeInput} placeholder="YYYYMMDD" />
        <button className = 'floatleft' onClick={()=>this.props.changeDate(this.state.inputDate)}>
          move
        </button>
      </div>
    );
  }
}

export default CalendarToolBar;
