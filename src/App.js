import './App.css';
import Navigation from "./components/navigation.js";
import Logo from "./components/logo/logo.js";
import ImageLinkForm from "./components/image-link-form/image-link-form.js";
import FaceRecognition from "./components/face-recognition/face-recognition.js";
import Rank from "./components/rank/rank.js";
import Particles from 'react-particles-js';
import { Component } from 'react';
import { FaceDetectModelResponse } from './classes/clarifai-responses'
import SignIn from './components/sign-in/sign-in.js'
import Register from './components/register/register.js'
import Routes from './enums/routes-enum';

const baseUrl = 'https://face-recog-be.herokuapp.com/';//
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

const initialState = {
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
    this.setState({ user: user, isSignedIn: true }, callback());
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
    fetch(baseUrl + 'imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: this.state.imageUrl
      })
    }).then(res => {
      if (res.status !== 200) {
        return Promise.reject(res.status + ': ' + res.statusText);
      }
      else {
        return res.json();
      }
    })
      .then((success) => {
        fetch(baseUrl + 'image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.state.user.id
          })
        }).then(res => res.json()).then((entryCount) => this.setState(Object.assign(this.state.user, { entries: entryCount })));
        this.currentImageClarifaiResponse = new FaceDetectModelResponse(success);
        this.displayFaceBoxes(this.calculateFacialBoundingBoxes(this.currentImageClarifaiResponse));
      }).catch((err) => {
        console.error(new Error(err));
      })
      
  }

  onRouteChange = (route) => {
    if (route === Routes.signIn) {
      this.setState(initialState);
    }
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesParams} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} route={route} />

        {route.toLowerCase() === Routes.signIn ?
          <SignIn baseUrl={baseUrl} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : route.toLowerCase() === Routes.register ?
            <Register baseUrl={baseUrl} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
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
