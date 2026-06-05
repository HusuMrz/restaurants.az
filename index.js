const restoranlar = {
  ruby360: {
    ad: "Ruby 360",
    sekil: "image/ruby360.jpg",
    melumat: "Panoramik görüntülü premium restoran.",
    reytinq: "4.9",
    unvan: "Bakı, Nizami küçəsi"
  },

  terrace145: {
    ad: "Terrace 145",
    sekil: "image/terrace145.jpg",
    melumat: "Şəhərə gözəl mənzərəsi olan restoran.",
    reytinq: "4.8",
    unvan: "Bakı, 28 May"
  },

  landmark: {
    ad: "Landmark",
    sekil: "image/landmark.jpg",
    melumat: "Premium xidmət və rahat atmosfer.",
    reytinq: "4.7",
    unvan: "Bakı, Landmark"
  },

  centralbaku: {
    ad: "Central Baku",
    sekil: "image/indir (2).jpg",
    melumat: "Azərbaycan mətbəxini sevənlər üçün gözəl seçim.",
    reytinq: "4.8",
    unvan: "Bakı, Mərkəz"
  },

  fisincan: {
    ad: "Fisincan",
    sekil: "image/indir (1).jpg",
    melumat: "Milli mətbəx və rahat ailəvi mühit.",
    reytinq: "4.6",
    unvan: "Bakı, İçərişəhər"
  },

  elportalon: {
    ad: "El Portalon",
    sekil: "image/images (8).jpg",
    melumat: "İspan stili və fərqli atmosfer.",
    reytinq: "4.9",
    unvan: "Bakı, Old City"
  },

  mangal: {
    ad: "Mangal Steak House",
    sekil: "image/images (7).jpg",
    melumat: "Ət yeməklərini sevənlər üçün ideal restoran.",
    reytinq: "4.7",
    unvan: "Bakı, Gənclik"
  },

  gardenhouse: {
    ad: "Garden House",
    sekil: "image/caption.jpg",
    melumat: "Ailəvi restoran və sakit mühit.",
    reytinq: "4.8",
    unvan: "Bakı, Yasamal"
  }
};

let qonaqlar = [];
let yemekler = [];
let secilenMasa = "";

const parametrler = new URLSearchParams(window.location.search);
const restoranId = parametrler.get("id");
const restoran = restoranlar[restoranId];

const restoranAdi = document.getElementById("restaurantName");

if (restoranAdi && restoran) {
  document.getElementById("restaurantName").innerText = restoran.ad;
  document.getElementById("restaurantImage").src = restoran.sekil;
  document.getElementById("restaurantDescription").innerText = restoran.melumat;
  document.getElementById("restaurantRating").innerText = restoran.reytinq;
  document.getElementById("restaurantAddress").innerText = restoran.unvan;
}

const menyuQutusu = document.getElementById("menuGrid");
const yemekSecimi = document.getElementById("foodSelect");

if (menyuQutusu) {
  fetch("https://dummyjson.com/recipes?limit=10")
    .then(function (cavab) {
      return cavab.json();
    })
    .then(function (data) {
      data.recipes.forEach(function (recipe, index) {
        let qiymet = 8 + index * 3;

        let menyuKarti = document.createElement("div");
        menyuKarti.className = "menu-card";

        menyuKarti.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.name}">
          <div class="menu-content">
            <h3>${recipe.name}</h3>
            <p>${qiymet} AZN</p>
          </div>
        `;

        menyuQutusu.appendChild(menyuKarti);

        if (yemekSecimi) {
          let secim = document.createElement("option");
          secim.value = recipe.name;
          secim.textContent = recipe.name + " - " + qiymet + " AZN";
          secim.setAttribute("data-price", qiymet);
          yemekSecimi.appendChild(secim);
        }
      });
    });
}

const masalar = document.querySelectorAll(".table");

masalar.forEach(function (masa) {
  masa.addEventListener("click", function () {
    if (masa.classList.contains("reserved")) {
      alert("Bu masa artıq rezerv olunub");
      return;
    }

    masalar.forEach(function (item) {
      item.classList.remove("selected");
    });

    masa.classList.add("selected");
    secilenMasa = masa.getAttribute("data-table");

    document.getElementById("selectedTableText").innerText = secilenMasa;
  });
});

const rezervBtn = document.getElementById("reserveBtn");

if (rezervBtn) {
  rezervBtn.addEventListener("click", function () {
    let tarix = document.getElementById("reservationDate").value;
    let saat = document.getElementById("reservationTime").value;
    let qonaqSayi = document.getElementById("guestCount").value;

    if (tarix === "" || saat === "" || qonaqSayi === "" || secilenMasa === "") {
      alert("Zəhmət olmasa tarix, saat, qonaq sayı və masa seçin");
      return;
    }

    alert("Rezervasiya tamamlandı! 50 bal qazandınız.");

    let xallar = localStorage.getItem("xallar");

    if (xallar === null) {
      xallar = 0;
    }

    xallar = Number(xallar) + 50;

    localStorage.setItem("xallar", xallar);
  });
}

const qonaqElaveBtn = document.getElementById("addGuestBtn");

if (qonaqElaveBtn) {
  qonaqElaveBtn.addEventListener("click", function () {
    let qonaqAdi = document.getElementById("guestName").value;

    if (qonaqAdi === "") {
      alert("Qonaq adı yazın");
      return;
    }

    qonaqlar.push(qonaqAdi);

    document.getElementById("guestName").value = "";

    qonaqlariGoster();
    qonaqSeciminiYenile();
  });
}

function qonaqlariGoster() {
  let qonaqListi = document.getElementById("guestList");
  qonaqListi.innerHTML = "";

  qonaqlar.forEach(function (qonaq) {
    qonaqListi.innerHTML += `<p>${qonaq}</p>`;
  });
}

function qonaqSeciminiYenile() {
  let yemekSahibi = document.getElementById("foodOwner");
  yemekSahibi.innerHTML = "";

  yemekSahibi.innerHTML += `<option value="">Qonaq seç</option>`;
  yemekSahibi.innerHTML += `<option value="all">Hamı arasında böl</option>`;

  qonaqlar.forEach(function (qonaq) {
    yemekSahibi.innerHTML += `<option value="${qonaq}">${qonaq}</option>`;
  });
}

const yemekElaveBtn = document.getElementById("addFoodBtn");

if (yemekElaveBtn) {
  yemekElaveBtn.addEventListener("click", function () {
    let secilenYemek = yemekSecimi.options[yemekSecimi.selectedIndex];
    let yemekSahibi = document.getElementById("foodOwner").value;

    if (yemekSecimi.value === "" || yemekSahibi === "") {
      alert("Yemək və qonaq seçin");
      return;
    }

    let yemek = {
      ad: yemekSecimi.value,
      qiymet: Number(secilenYemek.getAttribute("data-price")),
      sahib: yemekSahibi
    };

    yemekler.push(yemek);

    yemekleriGoster();
  });
}

function yemekleriGoster() {
  let yemekListi = document.getElementById("foodList");
  yemekListi.innerHTML = "";

  yemekler.forEach(function (yemek) {
    let sahibMetni = yemek.sahib === "all" ? "Hamı" : yemek.sahib;

    yemekListi.innerHTML += `
      <p>${yemek.ad} - ${yemek.qiymet} AZN - ${sahibMetni}</p>
    `;
  });
}

const beraberBolBtn = document.getElementById("equalSplitBtn");

if (beraberBolBtn) {
  beraberBolBtn.addEventListener("click", function () {
    if (qonaqlar.length === 0 || yemekler.length === 0) {
      alert("Qonaq və yemək əlavə edin");
      return;
    }

    let umumiHesab = 0;

    yemekler.forEach(function (yemek) {
      umumiHesab += yemek.qiymet;
    });

    let herNefere = umumiHesab / qonaqlar.length;

    document.getElementById("splitResult").innerHTML =
      `<p>Ümumi hesab: ${umumiHesab} AZN</p>
       <p>Hər nəfər: ${herNefere.toFixed(2)} AZN</p>`;
  });
}

const ozYediyiniOdeBtn = document.getElementById("personalSplitBtn");

if (ozYediyiniOdeBtn) {
  ozYediyiniOdeBtn.addEventListener("click", function () {
    if (qonaqlar.length === 0 || yemekler.length === 0) {
      alert("Qonaq və yemək əlavə edin");
      return;
    }

    let netice = {};

    qonaqlar.forEach(function (qonaq) {
      netice[qonaq] = 0;
    });

    yemekler.forEach(function (yemek) {
      if (yemek.sahib === "all") {
        let pay = yemek.qiymet / qonaqlar.length;

        qonaqlar.forEach(function (qonaq) {
          netice[qonaq] += pay;
        });
      } else {
        netice[yemek.sahib] += yemek.qiymet;
      }
    });

    let neticeQutusu = document.getElementById("splitResult");
    neticeQutusu.innerHTML = "";

    qonaqlar.forEach(function (qonaq) {
      neticeQutusu.innerHTML += `<p>${qonaq}: ${netice[qonaq].toFixed(2)} AZN</p>`;
    });
  });
}