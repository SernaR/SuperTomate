import React, { useState } from 'react';

const AddRecipeList = ({name, type, items = [], onChange}) => {

    const [item, setItem] = useState({
        content: '', 
        update: false,
        updatedIndex: ''
    })

    const itemList = items.map( (item, index) => 
        <li key={index} className="lead mb-1">
            { item.content }
            <button className="ml-3 btn btn-outline-secondary btn-sm" onClick={ (event) => updateItem(event,item) }>modifier</button>
            <button className="ml-3 btn btn-outline-danger btn-sm" onClick={ (event) => deleteItem(event, item) }>supprimer</button>
        </li>
    )

    const setRank = items => {
        onChange( name, items.map( (item, index) => { return { "rank": index + 1, "content": item.content} })) 
    }

    const handleItemChange = ({ currentTarget }) => {
        setItem({ ...item, content: currentTarget.value }) 
    }

    const addItem = event => {
        event.preventDefault()
        const { content, update, updatedIndex} = item 
        if(content) {
            if(update){
                items[updatedIndex] = item
                setItem({
                    content: '',
                    update: false,
                    updatedIndex: ''
                })
            } else {
                items.push(item)
                setItem({ ...item, content: '' })
            }
            setRank(items)
        }   
    }

    const deleteItem = (event, i) => {
        event.preventDefault() 
        if ( !item.content ) {
            const index = items.indexOf(i)
            items.splice(index, 1)
            setRank(items)
        }    
    } 

    const updateItem = (event, i) => {
        event.preventDefault() 
        if ( !item.content ) {
            const index = items.indexOf(i)
            setItem({
                content: items[index].content,
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
                    value={ item.content } 
                    onChange={ handleItemChange }
                    placeholder={ name }
                    aria-label={ name }
                    aria-describedby="basic-addon"
                    className="form-control" 
                    id={ name }
                />
                :
                <input 
                    type = "text"
                    value={ item.content }
                    onChange={ handleItemChange }
                    placeholder={ name }
                    aria-label={ name }
                    aria-describedby="basic-addon"
                    className="form-control" 
                    id={ name }
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

