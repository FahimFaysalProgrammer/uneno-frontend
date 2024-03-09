const getparams = () => {
  const param = new URLSearchParams(window.location.search).get("productId");
  //   console.log(param);
  fetch(`https://uneno.onrender.com/product/list/${param}`)
    .then((res) => res.json())
    // .then((data) => console.log(data));
    .then((data) => displayDetails(data));

  fetch(`https://uneno.onrender.com/product/reviews/?product_id=${param}`)
    .then((res) => res.json())
    // .then((data) => console.log(data));
    .then((data) => productReview(data));
};

const displayDetails = (product) => {
  // console.log(product);
  const parent = document.getElementById("product-details");
  const div = document.createElement("div");
  div.innerHTML = `
  <div
  class="gap-5 container m-auto product-detail-container d-flex justify-content-center align-items-center"
>
  <div>
    <img
      style="width: 600px; height: 700px"
      src=${product.image}
      alt=""
    />
  </div>
  <div>
    <h2 style="color: #3a3a3a; font-weight: 800; font-size: 50px">
    ${product.title}
    </h2>
    <p style="color: #979797; font-weight: 400; font-size: 20px">
    ${product.description}
    </p>
    <h2 style="color: #b92d5e; font-weight: 800; font-size: 50px">
      $${product.price}
    </h2>
    <h6 style="color: #3a3a3a; font-weight: 400; font-size: 20px">
    ${product.stock === 0 ? "Out of stock" : `${product.stock} in stock`}
    </h6>
    <h6 style="color: #3a3a3a; font-weight: 400; font-size: 20px">
      Category: <span style="color: #979797">${product.category}</span>
    </h6>
  </div>
</div>
    `;
  parent.appendChild(div);
};

const productReview = (reviews) => {
  reviews.forEach((review) => {
    const parent = document.getElementById("product-details-review");
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
getparams();
