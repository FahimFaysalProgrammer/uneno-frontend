const handleLogout = () => {
  //   console.log("Logout");
  const token = localStorage.getItem("token");

  fetch("https://uneno.onrender.com/customer/logout", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
    });
};
