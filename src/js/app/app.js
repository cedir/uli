import React, { PropTypes } from 'react';
import Header from './layout/components/Header';
import Footer from './layout/components/Footer';
import Navigation from './layout/components/Navigation';
import { correctHeight, detectBody } from './layout/Helpers';

class App extends React.Component {
     componentDidMount() {

        // Run correctHeight function on load and resize window event
        $(window).bind("load resize", function() {
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
        let wrapperClass = "gray-bg " + this.props.location.pathname;
        return (
            <div id="wrapper">
                <Navigation location={this.props.location}/>
                <div id="page-wrapper" className={wrapperClass}>
                    <Header />
                    {this.props.children}
                    <Footer />
                </div>
            </div>

        );
    }
}

App.propTypes = {
    location: PropTypes.object,
    children: PropTypes.element
};

export default App;
