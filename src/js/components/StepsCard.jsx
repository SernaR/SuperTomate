import React from 'react';

const StepsCard = ({ step, customH3 }) => {
    return ( 
        <div className="card p-3 mb-3">
            <h3 className="recipe-3" >Étape { step.rank }</h3>
            <p className="card-text lead">{ step.content }</p>
        </div>
     );
}
 
export default StepsCard;
