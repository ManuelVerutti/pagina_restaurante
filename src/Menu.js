import React, { useEffect, useState } from 'react';
import './App.css';
import './Menu.css';
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let lista;
let ini;

async function getRestaurante(db,id) {
    const restaurantesColection = collection(db, 'restaurantes');
    const restaurantesSnapshot = await getDocs(restaurantesColection);
    const restaurantesList = restaurantesSnapshot.docs.map(doc => doc.data());
    let firstElement = restaurantesList[id];
    let datos = firstElement;
    lista = restaurantesList;
    return datos;
}

getRestaurante(db, 0).then((data) => {
     ini = (data);
});

function Menu() {


    const [RestauranteI, setRestauranteI] = useState("");


    return (
        <div className='menu'>
            
            <div className='ListaRestaurantes'>
                <div className='ContendorTextoBuscador'>
                <img src='logo192.png'></img>
                    <h2>Busca tus restaurantes favoritos cercanos a ti</h2>
                </div>
                <input className='Buscador' onChange={(e) => {setRestauranteI(e.target.value)}}></input> 
                <button className='BotonDeBuscar'>Buscar</button>
            </div>
        </div>
    );
}


export default Menu;