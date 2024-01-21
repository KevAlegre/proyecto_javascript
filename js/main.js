    //===VARIABLES===
let articulosCarrito = [];
//const tbody = document.querySelector("tbody");
const contenidoCarrito = document.querySelector("tbody");
const listaProductos = document.querySelector("#lista-productos");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const carrito = document.querySelector("#cart");
const comprar = document.querySelector("#btn-comprar");

    //===LIBRERÍA===
//Usé la librería de Toastify
comprar.addEventListener("click", () => {
    if(articulosCarrito.length === 0) {
        Toastify({
            text: "Porfavor, agregue productos al carrito para continuar.",
            position: "center",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    } else {
        Toastify({
            text: "¡Compra realizada con éxito!",
            position: "center",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    }
});

    //===FETCH===
fetch("instrumentos.json")
    .then((res) => res.json())
    .then((cont) => render(cont))
    .catch(() => {
        Toastify({
            name: "Ha ocurrido un error con el Fetch",
            gravity: "bottom"
        }).showToast();
    });

    //===FUNCIONES===
//Mostrar los productos
function render( {instrumentos} ) {
    for(item of instrumentos) {
        const {instrumento: producto, categoria, precio, descripcion, imagen, id} = item
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="row m-4 tarjeta">
                <div class="col-2">
                    <img class="w-100" src="${imagen}">
                </div>
                <div class="col-10">
                    <h4 class="mt-2">${producto}</h4>
                    <p class="m-0">Categoría: <span>${categoria}</span></p>
                    <p class="m-0">${descripcion}</p>
                    <p class="m-0">Precio: <span class="precio">${precio}</span> U$D</p>
                    <button class="mb-3 agregar-carrito" data-id="${id}">Agregar al carrito</button>
                </div>
            </div>
        `
        listaProductos.appendChild(card);
    }
}

//Agrega el producto al carro
function agregarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")) {
        const prod = e.target.parentElement.parentElement;
        guardarDatosProducto(prod);
    };
};

//Guarda datos del producto clickeado
function guardarDatosProducto(prod) {
    const datosProd = {
        imagen: prod.querySelector("img").src,
        producto: prod.querySelector("h4").textContent,
        precio: prod.querySelector(".precio").textContent,
        id: prod.querySelector("button").getAttribute("data-id"),
        cantidad: 1
    };

    //Detectar si el producto esta en el carrito para aumentar el valor de cantidad
    if(articulosCarrito.some(p => p.id === datosProd.id)) {
        const producto = articulosCarrito.map(prod => {
            if(prod.id === datosProd.id) {
                let cantidad = parseInt(prod.cantidad);
                cantidad += 1;
                prod.cantidad = cantidad;
                return prod;
            } else {
                return prod;
            };
        });
        articulosCarrito = [...producto]
    } else {
        articulosCarrito = [...articulosCarrito, datosProd]
    };
    mostrarEnCarrito();
};

//Muestra el producto clickeado en el carrito
function mostrarEnCarrito(){
    limpiarCarrito();
    for(prod of articulosCarrito){
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${prod.imagen}"></td>
            <td>${prod.producto}</td>
            <td class"precioProd">${prod.precio}</td>
            <td class="cantidad">${prod.cantidad}</td>
            <td><a href="#" class="borrar-producto" data-id="${prod.id}">X</a></td>
        `;
        contenidoCarrito.appendChild(row);
    };
    sincronizarStorage();
};

//Limpia el primer elemento del array para que no se repita
function limpiarCarrito(){
    while(contenidoCarrito.firstChild){
        contenidoCarrito.removeChild(contenidoCarrito.firstChild);
    };
};

//Elimina productos con la "X"
function eliminarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains("borrar-producto")){       
        const prod = e.target.parentElement.parentElement;
        const prodId = prod.querySelector("a").getAttribute("data-id");
        const datoProd = prod.querySelector(".cantidad").textContent;

        //Detecta si la cantidad es mayor a 1 para restarle 1
        if(datoProd > 1) {
            const producto = articulosCarrito.map(prod => {
                if(prod.id === prodId) {
                    let cantidad = parseInt(prod.cantidad);
                    cantidad -= 1;
                    prod.cantidad = cantidad;
                    return prod;
                } else {
                    return prod;
                }
            });
            articulosCarrito = [...producto]
        } else {
            articulosCarrito = articulosCarrito.filter(p => p.id !== prodId);
        }
    };
    mostrarEnCarrito();
};

//Vacía el carrito con el botón "Vaciar carrito"
function vaciarElCarrito(e) {
    if(e.target.id === vaciarCarrito.id) {
        articulosCarrito = [];
        mostrarEnCarrito();
    }
}

    //===LOCALSTORAGE===

function sincronizarStorage(){
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
};

    //===EVENTOS===

listaProductos.addEventListener("click", agregarProducto);
vaciarCarrito.addEventListener("click", vaciarElCarrito);
carrito.addEventListener("click", eliminarProducto);
window.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    mostrarEnCarrito()
});