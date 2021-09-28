url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
datos = null;

fetch(url).then(res => {
    res.json().then(json => {
        datos = json;
        console.log(datos);
    })
});

function agregarContenido(categoria, nombre) {
    let titulo = document.getElementById("titulo_cat");
    let cat_name = document.createElement("h2");
    cat_name.textContent = nombre;
    cat_name.style.textAlign = "center";
    titulo.appendChild(cat_name);

    let contenido = document.getElementById("contenido");
    for(let i = 0; i < datos.length; i++) 
    {
        if(datos[i].name == categoria)
        {
            for(let j=0; j < datos[i].products.length; j++)
            {
                let card = document.createElement("div");
                card.setAttribute("class", "card");
                card.setAttribute("style", "width: 18rem;");
                let img = document.createElement("img");
                img.setAttribute("class", "card-img-top");
                img.setAttribute("src", datos[i].products[j].image);
                card.appendChild(img);
                let cardBody = document.createElement("div");
                cardBody.setAttribute("class", "card-body");
                let cardTitle = document.createElement("h5");
                cardTitle.textContent = datos[i].products[j].name;
                card.appendChild(cardTitle);
                let cardText = document.createElement("p");
                cardText.setAttribute("class", "card-text");
                cardText.textContent = datos[i].products[j].description;
                card.appendChild(cardText);
                let cardPrice = document.createElement("p");
                cardPrice.style.fontWeight = "bold"
                cardPrice.textContent = datos[i].products[j].price;
                card.appendChild(cardPrice);
                let boton = document.createElement("a");
                boton.setAttribute("class", "btn btn-dark");
                boton.textContent = "Add to cart";
                boton.style.color = "white";
                boton.onclick = agregarAlCarrito;
                card.appendChild(boton);

                contenido.appendChild(card);
            }
        }
    }
}

let cant_items = 0;
function agregarAlCarrito(event) {
    let items = document.getElementById("items");
    cant_items += 1;
    items.textContent = cant_items + " items"
}

let burgers = document.getElementById("burgers");
burgers.addEventListener("click", () => {
    agregarContenido("Burguers", "Burgers");
});

let tacos = document.getElementById("tacos");
tacos.addEventListener("click", () => {
    agregarContenido("Tacos", "Tacos");
});

let salads = document.getElementById("salads");
salads.addEventListener("click", () => {
    agregarContenido("Salads", "Salads");
});

let desserts = document.getElementById("desserts");
desserts.addEventListener("click", () => {
    agregarContenido("Desserts", "Desserts");
});

let drinks = document.getElementById("drinks");
drinks.addEventListener("click", () => {
    agregarContenido("Drinks and Sides", "Drinks and Sides");
});