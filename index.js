//importa caixa de seleção e inputs dos prompts
const { select, input } = require('@inquirer/prompts')

let meta = {
  value: "teste",
  checked: false
}

let metas = [ meta ]

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

// const listarMetas = () => {
//   if (metas.length == 0) {
//     console.log("não há nenhuma meta.");
//   }

//   for (let pos in metas) {
//     console.log(metas)
//   }
// }

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
        listarMetas()
        // console.log(metas);
        break
      case "sair":
        return
    }
  }
}

start()