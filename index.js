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
