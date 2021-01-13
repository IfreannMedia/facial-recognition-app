import logo from './logo.svg';
import './App.css';
import Navigation from "./components/navigation.js";
import Logo from "./components/logo/logo.js";

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Logo />
      {/*<ImageLinkForm />
      <FaceRecognition />*/}
    </div>
  );
}

export default App;
