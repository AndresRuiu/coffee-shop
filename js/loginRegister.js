document.addEventListener("DOMContentLoaded", function () {
  var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  function registrarUsuario(nombre, email, contraseña) {
      var usuario = {
          nombre: nombre,
          email: email,
          contraseña: contraseña,
          tipo: "user",
      };
      usuarios.push(usuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  function validarUsuario(email, contraseña) {
      var usuarioValido = null;
      for (var i = 0; i < usuarios.length; i++) {
          if (usuarios[i].email === email && usuarios[i].contraseña === contraseña) {
              usuarioValido = usuarios[i];
              break;
          }
      }
      return usuarioValido;
  }

  function limpiarMensajes() {
      var mensajes = document.querySelectorAll(".login form div");
      mensajes.forEach((mensaje) => {
          mensaje.remove();
      });
  }

  // Registro de usuario
  document.getElementById("registroBoton").addEventListener("click", function () {
      limpiarMensajes();
      var nombre = document.getElementById("nombre").value;
      var email = document.getElementById("emailRegistro").value;
      var contraseña = document.getElementById("contraseñaRegistro").value;
      var confirmarContraseña = document.getElementById("confirmarContraseña").value;

      if (contraseña === confirmarContraseña) {
          registrarUsuario(nombre, email, contraseña);
          alert("Registro exitoso. Serás redirigido al inicio de sesión.");
          setTimeout(function () {
              window.location.href = "./login.html";
          }, 2000);
      } else {
          console.error("Error al tratar de registrarse");
      }
  });

  // Inicio de sesión
  document.getElementById("loginForm").addEventListener("submit", function (event) {
      event.preventDefault();

      limpiarMensajes();
      var email = document.getElementById("emailLogin").value;
      var contraseña = document.getElementById("contraseñaLogin").value;
      var usuarioValido = validarUsuario(email, contraseña);

      if (usuarioValido) {
        localStorage.setItem("usuarioActual", JSON.stringify(usuarioValido));
        console.log("Inicio de sesión exitoso. Usuario actual:", usuarioValido.nombre);
        alert("Inicio de sesión exitoso. Serás redirigido al index.html.");
        window.location.href = "../index.html";
    } else {
        localStorage.setItem("usuarioActual", null);
        console.log("Usuario o contraseña inválidos.");
        alert("Usuario o contraseña inválidos.");
    }
  });
});

var usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
var adminEncontrado = false;

for (var i = 0; i < usuariosGuardados.length; i++) {
  if (usuariosGuardados[i].nombre === "admin") {
      adminEncontrado = true;
      break;
  }
}

if (!adminEncontrado) {
  usuariosGuardados.push({
      nombre: "admin",
      email: "admin@example.com",
      contraseña: "admin123",
      tipo: "admin",
  });
}

localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
usuarios = usuariosGuardados;

for (var i = 0; i < usuarios.length; i++) {
  console.log(
      usuarios[i].nombre,
      usuarios[i].email,
      usuarios[i].contraseña,
      usuarios[i].tipo
  );
}

var usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
console.log("Usuario actual:", usuarioActual);