import React from 'react'
import {connect} from 'react-redux'
import {addWidget, deleteWidget, headingSizeChanged,changeWidgetType,headingTextChanged} from '../actions/index'

const mapStateToProps4 = state => ({
    preview: state.preview
});
const mapStateToProps2 = state => ({
    preview: state.preview
});

const Heading = ({widget,preview,headingSizeChanged,headingTextChanged}) => {
    let selectElem;
    let inputElem;

    return(
    <div>
        <div hidden={preview}>
            <h2>Heading {widget.size}</h2>
            <input onChange={()=> headingTextChanged(widget.id,inputElem.value)}
                    ref={node => inputElem = node}
                    value={widget.text}/>
            <select onChange={() => headingSizeChanged(widget.id,selectElem.value)}
                    ref={node => selectElem = node}
                    value={widget.size}>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
            </select>
        </div>
        <div>
            {widget.size === '1' && <h1>{widget.text}</h1>}
            {widget.size === '2' && <h2>{widget.text}</h2>}
            {widget.size === '3' && <h3>{widget.text}</h3>}
        </div>
    </div>);
};

const dispatchToPropsMapper = (dispatch) => ({
   headingSizeChanged: (widgetId,newSize) => headingSizeChanged(dispatch,widgetId,newSize),
    headingTextChanged: (widgetId,newText) => headingTextChanged(dispatch,widgetId,newText)
});

const HeadingContainer = connect(mapStateToProps4,dispatchToPropsMapper)(Heading);

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


const WidgetComponent = ({widget,preview,changeWidgetType,deleteWidget}) => {
    let select;
    return(
        <li>
            <div hidden={preview}>
                {widget.id} {widget.widgetType}
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
            </div>
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
        return (
            <div hidden={this.props.preview}>
                <button onClick={() => this.props.addWidget()}>
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
    addWidget: () => addWidget(dispatch)
});

const mapStateToProps3 = state => ({
    preview: state.preview
});

export const Widget = connect(mapStateToProps3,mapDispatchToProps3)(WidgetComponent);
export const AddWidget = connect(mapStateToProps2,mapDispatchToProps2)(AddWidgetComponent);