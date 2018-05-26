import React from 'react'
import {connect} from 'react-redux'
import {addWidget, deleteWidget} from '../actions/index'

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

const mapDispatchToProps2 = (dispatch) => ({
    addWidget: (text) => addWidget(dispatch,text)
});

export const Widget = connect()(WidgetComponent);
export const AddWidget = connect(null,mapDispatchToProps2)(AddWidgetComponent);