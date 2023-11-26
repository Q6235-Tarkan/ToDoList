const yapilacaklar = document.querySelector(".yapilacaklar");
const eklebtn = document.getElementById("ekle");
const ulElement = document.querySelector(".ul");
const formCheck = document.getElementById("myCheckBox");
const listeler = document.querySelector(".listeler");

eklebtn.addEventListener("click", () => {
  displayNone();
  const yapilacakliste = yapilacaklar.value.trim();
  if (yapilacakliste === "") {
    alert("Boş Bırakmayınız.");
  } else {
    console.log("giriyormu");
    ulElement.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
    <div>
        
        <input class="form-check-input" type="checkbox" value="" id="myCheckBox">
        <label class="form-check-label" for="">${yapilacakliste}</label>
      </div>
      <i class="fa-solid fa-trash-can  "></i>
    </li>`;
    localekaydet();
    defoultdeger();
  }
});
function defoultdeger() {
  yapilacaklar.value = "";
}

ulElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-solid")) {
    e.target.parentElement.remove();

    const ulElement = document.querySelector("ul");
    const hasListItem = ulElement.querySelector("li") !== null;

    if (hasListItem) {
    } else {
      // ul içinde li elementi yok
      listeler.style.display = "none";
    }
  }
  localekaydet();
});

function displayNone() {
  listeler.style.display = "block";
}

function localekaydet() {
  const localeliste = ulElement.innerHTML;
  localStorage.setItem("Listeler", localeliste);
}
function localdenbilgial() {
  const ulici = localStorage.getItem("Listeler") || "";
  const ulElement = document.querySelector(".ul");
  ulElement.innerHTML += ulici;
}
localdenbilgial();
