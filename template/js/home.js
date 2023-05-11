const lista = document.querySelector('.lista');
const item = document.querySelector('.item');

for(let i=0; i<20;i++){
  // Clona elemento html
  const clone = item.cloneNode(true);
  // Insere na lista o item clonado
  lista.appendChild(clone);
}