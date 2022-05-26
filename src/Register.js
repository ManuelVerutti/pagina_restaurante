import React, { useEffect, useState } from 'react';
import './App.css';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, getDocs, DocumentData, Firestore, deleteField, doc, updateDoc, setDoc } from 'firebase/firestore/lite';
import { onSnapshot, getFirestore as getFirestoreF } from 'firebase/firestore';
import { async } from '@firebase/util';
import { useNavigate } from 'react-router-dom';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

async function getUser(db, id) {
  const personasColection = collection(db, 'personas');
  const personasSnapshot = await getDocs(personasColection);
  const personasList = personasSnapshot.docs.map(doc => doc.data());
  let firstElement = personasList[id];
  let datos = [firstElement["correo"], firstElement["contrasena"]];
  lista = personasList;
  return datos;
}

async function addUser(db, nombre, correo, contrasena) {
  try {
    console.log("Entro a guardar");

    let newUser = doc(db, 'personas', nombre);
    //addDoc(db, 'personas', "2");
    await setDoc(newUser, {
      nombre: nombre,
      correo: correo,
      contrasena: contrasena
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


function Register() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("i");
  const [contrasena, setContrasena] = useState("i");
  const [id, setId] = useState("");
  const [iCorrecto, setICorrecto] = useState("Incorrecto");
  const [nombreI, setNombreI] = useState("");
  const [correoI, setCorreoI] = useState("");
  const [contraCI, setContraCI] = useState("");
  const [contraI, setContraI] = useState("");

  function validacion(correoI, contrasenaI) {
    getUser(db, 1).then((data) => {
      ini = (data);
    });
    let i = 0;
    while (i < lista.length && iCorrecto === "Incorrecto") {

      let datosU = lista[i];
      console.log(datosU);

      console.log(i);

      if (correoI == datosU.correo && contrasenaI == datosU.contrasena) {
        setICorrecto("Correcto");
        console.log("Si logro encontrar a la persona")
        return true;
      }
      else {
        setICorrecto("Incorrecto");

        console.log("NOOOOOOOOOOOOOO logro encontrar a la persona")
      }
      i++;
    }

  }

  useEffect(() => {

    console.log(lista)
  })
  return (
    <div className='contenido'>
      <div className='datosR'>
        <h2>Registro</h2>
        <div><p>Correo:</p>
          <input onChange={(e) => { setCorreoI(e.target.value); }}>
          </input>
        </div>
        <div><p>Nombre:</p>
          <input onChange={(e) => { setNombreI(e.target.value); }}>
          </input>
        </div>
        <div>
          <p>Contraseña:</p>
          <input onChange={(e) => { setContraI(e.target.value); }}>
          </input>
        </div>
        <div>
          <p>Confirmar Contraseña:</p>
          <input onChange={(e) => { setContraCI(e.target.value); }}>
          </input>
        </div>

        <button onClick={() => { if (contraCI === contraI) { 
          addUser(db, nombreI, correoI, contraI); 
          window.alert('Usuario Creado'); 
          navigate('/');
          } else { window.alert('No coinciden las Contraseñas'); } }}>
          Registrarse
        </button>
        <p onClick={() => { navigate('/') }}>Iniciar Sesión</p>
      </div>
    </div>
  );
}

export default Register;
