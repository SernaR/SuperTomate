import React from 'react';

//TODO composant à supprimer !!!!

const AddRecipeBlock = ({ label, children }) => 
    (  
        <div className="form-group">
            <div className="row">
                <label className="lead col-sm-4">{label}</label>
                <div className="col-sm-8">
                    { children }   
                </div>
            </div>  
        </div>
        
    )

 
export default AddRecipeBlock;