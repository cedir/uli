import React from 'react';
import { orderBy } from 'lodash';
import { Linea } from './Linea';

export class Tabla extends React.Component {
    constructor(props){
        super(props);

        this.sort = this.sort.bind(this);
        this.sortColumn = this.sortColumn.bind(this);
        this.sortSymbol = this.sortSymbol.bind(this);

        this.state = { 
            sort: {}
        };
    }

    componentDidMount() {
        this.props.fetch && this.props.fetch();
    }

    sortColumn(i){
        const context = this;
        return function(ev){
            const viejo = context.state.sort;
            const nuevo = {};

            if(viejo && viejo.Index == i) {
                const proximo = (viejo.Direction + 1) % 3;
                if(proximo){
                    Object.assign(nuevo, viejo);
                    nuevo.Direction = proximo;
                }
            }
            else
            {
                Object.assign(nuevo, {Index: i, Direction: 1});
            }

            context.setState({
                sort: nuevo 
            });
        };
    }

    sortDescription(value){
        switch (value) {
            case 1:
                return 'asc';
            case 2:
                return 'desc';
            default:
                return '';
        }
    }

    sortSymbol(i){
        const actual = this.state.sort;
        const icon = !actual || actual.Index != i
            ? ""
            : actual.Direction == 1
                ? "sort-asc"
                : "sort-desc"
                ;

        return "pull-right fa fa-" + icon;
    }

    sort(){
        const sInfo = this.state.sort;
        if(sInfo) {
            const header = this.props.headers[sInfo.Index];
            if(header)
            {
                const direction = this.sortDescription(sInfo.Direction);
                return orderBy(this.props.rows, header.SortField, direction) || [];
            }
        }

        return this.props.rows || [];
    }

    render() {
        const elems = this.sort();
        const headers = this.props.headers;
        return (
            <div>
                <table className="table table-stripped">
                    <thead>
                        <tr>
                        {
                            headers.map((e,i) => {
                                return (
                                <th key={i} onClick={this.sortColumn(i)}>
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
                        elems.map((e, i) =>
                            <Linea key={i} values={headers.map(f => f.Format(e))}/>
                            )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

Tabla.propTypes = {
    rows: React.PropTypes.array,
    headers: React.PropTypes.array,
    details: React.PropTypes.func,
    fetch: React.PropTypes.func
};
