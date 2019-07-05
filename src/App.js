/* global EventSource */
import React from 'react'
import * as request from 'superagent'
import { connect } from 'react-redux'
import { onEvent } from './actions/messages'

class App extends React.Component {
  state = {
    message: ''
  }

  url = 'https://rocky-shore-20649.herokuapp.com'

  source = new EventSource(`${this.url}/stream`)

  componentDidMount () {
    this.source.onmessage = this.props.onEvent
  }

  onChange = (event) => {
    const { value } = event.target

    this.setState({ message: value })
  }

  onSubmit = (event) => {
    event.preventDefault()

    console.log('submit')

    const { message } = this.state

    this.setState({ message: '' })

    request
      .post(`${this.url}/message`)
      .send({ message })
      .then(response => {
        console.log('response test:', response)
      })
      .catch(console.error)
  }

  render () {
    const messages = this
      .props
      .messages
      .map((message, index) => <p
        key={index}
      >
        {message}
      </p>)

    return <main>
      <form onSubmit={this.onSubmit} >
        <input
          onChange={this.onChange}
          type='text'
          value={this.state.message}
        />

        <button>
          send
        </button>
      </form>

      {messages}
    </main>
  }
}

function mapStateToProps (state) {
  const { messages } = state

  return { messages }
}

const mapDispatchToProps = { onEvent }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
