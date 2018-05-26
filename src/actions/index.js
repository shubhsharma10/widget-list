import * as constants from '../constants/index'

export const addWidget = (dispatch,text) => {
    dispatch({type: constants.ADD, text: text});
};

export const deleteWidget = (id) => {
    return ({type: constants.DELETE, id: id});
};

export const findAllWidgets = (dispatch) => {
    fetch('http://localhost:8080/api/widget')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL,
            widgets: widgets
        }));
};

export const saveWidgets = dispatch => {
    dispatch({
        type: constants.SAVE
    });
};