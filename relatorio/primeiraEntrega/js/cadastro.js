
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('floatingInputName')?.value;
  const email = document.getElementById('floatingInput')?.value;
  const password = document.getElementById('floatingPassword')?.value;


  if (!email || !password || !name) {
    return showMessage("Preencha todos os campos", true);
  }
    
  return window.location.href = 'index.html'
})
