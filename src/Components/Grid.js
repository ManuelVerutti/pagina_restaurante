import React from 'react';
import Card from './Card';

function Grid  (lista) {
    console.log(lista);
    return (
    <React.Fragment> <div className="grid">
    {(lista ? lista.length > 0 : lista) ? (
        
      lista.map((item, index) => {
       
        return (
          <div key={index}>
            <Card
              nombre = {item.lista[0].nombre}
              imagen = {item.lista[0].imagen}
              ciudad = {item.lista[0].ciudad}
            />
          </div>
        );
      })
    ) : (
      <div>
        <h1 >
          Su búsqueda no produjo ningún resultado. Intente con otro término.
        </h1>
      </div>
    )}
  </div> </React.Fragment>
  );
}

export default Grid;