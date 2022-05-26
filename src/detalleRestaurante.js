import React, { useEffect, useState } from 'react';
import './detalleRestaurante.css';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, getDocs, DocumentData, Firestore, deleteField, doc, updateDoc, setDoc } from 'firebase/firestore/lite';
import { onSnapshot, getFirestore as getFirestoreF } from 'firebase/firestore';
import { async } from '@firebase/util';
import { useNavigate, useLocation } from 'react-router-dom';

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

function Detalle(state) {

    const navigate = useNavigate();
    
    const location = useLocation();
    console.log(location.state);

    const [imagen, setImagen] = useState("");
    const [nombre, setNombre] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [reseña, setReseña] = useState("");
    const [enlace, setEnlace] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [direccion, setDireccion] = useState("");

    getRestaurante(db, location.state - 1).then((data) => {
        setCiudad(data.ciudad);
        setNombre(data.nombre);
        setImagen(data.imagen);
        setReseña(data.reseña);
        setEnlace(data.enlacePagina);
        setDescripcion(data.descripcion);
        setDireccion(data.direccion);
    });
    console.log("Cargo El Elemento")


    useEffect(() => {
        console.log(lista);
        if(localStorage.getItem("inicioSesion") !=="si"){
            navigate("/");
        }
    })
    return (
        <div>
            <div className='header'>
                <h1 onClick={() => { navigate('/menu') }}> Regresar</h1>
            </div>
            <div className='fondoRes'>


                <div className='contenidoRes'>
                    <div className='visual' >
                        <img alt="" src={imagen}></img>
                        <a href={enlace}>Enlace Pagina</a>
                    </div>
                    <div className='infoRes'>
                        <h2>
                            {nombre}</h2>
                        <h4>Ciudad:  {ciudad}<br></br>  Direccion:  {direccion} <br></br> </h4>
                        <p>Reseña:<br></br>
                            {reseña}</p>
                        <p>Descripción:<br></br>
                            {descripcion}</p>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Detalle;
