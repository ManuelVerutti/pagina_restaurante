import React, { useEffect, useState } from 'react';
import './detalleRestaurante.css';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, getDocs, DocumentData, Firestore, deleteField, doc, updateDoc, setDoc } from 'firebase/firestore/lite';
import { onSnapshot, getFirestore as getFirestoreF } from 'firebase/firestore';
import { async } from '@firebase/util';
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
    apiKey: "AIzaSyA31tCERRhjVXrlHxwOTQKodaO7PPsuqZo",
    authDomain: "jamrestaurante-ddcda.firebaseapp.com",
    projectId: "jamrestaurante-ddcda",
    storageBucket: "jamrestaurante-ddcda.appspot.com",
    messagingSenderId: "887873168972",
    appId: "1:887873168972:web:c9f29a6c9894eb3b88b6e9",
    measurementId: "G-WXWG684D4L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let ini;
let lista;

async function getRestaurante(db, id) {
    const restaurantesColection = collection(db, 'restaurantes');
    const restaurantesSnapshot = await getDocs(restaurantesColection);
    const restaurantesList = restaurantesSnapshot.docs.map(doc => doc.data());
    let firstElement = restaurantesList[id];
    let datos = firstElement;
    lista = restaurantesList;
    return datos;
}

function Detalle() {

  const [imagen, setImagen] = useState("");
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [reseña, setReseña] = useState("");
  const [enlace, setEnlace] = useState("");
    
getRestaurante(db, 0).then((data) => {
    setCiudad(data.ciudad);
    setNombre(data.nombre);
    setImagen(data.imagen);
    setReseña(data.reseña);
    setEnlace(data.enlacePagina);
  });
    console.log("Cargo El Elemento")

    const navigate = useNavigate();

    useEffect(() => {
        console.log(lista);
    })
    return (
        <div className='fondoRes'>
            <div className='contenidoRes'>
                <div >
                    <img alt="" src={imagen}></img>
                    <a href={enlace}>Enlace Pagina</a>
                </div>
                <div className='infoRes'>
                    <h2>{nombre}</h2>
                    <h4>{ciudad}</h4>
                    <p>{reseña}</p>
                </div>
            </div>
        </div>
    );
}

export default Detalle;
