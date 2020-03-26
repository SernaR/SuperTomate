import React from 'react';

const NavItems = ({items, item, setItem}) => {
    return ( 
        <ul className="nav justify-content-center mb-2">
            { items.map( ( name, index) => 
                <li className="nav-item" key={index}>
                    <a className={ "nav-link pointer" + (item === index ? " active" : "") } onClick={ () => setItem(index) }>{name}</a>
                </li>
            )}
        </ul>
    );
}
 
export default NavItems;