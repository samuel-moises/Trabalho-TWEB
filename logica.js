// Número de slides que queremos mostrar ao mesmo tempo em desktop
const slidesPerView = 4;

// Índice do primeiro slide atualmente visível (começa no 0)
let startIndex = 0;

// Seleciona a "track" que se vai mover
const track = document.querySelector('#frota .slideshow-track');

// Seleciona todos os cartões de carro (.slide)
const slides = document.querySelectorAll('#frota .slide');

// Botões de navegação
const prevButton = document.querySelector('#frota .prev');
const nextButton = document.querySelector('#frota .next');

// Calcula o número máximo de posições de início
// Ex.: se tiveres 6 slides e mostras 4, máximo é 2 (0, 1, 2)
const maxStartIndex = Math.max(0, slides.length - slidesPerView);

// Função que aplica o translateX em função do startIndex
function updatePosition() {
  // Cada slide ocupa (100 / slidesPerView)% da largura da viewport
  const slideWidthPercent = 100 / slidesPerView;

  // Offset negativo para deslizar para a esquerda
  const offset = -startIndex * slideWidthPercent;

  // Move a track inteira
  track.style.transform = `translateX(${offset}%)`;
}

// Avança ou recua o carrossel em blocos de 4 imagens
function moveSlides(direction) {
  // direction = 1 (next) ou -1 (prev)
  startIndex += direction * slidesPerView; // salta 4 de cada vez

  // Loop infinito: se passar do fim, volta ao início
  if (startIndex > maxStartIndex) {
    startIndex = 0;
  }

  // Se for antes do início, vai para a última posição possível
  if (startIndex < 0) {
    startIndex = maxStartIndex;
  }

  // Atualiza a posição visual
  updatePosition();
}

// Liga o clique da seta esquerda à função moveSlides(-1)
prevButton.addEventListener('click', function () {
  moveSlides(-1);
});

// Liga o clique da seta direita à função moveSlides(1)
nextButton.addEventListener('click', function () {
  moveSlides(1);
});

// Chama uma vez para garantir a posição inicial correta
updatePosition();


//*****************************************************************
// *** FUNÇÃO BOTÃO SANDWICH MENU ***
document.addEventListener('DOMContentLoaded', function () {
    const botao = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.navbar');

    if (!botao || !menu) return;

    botao.addEventListener('click', function () {
        menu.classList.toggle('active');
    });
});
//*****************************************************************

// *** Devolução em local diferente quando a checkbox é selecionada ***

const devolução = document.getElementById('devolução');
const checkbox = document.getElementById('mostrar');

// Ocultar levantamento inicialmente
devolução.style.visibility = 'hidden';

// Mostrar/ocultar quando clica na checkbox
//|() =>| É uma função arrow (função anónima) que será executada quando o evento acontecer. () Função Não recebe Parametros {} Bloco de código que será corrido
checkbox.addEventListener('change', () => {
    
if (checkbox.checked) {
        devolução.style.visibility = 'visible'; // Mostra
    } else {
        devolução.style.visibility = 'hidden'; // Oculta mas mantém espaço
    }
});


//****************************************************************** */
