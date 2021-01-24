import React, { ChangeEvent } from "react";

type State = {
  input: string
  output: string
}

class EmojifyInput extends React.Component<object, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      input: "Hello world this is a test!",
      output: "",
    }
  }

  async submit() {
    try {
      let response = await fetch('/emojify', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: this.state.input,
        })
      })

      let json = await response.json();
      this.setState({
        output: json.message
      })
    } catch (error) {
      console.error(error)
    }
  }

  inputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      input: event.target.value
    })
  }

  render() {
    return (
      <div className="EmojifyInput">
        <textarea
          rows={4}
          cols={50}
          className="input"
          onChange={(event) => this.inputChange(event)}
          value={this.state.input}/>
        <textarea
          rows={4}
          cols={50}
          className="output"
          value={this.state.output}/>
        <br />
        <button
          className="submit"
          onClick={() => this.submit()}
        >Submit</button>
      </div>
    );
  }
}

export default EmojifyInput;