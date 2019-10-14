import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '',
      body: '',
      messageContent: '',
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeTextArea = this.handleChangeTextArea.bind(this);
  }

  handleChangeInput(event) {
    this.setState({
      path: event.target.value,
      messageContent: '',
    });
  }

  handleChangeTextArea(event) {
    this.setState({
      body: event.target.value,
      messageContent: '',
    });
  }

  async handleSubmit(event) {
    const url = 'http://localhost:7000/path';
    const { path, body } = this.state;
    const dataObj = {
      [path]: body,
    };
    const data = JSON.stringify(dataObj);
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data,
      url,
    };
    let response;
    try {
      await axios(options);
      this.setState({ messageContent: `success, please visit /path/${path}` });
    } catch (error) {
      response = error.data;
      this.setState({ messageContent: `please try again` });
    }

    event.preventDefault();
  }

  render() {
    return (
      <div className="containter">
        <div className="input-section">
          <label for="name">Path name: </label>
          <br></br>
          <input
            type="text"
            className="input-control"
            name="name"
            id="name"
            onChange={this.handleChangeInput}
          />
          <p>(note: if the path already exist then it will be overwritten)</p>
        </div>

        <br></br>
        <label for="body-content">Body: </label>
        <br></br>
        <TextareaAutosize
          className="body-content"
          id="body-content"
          rows={3}
          placeholder='body content'
          onChange={this.handleChangeTextArea}
          style={{ minHeight: 20, maxHeight: 80 }}
        />

        <br></br>
        <br></br>
        <button
          type="submit"
          onClick={this.handleSubmit}
        >Submit</button>
        <div>
          <p>{this.state.messageContent}</p>
        </div>
      </div>
    );
  }
}

export default App;
