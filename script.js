
let productContainer;
let itemNo = -1;
let isUpdating = false;
let cellColors = ["#dddddd","#eeeeee", "#666666"];

let tableRows;

const proName = document.getElementById("product-name");
const proPrice = document.getElementById("product-price");
const proBrand = document.getElementById("product-brand");
const proQuantity = document.getElementById("product-quantity");

const addBtn = document.querySelector(".add-btn");
const table = document.querySelector(".table-container table");
const dataTable = document.querySelector(".table-container table tbody");
const tableContainer = document.querySelector(".message");
const form = document.getElementById("my-form");
const productCountBox = document.querySelector(".product-count span");
const productPriceBox = document.querySelector(".product-price span");

const showProducts = ()=>{
    
    if (productContainer.length == 0){
        tableContainer.classList.remove('hidden-message');
        table.classList.add("hide");
        document.querySelector(".table-container").style.overflowY = "hidden";
        productCountBox.innerHTML = 0;
    } else {

        let productCount = 0;
        let productTotalPrice = 0;
        tableContainer.classList.add('hidden-message');
        table.classList.remove('hide');
        let rows = "";

        for (let i=0; i<productContainer.length; i++){
            rows = rows + "<tr>";
            rows = rows + `<td><span style = "height:80px; overflow:hidden;">${productContainer[i].productName}</td>`;
            rows = rows + `<td>${productContainer[i].productPrice}</td>`;
            rows = rows + `<td>${productContainer[i].productBrand}</td>`;
            rows = rows + `<td>${productContainer[i].productQuantity}</td>`;
            rows = rows + `<td class="btn-cell"><button style="color:red;" id="delete-btn" onclick = deleteProduct(${i})><i class="fa-solid fa-trash"></i></button><button style="color:blue;" id="update-btn" onclick = updateProduct(${i})><i class="fa-solid fa-pen-to-square"></i></button></td>`;
            rows = rows + "</tr>";
            productCount = productCount + Number(productContainer[i].productQuantity);
            productTotalPrice = productTotalPrice + Number(productContainer[i].productPrice)*Number(productContainer[i].productQuantity);
        }

        dataTable.innerHTML = rows;
        productCountBox.innerHTML = productCount;
        // productPriceBox.innerHTML = productTotalPrice;
    }
}

const updateSelectedRow = ()=>{
    for (let i=0; i<tableRows.length; i++){
        if (i==itemNo){
            dataTable.children[i].style.backgroundColor = cellColors[2];
        } else {
            dataTable.children[i].style.backgroundColor = cellColors[i%2];
        }
    }
}

const deleteProduct = (i) => {

    if (!isUpdating){

        // removing the seleted item form local storage
        productContainer.splice(i,1);
        localStorage.setItem('productStorage', JSON.stringify(productContainer));
        addBtn.textContent = "Add";

        // updating the rows after deleting the product
        showProducts();
        itemNo = -1;
    } else {
        alert("While Updating an item record, you can't perform deletion");
    }
}

const updateProduct = (i)=>{

    addBtn.textContent = "Update";
    isUpdating = true;
    showProducts();
    itemNo = i;
    updateSelectedRow();

    // Setting the form fields as the selected element's value
    proName.setAttribute("value",productContainer[i].productName);
    proPrice.setAttribute("value",productContainer[i].productPrice);
    proBrand.setAttribute("value",productContainer[i].productBrand);
    proQuantity.setAttribute("value",productContainer[i].productQuantity);

}

const updateProductInfo = (i)=>{

    let products = {
        productName : proName.value,
        productPrice : proPrice.value,
        productBrand : proBrand.value,
        productQuantity : proQuantity.value
    }

    productContainer[i] = products;
    localStorage.setItem('productStorage', JSON.stringify(productContainer));
    addBtn.textContent = "Add";
    isUpdating = false;
    itemNo = -1;
    updateSelectedRow();
}

const addProducts = ()=>{

    let products = {
        productName : proName.value,
        productPrice : proPrice.value,
        productBrand : proBrand.value,
        productQuantity : proQuantity.value
    }
    productContainer.push(products);
    localStorage.setItem('productStorage', JSON.stringify(productContainer));
}

// Adding events to window and addBtn

addBtn.addEventListener("click", ()=>{
    
    let proNameValue = proName.value;
    let proPriceValue = proPrice.value;
    let proBrandValue = proBrand.value;
    let proQuantityValue = proQuantity.value;

    if (proNameValue == "" || proPriceValue == "" || proBrandValue == "" || proQuantityValue == "" || Number.isNaN(Number(proPriceValue)) || !Number.isInteger(Number(proQuantityValue))){
        alert("Enter Details Again.");
    } else if (addBtn.textContent == "Add"){
        addProducts();
    } else {
        updateProductInfo(itemNo);
    }
    showProducts();
});

window.addEventListener("load", ()=>{
    
    if (localStorage.getItem("productStorage")==null){
        productContainer = [];
    } else {
        productContainer = JSON.parse(localStorage.getItem("productStorage", productContainer));
        showProducts();
    }
    tableRows = document.querySelectorAll("tbody tr");
});