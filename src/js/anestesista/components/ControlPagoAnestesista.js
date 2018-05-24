import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap/dist/react-bootstrap';

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

const years = Array.from(Array(5).keys()).map(k => currentYear - k);
const months = Array.from(Array(12).keys()).map(k => 1 + ((currentMonth + k) % 12));

class ControlPagoAnestesistaPres extends React.Component {
    constructor(props) {
        super(props);
        this.fetch = this.fetch.bind(this);
        this.setId = this.setId.bind(this);
        this.setMes = this.setMes.bind(this);
        this.setAnio = this.setAnio.bind(this);
    }

    setId(id) {
        this.id = id;
    }

    setMes(mes) {
        this.mes = mes;
    }

    setAnio(anio) {
        this.anio = anio;
    }

    fetch() {
        const id = ReactDOM.findDOMNode(this.id).value;
        const mes = ReactDOM.findDOMNode(this.mes).value;
        const anio = ReactDOM.findDOMNode(this.anio).value;
        this.props.fetch(id, mes, anio);
    }

    render() {
        return (
            <Form inline>
                <FormGroup controlId='anio'>
                    <ControlLabel>Anestesista</ControlLabel>
                    <FormControl componentClass='select' ref={ this.setId }>
                        <option value='2'>Jose Furno</option>
                        <option value='3'>Rodolfo Novau</option>
                        <option value='4'>Mariano Traglia</option>
                        <option value='5'>Jorge Kaller</option>
                        <option value='6'>Martin Amelong</option>
                        <option value='7'>Franco Frenquelli</option>
                        <option value='8'>Daniel Schleifer</option>
                        <option value='9'>Laura Tarrico</option>
                        <option value='10'>Mauro Yacuzzi</option>
                        <option value='11'>Nicolás Alberto Alet</option>
                        <option value='12'>Alvaro Gandolfo</option>
                        <option value='13'>Fernando Villayandre</option>
                        <option value='14'>Lucio Gioilla</option>
                        <option value='15'>Valeria Dalmau</option>
                        <option value='16'>Angelina Gagliardo</option>
                        <option value='17'>Lorena Morales</option>
                        <option value='18'>Guillermo Navarro</option>
                        <option value='19'>Cesar Domanico</option>
                        <option value='20'>Sandra Miretto</option>
                        <option value='21'>Mariana Poleri</option>
                        <option value='22'>H. Enrique  Carcar</option>
                        <option value='23'>Evelyn Cera</option>
                        <option value='24'>Sebastian San Damaso</option>
                        <option value='25'>Maria Victoria Taverna</option>
                        <option value='26'>Mariano Giardina</option>
                        <option value='27'>Veronica Corsi</option>
                        <option value='28'>Mariana Musciatti</option>
                        <option value='32'>Cristian Klenzi</option>
                        <option value='30'>Ivan Groisman</option>
                    </FormControl>
                </FormGroup>
                <FormGroup controlId='anio'>
                    <ControlLabel>Año</ControlLabel>
                    <FormControl componentClass='select' ref={ this.setAnio }>
                        { years.map(m => <option key={ m } value={ m }>{m}</option>) }
                    </FormControl>
                </FormGroup>
                <FormGroup controlId='formControlsSelect'>
                    <ControlLabel>Mes</ControlLabel>
                    <FormControl componentClass='select' ref={ this.setMes }>
                        { months.map(m => <option key={ m } value={ m }>{m}</option>) }
                    </FormControl>
                </FormGroup>
                <Button onClick={ this.fetch }>
                    Aceptar
                </Button>
            </Form>
        );
    }
}

ControlPagoAnestesistaPres.propTypes = {
    fetch: React.PropTypes.func,
};

function mapStateToProps() {
    return { };
}

function mapDispatchToProps(dispatch) {
    return {
        fetch: (id, mes, año) => dispatch({ type: 'FETCH_PAGO_ANESTESISTA', id, mes, año }),
    };
}

export const ControlPagoAnestesista =
    connect(mapStateToProps, mapDispatchToProps)(ControlPagoAnestesistaPres);
