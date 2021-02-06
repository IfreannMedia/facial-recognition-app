import './App.css';
import Navigation from "./components/navigation.js";
import Logo from "./components/logo/logo.js";
import ImageLinkForm from "./components/image-link-form/image-link-form.js";
import FaceRecognition from "./components/face-recognition/face-recognition.js";
import Rank from "./components/rank/rank.js";
import Particles from 'react-particles-js';
import { Component } from 'react';
import Clarifai from 'clarifai';
import { FaceDetectModelResponse } from './classes/clarifai-responses'
import SignIn from './components/sign-in/sign-in.js'
import Register from './components/register/register.js'

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
      boxes: [],
      route: 'signIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
    };
  }

  loadUser = (user, callback) => {
    this.setState({user: user}, callback());
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
    this.setState({ boxes })
  }


  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input }, this.useClarifaiForUrl);
  }

  // the image url can either be a URL or a base64 image, so file upload will work too
  useClarifaiForUrl = () => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.imageUrl).then(
      (success) => {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              id: this.state.user.id
          })
        }).then(res => res.json())
        .then((entryCount)=> this.setState(Object.assign(this.state.user, {entries: entryCount})));
        this.currentImageClarifaiResponse = new FaceDetectModelResponse(success);
        this.displayFaceBoxes(this.calculateFacialBoundingBoxes(this.currentImageClarifaiResponse));
      }).catch((err) => {
        console.log(err);
      })
  }

  onRouteChange = (route) => {
    this.setState({ isSignedIn: route === 'home' ? true : false });
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesParams} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />

        {route.toLowerCase() === 'signin' ?
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : route.toLowerCase() === 'register' ?
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <div><Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            </div>
        }
      </div>
    );
  }
}

export default App;
