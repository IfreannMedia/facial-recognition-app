import React from 'react';
import './image-link-form.css';

// get and destructure the props in the input of this function:
const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className="f3">{'upload a face and we will detect it!'}</p>
            <div className='center'>
                <div className="form center pa4 br3 shadow-5">
                    <input className="f3 pa2 w-70" type="text" onChange={onInputChange} />
                    <button className="w30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}>{'Detect'}</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm