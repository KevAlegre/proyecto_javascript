let articulosCarrito = [];
const contenidoCarrito = document.querySelector("#lista-carrito tbody");
const listaProductos = document.querySelector("#lista-productos");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const carrito = document.querySelector("#cart");

//Limpia el primer elemento del array para que no se repita
function limpiarCarrito(){
    while(contenidoCarrito.firstChild){
        contenidoCarrito.removeChild(contenidoCarrito.firstChild);
    };
};

//Muestra el producto clickeado en el carrito
function mostrarEnCarrito(){
    limpiarCarrito();
    for(prod of articulosCarrito){
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${prod.imagen}"></td>
            <td>${prod.producto}</td>
            <td>${prod.precio}</td>
            <td>${prod.cantidad}</td>
            <td><a href="#" class="borrar-producto" data-id="${prod.id}">X</a></td>
        `;
        contenidoCarrito.appendChild(row);
    };
    sincronizarStorage();
};

//Guarda datos del producto clickeado
function guardarDatosProducto(prod){
    // console.log(prod.querySelector("button").getAttribute("data-id"));
    const datosProd = {
        imagen: prod.querySelector("img").src,
        producto: prod.querySelector("h4").textContent,
        precio: prod.querySelector(".precio").textContent,
        id: prod.querySelector("button").getAttribute("data-id"),
        cantidad: 1
    }

    //Detectar si el producto esta en el carrito para aumentar el valor de cantidad
    if(articulosCarrito.some(p => p.id === datosProd.id)){
        const producto = articulosCarrito.map(prod => {
            if(prod.id === datosProd.id){
                let cantidad = parseInt(prod.cantidad);
                cantidad += 1;
                prod.cantidad = cantidad;
                return prod;
            }else{
                return prod;
            };
        })
        articulosCarrito = [...producto]
    }else{
        articulosCarrito.push(datosProd)
    };
    mostrarEnCarrito();
};

//Agrega el producto al carro
function agregarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")){
        const prod = e.target.parentElement.parentElement;
        guardarDatosProducto(prod);
    };
};

//Elimina productos con la "X"
function eliminarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains("borrar-producto")){
        const prod = e.target.parentElement.parentElement;
        const prodId = prod.querySelector("a").getAttribute("data-id");
        articulosCarrito = articulosCarrito.filter(p => p.id !== prodId);
    };
    mostrarEnCarrito();
};

function sincronizarStorage(){
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
};

//Detecta evento
listaProductos.addEventListener("click", agregarProducto);
vaciarCarrito.addEventListener("click", limpiarCarrito);
carrito.addEventListener("click", eliminarProducto);
window.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
});