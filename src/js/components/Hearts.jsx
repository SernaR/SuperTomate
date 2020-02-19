import React from 'react';

const Hearts = ({ likes }) => {
    const hearts = []
    const avg = likes.map( like => like.record).reduce((a, b)=> a + b, 0) / likes.length
    
    for (let i = 1; i <= 5; i++) {
        hearts.push( <i 
            key={i} 
            className={( i <= avg ? "fas": "far" ) + " fa-heart text-danger mx-1"}
        ></i> ) 
    } 

    return ( 
        <p className="text-center mb-4 ">
            { hearts }
        </p>
     );
}
 
export default Hearts;