import * as constants from '../constants/index'

export const widgetReducer = (state={widgets: []},action) => {
    switch (action.type) {
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
                        text: action.text,
                        widgetType: 'Paragraph'
                    }]
            };
        case constants.DELETE:
            return {widgets:
                state.widgets.filter(widget => widget.id !== action.id)};
        default:
            return state;
    }
};