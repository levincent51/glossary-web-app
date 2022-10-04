const API_URL_DEV = 'https://localhost:7272';

const ENDPOINTS = {
    GET_GLOSSARY: 'get-glossary',
    ADD_TERM: 'add-term',
    EDIT_DEFINITION: 'edit-definition',
    EDIT_TERM: 'edit-term',
    REMOVE_TERM: 'remove-term'
}

const Constants = {
    API_URL_GET_GLOSSARY: `${API_URL_DEV}/${ENDPOINTS.GET_GLOSSARY}`,
    API_URL_ADD_TERM: `${API_URL_DEV}/${ENDPOINTS.ADD_TERM}`,
    API_URL_EDIT_DEFINITION: `${API_URL_DEV}/${ENDPOINTS.EDIT_DEFINITION}`,
    API_URL_EDIT_TERM: `${API_URL_DEV}/${ENDPOINTS.EDIT_TERM}`,
    API_URL_REMOVE_TERM: `${API_URL_DEV}/${ENDPOINTS.REMOVE_TERM}`
}
export default Constants;