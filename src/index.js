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

class WidgetListComponent extends React.Component {

    constructor(props){
        super(props);
        this.props.findAllWidgets()
    }

    render() {
        return(
            <div className="container-fluid">
                <h1>Widget List {this.props.widgets.length}</h1>
                <button onClick={this.props.saveWidgets}>Save Widgets</button>
                <ul>
                    {this.props.widgets.map(widget =>
                        <Widget key={widget.id} widget={widget}/>)}
                </ul>
            </div>
        )
    }
}


class AddWidgetComponent extends React.Component{
    render() {
        let input;
        return (
            <div className="container-fluid justify-content-right">
                <input ref={node => input = node}/>
                <button onClick={() => this.props.addWidget(input.value)}>
                    Add Widget
                </button>
            </div>
        );
    }
}

// Reducer

const widgetReducer = (state={widgets: []},action) => {
  switch (action.type) {
      case 'SAVE_WIDGETS':
          alert('Saved Widgets to database');
          fetch('http://localhost:8080/api/widget/save', {
              method: 'post',
              body: JSON.stringify(state.widgets),
              headers: {
                  'content-type': 'application/json'
              }
          });
          return state;
      case 'FIND_ALL_WIDGETS':
          return{widgets: action.widgets};

      case 'ADD_WIDGET':
          return {widgets:
              [...state.widgets,
                  {
                      id: state.widgets.length+4,
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


// ACTIONS

const addWidget = (dispatch,text) => {
    dispatch({type: 'ADD_WIDGET', text: text});
};

const deleteWidget = (id) => {
    return ({type: 'DELETE_WIDGET', id: id});
};

const findAllWidgets = (dispatch) => {
    fetch('http://localhost:8080/api/widget')
        .then(response => (response.json()))
        .then(widgets => dispatch({
        type: 'FIND_ALL_WIDGETS',
        widgets: widgets
        }));
};

const saveWidgets = dispatch => {
    dispatch({
            type: 'SAVE_WIDGETS'
        });
};

// connect parameters
const mapStateToProps = (state) => ({
    widgets: state.widgets
});

const mapDispatchToProps = (dispatch) => ({
        findAllWidgets: () => findAllWidgets(dispatch),
        saveWidgets: () => saveWidgets(dispatch)
});

const mapDispatchToProps2 = (dispatch) => ({
    addWidget: (text) => addWidget(dispatch,text)
});

// Connect to redux
// Store
const store = createStore(widgetReducer);
const Widget = connect()(WidgetComponent);
const AddWidget = connect(null,mapDispatchToProps2)(AddWidgetComponent);
const WidgetsList = connect(mapStateToProps,mapDispatchToProps)(WidgetListComponent);

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