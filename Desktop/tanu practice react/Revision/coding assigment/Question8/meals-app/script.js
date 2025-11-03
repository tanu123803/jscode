


const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?f=a"; 
const cardsContainer = document.getElementById("cardsContainer");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const resetBtn = document.getElementById("resetBtn");
const noResult = document.getElementById("noResult");


let originalMeals = []; 
let workingMeals = [];  

// Fetch data
async function fetchMeals() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Network response not ok");
    const data = await res.json();
    originalMeals = Array.isArray(data.meals) ? data.meals : [];
  
    originalMeals = originalMeals.map(m => ({
      id: m.idMeal,
      name: m.strMeal || "",
      category: m.strCategory || "",
      area: m.strArea || "",
      thumb: m.strMealThumb || ""
    }));
    workingMeals = [...originalMeals];
    renderCards(workingMeals);
  } catch (err) {
    console.error("Fetch failed:", err);
    cardsContainer.innerHTML = `<div class="no-result">Failed to load data. Check console.</div>`;
  }
}


function renderCards(list) {
  cardsContainer.innerHTML = "";
  if (!list || list.length === 0) {
    noResult.hidden = false;
    return;
  }
  noResult.hidden = true;

  const fragment = document.createDocumentFragment();

  list.forEach(item => {
    const card = document.createElement("article");
    card.className = "card";

    const img = document.createElement("img");
    img.src = item.thumb;
    img.alt = item.name;

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = item.name;

    const meta1 = document.createElement("div");
    meta1.className = "meta";
    meta1.textContent = `Category: ${item.category}`;

    const meta2 = document.createElement("div");
    meta2.className = "meta";
    meta2.textContent = `Area: ${item.area}`;

    body.appendChild(title);
    body.appendChild(meta1);
    body.appendChild(meta2);

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const viewBtn = document.createElement("button");
    viewBtn.className = "small-btn";
    viewBtn.textContent = "View";
    viewBtn.onclick = () => alert(`${item.name}\n\nCategory: ${item.category}\nArea: ${item.area}`);

    const idSpan = document.createElement("span");
    idSpan.style.fontSize = "12px";
    idSpan.style.color = "#6b7280";
    idSpan.textContent = `ID: ${item.id}`;

    actions.appendChild(viewBtn);
    actions.appendChild(idSpan);

    card.appendChild(img);
    card.appendChild(body);
    card.appendChild(actions);

    fragment.appendChild(card);
  });

  cardsContainer.appendChild(fragment);
}


function applyFilterAndSort() {
  const q = searchInput.value.trim().toLowerCase();

 
  let filtered = originalMeals.filter(m => {
    if (!q) return true;
    return m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q);
  });


  const sortVal = sortSelect.value;
  if (sortVal) {
    const [key, dir] = sortVal.split("-");
    filtered.sort((a, b) => {
      const va = (a[key] || "").toLowerCase();
      const vb = (b[key] || "").toLowerCase();
      if (va < vb) return dir === "asc" ? -1 : 1;
      if (va > vb) return dir === "asc" ? 1 : -1;
      return 0;
    });
  }

  workingMeals = filtered;
  renderCards(workingMeals);
}


resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  sortSelect.value = "";
  workingMeals = [...originalMeals];
  renderCards(workingMeals);
});


searchInput.addEventListener("input", () => {
  applyFilterAndSort();
});


sortSelect.addEventListener("change", () => {
  applyFilterAndSort();
});


fetchMeals();
