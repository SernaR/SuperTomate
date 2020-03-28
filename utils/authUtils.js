const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{8,20}$/;

exports.userConstraint = ( name, email, password ) => {
    const constraints = [] 
    if (!name || name.length >= 13 || name.length < 4) {
        constraints.push({
            propertyPath: 'name',
            message: 'Votre pseudo doit avoir entre 4 et 12 caractères'
        })
    }
    if (!email || !EMAIL_REGEX.test(email)) {
        constraints.push({
            propertyPath: 'email',
            message: 'Adresse email invalide'
        })
    }
    if (!password || !PASSWORD_REGEX.test(password)) {
        constraints.push({
            propertyPath: 'password',
            message: 'Votre mot de passe doit avoir entre 8 et 20 caractères et au moins un chiffre'
        })
    }
    return constraints
}

exports.passwordConstraint = ( password ) => {
    if (!password || !PASSWORD_REGEX.test(password)) {
        return 'Votre mot de passe doit avoir entre 8 et 20 caractères et au moins un chiffre'
    }
    return false
}