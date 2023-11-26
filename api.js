const harcama = document.getElementById("harcama");
const calender = document.querySelector(".date");
const harcama_miktari = document.getElementById("harcama_miktari");
const harcama_alani = document.getElementById("harcama_alani");
const tbody = document.querySelector("#tbody");
const gelir_ekle = document.getElementById("ekle_form");
const gelir_value = document.getElementById("gelir");
const sum_gelir = document.querySelector("#sum_gelir");
const gelirim_td = document.querySelector("#gelirim");
const giderId = document.querySelector("#giderId");
const kalanId = document.querySelector("#kalanId");
const deleticon = document.querySelectorAll(".fas");
let gelirCount = 0;
let giderCount = 0;
let kalan = 0;

harcama.addEventListener("submit", (e) => {
  e.preventDefault();
  const tarih = calender.value;
  const harcama_miktarim = harcama_miktari.value;

  const harcama_alanim = harcama_alani.value;

  let icerik = tbody.innerHTML;
  icerik += `<tr>
    <td scope="row">${tarih}</td>
    <td scope="row">${harcama_alanim}</td>
    <td scope="row" class="second-td">${harcama_miktarim}</td>
    <td><i class="fas fa-trash-alt"></i></td>
    </tr>`;
  tbody.innerHTML = icerik;
  giderHesapla();
  kalanHesapla();
  harcama_miktari.value = "";
  harcama_alani.value = "";
  kaydetLocalStorage();
});

gelir_ekle.addEventListener("submit", (e) => {
  e.preventDefault();
  let gelir_miktari = Number(gelir_value.value); //number
  gelirCount += gelir_miktari;
  gelirim_td.textContent = gelirCount;
  kalanHesapla();
  kaydetLocalStorage();
});

function giderHesapla() {
  let gider = Number(harcama_miktari.value);
  giderCount += gider;
  giderId.textContent = giderCount;
  kaydetLocalStorage();
}
function kalanHesapla() {
  kalan = gelirCount - giderCount;
  kalanId.textContent = kalan;
  kalanKontrol();

  kaydetLocalStorage();
}

const harcama_tablo = document.getElementById("harc_tablo");

harcama_tablo.addEventListener("click", (e) => {
  if (e.target.classList.contains("fas")) {
    let tr = e.target.closest("tr").children[2].innerText;
    let deg = e.target.parentElement.parentElement.childNodes[2];
    console.log(tr);
    e.target.parentElement.parentElement.remove();
    giderCount -= Number(tr);
    giderId.textContent = giderCount;
    kalanHesapla();
  }
  kaydetLocalStorage();
  kalanKontrol();
});

function kaydetLocalStorage() {
  localStorage.setItem("Toplam_Gider", giderCount);
  localStorage.setItem("Toplam_Gelir", gelirCount);
  localStorage.setItem(
    "Harcama_Bilgileri",
    document.querySelector("#tbody").innerHTML
  );
}

function localiyukle() {
  giderCount = Number(localStorage.getItem("Toplam_Gider")) || 0;
  giderId.textContent = giderCount;
  gelirCount = Number(localStorage.getItem("Toplam_Gelir")) || 0;
  gelirim_td.textContent = gelirCount;
  // kalanHesapla;
  kalan = gelirCount - giderCount;
  kalanId.textContent = kalan;
  let harcama = localStorage.getItem("Harcama_Bilgileri") || "";
  let tbodyh = document.querySelector("#tbody");
  tbodyh.innerHTML = harcama;
}
localiyukle();

const allclear = document.getElementById("allclear");
allclear.addEventListener("click", function () {
  if (confirm("Silmek istediğinize emin misiniz?")) {
    localStorage.clear();
    location.reload();
  }
});
function kalanKontrol() {
  console.log(kalanId.textContent);
  if (Number(kalanId.textContent) < 0) {
    const kalan = document.querySelector(".kalan");
    kalan.style.color = "red";
    kalanId.style.color = "red";
  } else {
    const kalan = document.querySelector(".kalan");
    kalan.style.color = "black";
    kalanId.style.color = "black";
  }
}
kalanKontrol();
