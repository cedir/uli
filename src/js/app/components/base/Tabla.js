import React from 'react';
import { orderBy } from 'lodash';

export class Tabla extends React.Component {
    constructor(props){
        super(props);
        this.sort = this.sort.bind(this);
        this.sortColumn = this.sortColumn.bind(this);
        this.sortSymbol = this.sortSymbol.bind(this);

        this.state = { 
            sorting: props.headers.map(h => Object.assign({}, h.Sort))
        };
    }

    sortColumn(i){
        const context = this;
        return function(ev){
            const sorting = context.state.sorting;
            const viejo = sorting[i];
            const nuevo = Object.assign({}, viejo);
            nuevo.Order = (viejo.Order + 1) % 3;
            context.setState({
                sorting: sorting.slice(0,i)
                                .concat([nuevo])
                                .concat(sorting.slice(i+1))
            });
        };
    }


    sortSymbol(i){
        const sorting = this.state.sorting;
        const actual = sorting[i];
        const icon = actual.Order == 0
            ? "sort"
            : actual.Order == 1
                ? "sort-asc"
                : "sort-desc"
                ;

        return "pull-right fa fa-" + icon;
    }

    sort(){
        const filters = this.state.sorting.filter(s => s.Order > 0);
        const fields = filters.map(h => h.Field);
        const orders = filters.map(h => h.Order == 1 ? 'asc' : 'desc');
        return orderBy(this.props.rows, fields, orders);
    }

    render() {
        return (
            <table className="footable table table-stripped toggle-arrow-tiny default breakpoint footable-loaded">
                <thead>
                    <tr>
                        {
                            this.props.headers.map((e,i) => {
                                return (
                                <th key={i} onClick={this.sortColumn(i)} className="footable-visible footable-sortable">
                                    <span className={this.sortSymbol(i)}/>
                                    <a>{e.Descripcion}</a>
                                </th>
                                );
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        this.sort().map((e, i) =>
                            <tr key={i} id={i} className="footable-even" style={{display: 'table-row'}}>
                                {
                                    this.props.headers.map((f, j) =>
                                        <td key={j} className="footable-visible">
                                            <span className="footable-toggle"/>
                                            { f.Format(e) }
                                        </td>)
                                }
                            </tr>)
                    }
                </tbody>
            </table>
        );
    }
}

Tabla.propTypes = {
    rows: React.PropTypes.array,
    headers: React.PropTypes.array
};
