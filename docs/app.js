// Developed by Caio Mota
//seleção de elementos
var submitButton = document.querySelector("#app form button");
var zipCodeField = document.querySelector("#app form input");
var content = document.querySelector("#app main");

submitButton.addEventListener("click", run);
//monitoramento do evento click do elemento button

function run(event) {
  event.preventDefault(); //prevenção de comportamento default

  var zipCode = zipCodeField.value;
  //tratamento de erro
  zipCode = zipCode.replace(" ", "");
  zipCode = zipCode.replace(".", "");
  zipCode = zipCode.trim();

  axios
    .get("https://viacep.com.br/ws/" + zipCode + "/json/") //realização da requisição com o Axios
    .then((response) => {
      if (response.data.erro) {
      //Se um cep inválido for inserido, a api dá uma resposta com código 200
      //mas o corpo da requisição possui um "erro": true;
      //Para isso, caso essa chave seja encontrada no corpo da requisição
      //um novo erro será gerado, e ele entrará no catch()    
        throw new Error("CEP Inválido");
      }
      content.innerHTML = "";
      //manipulando a resposta
      createLine(response.data.cep);
      createLine(response.data.logradouro + ", " + response.data.bairro);
      createLine(response.data.localidade + "/" + response.data.uf);
      console.log(response.data);
    })
    .catch((err) => {
      //manipulando os erros
      content.innerHTML = "";
      console.log(err);
      createLine("Não foi possível encontrar seu CEP! Tente novamente");
    });

  console.log(zipCodeField.value);
}

function createLine(text) {
  var line = document.createElement("p");
  var text = document.createTextNode(text);

  line.appendChild(text);
  content.appendChild(line);
}
