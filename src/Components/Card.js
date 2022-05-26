import React from 'react';

function Card  (nombre,imagen,ciudad) {
  return (
    <div>
       <h2> {nombre}  </h2>
      <p> {ciudad} </p>
      <img src ={imagen}> </img>
    </div>
  );
}

export default Card;
