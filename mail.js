// mailto: links silently do nothing on machines with no mail app configured.
// So every email link ALSO copies the address and says so — the click always
// visibly works, whether or not a mail client opens.
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="mailto:"]');
  if (!a) return;
  const addr = a.getAttribute("href").replace(/^mailto:/, "").split("?")[0];
  if (!navigator.clipboard) return; // http + old browsers: keep plain mailto
  navigator.clipboard
    .writeText(addr)
    .then(() => {
      let t = document.querySelector(".toast");
      if (!t) {
        t = document.createElement("div");
        t.className = "toast";
        document.body.appendChild(t);
      }
      t.textContent = "email address copied — paste it anywhere";
      t.classList.add("show");
      clearTimeout(t._hide);
      t._hide = setTimeout(() => t.classList.remove("show"), 2600);
    })
    .catch(() => {});
});
