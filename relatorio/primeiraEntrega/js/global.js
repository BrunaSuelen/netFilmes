function showMessage(message, error) {
  let alert = document.getElementById('alert');
  alert.className = error ? 'error' : 'success';
  alert.innerHTML = message;
  alert.hidden = false;

  setTimeout(() => {
    alert.innerHTML = "";
    alert.className = "";
    alert.hidden = true;
  }, 4000);
}


function onFocusInput(event) {
  const inputTarget = event.target;

  const isEmptyInput = checkInputEmpty(inputTarget);

  displayMessageErroInput(inputTarget, isEmptyInput);
}

function onInput(event) {
  const inputTarget = event.target;

  const isEmptyInput = checkInputEmpty(inputTarget);

  displayMessageErroInput(inputTarget, isEmptyInput);

  const formOfInput = event.target.form;
  
  canBeEnableButtonForm(formOfInput);
}

/**
 *  Exibe a mensagem de erro na tag span referente ao input
 * @param {*} input Input que receberá a mensagem de erro
 * @param {boolean} hasError Boleano que exibe a mensagem de erro
 * @param {String} message Mensagem de erro que será exibida na tag span logo abaixo do input
 */
function displayMessageErroInput(input, hasError, message='Campo Obrigatório'){

  const idSpanByTargetInput = `error-${input?.id}`;
  const spanErrorOfTargetInput = document.getElementById(idSpanByTargetInput);

  // Se não existir o span
  if(!spanErrorOfTargetInput) return;

  if(hasError){
    spanErrorOfTargetInput.textContent = message;
  }else{
    spanErrorOfTargetInput.textContent = '';
  }
}


/**
 *  Função que habilita um botão passando a condinção, caso verdadeiro ficará habilitado
 * @param {*} buttonElement Elemento botão que será desabilitado ou não 
 * @param {boolean} isCanBeEnable Boleano que caso verdadeiro deixará o botão habilitado
 */
function enableButton(buttonElement, isCanBeEnable) {
  // Se o botão puder se habilitado disable = false
  buttonElement.disabled = ! isCanBeEnable;
}


/**
 *  Checa se o input tá vazio ou não 
 * @param {*} input Input será validado 
 * @returns {boolean} Retorna verdadeiro caso o input seja vazio
 */
function checkInputEmpty(input){
  return input?.value.trim() === ''
}


/**
 * 
 * @param form Elemento Formulário que será validados os campos de input ou select caso foram preenchidos,
 * caso verdadeiro deixa o botão de submit habilitado  
 */
function canBeEnableButtonForm(form){
  
  const inputsFieldsOfForm = [...form?.elements].filter(element => element?.tagName === 'INPUT' || element?.tagName === 'SELECT');
  
  const buttonSubmit = [...form?.elements].filter(element => element?.tagName === 'BUTTON')[0];

  let allInputHasValue = true;
  // Verifica se os inputs não são estão vázios; 
  for (const input of inputsFieldsOfForm) {
    const hasValueOnInput = ! checkInputEmpty(input);
    allInputHasValue = allInputHasValue && hasValueOnInput;
  }

  enableButton(buttonSubmit, allInputHasValue);
}


/**
 * Função que colocar uma imagem em um input, no qual é passado o caminho da imagem
 * @param {*} input Input que receberá a imagem
 * @param {*} srcImage Caminho que a imagem tá armazenada 
 */
function setMockdataInputImage(input, srcImage){
   // Cria o objeto file com o endereço passado no parâmetro da função 
   const file = new File(['file'], srcImage, {
       type: 'text/plain',
       lastModified: new Date(),
   });

   // Cria a classe responsavel por adicionar a imagem no input do formulario de exemplo de template
   const dataTransfer = new DataTransfer();
   dataTransfer.items.add(file);
   input.files = dataTransfer.files;
}