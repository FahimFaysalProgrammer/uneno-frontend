const handleRegistration = (event) => {
  event.preventDefault();
  //   console.log("hello");
  const username = getValue("username");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const email = getValue("email");
  const password = getValue("password");
  const confirm_password = getValue("confirm_password");
  // console.log({
  //   username,
  //   first_name,
  //   last_name,
  //   email,
  //   password,
  //   confirm_password,
  // });
  const info = {
    username,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  };
  if (password.value == "") {
    password.setCustomValidity("Passwords must not be empty");
  } else if (password === confirm_password) {
    document.getElementById("error").innerText = "";
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      // console.log(info);

      fetch("https://uneno.onrender.com/customer/register/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } else {
      document.getElementById("error").innerText =
        "At least one digit [0-9] At least one lowercase character [a-z] At least one uppercase character [A-Z] At least one special character [*.!@#$%^&(){}[]:;<>,.?/~_+-=|] At least 8 characters in length, but no more than 32.";
    }
  } else {
    document.getElementById("error").innerText = "Passwords Don't Match";
    alert("Passwords Don't Match");
  }
};

const getValue = (id) => {
  const value = document.getElementById(id).value;
  return value;
};

const handleLogin = (event) => {
  event.preventDefault();
  const username = getValue("login-username");
  const password = getValue("login-password");
  // Post Method:
  fetch("https://uneno.onrender.com/customer/login/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("user_id", data.user_id);
      if (data.token && data.user_id) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
        window.location.href = "index.html";
      }
    });
};
