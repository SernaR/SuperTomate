import React, { useState } from 'react';

const AddRecipeList = ({aria, type, items = [], onChange}) => {
    const [list, setList] = useState({
        item: '',
        update: false,
        updatedIndex: ''
    })

    const itemList = items.map( (item, index) => 
        <li key={index} className="lead mb-1">
            { item }
            <button className="ml-3 btn btn-outline-secondary btn-sm" onClick={ (event) => updateItem(event,item) }>modifier</button>
            <button className="ml-3 btn btn-outline-danger btn-sm" onClick={ (event) => deleteItem(event, item) }>supprimer</button>
        </li>
    )

    const handleItemChange = ({ currentTarget }) => {
        setList({ ...list, item: currentTarget.value })
    }

    const addItem = event => {
        event.preventDefault()
        const { item, update, updatedIndex} = list
        if(item) {
            if(update){
                items[updatedIndex] = item
                setList({
                    item: '',
                    update: false,
                    updatedIndex: ''
                })
            } else {
                items.push(item)
                setList({ ...list, item: '' })
            }
            onChange(items)
        }   
    }

    const deleteItem = (event, item) => {
        event.preventDefault()
        if ( !list.item ) {
            const index = items.indexOf(item)
            items.splice(index, 1)
            onChange(items)
        }    
    } 

    const updateItem = (event, item) => {
        event.preventDefault()
        if ( !list.item ) {
            const index = items.indexOf(item)
            setList({
                item: items[index],
                updatedIndex: index,
                update: true
            })
        }    
    }

    return ( 
        <>
            <div className="input-group mb-3">
                { type ?
                <textarea
                    value={ list.item } 
                    onChange={ handleItemChange }
                    placeholder={ aria }
                    aria-label={ aria }
                    aria-describedby="basic-addon"
                    className="form-control" 
                    id={ aria }
                />
                :
                <input 
                    type = "text"
                    value={ list.item }
                    onChange={ handleItemChange }
                    placeholder={ aria }
                    aria-label={ aria }
                    aria-describedby="basic-addon"
                    className="form-control" 
                    id={ aria }
                />
                }
                <div className="input-group-append">
                    <button
                        className="input-group-text"
                        onClick={addItem}
                    >Ajouter</button>
                </div>
            </div>
            <ul>
                { itemList }
            </ul>
        </>        
     );
}
 
export default AddRecipeList;

