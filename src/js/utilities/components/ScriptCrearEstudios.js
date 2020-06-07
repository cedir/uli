/* eslint-disable */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CREATE_ESTUDIO } from '../../estudio/actionTypes';
import store from '../../app/configureStore';

/* SCRIPT PARA CREAR ESTUDIOS DE A CANTIDAD AUTOMATICAMENTE */
/* SETEADO POR DEFAULT PARA OSDE BINARIO, TODO IMPLEMENTAR
ALGO MAS SOFISTICADO TRAYENDO LOS ID DE OBRA SOCIAL Y NOMBRE */

export function getSucursal() {
    const sucursal = store.getState().login.sucursal;

    return sucursal;
}


const ScriptCrearEstudios = (props) => {
    const { createEstudio } = props;
    const sucursal = getSucursal();
    const [cantidadEstudios, setCantidadEstudios] = useState(null);

    const onChangeCantidadEstudios = (e) => {
        setCantidadEstudios(e.target.value);
    };
    
    const estudio = {
        obraSocial:
            [
                {
                    id:79,"nombre":"OSDE BINARIO"
                },
            ],
        medicoActuante:
            [
                {
                    id:19,
                    nombre:"PABLO",
                    apellido:"ALASINO",
                    matricula:"13522"
                }
            ],
        medicoSolicitante:
            [
                {
                    id:19,
                    nombre:"PABLO",
                    apellido:"ALASINO",
                    matricula:"13522"
                }
            ],
        anestesista:
            [
                {
                    id: 1,
                    nombre: "",
                    apellido: "Sin anestesia",
                    matricula: "",
                    telefono: "",
                    porcentaje_anestesista:"0.00"
                }
            ],
        paciente:
            [
                {
                    id:120,
                    dni:10811479,
                    nombre:"CARLOS",
                    apellido:"TOMASSONI",
                    _edad:59
                }
            ],
        fecha:"2020-06-13",
        practica:
            [
                {
                    id:2,
                    descripcion:"COLONO VIDEO ENDOSCOPIA",
                    codigoMedico:"205014",
                    abreviatura:"VCC"
                }
            ],
        informe:"Hecho con script de crear estudios",
        motivo:"Hecho con script de crear estudios"
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const cantidad = parseInt(cantidadEstudios, 10);
        for (let i = 0; i < cantidad; i++) {
            createEstudio(estudio);
        };
    };

    return (
        <div>
            <form onSubmit={ handleSubmit }>
                <span>Cantidad de estudios que desea crear:</span>
                <input type='number' onChange={ onChangeCantidadEstudios } />
                <button type="submit">Generar estudios</button>
            </form>
        </div>
    );
};

function mapDispatchToProps(dispatch) {
    return {
        createEstudio: estudio =>
            dispatch({ type: CREATE_ESTUDIO, estudio }),
    };
}

export default connect(null, mapDispatchToProps)(ScriptCrearEstudios);
