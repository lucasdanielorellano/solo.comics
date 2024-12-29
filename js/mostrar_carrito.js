document.addEventListener("DOMContentLoaded", () => {
    const tablaCarrito = document.getElementById("tablaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");

    // Obtener carrito de localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función para renderizar el carrito
    const renderizarCarrito = () => {
        // Limpiar tabla
        tablaCarrito.innerHTML = "";

        if (carrito.length === 0) {
            tablaCarrito.innerHTML = "<tr><td colspan='3'>El carrito está vacío.</td></tr>";
            totalCarrito.textContent = "0.00";
            return;
        }

        // Renderizar productos en la tabla
        carrito.forEach((producto, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>
                    <button class="btn btn-danger btn-sm" data-index="${index}">Eliminar</button>
                </td>
            `;
            tablaCarrito.appendChild(fila);
        });

        // Actualizar el total
        calcularTotal();
    };

    const calcularTotal = () => {
        const total = carrito.reduce((suma, producto) => suma + parseFloat(producto.precio), 0);
        totalCarrito.textContent = total.toFixed(2);
    };

    // Event listener para eliminar un producto
    tablaCarrito.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn-danger")) {
            const index = event.target.getAttribute("data-index");
            carrito.splice(index, 1); // Eliminar el producto del carrito
            localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar el carrito actualizado
            renderizarCarrito(); // Volver a renderizar el carrito
        }
    });

    // Event listener para vaciar el carrito
    const botonVaciarCarrito = document.querySelector(".btn-vaciar-carrito");
    if (botonVaciarCarrito) {
        botonVaciarCarrito.addEventListener("click", () => {
            // Vaciar el carrito (removerlo de localStorage)
            localStorage.removeItem("carrito");

            // Renderizar el carrito vacío
            renderizarCarrito();
        });
    }

    // Renderizar carrito al cargar la página
    renderizarCarrito();
});