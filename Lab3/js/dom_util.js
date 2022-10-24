const nameInput = document.getElementById("create_input_name");
const sizeInput = document.getElementById("create_input_size");
const colorInput = document.getElementById("create_input_color");
const priceInput = document.getElementById("create_input_price");
const shoesContainer = document.getElementById("shoes_container");
const totalPriceContainer = document.getElementById("total_price_container");

const getShoeId = (id) => `shoe-${id}`;

const shoeTemplate = ({ id, name, size, color, price }) => `
<li id="${getShoeId(id)}">
    <img src="assets/photo.jfif"
        class="card_image" alt="shoe image">
    <div class="card_body">
        <h4 class="card_name">${name}</h4>
        <p class="card_text">Size: ${size}</p>
        <p class="card_text">Color: ${color}</p>
        <p class="card_text">Price: ${price} $</p>
    </div>
</li>`;

const totalPriceTemplate = (totalPrice) => `<h3><b>${totalPrice} $</b></h3>`;

export const renderTotalPrice = (totalPrice) => {
    totalPriceContainer.innerHTML = "";
    totalPriceContainer.insertAdjacentHTML(
        "afterbegin",
        totalPriceTemplate(totalPrice)
    );
};

export const clearInputs = () => {
    nameInput.value = "";
    sizeInput.value = "";
    colorInput.value = "";
    priceInput.value = "";
};

export const addShoeToPage = ({ id, name, size, color, price }) => {
    shoesContainer.insertAdjacentHTML(
        "afterbegin",
        shoeTemplate({ id, name, size, color, price })
    );
};

export const renderShoesList = (shoes) => {
    shoesContainer.innerHTML = "";
    for (const i in shoes) {
        addShoeToPage(shoes[i]);
    }
};

export const getInputValues = () => {
    if (validateInputForms()) {
        return {
            name: nameInput.value,
            size: sizeInput.value,
            color: colorInput.value,
            price: priceInput.value,
        }
    };
};

export const validateInputForms = () => {
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
