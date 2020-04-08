import React from 'react';
import ScrollToTopOnMount from '../../services/ScrollToTopOnMount';
import ScrollButton from '../ScrollButton';

//todo supr coomentsBlock

const PageBlock = ({ children, commentBlock, breadcrumds, back }) => {
    //const url = "url('/images/fond-" + back + ".jpg')"
   //style={ {backgroundImage: url} } 

    return ( 
        <main className="pages-back">
                <ScrollToTopOnMount />
                <div className="container">
                    <div className="card" style={{ marginTop: '3.25em', marginBottom: '1em'}}></div>
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