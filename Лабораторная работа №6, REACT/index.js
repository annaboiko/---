import React, { Component } from 'react'
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card'

import './UserProfile.css'

class UserProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      people: [],
    }
  }
  componentDidMount(){
    let number = this.props.number
    fetch(`https://randomuser.me/api/?results=${number}`)
    .then(results => {
      return results.json();
    }).then(data => {
      let names = data.results.map((person) => {
        let title = (person.name.title);
        let firstname = (person.name.first);
        let lastname = (person.name.last);
        let fullname = `${title} ${firstname} ${lastname}`;
        let userpic = person.picture.large;
        let email = person.email;
        let city = (person.location.city);
        let age = person.dob.age;
        let number = person.cell;
        let gender = person.gender;
        this.setState((prevState)=> ({
          people: [
            ...prevState.people,
            {
              name: fullname,
              picsrc: userpic,
              email,
              city,
              age,              
              number,
              gender
              
            }
          ]
        }))

      })

    })

  }
  render(){
    return (
      <div id="card-holder">
    {this.state.people.map((obj,idx) => {
      return(
              <Card className="cards" key={idx}>
              <CardHeader title={obj.name} avatar={obj.picsrc} />
              <CardTitle title={obj.city} subtitle={obj.email} />
              <CardTitle subtitle={obj.age} />
              <CardTitle subtitle={obj.number} />
              <CardTitle subtitle={obj.gender} />
              </Card>
            )})}
    </div>

  )}
}


export default UserProfile
