import React from 'react';

const Comment = (props) => {
    return ( 
        <div className="list-group-item ">
            <div className="d-flex w-100 justify-content-between my-2">
                <h3>Pseudo</h3>
                <small className="text-muted">3 days ago</small>
            </div>    
            <p className="mb-2">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <div className="row justify-content-end">
                <a className="btn btn-outline-dark btn-sm mr-3" role="button" aria-pressed="true" href="#">Répondre</a>   
            </div>
            
        </div>

     );
}
 
export default Comment;