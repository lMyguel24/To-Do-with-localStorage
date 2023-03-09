//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


//eventos 
eventListeners();
function eventListeners(){
    //Cuando el usuario agrega un tweet
    formulario.addEventListener('submit',agregarTweet);
    
    document.addEventListener('DOMContentLoaded',()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || []; 
        crearHTML();
    })

}


//funciones
function agregarTweet(e){
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    
    if(tweet.trim().toLowerCase() === ''){
        alertaError('Un mensaje no puede ir vacio');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    };
    
    //agrega al arreglo de tweets
    tweets = [...tweets, tweetObj ]; //esto es un array de objetos
    //una vez agreagado vamos a crear el html
    crearHTML();
    //reiniciar el form
    formulario.reset();
}

function alertaError(error){
    const mensajeError = document.createElement('p');
    mensajeError.classList.add('error');
    mensajeError.textContent = error;
    //inyectamos en el html
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
    //Elimina la alerta despues de 3 segundos con setTimeout
    setTimeout(()=>{
        mensajeError.remove();
    },3000);
}
//Muestra un listado de los tweets
function crearHTML(){
    limpiarHtml();

    if(tweets.length > 0){

        tweets.forEach(tweet => {
        //agregar boton de eliminar
        const btnEliminar = document.createElement('a');
        btnEliminar.classList.add('borrar-tweet');
        btnEliminar.innerText = 'X';

        //agregar la funcion de eliminar
        btnEliminar.onclick = () =>{
            borrarTweet(tweet.id);
        }

        //agregar tweet como un li
        const li = document.createElement('li');
        li.innerText = tweet.tweet;
        listaTweets.appendChild(li);
        li.appendChild(btnEliminar);
        });
    }

    sincronizarStorage();
}
//Agrega los tweets actuales al localStorage
function sincronizarStorage(){
    //Agrega los tweets actuales a localStorage
    localStorage.setItem('tweets',JSON.stringify(tweets));    
}

//Elimina un tweet
function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
    
}
function limpiarHtml(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}


//localStorage.clear();





