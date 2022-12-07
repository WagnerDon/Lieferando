let restaurant = [
    {
        "restaurant": "Donut City",

        "image": "img/donut-city.jpg",

        "logo": "img/donut-logo.png",

        "rating": 5,

        "service-fees": 0.99,

        "delivery-costs": 8,

        "minimum-order": 10,

        "menus": [{
            "name": "Donut Novice",
            "description": "Leckere Donuts perfekt für Donut Anfänger oder für zwischendurch.",
            "ingredients": "Donut Weizenteig, Margarine, Salz, Chia Samen, Zucker, Reis Öl, Dunkle Schokolade, Vegane Streusel",
            "vegan": true,
            "price": 3.99,
            "amount": 1,
            "img": "img/donut-novice.jpg"
        }, {
            "name": "All-Round Donuts",
            "description": "Sorgfältig ausgewählte Donut Kombination für echte Donut Liebhaber oder auch zum Teilen.",
            "ingredients": "Donut Weizenteig, Butter, Eier, Salz, Zucker, Palm Öl, Milch Schokolade, Streusel",
            "vegan": false,
            "price": 7.99,
            "amount": 1,
            "img": "img/all-round-donuts.jpg"
        }, {
            "name": "Junkies Menu",
            "description": "Die besten Donuts speziell zubereitet in XXL Größe ausgezeichnet für Partys und große Veranstaltungen.",
            "ingredients": "Donut Weizenteig, Butter, Salz, Eier, Zucker, Palm Öl, Reis Öl, Milch Schokolade, Dunkle Schokolade, Streusel",
            "vegan": false,
            "price": 15.99,
            "amount": 1,
            "img": "img/junkies-menu.jpg"
        }],

        "desserts": [{
            "name": "Donut Shake",
            "description": "Bei Sehnsucht nach etwas frischem, empfehlen wir unseren Donut Shake.",
            "ingredients": "Eiswürfel, Milch, Donut Weizenteig, Salz, Zucker, Weiße Schokolade",
            "vegan": false,
            "price": 2.99,
            "amount": 1,
            "img": "img/donut-shake.jpg"
        }, {
            "name": "Ice Delight",
            "description": "Sommer ohne Eiscreme ist kein Sommer. Und wenn du wie wir findest, dass im Sommer auch Donuts gehören, dann ist das Ice Delight Dessert wie für dich geschaffen.",
            "ingredients": "Milch, Donut Weizenteig, Zucker, Salz, Weiße Schokolade, Milch Schokolade, Dunkle Schokolade",
            "vegan": false,
            "price": 2.99,
            "amount": 1,
            "img": "img/ice-delight.jpg"
        }, {
            "name": "Fire Donut",
            "description": "Für diejenigen, die es 'Spicy' bevorzugen, wäre der Fire Donut die beste Wahl.",
            "ingredients": "Donut Weizenteig, Salz, Zucker, Weiße Schokolade, Chili",
            "vegan": true,
            "price": 2.99,
            "amount": 1,
            "img": "img/fire-donut.jpg"
        }],
    }
];

let cart = [{
    "orders": [],
    "amounts": [],
    "prices": []
}];

let personalInfo = {
    "name": "",
    "surname": "",
    "adress": "",
    "postcode": ""
};

function removeFromCart(x) {
    cart[localStorage.getItem('restaurant')]["amounts"][x]--;
    let test = cart[localStorage.getItem('restaurant')]["orders"][x];
    let whatINeed = "";

    for (let i = 0; i < restaurant[localStorage.getItem('restaurant')]["menus"].length; i++) {
        let test2 = restaurant[localStorage.getItem('restaurant')]["menus"][i]["name"].indexOf(test);
        if (test2 !== -1) {
            whatINeed = restaurant[localStorage.getItem('restaurant')]["menus"][i];
        }
    }

    for (let i = 0; i < restaurant[localStorage.getItem('restaurant')]["desserts"].length; i++) {
        let test2 = restaurant[localStorage.getItem('restaurant')]["desserts"][i]["name"].indexOf(test);
        if (test2 !== -1) {
            whatINeed = restaurant[localStorage.getItem('restaurant')]["desserts"][i];
        }
    }

    let minus = whatINeed["price"];
    cart[localStorage.getItem('restaurant')]["prices"][x] -= minus;

    if (cart[localStorage.getItem('restaurant')]["amounts"][x] == 0) {
        cart[localStorage.getItem('restaurant')]["amounts"].splice(x, 1);
        cart[localStorage.getItem('restaurant')]["orders"].splice(x, 1);
        cart[localStorage.getItem('restaurant')]["prices"].splice(x, 1);
    }

    renderCart();
    renderSmallCart();
    checkCart();
}

function checkCart() {
    if (cart[localStorage.getItem('restaurant')]["amounts"].length == 0) {
        resetPurchase();
    }
}

function resetPurchase() {
    cart = [{
        "orders": [],
        "amounts": [],
        "prices": []
    }];

    document.getElementById('cart-content').innerHTML = "";
    document.getElementById('cart-content').innerHTML += `
        <div class="dummy center center-column">
            <img class="icon-medium" src="img/cart.png" alt="cart">
            <h2 id="fill-cart">Fülle deinen Warenkorb</h2>
            <p id="add-food">Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen
            </p>
        </div>
    `;

    document.getElementById('small-cart').innerHTML = "";
}

function renderSmallCart() {
    let content = document.getElementById('small-cart');
    content.innerHTML = "";
    content.innerHTML += `
    <div id="small-cart-order"></div>
    <div>
        <table class="cart-table">
            <tr>
                <td>Gesamt:</td>
                <td class="td-2">${calcTotal().toFixed(2)} €</td>
            </tr>
        </table>
        <button onclick="contactData()" class="pay">Bezahlen ${calcTotal().toFixed(2)} €</button>
    </div>
    `;

    for (let i = 0; i < cart[localStorage.getItem('restaurant')]["orders"].length; i++) {
        document.getElementById('small-cart-order').innerHTML += `
        <div class="display-flex space-between">
            <table class="cart-table">
                <tr>
                    <td class="test">${cart[localStorage.getItem('restaurant')]["amounts"][i]}x ${cart[localStorage.getItem('restaurant')]["orders"][i]}</td>
                    <td class="td-2">${cart[localStorage.getItem('restaurant')]["prices"][i].toFixed(2)} €</td>
                    <td class="center"><div class="reduce-div center" onclick="removeFromCart(${i})"><img class="reduce" src="img/reduce.png"></div></td>
                </tr>
            </table>
        </div>
        `;
    }
}

function thankForPurchase() {
    document.getElementById('body').innerHTML = `
    <div class="purchase center">
        <div class="border-radius10 display-flex-column center padding10" id="order">
            <h1>Danke für deine Bestellung. Dein Essen ist in Kürze da!</h1>
            <p class="test3 center">${personalInfo["name"]}</p> <br>
            <p class="test3 center">${personalInfo["surname"]}</p> <br>
            <p class="test3 center">${personalInfo["adress"]}</p> <br>
            <p class="test3 center">${personalInfo["postcode"]}</p> <br>
        </div>
    </div>
    `;

    for (let i = 0; i < cart[localStorage.getItem('restaurant')]["orders"].length; i++) {
        document.getElementById('order').innerHTML += `
        <div class="display-flex space-between">
            <table class="cart-table">
                <tr>
                    <td class="test3 center">${cart[localStorage.getItem('restaurant')]["amounts"][i]}x ${cart[localStorage.getItem('restaurant')]["orders"][i]}</td>
                </tr>
            </table>
        </div>
        `;
    }

    document.getElementById('order').innerHTML += `
        <p class="margin-top10 test3 center">Gesamtpreis: ${calcTotal().toFixed(2)} €</p>
        <button onclick="location.reload()" class="return border-radius10">Zurück zu ${restaurant[localStorage.getItem('restaurant')]["restaurant"]}</button>
    `;
}

function contactData() {
    document.getElementById('body').innerHTML = `
    <div id="order" class="purchase display-flex-column center">
        <h1>Bitte Lieferadresse eingeben</h1>
        <input id="input1" class="border-radius10 inputs" placeholder="Adresse"> <br>
        <input type="number" id="input2" class="border-radius10 inputs" placeholder="Postleitzahl"> <br>
        <input id="input3" class="border-radius10 inputs" placeholder="Name"> <br>
        <input id="input4" class="border-radius10 inputs" placeholder="Nachname"> <br>
        <button type="submit" onclick="approve()" class="return border-radius10">Bestätigen</button>
    </div>
    `;
}

function approve() {

    if (document.getElementById('input1').value.length && document.getElementById('input2').value.length && document.getElementById('input3').value.length && document.getElementById('input4').value.length > 0) {
        personalInfo["adress"] = document.getElementById('input1').value;
        personalInfo["postcode"] = document.getElementById('input2').value;
        personalInfo["name"] = document.getElementById('input3').value;
        personalInfo["surname"] = document.getElementById('input4').value;

        thankForPurchase();
    }
    else {
        alert("Bitte alles ausfüllen!")
    }
}

function renderCart() {
    let content = document.getElementById('cart-content');
    content.innerHTML = "";
    content.innerHTML += `
    <div id="cart-order"></div>
    <div>
        <table class="cart-table">
            <tr>
                <td>Zwischensumme:</td>
                <td class="td-2">${calcSum().toFixed(2)} €</td>
            </tr>
            <tr>
                <td>Servicegebühr:</td>
                <td class="td-2">${restaurant[localStorage.getItem('restaurant')]["service-fees"]} €</td>
            </tr>
            <tr>
                <td>Lieferkosten:</td>
                <td class="td-2">${restaurant[localStorage.getItem('restaurant')]["delivery-costs"]} €</td>
            </tr>
            <tr>
                <td>Gesamt:</td>
                <td class="td-2">${calcTotal().toFixed(2)} €</td>
            </tr>
        </table>
        <button onclick="contactData()" class="pay border-radius10">Bezahlen (${calcTotal().toFixed(2)} €)</button>
    </div>
    `;

    for (let i = 0; i < cart[localStorage.getItem('restaurant')]["orders"].length; i++) {
        document.getElementById('cart-order').innerHTML += `
        <div class="display-flex space-between">
            <table class="cart-table">
                <tr>
                    <td class="test">${cart[localStorage.getItem('restaurant')]["amounts"][i]}x ${cart[localStorage.getItem('restaurant')]["orders"][i]}</td>
                    <td class="td-2">${cart[localStorage.getItem('restaurant')]["prices"][i].toFixed(2)} €</td>
                    <td class="center"><div class="reduce-div center" onclick="removeFromCart(${i})"><img class="reduce" src="img/reduce.png"></div></td>
                </tr>
            </table>
        </div>
        `;
    }
}

function calcTotal() {
    let calcTotal = calcSum() + restaurant[localStorage.getItem('restaurant')]["service-fees"] + restaurant[localStorage.getItem('restaurant')]["delivery-costs"];
    return calcTotal;
}

function calcSum() {
    let sum = 0;
    for (let i = 0; i < cart[localStorage.getItem('restaurant')]["prices"].length; i++) {
        sum += cart[localStorage.getItem('restaurant')]["prices"][i];
    }
    return sum;
}

function addToCart(x, y) {
    if (y == "menu") {
        if (cart[localStorage.getItem('restaurant')]["orders"].indexOf(restaurant[localStorage.getItem('restaurant')]["menus"][x]["name"]) > -1) {
            let getIndex = cart[localStorage.getItem('restaurant')]["orders"].indexOf(restaurant[localStorage.getItem('restaurant')]["menus"][x]["name"]);
            cart[localStorage.getItem('restaurant')]["amounts"][getIndex]++;
            cart[localStorage.getItem('restaurant')]["prices"][getIndex] += restaurant[localStorage.getItem('restaurant')]["menus"][x]["price"];
        }
        else {
            cart[localStorage.getItem('restaurant')]["orders"].push(restaurant[localStorage.getItem('restaurant')]["menus"][x]["name"]);
            cart[localStorage.getItem('restaurant')]["prices"].push(restaurant[localStorage.getItem('restaurant')]["menus"][x]["price"]);
            cart[localStorage.getItem('restaurant')]["amounts"].push(restaurant[localStorage.getItem('restaurant')]["menus"][x]["amount"]);
        }
    }

    if (y == "dessert") {
        if (cart[localStorage.getItem('restaurant')]["orders"].indexOf(restaurant[localStorage.getItem('restaurant')]["desserts"][x]["name"]) > -1) {
            let getIndex = cart[localStorage.getItem('restaurant')]["orders"].indexOf(restaurant[localStorage.getItem('restaurant')]["desserts"][x]["name"]);
            cart[localStorage.getItem('restaurant')]["amounts"][getIndex]++;
            cart[localStorage.getItem('restaurant')]["prices"][getIndex] += restaurant[localStorage.getItem('restaurant')]["desserts"][x]["price"];
        }
        else {
            cart[localStorage.getItem('restaurant')]["orders"].push(restaurant[localStorage.getItem('restaurant')]["desserts"][x]["name"]);
            cart[localStorage.getItem('restaurant')]["prices"].push(restaurant[localStorage.getItem('restaurant')]["desserts"][x]["price"]);
            cart[localStorage.getItem('restaurant')]["amounts"].push(restaurant[localStorage.getItem('restaurant')]["desserts"][x]["amount"]);
        }
    }

    renderCart();
    renderSmallCart();
}

function renderRestaurant(x) {
    let content = document.getElementById('content');
    const thisRestaurant = restaurant[x];
    content.innerHTML = "";
    content.innerHTML += `
    <img class="restaurant-img" src="${thisRestaurant["image"]}" alt="restaurant">
    <div class="flying-logo border-radius10 box-shadow center"><img src="${thisRestaurant["logo"]}"></div>
    <div class="restaurant-info display-flex-column">
        <h2>${thisRestaurant["restaurant"]} <div onclick="renderInfo()" class="circle-effect center cursor-pointer"><img src="img/info.png"></div></h2>
        <div id="stars" class="stars"></div>
        <div class="service">
            <img src="img/service.png">
            <p><p id="service">Servicegebühr<p> ${thisRestaurant["service-fees"]} €</p>
        </div>
        <p id="service-info">
            Bei diesem Restaurant kannst du Stempel sammeln. Stelle beim Bestellabschluss bitte sicher, 
            dass du dich für unseren Newsletter angemeldet hast, um deine Stempel per E-Mail zu erhalten.
        </p>
    </div>
    <nav class="navigation center space-around">
        <a href="#one-menu0" id="main-course" class="cursor-pointer">
            Hauptspeisen
        </a>

        <a href="#one-dessert0" id="desserts" class="cursor-pointer">
            Nachspeisen
        </a>
    </nav>
    `;

    renderRatings(x);
    renderMenu(x);
    renderDesserts(x);
    checkVegan(x);
    comingSoon();
    localStorage.setItem('restaurant', x);
}

function comingSoon() {
    document.getElementById('content').innerHTML += `
        <h2 class="center coming-soon">Mehr Demnächst!</h2>
    `;
}

function checkVegan(x) {
    for (let i = 0; i < restaurant[x]["menus"].length; i++) {
        if (restaurant[x]["menus"][i]["vegan"] == true) {
            document.getElementById("one-menu" + i).innerHTML += `<img class="vegan" src="img/vegan.png">`;
        }
        if (restaurant[x]["desserts"][i]["vegan"] == true) {
            document.getElementById("one-dessert" + i).innerHTML += `<img class="vegan" src="img/vegan.png">`;
        }
    }
}

function renderDesserts(x) {
    let content = document.getElementById('content');
    for (let i = 0; i < restaurant[x]["desserts"].length; i++) {
        content.innerHTML += `
        <div id="one-dessert${[i]}" class="food">
            <h2>${restaurant[x]["desserts"][i]["name"]}</h2>
            <div class="display-flex column-gap20 the-container">
                <div class="center">
                    <img class="food-img border-radius10 box-shadow" src="${restaurant[x]["desserts"][i]["img"]}">
                </div>
                <div class="space-around display-flex-column text-menu">
                    <div>
                        <p>${restaurant[x]["desserts"][i]["description"]}</p>
                        <p class="ingredients">Zutaten: ${restaurant[x]["desserts"][i]["ingredients"]}</p>
                    </div>
                    <div class="center space-between">
                        <p>${restaurant[x]["desserts"][i]["price"]} €</p>
                        <div onclick="addToCart(${i}, 'dessert')" class="cursor-pointer add-div center"><img class="add" src="img/add.png"></div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

function renderMenu(x) {
    let content = document.getElementById('content');
    for (let i = 0; i < restaurant[x]["menus"].length; i++) {
        content.innerHTML += `
        <div id="one-menu${[i]}" class="food">
            <h2>${restaurant[x]["menus"][i]["name"]}</h2>
            <div class="display-flex column-gap20 the-container">
                <div class="center">
                    <img class="food-img border-radius10 box-shadow" src="${restaurant[x]["menus"][i]["img"]}">
                </div>
                <div class="space-around display-flex-column text-menu">
                    <div>
                        <p>${restaurant[x]["menus"][i]["description"]}</p>
                        <p class="ingredients">Zutaten: ${restaurant[x]["menus"][i]["ingredients"]}</p>
                    </div>
                    <div class="center space-between">
                        <p>${restaurant[x]["menus"][i]["price"]} €</p>
                        <div onclick="addToCart(${i}, 'menu')" class="cursor-pointer add-div center"><img class="add" src="img/add.png"></div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

function renderRatings(x) {
    let content = document.getElementById('stars');
    let rating = restaurant[x]["rating"]
    for (let i = 0; i < rating; i++) {
        content.innerHTML += `
            <img src="img/star.png">
        `;
    }
}

function renderBurgerMenu() {
    toggle('black-screen');
    let content = document.getElementById('black-screen-content');
    content.innerHTML = "";
    content.innerHTML += `
    <div class="my-account">
        <h2 id="my-account">Mein Account</h2>
        <button onclick="toggle('black-screen')">X</button>
    </div>

    <div class="login column-gap20">
        <a href="https://www.lieferando.at/lieferservice/essen/1030#signin" class="center first">
            <p id="login">Anmelden</p>
        </a>

        <a href="https://www.lieferando.at/lieferservice/essen/1030#createaccount" class="center second">
                <p id="my-login">Account erstellen</p>
        </a>
    </div>

    <div class="options">
        <a href="https://www.lieferando.at/lieferservice/essen/1030#orders" class="option-single center flex-start column-gap20">
            <img class="icon" src="img/orders.png">
            <p id="order">Bestellungen</p>
        </a>

        <a href="https://www.lieferando.at/lieferservice/essen/1030#favourites" class="option-single center flex-start column-gap20">
            <img class="icon" src="img/favourites.png">
            <p id="favourites">Favoriten</p>
        </a>

        <div class="border"></div>

        <a href="https://www.lieferando.at/punkte" class="option-single center flex-start column-gap20">
            <img class="icon" src="img/points.png">
            <p id="points">Punkte</p>
        </a>

        <a href="https://www.lieferando.at/lieferservice/essen/1030#stampCards" class="option-single center flex-start column-gap20">
            <img class="icon" src="img/print.png">
            <p id="cards">Stempelkarten</p>
        </a>

        <a href="https://www.lieferando.at/kundenservice" class="option-single center flex-start column-gap20">
            <img class="icon" src="img/help.png">
            <p id="help">Brauchst du Hilfe?</p>
        </a>

        <a href="https://giftcards-lieferando.at/at_de/" class="option-single center flex-start column-gap20">
            <img class="icon" src="img/gift-card.png">
            <p id="presents">Geschenkkarten</p>
        </a>

        <div class="border"></div>

        <a href="https://www.lieferando.at/fahrer?utm_source=mainsite&utm_medium=referral&utm_content=usermodal" class="option-single center flex-start column-gap20">
            <img class="icon" src="img/driver.png">
            <p id="join">Fahrer werden</p>
        </a>

        <a href="https://www.lieferando.at/business" class="option-single center flex-start column-gap20">
            <img class="icon" src="img/business.png">
            <p id="business">Delivery for business</p>
        </a>
    </div>
    `;

    language(localStorage.getItem('language'));
}

function renderInfo() {
    toggle('black-screen');
    let content = document.getElementById('black-screen-content');
    content.innerHTML = "";
    content.innerHTML += `
    <div class="my-account-info">
        <h2 id="info-about">Über das Restaurant</h2>
        <button onclick="toggle('black-screen')">X</button>
    </div>

    <div class="info-content">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6543.321168912833!2d-56.15940322085093!3d-34.914966343499046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f81ca9cc00003%3A0x343d55baa0c89444!2sDonut%20City!5e0!3m2!1sde!2suy!4v1668989628067!5m2!1sde!2suy" width="100%" height="280px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>    
        <h3 id="info-serve" class="info-headline">Lieferzeiten</h3>
        <div class="info-div border-radius10">
            <table>
            <tr>
                <td id="info-monday">Montag</td>
                <td class="second">18:00 - 21:30</td>
            </tr>
            <tr>
                <td id="info-tuesday">Dienstag</td>
                <td id="info-pause" class="second">Ruhetag</td>
            </tr>
            <tr>
                <td id="info-wednesday">Mittwoch</td>
                <td class="second">18:00 - 21:30</td>
            </tr>
            <tr>
                <td id="info-thursday">Donnerstag</td>
                <td class="second">18:00 - 21:30</td>
            </tr>
            <tr>
                <td id="info-friday">Freitag</td>
                <td class="second">18:00 - 21:30</td>
            </tr>
            <tr>
                <td id="info-saturday">Samstag</td>
                <td class="second">18:00 - 21:30</td>
            </tr>
            <tr>
                <td id="info-sunday">Sonntag</td>
                <td id="info-pause2" class="second">Ruhetag</td>
            </tr>
        </table>
        </div>
        <h3 id="info-serve-price" class="info-headline">Lieferkosten</h3>
        <div class="info-div border-radius10">
            <p id="info-serve-info">Für diese Bestellung wird eine Servicegebühr in Höhe von 0,89 € erhoben. Diese Gebühr ermöglicht es uns, Verbesserungen an unserem Service und den Bestellvorgängen vorzunehmen.</p>
            <br>
            <table>
                <tr>
                    <td id="info-min">Mindestbestellwert</td>
                    <td class="second">10€</td>
                </tr>
                <tr>
                    <td id="info-price">Lieferkosten</td>
                    <td class="second">8€</td>
                </tr>
            </table>
        </div>
        <h3 id="info-web" class="info-headline">Website</h3>
        <div class="info-div border-radius10">
            <a href="https://developer-akademie.teachable.com/">donut-city.de</a>
        </div>
        <h3 id="info-method" class="info-headline">Bezahlmethoden</h3>
        <div class="info-div border-radius10 center space-between">
            <a href="https://www.klarna.com/de/" class="circle-effect center">
                <img class="icon-small" src="https://static.takeaway.com/images/inno-payments/icons/sofort.svg">
            </a>
            <a href="https://www.paypal.com/de/home" class="circle-effect center">
                <img class="icon-small" src="https://static.takeaway.com/images/inno-payments/icons/paypal.svg">
            </a>
            <a href="https://www.binance.com/" class="circle-effect center">
                <img class="icon-small" src="https://static.takeaway.com/images/inno-payments/icons/bitpay.svg">
            </a>
            <a href="https://eps-ueberweisung.at/de/" class="circle-effect center">
                <img class="icon-small" src="https://static.takeaway.com/images/inno-payments/icons/eps.svg">
            </a>
            <a href="https://www.ideal.nl/en/" class="circle-effect center">
                <img class="icon-small" src="https://static.takeaway.com/images/inno-payments/icons/ideal.svg">
            </a>
        </div>
        <h3 id="info-imprint" class="info-headline">Impressum</h3>
        <div class="info-div border-radius10 display-flex-column">
            <p>
                Luis Franzini 917 <br> 11300 Montevideo <br> Departamento de Montevideo
            </p>

            <div class="border"></div>

            <p id="info-us">
                Wir sind ein professioneller Anbieter. <a href="https://www.lieferando.at/kundenservice/artikel/welchen-status-haben-die-gelisteten-restaurants"> Erfahre mehr </a> darüber, wie wir gemeinsam mit Lieferando.at die Verbraucherverantwortung übernehmen.
            </p>
        </div>
    </div>
    `;

    language(localStorage.getItem('language'));
}

function logo(x) {
    if (x == 'bright') {
        document.getElementById('logo').setAttribute('src', 'img/logo-off.png');
    } else {
        document.getElementById('logo').setAttribute('src', 'img/logo-on.png')
    }
}

function toggle(x) {
    if (x == 'language') {
        if (document.getElementById(x).classList.contains('display-none')) {

            document.getElementById(x).classList.remove('display-none');
        } else {
            document.getElementById(x).classList.add('display-none');
        }
    }

    if (x == 'black-screen') {
        if (document.getElementById(x).classList.contains('display-none')) {

            document.getElementById(x).classList.remove('display-none');
            document.getElementById('body').classList.add('overflow');
        } else {

            document.getElementById(x).classList.add('display-none');
            document.getElementById('body').classList.remove('overflow');
        }
    }
}

function language(x) {
    if (x == 'german') {
        document.getElementById('menu').innerHTML = "Speisekarte";
        document.getElementById('languages').innerHTML = "Sprachen";
        document.getElementById('flag').setAttribute('src', 'img/germany.png');
        document.getElementById('shopping-cart').innerHTML = "Warenkorb";
        document.getElementById('fill-cart').innerHTML = "Fülle deinen Warenkorb";
        document.getElementById('add-food').innerHTML = "Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen";
        document.getElementById('service').innerHTML = "Servicegebühr";
        document.getElementById('main-course').innerHTML = "Hauptspeisen";
        document.getElementById('desserts').innerHTML = "Nachspeisen";
        document.getElementById('service-info').innerHTML = "Bei diesem Restaurant kannst du Stempel sammeln. Stelle beim Bestellabschluss bitte sicher, dass du dich für unseren Newsletter angemeldet hast, um deine Stempel per E-Mail zu erhalten.";

        if (document.getElementById('my-account')) {
            document.getElementById('my-account').innerHTML = "Mein Account";
            document.getElementById('login').innerHTML = "Anmelden";
            document.getElementById('my-login').innerHTML = "Account erstellen";
            document.getElementById('order').innerHTML = "Bestellungen";
            document.getElementById('favourites').innerHTML = "Favoriten";
            document.getElementById('points').innerHTML = "Punkte";
            document.getElementById('cards').innerHTML = "Stempelkarten";
            document.getElementById('help').innerHTML = "Brauchst du Hilfe?";
            document.getElementById('presents').innerHTML = "Geschenkkarten";
            document.getElementById('join').innerHTML = "Fahrer werden";
            document.getElementById('business').innerHTML = "Delivery geschäftlich";
        }

        if (document.getElementById('info-about')) {
            document.getElementById('info-about').innerHTML = "Über das Restaurant";
            document.getElementById('info-serve').innerHTML = "Lieferzeiten";
            document.getElementById('info-monday').innerHTML = "Montag";
            document.getElementById('info-tuesday').innerHTML = "Dienstag";
            document.getElementById('info-wednesday').innerHTML = "Mittwoch";
            document.getElementById('info-thursday').innerHTML = "Donnerstag";
            document.getElementById('info-friday').innerHTML = "Freitag";
            document.getElementById('info-saturday').innerHTML = "Samstag";
            document.getElementById('info-sunday').innerHTML = "Sonntag";
            document.getElementById('info-pause').innerHTML = "Ruhetag";
            document.getElementById('info-pause2').innerHTML = "Ruhetag";
            document.getElementById('info-serve-price').innerHTML = "Lieferkosten";
            document.getElementById('info-serve-info').innerHTML = "Für diese Bestellung wird eine Servicegebühr in Höhe von 1,99€ erhoben. Diese Gebühr ermöglicht es uns, Verbesserungen an unserem Service und den Bestellvorgängen vorzunehmen.";
            document.getElementById('info-min').innerHTML = "Mindestbestellwert";
            document.getElementById('info-price').innerHTML = "Lieferkosten";
            document.getElementById('info-web').innerHTML = "Website";
            document.getElementById('info-method').innerHTML = "Bezahlmethoden";
            document.getElementById('info-imprint').innerHTML = "Impressum";
            document.getElementById('info-us').innerHTML = `Wir sind ein professioneller Anbieter. <a href="https://www.lieferando.at/kundenservice/artikel/welchen-status-haben-die-gelisteten-restaurants"> Erfahre mehr </a> darüber, wie wir gemeinsam mit Lieferando.at die Verbraucherverantwortung übernehmen.`;
        }

        localStorage.setItem('language', x);
    }

    if (x == 'english') {
        document.getElementById('menu').innerHTML = "Menu";
        document.getElementById('languages').innerHTML = "Languages";
        document.getElementById('flag').setAttribute('src', 'img/united-kingdom.png');
        document.getElementById('shopping-cart').innerHTML = "Shopping cart";
        document.getElementById('fill-cart').innerHTML = "Fill your shopping cart";
        document.getElementById('add-food').innerHTML = "Add some delicious dishes from the menu and order your food";
        document.getElementById('service').innerHTML = "Service fee";
        document.getElementById('main-course').innerHTML = "Main Dishes";
        document.getElementById('desserts').innerHTML = "Desserts";
        document.getElementById('service-info').innerHTML = "You can collect stamps at this restaurant. When completing your order, please make sure you have signed up for our newsletter to receive your stamps by email.";

        if (document.getElementById('my-account')) {
            document.getElementById('my-account').innerHTML = "My Account";
            document.getElementById('login').innerHTML = "Login";
            document.getElementById('my-login').innerHTML = "Sign up";
            document.getElementById('order').innerHTML = "Orders";
            document.getElementById('favourites').innerHTML = "Favourites";
            document.getElementById('points').innerHTML = "Points";
            document.getElementById('cards').innerHTML = "Stamp cards";
            document.getElementById('help').innerHTML = "Do you need help?";
            document.getElementById('presents').innerHTML = "Gift cards";
            document.getElementById('join').innerHTML = "Become a driver";
            document.getElementById('business').innerHTML = "Delivery business";
        }

        if (document.getElementById('info-about')) {
            document.getElementById('info-about').innerHTML = "About the restaurant";
            document.getElementById('info-serve').innerHTML = "Delivery times";
            document.getElementById('info-monday').innerHTML = "Monday";
            document.getElementById('info-tuesday').innerHTML = "Tuesday";
            document.getElementById('info-wednesday').innerHTML = "Wednesday";
            document.getElementById('info-thursday').innerHTML = "Thursday";
            document.getElementById('info-friday').innerHTML = "Friday";
            document.getElementById('info-saturday').innerHTML = "Saturday";
            document.getElementById('info-sunday').innerHTML = "Sunday";
            document.getElementById('info-pause').innerHTML = "Break";
            document.getElementById('info-pause2').innerHTML = "Break";
            document.getElementById('info-serve-price').innerHTML = "Delivery costs";
            document.getElementById('info-serve-info').innerHTML = "A service fee of €1.99 will be charged for this order. This fee allows us to make improvements to our service and ordering processes.";
            document.getElementById('info-min').innerHTML = "Minimum order value";
            document.getElementById('info-price').innerHTML = "Delivery costs";
            document.getElementById('info-web').innerHTML = "Website";
            document.getElementById('info-method').innerHTML = "Payment method";
            document.getElementById('info-imprint').innerHTML = "Imprint";
            document.getElementById('info-us').innerHTML = `We are a professional supplier. <a href="https://www.lieferando.at/kundenservice/artikel/which-status-have-the-listed-restaurants"> Find out more </a> about how we take consumer responsibility together with Lieferando.at .`;
        }

        localStorage.setItem('language', x);
    }

    if (x == 'dutch') {
        document.getElementById('menu').innerHTML = "Menu";
        document.getElementById('languages').innerHTML = "Talen";
        document.getElementById('flag').setAttribute('src', 'img/netherlands.png');
        document.getElementById('shopping-cart').innerHTML = "Winkelwagen";
        document.getElementById('fill-cart').innerHTML = "Vul uw winkelwagentje";
        document.getElementById('add-food').innerHTML = "Voeg enkele heerlijke gerechten van het menu toe en bestel uw eten";
        document.getElementById('service').innerHTML = "Servicekosten";
        document.getElementById('main-course').innerHTML = "Hoofdgerechten";
        document.getElementById('desserts').innerHTML = "Toetjes";
        document.getElementById('service-info').innerHTML = "Bij dit restaurant kun je postzegels verzamelen. Zorg er bij het afronden van uw bestelling voor dat u zich heeft aangemeld voor onze nieuwsbrief om uw postzegels per e-mail te ontvangen.";

        if (document.getElementById('my-account')) {
            document.getElementById('my-account').innerHTML = "Mijn Account";
            document.getElementById('login').innerHTML = "Login";
            document.getElementById('my-login').innerHTML = "Sign up";
            document.getElementById('order').innerHTML = "Bestellingen";
            document.getElementById('favourites').innerHTML = "Favorieten";
            document.getElementById('points').innerHTML = "Punten";
            document.getElementById('cards').innerHTML = "Stempelkaarten";
            document.getElementById('help').innerHTML = "Heb je hulp nodig?";
            document.getElementById('presents').innerHTML = "Geschenkbon";
            document.getElementById('join').innerHTML = "Bestuurder worden";
            document.getElementById('business').innerHTML = "Delivery zaken";
        }

        if (document.getElementById('info-about')) {
            document.getElementById('info-about').innerHTML = "Over het restaurant";
            document.getElementById('info-serve').innerHTML = "Levertijen";
            document.getElementById('info-monday').innerHTML = "Maandag";
            document.getElementById('info-tuesday').innerHTML = "Dinsdag";
            document.getElementById('info-wednesday').innerHTML = "Woensdag";
            document.getElementById('info-thursday').innerHTML = "Donderdag";
            document.getElementById('info-friday').innerHTML = "Vrijdag";
            document.getElementById('info-saturday').innerHTML = "Zaterdag";
            document.getElementById('info-sunday').innerHTML = "Zondag";
            document.getElementById('info-pause').innerHTML = "Pauze";
            document.getElementById('info-pause2').innerHTML = "Pauze";
            document.getElementById('info-serve-price').innerHTML = "Leveringskosten";
            document.getElementById('info-serve-info').innerHTML = "Voor deze bestelling wordt € 1,99 aan servicekosten in rekening gebracht. Met deze vergoeding kunnen wij verbeteringen aanbrengen in onze service- en bestelprocessen.";
            document.getElementById('info-min').innerHTML = "Minimum bestelwaarde";
            document.getElementById('info-price').innerHTML = "Leveringskosten";
            document.getElementById('info-web').innerHTML = "Website";
            document.getElementById('info-method').innerHTML = "Betaalmethode";
            document.getElementById('info-imprint').innerHTML = "Afdruk";
            document.getElementById('info-us').innerHTML = `Wij zijn een professionele leverancier. <a href="https://www.lieferando.at/kundenservice/artikel/which-status-have-the-listed-restaurants"> Lees meer </a> over hoe we samen met Lieferando.at de verantwoordelijkheid van de consument nemen .`;
        }

        localStorage.setItem('language', x);
    }

    if (x == 'french') {
        document.getElementById('menu').innerHTML = "Carte Des Mets";
        document.getElementById('languages').innerHTML = "Langues";
        document.getElementById('flag').setAttribute('src', 'img/france.png');
        document.getElementById('shopping-cart').innerHTML = "Panier d'achat";
        document.getElementById('fill-cart').innerHTML = "Remplis ton panier";
        document.getElementById('add-food').innerHTML = "Ajoute quelques plats savoureux du menu et commande ton repas";
        document.getElementById('service').innerHTML = "Frais de service";
        document.getElementById('service-info').innerHTML = "Vous pouvez collectionner des timbres dans ce restaurant. Lors de la finalisation de votre commande, assurez-vous d'être inscrit à notre newsletter afin de recevoir vos timbres par e-mail.";
        document.getElementById('main-course').innerHTML = "Plats principaux";
        document.getElementById('desserts').innerHTML = "Desserts";

        if (document.getElementById('my-account')) {
            document.getElementById('my-account').innerHTML = "Mon Compte";
            document.getElementById('login').innerHTML = "S'inscrire";
            document.getElementById('my-login').innerHTML = "Créer un Compte";
            document.getElementById('order').innerHTML = "Commandes";
            document.getElementById('favourites').innerHTML = "Favoris";
            document.getElementById('points').innerHTML = "Points";
            document.getElementById('cards').innerHTML = "Cartes de pointage";
            document.getElementById('help').innerHTML = "Besoin d'aide?";
            document.getElementById('presents').innerHTML = "Cartes cadeaux";
            document.getElementById('join').innerHTML = "Devenir chauffeur";
            document.getElementById('business').innerHTML = "Delivery affaires";
        }

        if (document.getElementById('info-about')) {
            document.getElementById('info-about').innerHTML = "À propos du restaurant";
            document.getElementById('info-serve').innerHTML = "Heures de livraison";
            document.getElementById('info-monday').innerHTML = "Lundi";
            document.getElementById('info-tuesday').innerHTML = "Mardi";
            document.getElementById('info-wednesday').innerHTML = "Mercredi";
            document.getElementById('info-thursday').innerHTML = "Jeudi";
            document.getElementById('info-friday').innerHTML = "Vendredi";
            document.getElementById('info-saturday').innerHTML = "Samedi";
            document.getElementById('info-sunday').innerHTML = "Dimanche";
            document.getElementById('info-pause').innerHTML = "Pause";
            document.getElementById('info-pause2').innerHTML = "Pause";
            document.getElementById('info-serve-price').innerHTML = "Frais de livraison";
            document.getElementById('info-serve-info').innerHTML = "Des frais de service de 1,99 € seront facturés pour cette commande. Ces frais nous permettent d'améliorer notre service et nos processus de commande.";
            document.getElementById('info-min').innerHTML = "Valeur minimale de commande";
            document.getElementById('info-price').innerHTML = "Frais de livraison";
            document.getElementById('info-web').innerHTML = "Site web";
            document.getElementById('info-method').innerHTML = "Mode de paiement";
            document.getElementById('info-imprint').innerHTML = "Mentions légales";
            document.getElementById('info-us').innerHTML = `Nous sommes un fournisseur professionnel. <a href="https://www.lieferando.at/kundenservice/artikel/which-status-have-the-listed-restaurants"> En savoir plus </a> sur la façon dont nous assumons la responsabilité du consommateur avec Lieferando.at .`;
        }

        localStorage.setItem('language', x);
    }

    if (x == 'spanish') {
        document.getElementById('menu').innerHTML = "Menú";
        document.getElementById('languages').innerHTML = "Idiomas";
        document.getElementById('flag').setAttribute('src', 'img/spain.png');
        document.getElementById('shopping-cart').innerHTML = "Cesta de la compra";
        document.getElementById('fill-cart').innerHTML = "Llenar la cesta de la compra";
        document.getElementById('add-food').innerHTML = "Añade algunos platos deliciosos del menú y pide tu comida";
        document.getElementById('service').innerHTML = "Tarifa de servicio";
        document.getElementById('service-info').innerHTML = "Puedes coleccionar sellos en este restaurante. Al completar su pedido, asegúrese de haberse suscrito a nuestro boletín para recibir sus sellos por correo electrónico.";
        document.getElementById('main-course').innerHTML = "Platos principales";
        document.getElementById('desserts').innerHTML = "Postres";

        if (document.getElementById('my-account')) {
            document.getElementById('my-account').innerHTML = "Mi Cuenta";
            document.getElementById('login').innerHTML = "Inicio de sesión";
            document.getElementById('my-login').innerHTML = "Crear Cuenta";
            document.getElementById('order').innerHTML = "Pedidos";
            document.getElementById('favourites').innerHTML = "Favoritos";
            document.getElementById('points').innerHTML = "Puntos";
            document.getElementById('cards').innerHTML = "Tarjetas de sellos";
            document.getElementById('help').innerHTML = "¿Necesitas ayuda?";
            document.getElementById('presents').innerHTML = "Tarjetas de regalo";
            document.getElementById('join').innerHTML = "Convertirse en conductor";
            document.getElementById('business').innerHTML = "Delivery negocio";
        }

        if (document.getElementById('info-about')) {
            document.getElementById('info-about').innerHTML = "Sobre el restaurante";
            document.getElementById('info-serve').innerHTML = "Plazos de entrega";
            document.getElementById('info-monday').innerHTML = "Lunes";
            document.getElementById('info-tuesday').innerHTML = "Martes";
            document.getElementById('info-wednesday').innerHTML = "Miércoles";
            document.getElementById('info-thursday').innerHTML = "Jueves";
            document.getElementById('info-friday').innerHTML = "Viernes";
            document.getElementById('info-saturday').innerHTML = "Sábado";
            document.getElementById('info-sunday').innerHTML = "Domingo";
            document.getElementById('info-pause').innerHTML = "Descanso";
            document.getElementById('info-pause2').innerHTML = "Descanso";
            document.getElementById('info-serve-price').innerHTML = "Gastos de envío";
            document.getElementById('info-serve-info').innerHTML = "Se cobrará una tarifa de servicio de 1,99 € por este pedido. Esta tarifa nos permite realizar mejoras en nuestro servicio y procesos de pedido.";
            document.getElementById('info-min').innerHTML = "Valor mínimo del pedido";
            document.getElementById('info-price').innerHTML = "Gastos de envío";
            document.getElementById('info-web').innerHTML = "Página web";
            document.getElementById('info-method').innerHTML = "Forma de pago";
            document.getElementById('info-imprint').innerHTML = "Pie de imprenta";
            document.getElementById('info-us').innerHTML = `Somos un proveedor profesional. <a href="https://www.lieferando.at/kundenservice/artikel/what-status-have-the-listed-restaurants"> Obtenga más información </a> sobre cómo asumimos la responsabilidad del consumidor junto con Lieferando.at .`;
        }

        localStorage.setItem('language', x);
    }
}

function allLanguage(x) {
    language(x);
    toggle('language');
}