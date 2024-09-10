//importa caixa de seleção dos prompts
const { select } = require('@inquirer/prompts')

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
        console.log("cadastrado");
        break
      case "listar":
        console.log("listados");
        break
      case "sair":
        return
    }
  }
}

start()