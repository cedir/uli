import React from 'react';
import { connect } from 'react-redux';

/* const headers = [{
    Descripcion: 'Fecha',
    SortField: 'fecha',
    Format: (e) => e.fecha
},{
    Descripcion: 'Paciente',
    SortField: 'paciente.apellido',
    Format: (e) => `${e.paciente.apellido}, ${e.paciente.nombre} (${e.paciente.edad || 'N/D'})`
}, {
    Descripcion: 'Obra Social',
    SortField: 'obra_social.nombre',
    Format: (e) => e.obra_social.nombre
},{
    Descripcion: 'Fórmula',
    SortField: 'Formula',
    Format: (e) => e.formula
},{
    Descripcion: 'Importe',
    SortField: 'importe',
    Format: (e) => e.importe
}];*/

class LineasNoARAPres extends React.Component {

    componentDidMount() {
        // debugger;
        $('.footable').footable({ paginate: false, forceRefresh: true });
        $('.footable').trigger('footable_redraw');
    }

    componentDidUpdate() {
        $('.footable').footable({ paginate: false, forceRefresh: true });
        $('.footable').trigger('footable_redraw');
    }

/*
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
            const header = headers[sInfo.Index];
            if(header)
            {
                const direction = this.sortDescription(sInfo.Direction);
                return orderBy(this.props.lineas, header.SortField, direction) || [];
            }
        }

        return this.props.lineas || [];
    }
*/
    render() {
        const elems = this.props.lineas || [];
        return (
            <div>
                <table className='footable table table-stripped toggle-arrow-tiny'>
                    <thead>
                        {
                            /*
                            headers.map((e,i) => {
                                return (
                                <th key={i} onClick={this.sortColumn(i)}>
                                    <span className={this.sortSymbol(i)}/>
                                    <a>{e.Descripcion}</a>
                                </th>
                                );
                            })*/
                        }
                        <tr>
                            <th data-toggle='true'>Fecha</th>
                            <th>Paciente</th>
                            <th data-hide='all'>Formula</th>
                            <th data-hide='all'>Importe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            elems.map((e, i) => (
                                <tr key={ 2 * i }>
                                    <td>{e.fecha}</td>
                                    <td>{e.paciente.apellido}, {e.paciente.nombre}</td>
                                    <td>{e.formula}</td>
                                    <td>{e.importe}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan='4'>
                                <ul className='pagination pull-right' />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

LineasNoARAPres.propTypes = {
    lineas: React.PropTypes.array,
};

function mapStateToProps(state) {
    return {
        lineas: state.pago_anestesista.lineas_no_ARA,
    };
}

function mapDispatchToProps() {
    return {};
}

export const LineasNoARA = connect(mapStateToProps, mapDispatchToProps)(LineasNoARAPres);
