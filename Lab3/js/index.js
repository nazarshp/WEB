import {
    addShoeToPage,
    clearInputs,
    getInputValues,
    renderShoesList,
    renderTotalPrice
} from "./dom_util.js";

const createButton = document.getElementById("create_button");//повертає html в js
const sortBySizeAscButton = document.getElementById("sort_by_size_asc_button");
const sortBySizeDescButton = document.getElementById("sort_by_size_desc_button");
const searchButton = document.getElementById("search_button");
const cancelSearchButton = document.getElementById("cancel_search_button");
const searchInput = document.getElementById("search_input_color");

let shoes = [];
let currentShoes = [];

const addShoe = ({ name, size, color, price }) => {
    const generatedId = uuid.v1();//генерує рандомні ід

    const newShoe = {
        id: generatedId,
        name,
        size,
        color,
        price
    }

    shoes.push(newShoe);
    currentShoes = shoes;
    addShoeToPage(newShoe);
}

createButton.addEventListener("click", (event) => {
    event.preventDefault();

    const { name, size, color, price } = getInputValues();

    clearInputs();

    addShoe({
        name,
        size,
        color,
        price
    });

    countTotalPrice(shoes);
    currentShoes = shoes;
});

sortBySizeDescButton.addEventListener("click", (event) => {
    event.preventDefault();

    const sortedShoes = shoes.sort((shoe1, shoe2) => {
        return shoe1.size - shoe2.size;
    });

    renderShoesList(sortedShoes);
    currentShoes = sortedShoes;
});

sortBySizeAscButton.addEventListener("click", (event) => {
    event.preventDefault();

    const sortedShoes = shoes.sort((shoe1, shoe2) => {
        return shoe2.size - shoe1.size;
    });

    renderShoesList(sortedShoes);
    currentShoes = sortedShoes;
});

const countTotalPrice = (shoes) => {
    const totalPrice = shoes.reduce((accumulator, shoe) => accumulator + parseInt(shoe.price), 0);
    renderTotalPrice(totalPrice);
}

searchButton.addEventListener("click", (event) => {
    event.preventDefault();

    const searchedShoes = shoes.filter(shoe => shoe.color.search(searchInput.value) !== -1);

    renderShoesList(searchedShoes);

    currentShoes = searchedShoes;
    countTotalPrice(searchedShoes);
});

cancelSearchButton.addEventListener("click", (event) => {
    event.preventDefault();

    searchInput.value = "";
    renderShoesList(shoes);

    countTotalPrice(shoes);
    currentShoes = shoes;
});

