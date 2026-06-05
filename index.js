const restaurants = {
    ruby360: {
        name: "Ruby 360",
        image: "image/ruby360.jpg",
        description: "Panoramik görüntülü premium restoran.",
        rating: "4.9"
    },

    terrace145: {
        name: "Terrace 145",
        image: "image/terrace145.jpg",
        description: "Şəhərə gözəl mənzərəsi olan restoran.",
        rating: "4.8"
    },

    landmark: {
        name: "Landmark",
        image: "image/landmark.jpg",
        description: "Premium xidmət və rahat atmosfer.",
        rating: "4.7"
    },

    centralbaku: {
        name: "Central Baku",
        image: "image/indir (2).jpg",
        description: "Azərbaycan mətbəxini sevənlər üçün gözəl seçim.",
        rating: "4.8"
    },

    fisincan: {
        name: "Fisincan",
        image: "image/indir (1).jpg",
        description: "Milli mətbəx və rahat ailəvi mühit.",
        rating: "4.6"
    },

    elportalon: {
        name: "El Portalon",
        image: "image/images (8).jpg",
        description: "İspan stili və fərqli atmosfer.",
        rating: "4.9"
    },

    mangal: {
        name: "Mangal Steak House",
        image: "image/images (7).jpg",
        description: "Ət yeməklərini sevənlər üçün ideal restoran.",
        rating: "4.7"
    },

    gardenhouse: {
        name: "Garden House",
        image: "image/caption.jpg",
        description: "Ailəvi restoran və sakit mühit.",
        rating: "4.8"
    }
};

let guests = [];
let foods = [];
let selectedTable = "";

const params =
    new URLSearchParams(window.location.search);

const restaurantId =
    params.get("id");

const restaurant =
    restaurants[restaurantId];

if (restaurant) {

    document.getElementById("restaurantName").innerText =
        restaurant.name;

    document.getElementById("restaurantImage").src =
        restaurant.image;

    document.getElementById("restaurantDescription").innerText =
        restaurant.description;

    document.getElementById("restaurantRating").innerText =
        restaurant.rating;
}

const menuBox =
    document.getElementById("menuGrid");

const foodSelect =
    document.getElementById("foodSelect");

if (menuBox) {

    fetch("https://dummyjson.com/recipes?limit=10")

        .then(function (response) {

            return response.json();
        })

        .then(function (data) {

            data.recipes.forEach(function (recipe, index) {

                let price =
                    8 + index * 3;

                let menuCard =
                    document.createElement("div");

                menuCard.className =
                    "menu-card";

                menuCard.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.name}">

          <div class="menu-content">

            <h3>${recipe.name}</h3>

            <p>${price} AZN</p>

          </div>
        `;

                menuBox.appendChild(menuCard);

                if (foodSelect) {

                    let option =
                        document.createElement("option");

                    option.value =
                        recipe.name;

                    option.textContent =
                        recipe.name +
                        " - " +
                        price +
                        " AZN";

                    option.setAttribute(
                        "data-price",
                        price
                    );

                    foodSelect.appendChild(option);
                }
            });
        });
}

const tables =
    document.querySelectorAll(".table");

tables.forEach(function (table) {

    table.addEventListener("click", function () {

        if (
            table.classList.contains("reserved")
        ) {

            alert(
                "Bu masa artıq rezerv olunub"
            );

            return;
        }

        tables.forEach(function (item) {

            item.classList.remove("selected");
        });

        table.classList.add("selected");

        selectedTable =
            table.getAttribute("data-table");

        document.getElementById(
            "selectedTableText"
        ).innerText =
            selectedTable;
    });
});

const reserveBtn =
    document.getElementById("reserveBtn");

if (reserveBtn) {

    reserveBtn.addEventListener("click", function () {

        let date =
            document.getElementById(
                "reservationDate"
            ).value;

        let time =
            document.getElementById(
                "reservationTime"
            ).value;

        let guestCount =
            document.getElementById(
                "guestCount"
            ).value;

        if (
            date === "" ||
            time === "" ||
            guestCount === "" ||
            selectedTable === ""
        ) {

            alert(
                "Bütün məlumatları doldurun"
            );

            return;
        }

        let savedUser =
            JSON.parse(
                localStorage.getItem("user")
            );

        if (savedUser) {

            emailjs.send(
                "service_ow7f8aq",
                "template_54oqmko",
                {

                    name:
                        savedUser.name,

                    email:
                        savedUser.email,

                    restaurant:
                        restaurant.name,

                    date:
                        date,

                    time:
                        time,

                    guestCount:
                        guestCount,

                    table:
                        selectedTable
                }
            )

                .then(function () {

                    console.log(
                        "Rezervasiya emaili göndərildi"
                    );
                })

                .catch(function (error) {

                    console.log(error);
                });

        }

        alert(
            "Rezervasiya tamamlandı! 50 bal qazandınız."
        );

        let points =
            localStorage.getItem("points");

        if (points === null) {

            points = 0;
        }

        points =
            Number(points) + 50;

        localStorage.setItem(
            "points",
            points
        );

    });

}

const addGuestBtn =
    document.getElementById("addGuestBtn");

if (addGuestBtn) {

    addGuestBtn.addEventListener("click", function () {

        let guestName =
            document.getElementById(
                "guestName"
            ).value;

        if (guestName === "") {

            alert(
                "Qonaq adı yazın"
            );

            return;
        }

        guests.push(guestName);

        document.getElementById(
            "guestName"
        ).value = "";

        showGuests();

        updateGuestSelect();
    });
}

function showGuests() {

    let guestList =
        document.getElementById(
            "guestList"
        );

    guestList.innerHTML = "";

    guests.forEach(function (guest) {

        guestList.innerHTML += `
      <p>${guest}</p>
    `;
    });
}

function updateGuestSelect() {

    let foodOwner =
        document.getElementById(
            "foodOwner"
        );

    foodOwner.innerHTML = `
    <option value="">
      Qonaq seç
    </option>

    <option value="all">
      Hamı arasında böl
    </option>
  `;

    guests.forEach(function (guest) {

        foodOwner.innerHTML += `
      <option value="${guest}">
        ${guest}
      </option>
    `;
    });
}

const addFoodBtn =
    document.getElementById("addFoodBtn");

if (addFoodBtn) {

    addFoodBtn.addEventListener("click", function () {

        let selectedFood =
            foodSelect.options[
            foodSelect.selectedIndex
            ];

        let foodOwner =
            document.getElementById(
                "foodOwner"
            ).value;

        if (
            foodSelect.value === "" ||
            foodOwner === ""
        ) {

            alert(
                "Yemək və qonaq seçin"
            );

            return;
        }

        let food = {
            name:
                foodSelect.value,

            price:
                Number(
                    selectedFood.getAttribute(
                        "data-price"
                    )
                ),

            owner:
                foodOwner
        };

        foods.push(food);

        showFoods();
    });
}

function showFoods() {

    let foodList =
        document.getElementById(
            "foodList"
        );

    foodList.innerHTML = "";

    foods.forEach(function (food) {

        let ownerText =
            food.owner === "all"
                ? "Hamı"
                : food.owner;

        foodList.innerHTML += `
      <p>
        ${food.name}
        -
        ${food.price} AZN
        -
        ${ownerText}
      </p>
    `;
    });
}

const equalSplitBtn =
    document.getElementById(
        "equalSplitBtn"
    );

if (equalSplitBtn) {

    equalSplitBtn.addEventListener("click", function () {

        if (
            guests.length === 0 ||
            foods.length === 0
        ) {

            alert(
                "Qonaq və yemək əlavə edin"
            );

            return;
        }

        let totalBill = 0;

        foods.forEach(function (food) {

            totalBill += food.price;
        });

        let perPerson =
            totalBill / guests.length;

        document.getElementById(
            "splitResult"
        ).innerHTML = `
      <p>
        Ümumi hesab:
        ${totalBill} AZN
      </p>

      <p>
        Hər nəfər:
        ${perPerson.toFixed(2)} AZN
      </p>
    `;
    });
}

const personalSplitBtn =
    document.getElementById(
        "personalSplitBtn"
    );

if (personalSplitBtn) {

    personalSplitBtn.addEventListener("click", function () {

        if (
            guests.length === 0 ||
            foods.length === 0
        ) {

            alert(
                "Qonaq və yemək əlavə edin"
            );

            return;
        }

        let result = {};

        guests.forEach(function (guest) {

            result[guest] = 0;
        });

        foods.forEach(function (food) {

            if (food.owner === "all") {

                let share =
                    food.price /
                    guests.length;

                guests.forEach(function (guest) {

                    result[guest] += share;
                });

            } else {

                result[
                    food.owner
                ] += food.price;
            }
        });

        let resultBox =
            document.getElementById(
                "splitResult"
            );

        resultBox.innerHTML = "";

        guests.forEach(function (guest) {

            resultBox.innerHTML += `
        <p>
          ${guest}:
          ${result[guest].toFixed(2)} AZN
        </p>
      `;
        });
    });
}

const mapDiv =
    document.getElementById(
        "restaurantMap"
    );

if (
    mapDiv &&
    restaurant &&
    typeof google !== "undefined"
) {

    let searchText =
        restaurant.name + ", Baku";

    fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        encodeURIComponent(
            searchText
        ) +
        "&key=AIzaSyBDwciGRhPc8tjHQz7RVDgZ0RW1AwxSv1U"
    )

        .then(function (response) {

            return response.json();
        })

        .then(function (data) {

            if (
                data.status !== "OK"
            ) {

                alert(
                    "Restoran tapılmadı"
                );

                return;
            }

            let location =
                data.results[0]
                    .geometry.location;

            document.getElementById(
                "restaurantAddress"
            ).innerText =
                data.results[0]
                    .formatted_address;

            let map =
                new google.maps.Map(
                    document.getElementById(
                        "restaurantMap"
                    ),
                    {
                        zoom: 16,

                        center:
                            location
                    }
                );

            new google.maps.Marker({

                position:
                    location,

                map:
                    map,

                title:
                    restaurant.name
            });
        });
}

if (typeof emailjs !== "undefined") {
    emailjs.init("t3lokHvSaPKPWG0WV");
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("registerName").value.trim();
        let email = document.getElementById("registerEmail").value.trim();
        let password = document.getElementById("registerPassword").value.trim();

        if (!registerForm.checkValidity()) {
            registerForm.reportValidity();
            return;
        }

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Düzgün email daxil edin");
            return;
        }

        emailjs.send("service_ow7f8aq", "template_gqn9fmp", {
            name: name,
            email: email
        }).then(function () {
            let user = {
                name: name,
                email: email,
                password: password
            };

            localStorage.setItem("user", JSON.stringify(user));

            alert("Qeydiyyat uğurludur və email göndərildi");

            document.getElementById("registerName").value = "";
            document.getElementById("registerEmail").value = "";
            document.getElementById("registerPassword").value = "";
        }).catch(function (error) {
            console.log(error);
            alert("Email göndərilmədi");
        });
    });
}



const loginBtn =
    document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", function () {

        let email =
            document.getElementById("loginEmail").value;

        let password =
            document.getElementById("loginPassword").value;

        let savedUser =
            localStorage.getItem("user");

        if (savedUser === null) {

            alert("İstifadəçi tapılmadı");

            return;
        }

        savedUser =
            JSON.parse(savedUser);

        if (
            email === savedUser.email &&
            password === savedUser.password
        ) {

            alert("Giriş uğurludur");

            window.location.href =
                "index.html";

        } else {

            alert("Email və ya şifrə yanlışdır");
        }
    });
}

emailjs.init("t3lokHvSaPKPWG0WV");

const sendMessageBtn =
    document.getElementById("sendMessageBtn");

if (sendMessageBtn) {

    sendMessageBtn.addEventListener("click", function () {

        let name =
            document.getElementById("contactName").value.trim();

        let email =
            document.getElementById("contactEmail").value.trim();

        let message =
            document.getElementById("contactMessage").value.trim();

        if (
            name === "" ||
            email === "" ||
            password === ""
        ) {
            alert("Bütün xanaları doldurun");
            return;
        }

        let emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !emailPattern.test(email)
        ) {
            alert("Düzgün email daxil edin");
            return;
        }

        sendMessageBtn.disabled = true;

        sendMessageBtn.innerText =
            "Göndərilir...";

        let templateParams = {

            name: name,

            email: email,

            message: message,

            title: "Yeni Mesaj"
        };

        emailjs.send(
            "service_ow7f8aq",
            "template_eg8jkav",
            templateParams
        )

            .then(function () {

                alert("Mesaj göndərildi");

                document.getElementById("contactName").value = "";

                document.getElementById("contactEmail").value = "";

                document.getElementById("contactMessage").value = "";

                sendMessageBtn.disabled = false;

                sendMessageBtn.innerText =
                    "Göndər";
            })

            .catch(function () {

                alert("Xəta baş verdi");

                sendMessageBtn.disabled = false;

                sendMessageBtn.innerText =
                    "Göndər";
            });

    });
}


let restaurantSearch =
    document.getElementById("restaurantSearch");

let searchBtn =
    document.getElementById("searchBtn");

function searchRestaurants() {

    let searchValue =
        restaurantSearch.value
            .toLowerCase()
            .trim();

    let cards =
        document.querySelectorAll(".restaurant-card");

    cards.forEach(function (card) {

        let name =
            card.querySelector("h3")
                .innerText
                .toLowerCase();

        if (
            searchValue === ""
        ) {

            card.classList.remove("hide-card");
        }

        else if (
            name.includes(searchValue)
        ) {

            card.classList.remove("hide-card");
        }

        else {

            card.classList.add("hide-card");
        }

    });

}

if (restaurantSearch) {

    restaurantSearch.addEventListener(
        "input",
        searchRestaurants
    );

}

if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        searchRestaurants
    );

}

let selectedRating = 0;

let stars =
    document.querySelectorAll(".star");

stars.forEach(function (star) {

    star.addEventListener("click", function () {

        selectedRating =
            star.dataset.value;

    });

});

let sendReviewBtn =
    document.getElementById("sendReviewBtn");

if (sendReviewBtn) {

    sendReviewBtn.addEventListener("click", function () {

        let reviewText =
            document.getElementById("reviewText").value;

        if (
            reviewText === "" ||
            selectedRating === 0
        ) {

            alert("Rəy yaz və ulduz seç");

            return;
        }

        let reviewsContainer =
            document.getElementById("reviewsContainer");

        reviewsContainer.innerHTML += `
  
        <div class="review-card">

          <h3>
            ${"⭐".repeat(selectedRating)}
          </h3>

          <p>
            ${reviewText}
          </p>

        </div>
        `;

        document.getElementById("reviewText").value = "";

    });

}

