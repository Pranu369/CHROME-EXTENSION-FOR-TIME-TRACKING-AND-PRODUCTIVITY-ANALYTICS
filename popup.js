document.addEventListener("DOMContentLoaded", function () {
  const productiveInput = document.getElementById("productiveInput");
  const unproductiveInput = document.getElementById("unproductiveInput");
  const addProductive = document.getElementById("addProductive");
  const addUnproductive = document.getElementById("addUnproductive");
  const productiveList = document.getElementById("productiveList");
  const unproductiveList = document.getElementById("unproductiveList");
  const saveSettings = document.getElementById("saveSettings");

  // Load from localStorage
  const settings = JSON.parse(localStorage.getItem("productivitySettings")) || {
    productive: [],
    unproductive: [],
  };

  function renderList() {
    productiveList.innerHTML = "";
    unproductiveList.innerHTML = "";

    settings.productive.forEach(site => {
      const li = document.createElement("li");
      li.textContent = site;
      productiveList.appendChild(li);
    });

    settings.unproductive.forEach(site => {
      const li = document.createElement("li");
      li.textContent = site;
      unproductiveList.appendChild(li);
    });
  }

  addProductive.addEventListener("click", () => {
    const value = productiveInput.value.trim();
    if (value && !settings.productive.includes(value)) {
      settings.productive.push(value);
      productiveInput.value = "";
      renderList();
    }
  });

  addUnproductive.addEventListener("click", () => {
    const value = unproductiveInput.value.trim();
    if (value && !settings.unproductive.includes(value)) {
      settings.unproductive.push(value);
      unproductiveInput.value = "";
      renderList();
    }
  });

  saveSettings.addEventListener("click", () => {
    localStorage.setItem("productivitySettings", JSON.stringify(settings));
    alert("✅ Settings saved!");
  });

  renderList();
});
