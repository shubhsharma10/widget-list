import React from 'react'
import {connect} from 'react-redux'
import {addWidget, deleteWidget, headingSizeChanged,changeWidgetType} from '../actions/index'

const Heading = ({widget,headingSizeChanged}) => {
    let selectElem;

    return(
    <div>
        <h2>Heading {widget.size}</h2>
        <select onChange={() => headingSizeChanged(widget.id,selectElem.value)}
                ref={node => selectElem = node}
                value={widget.size}>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
        </select>
    </div>);
};

const dispatchToPropsMapper = (dispatch) => ({
   headingSizeChanged: (widgetId,newSize) => headingSizeChanged(dispatch,widgetId,newSize)
});

const HeadingContainer = connect(null,dispatchToPropsMapper)(Heading);

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


const WidgetComponent = ({widget,changeWidgetType,deleteWidget}) => {
    let select;
    return(
        <li>
            {widget.text} {widget.widgetType}
            <select value={widget.widgetType} ref={node => select = node}
                    onChange={() => changeWidgetType(widget.id,select.value)}>
                <option>Heading</option>
                <option>Paragraph</option>
                <option>List</option>
                <option>Image</option>
            </select>
            <button onClick={e => {
                e.preventDefault();
                deleteWidget(widget.id);
            }}>
                Delete
            </button>
            <div>
                {widget.widgetType==='Heading' && <HeadingContainer widget={widget}/>}
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

const mapDispatchToProps3 = (dispatch) => ({
    deleteWidget: (id) => deleteWidget(dispatch,id),
    changeWidgetType: (id,newType) => changeWidgetType(dispatch,id,newType)
});

const mapDispatchToProps2 = (dispatch) => ({
    addWidget: (text) => addWidget(dispatch,text)
});

export const Widget = connect(null,mapDispatchToProps3)(WidgetComponent);
export const AddWidget = connect(null,mapDispatchToProps2)(AddWidgetComponent);