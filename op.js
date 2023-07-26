const cards = document.querySelector(".cards");
const buscador = document.querySelector("#buscador");
const abrir = document.querySelector(".lord-icon");
const cerrar = document.querySelector("#carritoCerrar");
const contadorCarrito = document.querySelector("#contadorCarrito");
const carrito = document.querySelector("#carrito");
const contenido = document.querySelector(".contenido-carrito");
const modal = document.querySelector("#contenedor-carro");
const precioTotal = document.querySelector("#precioTotal");
const vaciar = document.querySelector("#vaciar-carrito");
const body = document.querySelector("body");
const confirmar = document.querySelector("#confirmar");
const cambiaImg = document.querySelector(".img");
let mensaje = "";

let filtrados = [];
let carroCompra = [];
let x = true;

/* lOCAL STORAGE */
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carroCompra")) {
    carroCompra = JSON.parse(localStorage.getItem("carroCompra"));
    actualizarCarrito();
  }
  localStorage.setItem("stock", JSON.stringify(stock));
  crearTarjetas();
});

// ARRAY CON STOCK
const stock = [
  {
    id: 1,
    nombre: "Chancho",
    cantidad: 5,
    precio: 2200,
    disponible: true,
    imagen: "./img/cerdito_rosa.png",
    imagenAdicional: "./img/cerdito_rosa2.png",
  },
  {
    id: 2,
    nombre: "Coco",
    cantidad: 7,
    precio: 2800,
    disponible: true,
    imagen: "./img/cocodrilos.png",
    imagenAdicional: "./img/coco.jpg",
  },
  {
    id: 3,
    nombre: "Conejo",
    cantidad: 2,
    precio: 2200,
    disponible: true,
    imagen: "./img/conejitos.png",
    imagenAdicional: "./img/conejitos2.jpg",
  },
  {
    id: 4,
    nombre: "Don Erizo",
    cantidad: 8,
    precio: 2500,
    disponible: true,
    imagen: "./img/erizo.png",
    imagenAdicional: "./img/erizos.webp",
  },
  {
    id: 5,
    nombre: "Michis",
    cantidad: 10,
    precio: 1900,
    disponible: true,
    imagen: "./img/gatiti.jpg",
    imagenAdicional: "./img/michis.jfif",
  },
  {
    id: 6,
    nombre: "Panda",
    cantidad: 4,
    precio: 3200,
    disponible: true,
    imagen: "./img/pandita.jpg",
  },
  {
    id: 7,
    nombre: "Pato",
    cantidad: 3,
    precio: 2200,
    disponible: true,
    imagen: "./img/patito.png",
    imagenAdicional: "./img/patito2.png",
  },
  {
    id: 8,
    nombre: "Disfrazado",
    cantidad: 1,
    precio: 3100,
    disponible: true,
    imagen: "./img/peluche_disfraz2.png",
    imagenAdicional: "./img/disfrazado.webp",
  },
  {
    id: 9,
    nombre: "Picho",
    cantidad: 10,
    precio: 3500,
    disponible: true,
    imagen: "./img/perrito.png",
    imagenAdicional: "./img/perrito3.png",
  },
  {
    id: 10,
    nombre: "Stich",
    cantidad: 0,
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
    imagenAdicional: "./img/totoro2.png",
  },
  {
    id: 12,
    nombre: "Picho con pan",
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
  modal.classList.toggle("modal-active-buscar");
  let busco = e.target.value.toLowerCase();
  filtrados = stock.filter((p) => {
    let nombreProd = p.nombre.toLowerCase();
    return nombreProd.includes(busco);
  });
  x = false;
  crearTarjetas();
}

// 1º IF MUESTRA TARJETAS 2º MUESTRA FILTRADOS
function crearTarjetas(productos = stock) {
  if (x === true) {
    cards.innerHTML = "";
    stock.forEach((producto) => {
      const card = document.createElement("div");
      card.className = "card";
      if (producto.cantidad === 1) {
        mensaje = "Pocas Unidades";
      } else if (producto.cantidad === 0) {
        mensaje = "Agotado";
      } else {
        mensaje = "";
      }
      card.innerHTML += `
             <div class='mensaje'>${mensaje}</div>
             <img class='img animate__animated animate__fadeIn' src="${
               producto.imagen
             }" alt="" >
             <p class="titulos">${producto.nombre}</p>
             <div class="cards-info">
              <p>Cantidad: ${producto.cantidad}</p>
              <p>Precio: ${"$" + producto.precio}</p>
             </div>
             <button class='agregar' data-id="${
               producto.id
             }">AGREGAR AL CARRITO</button>
          `;
      // Cambia la imagen cuando le hacemos hover
      if (producto.imagenAdicional) {
        card.querySelector(".img").addEventListener("mouseover", () => {
          card
            .querySelector(".img")
            .setAttribute("src", producto.imagenAdicional);
        });
        card.querySelector(".img").addEventListener("mouseout", () => {
          card.querySelector(".img").setAttribute("src", producto.imagen);
        });
      }
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
             <img class='img animate__animated animate__fadeIn' src="${
               producto.imagen
             }" alt="" >
             <p class="titulos">${producto.nombre}</p>
             <div class="cards-info">
              <p>Cantidad: ${producto.cantidad}</p>
              <p>Precio: ${"$" + producto.precio}</p>
             </div>
             <button class='agregar' data-id="${
               producto.id
             }">AGREGAR AL CARRITO</button>
          `;
      // Cambia la imagen cuando le hacemos hover
      if (producto.imagenAdicional) {
        card.querySelector(".img").addEventListener("mouseover", () => {
          card
            .querySelector(".img")
            .setAttribute("src", producto.imagenAdicional);
        });
        card.querySelector(".img").addEventListener("mouseout", () => {
          card.querySelector(".img").setAttribute("src", producto.imagen);
        });
      }
      cards.appendChild(card);
      card.querySelector("button").addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        agregarAlCarrito(parseInt(id));
      });
    });
  }
}

//vaciar carro completo
vaciar.addEventListener("click", () => {
  carroCompra.length = 0;
  actualizarCarrito();
});

// CONFIRMAR COMPRA - ACTUALIZA STOCK -
confirmar.addEventListener("click", () => {
  carroCompra.forEach((prod) => {
    const producto = stock.find((p) => p.id === prod.id);
    producto.cantidad -= prod.cant;
    carroCompra.length = 0;
  });
  actualizarCarrito();
  crearTarjetas();
  
  // funciona pero no esta actualizando las cards, lo podemos ver en los clg de los dos arrays
});

// BUSCA POR ID EN EL STOCK Y LO MUESTRA EN EL CARRITO
function agregarAlCarrito(id) {
  const existe = carroCompra.some((producto) => producto.id === id);
  if (existe) {
    const prod = carroCompra.map((prod) => {
      if (prod.id === id && prod.cant < prod.cantidad) {
        prod.cant++;
        prod.precio = prod.precio * prod.cant;
      }
    });
  } else {
    const producto = stock.find((p) => p.id === id);
    carroCompra.push({ ...producto, cant: 1 });
  }
  actualizarCarrito();
}
// ELIMINA
function eliminarDelCarro(id) {
  const item = carroCompra.find((prod) => prod.id === id);
  const indice = carroCompra.indexOf(item);
  carroCompra.splice(indice, 1);
  actualizarCarrito();
}
// ACTUALIZA
function actualizarCarrito() {
  carrito.innerHTML = "";
  carroCompra.forEach((p) => {
    // imprimir
    const contenido = document.createElement("div");
    contenido.className = "contenido-carrito";
    contenido.innerHTML += `
           <img src="${p.imagen}" alt="" >
           <p class="titulos">${p.nombre} -</p>
           <div class="cards-info">
            <p>Cantidad: ${p.cant}</p>
            <p>Precio: ${"$" + p.precio}</p>
           </div>
           <button onclick="eliminarDelCarro(${
             p.id
           })" class="boton-eliminar"><img src="./img/basura.png"></button>
        `;
    carrito.appendChild(contenido);
  });
  localStorage.setItem("carroCompra", JSON.stringify(carroCompra));
  contadorCarrito.innerText = carroCompra.length;
  precioTotal.innerHTML = carroCompra.reduce(
    (acc, prod) => acc + prod.precio,
    0
  );
  console.log(carroCompra);
  console.log(stock);
}

//Abre y cierra el DIV del carrito de compras
abrir.addEventListener("click", (e) => {
  modal.classList.toggle("modal-active");
});
cerrar.addEventListener("click", () => {
  modal.classList.toggle("modal-active");
});

// Cambia la imagen cuando le hacemos hover

cambiaImg.addEventListener("focus", () => {
  cambiaImg.src = stock.producto.imagenAdicional;
});
