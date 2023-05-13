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

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('nameStreaming')?.value;
  const inputFile = document.getElementById('imageStreaming')?.value;

  if (!name || !inputFile)
    return showMessage("Preencha todos os campos", true);

  return showMessage("Cadastro realizado com sucesso!", false);
})

