import React, { Component } from "react";
import "./App.css";
import CalendarToolBar from "./CalendarToolBar";
import SelectedDate from "./SelectedDate";
import moment from "moment";
import PropTypes from "prop-types";
import _ from "lodash";
// props 형태로 디비와 월별 통신하는 함수를 만들것, 송신하는 것도
//onclick  은 왜 화살함수형태로 만들어야 하는가?

/*Calendar.propTypes = {
  reserveData: PropTypes.arrayOf(
    PropTypes.shape({
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      startHour: PropTypes.string,
      endHour: PropTypes.string,
      people: PropTypes.number
    })
  )
};*/

class CalendarHead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: moment().format("YYYYMMDD"),
      firstDay: moment()
        .startOf("month")
        .startOf("week")
        .format("YYYYMMDD"),
      datesWithInfo: _.map(_.range(42), function(i) {
        return { order: i };
      }),
      test: [],
      sample : "'2000-01-01', '2021-11-07'"
    };
    this.changeDate = this.changeDate.bind(this);
    this.getDB = this.getDB.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let firstday = this.state.firstDay;
    this.setState({
      datesWithInfo: _.map(this.state.datesWithInfo, function(i) {
        return {
          order: i.order,
          date: moment(firstday)
            .add(i.order, "d")
            .format("YYYYMMDD")
        };
      })
    });
    fetch("/crud", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({ test: res });
      });
  }

  changeDate(props) {
    let firstday = moment(props)
      .startOf("month")
      .startOf("week")
      .format("YYYYMMDD");
    this.setState({
      selected: moment(props).format("YYYYMMDD"),
      firstDay: firstday,
      datesWithInfo: _.map(this.state.datesWithInfo, function(i) {
        return {
          order: i.order,
          date: moment(firstday)
            .add(i.order, "d")
            .format("YYYYMMDD")
        };
      })
    });
  }

  getDB(props) {
    //DB에서
  }

  postDB() {
    //delete는?
  }

  handleClick() {
    fetch("/crud", {
      method: "POST",
       body : JSON.stringify(this.state.sample)
    });
  }

  render() {
    console.log(this.state.test);
    return (
      <div>
        <Calendar
          getDB={this.getDB}
          postDB={this.postDB}
          selected={this.state.selected}
          firstDay={this.state.firstDay}
          changeDate={this.changeDate}
          datesWithInfo={this.state.datesWithInfo}
          postDB={this.postDB}
        />
        <button onClick={this.handleClick}> click to post </button>
      </div>
    );
  }
}

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reserveBoxIshidden: true,
      inputDate: ""
    };
    this.changeMonth = this.changeMonth.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeSelected(param) {
    this.props.changeDate(param);
    this.setState({ reserveBoxIshidden: false });
  }

  changeMonth(props) {
    let newChangeSelected = moment(this.props.selected);
    switch (props) {
      case "LY":
        newChangeSelected.subtract(1, "y");
        break;
      case "LM":
        newChangeSelected.subtract(1, "M");
        break;
      case "RM":
        newChangeSelected.add(1, "M");
        break;
      case "RY":
        newChangeSelected.add(1, "y");
        break;
    }
    this.props.changeDate(newChangeSelected);
  }

  handleSubmit(param) {
    this.setState({ reserveBoxIshidden: true });
    alert("예약이 접수되었습니다.");
    this.props.postDB(param);
  }

  render() {
    return (
      <div>
        <div className="calendarbox">
          <CalendarToolBar
            changeMonth={this.changeMonth}
            selected={this.props.selected}
            changeInput={this.props.changeInput}
            changeDate={this.props.changeDate}
            inputData={this.props.inputData}
          />
          <br />
          <br />
          <br />
          {this.props.datesWithInfo.map(i => (
            <Date date={i.date} changeSelected={this.changeSelected} />
          ))}
        </div>
        <SelectedDate
          reserveBoxIshidden={this.state.reserveBoxIshidden}
          handleSubmit={this.handleSubmit}
          date={this.props.selected}
        />
      </div>
    );
  }
}

class Date extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p
        className="datebox"
        onClick={() => {
          this.props.changeSelected(this.props.date);
        }}
      >
        {this.props.date}
      </p>
    );
  }
}

export default CalendarHead;
