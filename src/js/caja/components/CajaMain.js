import React, { Component } from 'react';


import CajaActionBar from './CajaActionBar';
import SearchCajaModal from './search/SearchCajaModal';

class CajaMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpened: false,
        };

        this.openSearchCajaModal = this.openSearchCajaModal.bind(this);
        this.closeSearchCajaModal = this.closeSearchCajaModal.bind(this);
    }

    openSearchCajaModal() {
        this.setState({ modalOpened: true });
    }

    closeSearchCajaModal() {
        this.setState({ modalOpened: false });
    }

    render() {
        return (
            <div className='ibox-content'>
                <div className='pull-right'>
                    <CajaActionBar
                      openSearchCajaModal={ this.openSearchCajaModal }
                    />
                </div>
                <div className='clearfix' />
                <SearchCajaModal
                  modalOpened={ this.state.modalOpened }
                  closeModal={ this.closeSearchCajaModal }
                />
            </div>
        );
    }
}

export default CajaMain;
