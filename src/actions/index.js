import * as constants from '../constants/index'

export const addWidget = (dispatch) => {
    dispatch({type: constants.ADD});
};

export const deleteWidget = (dispatch,id) => {
    dispatch({type: constants.DELETE, id: id});
};

export const findAllWidgets = (dispatch) => {
    fetch('https://cs5610-summer1-2018-ssharma.herokuapp.com/api/widget')
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

export const previewWidgets = dispatch => {
    dispatch({
        type: constants.PREVIEW
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

export const headingTextChanged = (dispatch,widgetId,newText) => {
    dispatch({
        type: constants.HEADING_TEXT_CHANGED,
        id: widgetId,
        text: newText
    });
};