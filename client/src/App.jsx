import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import "./App.css";
import { Lands } from "./components/Lands/Lands";
import Why from "./components/Why/Why";
import Contact from "./components/Contact/Contact";
import GetStarted from "./components/GetStarted/GetStarted";
import Footer from "./components/Footer/Footer"
function App() {
  return (
    <div className="App">
      <div>
        <div className="white-gradient" />
        <Header />
        <Hero />
      </div>
      <Lands />
      <Why />
      <Contact />
      <GetStarted />
      <Footer />
    </div>
  );
}

export default App;
