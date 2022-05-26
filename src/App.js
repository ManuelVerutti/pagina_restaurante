import React, { useEffect, useState } from 'react';
import './App.css';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, getDocs, DocumentData, Firestore, deleteField, doc, updateDoc } from 'firebase/firestore/lite';
import { onSnapshot, getFirestore as getFirestoreF } from 'firebase/firestore';
import { async } from '@firebase/util';
import {useNavigate} from 'react-router-dom';
//navigate('/home')
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


async function addUser(db, nombre) {
  try {
    let newEx = doc(db, 'personas', 'ex');
    await updateDoc(newEx, {
      cuarto: nombre
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


getUser(db, 1).then((data) => {
  ini = (data);
});
function App() {

  //
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("i");
  const [contrasena, setContrasena] = useState("i");
  const [id, setId] = useState("");
  const [iCorrecto, setICorrecto] = useState("Incorrecto");
  const [correoI, setCorreoI] = useState("");
  const [contraI, setContraI] = useState("");

  function validacion(correoI, contrasenaI) {
    
    let validador = false;
    let i = 0;
    while (i < lista.length && iCorrecto === "Incorrecto") {

      let datosU = lista[i];
      console.log(datosU);

      console.log(i);

      if (correoI == datosU.correo && contrasenaI == datosU.contrasena) {
        setICorrecto("Correcto");
        console.log("Si logro encontrar a la persona")
        validador = true;
        
        localStorage.setItem("inicioSesion", "si");

      }
      else {
        setICorrecto("Incorrecto");

        console.log("NOOOOOOOOOOOOOO logro encontrar a la persona")

      }
      i++;
    }return validador;

  }

  useEffect(() => {

    console.log(lista)
  })
  return (
    
    <div className='contenido'>
      
      <div className='datos'>
        
       
      
        <h2>Inicia Sesión</h2>
        <div><p>Correo:</p>
        
          <input onChange={(e) => { setCorreoI(e.target.value); }}>
            
          </input>
        </div>
        <div>
          <p>Contraseña:</p>
          <input onChange={(e) => { setContraI(e.target.value); }}>
          </input>
        </div>

        <button onClick={() => {if(validacion(correoI, contraI)){ 
          navigate('/menu'); 
          } }}>
          Ingresar
        </button>
        <p className='btRegistro' onClick={() => { navigate('/register') }} >Registro</p>
      </div>
      
    </div>
  );
}

export default App;
