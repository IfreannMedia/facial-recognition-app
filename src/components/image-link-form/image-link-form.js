import React from 'react';
import './image-link-form.css';

const ImageLinkForm = () => {
    return (
        <div>
            <p className="f3">{'upload a face and we will detect it!'}</p>
            <div className='center'>
                <div className="form center pa4 br3 shadow-5">
                    <input className="f3 pa2 w-70" type="text" />
                    <button className="w30 grow f4 link ph3 pv2 dib white bg-light-purple">{'Detect'}</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm