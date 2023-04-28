const cards = document.querySelector(".cards");
const buscador = document.querySelector("#buscador");
let filtrados = [];
let carroCompra = [];
let x = true;
let contador = [];
const stock = [
  {
    id: 1,
    nombre: "Cerdito",
    cantidad: 5,
    precio: 2200,
    disponible: true,
    imagen: "./img/cerdito_rosa.png",
    imagenAdicional: "cerdito_rosa2.png",
  },
  {
    id: 2,
    nombre: "Cocodrilo",
    cantidad: 7,
    precio: 2800,
    disponible: true,
    imagen: "./img/cocodrilos.png",
  },
  {
    id: 3,
    nombre: "Conejito",
    cantidad: 2,
    precio: 2200,
    disponible: true,
    imagen: "./img/conejitos.png",
  },
  {
    id: 4,
    nombre: "Don Erizo",
    cantidad: 8,
    precio: 2500,
    disponible: true,
    imagen: "./img/erizo.png",
  },
  {
    id: 5,
    nombre: "Michis",
    cantidad: 10,
    precio: 1900,
    disponible: true,
    imagen: "./img/michis.png",
  },
  {
    id: 6,
    nombre: "Pandita",
    cantidad: 4,
    precio: 3200,
    disponible: true,
    imagen: "./img/pandita.png",
  },
  {
    id: 7,
    nombre: "Patito",
    cantidad: 3,
    precio: 2200,
    disponible: true,
    imagen: "./img/patito.png",
    imagenAdicional: "patito2.png",
  },
  {
    id: 8,
    nombre: "Peluche disfrazado",
    cantidad: 1,
    precio: 3100,
    disponible: true,
    imagen: "./img/peluche_disfraz.png",
  },
  {
    id: 9,
    nombre: "Perrito",
    cantidad: 10,
    precio: 3500,
    disponible: true,
    imagen: "./img/perrito.png",
    imagenAdicional: "perrito3.png",
  },
  {
    id: 10,
    nombre: "Stich",
    cantidad: 5,
    precio: 2000,
    disponible: true,
    imagen: "./img/stich.png",
  },
  {
    id: 11,
    nombre: "Totoro",
    cantidad: 12,
    precio: 3600,
    disponible: true,
    imagen: "./img/totoro.png",
    imagenAdicional: "totoro2.png",
  },
  {
    id: 12,
    nombre: "Perrito con pan",
    cantidad: 8,
    precio: 3600,
    disponible: true,
    imagen: "./img/perrito_con_pan.png",
  },
];

crearTarjetas();
buscador.addEventListener("input", busqueda);


function busqueda(e) {
  let busco = e.target.value.toLowerCase();
  filtrados = stock.filter((p) => {
    let nombreProd = p.nombre.toLowerCase();
    return nombreProd.includes(busco);
  });
  x = false;
  crearTarjetas();
}

// FILTRADO POR BÚSQUEDA Y MOSTRAR TARJETAS 
function crearTarjetas() {
  if (x === true) {
    cards.innerHTML = "";
    stock.forEach((producto) => { 
    const card = document.createElement("div");
      card.className = "card";
      card.innerHTML += `
           <img src="${producto.imagen}" alt="" >
           <p class="titulos">${producto.nombre}</p>
           <div class="cards-info">
            <p>Cantidad: ${producto.cantidad}</p>
            <p>Precio: ${"$" + producto.precio}</p>
           </div>
           <button class='agregar'>AGREGAR AL CARRITO</button>
        `;
      cards.appendChild(card);
      contador.push(card.children)
      
     
    })}else{
    cards.innerHTML = "";
    contador = []; 
    filtrados.forEach((producto) => {
    const card = document.createElement("div");
      card.className = "card";
      card.innerHTML += `
           <img src="${producto.imagen}" alt="" >
           <p class="titulos">${producto.nombre}</p>
           <div class="cards-info">
            <p>Cantidad: ${producto.cantidad}</p>
            <p>Precio: ${"$" + producto.precio}</p>
           </div>
           <button class='agregar'>AGREGAR AL CARRITO</button>
        `;
      cards.appendChild(card);
      contador.push(card.children)
      
    })}

    console.log(contador);
    
    // TOMAR LOS DATOS DE LA CARD SELECCIONADA
  
   
    const agregar = document.querySelector(".agregar")
    agregar.addEventListener('click', e => {
        const botonClickeado = e.target;
        
        const card = botonClickeado.parentNode;
        const imagen = card.querySelector('img').src;
        const nombre = card.querySelector('.titulos').innerText;
        const cantidad = card.querySelector('.cards-info p:first-child').innerText.replace('Cantidad: ', '');
        const precio = card.querySelector('.cards-info p:last-child').innerText.replace('Precio: $', '');
  
        console.log('Producto agregado al carrito:', {
          imagen: imagen,
          nombre: nombre,
          cantidad: cantidad,
          precio: precio
        });
      });
   
    
  }





