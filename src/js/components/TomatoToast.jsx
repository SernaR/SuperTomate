import React from 'react';
import { ReactSVG } from 'react-svg';

const TomatoToast = ({message, error = false}) => {
    return ( 
        <div className="row justify-content-between">
            <ReactSVG src="/images/mascotte-super-tomate-succ.svg" className="mx-2"/>
            <span className={ error ? "mx-2 text-danger" : "mx-2" } >{message}</span>
        </div>
     );
}
 
export default TomatoToast;
