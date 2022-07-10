import '../assets/styles/EstiloM.css';

function Mensaje (props){
      
      return (
                  <div id="Message"> 
                        <h1>
                        {props.titulo}
                        </h1>
                  </div>
      )
}

export default Mensaje;