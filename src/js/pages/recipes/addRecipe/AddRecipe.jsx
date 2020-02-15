import React, { useState, useEffect } from 'react';     
import Cockpit from '../../../components/Cockpit';
import Field from '../../../components/forms/Field'
import recipeAPI from '../../../services/recipesAPI'
import AddRecipeList from './AddrecipeList';
import Tag from '../../../components/Tag'
import Select from '../../../components/forms/Select';
import Block from './AddRecipeBlock';
import ClassicField from '../../../components/forms/ClassicField';
import Footer from '../../../components/Footer';
import PageBlock from '../../../components/blocks/pageBlock';
import recipesAPI from '../../../services/recipesAPI';

//TODO : contraintes
//TODO : prise en charge des tags -> composant
//TODO : notification
//mettre option dans le composant select ??
//todo gestion du draft

//mettre le vrai id ***** lors du push

const AddRecipe = ({ match, history }) => {

    const { id = 'new' } = match.params
    
    useEffect( () => {
        fetchRecipeParams()
    }, [])

    const [newRecipe, setNewRecipe] = useState({
        name: '',
        difficulty: '',
        serve: '',
        cook: '', 
        making: '', 
        category: '',
        tags: [],
        ingredients: [],
        steps: [],
        picture: null,
        isDraft: true
    })

    const [params, setParams] = useState({
        tags: [],
        difficulties: [],
        categories: []
    })

    const [editing, setEditing] = useState(false)
   
    const fetchRecipeParams = async () => {
        try {
            const { tags, difficulties, categories } = await recipeAPI.getParams()
            setParams({ tags, difficulties, categories })

            if( id !== 'new') {
                setEditing(true)

                const { recipe } = await recipesAPI.find(id) 
                const { name, difficulty, serve, cook, making, category, steps, ingredients, isDraft} = recipe
                const tags = recipe.tags.map( tag => tag.id)
                
                setNewRecipe({ name, difficulty: difficulty.id, serve, cook, making, category:category.id, tags, ingredients, steps, isDraft })
            } else {
                setNewRecipe({ ...newRecipe,
                    difficulty: difficulties[0].id,
                    category: categories[0].id ,
                })
            }
            
        } catch(err) {
            console.log(err.response)
        } 
    }

    const handleChange = ({ currentTarget }) => {
        const {value, name} = currentTarget;
        setNewRecipe({ ...newRecipe, [name]: value })
    };

    const handleIngredientsChange = ingredients => setNewRecipe({ ...newRecipe, ingredients })
    const handleStepsChange = steps => setNewRecipe({ ...newRecipe, steps })

    const handleImageChange = ({ currentTarget }) => setNewRecipe({ ...newRecipe, picture: currentTarget.files[0] })

    const handleTagChange = (id) => {
            const tags = newRecipe.tags
            if ( tags.indexOf(id) === -1 && tags.length < 3 ) {
                tags.push(id)
                setNewRecipe({ ...newRecipe, tags})
            } else  {
                setNewRecipe({ ...newRecipe, tags: tags.filter( tag => tag !== id )})   
            }
    }

    const sendRecipe = async () => {
        const { name, difficulty, serve, making, cook, tags, category, steps, ingredients, isDraft } = newRecipe 
        const picture = newRecipe.picture
        
        let formData = new FormData()

        formData.set('name', name)
        formData.set('difficulty', difficulty)
        formData.set('serve', serve)
        formData.set('making', making)
        formData.set('cook', cook)
        formData.set('tags', JSON.stringify(tags)) 
        formData.set('steps', JSON.stringify(steps))
        formData.set('ingredients', JSON.stringify(ingredients))
        formData.set('category', category)
        formData.set('isDraft', isDraft)

        try {
            if(editing){
                if(picture) formData.append('image', picture)
                await recipeAPI.update(id, formData) 
            } else {
                formData.append('image', picture)
                await recipeAPI.save(formData)
            }
            clearForm()
            history.push("/recipe/" + 1 ); //mettre le vrai id *****
        } catch(err) {
            //NotificationManager.error(err.response.data.error, 'Error');
            console.log(err.response)
        } 
    }

    const handleRecipeSubmit = event => {
        event.preventDefault()
        newRecipe.isDraft = false
        sendRecipe()
    }

    const handleDraftSubmit = event => {
        event.preventDefault()
        sendRecipe()
    }

    const clearForm = () => {
        setNewRecipe({ 
            name: '',
            difficulty: params.difficulties[0].id,
            serve: '',
            cook: '', 
            making: '', 
            category: params.categories[0].id,
            tags: [],
            ingredients: [],
            steps: [],
            picture: null,
            isDraft: true, 
        })
    }  

    const tags = params.tags.map( tag => <Tag 
        key={tag.id} 
        name={ tag.name }  
        color={ newRecipe.tags && newRecipe.tags.includes(tag.id) ? "secondary" : "primary" }
        onClick={() => handleTagChange(tag.id)}/>
    ) 
    const difficulty = params.difficulties.map( (d, index) => <option key={index} value={d.id}>{ d.name }</option>)
    const category = params.categories.map( (c, index) => <option key={index} value={c.id}>{c.name}</option> )
    
    return (
        <>
            <PageBlock back="utilisateur">
                { !editing && <Cockpit title="Proposer une recette"/> || <Cockpit title="Modifier une recette"/>}
                <form>
                    <Field
                        label="Nom de la recette"
                        value={newRecipe.name}
                        onChange={handleChange}
                        name="name"
                    />
                    <Select
                        label="Difficulté"
                        value={newRecipe.difficulty}
                        onChange={handleChange}
                        name="difficulty"
                        options={ difficulty }
                    />
                    <hr></hr>
                    <div className="row mb-3">
                        <div className="col">
                        <ClassicField 
                                label="Temps de préparation (en mn)"
                                type="number"
                                value={newRecipe.making}
                                onChange={handleChange}
                                name="making"
                        />    
                        </div>
                        <div className="col">
                        <ClassicField 
                            label="Temps de cuisson (en mn)"
                            type="number"
                            value={newRecipe.cook}
                            onChange={handleChange}
                            name="cook"
                        />
                        </div>
                        <div className="col">
                        <ClassicField 
                            label="Nombre de personnes"
                            type="number"
                            value={newRecipe.serve}
                            onChange={handleChange}
                            name="serve"
                        />
                        </div>
                    </div>
                    <hr></hr>
                    
                    <Select
                        label="Catégories"
                        value={newRecipe.category}
                        onChange={handleChange}
                        name="category"
                        options={ category }
                    />
                    <Block>
                        { tags }
                        <p><span className="small">Limité à 3 badges maximum</span></p>
                    </Block>
                    <hr></hr>
                    <Block label="Ingrédients">
                        <AddRecipeList
                            items={ newRecipe.ingredients }
                            aria="ingrédients"
                            onChange={ handleIngredientsChange }/>
                    </Block> 
                    <Block label="Étapes">
                        <AddRecipeList
                            items={ newRecipe.steps }
                            aria="steps"
                            type="textarea"
                            onChange={ handleStepsChange }/>
                    </Block>   
                    <Block label="Ajouter une photo">
                        <div className="input-group mb-3">    
                            <div className="custom-file">
                                <input 
                                    type="file" 
                                    className="custom-file-input" 
                                    id="inputGroupFile" 
                                    aria-describedby="fileHelp" 
                                    onChange={ handleImageChange }
                                />
                                <label className="custom-file-label" htmlFor="inputGroupFile">{ (newRecipe.picture && newRecipe.picture.name) || "selectionner une image" }</label>
                            </div>
                        </div>
                    </Block>       
                    <hr></hr>
                    <div className="container text-center my-5">
                        <button type="submit" className="btn btn-primary mx-1" onClick={handleRecipeSubmit}>Ajouter ma recette</button>
                        { newRecipe.isDraft && <button className="btn btn-outline-secondary" onClick={handleDraftSubmit}>Enregistrer le brouillon</button>}
                    </div>
                </form>
            </PageBlock>
            <Footer/>    
        </>        
    );
}
 
export default AddRecipe;