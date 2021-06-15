import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl }
    from 'react-bootstrap/dist/react-bootstrap';
import ConditionalComponent from '../../utilities/ConditionalComponent';

/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-prop-types */

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [history, setHistory] = useState(props.history);
    const [sucursal, setSucursal] = useState('');

    useEffect(() => {
        if (props.token) {
            setHistory(history.push('/'));
        }
    });

    const submitHandler = (e) => {
        e.preventDefault();
        props.authUser(username, password);
    };

    const loginErrorComponent = () => {
        return (
            <p className='m-t'>
                <small style={ { color: 'red', fontSize: '16px' } }>username o password incorrecto</small>
            </p>
        );
    };

    const onChangeSelectHandler = (e) => {
        const value = e.target.value;
        let id;
        if (value === 'Cedir') {
            id = 1;
        } else if (value === 'HIR') {
            id = 2;
        }
        setSucursal(value);
        props.elegirSucursal(id);
    };

    const valid = username !== '' && password !== '' && sucursal !== '';

    return (
        <div className='middle-box text-center loginscreen animated fadeInDown'>
            <div>
                <div>
                    <h1 className='logo-name'>IN+</h1>
                </div>
                <h3>Bienvenida/o a ULI</h3>
                <p>
                    App desarrollada por C.E.Di.R
                </p>
                <p>Logueate para comenzar.</p>
                <form className='m-t' onSubmit={ submitHandler }>
                    <FormGroup controlId='sucursal'>
                        <select
                          onChange={ onChangeSelectHandler }
                          className='form-control'
                        >
                            <option hidden={ sucursal === 'Cedir' || sucursal === 'HIR' }>
                                Seleccionar sucursal
                            </option>
                            <option>Cedir</option>
                            <option>HIR</option>
                        </select>
                    </FormGroup>
                    <FormGroup controlId='username'>
                        <FormControl
                          type='text'
                          value={ username }
                          placeholder='Username'
                          onChange={ e => setUsername(e.target.value) }
                        />
                    </FormGroup>
                    <FormGroup controlId='password'>
                        <FormControl
                          type='password'
                          value={ password }
                          placeholder='Password'
                          onChange={ e => setPassword(e.target.value) }
                        />
                    </FormGroup>
                    <Button
                      type='submit'
                      bsStyle='primary'
                      bsSize='large'
                      block
                      disabled={ !valid }
                    >
                        Login
                    </Button>
                </form>
                <ConditionalComponent
                  component={ loginErrorComponent }
                  display={ props.loginError }
                />
            </div>
        </div>
    );
}

const { func, object, string, bool } = PropTypes;

Login.propTypes = {
    authUser: func,
    history: object,
    token: string,
    loginError: bool,
    elegirSucursal: func,
};

const mapStateToProps = state => ({
    token: state.login.token,
    loginError: state.login.loginError,
});

function mapDispatchToProps(dispatch) {
    return {
        authUser: (username, password) => dispatch({ type: 'AUTHENTICATE_USER', username, password }),
        elegirSucursal: id =>
            dispatch({ type: 'ELEGIR_SUCURSAL', id }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
