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



function Detalle() {
    const navigate = useNavigate();

    
    const [lista, setLista] = useState("");
    const [cargado, setCargado] = useState(false);
    const [act, setAct] = useState("");


    async function getRestaurante(db, id) {
        const restaurantesColection = collection(db, 'restaurantes');
        const restaurantesSnapshot = await getDocs(restaurantesColection);
        const restaurantesList = restaurantesSnapshot.docs.map(doc => doc.data());
        let firstElement = restaurantesList[id];
        let datos = firstElement;
        setLista(restaurantesList);
        return datos;
    }

    if(!cargado){
        
    getRestaurante(db, 0).then((data) => {
        ini = (data);
      });
      setCargado(true);
    }else{
        setAct(act+1);
    }

    useEffect(() => {
        console.log(lista);
    })
    return (
        <div className='fondoRes'>
            <div className='contenidoRes'>
                <div >
                    <img alt="" src={lista[0].imagen}></img>
                    <a href={lista[0].enlacePagina}>Enlace Pagina</a>
                </div>
                <div className='infoRes'>
                    <h2>{lista[0].nombre}</h2>
                    <h4>{lista[0].ciudad}</h4>
                    <p>{lista[0].reseña}</p>
                </div>
            </div>
        </div>
    );
}

export default Detalle;
