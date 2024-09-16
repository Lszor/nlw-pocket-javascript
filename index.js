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
  if (metas.length == 0) {
    console.log("Não há metas");
    return
  }
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
    console.log("Nenhuma meta selecionada");
    return
  }


  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    })
    meta.checked = true
  })
  console.log("Meta(s) marcada(s) como concluída(s)");
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
    message: "Metas realizadas -> |" + realizadas.length + "|",
    choices: [...realizadas]
  })
}

const metasAbertas = async () => {
  const abertas = metas.filter((meta) => {
    return !meta.checked
  })
  if (abertas.length == 0) {
    console.log('Não há nenhuma meta aberta!');
    return
  }
  await select({
    message: "Metas abertas -> |" + abertas.length + "|",
    choices: [...abertas]
  })
}

const deletarMetas = async () => {
  if (metas.length == 0) {
    console.log("Não há metas");
    return
  }
  const metasDesmarcadas = metas.map((meta) => {
    return {
      value: meta.value,
      checked: false
    }
  })
  const itensADeletar = await checkbox(
    {
      message: "Selecione o item a ser deletado.",
      choices: [...metasDesmarcadas],
      instructions: false
    }
  )

  if (itensADeletar.length == 0) {
    console.log("Nenhuma item para deletar");
    return
  }


  itensADeletar.forEach((item) => {
    metas = metas.filter((meta) => {
      return meta.value != item
    })
  })
  console.log("Meta(s) deleta(s) como sucesso");
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
          name: "Metas Abertas",
          value: "abertas"
        },
        {
          name: "Deletar meta(s)",
          value: "deletar"
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
        break
      case "abertas":
        await metasAbertas()
        break
      case "deletar":
        await deletarMetas()
        break
      case "sair":
        return
    }
  }
}

start()