const botaoupl = document.getElementById('upl');
const botaosav = document.getElementById('sav');

window.CriarBase()

botaoupl.addEventListener("click", async function(){
    await window.CarregarArquivo()
    window.CarregarTabela("read")
    window.CarregarTabela("edit")
})

botaosav.addEventListener("click", async function(){
    await window.SalvarArquivo()
})

