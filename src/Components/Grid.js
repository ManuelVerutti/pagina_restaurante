import React from 'react';
import Card from './Card';

function Grid  (lista) {
  let lista2 = lista.lista;
  console.log(lista2);
    return (
    <React.Fragment> <div className="grid">
    {(lista2 ? lista2.length > 0 : lista2) ? (
        
        Object.values(lista2).map((item, index) => {
       console.log(item);
        return (
          <div key={index}>
            <Card
              nombre = {item.nombre}
              imagen = {item.imagen}
              ciudad = {item.ciudad}
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