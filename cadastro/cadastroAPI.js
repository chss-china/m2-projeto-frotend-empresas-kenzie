import { toast } from "./cadastro.js";

export function registrar_usuario() {
  const botao_registrar = document.querySelector(".botao_enviar");
  const div_retorno = document.querySelector(".div-return");
  const div_sucesso = document.querySelector(".div-sucess");
  let input_usuario = document.getElementById("username");
  let input_email = document.getElementById("email");
  let input_senha = document.getElementById("password");
  let select = document.querySelector(".select");

  botao_registrar.addEventListener("click", async (event) => {
    event.preventDefault();
    const data = {
      username: input_usuario.value,
      password: input_senha.value,
      email: input_email.value,
      professional_level: select.value,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const resposta_requisicao = await fetch(
      "http://localhost:6278/auth/register",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.error);
        if (!response.error) {
          toast(response);
          setTimeout(() => {
            window.location.replace("../Login/login.html");
          }, 3000);
        } else {
          toast(response);
          setTimeout(() => {
            window.location.reload();
          }, 2500);
        }
      });
  });
}

registrar_usuario();
