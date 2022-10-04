import Constants from './Constants';

export default function getGlossary() {
    const url = Constants.API_URL_GET_GLOSSARY;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((glossary) => {
        console.log(glossary);
        return glossary;
      })
      .catch((err) => {
        alert(err);
      });
}