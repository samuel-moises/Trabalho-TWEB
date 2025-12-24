
// ✅ Validação idade mínima
const hoje = new Date();
const dataNascimento = new Date(idade);

// Calcula idade em anos
let anos = hoje.getFullYear() - dataNascimento.getFullYear();
const mesAtual = hoje.getMonth();
const mesNascimento = dataNascimento.getMonth();

// Ajusta se ainda não fez aniversário este ano
if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < dataNascimento.getDate())) {
  anos--;
}

if (anos < 18) {
  alert("O condutor deve ter pelo menos 18 anos.");
  return;
}



