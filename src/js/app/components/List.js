import React, { PropTypes } from 'react';

export const List = ({ items, generator }) => ( <ul className="list-group"> {items.map(generator)} </ul> );

List.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    generator: PropTypes.func.isRequired
};