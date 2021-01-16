import './App.css';
import Navigation from "./components/navigation.js";
import Logo from "./components/logo/logo.js";
import ImageLinkForm from "./components/image-link-form/image-link-form.js";
import Rank from "./components/rank/rank.js";
import Particles from 'react-particles-js';

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

function App() {
  return (
    <div className="App">
       <Particles className='particles' params={particlesParams} />
      <Navigation/>
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/*
      <FaceRecognition />*/}
    </div>
  );
}

export default App;
