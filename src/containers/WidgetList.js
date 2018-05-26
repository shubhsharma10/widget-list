import React from 'react'
import {connect} from 'react-redux'
import {Widget} from '../components/widget'
import * as actions from '../actions/index'

class WidgetListComponent extends React.Component {

    constructor(props){
        super(props);
        this.props.findAllWidgets()
    }

    render() {
        return(
            <div>
                <h1>Widget List {this.props.widgets.length}</h1>
                <button hidden={this.props.preview} onClick={this.props.saveWidgets}>Save Widgets</button>
                <button onClick={this.props.previewWidgets}>Preview</button>
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
    widgets: state.widgets,
    preview: state.preview
});

const mapDispatchToProps = (dispatch) => ({
    findAllWidgets: () => actions.findAllWidgets(dispatch),
    saveWidgets: () => actions.saveWidgets(dispatch),
    previewWidgets: () => actions.previewWidgets(dispatch)
});

export const WidgetsList = connect(mapStateToProps,mapDispatchToProps)(WidgetListComponent);