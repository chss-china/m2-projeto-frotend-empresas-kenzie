import { catch_compania } from "./homeApi.js";

function abrir_mobile_nav() {
  const botao_abrir = document.querySelector(".button-nav-open");
  const nav = document.querySelector("nav");
  botao_abrir.addEventListener("click", () => {
    nav.classList.toggle("hidden");
  });
}
abrir_mobile_nav();

function criar_compania(objeto) {
  const li = document.createElement("li");
  const tag_name = document.createElement("h3");
  const tag_tempo = document.createElement("p");
  const tag_setor = document.createElement("span");

  tag_name.classList.add("nome_compania");
  tag_name.innerText = objeto.name;

  tag_tempo.classList.add("time_compania");
  if (objeto.opening_hours[0] > 0) {
    tag_tempo.innerText = objeto.opening_hours.substring(0, 2) + " horas";
  } else {
    tag_tempo.innerText = objeto.opening_hours.substring(1, 2) + " horas";
  }

  tag_setor.classList.add("setor_compania");
  tag_setor.innerText = objeto.sectors.description;

  li.append(tag_name, tag_tempo, tag_setor);
  return li;
}

export function renderiza_compania(array) {
  const ul = document.querySelector("ul");
  const select = document.querySelector(".select");
  array.forEach((card) => {
    if (select.value == "") {
      ul.appendChild(criar_compania(card));
    }
  });
  select.addEventListener("change", () => {
    ul.innerHTML = "";
    array.forEach((card) => {
      if (select.value == card.sectors.description) {
        ul.appendChild(criar_compania(card));
      } else if (select.value == "") {
        ul.appendChild(criar_compania(card));
      }
    });
  });
}

export function seleciona_setor(objeto) {
  let select = document.querySelector(".select");
  objeto.forEach((setor) => {
    select.insertAdjacentHTML(
      "beforeend",
      `
        <option value="${setor.description}">${setor.description}</option>
    `
    );
  });
}
