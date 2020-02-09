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

  render() {
    return (
      <div>
        <h2>Customers</h2>
        <input
          type="number"
          value={this.state.id}
          onChange={e => this.changeIdInput(e.target.value)}
        />
        <input
          type="text"
          value={this.state.firstName}
          onChange={e => this.changeFirstNameInput(e.target.value)}
        />
        <input
          type="text"
          value={this.state.lastName}
          onChange={e => this.changeLastNameInput(e.target.value)}
        />
        <button type="submit" onClick={() => this.addToList()}>
          add
        </button>
        <ul>
          {this.state.customers.map(customer => (
            <li key={customer.id}>
              {customer.id} {customer.firstName} {customer.lastName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Customers;
