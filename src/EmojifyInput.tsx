import React, { ChangeEvent } from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import styles from './EmojifyInput.module.css';

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

  async emojify() {
    try {
      let response = await fetch('https://emojify.hamologist.com/emojify', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: this.state.input
            .replaceAll('\n', '\\\\n')
            .replaceAll('\r', '\\\\r'),
        })
      })

      let json = await response.json();
      this.setState({
        output: json.message
          .replaceAll('\\n', '\n')
          .replaceAll('\\r', '\r')
      })
    } catch (error) {
      console.error(error)
    }
  }

  inputChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    this.setState({
      input: event.target.value
    })
  }

  render() {
    return (
      <div className={styles.root}>
        <Grid container className={styles.container} spacing={3}>
          <Grid item xs={12} md={6} className={styles.item}>
            <TextField
              id="outlined-muliline-static"
              label="Input"
              multiline
              onChange={(event) => this.inputChange(event)}
              rows={12}
              fullWidth={true}
              value={this.state.input}
            />
          </Grid>
          <Grid item xs={12} md={6} className={styles.item}>
            <TextField
              id="outlined-muliline-static"
              label="Output"
              multiline
              rows={12}
              fullWidth={true}
              value={this.state.output}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={12} className={styles.item}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.emojify()}
            >Emojify</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default EmojifyInput;