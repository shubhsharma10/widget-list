import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore } from 'redux';
import {widgetReducer} from './reducers/WidgetReducer'
import {AddWidget} from './components/widget'
import {WidgetsList} from './containers/WidgetList'

const store = createStore(widgetReducer);

const App = () => (
    <div className="container-fluid">
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