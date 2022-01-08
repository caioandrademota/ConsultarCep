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
      content.innerHTML = "";
      //manipulando a resposta
      createLine(response.data.cep);
      createLine(response.data.logradouro + ", " + response.data.bairro);
      createLine(response.data.localidade + "/" + response.data.uf);
      console.log(response.data);
    })
    .catch((err) => {
      //manipulando os erros
      console.log(err);
    });

  console.log(zipCodeField.value);
}

function createLine(text) {
  var line = document.createElement("p");
  var text = document.createTextNode(text);

  line.appendChild(text);
  content.appendChild(line);
}
