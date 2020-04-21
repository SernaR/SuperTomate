import React, { useState } from 'react';
import toast from '../services/toaster' 
import adminAPI from '../services/adminAPI';
import ClassicField from './forms/ClassicField';
import ClassicTextarea from './forms/ClassicTextarea';
import toaster from '../services/toaster';

//focus ?????
//modifier la suppression mettre isSelected = false

const Highlights = ({highlights, onChange, headline}) => {
    
    //const inputRef = useRef(null)
    const [highlight, setHighlight] = useState({
        title:'',
        content:'',
        update: false,
        updatedIndex: ''
    })
    const [errors, setErrors] = useState({
        title:'',
        content:''
    })

    const handleChange = ({ currentTarget }) => {
        const {value, name} = currentTarget;
        setHighlight({ ...highlight, [name]: value })
    }

    const deleteItem = async (event, highlight) => {
        event.preventDefault()
        
        if( highlight.id === headline.highlightId ) {
            toast.error("ce template est actif")
            return
        }

        try {
            const index = highlights.indexOf(highlight)
            
            await adminAPI.deleteHighlight(highlight.id)
            highlights.splice(index, 1)
            setHighlight({ title:'', content:'', update: false, updatedIndex: '' })
            toast.success("L'actu est supprimée")

        }catch (err) {
            toast.error("Oups, un problème est survenue")
        }
    }
     
    const updateItem = (event, highlight) => {
        event.preventDefault() 
        const index = highlights.indexOf(highlight)
        
        //inputRef.current.focus()
        setHighlight({
            id: highlights[index].id,
            title: highlights[index].title,
            content: highlights[index].content,
            updatedIndex: index,
            update: true
        }) 
    }

    const handleSubmit = async event => { 
        event.preventDefault()
        
        const apiErrors = {}
        const { update, updatedIndex} = highlight 
        let highlightId

        try {
            if(update) {
                await adminAPI.updateHighlight(highlight)
                highlights[updatedIndex] = highlight
                highlightId = highlight.id
            }
            else {
                const newHighlight = await adminAPI.addHighlight(highlight)
                highlights.push(newHighlight)
                highlightId = newHighlight.id 
            }

            setHighlight({ title:'', content:'', update: false, updatedIndex: '' })
            setErrors({ title:'', content:'' })
            onChange({ ...headline, highlightId})

        } catch ({ response }) {
            const messages = response.data;
            if(messages) {
                messages.map( ({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
                toast.error("Il y a des erreurs dans votre formulaire")
            } 
        }  
    }

    const highlightsList = highlights.map( (highlight, index) =>    
        <li key={index} className="list-group-item d-flex justify-content-between bg-light">
            <div>
                { highlight.title }
                { highlight.id === headline.highlightId && <span className="badge badge-secondary ml-3">Actif</span> }
            </div>
            <div className="btn-group">
                <i className="fas fa-pencil-alt mx-2 text-primary pointer" onClick={ (event) => updateItem(event, highlight) }></i>
                <i className="fas fa-trash-alt mx-2 text-danger pointer" onClick={ (event) => deleteItem(event, highlight) }></i>
            </div>
        </li>   
    )

    return <>
        { highlightsList }
        <h3 className="recipe-3">Rédaction</h3>
        <div className="card container bg-light">
            <form className="mt-3" onSubmit={ handleSubmit }>
                <ClassicField
                    name="title"
                    label="titre de l'actu"
                    value={ highlight.title }
                    onChange={ handleChange }
                    error={ errors.title }
                />
                <ClassicTextarea 
                    name="content"
                    label="texte d'accroche"
                    //ref={ inputRef }
                    value={ highlight.content }
                    onChange={ handleChange }
                    error={ errors.content }
                />    
                <div className="row my-3 justify-content-end">
                    <button 
                        type="submit" 
                        className="btn btn-outline-danger btn-sm mr-3"
                        >Envoyer</button>
                </div>
            </form>   
        </div>
    </>
}
 
export default Highlights;