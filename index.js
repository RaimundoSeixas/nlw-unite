//Objeto  javascript abaixo
// const participante = {
//   nome: "Raymond Seyxas",
//   email: "rayseyxas2019@gmail.com",
//   dataInscricao: new Date(2024, 2, 22, 19, 20 ),
//   dataCheckIn: new Date(2024, 2, 25, 22, 20),

// }

// array
let participantes = [
    { 
        nome: "Diego Fernandes", 
        email: "diego@gmail.com", 
        dataInscricao: new Date(2024, 2, 01, 19, 23), 
        dataCheckIn: new Date(2024, 2, 01, 20, 20) 
    },
    { 
        nome: "Raymond Seyxas", 
        email: "rayseyxas2019@gmail.com", 
        dataInscricao: new Date(2024, 2, 01, 19, 23), 
        dataCheckIn: new Date(2024, 2, 01, 20, 20) 
    },
    { 
        nome: "Maria Silva", 
        email: "maria@gmail.com", 
        dataInscricao: new Date(2024, 2, 02, 10, 15), 
        dataCheckIn: new Date(2024, 2, 02, 11, 30) 
    },
    { 
        nome: "João Souza", 
        email: "joao@gmail.com", 
        dataInscricao: new Date(2024, 2, 03, 14, 40), 
        dataCheckIn: new Date(2024, 2, 03, 15, 10) 
    },
    { 
        nome: "Ana Santos", 
        email: "ana@gmail.com", 
        dataInscricao: new Date(2024, 2, 04, 8, 20), 
        dataCheckIn: null 
    },
    { 
        nome: "Pedro Lima", 
        email: "pedro@gmail.com", 
        dataInscricao: new Date(2024, 2, 05, 17, 50), 
        dataCheckIn: new Date(2024, 2, 05, 18, 30) 
    },
    { 
        nome: "Carla Oliveira", 
        email: "carla@gmail.com", 
        dataInscricao: new Date(2024, 2, 06, 13, 10), 
        dataCheckIn: new Date(2024, 2, 06, 13, 50) 
    },
    { 
        nome: "Rafaela Costa", 
        email: "rafaela@gmail.com", 
        dataInscricao: new Date(2024, 2, 07, 11, 5), 
        dataCheckIn: new Date(2024, 2, 07, 11, 40) 
    },
    { 
        nome: "Lucas Pereira", 
        email: "lucas@gmail.com", 
        dataInscricao: new Date(2024, 2, 08, 16, 30), 
        dataCheckIn: new Date(2024, 2, 08, 17, 20) 
    },
    { 
        nome: "Mariana Oliveira", 
        email: "mariana@gmail.com", 
        dataInscricao: new Date(2024, 2, 09, 9, 0), 
        dataCheckIn: new Date(2024, 2, 09, 9, 45) 
    }
];

//console.log(participantes);


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>

    `
  }
  
  return `
    <tr>
    <td>
      <strong>
        ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>

    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  // PEGAR INFORMAÇÃO DO HTML
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  // SUBSTITUIR INFORMAÇÃO DO HTML
  document.querySelector('tbody').innerHTML = output
}
  atualizarLista(participantes)


const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)
  

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }
  //VERIFICAR SE O PARTICIPANTE JÁ EXISTE
  const participanteExiste = participantes.find((p) => {
      return p.email == participante.email
    }
  )
  if(participanteExiste) {
    alert('Email já cadastrado !!')
  }

  participantes = [participante,...participantes]
  atualizarLista(participantes)

  //LIMPAR FORMULARIO
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""


}

const fazerCheckIn = (event) => {
  //CONFIRMAR SE REALMENTE QUER FAZER O CHECKIN
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in ?'
  if(confirm(mensagemConfirmacao) = false) {
    return
  }
  
  //ENCONTRAR O PARTICIPANTE DENTRO DA LISTA 
  const participante = participantes.find((p)=> {
    return p.email == event.target.dataset.email
  }) 
  //ATUALIZAR O CHECK-IN DO PARTICIPANTE
  participante.dataCheckIn = new Date()
  //ATUALIZAR A LISTA DE PARTICIPANTE
  atualizarLista(participantes)
}