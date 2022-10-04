import React, { useState } from "react";
import Constants from "../utils/Constants";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid, Stack } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const NewTerm = (props) => {
  const initialformValues = Object.freeze({
    term: "",
    definition: "",
  });

  const [formValues, setFormValues] = useState(initialformValues);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValues.term === "" || formValues.definition === "") {
      alert("Cannot add empty term and/or definition");
      return;
    }

    const addedTerm = {
      term: formValues.term,
      definition: formValues.definition,
    };
    const url = Constants.API_URL_ADD_TERM;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addedTerm),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert("term already exists");
      });
    props.onTermAdded(addedTerm);
  };

  return (
    <form>
      <Grid container justifyContent="center">
        <h3>Add new term</h3>
      </Grid>

      <Grid container justifyContent="center">
        <div>
          <TextField
            id="outlined-basic"
            label="Term"
            variant="outlined"
            value={formValues.term}
            name="term"
            type="text"
            style={{ width: 500 }}
            margin="normal"
            onChange={handleChange}
          />
        </div>
      </Grid>
      <Grid container justifyContent="center">
        <div>
          <TextareaAutosize
            label="Definition"
            variant="outlined"
            aria-label="minimum height"
            minRows={3}
            placeholder="Definition"
            style={{ width: 500 }}
            value={formValues.definition}
            name="definition"
            type="text"
            margin="normal"
            onChange={handleChange}
          />
        </div>
      </Grid>

      <Grid container justifyContent="center">
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={handleSubmit}>
            Add
          </Button>
          <Button variant="outlined" onClick={() => props.onTermAdded(null)}>
            Cancel
          </Button>
        </Stack>
      </Grid>
    </form>
  );
};
export default NewTerm;
