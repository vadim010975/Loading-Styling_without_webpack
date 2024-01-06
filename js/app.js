import List from "./List.js";

const url = "http://localhost:7070/films/new";

const container = document.querySelector(".page");

const list = new List(url, container);

list.init();
