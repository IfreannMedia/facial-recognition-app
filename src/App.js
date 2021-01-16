import './App.css';
import Navigation from "./components/navigation.js";
import Logo from "./components/logo/logo.js";
import ImageLinkForm from "./components/image-link-form/image-link-form.js";
import FaceRecognition from "./components/face-recognition/face-recognition.js";
import Rank from "./components/rank/rank.js";
import Particles from 'react-particles-js';
import { Component } from 'react';
import Clarifai from 'clarifai';
import ClarifaiGeneralResponseObject from './classes/clarifai-responses'

const app = new Clarifai.App({
 apiKey: 'YOUR API KEY GOES HERE'
});

const particlesParams = {
  particles: {
    number: {
      value: 75,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    };
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    this.useClarifaiForUrl(this.state.imageUrl);
  }

  // the image url can either be a URL or a base64 image, so file upload will work too
  useClarifaiForUrl = (image) => {
    app.models.predict(Clarifai.GENERAL_MODEL, image).then(
      (success) => {
        let generalResponse = new ClarifaiGeneralResponseObject();
        generalResponse.response = success.outputs[0];
      },
      (error) => {
        console.log('success', error)
      })
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesParams} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
