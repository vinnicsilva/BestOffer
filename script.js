// constantes globais
const searchBarcontent = document.getElementById("searchBarcontent")
const searchBartexto = document.getElementById("searchBartext")
const searchBarbtn = document.getElementById("searchBarbtn")

let items = [];

// função para mudar o placeholder da barra de pesquisa
function changeSearchBarText() {

    const searchBarsuggests = [
        "Ex: Camisa da Seleção Brasileira",
        "Ex: Caneca Branca",
        "Ex: Par de Meias bonitas",
        "Ex: Videogame bem divertido"
    ]

    if (searchBartexto) {
        const indexAleatorio = Math.floor(Math.random() * searchBarsuggests.length);

        searchBartexto.placeholder = 'Pesquisa alguma coisa...' + '(' + searchBarsuggests[indexAleatorio] + ')'
    }
}

// função para resultados de sugestão da barra de pesquisa
function searchBarSuggestions() {

    fetch('results.json') 
        .then((res) => {
            if (!res.ok) {
                throw new Error("Não foi possível encontrar o arquivo results.json");
            }
            return res.json();
        })
        .then((produtos) => {
            items = produtos.map(produto => produto.nome);
            console.log("Produtos carregados com sucesso:", items);
        })
        .catch(error => console.error("Erro ao carregar o JSON:", error));
}

window.onload = () => {
    changeSearchBarText();
    searchBarSuggestions();
}

// timer para mudar o texto na barra de pesquisa
setInterval(changeSearchBarText, 5000);

// input da barra de pesquisa
searchBartexto.oninput = () => {
    searchBarcontent.innerHTML = "";

    const valorInput = searchBartexto.value;

    if (searchBartexto.value.trim() === "") return;

    items
        .filter((item) => 
        item.toLowerCase().includes(valorInput.toLowerCase())
    )
    .forEach((item) => searchBarSuggestionsHTML(item, valorInput));
}

// sugestões da barra de pesquisa qdo vc digita algo
function searchBarSuggestionsHTML(item, termoDigitado) {
    const div = document.createElement("div");

    if (termoDigitado) {
        const regex = new RegExp(`(${termoDigitado})`, "gi");
        const textoComNegrito = item.replace(regex, "<strong>$1</strong>");
        
        div.innerHTML = textoComNegrito;
    } else {
        div.innerHTML = item;
    }

    searchBarcontent.append(div);
}

// função que agora gerencia a pesquisa
function startResearch() {
    const termo = searchBartexto.value.trim();
    
    if (termo === "") return;

    searchBarcontent.innerHTML = "";

    const loadingDiv = document.createElement("div");
    loadingDiv.className = "search-loading";
    
    loadingDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Buscando os melhores preços para "${termo}"...`;
    
    searchBarcontent.append(loadingDiv);

    setTimeout(() => {
        loadingDiv.innerHTML = `<i class="fa-solid fa-check"></i> Pronto! (Espere a atualização do Webscrapping :) )`;
    }, 3000);

}

// para rodar a pesquisa
searchBarbtn.addEventListener("click", startResearch);

searchBartexto.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        startResearch();
    }
});