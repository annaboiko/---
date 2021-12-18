import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";

const store = createStore(Friend_reducer);

function Friend_reducer(state = [], action) {
  const user_index = state.indexOf(action.user_name);

  switch (action.type) {
    case "add_friend":
      if (user_index < 0) {
        return [...state, action.user_name];
      } else return state;
    case "remove_friend":
      return [...state.slice(0, action.id), ...state.slice(action.id + 1)];
    default:
      return state;
  }
}

function addFriendAction(id, user_name) {
  return {
    type: "add_friend",
    id,
    user_name
  };
}

function removeFriendAction(id) {
  return {
    type: "remove_friend",
    id
  };
}
class AddFriendButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    store.dispatch(addFriendAction(this.props.id, this.props.user_name));
  }

  render() {
    return (
      <div className="AddFriendButton">
        <button onClick={this.handleClick}>{this.props.label}</button>
      </div>
    );
  }
}
class RemoveFriendButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    store.dispatch(removeFriendAction(this.props.id));
  }

  render() {
    return (
      <div className="RemoveFriendButton">
        <button onClick={this.handleClick}>{this.props.label}</button>
      </div>
    );
  }
}

function FriendCard(props) {
  return (
    <div className="FriendCard">
      <p>
        {props.user_name.first} {props.user_name.last}{" "}
        <RemoveFriendButton label="Убрать из друзей" id={props.id} />
      </p>
      <br />
    </div>
  );
}
class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: []
    };
  }
  connectToStore() {
    store.subscribe(() => {
      this.setState(() => {
        return { content: store.getState() };
      });
    });
  }

  render() {
    this.connectToStore();
    var friend_cards = [];
    for (var i = 0; i < this.state.content.length; i++) {
      friend_cards.push(
        <FriendCard id={i} user_name={this.state.content[i]} />
      );
    }

    return <div className="FriendsList">{friend_cards}</div>;
  }
}

class GetUsersButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
    this.state = { loading: false };
    this.Click = this.Click.bind(this);
  }

  async Click() {
    this.setState({ loading: true });
    let response = await fetch(
      "https://randomuser.me/api/?results=10&inc=gender,name,location,email,dob,phone,picture"
    );
    if (!response.ok) {
      alert("HTTP error: " + response.status);
      this.setState({ loaded: false });
    } else {
      let data = await response.text();
      this.setState({ users: data });
      this.setState({ loaded: true });
    }

    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) return <div className="GetUsersButton" />;
    else if (this.state.loaded)
      return (
        <div className="GetUsersButton">
          <button onClick={this.Click}>{this.props.label}</button>
          <br />
          <br />
          <UsersList users={this.state.users} />
        </div>
      );
    else
      return (
        <div className="GetUsersButton">
          <button onClick={this.Click}>{this.props.label}</button>
        </div>
      );
  }
}
function UserCard(props) {
  return (
    <div style={{ border: "2px solid black", textAlign: "center" }}>
      <div className="UserCard">
        <UserAvatar src={props.user.picture.thumbnail} />

        <b>
          {props.user.name.first} {props.user.name.last}
        </b>
        <p>gender- {props.user.gender}</p>
        <p>{props.user.location.city}</p>
        <p> {props.user.location.state}</p>
        <p>{props.user.email}</p>
        <p> {props.user.phone}</p>
        <p>
          {props.user.dob.date}, {props.user.dob.age},
        </p>
        <p>
          <AddFriendButton
            label="Добавить в друзья"
            user_name={props.user.name}
          />
        </p>
        <br />
        <br />
      </div>
    </div>
  );
}
function UsersList(props) {
  var users = JSON.parse(props.users);
  var user_cards = [];
  for (var i = 0; i < users.results.length; i++) {
    user_cards.push(<UserCard user={users.results[i]} />);
  }

  return <div className="UsersList">{user_cards}</div>;
}
function UserAvatar(props) {
  return (
    <div className="UserAvatar">
      <img src={props.src} width="100px" height="100px" alt="user avatar" />
    </div>
  );
}
function App() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <h1>Друзья</h1>
            <FriendsList />
            <h1>________</h1>
            <h1>Информация о пользователях</h1>
            <GetUsersButton label="Получить" />
          </div>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
