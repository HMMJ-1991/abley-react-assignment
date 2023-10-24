import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
// import Content from './components/Content';
import Footer from './components/Footer';
import MapView from './components/MapView';

function App() {
  return (

    // Using the newly created Header  
    // component in this main component 
    <div>
      <Header />
      <MapView/>
      <Footer/>
    </div>
  );
}
export default App;
