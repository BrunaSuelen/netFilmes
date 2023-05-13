init();

function init() {
  getStreamigs();
  const url = window.location.search;

  if (url && url.includes('editar')) {
    document.getElementById('title-page').innerHTML = 'Editar Série'; 
    prepareFormEdit();
    return;
  }

  document.getElementById('title-page').innerHTML = 'Cadastrar Série';
}

function prepareFormEdit() {
  const serie = db_serie[0];
  document.getElementById('nameSerie').value = serie.title;
  document.getElementById('categoriaSerie').value = serie.categoria;
  document.getElementById('streamingSerie').value = serie.streaming;
}

function getStreamigs() {
  const selectStreaming = document.getElementById('streamingSerie');
  const streaming = db_streaming;
  
  streaming.forEach(item => {
    let option = document.createElement('option');
    option.value = item.hash;
    option.innerHTML = item.title;
    selectStreaming.appendChild(option);
  });
}


// Validar formulário
function onBlurField(campo) {
  const inputValue = document.getElementById(campo)?.value;

  if(!inputValue.trim()) {
    document.getElementById(`error-${campo}`).innerHTML = 'Campo Obrigatório';
  } else {
    document.getElementById(`error-${campo}`).innerHTML = '';
  }
}

function submitForm() {
  const name = document.getElementById('nameSerie')?.value;
  const streaming = document.getElementById('streamingSerie')?.value;
  const categoria = document.getElementById('categoriaSerie')?.value;

  if (!name || !streaming || !categoria)
    return showMessage("Preencha todos os campos", true);

  return showMessage("Cadastro realizado com sucesso!", false);
}

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