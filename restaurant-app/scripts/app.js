const tablesList = document.getElementById("tablesList");
const menuList = document.getElementById("menuList");
const searchInput = document.getElementById("searchInput");
const menuSearch = document.getElementById("menuSearch");
const categoryFilter = document.getElementById("categoryFilter");
const modal = document.getElementById("orderModal");
const modalTitle = document.getElementById("modalTitle");
const orderItems = document.getElementById("orderItems");
const closeModalBtn = document.getElementById("closeModalBtn");
const generateBillBtn = document.getElementById("generateBillBtn");

let activeTableId = null;

const renderTables = () => {
    const searchText = searchInput.value.toLowerCase();
    const visibleTables = tables.filter((table) => table.name.toLowerCase().includes(searchText));

    tablesList.innerHTML = "";

    visibleTables.forEach((table) => {
        const card = document.createElement("button");
        card.className = "table-card";

        const itemCount = table.orders.reduce((total, item) => total + item.quantity, 0);
        const total = table.orders.reduce((sum, item) => sum + item.price * item.quantity, 0);

        card.innerHTML = "<div class='table-card-content'>" +
            "<span class='table-name'>" + table.name + "</span>" +
            "<small class='table-meta'>" + (itemCount > 0 ? itemCount + " item(s) • Total: ₹" + total : "Empty") + "</small>" +
            "</div>";

        card.addEventListener("click", () => {
            openTableModal(table.id);
        });

        card.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        card.addEventListener("drop", (event) => {
            event.preventDefault();
            const itemName = event.dataTransfer.getData("text/plain");
            addItemToTable(table.id, itemName);
        });

        tablesList.appendChild(card);
    });
};

const renderMenu = () => {
    const searchText = menuSearch.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    menuList.innerHTML = "";

    menuItems.forEach((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchText);
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

        if (!matchesSearch || !matchesCategory) {
            return;
        }

        const card = document.createElement("div");
        card.className = "menu-item";
        card.setAttribute("draggable", "true");
        card.innerHTML = "<h3>" + item.name + "</h3><p>" + item.category + "</p><strong>₹" + item.price + "</strong>";

        card.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", item.name);
        });

        menuList.appendChild(card);
    });
};

const addItemToTable = (tableId, itemName) => {
    const table = tables.find((item) => item.id === tableId);
    const menuItem = menuItems.find((item) => item.name === itemName);

    if (!table || !menuItem) {
        return;
    }

    const existingOrder = table.orders.find((order) => order.name === itemName);

    if (existingOrder) {
        existingOrder.quantity += 1;
    } else {
        table.orders.push({ name: itemName, price: menuItem.price, quantity: 1 });
    }

    renderTables();

    if (activeTableId === tableId) {
        renderTableModal(tableId);
    }
};

const openTableModal = (tableId) => {
    activeTableId = tableId;
    renderTableModal(tableId);
    modal.classList.add("show");
};

const renderTableModal = (tableId) => {
    const table = tables.find((item) => item.id === tableId);

    if (!table) {
        return;
    }

    modalTitle.textContent = table.name;

    if (table.orders.length === 0) {
        orderItems.innerHTML = "<p class='empty'>No food added yet.</p>";
        return;
    }

    let total = 0;
    let html = "";

    table.orders.forEach((order) => {
        total += order.price * order.quantity;
        html += "<div class='order-row'>" +
            "<span>" + order.quantity + " x " + order.name + "</span>" +
            "<div class='order-controls'>" +
            "<button class='qty-btn' data-action='decrease' data-name='" + order.name + "'>-</button>" +
            "<button class='qty-btn' data-action='increase' data-name='" + order.name + "'>+</button>" +
            "<button class='delete-btn' data-action='delete' data-name='" + order.name + "'>Delete</button>" +
            "</div>" +
            "<strong>₹" + (order.price * order.quantity) + "</strong>" +
            "</div>";
    });

    html += "<div class='order-total'>Total: ₹" + total + "</div>";
    orderItems.innerHTML = html;

    const controlButtons = orderItems.querySelectorAll("button");
    controlButtons.forEach((button) => {
        button.addEventListener("click", () => {
            updateOrderItem(table.id, button.getAttribute("data-name"), button.getAttribute("data-action"));
        });
    });
};

const updateOrderItem = (tableId, itemName, action) => {
    const table = tables.find((item) => item.id === tableId);

    if (!table) {
        return;
    }

    const order = table.orders.find((item) => item.name === itemName);

    if (!order) {
        return;
    }

    if (action === "increase") {
        order.quantity += 1;
    } else if (action === "decrease") {
        order.quantity -= 1;
        if (order.quantity <= 0) {
            table.orders = table.orders.filter((item) => item.name !== itemName);
        }
    } else if (action === "delete") {
        table.orders = table.orders.filter((item) => item.name !== itemName);
    }

    renderTables();
    renderTableModal(tableId);
};

const generateBill = (tableId) => {
    const table = tables.find((item) => item.id === tableId);

    if (!table) {
        return;
    }

    let total = 0;
    table.orders.forEach((order) => {
        total += order.price * order.quantity;
    });

    table.orders = [];
    renderTables();
    renderTableModal(tableId);
    alert("Bill for " + table.name + "\nTotal: ₹" + total);
    modal.classList.remove("show");

};

searchInput.addEventListener("input", renderTables);
menuSearch.addEventListener("input", renderMenu);
categoryFilter.addEventListener("change", renderMenu);
closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("show");
});

generateBillBtn.addEventListener("click", () => {
    generateBill(activeTableId);
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});

renderTables();
renderMenu();
