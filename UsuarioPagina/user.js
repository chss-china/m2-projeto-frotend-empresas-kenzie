import { pega_compania, pega_funcionarios, pega_usuario } from "./userApi.js";
let token = JSON.parse(localStorage.getItem("@KenzieCompany"));

export function renderiza_info_perfil(objeto) {
  const modal = document.querySelector(".modaldiv");
  const fechar = document.querySelector(".botao_fechar_modal");
  const div_infos = document.querySelector(".info_usuario");
  const name = document.createElement("h3");
  const div = document.createElement("div");
  const email = document.createElement("p");
  const level = document.createElement("p");
  const homeOffice = document.createElement("p");
  const vector_img = document.createElement("img");

  name.innerText = objeto.username;
  name.id = objeto.username;
  name.classList.add("nome_usuario");
  email.innerText = objeto.email;
  level.innerText = objeto.professional_level;
  homeOffice.innerText = objeto.kind_of_work;
  vector_img.src = "../assets/Vector2.png";
  vector_img.classList.add("vector_img");

  vector_img.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });
  fechar.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  div.append(email, level, homeOffice);
  div_infos.append(name, div, vector_img);
  return div_infos;
}

function logout() {
  const botao_sair = document.querySelector(".botao_sair");
  botao_sair.addEventListener("click", () => {
    localStorage.clear("@KenzieCompany");
    window.location.replace("../Login/login.html");
  });
}
logout();

export async function renderiza_compania_funcionarios() {
  const objeto = await pega_funcionarios(token);
  const compania_objeto = await pega_compania(token);
  const div_container = document.querySelector(".div_compania_usuario");
  let nameUser = document.querySelector(".nome_usuario");
  const compania_name = document.createElement("h3");
  const departamento = document.createElement("h3");
  const div_compania_departamento = document.createElement("div");
  div_compania_departamento.classList;
  const ul = document.createElement("ul");
  const objeto_novo = objeto.users;
  compania_name.innerText = compania_objeto;
  departamento.innerText = "- " + objeto.name;
  div_compania_departamento.append(compania_name, departamento);

  objeto_novo.forEach((funcionarios) => {
    const li = document.createElement("li");
    const funcionarios_name = document.createElement("h4");
    const funcionarios_level = document.createElement("p");
    ul.classList.add("lista_funcionarios");
    funcionarios_name.classList.add("funcionarios_name");
    funcionarios_name.innerText = funcionarios.username;
    funcionarios_level.classList.add("funcionarios_level");
    funcionarios_level.innerText =
      funcionarios.professional_level[0].toUpperCase() +
      funcionarios.professional_level.substr(1);
    li.append(funcionarios_name, funcionarios_level);

    if (funcionarios.username !== nameUser.id) {
      ul.appendChild(li);
    }
  });
  div_container.append(div_compania_departamento, ul);
  return div_container;
}
renderiza_compania_funcionarios();
