import './App.css';
import Navigation from "./components/navigation.js";
import Logo from "./components/logo/logo.js";
import ImageLinkForm from "./components/image-link-form/image-link-form.js";
import FaceRecognition from "./components/face-recognition/face-recognition.js";
import Rank from "./components/rank/rank.js";
import Particles from 'react-particles-js';
import { Component } from 'react';
import Clarifai from 'clarifai';
import { ClarifaiGeneralResponseObject, FaceDetectModelResponse } from './classes/clarifai-responses'

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
      imageUrl: '',
      box: {
        bottom_row: null,
        left_col: null,
        right_col: null,
        top_row: null
      },
      boxes: []
    };
  }

  currentImageClarifaiResponse = new FaceDetectModelResponse();

  calculateFacialBoundingBoxes = (clarifaiResponse) => {
    let img = document.getElementById("input-image");
    const width = Number(img.width);
    const height = Number(img.height);
    let boxes = [];
    clarifaiResponse.outputs[0].data.regions.forEach((element, i) => {
      boxes.push({
        leftCol: element.region_info.bounding_box.left_col * width,
        topRow: element.region_info.bounding_box.top_row * height,
        rightCol: width - (element.region_info.bounding_box.right_col * width),
        bottomRow: height - (element.region_info.bounding_box.bottom_row * height)
      });
    });
    return boxes;
  }

  displayFaceBoxes = (boxes) => {
    this.setState({boxes})
  }


  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input }, this.useClarifaiForUrl);
  }

  // the image url can either be a URL or a base64 image, so file upload will work too
  useClarifaiForUrl = (image) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.imageUrl).then(
      (success) => {
        this.currentImageClarifaiResponse = new FaceDetectModelResponse(success);
        this.displayFaceBoxes(this.calculateFacialBoundingBoxes(this.currentImageClarifaiResponse));
      }).catch((err) => {
        console.log(err);
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
        <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
