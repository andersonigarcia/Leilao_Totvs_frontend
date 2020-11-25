Aplicação modelo utilizando vue.js e Quasar Framework.

Objetivo:
Criar uma interface simples utilizando vue.js e quasar para exemplificar os seus conceitos e exemplificar um modelo de organização de projeto usando essas tecnologias.
Para isso criei um CRUD e uma tela de consulta com uma listagem simples. Segue o exemplo de escopo utilizado para criação da interface.


Login:
Função: autenticação na aplicação para acesso às funcionalidades
Campos: usuário, senha
Restrições:
Todos os campos são obrigatórios.
Usuários desativados não poderão acessar o sistema

Logout:
Função: logoff da aplicação
Restrições:
Nenhum serviço pode ser acessado após o logout da aplicação

Cadastro de leilão (CRUD):
Função: Cadastrar/Visualizar/Editar e Excluir novos leilões.
Campos: nome do leilão, valor inicial, indicador se o item leiloado é "usado", usuário responsável pelo leilão, data de abertura e finalização.

Restrições:
Todos os campos são obrigatórios.
Listagem de leilões


Função: Listar todos os leilões existentes.
Campos: nome do leilão, valor inicial, indicador se o item leiloado é "usado" e usuário responsável pelo leilão, indicador se o leilão está foi finalizado"

Tecnologias utilizadas: Vue.js 2.9.6 e Quasar Framework 1.0.0-beta.6


Como executar:
1) Instalar o node 6 ou superior, vuejs, Quasar framework. 
2) Clonar o projeto, acessar a pasta do projeto via linha de comando e executar 'quasar dev'


Links com documentação completa para mais informações:

https://quasar.dev/start/pick-quasar-flavour
https://vuejs.org/
https://nodejs.org/en/
