import React, { useState, useEffect } from 'react';
import Cockpit from '../components/Cockpit';
import Footer from '../components/Footer';
import PageBlock from '../components/blocks/pageBlock';
import CommentBlock from '../components/blocks/CommentBlock';
import authAPI from '../services/authAPI';
import recipesAPI from '../services/recipesAPI';
import { Link } from 'react-router-dom';

const Profile = () => {

    useEffect( () => {
        fetchLists()
    }, [])

    const fetchLists = async () => {
        try {
            
            const { recipes } = await recipesAPI.findByUser()
            //const { comments } = await adminAPI.findByUser()

            setRecipes(recipes)
            //setComments(comments)

        } catch(err) {
            console.log(err.response)
        }
    }
    

    const [recipes, setRecipes] = useState([])
    //const [comments, setComments] = useState([])

    
    const myRecipes = recipes.map( (recipe, index) => 
        <li key={index} className="lead mb-1">
            <Link to={"/recipe/" + recipe.id } >
                { recipe.name }
            </Link>
            <span className="badge badge-secondary mx-1">Brouillon</span>
        </li>
    )

    return ( 
        <>
            <PageBlock back="utilisateur">
                <Cockpit title="Profil de l'utilisateur !" />
                <CommentBlock title="Mes infos">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th scope="row">Mon pseudo:</th>
                                <td>user pseudo</td>
                            </tr>
                            <tr>
                                <th scope="row">Mon email:</th>
                                <td>user email</td>
                            </tr>
                            <tr>
                                <th scope="row">Mon mot de passe:</th>
                                <td>
                                    <button type="button" className="btn btn-outline-secondary btn-sm" data-toggle="modal" data-target="#Modalmdp">Modifier</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </CommentBlock>
                <CommentBlock title="Mes recettes">
                    <ul>
                        { myRecipes}
                    </ul>
                </CommentBlock>
                <CommentBlock title="Derniers commentaires"></CommentBlock>
            </PageBlock>
            <Footer/>
        </>  
    );
}
 
export default Profile;