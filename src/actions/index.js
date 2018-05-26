import * as constants from '../constants/index'

export const addWidget = (dispatch,text) => {
    dispatch({type: constants.ADD, text: text});
};

export const deleteWidget = (dispatch,id) => {
    dispatch({type: constants.DELETE, id: id});
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

export const changeWidgetType = (dispatch,widgetId,newType) => {
    dispatch({
        type: constants.SELECT_WIDGET_TYPE,
        id: widgetId,
        widgetType: newType
    });
};

export const headingSizeChanged = (dispatch,widgetId,newSize) => {
    dispatch({
        type: constants.HEADING_SIZE_CHANGED,
        id: widgetId,
        size: newSize
    });
};