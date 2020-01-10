import React, { useState } from 'react';

const AddRecipeList = ({aria, type = "text", items, onChange}) => {
    const [list, setList] = useState({
        item: '',
        update: false,
        updatedIndex: ''
    })

    const itemList = items.map( (item, index) => 
        <li key={index} className="mb-1">
            <pre>{ item }</pre>
            <button className="ml-3 outline-secondary" onClick={ () => updateItem(item) }>modifier</button>
            <button className="ml-3 outline-secondary" onClick={ () => deleteItem(item) }>supprimer</button>
        </li>
    )

    const handleItemChange = ({ currentTarget }) => {
        setList({ ...list, item: currentTarget.value })
    }

    const addItem = () => {
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

    const deleteItem = item => {
        if ( !list.item ) {
            const index = items.indexOf(item)
            items.splice(index, 1)
            onChange(items)
        }    
    } 

    const updateItem = item => {
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
                <input 
                    value={ list.item }
                    type={ type } 
                    onChange={ handleItemChange }
                    placeholder={ aria }
                    aria-label={ aria }
                    aria-describedby="basic-addon"
                    className="form-control" 
                    id={ aria }
                />
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

/**
 
 */