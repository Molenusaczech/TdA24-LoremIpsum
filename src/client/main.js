import "./style.css";

import { setupCounter } from "./counter.js";
import javascriptLogo from "./javascript.svg";
import { JsxTest } from "./component";

import { renderLecturer } from "./pages/lecturer/renderer";
import { lecturerAfter } from "./pages/lecturer/afterRender";
import { defaultLecturer } from "./defaultLecturer";

import { renderMain } from "./pages/main/renderer";
import { mainAfter } from "./pages/main/afterRender";

const currentUrl = window.location.pathname;
console.log(currentUrl);

switch (currentUrl) {

  case "/":
    console.log("home");
    document.getElementById("mainPage").innerHTML = renderMain();
    mainAfter();
    break;
  case "/lecturer":
    document.getElementById("mainPage").innerHTML = renderLecturer(defaultLecturer);
    lecturerAfter();
    break;
}

/*document.getElementById("register-btn").addEventListener("click", () => {
  fetch("/initDb",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({a: 1, b: 2})
  })
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
    });
});

document.getElementById("register-btn").addEventListener("click", () => {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  fetch("/createAccount",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: username, password: password})
  })
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
    });
});

console.log(JsxTest("test"));
document.getElementById("jsx").innerHTML = JsxTest("test2");*/