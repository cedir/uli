import React from 'react';
import { orderBy } from 'lodash';

export class Linea extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            show: false
        };
    }

    render() {
        const values = this.props.values;
        return (
            <tr style={{display: 'table-row'}}>
            {
                values.map((value, i) =><td key={i}>{value}</td>)
            }
            <td colSpan={values.length}> {this.props.children} </td>
            </tr>
            );
    }
}

Linea.propTypes = {
    values: React.PropTypes.array,
    children: React.PropTypes.node
};
