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

    function ordenarcafes(cafes, orden) {
        cafes.sort(function (a, b) {
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
            return cafes;
    }
    
    async function cargarCafes() {
        const response = await fetch('../data/productos.json');
        const data = await response.json();
        return data.cafes;
    }
    
    async function mostrarCafes(cafes) {
        const template = document.querySelector("#cafe-card-template");
        const container = document.querySelector("#todo-cafes");
      
        const fragment = document.createDocumentFragment();
      
        cafes.forEach(cafe => {
          const instance = template.content.cloneNode(true);
      
          instance.querySelector("#img-cafe").src = cafe.imagen;
          instance.querySelector("#descripcion-cafe").textContent = cafe.descripcion;
          instance.querySelector("#nombre-cafe").textContent = cafe.nombre;
          instance.querySelector("#precio-cafe").textContent = `$${cafe.precio}`;
      
          fragment.appendChild(instance);
        });
      
        container.innerHTML = ''
        container.appendChild(fragment);
    }
    
    async function mainCafes() { 
        const selectOrdenar = document.querySelector("#ordenar-cafes");
        let cafes = await cargarCafes(); 
        mostrarCafes(cafes);
        selectOrdenar.addEventListener("change", function () {
            const orden = selectOrdenar.value;
            if (orden === "Aleatorio") {
                cafes.sort(() => Math.random() - 0.5);
            } else {
                cafes = ordenarcafes(cafes, orden);
            }
            mostrarCafes(cafes);
        });
    }
          
    mainCafes();
    
      