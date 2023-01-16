import { toast } from "./login.js";

//let token = JSON.parse(localStorage.getItem("@KenzieCompany"))
async function selecionar_tipo_usuario(token) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const resposta_requisicao = await fetch(
    "http://localhost:6278/auth/validate_user",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.is_admin) {
        window.location.replace("../AdminPagina/admin.html");
      } else {
        window.location.replace("../UsuarioPagina/user.html");
      }
    });
}

export function login() {
  const botao_acessar = document.querySelector(".botao_login");
  let inputEmail = document.getElementById("email");
  let inputPassword = document.getElementById("password");

  botao_acessar.addEventListener("click", async (event) => {
    event.preventDefault();
    const data = {
      email: inputEmail.value,
      password: inputPassword.value,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const resposta_json = await fetch(
      `http://localhost:6278/auth/login`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          selecionar_tipo_usuario(response.token);
          localStorage.setItem(
            "@KenzieCompany",
            JSON.stringify(response.token)
          );
        } else {
          toast(response);
          console.log(response);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });
    return resposta_json;
  });
}
