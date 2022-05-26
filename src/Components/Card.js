import React from 'react';
import "./Card.css";
import {useNavigate} from 'react-router-dom';


//{ state={}, replace=false }

function Card(nombre) {
  const navigate = useNavigate();
  console.log(nombre);
  return (
    <div className='card' onClick={() => { navigate("/detalle", { state: nombre.id }) }}>
      <img src={nombre.imagen}></img>
      <div className="info">
        <h2 >{nombre.nombre}  </h2>
        <p className= 'tCiudad'> {nombre.ciudad} </p>
        <p > {nombre.descripcion} </p>

      </div>
    </div>
  );
}

export default Card;
