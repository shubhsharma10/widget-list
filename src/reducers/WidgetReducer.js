import * as constants from '../constants/index'

export const widgetReducer = (state={widgets: []},action) => {
    switch (action.type) {
        case constants.HEADING_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.text = action.text;
                    }
                    return Object.assign({}, widget);
                })
            };
        case constants.HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.size = action.size;
                    }
                    return Object.assign({}, widget);
                })
            };
        case constants.SELECT_WIDGET_TYPE:
            let newState =  {
                widgets:
                    state.widgets.filter((widget)=>
                        {
                            if(widget.id === action.id) {
                                widget.widgetType = action.widgetType;
                            }
                            return true;
                        })};
            return JSON.parse(JSON.stringify(newState));

        case constants.SAVE:
            alert('Saved Widgets to database');
            fetch('http://localhost:8080/api/widget/save', {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'
                }
            });
            return state;
        case constants.FIND_ALL:
            return{widgets: action.widgets};

        case constants.ADD:
            return {widgets:
                [...state.widgets,
                    {
                        id: state.widgets.length+4,
                        widgetType: 'Paragraph',
                        size: '2'
                    }]
            };
        case constants.DELETE:
            return {widgets:
                state.widgets.filter(widget => widget.id !== action.id)};
        default:
            return state;
    }
};