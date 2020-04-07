import React, { useState, useEffect } from 'react';     
import Cockpit from '../components/Cockpit';
import Field from '../components/forms/Field'
import recipeAPI from '../services/recipesAPI'
import Ingredients from '../components/Ingredients';
import Select from '../components/forms/Select';
import Block from '../components/blocks/AddRecipeBlock';
import ClassicField from '../components/forms/ClassicField';
import Footer from '../components/Footer';
import PageBlock from '../components/blocks/pageBlock';
import recipesAPI from '../services/recipesAPI';
import Tags from '../components/Tags';
import Steps from '../components/Steps';

import toast from '../services/toaster' 

//TODO : contraintes

const AddRecipePage = ({ match, history }) => {

    const { id = 'new' } = match.params
    
    useEffect( () => {
        fetchRecipeParams()
    }, [])

    const [newRecipe, setNewRecipe] = useState({
        name: '',
        difficulty: '',
        serve: 0,
        cook: 0, 
        making: 0, 
        wait: 0,
        category: '',
        tags: [],
        ingredients: [],
        steps: [],
        picture: null,
        isDraft: true
    })

    const [errors, setErrors] = useState({
        name: '',
        tags: '',
        ingredients: '',
        steps: '',
        picture: ''
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
                const { name, difficulty, serve, cook, wait, making, category, steps, ingredients, isDraft} = recipe
                const tags = recipe.tags.map( tag => tag.id)
                
                setNewRecipe({ name, difficulty: difficulty.id, serve, cook, making, wait, category:category.id, tags, ingredients, steps, isDraft })
            } else {
                setNewRecipe({ ...newRecipe,
                    difficulty: difficulties[0].id,
                    category: categories[0].id ,
                })
            }
            
        } catch(err) {
            toast.error("Oups, un problème est survenue")
        } 
    }

    const handleChange = ({ currentTarget }) => {
        const {value, name} = currentTarget;
        setNewRecipe({ ...newRecipe, [name]: value })
    };

    const handleRecipeParamChange = (name, param) => setNewRecipe({ ...newRecipe, [name]: param })
    const handleImageChange = ({ currentTarget }) => setNewRecipe({ ...newRecipe, picture: currentTarget.files[0] })

    const sendRecipe = async () => {
        const { name, difficulty, serve, making, cook, wait, tags, category, steps, ingredients, isDraft } = newRecipe 
        const picture = newRecipe.picture
        
        let recipeId
        let formData = new FormData()

        formData.set('name', name)
        formData.set('difficulty', difficulty)
        formData.set('serve', serve)
        formData.set('making', making)
        formData.set('cook', cook)
        formData.set('wait', wait)
        formData.set('tags', JSON.stringify(tags)) 
        formData.set('steps', JSON.stringify(steps))
        formData.set('ingredients', JSON.stringify(ingredients))
        formData.set('category', category)
        formData.set('isDraft', isDraft)

        try {
            if(editing){
                if(picture) formData.append('image', picture)
                recipeId = await recipeAPI.update(id, formData) 
            } else {
                formData.append('image', picture)
                recipeId = await recipeAPI.save(formData)
            }
            toast.success("la recette est enregistrée")
            history.push("/recette/categorie/nouveau/" + recipeId ); 
        } catch ({ response }) {
            const messages = response.data;
            const apiErrors = {}

            if(messages) {
                messages.map( ({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);

                toast.error("Il y a des erreurs dans votre formulaire")
                console.error
            } 
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
                        error ={errors.name}
                    />
                    <Select
                        label="Difficulté"
                        onChange={handleChange}
                        name="difficulty"
                        options={ params.difficulties }
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
                                label="Temps de pause (en mn)"
                                type="number"
                                value={newRecipe.wait}
                                onChange={handleChange}
                                name="wait"
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
                        onChange={handleChange}
                        name="category"
                        options={ params.categories }
                    />
                    <Tags 
                        tagList = { params.tags }
                        tags = { newRecipe.tags }
                        onTagChange = { handleRecipeParamChange }
                        error ={errors.tags}
                    />
                    <hr></hr>
                    <Block label="Ingrédients">
                        <Ingredients
                            items={ newRecipe.ingredients }
                            name="ingredients"
                            error ={errors.ingredients}
                            onChange={ handleRecipeParamChange }/>
                    </Block> 
                    <hr></hr>
                    <Steps 
                        steps={ newRecipe.steps } 
                        onChange={ handleRecipeParamChange }
                        error ={errors.steps}
                    />

                    <hr></hr>
                    <Block label="Ajouter une photo">
                        <div className="input-group mb-3">    
                            <div className="custom-file">
                                <input 
                                    type="file" 
                                    className={"custom-file-input" + (errors.picture && " is-invalid")}
                                    id="inputGroupFile" 
                                    aria-describedby="fileHelp" 
                                    onChange={ handleImageChange }
                                />
                                <label className="custom-file-label" htmlFor="inputGroupFile">{ newRecipe.picture && newRecipe.picture.name }</label> 
                            </div>
                        </div>
                        {errors.picture && <p className="small error-message">{errors.picture}</p>}  
                    </Block>       
                    <hr></hr>
                    <div className="container text-center my-5">
                        <button type="submit" className="btn btn-primary mx-1" onClick={handleRecipeSubmit}>{ editing ? "modifier" : "Ajouter "} ma recette</button>
                        { newRecipe.isDraft && <button className="btn btn-outline-secondary" onClick={handleDraftSubmit}>Enregistrer le brouillon</button>}
                    </div>
                </form>
            </PageBlock>
            <Footer/>    
        </>        
    );
}
 
export default AddRecipePage;