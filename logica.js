

const slidesPerView = 4; // Número de slides visíveis ao mesmo tempo
let startIndex = 0; // Índice do primeiro slide atualmente visível (começa no 0)
const track = document.querySelector('#frota .slideshow-track'); // Seleciona a "track" que se vai mover
const slides = document.querySelectorAll('#frota .slide'); // Seleciona todos os cartões de carro (.slide)
const prevButton = document.querySelector('#frota .prev'); // Botões de navegação Prev
const nextButton = document.querySelector('#frota .next'); // Botões de navegação Next
const maxStartIndex = Math.max(0, slides.length - slidesPerView); // Calcula o número máximo de posições de início e nã deixa ser negativo

// Função que aplica o translateX em função do startIndex
function updatePosition() {
  const slideWidthPercent = 100 / slidesPerView; // Cada slide ocupa (100 / slidesPerView)% da largura da viewport
  const offset = -startIndex * slideWidthPercent; // Offset negativo para deslizar para a esquerda
  track.style.transform = `translateX(${offset}%)`; //converte o offset numa string de transformação CSS e aplica à track -->${} Permite interpolar variáveis diretamente dentro da string
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

  updatePosition(); // Chama a função para atualizar a posição
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


//********************************************************************************** FUNÇÃO BOTÃO SANDWICH MENU 

document.addEventListener('DOMContentLoaded', function () {
const botao = document.querySelector('.menu-toggle');
const menu = document.querySelector('.navbar');

    if (!botao || !menu) return;

    botao.addEventListener('click', function () {
        menu.classList.toggle('active');
    });
});

//***************************************************************** MOSTRAR / OCULTAR CAMPO DE DEVOLUÇÃO DIFERENTE
/*
() =>  --> É uma função arrow (função anónima) que será executada quando o evento acontecer. 
()     -->Função Não recebe Parametro.
{}     -->Bloco de código que será corrido
*/
const devolução = document.getElementById('devolução');
const checkbox = document.getElementById('checkbox-devolucao');

// Ocultar levantamento inicialmente
devolução.style.visibility = 'hidden';
checkbox.addEventListener('change', () => {    
if (checkbox.checked) {
        devolução.style.visibility = 'visible'; // Mostra
    } else {
        devolução.style.visibility = 'hidden'; // Oculta mas mantém espaço
    }
});


//***************************************************************** APRESENTAÇÂO DOS CARROS QUANDO FAZ A PESQUISA
const carros = [
  { nome: "Mercedes C 300 d", grupo: "Grp S2 - Cabrio Premium Automático", img: "img/Cars/Mercedes.c300d.png" },
  { nome: "Renault Clio IV", grupo: "Grp C - Económico", img: "img/Cars/C_Renault_Clio.png" },
  { nome: "Nissan Qashqai", grupo: "Grp U1 - Crossover Automático", img: "img/Cars/N_NissanQashqai.png" },
  { nome: "Ford Focus 1.0", grupo: "Grp Q1 - Stw Automático", img: "img/Cars/D-ford.focus.png" },
  { nome: "Hyundai I10", grupo: "Grp B - Citadino", img: "img/Cars/Hyundai_I10.png" },
  { nome: "Mazda MX5 1.5", grupo: "Grp L - Roadster", img: "img/Cars/Mazda_MX5.jpg" }
];

const carrinhas = [
  { nome: "Renault Trafic CB L1H1P1", grupo: "Furgon Médio", img: "img/Cars/Renault_Traficmb.jpg" },
  { nome: "Ford Transit Cargo", grupo: "Furgon - Tecto Normal", img: "img/Cars/FordTransitBaixa.png" },
  { nome: "Ford Transit Cargo", grupo: "Furgon Tecto Semi Elevador", img: "img/Cars/FordTransitAlta.png" },
  { nome: "Renault Kangoo", grupo: "Pequeno Furgon", img: "img/Cars/Renault_Kangoo.jpg" }
];

//########## Função para escolher aleatórios ##########
function escolherAleatorios(lista, quantidade) {
    const copia = [...lista]; //cópia independente e integral do array lista usando o operador spread (...).
    const selecionados = []; // Array para armazenar os veículos selecionados
    
    while (selecionados.length < quantidade && copia.length > 0) { // Garante que não tenta selecionar mais do que o disponível
      const indice = Math.floor(Math.random() * copia.length); // Gera um índice aleatório dentro dos limites da cópia
      selecionados.push(copia.splice(indice, 1)[0]);//remove o veículo selecionado da cópia para evitar duplicados
    }
    return selecionados;
}

//########## Função para calcular os dias de levantamento e devolução ##########
function calcularDias(dataInicio, dataFim) {
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    const dias = [];

    while (inicio <= fim) {
      dias.push(new Date(inicio));
      inicio.setDate(inicio.getDate() + 1);
    }
    return dias;
}

//########## Função para calcular preço total ##########
function calcularPreco(dias, tipoVeiculo, devolucaoDiferente, tarifaEmpresarial) {
    let total = 0;

    dias.forEach(dia => {
      const diaSemana = dia.getDay(); // 0 = Domingo, 6 = Sábado (Valores retornados pela função getDay())
      let precoDia = 0;

      if (tipoVeiculo === "Carro") {
        precoDia = (diaSemana === 0 || diaSemana === 6) ? 15 : 6; // Se diasemana for Sábado ou Domingo preço é 15, senão 6 (operador ternário)
      } else if (tipoVeiculo === "Carrinha") {
        precoDia = (diaSemana === 0 || diaSemana === 6) ? 20 : 12; // Se diasemana for Sábado ou Domingo preço é 20, senão 12 (operador ternário)
      }

      total += precoDia;
    });

    if (devolucaoDiferente) {
      total += 30; // Acrescenta taxa única
    }


    // Tarifa empresarial (desconto)
    if (tarifaEmpresarial) {
      const numDias = dias.length;
      const desconto = numDias < 3 ? 0.10 : 0.20;
      total = total - (total * desconto);
    }
return total.toFixed(2);// Retorna o total com 2 casas decimais
}


//###################################################################################################################################


// Captura do clique no botão
  document.getElementById("btn-search").addEventListener("click", function(event) {
  event.preventDefault();

// Verifica se os campos obrigatórios estão preenchidos
  const levantamento = document.getElementById("levantamento").value;
  const devolucao = document.getElementById("devolução").value;
  const dataLev = document.getElementById("data-levantamento").value;
  const dataDev = document.getElementById("data-devolucao").value;
  const idade = document.getElementById("data-nascimento").value; 
  const devolucaoCheckbox = document.getElementById("checkbox-devolucao").checked; // Checkbox devolução diferente
  const tarifaEmpresarial = document.getElementById("checkbox-tarifa").checked; // Checkbox tarifa empresarial
  const carroSelecionado = document.getElementById("checkbox-carro").checked;
  const carrinhaSelecionada = document.getElementById("checkbox-carrinha").checked;
  

  if (!levantamento || !dataLev || !dataDev || !idade) { // Validação Geral
    alert("Por favor, preencha todos os campos obrigatórios.");
    return; // Sai da função se algum campo obrigatório estiver vazio
  }
  
  if (devolucaoCheckbox && !devolucao) { //Validação devolução diferente
    alert("Por favor, selecione o local de devolução.");
    return; // Sai da função se o checkbox estiver marcado mas o campo devolução vazio
  }



  let veiculosSelecionados = []; // Array para armazenar os veículos selecionados
  if (carroSelecionado && !carrinhaSelecionada) {
    veiculosSelecionados = escolherAleatorios(carros, 4); //Executa Função escolher aleatório e devolve um array com 4 carros
  } else if (carrinhaSelecionada && !carroSelecionado) {
    veiculosSelecionados = escolherAleatorios(carrinhas, 4);
    } else if (carroSelecionado && carrinhaSelecionada) {
      alert("Por favor, selecione apenas uma opção: Carro OU Carrinha.");
      return;// Sai da função se ambos estiverem selecionados
    } else {
      alert("Por favor, selecione Carro OU Carrinha.");
      return;// Sai da função se nenhum estiver selecionado
      }

  // Remove resultados anteriores
  const Resultado = document.querySelector(".resultado-veiculos");
    if (Resultado) Resultado.remove();

  // Cria container para mostrar os veículos
  const resultadoDiv = document.createElement("div"); // Cria um novo elemento <div> no DOM (ainda não está visível porque não foi anexado à página).
  resultadoDiv.classList.add("resultado-veiculos"); // Adiciona a classe CSS resultado-veiculos a essa <div>
  resultadoDiv.style.display = "flex";
  resultadoDiv.style.flexDirection = "row";
  resultadoDiv.style.justifyContent = "center"; // Centraliza horizontalmente
  resultadoDiv.style.flexWrap = "wrap"; // Permite quebrar linha em ecrãs pequenos
  resultadoDiv.style.gap = "20px"; // Espaço entre os cards
  resultadoDiv.style.margin = "20px"; // Centraliza o container

/*
    .forEach()         -->é um método do JavaScript que executa uma função para cada elemento do array.
    veiculo => { ... } -->é uma função arrow que recebe cada veículo (v) e executa o código dentro das chaves {}.
*/


veiculosSelecionados.forEach(veiculo => { // Veiculos selecionados é o array retornado pela função escolherAleatórios
    const dias = calcularDias(dataLev, dataDev);
    const tipoVeiculo = carroSelecionado ? "Carro" : "Carrinha";
    const total = calcularPreco(dias, tipoVeiculo, devolucaoCheckbox, tarifaEmpresarial);

    // Captura o template
    const template = document.getElementById("card-template");
    const card = template.content.cloneNode(true); // Clona o conteúdo do template

    // Preenche os dados no clone
    card.querySelector(".car-img").src = veiculo.img;
    card.querySelector(".car-img").alt = veiculo.nome;
    card.querySelector(".car-nome").textContent = veiculo.nome;
    card.querySelector(".car-grupo").textContent = veiculo.grupo;
    card.querySelector(".car-levantamento").textContent = levantamento;
    card.querySelector(".car-devolucao").textContent = devolucao;
    card.querySelector(".car-preco").textContent = total;

    // Adiciona ao container
    resultadoDiv.appendChild(card);
})

  // Adiciona abaixo do formulário numa DIV criada para o efeito
  document.querySelector(".Resultado-pesquisa").appendChild(resultadoDiv);
});
