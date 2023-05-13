init();

function init() {
  const url = window.location.search;

  if (url && url.includes('editar')) {
    document.getElementById('title-page').innerHTML = 'Editar Streaming'; 
    prepareFormEdit();
    return;
  }

  document.getElementById('title-page').innerHTML = 'Cadastrar Streaming';
}

function prepareFormEdit() {
  const streaming = db_streaming[0];
  document.getElementById('nameStreaming').value = streaming.title;
}


// Validar formulário
function onBlurField() {
  const inputValue = document.getElementById('nameStreaming')?.value;

  if(!inputValue.trim()) {
    document.getElementById(`error-nameStreaming`).innerHTML = 'Campo Obrigatório';
  } else {
    document.getElementById(`error-nameStreaming`).innerHTML = '';
  }
}

function submitForm() {
  const name = document.getElementById('nameStreaming')?.value;

  if (!name)
    return showMessage("Preencha o campo", true);

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