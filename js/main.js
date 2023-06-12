//capturamos o formulario em uma variável
const form = document.getElementById("novoItem");
//ao enviar um formulario, fazemos, um submit, logo enviamos uma função anonima como 2º parametro
form.addEventListener("submit", (e) => {
  //todo formulario por padrão envia os dados para algum lugar, assim ele recarrega a pagina
  //então criamos o evento (variavel que captura a ação executada) e botamos a função para
  //prevenir a ação padrão do formulário
  e.preventDefault();
  e.target[0].value;
  console.log(e);
  console.log()
});
