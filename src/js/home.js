let reopenDetails = false;

init();

function init() {
  const lista = document.querySelector('.list-cards');
  const item = document.querySelector('.cards');

  //Insere na ul x quantidade o conteúdo dos cards 
  for (let i = 0; i < 20; i++) {
    // Clona elemento li e todos os elementos filhos
    const clone = item.cloneNode(true);
    // Insere na lista o li que clonado
    lista.appendChild(clone);
  }
}
function editarSerie() {
  window.location.href = 'form-serie.html?editar=X';
}

function editarStreaming() {
  window.location.href = 'form-streaming.html?editar=X';
}

function goModalRemove() {
  reopenDetails = true;
}

function deteleItem(item) {
  const textRemocao = item.includes('Série') ? 'removida' : 'removido';
  const message = `${item} ${textRemocao} com sucesso`
  showMessage(message, false);
  reopenDetails = false;
}

function exitModalRemove(idModalDetail) {
  const modalDetail = document.getElementById(idModalDetail);

  if (reopenDetails) {
    let modalDetailData = new bootstrap.Modal((modalDetail), {});
    modalDetailData.show();
    reopenDetails = false;
  }
}