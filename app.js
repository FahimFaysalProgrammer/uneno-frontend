// alert();
const loadProducts = (search) => {
  document.getElementById("products").innerHTML = "";
  document.getElementById("spinner").style.display = "block";
  console.log(search);
  fetch(
    `https://uneno.onrender.com/product/list/?search=${search ? search : ""}`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      if (data.results.length > 0) {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "none";
        displayProducts(data?.results);
      } else {
        document.getElementById("products").innerHTML = "";
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "block";
      }
    });
};

const displayProducts = (products) => {
  products?.forEach((product) => {
    // console.log(product);
    const parent = document.getElementById("products");
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card" style="min-height: 420px;">
                  <img
                    src=${product.image}
                    class="card-img-top p-2"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5
                      style="color: #9e9e9e; font-size: 18px"
                      class="card-title"
                    >
                    ${product.category}
                    </h5>
                    <h4 style="font-weight: 900">${product.title}</h4>
                    <p
                      style="font-size: 20px; font-weight: 600; color: #b92d5e"
                      class="card-text pt-1"
                    >
                      $${product.price}
                      <button
                        class="btn btn-warning ms-0 text-white fs-5 fw-medium"
                      >
                        <a
                          style="text-decoration: none; color: white"
                          href="productDetails.html?productId=${product.id}"
                          target="_blank"
                          >Buy Now</a
                        >
                      </button>
                    </p>
                  </div>
                </div>
    `;
    parent.appendChild(div);
  });
};

const loadColor = () => {
  fetch("https://uneno.onrender.com/product/color/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((color) => {
        // console.log(color);
        const parent = document.getElementById("color-list");
        const div = document.createElement("div");
        div.innerHTML = `
        <h3 class="" style="padding: 0px 10px 0px 0px">${color.name}</h3>
                  <button
                    style="height: 30px; width: 20px; background-color: ${color.name}"
                    type="button"
                    class="btn rounded"
                    onclick="loadProducts('${color.name}')"
                  ></button>
        `;
        parent.appendChild(div);
      });
    });
};

const loadSize = () => {
  fetch("https://uneno.onrender.com/product/size/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((size) => {
        // console.log(size);
        const parent = document.getElementById("size-list");
        const div = document.createElement("div");
        div.classList.add("form-check");
        div.innerHTML = `
        <input
        class="form-check-input fs-5"
        type="radio"
        name="exampleRadios"
        id="exampleRadios1"
        value="option1"
        style="background-color: rgba(0, 0, 255, 0.784)"
        onclick="loadProducts('${size.name}')"
      />
      <label
        class="form-check-label"
        style="font-size: 23px"
        for="exampleRadios1"
      >
        <span style="font-weight: 600">${size.name}</span>
      </label>
        `;
        parent.appendChild(div);
      });
    });
};

const handleSearch = () => {
  const value = document.getElementById("search").value;
  console.log(value);
  loadProducts(value);
};

const handleKeyDown = (event) => {
  if (event.keyCode === 13) {
    handleSearch();
  }
};

const loadReview = () => {
  fetch("https://uneno.onrender.com/product/reviews/")
    .then((res) => res.json())
    // .then((data) => console.log(data))
    .then((data) => displayReview(data));
};

const displayReview = (reviews) => {
  reviews.forEach((review) => {
    const parent = document.getElementById("review-container");
    const div = document.createElement("div");
    div.classList.add("review-card");
    div.innerHTML = `
    <img src="./Images/dummy.png" alt="" />
    <h4>${review.reviewer}</h4>
    <p>
      ${review.body.slice(0, 100)}
    </p>
    <h6>${review.rating}</h6>
    `;
    parent.appendChild(div);
  });
};

loadProducts();
loadSize();
loadColor();
loadReview();
