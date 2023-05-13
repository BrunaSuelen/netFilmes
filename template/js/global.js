// Validar formulário
function onBlurField(campo) {
  const inputValue = document.getElementById(campo)?.value;

  if(!inputValue.trim()) {
    document.getElementById(`error-${campo}`).innerHTML = 'Campo Obrigatório';
  } else {
    document.getElementById(`error-${campo}`).innerHTML = '';
  }
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