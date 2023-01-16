import {
  modal_ver_departamento,
  criar_cards_departamentos,
  modal_criar_departamento,
  renderiza_usuarios,
  renderiza_departamentos,
  seleciona_compania,
} from "./admin.js";

let token = JSON.parse(localStorage.getItem("@KenzieCompany"));

let isAdmin = await seleciona_tipo_usuario(token);
console.log(isAdmin);
if (!token || isAdmin === false) {
  window.location.replace("../Login/login.html");
}

async function seleciona_tipo_usuario(token) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const responseJSON = await fetch(
    "http://localhost:6278/auth/validate_user",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      return response.is_admin;
    });
  return responseJSON;
}

export async function pega_departamento(token) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const responseJSON = await fetch(
    "http://localhost:6278/departments",
    options
  );
  const response = await responseJSON.json();
  console.log(response);
  renderiza_departamentos(response);
  return response;
}
pega_departamento(token);

export async function pega_usuarios(token) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const responseJSON = await fetch("http://localhost:6278/users", options);
  const response = await responseJSON.json();

  console.log(response);
  return response;
}

export async function pega_usuarios_compania(token) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const responseJSON = await fetch(
    "http://localhost:6278/departments",
    options
  );
  const response = await responseJSON.json();

  return response;
}

export async function pega_setor() {
  const responseJSON = await fetch("http://localhost:6278/sectors");
  const response = await responseJSON.json();
}
pega_setor();

export async function pega_as_compania() {
  const responseJSON = await fetch("http://localhost:6278/companies");
  const response = await responseJSON.json();
  seleciona_compania(response);
  return response;
}
pega_as_compania();

export async function criar_departamento(token, name, description, company) {
  const data = {
    name: name,
    description: description,
    company_uuid: company,
  };
  console.log(token);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const responseJSON = await fetch("http://localhost:6278/departments", options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function pega_edit_departamento(token, endPoint, description) {
  const data = {
    description: description,
  };

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const responseJSON = await fetch(
    `http://localhost:6278/departments/${endPoint}`,
    options
  );
  const response = await responseJSON.json();
  return response;
}

export async function pega_delete_departamento(token, endPoint) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const responseJSON = await fetch(
    `http://localhost:6278/departments/${endPoint}`,
    options
  );
}

export async function pega_usuarios_sem_trabalho(token) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const responseJSON = await fetch(
    "http://localhost:6278/admin/out_of_work",
    options
  );
  const response = await responseJSON.json();

  return response;
}

export async function contratar_usuario(token, idUser, idDepartment) {
  const data = {
    user_uuid: idUser,
    department_uuid: idDepartment,
  };

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const responseJSON = await fetch(
    `http://localhost:6278/departments/hire/`,
    options
  );
  const response = await responseJSON.json();
  return response;
}

export async function usuario_demitido(token, idUser) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const responseJSON = await fetch(
    `http://localhost:6278/departments/dismiss/${idUser}`,
    options
  );
  const response = await responseJSON.json();
  return response;
}

export async function editar_funcionarios(token, kindWork, level, idUser) {
  const data = {
    kind_of_work: kindWork,
    professional_level: level,
  };

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const responseJSON = await fetch(
    `http://localhost:6278/admin/update_user/${idUser}`,
    options
  );
  const response = await responseJSON.json();
  return response;
}

export async function pega_delete_usuario(token, endPoint) {
  console.log(typeof token);
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const responseJSON = await fetch(
    `http://localhost:6278/admin/delete_user/${endPoint}`,
    options
  );
}
