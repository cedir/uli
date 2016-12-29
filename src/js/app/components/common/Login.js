import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export class Login extends Component {

    constructor() {
        super();
        this.state = { user: {} };
        this.doLogin = this.doLogin.bind(this);
        this.doLogout = this.doLogout.bind(this);
    }

    componentDidMount() {
        this.context.store.subscribe(() => this.setState({ user: this.context.store.getState().user }));
    }

    doLogin (userName, password) {
        this.context.store.dispatch({type: 'DO_LOGIN', userName, password});
    }

    doLogout() {
        this.context.store.dispatch({type: 'DO_LOGOUT'});
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
                        <input type="text" placeholder="Usuario" ref={(input) => this.userName = input} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input type="password" placeholder="Password"  ref={(input) => this.password = input} className="form-control" />
                    </div>
                    <div>
                        <button className="btn btn-sm btn-primary pull-right m-t-n-xs" type="button" onClick={() => this.doLogin(this.userName.value, this.password.value)}>
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