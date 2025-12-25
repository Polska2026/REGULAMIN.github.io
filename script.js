// Skrypt liczący sumy (min i max) dla zaznaczonych pozycji.
// Działa na zmianę checkboxów i pól ilości (qty).

document.addEventListener("DOMContentLoaded", () => {
  const updateTotals = () => {
    const items = document.querySelectorAll(".item");
    let totalMin = 0;
    let totalMax = 0;

    items.forEach(item => {
      const checkbox = item.querySelector(".item-checkbox");
      const qtyInput = item.querySelector(".qty");
      const qty = Math.max(1, Number(qtyInput?.value) || 1);

      if (checkbox && checkbox.checked) {
        const min = Number(item.dataset.min) || 0;
        const max = Number(item.dataset.max) || 0;
        totalMin += min * qty;
        totalMax += max * qty;
      }
    });

    // Formatowanie dla PL (np. 5 000)
    const fmt = (n) => n.toLocaleString('pl-PL') + " zł";

    document.getElementById("total-min").textContent = fmt(totalMin);
    document.getElementById("total-max").textContent = fmt(totalMax);
    document.getElementById("pay-range").textContent = `${fmt(totalMin)} — ${fmt(totalMax)}`;
  };

  // Nasłuchiwanie zmian na checkboxach i polach qty
  document.body.addEventListener("change", (e) => {
    if (e.target.matches(".item-checkbox") || e.target.matches(".qty")) {
      updateTotals();
    }
  });

  // Zadbaj żeby ilość była >= 1
  document.body.addEventListener("input", (e) => {
    if (e.target.matches(".qty")) {
      if (e.target.value === "" || Number(e.target.value) < 1) {
        // tymczasowo niech będzie 1
        e.target.value = 1;
      }
      updateTotals();
    }
  });

  // Obsługa rozwijania kategorii (toggle)
  document.querySelectorAll(".category-header").forEach(btn => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      const body = btn.nextElementSibling;
      if (!expanded) {
        body.hidden = false;
      } else {
        body.hidden = true;
      }
    });
  });

  // Inicjalne podliczenie
  updateTotals();
});
