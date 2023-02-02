ul.addEventListener("click", (event) => {
  const target = event.target;
  if (!target.matches(".list_item")) return;

  if (event.ctrlKey) {
    target.classList.toggle("highlighted");
    lastHighlighted = target;
  } else if (event.shiftKey) {
    const start = Array.from(ul.children).indexOf(
      lastHighlighted || ul.children[0]
    );
    const end = Array.from(ul.children).indexOf(target);
    Array.from(ul.children)
      .slice(Math.min(start, end), Math.max(start, end) + 1)
      .forEach((li) => li.classList.add("highlighted"));
    lastHighlighted = target;
  } else {
    ul.querySelectorAll(".highlighted").forEach((li) =>
      li.classList.remove("highlighted")
    );
    target.classList.add("highlighted");
    lastHighlighted = target;
  }
});

const addTopBtn = document.querySelector(".btn-add-beginning");
const addBottomBtn = document.querySelector(".btn-add-end");
const deleteBtn = document.querySelector(".btn-delete");
const sortBtn = document.querySelector(".btn-sort");
const input = document.querySelector(".input");

addTopBtn.addEventListener("click", () => {
  const li = document.createElement("li");
  if (input.value === "") return;
  li.classList.add("list_item");
  li.textContent = input.value;
  ul.prepend(li);
  input.value = "";
});

addBottomBtn.addEventListener("click", () => {
  const li = document.createElement("li");
  if (input.value === "") return;
  li.classList.add("list_item");
  li.textContent = input.value;
  ul.appendChild(li);
  input.value = "";
});

deleteBtn.addEventListener("click", () => {
  ul.querySelectorAll(".highlighted").forEach((li) => li.remove());
});

sortBtn.addEventListener("click", () => {
  const list = Array.from(ul.children);
  list.sort((a, b) => {
    if (a.classList.contains("highlighted")) {
      return -1;
    } else if (b.classList.contains("highlighted")) {
      return 1;
    } else {
      return a.textContent.localeCompare(b.textContent);
    }
  });
  ul.innerHTML = "";
  list.forEach((li) => ul.appendChild(li));
});
