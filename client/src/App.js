import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return <APITestComponent />;
  }
}

class APITestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputID: 0,
      createNew: false,
      newAccount: {},
      selectedAccount: {},
      newReserve: {},
      selectedReserve: []
    };
    this.inputIDHandler = this.inputIDHandler.bind(this);
    this.createNew = this.createNew.bind(this);
    this.submitAccount = this.submitAccount.bind(this);
    this.AccountHandler = this.AccountHandler.bind(this);
    this.findTableType = this.findTableType.bind(this);
    this.getData = this.getData.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.reserveHandler = this.reserveHandler.bind(this);
    this.submitReserve = this.submitReserve.bind(this);
    this.deleteReserve = this.deleteReserve.bind(this);
  }

  inputIDHandler(e) {
    let value = e.target.value;
    this.setState({ inputID: value });
  }

  AccountHandler(e) {
    let target = e.target;
    this.setState(prevState => ({
      newAccount: {
        ...prevState.newAccount,
        [target.name]: target.value
      }
    }));
  }

  reserveHandler(e) {
    let target = e.target;
    this.setState(prevState => ({
      newReserve: {
        ...prevState.newReserve,
        [target.name]: target.value
      }
    }));
  }

  findTableType(props) {
    let dbTable = "";
    switch (props.toString().charAt(0)) {
      case "1":
        dbTable = "cars";
        break;
      case "2":
        dbTable = "dealers";
        break;
      case "3":
        dbTable = "stores";
        break;
    }
    return dbTable;
  }

  getData() {
    let dbTable = this.findTableType(this.state.inputID);
    fetch(`/${dbTable}/${this.state.inputID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => this.setState({ selectedAccount: res[0] }));
    fetch(`/reserves/${dbTable}.${this.state.inputID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => this.setState({ selectedReserve: res }));
  }

  createNew() {
    this.setState({ createNew: true });
  }

  submitAccount() {
    let dbTable = this.findTableType(this.state.newAccount.ID);
    fetch(`/${dbTable}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.newAccount)
    });
    this.setState({ createNew: false, newAccount: {} });
  }

  submitReserve() {
    fetch("/reserves", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.newReserve)
    });
    this.setState({ createNew: false, newAccount: {} });
  }

  deleteAccount() {
    let dbTable = this.findTableType(this.state.selectedAccount.ID);
    fetch(`/${dbTable}/${this.state.selectedAccount.ID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    this.setState({ selectedAccount: {} });
  }

  deleteReserve(param) {
    fetch(
      `/reserves/:${this.state.selectedReserve[param]['ID']}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      }
    ).then(console.log(param));
  }

  render() {
    let keys = Object.keys(this.state.selectedAccount);
    return (
      <div>
        <div className="box">
          <input type="number" onChange={this.inputIDHandler} />
          <button onClick={this.getData}> 검색 </button>
          <button onClick={this.createNew}> 신규 </button>
        </div>
        <div className={this.state.createNew ? "box" : "hidden"}>
          <input
            name="ID"
            onChange={this.AccountHandler}
            type="number"
            placeholder="ID를 입력하세요"
          />
          <input
            name="model"
            onChange={this.AccountHandler}
            type="string"
            placeholder="모델을 입력하세요"
          />
          <input
            name="store"
            onChange={this.AccountHandler}
            type="number"
            placeholder="매장을 입력하세요"
          />
          <input
            name="name"
            onChange={this.AccountHandler}
            type="string"
            placeholder="이름을 입력하세요"
          />
          <button onClick={this.submitAccount}> twice! </button>
        </div>
        <div className="box">
          {keys.map(i => (
            <p className="left">
              {i + ": " + this.state.selectedAccount[i] + "  /  "}
            </p>
          ))}
          <button onClick={this.deleteAccount}> del </button>
        </div>

        <div className="box">
          <p> {JSON.stringify(this.state.selectedReserve)}</p>
    {this.state.selectedReserve.map((i, j) => (
         <button onClick={()=>this.deleteReserve(j)}>{"delete" + j} </button>
       ))}
        </div>
        <div>
          <input
            name="dealerID"
            onChange={this.reserveHandler}
            placeholder="딜러ID을 입력하세요"
            className={this.state.IDType == "2" ? "hidden" : undefined}
          />
          <input
            name="carID"
            onChange={this.reserveHandler}
            className={this.state.IDType == "1" ? "hidden" : undefined}
            placeholder="차량ID를 입력하세요"
          />
          <input
            placeholder="시작일을 입력하세요"
            name="startDate"
            onChange={this.reserveHandler}
          />
          <input
            placeholder="종료일을 입력하세요"
            name="finishDate"
            onChange={this.reserveHandler}
          />
          <button onClick={this.submitReserve}> twice! </button>
        </div>
      </div>
    );
  }
}

export default App;
