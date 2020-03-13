import React, { useState } from 'react';

const Slug = ({ slug, onSetSlug }) => {

    const [url, setUrl] = useState({
        show: false,
        slug: ''
    })
    
    const prepareSlug = () => {
        const url = {
            show: true,
            slug: slug.name.toLowerCase()
        }
        setUrl(url)
    }

    const handleChange = ({currentTarget}) => {
        setUrl({ ...url, slug: currentTarget.value})
    }

    const setSlug = () => {
        const correctSlug = url.slug.split(' ').join('-')
        onSetSlug(slug.id, correctSlug, slug.category.name)
        setUrl({
            show: false,
            slug: ''
        })
    }

    return (
        <form className="form-inline">
            <div className="form-group mb-2">
                <input type="text" readOnly className="form-control-plaintext" value={slug.name}/>
            </div>
            <div className="form-group mx-sm-3 mb-2">
                <input type="text" className="form-control" value={url.slug} onChange={handleChange}/>
            </div>
            { !url.show && 
                <button className="btn btn-outline-dark mb-2" onClick={prepareSlug}>créer Url</button>
                ||
                <button className="btn btn-primary mb-2" onClick={setSlug}>Voir</button>
            }
        </form>
    );
}
 
export default Slug;