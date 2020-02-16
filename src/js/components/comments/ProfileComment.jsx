import React from 'react';

const ProfileComment = ({ content, createdAt, recipe, onRead }) => {
    const moment = require('moment')
    moment.locale('fr');
    return ( 
        <div className="list-group-item ">
            <div className="d-flex w-100 justify-content-between my-2">
                <h3>dans : { recipe }</h3>
                <small className="text-muted">Il y a { moment(createdAt).fromNow(true) }</small>
            </div>    
            <p className="mb-2">{ content }</p>
            <div className="row justify-content-end">
                <button className="btn btn-outline-dark btn-sm mr-3" onClick={ onRead }>Marquer comme lu</button>     
            </div>  
        </div>

     );
}
 
export default ProfileComment;