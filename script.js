let carrito = [];

        function agregarAlCarrito(nombreProducto, precioProducto, imagenProducto) {
            const productoExistente = carrito.find(producto => producto.nombre === nombreProducto);

            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                const nuevoProducto = {
                    nombre: nombreProducto,
                    precio: precioProducto,
                    imagen: imagenProducto,
                    cantidad: 1
                };
                carrito.push(nuevoProducto);
            }
            actualizarCarrito();
        }

        function eliminarProducto(nombreProducto) {
            carrito = carrito.filter(producto => producto.nombre !== nombreProducto);
            actualizarCarrito();
        }

        function cambiarCantidad(nombreProducto, nuevaCantidad) {
            const producto = carrito.find(producto => producto.nombre === nombreProducto);
            if (producto) {
                producto.cantidad = nuevaCantidad;
                if (producto.cantidad <= 0) {
                    eliminarProducto(nombreProducto);
                }
            }
            actualizarCarrito();
        }

        function actualizarCarrito() {
            const carritoItems = document.getElementById('carrito-items');
            carritoItems.innerHTML = '';

            let total = 0;
            let contador = 0;

            carrito.forEach(producto => {
                const itemCarrito = document.createElement('div');
                itemCarrito.classList.add('carrito-item');

                itemCarrito.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div>
                        <p>${producto.nombre}</p>
                        <p>${producto.precio} * ${producto.cantidad}</p>
                    </div>
                    <div>
                        <input type="number" value="${producto.cantidad}" min="1" onchange="cambiarCantidad('${producto.nombre}', this.value)">
                        <button onclick="eliminarProducto('${producto.nombre}')">Eliminar</button>
                    </div>
                `;

                carritoItems.appendChild(itemCarrito);
                total += producto.precio * producto.cantidad;
                contador += producto.cantidad;
            });

            document.getElementById('total-carrito').innerText = total.toLocaleString();
            document.getElementById('contador-carrito').innerText = contador;
        }

        function toggleCarrito() {
            const carritoDiv = document.getElementById('carrito');
            carritoDiv.classList.toggle('visible');
        }

        document.getElementById('vaciar-carrito').addEventListener('click', () => {
            carrito = [];
            actualizarCarrito();
        });

        document.querySelectorAll('.boton-agregar').forEach(boton => {
            boton.addEventListener('click', (e) => {
                const productoElement = e.target.parentElement;
                const nombreProducto = productoElement.querySelector('h3').innerText;
                const precioProducto = parseInt(productoElement.querySelector('p').innerText.split('*')[0].replace('.', ''));
                const imagenProducto = productoElement.querySelector('img').src;

                agregarAlCarrito(nombreProducto, precioProducto, imagenProducto);
            });
        });