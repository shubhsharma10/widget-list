import React from 'react'
import {connect} from 'react-redux'
import {addWidget, deleteWidget} from '../actions/index'
import {SELECT_WIDGET_TYPE} from '../constants/index'

const Heading = () => (
    <div>
        <h2>Heading</h2>
        <select>
            <option>Heading 1</option>
            <option>Heading 2</option>
            <option>Heading 3</option>
        </select>
    </div>
);

const Paragraph = () => (
    <div>
        <h2>Paragraph</h2>
        <textarea></textarea>
    </div>
);

const Image = () => (
    <h2>Image</h2>
);

const List = () => (
    <h2>List</h2>
);


const WidgetComponent = ({widget,dispatch}) => {
    let select;
    return(
        <li>
            {widget.text} {widget.widgetType}
            <select ref={node => select = node}

                    onChange={e =>
                        dispatch({
                            type: SELECT_WIDGET_TYPE,
                            id: widget.id,
                            widgetType: select.value
                    })}>
                <option>Heading</option>
                <option>Paragraph</option>
                <option>List</option>
                <option>Image</option>
            </select>
            <button onClick={e => {
                e.preventDefault();
                dispatch(deleteWidget(widget.id));
            }}>
                Delete
            </button>
            <div>
                {widget.widgetType==='Heading' && <Heading/>}
                {widget.widgetType==='Paragraph' && <Paragraph/>}
                {widget.widgetType==='List' && <List/>}
                {widget.widgetType==='Image' && <Image/>}
            </div>
        </li>
    );
};


class AddWidgetComponent extends React.Component{
    render() {
        let input;
        return (
            <div>
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