import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listmembers: ''
    }
  }

  getMembers = () => {
    fetch("/api/memberList")
    .then(res => {
      return res.json();
    }).then(json => {
      this.setState({
        listMembers: json.members
      });
    })
    .catch(err => {
      console.log("error", err);
    });
  }

  render() {
    let members = this.state.listMembers;
    if (this.state.listMembers) {
      return (
        <div>
          <h1>Mailing List Members</h1>
          <ul>
            {
              members.map((member, index) =>
                <li key={index}>{`${member.email_address}`}</li>
              )
            }
          </ul>

        </div>
      );
    }
    return (
      <div>
        <h1>Mailing List Members</h1>
        <button onClick={this.getMembers}>Get Members</button>
      </div>
    );
  }
}

export default App;
