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

    function ordenarPanaderia(panaderia, orden) {
        panaderia.sort(function (a, b) {
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
            return panaderia;
    }
    
    async function cargarPanaderia() {
        const response = await fetch('../data/productos.json');
        const data = await response.json();
        return data.panaderia;
    }
    
    async function mostrarPanaderia(panaderia) {
        const template = document.querySelector("#cafe-card-template");
        const container = document.querySelector("#todo-panaderia");
      
        const fragment = document.createDocumentFragment();
      
        panaderia.forEach(pan => {
          const instance = template.content.cloneNode(true);
      
          instance.querySelector("#img-cafe").src = pan.imagen;
          instance.querySelector("#descripcion-cafe").textContent = pan.descripcion;
          instance.querySelector("#nombre-cafe").textContent = pan.nombre;
          instance.querySelector("#precio-cafe").textContent = `$${pan.precio}`;
      
          fragment.appendChild(instance);
        });
      
        container.innerHTML = ''
        container.appendChild(fragment);
    }
    
    async function mainPanaderia() { 
        const selectOrdenar = document.querySelector("#ordenar-panaderia");
        let panaderia = await cargarPanaderia(); 
        mostrarPanaderia(panaderia);
        selectOrdenar.addEventListener("change", function () {
            const orden = selectOrdenar.value;
            if (orden === "Aleatorio") {
                panaderia.sort(() => Math.random() - 0.5);
            } else {
                panaderia = ordenarPanaderia(panaderia, orden);
            }
            mostrarPanaderia(panaderia);
        });
    }
          
mainPanaderia();
    
      