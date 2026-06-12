const botones = document.querySelectorAll(".btn-agregar");
const listaCarrito = document.querySelector("#lista-carrito");
const total = document.querySelector("#total");
const badge = document.querySelector("#badge");
const btnVaciar = document.querySelector("#btn-vaciar");

let totalAcumulado = 0;
let cantidadItems = 0;

// Actualizar badge
function updateBadge() {
    badge.textContent = cantidadItems;
}
// Actualizar total
function updateTotal() {
    total.textContent =
        "$" +
        totalAcumulado.toLocaleString(
            "es-CO",
            { minimumFractionDigits: 0 }
        );
}
function eliminarItem(li, precio) {
    li.remove();
    totalAcumulado -= precio;
    cantidadItems--;
    updateTotal();
    updateBadge();
}
function agregarAlCarrito(nombre, precio) {
    const li = document.createElement("li");
    li.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
    );
    li.innerHTML = `
        <span>${nombre} - $${precio.toLocaleString("es-CO")}</span>
        <button class="btn btn-danger btn-sm btn-eliminar">
            X
        </button>
    `;
    listaCarrito.appendChild(li);
    totalAcumulado += precio;
    cantidadItems++;
    updateTotal();
    updateBadge();
    const btnEliminar = li.querySelector(".btn-eliminar");
    btnEliminar.addEventListener("click", () => {
        eliminarItem(li, precio);
    });
}
botones.forEach((boton) => {
    boton.addEventListener("click", () => {
        const nombre = boton.dataset.nombre;
        const precio = Number(boton.dataset.precio);
        agregarAlCarrito(nombre, precio);
    });
});
btnVaciar.addEventListener("click", () => {
    listaCarrito.innerHTML = "";
    totalAcumulado = 0;
    cantidadItems = 0;
    updateTotal();
    updateBadge();
});
updateTotal();
updateBadge();