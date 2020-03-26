import React from 'react';
import ScrollToTopOnMount from '../../services/ScrollToTopOnMount';
import ScrollButton from '../ScrollButton';

//todo supr coomentsBlock

const PageBlock = ({ children, commentBlock, breadcrumds, back }) => {
    //const url = "url('/images/fond-" + back + ".jpg')"
    const url = "url('/images/fond-visiteur.jpg')"

    return ( 
        <main style={ {backgroundImage: url} } className="pages-back">
                <ScrollToTopOnMount />
                <div className="container">
                    <div className="card" style={{ marginTop: '3.75em', marginBottom: '1em'}}></div>
                    {breadcrumds}
                    <div className="card px-4 mb-3">
                        { children }
                    </div>
                    {commentBlock}
                </div >
                <ScrollButton scrollStepInPx="50" delayInMs="16.66"/>   
        </main>
    );
}
 
export default PageBlock;