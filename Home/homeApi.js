import { renderiza_compania, seleciona_setor } from "./home.js";

export async function catch_compania() {
  const respostaJSON = await fetch("http://localhost:6278/companies");
  const resposta = await respostaJSON.json();
  renderiza_compania(resposta);
}
catch_compania();

export async function catch_setor() {
  const respostaJSON = await fetch("http://localhost:6278/sectors");
  const resposta = await respostaJSON.json();

  seleciona_setor(resposta);
}
catch_setor();
