import React, { useState } from "react";
import Constants from "../utils/Constants";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid, Stack } from "@mui/material";

const Editdefinition = (props) => {
  const initialformValues = Object.freeze({
    definition: props.definition,
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

    if (formValues.definition === "") {
      alert("Cannot edit to empty definition");
      return;
    }

    if (formValues.definition === props.definition) {
      alert("Definition is the same");
      return;
    }

    const editedDefinition = {
      term: props.term,
      definition: formValues.definition,
    };
    const url = Constants.API_URL_EDIT_DEFINITION;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedDefinition),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
    props.onDefinitionEdited(editedDefinition);
  };

  return (
    <form>
      <TextField
        id="outlined-basic"
        label="definition"
        variant="outlined"
        size="small"
        value={formValues.definition}
        name="definition"
        type="text"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <Grid container justifyContent="center">
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" size="small" onClick={handleSubmit}>
            Update
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => props.onDefinitionEdited(null)}
          >
            Cancel
          </Button>
        </Stack>
      </Grid>
    </form>
  );
};
export default Editdefinition;
