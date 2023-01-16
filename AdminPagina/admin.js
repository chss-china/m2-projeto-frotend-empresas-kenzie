import {
  pega_usuarios,
  pega_as_compania,
  pega_delete_departamento,
  pega_delete_usuario,
  pega_departamento,
  pega_usuarios_compania,
  pega_usuarios_sem_trabalho,
  criar_departamento,
  editar_funcionarios,
  usuario_demitido,
  contratar_usuario,
  pega_edit_departamento,
} from "./adminApi.js";
let token = JSON.parse(localStorage.getItem("@KenzieCompany"));

export function criar_cards_departamentos(departments) {
  const li = document.createElement("li");
  const departamento_name = document.createElement("h4");
  const departamento_descricao = document.createElement("p");
  const compania = document.createElement("p");
  const div_botoes = document.createElement("div");
  const eye = document.createElement("img");
  const pen = document.createElement("img");
  const trash = document.createElement("img");

  departamento_name.innerText = departments.name;
  departamento_descricao.innerText = departments.description;
  compania.innerText = departments.companies.name;
  div_botoes.classList.add("div_botoes"); //buttons
  eye.src = "../assets/Vector eye.png";
  pen.src = "../assets/Vector2.png";
  pen.classList.add("pen");
  trash.src = "../assets/trash red 2.png";
  trash.classList.add("trash");

  eye.addEventListener("click", () => {
    modal_ver_departamento(departments);
  });

  pen.addEventListener("click", () => {
    modal_editar_departamento(departments);
    console.log(departments.uuid);
  });

  trash.addEventListener("click", () => {
    modal_remove_departamento(departments);
    console.log(departments.uuid);
  });
  div_botoes.append(eye, pen, trash);
  li.append(departamento_name, departamento_descricao, compania, div_botoes);

  return li;
}

export function renderiza_departamentos(objeto) {
  const ul = document.querySelector(".ul_departamento");
  const select = document.querySelector(".select");
  objeto.forEach((departments) => {
    if (select.value == "") {
      ul.appendChild(criar_cards_departamentos(departments));
    }
  });
  select.addEventListener("change", () => {
    ul.innerHTML = "";
    objeto.forEach((department) => {
      console.log(department.companies.name);
      if (select.value == department.companies.name) {
        ul.appendChild(criar_cards_departamentos(department));
      } else if (select.value == "") {
        ul.appendChild(criar_cards_departamentos(department));
      }
    });
  });
}

export async function renderiza_usuarios() {
  const objeto = await pega_usuarios(token);
  const objeto_compania = await pega_usuarios_compania(token);
  const ul = document.querySelector(".ul_usuarios");

  objeto.forEach((card) => {
    if (card.username !== "ADMIN") {
      const li = document.createElement("li");
      const username = document.createElement("h4");
      const level = document.createElement("p");
      const div_botoes = document.createElement("div");
      const compania = document.createElement("p");
      const pen = document.createElement("img");
      const trash = document.createElement("img");

      username.innerText = card.username;
      level.innerText =
        card.professional_level[0].toUpperCase() +
        card.professional_level.substr(1);
      div_botoes.classList.add("botoes_usuarios");
      pen.src = "../assets/Vector2.png";
      pen.classList.add("pen");
      trash.src = "../assets/trash red 2.png";
      trash.classList.add("trash");

      pen.addEventListener("click", () => {
        modal_editar_usuario(card);
      });
      trash.addEventListener("click", () => {
        modal_remove_usuario(card);
      });
      if (card.department_uuid !== null) {
        objeto_compania.forEach((companyNew) => {
          if (card.department_uuid == companyNew.uuid) {
            compania.innerText = companyNew.companies.name;
          }
        });
      }

      div_botoes.append(pen, trash);
      li.append(username, level, compania, div_botoes);
      ul.appendChild(li);
    }
  });
  return ul;
}
renderiza_usuarios();

function logout() {
  const botao_sair = document.querySelector(".botao_sair");
  botao_sair.addEventListener("click", () => {
    localStorage.clear("@KenzieCompany");
    window.location.replace("../Login/login.html");
  });
}
logout();

export function seleciona_compania(objeto) {
  let select = document.querySelector(".select");
  objeto.forEach((compania) => {
    select.insertAdjacentHTML(
      "beforeend",
      `
        <option value="${compania.name}">${compania.name}</option>
    `
    );
  });
}

export async function modal_criar_departamento() {
  const compania = await pega_as_compania();
  const modaldiv = document.querySelector(".modaldiv");
  modaldiv.classList.remove("hidden");

  const modal = document.createElement("div");
  const div_titulo = document.createElement("div");
  const titulo = document.createElement("h3");
  const botao_fechar = document.createElement("button");
  const inputName = document.createElement("input");
  const descricao = document.createElement("input");
  const select = document.createElement("select");
  const option = document.createElement("option");
  const botao_criar = document.createElement("button");

  modal.classList.add("modal");
  titulo.innerText = "Criar Departamento";
  botao_fechar.classList.add("botao_fechar_modal");
  botao_fechar.innerText = "X";
  inputName.classList.add("nome_departamento");
  inputName.placeholder = "Nome do departamento";
  descricao.classList.add("descricao_departamento");
  descricao.placeholder = "Descrição";
  botao_criar.classList.add("botao_modal_criar_deparamento");
  botao_criar.innerText = "Criar o departamento";
  select.classList.add("select-modal");
  option.value = "";
  option.innerText = "Selecionar Empresa";

  select.appendChild(option);
  compania.forEach((company) => {
    option.insertAdjacentHTML(
      "afterend",
      `
        <option value="${company.uuid}">${company.name}</option>
    `
    );
  });
  botao_fechar.addEventListener("click", () => {
    modaldiv.classList.add("hidden");
    window.location.reload();
  });
  botao_criar.addEventListener("click", async () => {
    await criar_departamento(
      token,
      inputName.value,
      descricao.value,
      select.value
    );
    modaldiv.classList.add("hidden");
    window.location.reload();
  });

  div_titulo.append(titulo, botao_fechar);
  modal.append(div_titulo, inputName, descricao, select, botao_criar);
  modaldiv.appendChild(modal);
}


function abrir_modal_criar_departamento() {
  const botao_criar = document.querySelector(".butao_criar_departamento");
  botao_criar.addEventListener("click", () => {
    modal_criar_departamento();
  });
}
abrir_modal_criar_departamento();

export async function modal_editar_departamento(departments) {
  const modaldiv = document.querySelector(".modaldiv");
  const pen = document.querySelector(".pen_departamento");
  modaldiv.classList.remove("hidden");
  const modal = document.createElement("div");
  const div_titulo = document.createElement("div");
  const titulo = document.createElement("h3");
  const botao_fechar = document.createElement("button");
  const descricao = document.createElement("textarea");
  const botao_salvar = document.createElement("button");

  modal.classList.add("modal");
  modal.classList.add("modal-edit");
  titulo.innerText = "Editar Departamento";
  botao_fechar.classList.add("botao_fechar_modal");
  botao_fechar.innerText = "X";
  descricao.classList.add("descricao_departamento_edit");
  descricao.value = departments.description;
  botao_salvar.classList.add("botao_modal_salvar_departamento");
  botao_salvar.innerText = "Salvar alterações";

  botao_fechar.addEventListener("click", () => {
    modaldiv.classList.add("hidden");
    window.location.reload();
  });
  botao_salvar.addEventListener("click", async () => {
    await pega_edit_departamento(token, departments.uuid, descricao.value);
    modaldiv.classList.add("hidden");
    window.location.reload();
  });

  div_titulo.append(titulo, botao_fechar);
  modal.append(div_titulo, descricao, botao_salvar);
  modaldiv.appendChild(modal);
}

async function modal_remove_departamento(department) {
  const modaldiv = document.querySelector(".modaldiv");
  modaldiv.classList.remove("hidden");
  const modal = document.createElement("div");
  const div_titulo = document.createElement("div");
  const titulo = document.createElement("h3");
  const botao_fechar = document.createElement("button");
  const botao_salvar = document.createElement("button");

  modal.classList.add("modal");
  modal.classList.add("modal_remove_departamento");
  titulo.innerText = `Realmente deseja deletar o Departamento ${department.name} demitir seus funcionários?`;
  botao_fechar.classList.add("botao_fechar_modal");
  botao_fechar.innerText = "X";
  botao_salvar.classList.add("botao_modal_remove_departamento");
  botao_salvar.innerText = "Confirmar";

  buttonClose.addEventListener("click", () => {
    modaldiv.classList.add("hidden");
    window.location.reload();
  });
  botao_salvar.addEventListener("click", async () => {
    await pega_delete_departamento(token, department.uuid);
    modaldiv.classList.add("hidden");
    window.location.reload();
  });
  div_titulo.append(titulo, botao_fechar);
  modal.append(div_titulo, botao_salvar);
  modaldiv.appendChild(modal);
}

export async function modal_ver_departamento(departments) {
  const usuarios = await pega_usuarios_sem_trabalho(token);
  const usuarios_departamento = await pega_usuarios(token);

  const modaldiv = document.querySelector(".modaldiv");
  modaldiv.classList.remove("hidden");
  const modal = document.createElement("div");
  const nome_departamento = document.createElement("h3");
  const botao_fechar = document.createElement("button");
  const divContainer = document.createElement("div");
  const divInfos = document.createElement("div");
  const descricao = document.createElement("h4");
  const company = document.createElement("p");
  const divSelect = document.createElement("div");
  const select = document.createElement("select");
  const option = document.createElement("option");
  const botao_contratar = document.createElement("button");
  const ul = document.createElement("ul");

  modal.classList.add("modal");
  modal.classList.add("modal_ver");
  nome_departamento.innerText = departments.name;
  botao_fechar.classList.add("botao_fechar");
  botao_fechar.innerText = "X";
  divInfos.classList.add("div-infos");
  descricao.innerText = departments.description;
  company.innerText = departments.companies.name;
  divSelect.classList.add("div-select-modal");
  botao_contratar.innerText = "Confirmar";
  botao_contratar.classList.add("botao_contratar");
  select.classList.add("select_modal_ver");
  option.value = "";
  option.innerText = "Selecionar Usuário";
  select.appendChild(option);

  let idUser = "";
  usuarios.forEach((user) => {
    option.insertAdjacentHTML(
      "afterend",
      `
        <option value="${user.uuid}">${user.username}</option>`
    );
  });
  select.addEventListener("change", (event) => {
    idUser = event.target.value;
  });
  botao_contratar.addEventListener("click", async () => {
    await contratar_usuario(token, idUser, departments.uuid);
    window.location.reload();
  });

  usuarios_departamento.forEach((userDepartment) => {
    if (departments.uuid === userDepartment.department_uuid) {
      const li = document.createElement("li");
      li.insertAdjacentHTML(
        "beforeend",
        `<h4>${userDepartment.username}</h4>
            <p>${
              userDepartment.professional_level[0].toUpperCase() +
              userDepartment.professional_level.substr(1)
            }</p>
            <p>${departments.companies.name}</p>`
      );
      const botao_fire = document.createElement("button");
      botao_fire.innerText = "Desligar";
      li.appendChild(botao_fire);
      ul.appendChild(li);
      botao_fire.addEventListener("click", async () => {
        await usuario_demitido(token, userDepartment.uuid);
        window.location.reload();
      });
    }
  });
  botao_fechar.addEventListener("click", () => {
    modaldiv.classList.add("hidden");
    window.location.reload();
  });
  divInfos.append(descricao, company);
  divSelect.append(select, botao_contratar);
  divContainer.append(divInfos, divSelect);
  modal.append(nome_departamento, botao_fechar, divContainer, ul);
  modaldiv.appendChild(modal);
}

function modal_editar_usuario(user) {
  const modaldiv = document.querySelector(".modaldiv");
  const pen = document.querySelector(".pen_departamento");
  const modal = document.createElement("div");
  const div_titulo = document.createElement("div");
  const titulo = document.createElement("h3");
  const botao_fechar = document.createElement("button");
  const seleciona_modalidade = document.createElement("select");
  const option_modalidade = document.createElement("option");
  const selectLevel = document.createElement("select");
  const optionLevel = document.createElement("option");
  const botao_salvar = document.createElement("button");

  modal.classList.add("modal");
  modal.classList.add("modal-edit");
  titulo.innerText = "Editar Usuário";
  botao_fechar.classList.add("botao_fechar_modal");
  botao_fechar.innerText = "X";
  botao_salvar.classList.add("botao_modal_editar_usuario");
  botao_salvar.innerText = "Editar";
  seleciona_modalidade.classList.add("select-modal");
  option_modalidade.value = "";
  option_modalidade.innerText = "Selecionar modalidade de trabalho";
  seleciona_modalidade.appendChild(option_modalidade);
  option_modalidade.insertAdjacentHTML(
    "afterend",
    `
        <option value="presencial">Presencial</option>
        <option value="hibrido">Híbrido</option>
        <option value="home office">Home office</option>
    `
  );
  selectLevel.classList.add("select-modal");
  optionLevel.value = "";
  optionLevel.innerText = "Selecionar nível profissional";
  selectLevel.appendChild(optionLevel);
  optionLevel.insertAdjacentHTML(
    "afterend",
    `
        <option value="estágio">Estágio</option>
        <option value="júnior">Júnior</option>
        <option value="pleno">Pleno</option>
        <option value="sênior">Sênior</option>
    `
  );

  botao_fechar.addEventListener("click", () => {
    modaldiv.classList.add("hidden");
    window.location.reload();
  });
  botao_salvar.addEventListener("click", async () => {
    await editar_funcionarios(
      token,
      seleciona_modalidade.value,
      selectLevel.value,
      user.uuid
    );
    window.location.reload();
  });

  div_titulo.append(titulo, botao_fechar);
  modal.append(div_titulo, seleciona_modalidade, selectLevel, botao_salvar);
  modaldiv.appendChild(modal);
  modaldiv.classList.remove("hidden");
}

async function modal_remove_usuario(user) {
  const modaldiv = document.querySelector(".modaldiv");
  modaldiv.classList.remove("hidden");
  const modal = document.createElement("div");
  const div_titulo = document.createElement("div");
  const titulo = document.createElement("h3");
  const botao_fechar = document.createElement("button");
  const botao_salvar = document.createElement("button");

  modal.classList.add("modal");
  modal.classList.add("modal_remove_departamento");
  titulo.innerText = `Realmente deseja remover o usuário ${user.username}?`;
  botao_fechar.classList.add("botao_fechar_modal");
  botao_fechar.innerText = "X";
  botao_salvar.classList.add("botao_modal_remove_departamento");
  botao_salvar.innerText = "Confirmar";

  botao_fechar.addEventListener("click", () => {
    modaldiv.classList.add("hidden");
    window.location.reload();
  });
  botao_salvar.addEventListener("click", async () => {
    await pega_delete_usuario(token, user.uuid);
    modaldiv.classList.add("hidden");
    window.location.reload();
  });

  div_titulo.append(titulo, botao_fechar);
  modal.append(div_titulo, botao_salvar);
  modaldiv.appendChild(modal);
}
