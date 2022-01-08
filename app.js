//seleção de elementos
var submitButton = document.querySelector('#app form button');
var zipCodeField = document.querySelector('#app form input');
var content = document.querySelector('#app main')

submitButton.addEventListener('click', run)
//monitoramento do evento click do elemento button

function run(event) {
    event.preventDefault();//prevenção de comportamento default

    var zipCode = zipCodeField.value;
    //tratamento de erro
    zipCode = zipCode.replace(' ', '');
    zipCode = zipCode.replace('.', '');
    zipCode = zipCode.trim();

    console.log(zipCodeField.value);
}
