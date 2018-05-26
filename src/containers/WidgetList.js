import React from 'react'
import {connect} from 'react-redux'
import {Widget} from '../components/widget'
import {findAllWidgets, saveWidgets} from '../actions/index'

class WidgetListComponent extends React.Component {

    constructor(props){
        super(props);
        this.props.findAllWidgets()
    }

    render() {
        return(
            <div>
                <h1>Widget List {this.props.widgets.length}</h1>
                <button onClick={this.props.saveWidgets}>Save Widgets</button>
                <ul className="list-group">
                    {this.props.widgets.map(widget =>
                        <Widget key={widget.id} widget={widget}/>)}
                </ul>
            </div>
        )
    }
}

// connect parameters
const mapStateToProps = (state) => ({
    widgets: state.widgets
});

const mapDispatchToProps = (dispatch) => ({
    findAllWidgets: () => findAllWidgets(dispatch),
    saveWidgets: () => saveWidgets(dispatch)
});

export const WidgetsList = connect(mapStateToProps,mapDispatchToProps)(WidgetListComponent);