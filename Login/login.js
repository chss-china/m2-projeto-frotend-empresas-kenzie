import { login } from "./loginApi.js";

function abrir_mobile_nav() {
  const botao_abrir = document.querySelector(".button-nav-open");
  const nav = document.querySelector("nav");
  botao_abrir.addEventListener("click", () => {
    nav.classList.toggle("hidden");
  });
}
abrir_mobile_nav();

login();

export function toast(resposta_atual) {
  const div_retorno = document.querySelector(".div-return");
  const mensagem = document.createElement("p");

  if (resposta_atual.error) {
    mensagem.innerText = resposta_atual.error;
    div_retorno.classList.add("div-erro");
  }
  div_retorno.appendChild(mensagem);
  div_retorno.classList.remove("hidden");
}
