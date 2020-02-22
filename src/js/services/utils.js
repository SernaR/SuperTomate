exports.recipeUrl = (category, slug) => {
    const recipeSlug = slug ? slug : 'nouveau' 
    const recipeCategory = category ? category.name : 'categorie'
    return '/recette/' + recipeCategory + '/' + recipeSlug + '/'
}