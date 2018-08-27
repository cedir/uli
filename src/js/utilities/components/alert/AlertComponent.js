import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Button }
    from 'react-bootstrap/dist/react-bootstrap';
import { REMOVE_ALERT } from './actionTypes';

const millisecondsShowingAlert = 10000;

class AlertComponent extends Component {
    render() {
        return (
            <div
              style={ { position: 'fixed', zIndex: '2000', top: '10px', left: '50%', transform: 'translate(-50%)', minWidth: '30%', maxWidth: '50%' } }
            >
                {
                    this.props.alerts.map((alert) => {
                        // set a timeout to automatically closes the alerts a time after showing
                        setTimeout(() => {
                            this.props.removeAlert(alert.id);
                        }, millisecondsShowingAlert);
                        return (
                            <Alert
                              key={ alert.id }
                              style={ { textAlign: 'center', width: '100%' } }
                              bsStyle={ alert.type }
                            >
                                <h3 style={ { display: 'inline-block', marginRight: '10px' } }>{ alert.msg }</h3>
                                <div style={ { display: 'inline-block' } }>
                                    <Button
                                      className='left'
                                      onClick={ () => this.props.removeAlert(alert.id) }
                                      bsStyle={ alert.type }
                                    >Entendido</Button>
                                </div>
                            </Alert>
                        );
                    })
                }
            </div>
        );
    }
}

const { array, func } = PropTypes;

AlertComponent.propTypes = {
    alerts: array,
    removeAlert: func.isRequired,
};

function mapStateToProps(state) {
    return {
        alerts: state.alertReducer.alerts || [],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        removeAlert: alertId =>
            dispatch({ type: REMOVE_ALERT, alertId }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertComponent);
