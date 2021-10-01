const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let datos = null;

fetch(url).then((res) => {
  res.json().then((json) => {
    datos = json;
    agregarContenido("Burguers", "Burgers");
  });
});

function eliminarContenido() {
  let titulo = document.getElementById("titulo_cat");
  while (titulo.lastElementChild) {
    titulo.removeChild(titulo.lastElementChild);
  }
  let contenido = document.getElementById("contenido");
  while (contenido.lastElementChild) {
    contenido.removeChild(contenido.lastElementChild);
  }
}

function agregarContenido(categoria) {
  eliminarContenido();
  let titulo = document.getElementById("titulo_cat");
  let cat_name = document.createElement("h2");
  cat_name.textContent = categoria;
  cat_name.style.textAlign = "center";
  titulo.appendChild(cat_name);

  let contenido = document.getElementById("contenido");
  for (let i = 0; i < datos.length; i++) {
    if (datos[i].name == categoria) {
      let row;
      for (let j = 0; j < datos[i].products.length; j++) {
        if (j % 4 == 0) {
          row = document.createElement("div");
          row.setAttribute("class", "row");
        }
        let col = document.createElement("div");
        col.setAttribute("class", "col-3 mb-3 d-flex align-items-stretch");
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        card.style.width = "15rem";
        card.style.padding = "2%";
        card.style.margin = "2% 0%";
        let img = document.createElement("img");
        img.setAttribute("class", "card-img-top");
        img.setAttribute("src", datos[i].products[j].image);
        card.appendChild(img);
        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body d-flex flex-column");
        let cardTitle = document.createElement("h5");
        cardTitle.textContent = datos[i].products[j].name;
        card.appendChild(cardTitle);
        let cardText = document.createElement("p");
        cardText.setAttribute("class", "card-text");
        cardText.textContent = datos[i].products[j].description;
        card.appendChild(cardText);
        let cardPrice = document.createElement("p");
        cardPrice.style.fontWeight = "bold";
        cardPrice.textContent = "$" + datos[i].products[j].price;
        card.appendChild(cardPrice);
        let boton = document.createElement("a");
        boton.setAttribute("class", "btn btn-dark mt-auto align-self-start");
        boton.setAttribute("href", "javascript:;");
        boton.setAttribute("id", datos[i].products[j].name);
        boton.textContent = "Add to cart";
        boton.onclick = agregarAlCarrito;
        card.appendChild(boton);
        col.appendChild(card);
        row.appendChild(col);
        if (j % 4 == 0) {
          contenido.appendChild(row);
        }
      }
    }
  }
}

function cargarCompras() {
  eliminarContenido();
  let titulo = document.getElementById("titulo_cat");
  let cat_name = document.createElement("h2");
  cat_name.textContent = "Order detail";
  cat_name.style.textAlign = "center";
  titulo.appendChild(cat_name);

  let contenido = document.getElementById("contenido");
  let tabla = document.createElement("table");
  tabla.setAttribute("class", "table table-striped");
  let header = document.createElement("thead");
  let tr = document.createElement("tr");
  let thItem = document.createElement("th");
  thItem.textContent = "Item";
  tr.appendChild(thItem);
  let thQuantity = document.createElement("th");
  thQuantity.textContent = "Qty.";
  tr.appendChild(thQuantity);
  let thDescription = document.createElement("th");
  thDescription.textContent = "Description";
  tr.appendChild(thDescription);
  let thUnitPrice = document.createElement("th");
  thUnitPrice.textContent = "Unit Price";
  tr.appendChild(thUnitPrice);
  let thAmount = document.createElement("th");
  thAmount.textContent = "Amount";
  tr.appendChild(thAmount);
  let thModify = document.createElement("th");
  thModify.textContent = "Modify";
  tr.appendChild(thModify);
  header.appendChild(tr);
  tabla.appendChild(header);

  let tbody = document.createElement("tbody");
  let contador = 1;
  let total = 0;
  for (let [descripcion, valores] of Object.entries(compras)) {
    let tr = document.createElement("tr");
    let tdItem = document.createElement("td");
    tdItem.textContent = contador;
    contador += 1;
    tr.appendChild(tdItem);
    let tdQuantity = document.createElement("td");
    tdQuantity.textContent = valores["Quantity"];
    tr.appendChild(tdQuantity);
    let tdDescription = document.createElement("td");
    tdDescription.textContent = descripcion;
    tr.appendChild(tdDescription);
    let tdUnitPrice = document.createElement("td");
    tdUnitPrice.textContent = valores["Unit Price"];
    tr.appendChild(tdUnitPrice);
    let tdAmount = document.createElement("td");
    tdAmount.textContent = valores["Amount"].toFixed(2);
    total += valores["Amount"];
    tr.appendChild(tdAmount);
    let tdModify = document.createElement("td");
    let botonMas = document.createElement("button");
    botonMas.setAttribute("class", "btn btn-secondary");
    botonMas.setAttribute("id", descripcion);
    botonMas.textContent = "+";
    botonMas.style.margin = "1%";
    botonMas.onclick = aumentarCantidad;
    tdModify.appendChild(botonMas);
    let botonMenos = document.createElement("button");
    botonMenos.setAttribute("class", "btn btn-secondary");
    botonMenos.setAttribute("id", descripcion);
    botonMenos.textContent = "-";
    botonMenos.style.margin = "1%";
    botonMenos.onclick = disminuirCantidad;
    tdModify.appendChild(botonMenos);
    tr.appendChild(tdModify);
    tbody.appendChild(tr);
  }
  tabla.appendChild(tbody);
  contenido.appendChild(tabla);

  let row = document.createElement("div");
  row.setAttribute("class", "row");
  let col9 = document.createElement("div");
  col9.setAttribute("class", "col-9");
  let h6Total = document.createElement("h6");
  h6Total.textContent = "Total: $" + total.toFixed(2);
  col9.appendChild(h6Total);
  row.appendChild(col9);
  let col3 = document.createElement("div");
  col3.setAttribute("class", "col-3");
  let botonCancel = document.createElement("button");
  botonCancel.setAttribute("class", "btn btn-rojo_claro");
  botonCancel.setAttribute("data-toggle", "modal");
  botonCancel.setAttribute("data-target", "#modalClose");
  botonCancel.textContent = "Cancel";
  col3.appendChild(botonCancel);
  let botonConfirm = document.createElement("button");
  botonConfirm.setAttribute("class", "btn btn-beige");
  botonConfirm.textContent = "Confirm order";
  botonConfirm.onclick = confirmarOrden;
  col3.appendChild(botonConfirm);
  row.appendChild(col3);
  contenido.appendChild(row);
}

let cant_items = 0;
let compras = {};
function agregarAlCarrito(event) {
  let items = document.getElementById("num_items");
  cant_items += 1;
  items.textContent = cant_items + " items";
  if (compras[event.target.id]) {
    compras[event.target.id]["Quantity"] += 1;
    compras[event.target.id]["Amount"] =
      compras[event.target.id]["Quantity"] *
      compras[event.target.id]["Unit Price"];
  } else {
    compras[event.target.id] = {};
    for (let i = 0; i < datos.length; i++) {
      for (let j = 0; j < datos[i].products.length; j++) {
        if (datos[i].products[j].name == event.target.id) {
          compras[event.target.id]["Quantity"] = 1;
          compras[event.target.id]["Unit Price"] = datos[i].products[j].price;
          compras[event.target.id]["Amount"] = datos[i].products[j].price;
        }
      }
    }
  }
}

function aumentarCantidad(event) {
  compras[event.target.id]["Quantity"] += 1;
  compras[event.target.id]["Amount"] =
    compras[event.target.id]["Quantity"] *
    compras[event.target.id]["Unit Price"];
  cargarCompras();
}

function disminuirCantidad(event) {
  if (compras[event.target.id]["Quantity"] > 0) {
    compras[event.target.id]["Quantity"] -= 1;
    compras[event.target.id]["Amount"] =
      compras[event.target.id]["Quantity"] *
      compras[event.target.id]["Unit Price"];
    cargarCompras();
  }
}

function confirmarOrden(event) {
  let orden = [];
  let contador = 1;
  for (let [descripcion, valores] of Object.entries(compras)) {
    let producto = {};
    producto["item"] = contador;
    producto["quantity"] = valores["Quantity"];
    producto["description"] = descripcion;
    producto["unitPrice"] = valores["Unit Price"];
    orden.push(producto);
    contador += 1;
  }
  console.log(orden);
}

let burgers = document.getElementById("burgers");
burgers.addEventListener("click", () => {
  agregarContenido("Burguers");
});

let tacos = document.getElementById("tacos");
tacos.addEventListener("click", () => {
  agregarContenido("Tacos");
});

let salads = document.getElementById("salads");
salads.addEventListener("click", () => {
  agregarContenido("Salads");
});

let desserts = document.getElementById("desserts");
desserts.addEventListener("click", () => {
  agregarContenido("Desserts");
});

let drinks = document.getElementById("drinks");
drinks.addEventListener("click", () => {
  agregarContenido("Drinks and Sides");
});

let carrito_compras = document.getElementById("carrito_compras");
carrito_compras.addEventListener("click", () => {
  cargarCompras();
});

let cancelarOrden = document.getElementById("cancelarOrden");
cancelarOrden.addEventListener("click", () => {
  let items = document.getElementById("num_items");
  cant_items = 0;
  items.textContent = cant_items + " items";
  compras = {};
  cargarCompras();
});
