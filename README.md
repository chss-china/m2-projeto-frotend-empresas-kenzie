Bom Projeto!! 
Nesta atividade, você irá desenvolver uma aplicação para auxiliar proprietários de empresas e seus colaboradores a encontrar informações relevantes de acordo com seus níveis de acesso. Você deve criar uma interface web para consumir a API e exibir as informações na tela, prestando atenção na estética, mas priorizando a funcionalidade e fluidez do processo. Aplique todos os conhecimentos e boas práticas adquiridas no Módulo 2.

Objetivo
O principal objetivo é simular um MVP de um aplicativo de gestão de RH com dois tipos de usuários: o usuário comum (funcionário) com acesso limitado a funcionalidades, e o usuário administrador responsável por gerenciar toda a aplicação. O desafio principal será identificar cada usuário e determinar suas permissões na aplicação.

A API já existente deve ser consumida a partir do repositório fornecido, com uma documentação simplificada disponível.

Sobre a aplicação
Documentação/Repositórios

Links

Código base da entrega

Acessar repositório base no Github

Documentação da API

Acessar documentação da API (O link funciona apenas com a API rodando)

API Local

Acessar Repositório da api local

Figma

Acessar layout do projeto no Figma

Sobre a aplicação
A aplicação web deve conter pelo menos 3 páginas principais:

Página Inicial: Exibir todas as empresas cadastradas e permitir filtrar por categoria. Deve também redirecionar ou criar os modais para que o usuário faça cadastro e/ou login.
Página/modal de Cadastro: Permitir a criação de novos usuários (não administradores).
Página/modal de Login: Realizar o login e direcionar o usuário para sua respectiva área.
Página do Usuário Comum: Renderizar as informações do usuário, nome, email, empresa e departamento que trabalha e colegas de departamento.
Desenvolvendo a aplicação
💻 Página Inicial - Home Page
Ter um redirecionamento para as páginas/modais de cadastro e login;
Exibir uma lista de todas as empresas cadastradas na API;
Permitir filtrar a listagem de empresas por categoria;
Sem restrições, qualquer um pode entrar nessa página e acessar os dados.
💻 Página/modal de Cadastro - Register Page
Formulário de cadastro de usuário com os seguintes campos:
⁠name
⁠email⁠
password
Ter um botão para redirecionar para página/modal de login;
💻 Restrições:
Se o cadastro for bem-sucedido, o usuário deve ser redirecionado para a tela/modal de login. Caso contrário, se a requisição for inválida, um feedback deve ser fornecido ao usuário na forma de uma mensagem de erro.
Não é necessário criar um usuário administrador, pois já existe um cadastrado no banco de dados. Esse usuário é considerado o proprietário de todas as empresas na aplicação. Para acessar a conta do administrador, utilize as seguintes credenciais:
{
   email: "admin@mail.com",
   password: "123456"
}

💻 Página/modal de login
Formulário de login de usuário com os seguintes campos:
E-mail
Senha
Persistir o token de acesso no local storage;
Ter um botão para redirecionar para página/modal de cadastro;
💻 Restrições:
Caso o login seja bem-sucedido:
Armazenar a resposta da requisição no localStorage.
Deverá redirecionar o usuário para a tela de dashboard correspondente.
Utilizem a chave isAdm para identificar para qual dashboard redirecionar
Caso contrário, ou seja, a requisição seja inválida, deverá retornar um feedback para o usuário (uma mensagem de erro).

💻 Página Painel de Controle - Dashboard Page
Após a autenticação, você deverá verificar se o usuário é um usuário comum ou administrador. Pois conterá informações diferentes para cada tipo de acesso ou usuário:

💻Painel de Controle do Administrador deverá conter:
💻 Seção de Departamentos:
Ter um formulário de cadastro de departamento para uma empresa específica;
Listar todos os departamentos de uma empresa específica;
Ao Clicar em um departamento, visualizar dados específicos dele, como funcionários, descrição, nome e a que empresa pertence;
Listar todos os funcionários de um departamento com nome e email
Contratar e demitir um funcionário de um departamento;
💻 Seção de Usuários:
Atualizar os dados de um funcionário, nome e email;
Listar todos os usuários cadastrados na aplicação.
Excluir um funcionário da aplicação
💻 Painel de Controle do Usuário comum deverá conter:
Visualiza apenas sua empresa;
Visualiza apenas o seu departamento;
Listar todos os funcionários do departamento a qual pertence com o nome de cada um;
Caso ele não pertença a nenhum departamento, adicionar mensagem na tela uma mensagem como: “Você ainda não foi contratado” ou uma imagem que tenha o mesmo significado.
O mais importante é ter todas as funcionalidades de forma efetiva!
Doc: https://kenzie-academy-brasil-developers.github.io/m2-empresas-doc

Fgima: https://www.figma.com/file/EEEdGd0gL5iLzaspW8DPXE/Kenzie-Empresas-Oficial

APi Local: https://github.com/Jardel-Kenzie/m2-api-empresas
