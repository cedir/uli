import React, { PropTypes } from 'react';

// TODO ITEM
export class RemovableListItem extends React.Component {
    constructor(){
        super();

        this.onClick = this.onClick.bind(this);
        this.onRemove = this.onRemove.bind(this);
    } 

    onClick() {
        this.props.actions.click(this.props.index);
    }

    onRemove() {
        this.props.actions.remove(this.props.index);
    }

    render() {    
        return (
            <li className="list-group-item">
                <span onClick={this.onClick} style={this.props.style}>{this.props.text}</span>
                {this.props.showRemove && <span onClick={this.onRemove} className="badge">x</span>}
            </li>
        );
    }
}

RemovableListItem.propTypes = {
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    showRemove: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    style: PropTypes.object
};