import React from 'react';
import ReactDOM from 'react-dom';
import {connect, Provider} from 'react-redux';
import {createStore, combineReducers } from 'redux';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'

// UI Items
const WidgetComponent = ({widget,dispatch}) => (
    <li>
        {widget.text}
        <button onClick={e => {
            e.preventDefault();
            dispatch(deleteWidget(widget.id));}}>
            Delete
        </button>
    </li>
);

const Widget = connect()(WidgetComponent);

class WidgetListComponent extends React.Component {

    render() {
        return(
            <div className="container-fluid">
                <ul>
                    {this.props.widgets.map(widget =>
                        <Widget key={widget.id} widget={widget}/>)}
                </ul>
            </div>
        )
    }
}


let nextWidgetId = 2;
let initialState = {
    widgets: [
        {text: 'Widget 1', id: 0},
        {text: 'Widget 2', id: 1}
    ]
};

const AddWidgetComponent = ({dispatch}) => {
    let input;
    return(
        <div className="container-fluid justify-content-right">
            <input ref={node => input = node}/>
            <button onClick={e => {
                e.preventDefault();
                dispatch(addWidget(input.value));
                input.value = ''
            }}>Add Widget</button>
        </div>
    );
};

// Reducer

const widgetReducer = (state=initialState,action) => {
  switch (action.type) {
      case 'ADD_WIDGET':
          return {widgets:
              [...state.widgets,
                  {
                      id: state.widgets.length+1,
                      text: action.text
                  }]
          };
      case 'DELETE_WIDGET':
          return {widgets:
              state.widgets.filter(widget => widget.id !== action.id)};
      default:
          return state;
  }
};

const rootReducer = combineReducers({widgetReducer});

// Store
const store = createStore(widgetReducer);

// connect parameters
const mapStateToProps = (state) => ({
    widgets: state.widgets
});

const addWidget = (text) => {
    return({type: 'ADD_WIDGET', text: text});
};

const deleteWidget = (id) => {
    return ({type: 'DELETE_WIDGET', id: id});
};

// const mapDispatchToProps = (dispatch) => ({
//         deleteWidget: (id) => addWidget(dispatch,text)
// });

// Connect to redux
const AddWidget = connect()(AddWidgetComponent);
const WidgetsList = connect(mapStateToProps)(WidgetListComponent);

const App = () => (
    <div>
        <WidgetsList/>
        <AddWidget/>
    </div>
);


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);