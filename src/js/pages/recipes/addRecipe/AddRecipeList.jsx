import React, { useState, useRef } from 'react';

const AddRecipeList = ({name, type, items = [], onChange}) => {

    const [item, setItem] = useState({
        content: '', 
        update: false,
        updatedIndex: ''
    })

    const inputRef = useRef(null)

    const itemList = items.map( (item, index) => 
        
        <li key={index} className="list-group-item d-flex justify-content-between bg-light">
            { item.content }
            <div className="btn-group">
                <i className="fas fa-pencil-alt mx-2 text-primary pointer" onClick={ (event) => updateItem(event,item) }></i>
                <i className="fas fa-trash-alt mx-2 text-danger pointer" onClick={ (event) => deleteItem(event, item) }></i>
            </div>
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

            inputRef.current.focus()
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
                    aria-label={ name }
                    aria-describedby="basic-addon"
                    ref={inputRef}
                    className="form-control" 
                    id={ name }
                />
                :
                <input 
                    type = "text"
                    value={ item.content }
                    onChange={ handleItemChange }
                    aria-label={ name }
                    aria-describedby="basic-addon"
                    ref={inputRef}
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
            <ul className="list-group">
                { itemList }
            </ul>
        </>        
     );
}
 
export default AddRecipeList;

