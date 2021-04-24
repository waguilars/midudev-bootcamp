import './App.css';
import Mensaje from './Mensaje.js'


const App = () =>  {
  return (
    <div className="App">
      <h1>Titulo del sitio</h1>
      <Mensaje color="red" msg="Work in prorgess..."/>
      <Mensaje color="green" msg="Work in prorgess..."/>
      <Mensaje color="blue" msg="Work in prorgess..."/>
    </div>
  );
}

export default App;
