//importa caixa de seleção e inputs dos prompts
const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
  value: "teste",
  checked: false
}

let metas = [meta]

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite sua meta:" })
  if (meta.length == 0) {
    console.log("A meta não pode estar vazia.")
    return;
  }
  metas.push({
    value: meta,
    checked: false
  })
}

const listarMetas = async () => {
  const respostas = await checkbox(
    {
      message: "use ↑ e ↓ para navegar entre as metas, tecla espaço para marcar e desmarcar e Enter para finalizar esta etapa.",
      choices: [...metas],
      instructions: false
    }
  )
  metas.forEach((m) => {
    m.checked = false
  })
  
  if (respostas.length == 0) {
    console.log("nenhuma meta selecionada");
    return
  }


  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    })
    meta.checked = true
  })
  console.log("meta(s) marcada(s) como concluída(s)");
}

const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    return meta.checked
  })
  if (realizadas.length == 0) {
    console.log('Não há nenhuma meta realizada!');
    return
  }
  await select({
    message: "Metas realizadas",
    choices: [...realizadas]
  })
}
//arrow function
const start = async () => {

  while (true) {

    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar Meta",
          value: "cadastrar"
        },
        {
          name: "listar Metas",
          value: "listar"
        },
        {
          name: "Metas Realizadas",
          value: "realizadas"
        },
        {
          name: "Sair",
          value: "sair"
        }
      ]
    })

    switch (opcao) {
      case "cadastrar":
        await cadastrarMeta()
        // console.log("cadastrado");
        break
      case "listar":
        await listarMetas()
        // console.log(metas);
        break
      case "realizadas":
        await metasRealizadas()
      case "sair":
        return
    }
  }
}

start()