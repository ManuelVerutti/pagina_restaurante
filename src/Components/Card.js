import React from 'react';

function Card  (nombre) {
  console.log(nombre);
  return (
    <div>
       <h2> {nombre.nombre}  </h2>
      <p> {nombre.ciudad} </p>
      <img src ={nombre.imagen}></img>
    </div>
  );
}

export default Card;
