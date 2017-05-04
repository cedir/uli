import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export class Login extends Component {

    constructor() {
        super();
        this.state = { user: {} };
        this.doLogin = this.doLogin.bind(this);
        this.doLogout = this.doLogout.bind(this);
        this.setName = this.setName.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    componentDidMount() {
        this.context.store.subscribe(() => this.setState({ user: this.context.store.getState().user }));
    }

    doLogin () {
        this.context.store.dispatch({type: 'DO_LOGIN', userName: this.userName, password: this.password});
    }

    doLogout() {
        this.context.store.dispatch({type: 'DO_LOGOUT'});
    }

    setName(name){
        this.userName = name;
    }

    setPassword(pass){
        this.password = pass;
    }

    render() {
        if(Object.keys(this.state.user).length > 0)
        {
            return (
                <div className="dropdown profile-element">
                    <span />
                    <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                        <span className="clear">
                            <span className="block m-t-xs">
                                <strong className="font-bold">{this.state.user.name}</strong>
                            </span>
                            <span className="text-muted text-xs block">
                                { this.state.user.role }<b className="caret" />
                            </span>
                        </span>
                    </a>
                    <ul className="dropdown-menu animated fadeInRight m-t-xs">
                        <li><a href="#" onClick={this.doLogout}> Logout</a></li>
                    </ul>
                </div>
            );
        }
        else
        {
            return(
                <div>
                    <h3 className="m-t-none m-b">Ingresar</h3>
                    <div className="form-group">
                        <label>Usuario</label>
                        <input type="text" placeholder="Usuario" ref={this.setName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input type="password" placeholder="Password"  ref={this.setPassword} className="form-control" />
                    </div>
                    <div>
                        <button className="btn btn-sm btn-primary pull-right m-t-n-xs" type="button" onClick={this.doLogin}>
                            <strong>Log in</strong>
                        </button>
                    </div>
                </div>
            );
        }
    }
}

Login.contextTypes = {
    store: React.PropTypes.object
};