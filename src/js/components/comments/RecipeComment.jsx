import React from 'react';
//import 'moment'

const RecipeComment = ({ content, createdAt, userName, isAdmin, onValidate, onRemove, onAnswer }) => {
    const moment = require('moment')
    moment.locale('fr');
    return ( 
        <div className="list-group-item ">
            <div className="d-flex w-100 justify-content-between my-2">
                <h3 className="recipe-3">{ userName }</h3>
                <small className="text-muted">Il y a { moment(createdAt).fromNow(true) }</small>
            </div>    
            <p className="mb-2">{ content }</p>
            <div className="row justify-content-end">
                { isAdmin && 
                    <>
                        <button className="btn btn-outline-success btn-sm mr-3" onClick={ onValidate }>Valider</button>   
                        <button className="btn btn-outline-danger btn-sm mr-3" onClick={ onRemove }>Modérer</button>   
                    </> 
                }
            </div>  
        </div>

     );
}
 
export default RecipeComment;

/**
 * </> || 
                    <button className="btn btn-outline-dark btn-sm mr-3" onClick={ onAnswer }>Répondre</button>
 */