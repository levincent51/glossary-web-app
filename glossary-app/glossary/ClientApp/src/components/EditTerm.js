import React, { useState } from "react";
import Constants from "../utils/Constants";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid, Stack } from "@mui/material";

const EditTerm = (props) => {
  const initialformValues = Object.freeze({
    term: props.term,
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

    if (formValues.term === "") {
      alert("Cannot edit to empty term");
      return;
    }
    if (formValues.term === props.term) {
      alert("Term is the same");
      return;
    }

    const editedTerm = {
      oldTerm : props.term,
      newTerm : formValues.term
    };
    const url = `${Constants.API_URL_EDIT_TERM}?oldTerm=${editedTerm.oldTerm}&newTerm=${editedTerm.newTerm}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
    props.onTermEdited(editedTerm);
  };

  return (
    <form>
      <Grid container justifyContent="center">
        <div>
          <TextField
            id="outlined-basic"
            label="Term"
            variant="outlined"
            size="small"
            value={formValues.term}
            name="term"
            type="text"
            margin="normal"
            onChange={handleChange}
          />
        </div>
      </Grid>

      <Grid container justifyContent="center">
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" size="small" onClick={handleSubmit}>
            Update
          </Button>
          <Button variant="outlined" size="small" onClick={() => props.onTermEdited(null)}>
            Cancel
          </Button>
        </Stack>
      </Grid>
    </form>
  );
};
export default EditTerm;
