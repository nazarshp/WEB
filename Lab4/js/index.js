const createShoeDiv = document.getElementById("create_shoe_div");
const leftBlock = document.getElementById("left_block");
const rightBlock = document.getElementById("right_block");
const createShoeBlock = document.getElementById("create_shoe_block");

const cancelCreateShoeButton = document.getElementById("cancel_create_shoe_button");

const createShoeTitle = document.getElementById("create_shoe_title");
const editShoeTitle = document.getElementById("edit_shoe_title");

const cardEditButtons = document.getElementsByClassName("card_edit_button");
const cardDeleteButton = document.getElementById("card_delete_button");

const editButton = document.getElementById("edit_shoe_button");

const createButton = document.getElementById("create_shoe_button");
const searchButton = document.getElementById("search_button");
const cancelSearchButton = document.getElementById("cancel_search_button");
const sortBySizeAscButton = document.getElementById("sort_by_size_asc_button");
const sortBySizeDescButton = document.getElementById("sort_by_size_desc_button");
const searchInput = document.getElementById("search_input_color");

const nameInput = document.getElementById("create_input_name");
const sizeInput = document.getElementById("create_input_size");
const colorInput = document.getElementById("create_input_color");
const priceInput = document.getElementById("create_input_price");
const shoesContainer = document.getElementById("shoes_container");
const totalPriceContainer = document.getElementById("total_price_container");

let shoes = [];
let currentShoes = [];

const addShoe = ({ name, size, color, price }) => {
    const generatedId = uuid.v1();

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

createShoeDiv.addEventListener("click", (event) => {
    event.preventDefault();

    rightBlock.style.display = "none";
    leftBlock.style.display = "none";
    createShoeBlock.style.display = "block";
    createShoeDiv.style.display = "none";
});

cancelCreateShoeButton.addEventListener("click", (event) => {
    event.preventDefault();

    createShoeBlock.style.display = "none";
    rightBlock.style.display = "block";
    leftBlock.style.display = "block";
    createShoeDiv.style.display = "block";
});

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

    createShoeBlock.style.display = "none";
    rightBlock.style.display = "block";
    leftBlock.style.display = "block";
    createShoeDiv.style.display = "block";
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
    const totalPrice = shoes.reduce((accumulator, shoe) => accumulator + parseFloat(shoe.price), 0);
    renderTotalPrice(totalPrice);
};

searchButton.addEventListener("click", (event) => {
    event.preventDefault();

    const foundShoes = shoes.filter(shoe => shoe.color.search(searchInput.value) !== -1);

    renderShoesList(foundShoes);

    currentShoes = foundShoes;
    countTotalPrice(foundShoes);
});

cancelSearchButton.addEventListener("click", (event) => {
    event.preventDefault();

    searchInput.value = "";
    renderShoesList(shoes);

    countTotalPrice(shoes);
    currentShoes = shoes;
});

const getShoeId = (id) => `shoe-${id}`;

const shoeTemplate = ({ id, name, size, color, price }) => `
<li id="${getShoeId(id)}">
<img
<img src="assets/photo.jfif"
    class="card_image" alt="shoe_image">
<div class="card_body">
    <h4 class="card_name">${name}</h4>
    <p class="card_text">Size: ${size}</p>
    <p class="card_text">Color: ${color}</p>
    <p class="card_text">Price: ${price} $</p>
</div>
    <div class="card_buttons">    
        <button onclick="updateShoe('${id}')">Edit</button>     
        <button onclick="deleteShoe('${id}')">Delete</button>   
    </div>  
</li>`;

function deleteShoe(id) {
    console.log(id);
    console.log(shoes);
    for (let i = 0; i < shoes.length; i++) {
        if (shoes[i].id === id) {
            shoes.splice(i, 1);
            break;
        }
    }
    countTotalPrice(shoes);
    renderShoesList(shoes);
}

editButton.addEventListener("click", (event) => {
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

    createShoeBlock.style.display = "none";
    rightBlock.style.display = "block";
    leftBlock.style.display = "block";
    createShoeDiv.style.display = "block";
});

function updateShoe(id) {
    let shoeToUpdate;
    for (let i = 0; i < shoes.length; i++) {
        if (shoes[i].id === id) {
            shoeToUpdate = shoes[i];
            break;
        }
    }

    createShoeBlock.style.display = "block";
    rightBlock.style.display = "none";
    leftBlock.style.display = "none";
    createShoeDiv.style.display = "none";
    createShoeTitle.style.display = "none";
    editShoeTitle.style.display = "block";
    cancelCreateShoeButton.style.display = "none";
    editButton.style.display = "block";
    createButton.style.display = "none";

    nameInput.value = shoeToUpdate.name;
    sizeInput.value = shoeToUpdate.size;
    colorInput.value = shoeToUpdate.color;
    priceInput.value = shoeToUpdate.price;


    deleteShoe(id);
}

const totalPriceTemplate = (totalPrice) => `<h3><b>${totalPrice} $</b></h3>`;

const renderTotalPrice = (totalPrice) => {
    totalPriceContainer.innerHTML = "";
    totalPriceContainer.insertAdjacentHTML(
        "afterbegin",
        totalPriceTemplate(totalPrice)
    );
};

const clearInputs = () => {
    nameInput.value = "";
    sizeInput.value = "";
    colorInput.value = "";
    priceInput.value = "";
};

const addShoeToPage = ({ id, name, size, color, price }) => {
    shoesContainer.insertAdjacentHTML(
        "afterbegin",
        shoeTemplate({ id, name, size, color, price })
    );
};

const getInputValues = () => {
    if (validateInputForms()) {
        return {
            name: nameInput.value,
            size: sizeInput.value,
            color: colorInput.value,
            price: priceInput.value
        }
    };
};

const renderShoesList = (shoes) => {
    shoesContainer.innerHTML = "";
    for (const i in shoes) {
        addShoeToPage(shoes[i]);
    }
};

const validateInputForms = () => {
    if (!nameInput.value.trim().length) {
        alert("Field NAME cannot be empty")
        return false;
    }
    if (!sizeInput.value.trim().length) {
        alert("Field SIZE cannot be empty")
        return false;
    }
    if (!colorInput.value.trim().length) {
        alert("Field COLOR cannot be empty")
        return false;
    }
    if (!priceInput.value.trim().length) {
        alert("Field PRICE cannot be empty")
        return false;
    }
    return true;
};
