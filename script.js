
function changeSearchBarText() {
    const searchBartexto = document.getElementById("searchBartext")

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

window.onload = changeSearchBarText;

setInterval(changeSearchBarText, 5000);