import {
  renderiza_compania_funcionarios,
  renderiza_info_perfil,
} from "./user.js";
let token = JSON.parse(localStorage.getItem("@KenzieCompany"));

let isAdmin = await tipo_usuario(token);
if (!token || isAdmin === true) {
  window.location.replace("../Login/login.html");
}

async function tipo_usuario(token) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const reposta_json = await fetch(
    "http://localhost:6278/auth/validate_user",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      return response.is_admin;
    });

  return reposta_json;
}

export async function pega_usuario(token) {
  const div_sem_trabalho = document.querySelector(".div_sem_trabalho");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const responsta_json = await fetch(
    "http://localhost:6278/users/profile",
    options
  );
  const resposta = await responsta_json.json();
  renderiza_info_perfil(resposta);
  if (resposta.department_uuid !== null) {
    pega_funcionarios(token);
  } else {
    div_sem_trabalho.classList.remove("hidden");
  }
  console.log(resposta.department_uuid);
}
pega_usuario(token);

function editar_info_perfil(token) {
  const botao_modal = document.querySelector(".botao_modal_editar");
  const inputName = document.getElementById("username");
  const input_email = document.getElementById("email");
  const input_senha = document.getElementById("password");
  let div = document.querySelector(".info_usuario");

  botao_modal.addEventListener("click", async (event) => {
    event.preventDefault();
    const data = {
      username: inputName.value,
      email: input_email.value,
      password: input_senha.value,
    };
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    const responseJSON = await fetch("http://localhost:6278/users", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        renderiza_info_perfil(response);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

editar_info_perfil(token);

export async function pega_usuarios_departamento(token) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const responsta_json = await fetch(
    "http://localhost:6278/users/departments/coworkers",
    options
  );
  const resposta = await responsta_json.json();
  console.log(resposta);
  renderiza_info_perfil(resposta);
}

export async function pega_funcionarios(token) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const resposta_json = await fetch(
    "http://localhost:6278/users/departments/coworkers",
    options
  );
  const resposta = await resposta_json.json();
  console.log(resposta[0]);

  return resposta[0];
}

export async function pega_compania(token) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const responsta_json = await fetch(
    "http://localhost:6278/users/departments",
    options
  );
  const resposta = await responsta_json.json();
  console.log(resposta.name);

  return resposta.name;
}
pega_compania(token);
