import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import './App.css'
import { Lands } from "./components/Lands/Lands";
import Why from "./components/Why/Why";
function App() {
  return (
    <div className="App">
      <div>
        <div className="white-gradient"/>
      <Header/>
      <Hero/>
      </div>
      <Lands/>
      <Why/>
    </div>
  );
}

export default App;
