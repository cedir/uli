import React, { PropTypes } from 'react';
import { Route } from 'react-router-dom';
import Header from './layout/components/Header';
import Footer from './layout/components/Footer';
import Navigation from './layout/components/Navigation';
import { correctHeight, detectBody } from './layout/Helpers';
import HomePage from '../home/HomePage';
import EstudiosPage from '../estudio/EstudiosPage';
import PagoAnestesistaPage from '../anestesista/PagoAnestesistaPage';

class App extends React.Component {
    componentDidMount() {
        // Run correctHeight function on load and resize window event
        $(window).bind('load resize', () => {
            correctHeight();
            detectBody();
        });

        // Correct height of wrapper after metisMenu animation.
        $('.metismenu a').click(() => {
            setTimeout(() => {
                correctHeight();
            }, 300);
        });
    }

    render() {
        const wrapperClass = `gray-bg ${this.props.location.pathname}`;
        return (
            <div id='wrapper'>
                <Navigation location={ this.props.location } />
                <div id='page-wrapper' className={ wrapperClass }>
                    <Header />
                    <Route exact path='/' component={ HomePage } />
                    <Route path='/home' render={ HomePage } />
                    <Route path='/estudios' component={ EstudiosPage } />
                    <Route path='/anestesistas/pago' component={ PagoAnestesistaPage } />
                    <Footer />
                </div>
            </div>

        );
    }
}

App.propTypes = {
    location: PropTypes.object,
    // children: PropTypes.element,
};

export default App;
