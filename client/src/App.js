import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  state = {
    projects: []
  }

  componentDidMount() {
    axios
      .get('/projects')
      .then(res => this.setState({ projects: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    const { projects } = this.state

    return (
      <div className="App">
        {projects.map(({ id, name, description, completed }) => (
          <div
            key={id}
            style={{
              border: '1px dotted grey',
              margin: '10px',
              padding: '5px'
            }}
          >
            <h3>{name}</h3>
            <p>{description}</p>
            <p>{completed ? `completed` : `not completed`}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default App
