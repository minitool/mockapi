import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '',
      body: '',
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeTextArea = this.handleChangeTextArea.bind(this);
  }

  handleChangeInput(event) {
    this.setState({path: event.target.value});
  }

  handleChangeTextArea(event) {
    this.setState({body: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.body);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="name"
          onChange={this.handleChangeInput}
        />

        <br></br>
        <TextareaAutosize
          rows={3}
          placeholder='body content'
          onChange={this.handleChangeTextArea}
        />
        <br></br>
        <button
          type="submit"
          onClick={this.handleSubmit}
        >Submit</button>
      </div>
    );
  }
}

export default App;
