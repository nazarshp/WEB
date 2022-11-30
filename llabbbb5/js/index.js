// ------------ Toggle pages -----------

const body = document.body;
const menuItems = document.querySelectorAll('.menu__link');
const myShoes = document.getElementById('my_shoes');
const createShoe = document.getElementById('create_shoe');
const createPage = document.getElementById('create__page');
const createTitle = document.querySelector('.create__title');
const editButton = document.getElementById('edit_button');

const openMainPage = () => {
    switchMenuItem(myShoes);
    createPage.classList.add('hidden');
    body.classList.remove('lock');
    createShoe.innerHTML = 'Create Shoe';
};

const openCreatePage = () => {
    switchMenuItem(createShoe);
    createPage.classList.remove('hidden');
    body.classList.add('lock');
    createPage.scrollTo(top);
    submitButton.classList.remove('hidden');
    editButton.classList.add('hidden');
    clearInputValues();
    createTitle.innerHTML = 'Create shoe';
};

const openEditPage = () => {
    switchMenuItem(createShoe);
    createPage.classList.remove('hidden');
    body.classList.add('lock');
    createPage.scrollTo(top);
    submitButton.classList.add('hidden');
    editButton.classList.remove('hidden');
    createTitle.innerHTML = 'Edit shoe';
    createShoe.innerHTML = 'Edit shoe';
};

const switchMenuItem = (menuItem) => {
    menuItems.forEach((item) => {
        item.classList.remove('active_menu__item');
    });
    menuItem.classList.add('active_menu__item');
};

createPage.addEventListener("keydown", (event) => {
    if (event.target.closest('.create_shoe__form') &&
        event.code === 'Enter') {
        console.log(event.code);
        event.preventDefault();
    }
})

myShoes.addEventListener("click", (event) => {
    openMainPage();
});

createShoe.addEventListener("click", (event) => {
    openCreatePage();

});

// ------------ Create shoe -------------

const nameInput = document.getElementById("name_input");
const sizeInput = document.getElementById("shoe-size_input");
const colorInput = document.getElementById("shoe-color_input");
const priceInput = document.getElementById("price_input");
const submitButton = document.getElementById('submit_button');
const shoeContainer = document.getElementById("shoes_list");

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (validateInputs()) {
        let model = {
            name: nameInput.value,
            size: sizeInput.value,
            color: colorInput.value,
            price: priceInput.value
        }
        postShoe(model);
        clearInputValues();
        refetchAllShoes(shoesList);
        openMainPage();
    } else {
        getAlert();
    }
});

const getInputValues = () => {
    return {
        name: nameInput.value,
        size: sizeInput.value,
        color: colorInput.value,
        price: priceInput.value
    };
};

const clearInputValues = () => {
    nameInput.value = "";
    sizeInput.value = "";
    colorInput.value = "";
    priceInput.value = "";
};

let shoesList = [];
let id = 0;


const addShoeToBoard = ({ id, name, size, color, price }) => {
    shoeContainer.insertAdjacentHTML(
        "beforeend",
        itemTemplate({ id, name, size, color, price })
    );
};



const itemTemplate = ({ id, name, size, color, price }) => `
<li class="shoe_item">
    <h4>${name}</h4>
    <div class="shoe_item__item">
        <h5 class="shoe__characteristic">Size:</h5>
        <p class="shoe__text">${size}</p>
    </div>
    <div class="shoe_item__item">
        <h5 class="shoe__characteristic">Color:</h5>
        <p class="shoe__text">${color}</p>
    </div>
    <div class="animal_item__item">
        <h5 class="shoe__characteristic">Price:</h5>
        <p class="shoe__text">${price}</p>
    </div>
    <div class="edit_button__wrapper">
        <button id="${id}" class="shoe_button edit_button">
            Edit
        </button>
    </div>
    <div class="delete_button__wrapper">
        <button id="${id}" class="shoe_button delete_button">
            Delete
        </button>
    </div>
</li>`;

const renderShoesBoard = (items) => {
    shoeContainer.innerHTML = "";
    for (const item of items) {
        addShoeToBoard(item);
    }
};

// ---------- Edit shoe -----------

let currentId;

shoeContainer.addEventListener("click", (event) => {
    if (event.target.closest('.edit_button')) {
        openEditPage();

        currentId = event.target.getAttribute('id');
        console.log(currentId)
        fillInValuesToEdit(currentId);
    }
});

const fillInValuesToEdit = (id) => {
    const itemToEdit = shoesList.find((item) => {
        return item.id == id;
    })
    console.log(id)
    nameInput.value = itemToEdit.name;
    sizeInput.value = itemToEdit.size;
    colorInput.value = itemToEdit.color;
    priceInput.value = itemToEdit.price;
};

editButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (validateInputs()) {
        let model = {
            name: nameInput.value,
            size: sizeInput.value,
            color: colorInput.value,
            price: priceInput.value
        }
        updateShoe(currentId, model);
        clearInputValues();
        refetchAllShoes(shoesList);
        openMainPage();
    } else {
        getAlert();
    }
});





shoeContainer.addEventListener("click", (event) => {
    if (event.target.closest('.delete_button')) {
        deleteShoe(event.target.getAttribute('id'));

        refetchAllShoes();
    }
});



// ---------- Input validation ----------



const validateInputs = () => {
    if (nameInput.value === '' || priceInput.value === '') {
        return alert()
    } else {
        return true
    }
}


// ---------- Manage shoes ------------

const searchButton = document.getElementById('search_button');
const cancelSearchButton = document.getElementById("cancel_search_button");
const sortBySizeAscButton = document.getElementById("sort_by_size_asc_button");
const sortBySizeDescButton = document.getElementById("sort_by_size_desc_button");
const searchInput = document.getElementById("search_input_color");

const totalPriceContainer = document.getElementById("total_price_container");

searchButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const foundList = shoesList.filter(
        (item) => item.color.toLowerCase().includes(searchInput.value.toLowerCase())
    );

    renderShoesBoard(foundList);
    countTotalPrice(foundList);
});

cancelSearchButton.addEventListener("click", (event) => {
    event.preventDefault();

    searchInput.value = "";

    refetchAllShoes();
});


sortBySizeDescButton.addEventListener("click", async (event) => {
    event.preventDefault();


    const allShoes = await getAllShoes()

    const sortedShoes = allShoes.sort((shoe1, shoe2) => {
        return shoe1.size - shoe2.size;
    });

    renderShoesBoard(sortedShoes);
    countTotalPrice(sortedShoes);
});

sortBySizeAscButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const allShoes = await getAllShoes()

    console.log(allShoes);

    const sortedShoes = allShoes.sort((shoe1, shoe2) => {
        return shoe2.size - shoe1.size;
    });

    renderShoesBoard(sortedShoes);
    countTotalPrice(sortedShoes);
});

const countTotalPrice = (shoes) => {
    let totalPrice = 0;
    for (const i in shoes) {
        totalPrice += shoes[i].price;
    }
    totalPrice.innerHTML = `${totalPrice}`
};


const BASE_URL = "http://localhost:5151";
const RESOURSE_URL = `${BASE_URL}/shoe`;

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
    try {
        const reqParams = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (body) {
            reqParams.body = JSON.stringify(body);
        }

        let arr = await fetch(`${RESOURSE_URL}${urlPath}`, reqParams);
        if (method !== "GET") {
            refetchAllShoes()
        }
        return arr
    } catch (error) {
        console.error("HTTP ERROR: ", error);
    }
};


const getAllShoes = async () => {
    const rawResponse = await baseRequest({ method: "GET" });

    return await rawResponse.json();
};

const postShoe = (body) => baseRequest({ method: "POST", body });

const updateShoe = (id, body) => baseRequest({ urlPath: `/${id}`, method: "PUT", body });

const deleteShoe = (id) => baseRequest({ urlPath: `/${id}`, method: "DELETE" });

const refetchAllShoes = async () => {
    const shoes = await getAllShoes();
    shoesList = shoes;
    let totalPrice = 0;
    for (const i in shoesList) {
        totalPrice += shoes[i].price;
    }
    totalPriceContainer.innerHTML = `${totalPrice.toString()}`
    renderShoesBoard(shoesList);
};

refetchAllShoes();

