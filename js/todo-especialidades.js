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

    function ordenarespecialidades(especialidades, orden) {
        especialidades.sort(function (a, b) {
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
            return especialidades;
    }
    
    async function cargarEspecialidades() {
        const response = await fetch('../data/productos.json');
        const data = await response.json();
        return data.especialidad;
    }
    
    async function mostrarEspecialidades(especialidades) {
        const template = document.querySelector("#cafe-card-template");
        const container = document.querySelector("#todo-especialidades");
      
        const fragment = document.createDocumentFragment();
      
        especialidades.forEach(especialidad => {
          const instance = template.content.cloneNode(true);
      
          instance.querySelector("#img-cafe").src = especialidad.imagen;
          instance.querySelector("#descripcion-cafe").textContent = especialidad.descripcion;
          instance.querySelector("#nombre-cafe").textContent = especialidad.nombre;
          instance.querySelector("#precio-cafe").textContent = `$${especialidad.precio}`;
      
          fragment.appendChild(instance);
        });
      
        container.innerHTML = ''
        container.appendChild(fragment);
    }
    
    async function mainEspecialidades() { 
        const selectOrdenar = document.querySelector("#ordenar-especialidades");
        let especialidades = await cargarEspecialidades(); 
        mostrarEspecialidades(especialidades);
        selectOrdenar.addEventListener("change", function () {
            const orden = selectOrdenar.value;
            if (orden === "Aleatorio") {
                especialidades.sort(() => Math.random() - 0.5);
            } else {
                especialidades = ordenarespecialidades(especialidades, orden);
            }
            mostrarEspecialidades(especialidades);
        });
    }
          
    mainEspecialidades();
    
      