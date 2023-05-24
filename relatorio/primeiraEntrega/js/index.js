const login = {
  email: 'a@example.com',
  password: '123',
}

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('floatingInput')?.value;
  const password = document.getElementById('floatingPassword')?.value;


  if (!email || !password) {
    return showMessage("Preencha todos os campos", true);
  }

  if (email === login.email && password === login.password) {
    return window.location.href = 'home.html'
  }

  return showMessage("Email ou senha estão incorretos", true);

})

init();

function init() {
  initForm();
}


function initForm() {
  document.getElementById('floatingInput').value = login.email;
  document.getElementById('floatingPassword').value = login.password;
  canBeEnableButtonForm(form);
}