import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl }
    from 'react-bootstrap/dist/react-bootstrap';
import ConditionalComponent from '../../utilities/ConditionalComponent';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentWillMount() {
        if (this.props.token) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.token) {
            this.props.history.push('/');
        }
    }

    setUsername(evt) {
        const username = evt.target.value;
        this.setState({ username });
    }

    setPassword(evt) {
        const password = evt.target.value;
        this.setState({ password });
    }

    submitHandler(evt) {
        evt.preventDefault();
        const { username, password } = this.state;
        this.props.authUser(username, password);
    }

    loginErrorComponent() {
        return (
            <p className='m-t'>
                <small style={ { color: 'red', fontSize: '16px' } }>username o password incorrecto</small>
            </p>
        );
    }

    render() {
        return (
            <div className='middle-box text-center loginscreen animated fadeInDown'>
                <div>
                    <div>

                        <h1 className='logo-name'>IN+</h1>

                    </div>
                    <h3>Bienvenido a ULI</h3>
                    <p>
                        App desarrollada para C.E.D.I.R
                    </p>
                    <p>Logueate para comenzar.</p>
                    <form className='m-t' onSubmit={ this.submitHandler } >
                        <FormGroup controlId='username' >
                            <FormControl
                              type='text'
                              value={ this.state.username }
                              placeholder='Username'
                              onChange={ this.setUsername }
                            />
                        </FormGroup>
                        <FormGroup controlId='password' >
                            <FormControl
                              type='password'
                              value={ this.state.password }
                              placeholder='Password'
                              onChange={ this.setPassword }
                            />
                        </FormGroup>
                        <Button
                          type='submit'
                          bsStyle='primary'
                          bsSize='large'
                          block
                        >
                            Login
                        </Button>
                    </form>
                    <ConditionalComponent
                      component={ this.loginErrorComponent }
                      display={ this.props.loginError }
                    />
                </div>
            </div>
        );
    }
}

const { func, object, string, bool } = PropTypes;

Login.propTypes = {
    authUser: func,
    history: object,
    token: string,
    loginError: bool,
};

const mapStateToProps = state => ({
    token: state.login.token,
    loginError: state.login.loginError,
});

function mapDispatchToProps(dispatch) {
    return {
        authUser: (username, password) => dispatch({ type: 'AUTHENTICATE_USER', username, password }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
