init();

function init() {
  initForm();
  getStreamigs();
  const url = window.location.search;

  if (url && url.includes('editar')) {
    const form = document.querySelector('form');
    document.getElementById('title-page').innerHTML = 'Editar Série'; 
    prepareFormEdit();
    canBeEnableButtonForm(form);
    return;
  }

  document.getElementById('title-page').innerHTML = 'Cadastrar Série';
}

function prepareFormEdit() {
  const serie = db_serie[0];
  document.getElementById('nameSerie').value = serie.title;
  document.getElementById('categoriaSerie').value = serie.categoria;
  document.getElementById('streamingSerie').value = serie.streaming;
  document.getElementById('comentarioSerie').value = serie.description;
  setMockdataInputImage(document.getElementById('imageSerie'), serie.imgSrc);
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

function initForm() {
  const form = document.querySelector('form');
  
  form.addEventListener('submit', e => {
    e.preventDefault();
    
    const name = document.getElementById('nameSerie')?.value;
    const streaming = document.getElementById('streamingSerie')?.value;
    const categoria = document.getElementById('categoriaSerie')?.value;
    const inputFile = document.getElementById('imageSerie')?.value;
  
    if (!name || !streaming || !categoria || !inputFile)
      return showMessage("Preencha todos os campos", true);
  
    return showMessage("Cadastro realizado com sucesso!", false);
  })
}
