let json = null
let arquivoSelecionado = null
let linhas = 0
let espaços = 0 
let arraychavesusadas

window.CriarBase = function (){ // função para criar a base da tabla
    const conteudo = document.getElementById('Conteudo')
    conteudo.innerText = ""
    const tableread = document.createElement('table')
    tableread.id = "read"
    const theadread = document.createElement('thead')
    tableread.appendChild(theadread)
    const tbodyread = document.createElement('tbody')
    tableread.appendChild(tbodyread)
    conteudo.appendChild(tableread)

    const editor = document.getElementById('Editor')
    editor.innerText = ""
    const tableedit = document.createElement('table')
    tableedit.id = "edit"
    const theadedit = document.createElement('thead')
    tableedit.appendChild(theadedit)
    const tbodyedit = document.createElement('tbody')
    tableedit.appendChild(tbodyedit)
    editor.appendChild(tableedit)
}

window.CarregarArquivo = async function () { // função de carregar arquivo
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

window.CarregarTabela = async function(tipodetabela){ // função de carregar table apartir do arquivo
    const table = document.getElementById(tipodetabela)
    const thead = table.querySelector('thead')
    const tbody = table.querySelector('tbody')

    thead.innerHTML = ''
    tbody.innerHTML = ''
    arraychavesusadas = json[0].Ordem

        for (let num = 0; num < arraychavesusadas.length; num++) { // loop para adicionar as cabeças da "Ordem"
            const cabeça = document.createElement('th')
            let chaveatual = arraychavesusadas[num]
            let botãoeditar
            let botãoremover
            let botãoA
            let botãoB
            let texto = document.createElement("h7")

            texto.innerText = chaveatual
            cabeça.appendChild(texto)

            if (tipodetabela == "edit") { // cria o botão de editar e remover a coluna
                let botoes = document.createElement('div')
                let posisão = document.createElement('div')
                let div = document.createElement("div")

                div.appendChild(texto)
                
                botãoeditar = document.createElement('button')
                botãoeditar.innerText = "✎"
                botãoeditar.title = "Editar Conteudo"
                botãoeditar.id = `cabeça${num}` 
                botoes.appendChild(botãoeditar)
                
                botãoremover = document.createElement('button')
                botãoremover.innerText = "🗑️"
                botãoremover.title = "Remover Conteudo"
                botãoremover.id = `cabeçaremove${num}` 
                botoes.appendChild(botãoremover)

                botãoA = document.createElement('button')
                botãoA.innerText = "<"
                botãoA.title = "Mover Conteudo"
                botãoA.id = `cabeça<${num}` 
                posisão.appendChild(botãoA)

                botãoB = document.createElement('button')
                botãoB.innerText = ">"
                botãoB.title = "Mover Conteudo"
                botãoB.id = `cabeça>${num}` 
                posisão.appendChild(botãoB)

                div.appendChild(botoes)
                div.appendChild(posisão)
                cabeça.appendChild(div)
            }

            cabeça.className = chaveatual
            thead.appendChild(cabeça)
        }

    if (tipodetabela == "edit") {
        let th = document.createElement('th') // cria o botão de adicionar nova coluna
        let botãoadicionar = document.createElement('button')
        botãoadicionar.title = "Adicionar Nova Coluna"
        botãoadicionar.innerText = "+"
        botãoadicionar.id = "cabeçaadd"
        botãoadicionar.className = "add"
        thead.appendChild(th)
        th.appendChild(botãoadicionar)
    }

    for (let N = 1;N <json.length;N++) { // cria cada linha de informação
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
                    let botoes = document.createElement('div')
                    let div = document.createElement("div")

                    div.id = "div"

                    botãoeditar = document.createElement('button')
                    botãoeditar.innerText = "✎"
                    botãoeditar.title = "Editar Conteudo"
                    botãoeditar.id = `elemento${num}${N}` 
                    botoes.appendChild(botãoeditar)
                      
                    botãoremover = document.createElement('button')
                    botãoremover.innerText = "🗑️"
                    botãoremover.title = "Remover Conteudo"
                    botãoremover.id = `elementoremove${num}${N}` 
                    botoes.appendChild(botãoremover)

                    td.appendChild(div)
                    div.appendChild(texto)
                    div.appendChild(botoes)

                    linhas = N
                    espaços = num
                      
                }
            }else{ // cria elemento sem conteudo
                const td = document.createElement('td')
                let texto = document.createElement('h7')
                texto.innerText = "‎"
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
                    botãoeditar.className = "add"
                    div.appendChild(botãoeditar)
                    linhas = N
                    espaços = num
                }
            }   
        }

        if (tipodetabela == "edit") {
            let td = document.createElement('td')
            botãoremover = document.createElement('button')
            botãoremover.innerText = "🗑️"
            botãoremover.title = "Remover Linha"
            botãoremover.id = `linharemove${N}` 
            botãoremover.className = "add"
            td.appendChild(botãoremover)
            tr.appendChild(td)
        }

    }

    if (tipodetabela == "edit") { // cria o botão de adicionar nova linha
        let tr = document.createElement('tr')
        let td = document.createElement('td')
        let botãoadicionar = document.createElement('button')
        botãoadicionar.title = "Adicionar Nova Linha"
        botãoadicionar.innerText = "+"
        botãoadicionar.id = "linhaadd"
        botãoadicionar.className = "add"
        tbody.appendChild(tr)
        tr.appendChild(td)
        td.appendChild(botãoadicionar)
    } 
}

window.SalvarArquivo = async function() { //função de salvar
    if (!arquivoSelecionado) {
        if (json) {
            let resposta = confirm('Nenhum arquivo foi selecionado para salvar a tabela, deseja criar um novo?')
            
            if (resposta){
                    // Pede ao usuário para escolher um local para salvar o arquivo
    arquivoSelecionado = await window.showSaveFilePicker({
        suggestedName: 'meuArquivo.json',
        types: [
            {
                description: 'Arquivos JSON',
                accept: { 'application/json': ['.json'] },
            },
        ],
    })
    const writableStream = await novoArquivo.createWritable()
    await writableStream.write(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
    await writableStream.close()
    console.log('Arquivo salvo com sucesso!')
            }
        }else {
            alert("Nenhuma tabela encontrada!")
        }
        return
    }
    const jsonString = JSON.stringify(json, null, 2)
    const writable = await arquivoSelecionado.createWritable()
    await writable.write(jsonString)
    await writable.close()
    alert("Arquivo Salvo!")
}

window.DeletarTabela = function(tipodetabela) { // Deleta os elementos HTML da tabela
    const table = document.getElementById(tipodetabela)
    const thead = table.querySelector('thead')
    const tbody = table.querySelector('tbody')
    delete thead
    delete tbody
}

window.RecarregarTabela = function (mensagem) { // Recarrega a tabela apartir do json atual
    window.DeletarTabela("read")
    window.DeletarTabela("edit")
    window.CriarBase()
    window.CarregarTabela("read")
    window.CarregarTabela("edit")
    if (mensagem) {
        alert(mensagem)
    }
    window.ApertouBotão()
}

window.ApertouBotão = function() { // função de quando cada botão do editor é apertado

    for (let index = 0; index < arraychavesusadas.length; index++) { // loop para definir botão para editar cabeças
        let botãocabeça = document.getElementById(`cabeça${index}`)

        botãocabeça.addEventListener('click', function(){
            const textoatual = botãocabeça.parentElement.parentElement.querySelector('h7').innerText
            let resposta = prompt(`Escolha um novo nome para '${textoatual}':`)
            
            if (resposta) {
                for (let cadajson = 0; cadajson < json.length; cadajson++) {
                    let cabeçaatual = arraychavesusadas.indexOf(textoatual)
                    if (json[cadajson][textoatual]) {
                        json[cadajson][resposta] = json[cadajson][textoatual]
                        delete json[cadajson][textoatual]
                    }
                    arraychavesusadas[cabeçaatual] = resposta
                }
                window.RecarregarTabela("Item editado com sucesso")
            }else {
                alert("Escreva algo primeiro!")
            }
            
        })
    }

    for (let index = 0; index < arraychavesusadas.length; index++) { // loop para definir botão para remover cabeças
        let botãocabeça = document.getElementById(`cabeçaremove${index}`)

        botãocabeça.addEventListener('click', function(){
            const textoatual = botãocabeça.parentElement.parentElement.querySelector('h7').innerText
            let resposta = confirm(`Tem certeza que deseja excluir '${textoatual}' permanentemente?`)

            if (resposta) {
                arraychavesusadas.splice(arraychavesusadas.indexOf(textoatual),1)
                for (let cadajson = 0; cadajson < json.length; cadajson++) {
                    delete json[cadajson][textoatual]
                }
                window.RecarregarTabela("Item removido com sucesso")
            }else {
                alert("Elemento mantido!")
            }

        })
    }

    for (let N = 1; N < json.length; N++) { // Loop para definir botão de editar cada elemento
        let linha = json[N]
        let chaves = Object.keys(linha)
        for (let num = 0; num < arraychavesusadas.length; num++) { // Loop para cada elemento de uma linha
            let botãoeditar = document.getElementById(`elemento${num}${N}`)

            if (botãoeditar){
                botãoeditar.addEventListener('click', function(){
                    const textoatual = botãoeditar.parentElement.parentElement.querySelector('h7').innerText
                    let resposta = prompt(`Escolha um novo conteudo para substituir '${textoatual}':`)
    
                    if (resposta) {
                        let Posição
                        let chave
    
                        for (let i = 0; i < chaves.length; i++) {
                            chave = chaves[i]
                            if (linha[chave] === textoatual) {
                                Posição = i
                                break
                            }
                        }
    
                        linha[chave] = resposta
                        window.RecarregarTabela("Item editado com sucesso")
                    }else {
                        alert("Escreva algo primeiro!")
                    }
                })
            }
        }
        
    }

    for (let N = 1; N < json.length; N++) { // Loop para definir botão de apagar cada elemento
        let linha = json[N]
        let chaves = Object.keys(linha)
        for (let num = 0; num < arraychavesusadas.length; num++) { // Loop para cada elemento de uma linha
            let botãoeditar = document.getElementById(`elementoremove${num}${N}`)

            if (botãoeditar) {
                botãoeditar.addEventListener('click', function(){
                    const textoatual = botãoeditar.parentElement.parentElement.querySelector('h7').innerText
                    let resposta = confirm(`Tem certeza que deseja excluir '${textoatual}' permanentemente?`)
    
                    if (resposta) {
                        let Posição
                        let chave
    
                        for (let i = 0; i < chaves.length; i++) {
                            chave = chaves[i]
                            if (linha[chave] === textoatual) {
                                Posição = i
                                break
                            }
                        }
    
                        delete linha[chave]
                        window.RecarregarTabela("Item removido com sucesso")
                    }else {
                        alert("Elemento mantido!")
                    }
                })
            }
        }  
    }

    for (let N = 1; N < json.length; N++) { // Loop para adicionar um elemento
        let linha = json[N]
        for (let num = 0; num < arraychavesusadas.length; num++) { // Loop para cada linha
            let botãoadicionar = document.getElementById(`elementosadd${num}${N}`)

            if (botãoadicionar) {
                botãoadicionar.addEventListener('click', function(){
                    let resposta = prompt(`Escolha um novo conteudo:`)
    
                    if (resposta) {
                        let chave = arraychavesusadas[num]

                        linha[chave] = resposta
                        window.RecarregarTabela("Item adicionado com sucesso")
                    }else {
                        alert("Escreva algo primeiro!")
                    }
                })
            }
        }
        
    }

    (function() { // Função para o botão de adicionar cabeça
        const cabeçaadd = document.getElementById("cabeçaadd")
        cabeçaadd.addEventListener('click', function(){
            let resposta = prompt(`Escolha o nome da nova coluna:`)
            if (resposta) {
                let cabeças = json[0].Ordem
    
                cabeças.push(resposta)
                window.RecarregarTabela("Coluna adicionado com sucesso")
            }else {
                alert("Escreva algo primeiro!")
            }
        })
    })();
    
    (function() { // Função para o botão de adicionar linha
        const linhaadd = document.getElementById("linhaadd")
        linhaadd.addEventListener('click', function(){
            let resposta = confirm("Adicionar uma nova linha?")
            if (resposta) {
                json.push({})
                window.RecarregarTabela("Linha adicionado com sucesso")
            }
        })
    })();

    for (let N = 1; N < json.length; N++) { // Loop para o botão de remover linha
        const linharemove = document.getElementById(`linharemove${N}`)
        linharemove.addEventListener('click', function(){
            let resposta = confirm("Tem Certeza que deseja remover essa linha permanentemente?")
            if (resposta) {
                json.splice(N, 1)
                window.RecarregarTabela("Linha removida com sucesso")
            }
        })
    }

    for (let index = 0; index < arraychavesusadas.length; index++) { // loop para definir botão de mover cabeças <
        let botãocabeça = document.getElementById(`cabeça<${index}`)

        botãocabeça.addEventListener('click', function(){
            let elemento = json[0].Ordem.splice(index, 1)[0]
            json[0].Ordem.splice(index - 1, 0, elemento)
            window.RecarregarTabela()
        })
    }

    for (let index = 0; index < arraychavesusadas.length; index++) { // loop para definir botão de mover cabeças >
        let botãocabeça = document.getElementById(`cabeça>${index}`)

        botãocabeça.addEventListener('click', function(){
            let elemento = json[0].Ordem.splice(index, 1)[0]
            json[0].Ordem.splice(index + 1, 0, elemento)
            window.RecarregarTabela()
        })
    }
}