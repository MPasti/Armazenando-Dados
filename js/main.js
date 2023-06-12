//capturamos o formulario em uma variável
const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const items = JSON.parse(localStorage.getItem("items")) || [];

//isso da erro, pois enviamos os dados como uma string, e não como um array ou objeto
//ele não reconhece como, então ao usar push, usar forEach, ele não vai entender que é um array
//então precisamos transformar de volta a um array

items.forEach((elemento) => {
  criarElemento(elemento);
  //ele vai imprimir os elementos no local storage
  //e como recebe apenas um parametro, ele va receber apenas o elemento
  //pois devido ao forEach, vai passar por cada parametro do array e vai jogar para a função
});

//ao enviar um formulario, fazemos, um submit, logo enviamos uma função anonima como 2º parametro
form.addEventListener("submit", (e) => {
  //todo formulario por padrão envia os dados para algum lugar, assim ele recarrega a pagina
  //então criamos o evento (variavel que captura a ação executada) e botamos a função para
  //prevenir a ação padrão do formulário
  e.preventDefault();
  //ao dar submit, dentro do objeto enviado para o event, possui um array chamado target
  //nele fica salvo as informações colocadas nos inputs
  //assim, acessando o array conseguimos resgatar essas informações
  console.log(e);
  //console.log(e.target[0].value);
  //console.log(e.target[1].value);
  //dentro do objeto target, também temos uma lista chamada elements, que possui um objeto com as informações
  //isso traz uma abordagem melhor, pois, com o target normal vamos atrás de um numero, caso adicionamos
  //um input antes, isso quebra nossa lógica. Já pelo objeto buscamos através de um nome

  const nome = e.target.elements["nome"];
  const quantidade = e.target.elements["quantidade"];

  //olhando o array nos elementos nome e procurando
  const existe = items.find((elemento) => elemento.nome === nome.value);

  //para salvar um par de elementos, dicionário daquele item, é prático transforma-lo em um objeto
  //mas para armazenar vários, precisamos criar um array de objetos
  const itemAtual = {
    //como aqui está fora da função, ele não recebe como dentro da função .value, e precisa receber como .value
    nome: nome.value,
    quantidade: quantidade.value,
  };

  //diferente de null sem precisar de !=
  if (existe) {
    //para se buscar, é mt mais facil através de um id, então vamos criar na hora de criar o objeto
    itemAtual.id = existe.id;
    //assim para ele ter o mesmo id

    atualizaElemento(itemAtual);

    items[existe.id] = itemAtual;
    //sobrescrevendo pelo id do objeto, por ser um conteúdo de texto, um array, tratar assm
  } else {
    //seu item será o tamanho do array, ou seja, se tiver 2 items, o id vai ser 2
    itemAtual.id = items.length;

    criarElemento(itemAtual);

    items.push(itemAtual);
  }
  console.log(nome);
  console.log(quantidade);
  //isso busca através do name dado ao input

  //assim ele fica salvo como array, ele fica somando os iens dentro do array, armazenando vários objetos no local

  //o localStorage lê ele como uma string, manda-lo como um objeto da um problema assim
  localStorage.setItem("items", JSON.stringify(items));
  //assim transformamos nosso objeto em texto
  //ao dar f5 ele fica salvo no local, mas ainda não aparece

  //para limpar os inputs
  nome.value = "";
  quantidade.value = "";
});

function criarElemento(item) {
  //`<li class="item"><strong>${nome}</strong>${quantidade}</li>`
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");
  //o create element gera novos elementos do html, ao criar um li, estamos criando mais um elemento na ul
  //ou seja, na lista
  //depois criamos a classe que também está dentro

  const numeroItem = document.createElement("strong");
  //agora aqui busca a posição do objeto criado
  numeroItem.innerHTML = item.quantidade;
  //aqui criamos o strong com a quantidade dentro dele no formato de texto

  numeroItem.dataset.id = item.id;
  //não podemos adicionar um elemento html via javascript como se fosse um conteúdo simples
  //novoItem.innerHTML = numeroItem + nome;
  //usamos o appendChild, para enviar o elemento html dentro dele
  novoItem.appendChild(numeroItem);
  //adicionamos a quantidade pro li criado

  //adicionamos o valor do nome para dentro do texto html
  novoItem.innerHTML += item.nome;

  //inserimos o conteúdo para dentro do html no formato de objeto
  lista.appendChild(novoItem);

  //assim deixa registrado no localStorage, da para ver pelo devTools
  //mas assim sobrescreve no localStorage, pq é só uma chave
}

function atualizaElemento(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML =
    item.quantidade;
}

//para inserir no localStorage criamos um objeto dentro da função, isso deveria receber os dados prontos

//a função criarelemento fica exclusivo para essa função, o submit do formulário gerencia todas as funções do envio
//ao recarregar, ele busca os dados do localStorage e cria cada elemento em cima dele

//o comportamento do localStorage é tipo de banco de dados, tem um que chama
//.key para acessar o elemento como um id, é o elemento chave, logo o localStorage.key(0)
// é o items, ele a chave é o elemento, enquanto o value é a string dentro
//ela normalmente não é usada por ser muito específico
