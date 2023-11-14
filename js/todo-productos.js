const ListItem = document.querySelectorAll("#landing-header li")
    const MenuBD = document.querySelector("#menu-bd")

    ListItem.forEach((item) =>{
        item.addEventListener("mouseenter", ()=> {
            const {left, top, width, height} = item.getBoundingClientRect()

            MenuBD.style.setProperty("--left", `${left}px`)
            MenuBD.style.setProperty("--top", `${top}px`)
            MenuBD.style.setProperty("--width", `${width}px`)
            MenuBD.style.setProperty("--height", `${height}px`)
            MenuBD.style.opacity ="1"
            MenuBD.style.visibility= "visible"
        })

        item.addEventListener("mouseleave", ()=> {
            MenuBD.style.opacity ="0"
            MenuBD.style.visibility= "hidden"
        })
    })


    document.addEventListener('DOMContentLoaded', function() {
        var openButton = document.querySelector('.open-button');
        var closeButton = document.querySelector('.close-button');
        var header = document.querySelector('#landing-header');
    
        if(openButton && closeButton && header) {
            openButton.addEventListener('click', function() {
                header.style.display = 'block';
            });
    
            closeButton.addEventListener('click', function() {
                header.style.display = 'none';
            });
        }
    });

    function ordenarProductos(productos, orden) {
        const productosOrdenados = [...productos];
        productosOrdenados.sort(function (a, b) {
            try {
                const nombreA = typeof a.nombre === 'string' ? a.nombre.toLowerCase() : '';
                const nombreB = typeof b.nombre === 'string' ? b.nombre.toLowerCase() : '';
                const comparacion = nombreA.localeCompare(nombreB);
                if (orden === "A-Z") {
                  return comparacion;
                }
                if (orden === "Z-A") {
                  return -comparacion;
                }
              } catch (error) {
                console.error(error);
              }
        });  
            return productosOrdenados;
    }
    
async function cargarProductos() {
        const response = await fetch('../data/productos.json');
        const data = await response.json();
        const cafes = data.cafes;
        const especialidades = data.especialidad;
        const combos = data.combos;
        const panaderia = data.panaderia;
      
        return { cafes, especialidades, combos, panaderia };
    }
    
    async function mostrarProductos(productos) {
        const template = document.querySelector("#cafe-card-template");
        const container = document.querySelector("#todo-productos");
    
        const fragment = document.createDocumentFragment();
    
        productos.forEach(producto => {
            const instance = template.content.cloneNode(true);
    
            instance.querySelector("#img-cafe").src = producto.imagen;
            instance.querySelector("#descripcion-cafe").textContent = producto.descripcion;
            instance.querySelector("#nombre-cafe").textContent = producto.nombre;
            instance.querySelector("#precio-cafe").textContent = `$${producto.precio}`;
    
            fragment.appendChild(instance);
        });
    
        container.innerHTML = '';
        container.appendChild(fragment);
    }
    
    
async function mainProductos() { 
        const selectOrdenar = document.querySelector("#ordenar-productos");
        const { cafes, especialidades, combos, panaderia } = await cargarProductos();
        let productos = [...cafes, ...especialidades, ...panaderia, ...combos];
        
        selectOrdenar.addEventListener("change", function () {
            const orden = selectOrdenar.value;
            let productosFiltrados = productos;
            if (orden === "Aleatorio") {
                productosFiltrados.sort(() => Math.random() - 0.5);
            } else if (orden === "Cafes") {
                productosFiltrados = cafes;
            } else if (orden === "Panaderia") {
                productosFiltrados = panaderia;
            } else if (orden === "Especialidades") {
                productosFiltrados = especialidades;
            } else if (orden === "Combos") {
                productosFiltrados = combos;
            } else {
                productosFiltrados = ordenarProductos(productos, orden);
            }
            mostrarProductos(productosFiltrados);
        });

        mostrarProductos(productos);
}
    

    

mainProductos();


    
      