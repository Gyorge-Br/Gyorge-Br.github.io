let json
let arquivoSelecionado = null
let linhas = 0
let espaços = 0 
let arraychavesusadas

window.CriarBase = function (){
    const conteudo = document.getElementById('Conteudo')
    const tableread = document.createElement('table')
    tableread.id = "read"
    const theadread = document.createElement('thead')
    tableread.appendChild(theadread)
    const tbodyread = document.createElement('tbody')
    tableread.appendChild(tbodyread)
    conteudo.appendChild(tableread)

    const editor = document.getElementById('Editor')
    const tableedit = document.createElement('table')
    tableedit.id = "edit"
    const theadedit = document.createElement('thead')
    tableedit.appendChild(theadedit)
    const tbodyedit = document.createElement('tbody')
    tableedit.appendChild(tbodyedit)
    editor.appendChild(tableedit)

}

window.CarregarArquivo = async function () {
    [arquivoSelecionado] = await window.showOpenFilePicker({
        types: [
            {
                description: 'Arquivos JSON',
                accept: {
                'application/json': ['.json'],
                },
            },
            ],
            multiple: false // Apenas um arquivo pode ser selecionado
        })
      
    const arquivo = await arquivoSelecionado.getFile()

    const conteudo = await arquivo.text()
    json = JSON.parse(conteudo)
}

window.CarregarTabela = async function(tipodetabela){
      const table = document.getElementById(tipodetabela)
      const thead = table.querySelector('thead')
      const tbody = table.querySelector('tbody')

      thead.innerHTML = ''
      tbody.innerHTML = ''
      let chavesusadas = new Set()

      let elementosjson= json.length

      for (let N = 0; N < elementosjson; N++) { // loop para ler cada elemento json
          let chavejson = Object.keys(json[N])

          for (let num = 0; num < chavejson.length; num++) { // loop para adicionar as chaves do json
              const cabeça = document.createElement('th')
              let chaveatual = chavejson[num]
              if (!chavesusadas.has(chaveatual)) { // verifica se ja tem a chave no cabeçalho
                  let botãoeditar
                  let texto = document.createElement("h7")
                  texto.innerText = chaveatual + " "
                  cabeça.appendChild(texto)
                  if (tipodetabela == "edit") { // cria o botão de editar no nome da coluna
                      let div = document.createElement("div")
                      div.appendChild(texto)
                      botãoeditar = document.createElement('button')
                      botãoeditar.innerText = "✎"
                      botãoeditar.title = "Editar Conteudo"
                      botãoeditar.id = `cabeça${num}` 
                      div.appendChild(botãoeditar)
                      cabeça.appendChild(div)

                  }
                  cabeça.className = chaveatual
                  thead.appendChild(cabeça)
                  chavesusadas.add(chaveatual)
              }
          }
      }    
      if (tipodetabela == "edit") {
          let th = document.createElement('th') // cria o botão de adicionar nova coluna
          let botãoadicionar = document.createElement('button')
          botãoadicionar.title = "Adicionar Nova Coluna"
          botãoadicionar.innerText = "+"
          botãoadicionar.id = "cabeçaadd"
          thead.appendChild(th)
          th.appendChild(botãoadicionar)
      }

      arraychavesusadas = [...chavesusadas]
      for (let N = 0;N <json.length;N++) { // cria cada linha de informação
          const tr = document.createElement('tr')
          for (let num = 0;num < arraychavesusadas.length; num++) { // cria cada espaço de informação
              let arrayatual = arraychavesusadas[num]
              tbody.appendChild(tr)
  
              if (arrayatual in json[N]){ // cria elemento com conteudo
                  let texto = document.createElement('h7')
                  const td = document.createElement('td')
                  texto.innerText = json[N][arrayatual] + " "
                  texto.className = `td${num}${N}` 
                  td.appendChild(texto)
                  tr.appendChild(td)
                  if (tipodetabela == "edit") { // cria o botão de editar informação
                      let div = document.createElement("div")
                      td.appendChild(div)
                      div.appendChild(texto)
                      botãoeditar = document.createElement('button')
                      botãoeditar.innerText = "✎"
                      botãoeditar.title = "Editar Conteudo"
                      botãoeditar.id = `elemento${num}${N}` 
                      div.appendChild(botãoeditar)
                      linhas = N
                      espaços = num
                      
                  }
              }else{ // cria elemento sem conteudo
                  const td = document.createElement('td')
                  let texto = document.createElement('h7')
                  texto.innerText = "‎ "
                  texto.className = `td${num}${N}` 
                  td.appendChild(texto)
                  tr.appendChild(td)

                  if (tipodetabela == "edit") { // cria o botão de adicionar informação
                      let div = document.createElement("div")
                      td.appendChild(div)
                      div.appendChild(texto)
                      botãoeditar = document.createElement('button')
                      botãoeditar.innerText = "+"
                      botãoeditar.title = "Adicionar conteudo"
                      botãoeditar.id = `elementosadd${num}${N}` 
                      div.appendChild(botãoeditar)
                      linhas = N
                      espaços = num
                  }
              }   
          }
      }
      if (tipodetabela == "edit") { // cria o botão de adicionar nova linha
        let tr = document.createElement('tr')
        let td = document.createElement('td')
        let botãoadicionar = document.createElement('button')
        botãoadicionar.title = "Adicionar Nova Linha"
        botãoadicionar.innerText = "+"
        botãoadicionar.id = "linhaadd"
        tbody.appendChild(tr)
        tr.appendChild(td)
        td.appendChild(botãoadicionar)
        console.log(espaços,linhas)
      } 
}

window.SalvarArquivo = async function() {
    if (!arquivoSelecionado) {
        console.error('Nenhum arquivo foi selecionado para salvar.')
        return;
    }
    const jsonString = JSON.stringify(json, null, 2)
    const writable = await arquivoSelecionado.createWritable()
    await writable.write(jsonString)
    await writable.close()
}

window.ApertouBotão = function() {
    let quantascabeças = arraychavesusadas.length
    for (let index = 0; index < quantascabeças; index++) {
        let botãocabeça = document.getElementById(`cabeça${index}`)
        console.log(botãocabeça)
    }
}