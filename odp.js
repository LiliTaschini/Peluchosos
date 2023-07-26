const cards = document.querySelector(".cards");
const buscador = document.querySelector("#buscador");
const icono = document.querySelector(".lord-icon");
let filtrados = [];
let carroCompra = [];
let x = true;
let bot = false;
let cantidadCarro = 1;

// ARRAY CON STOCK
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
    nombre: "Disfrazado",
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

// LLAMAR FUNCIÓN DE CREACIÓN DE TARJETAS
crearTarjetas();
// ESCUCHAR BUSCADOR
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

// 1º IF MUESTRA TARJETAS 2º MUESTRA FILTRADOS
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
             <button class='agregar' data-id="${
               producto.id
             }">AGREGAR AL CARRITO</button>
          `;
      cards.appendChild(card);
      card.querySelector("button").addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        agregarAlCarrito(parseInt(id));
      });
    });
  } else {
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
             <button class='agregar' data-id="${
               producto.id
             }">AGREGAR AL CARRITO</button>
          `;
      cards.appendChild(card);
      card.querySelector("button").addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        agregarAlCarrito(parseInt(id));
      });
    });
  }

  // BUSCA POR ID EN EL STOCK Y LO MUESTRA EN EL CARRITO
  function agregarAlCarrito(id) {
    const producto = stock.find((p) => p.id === id);
    let encontrado = false;

    // Buscar si ya existe el producto en el carrito
    for (let i = 0; i < carroCompra.length; i++) {
      if (carroCompra[i].id === id) {
        encontrado = true;
        break;
      }
      encontrado = false;
      console.log(carroCompra);
    }

    if (encontrado) {
      // si ya existe el producto en el carrito actualizamos cantidad
        const compras = carroCompra.map(p =>{ 
        if(p.id === id && p.cant <= p.cantidad) {
          p.cantidad --;
          p.cant ++;
          return p;
        } else {
          return p;
        }
      })
      carroCompra = [...compras];
    } else {
      // sino lo agregamos
      carroCompra.push({ id: id, cant: cantidadCarro, ...producto });
      if (producto.cant <= producto.cantidad) {
        producto.cantidad --;
        producto.cant ++;
      }
      console.log(producto);
      console.log(carroCompra);
      

      const carrito = document.querySelector("#carrito");
      const contenido = document.createElement("div");
      contenido.className = "contenido-carrito";
      contenido.innerHTML += `
             <img src="${producto.imagen}" alt="" >
             <p class="titulos">${producto.nombre} -</p>
             <div class="cards-info">
              <p>Cantidad: ${producto.cantidad}</p>
              <p>Precio: ${"$" + producto.precio}</p>
             </div>
          `;
      carrito.appendChild(contenido);
    }
  }
}

//Abre y cierra el DIV del carrito de compras
icono.addEventListener("click", (e) => {
  const carro = document.querySelector("#carrito");
  const contenido = document.querySelector(".contenido-carrito");
  if (carro.classList.contains("carrito")) {
    carro.classList.remove("carrito");
    carro.classList.add("cont");
  } else {
    carro.classList.add("carrito");
    carro.classList.remove("cont");
  }
});
