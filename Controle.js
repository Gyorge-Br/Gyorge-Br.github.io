const botaoupl = document.getElementById('upl')
const botaosav = document.getElementById('sav')
const botãomodo = document.getElementById('modo')
const botãomodorapido = document.getElementById('modorapido')
const botãonew = document.getElementById('new')
const botãoprint = document.getElementById('print')
const botãoarquivo = document.getElementById('arquivo')

botaoupl.addEventListener("click", async function(){
    await window.CarregarArquivo()
    window.CriarBase()
    window.CarregarTabela("read")
    await window.CarregarTabela("edit")
    window.ApertouBotão()
})

botaosav.addEventListener("click", async function(){
    await window.SalvarArquivo()
})

botãomodo,botãomodorapido.addEventListener('click', function (){
    let editor = document.getElementById("Conteudo")
    let conteudo = document.getElementById("Editor")

    if (conteudo.style.display === "block") {
        botãomodo.innerText = "Modo: Visualizar"
        botãomodorapido.innerText = "🔍"
        conteudo.style.display = "none"
        editor.style.display = "block"
    } else {
        botãomodo.innerText = "Modo: Editar"
        botãomodorapido.innerText = "✎"
        editor.style.display = "none"
        conteudo.style.display = "block"
    }
})

botãonew.addEventListener('click', async function(){
    if (json){
        let resposta = confirm("Isso exluira sua tabela atual, tem certeza que deseja proseguir?")
        if (resposta){
            json = [{"Ordem":["cabeça1","cabeça2","cabeça3"]},{"cabeça1":"Elemento11","cabeça2":"Elemento12","cabeça3":"Elemento13"},{"cabeça1":"Elemento21","cabeça2":"Elemento22","cabeça3":"Elemento23"},{"cabeça1":"Elemento31","cabeça2":"Elemento32","cabeça3":"Elemento33"}]
            alert("Tabela criada com sucesso!")
        }
        arquivoSelecionado = null   
    }else {
        json = [{"Ordem":["Coluna1","Coluna2","Coluna3"], "Nome": "Exemplo1"},{"Coluna1":"Elemento11","Coluna2":"Elemento12","Coluna3":"Elemento13"},{"Coluna1":"Elemento21","Coluna2":"Elemento22","Coluna3":"Elemento23"},{"Coluna1":"Elemento31","Coluna2":"Elemento32","Coluna3":"Elemento33"}]
        alert("Tabela criada com sucesso!")
        arquivoSelecionado = null   
    }
    window.CriarBase()
    window.CarregarTabela("read")
    await window.CarregarTabela("edit")
    window.ApertouBotão()

})

botãoprint.addEventListener('click', async function() {
    let elemento = document.querySelector("#Conteudo")
    let table = elemento.querySelector('table')
    if (table) {
        if (elemento.style.display == "none") {
            await botãomodo.click()
            await print(table)
            await botãomodo.click()
        }else{
            print(table)
        }
    }else {
        alert("Nenhuma tabela Carregada ou Criada")
    }
} )

botãoarquivo.addEventListener("click", function() {
    const div = document.querySelector("#arquivodiv")
    const divstyle = div.style
    if (divstyle.display == "flex") {
        divstyle.display = "none"
    }else {
        divstyle.display = "flex"
    }

    div.addEventListener('mouseleave', function() {
        divstyle.display = "none"
    })
} )

window.addEventListener('beforeunload', async function(e){
    if (json) {
        if (arquivoSelecionado){
            const arquivo = await arquivoSelecionado.getFile()
    
            const conteudo = await arquivo.text()
            jsonarquivo = JSON.parse(conteudo)
            if (json != jsonarquivo) {
                e.preventDefault()  
                e.returnValue = ''          
            }
        }else {
            e.preventDefault()
            e.returnValue = ''
        }
    }
})

