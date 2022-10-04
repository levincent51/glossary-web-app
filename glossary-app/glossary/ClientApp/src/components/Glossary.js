import React, { useState, useEffect } from "react";
import CrudButton from "./CrudButton";
import Constants from "../utils/Constants";
import NewTerm from "./NewTerm";
import EditTerm from "./EditTerm";
import { Stack, Paper } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Editdefinition from "./EditDefinition";

const Glossary = () => {
  const [glossaryTerms, setGlossaryTerms] = useState([]);

  const [addTermForm, setAddTermForm] = useState(false);
  const [editTermForm, setEditTermForm] = useState("");
  const [editDefinitionForm, setEditDefinitionForm] = useState("");

  const deleteTerm = (term) => {
    const url = `${Constants.API_URL_REMOVE_TERM}?term=${term}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((glossary) => {
        console.log(glossary);
        onTermDeleted(term);
      })
      .catch((err) => {
        alert(err);
      });
  };

  function getGlossary() {
    const url = Constants.API_URL_GET_GLOSSARY;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((glossary) => {
        console.log(glossary);
        setGlossaryTerms(glossary);
      })
      .catch((err) => {
        alert(err);
      });
  }

  const onTermAdded = (res) => {
    console.log(res);
    setAddTermForm(false);

    if (res === null) {
      return;
    }
    alert(`${res.term} was added to the glossary`);

    getGlossary();
  };

  const onTermDeleted = (term) => {
    alert(`${term} was deleted`);
    getGlossary();

  }

  const onTermEdited = (res) => {
    setEditTermForm(false);

    console.log(res);
    if (res === null) {
      return;
    }
    alert(`${res.oldTerm} was changed to ${res.newTerm}`);

    getGlossary();
  };

  const onDefinitionEdited = (res) => {
    setEditDefinitionForm(false);

    console.log(res);
    if (res === null) {
      return;
    }
    alert(`${res.term} has a new definition: ${res.definition}`);

    getGlossary();
  };

  useEffect(() => {
    getGlossary();
  }, []);

  return (
    <>
      {addTermForm && <NewTerm onTermAdded={onTermAdded} />}

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                <h3>Glossary</h3>
              </TableCell>
            </TableRow>
            {!addTermForm && (
              <>
                <CrudButton
                  name="Add new Term"
                  onClick={() => setAddTermForm(true)}
                  size={"large"}
                />
              </>
            )}
            <TableRow>
              <TableCell align="centre"><b>Term</b></TableCell>
              <TableCell align="centre"><b>Definition</b></TableCell>
              <TableCell align="centre"><b>Edit Operations</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {glossaryTerms?.sort((a,b) => a.term.localeCompare(b.term))?.map((row) => (
              <TableRow key={row.term}>
                <TableCell align="centre">
                  {editTermForm === row.term && (
                    <EditTerm term={row.term} onTermEdited={onTermEdited} />
                  )}
                  {editTermForm !== row.term && row.term}
                </TableCell>
                <TableCell align="centre">
                  {editDefinitionForm === row.definition && (
                    <Editdefinition
                      term={row.term}
                      definition={row.definition}
                      onDefinitionEdited={onDefinitionEdited}
                    />
                  )}
                  {editDefinitionForm !== row.definition && row.definition}
                </TableCell>
                <TableCell align="centre">
                  <Stack spacing={1}>
                    <CrudButton
                      name="Edit Term"
                      onClick={() => setEditTermForm(row.term)}
                    />
                    <CrudButton
                      name="Edit Definition"
                      onClick={() => setEditDefinitionForm(row.definition)}
                    />
                    <CrudButton
                      name="Remove Term"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete the term: ${row.term}?`
                          )
                        )
                          deleteTerm(row.term);
                      }}
                    />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default Glossary;
