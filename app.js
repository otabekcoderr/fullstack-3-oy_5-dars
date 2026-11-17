import { users } from "./data.js";
import { products } from "./data.js";

const tbodyEl = document.querySelector("tbody");
const addBtnEl = document.querySelector(".add-btn");
const userModal = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const userForm = document.querySelector(".user-form");

//section
const userSection = document.querySelector(".user-section");
const productSection = document.querySelector(".product-section");
const usersLink = document.querySelector(".users-link");
const productsLink = document.querySelector(".products-link");

//product section selectors
let userId = null;

//delete function
window.deleteUser = function (id) {
  let findindex = users.findIndex((item) => item.id === id);
  console.log(findindex);
  users.splice(findindex, 1);
  //   localStorage.setItem("usersForm",JSON.stringify(deleteUser))
  updateUI(users);
};

//Update user
window.updateUser = function (id) {
  let user = users.find((item) => item.id == id);
  if (!user) {
    return;
  } else {
    userId = id;
    userForm.firstName.value = user.firstName;
    userForm.lastName.value = user.lastName;
    userForm.email.value = user.email;
    userForm.age.value = user.age;
    userForm.role.value = user.role;
    if (userForm.image) userForm.image.value = user.image || "";
    userModal.classList.remove("hidden");
  }
};

//users
function updateUI(arr) {
  tbodyEl.innerHTML = "";
  arr.forEach((item) => {
    let { id, firstName, lastName, email, age, role, image } = item;
    tbodyEl.innerHTML += `
        <td>${id}</td>
        <td><img src="${image}" alt=""></td>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${email}</td>
        <td>${age}</td>
        <td><span class="role admin">${role}</span></td>
        <td>
        <button onclick = "updateUser(${id})" class="update-btn">Update</button>
        </td>
        <td>
        <button onclick="deleteUser(${id})" class="delete-btn">Delete</button>
        </td>
        </tr>
        `;
  });
}
updateUI(users);

//Form submit for users
userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(userForm);

  let newFormData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    age: formData.get("age"),
    role: formData.get("role"),
    image: formData.get("image"),
  };

  if (userId !== null) {
    let index = users.findIndex((item) => item.id == userId);
    if (index !== -1) {
      users[index] = { id: userId, ...newFormData };
      updateUI(users);
      userModal.classList.add("hidden");
      userForm.reset();
    }
    userId = null;
  } else {
    let newUser = {
      id: users.length === 0 ? 1 : users.at(-1).id + 1,
      ...newFormData,
    };
    users.push(newUser);
    updateUI(users);
    userForm.reset();
    userModal.classList.add("hidden");
  }
});

//Buttons
addBtnEl.addEventListener("click", () => {
  userModal.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  userModal.classList.add("hidden");
});
cancelBtn.addEventListener("click", () => {
  userModal.classList.add("hidden");
});

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    userModal.classList.add("hidden");
  }
});

//products

const ProductsTbody = document.querySelector(".products-tbody");
const addProduct = document.querySelector(".add-product-btn");
const productModal = document.querySelector(".product-overlay");
const cancelProductBtn = document.querySelector(".cancel-product-btn");
const closeProductBtn = document.querySelector(".close-product-btn");
const productForm = document.querySelector(".product-form");

let productId = null;

//Delete
window.deleteProduct = function (id) {
  let findIndex = products.findIndex((item) => item.id == id);
  products.splice(findIndex, 1);
  UpdateProductUI(products);
};

//Update product
window.updateProduct = function (id) {
  let findProduct = products.find((item) => item.id == id);
  if (!findProduct) {
    return;
  }
  productId = id;
  productForm.productName.value = findProduct.productName;
  productForm.category.value = findProduct.category;
  productForm.price.value = findProduct.price;
  productForm.stock.value = findProduct.stock;
  if (productForm.productImage.value)
    productForm.productImage.value = findProduct.image || "";
  productModal.classList.remove("hidden");
};

//Producr print
function UpdateProductUI(arr) {
  ProductsTbody.innerHTML = "";
  products.forEach((item) => {
    let { id, productName, category, price, stock, productImage } = item;
    ProductsTbody.innerHTML += `<td>${id}</td>
        <td><img src="${productImage}" alt=""></td>
        <td>${productName}</td>
        <td>${category}</td>
        <td>${price}</td>
        <td>${stock}</td>
        <td>
        <button onclick = "updateProduct(${id})" class="updateProduct-btn">Update</button></td>
        <td><button onclick="deleteProduct(${id})" class="deleteProduct-btn">Delete</button></td>
        </tr>`;
  });
}
UpdateProductUI(products);

// Add product and update product
productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let ProductForm = new FormData(productForm);
  let newProductForm = {
    productName: ProductForm.get("productName"),
    category: ProductForm.get("category"),
    price: ProductForm.get("price"),
    stock: ProductForm.get("stock"),
    productImage: ProductForm.get("productImage"),
  };

  if (productId !== null) {
    let index = products.findIndex((item) => item.id == productId);
    if (index !== -1) {
      products[index] = { id: productId, ...newProductForm };
    }
    UpdateProductUI(products);
    productModal.classList.add("hidden");
    productId = null;
  } else {
    let newProduct = {
      id: products.length == 0 ? 1 : products.at(-1).id + 1,
      ...newProductForm,
    };
    products.push(newProduct);
  }

  localStorage.setItem("productInfo", products);
  UpdateProductUI(products);
  productForm.reset();
  productModal.classList.add("hidden");
});

// Btn
//modalni ochish
function modalOpen() {
  addProduct.addEventListener("click", (e) => {
    productModal.classList.remove("hidden");
  });
}
modalOpen();

//Modal close
closeProductBtn.addEventListener("click", (e) => {
  productModal.classList.add("hidden");
});
cancelProductBtn.addEventListener("click", () => {
  productModal.classList.add("hidden");
});
document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    productModal.classList.add("hidden");
  }
});

//change section
window.openUser = function () {
  userSection.classList.remove("hidden");
  productSection.classList.add("hidden");
  usersLink?.classList.add("active");
  productsLink?.classList.remove("active");
};

window.openProducts = function () {
  productSection.classList.remove("hidden");
  userSection.classList.add("hidden");
  productsLink?.classList.add("active");
  usersLink?.classList.remove("active");
};
