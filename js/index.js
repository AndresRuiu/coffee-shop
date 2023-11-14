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
    

async function cargarProductosDestacados() {
    const response = await fetch('../data/productos.json');
    const data = await response.json();
    const cafes = data.cafes.filter(cafe => cafe.destacado);
    const especialidades = data.especialidad.filter(especialidad => especialidad.destacado);
  
    return { cafes, especialidades };
}

async function mostrarCafesYEspecialidadesDestacados() {
    const { cafes, especialidades } = await cargarProductosDestacados();
    const cafesYEspecialidades = [...cafes, ...especialidades];
    
      const template = document.querySelector("#cafe-card-template");
      const container = document.querySelector("#cafes-destacados");
    
      const fragment = document.createDocumentFragment();

    cafesYEspecialidades.forEach(item => {
        const instance = template.content.cloneNode(true);

        instance.querySelector("#img-cafe").src = item.imagen;
        instance.querySelector("#descripcion-cafe").textContent = item.descripcion;
        instance.querySelector("#nombre-cafe").textContent = item.nombre;
        instance.querySelector("#precio-cafe").textContent = `$${item.precio}`;

        fragment.appendChild(instance);
    });

    container.innerHTML = '';
    container.appendChild(fragment);

}
  
  
mostrarCafesYEspecialidadesDestacados();



const cafesDestacados = document.getElementById("cafes-destacados");
const scrollLeft = document.getElementById("scroll-left");
const scrollRight = document.getElementById("scroll-right");
  
scrollLeft.addEventListener("click", () => {
  cafesDestacados.scroll({
    left: cafesDestacados.scrollLeft - cafesDestacados.offsetWidth,
    behavior: "smooth",
  });
});

scrollRight.addEventListener("click", () => {
  cafesDestacados.scroll({
    left: cafesDestacados.scrollLeft + cafesDestacados.offsetWidth,
    behavior: "smooth",
  });
});