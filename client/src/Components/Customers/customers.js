import React, { Component } from "react";
import "./customers.css";

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      customers: []
    };
  }

  componentDidMount() {
    fetch("/api/customers")
      .then(res => res.json())
      .then(customers =>
        this.setState({ customers }, () =>
          console.log("customers fetched..", customers)
        )
      );
  }

  changeIdInput(input) {
    this.setState({ id: input });
  }

  changeFirstNameInput(input) {
    this.setState({ firstName: input });
  }

  changeLastNameInput(input) {
    this.setState({ lastName: input });
  }

  addToList() {
    let newList = this.state.customers;
    newList.push({
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    });
    fetch(
      `/api/customers/add?id=${this.state.id}firsName=${this.state.firstName}lastName=${this.state.lastName}`
    )
      .then(res => res.json())
      .then(customers => this.setState({ customers: newList }));
  }

  deleteItem(input){
    let arr=this.state.customers;
    arr.splice(input,1)
    console.log(arr)
    this.setState({
        customers:arr
    });
  }
  render() {
    return (
      <div>
        <h2>Customers</h2>
        <input
          type="number"
          placeholder="Enter an ID"
          value={this.state.id}
          onChange={e => this.changeIdInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your first name"
          value={this.state.firstName}
          onChange={e => this.changeFirstNameInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your last name"
          value={this.state.lastName}
          onChange={e => this.changeLastNameInput(e.target.value)}
        />
        <button type="submit" onClick={() => this.addToList()}>
          add
        </button>
        <ul>
          {this.state.customers.map((customer, index) => (
            <li key={customer.id} onClick={() => this.deleteItem(index)}>
              {customer.id} {customer.firstName} {customer.lastName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Customers;
