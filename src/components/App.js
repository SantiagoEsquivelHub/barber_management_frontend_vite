import logo from '../logo.svg';
import '../assets/styles/App.css';
import Mensaje from './Mensaje';
import SearchBox from './Buscador';
import ActionBox from './Accion';
import InfoBox from './Info';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello world.
        </p>
        <Mensaje titulo="Staff"/>
        <SearchBox/>
        <ActionBox/>
        <InfoBox />

      </header>
    </div>
  );
}

export default App;
