function removedrinks() {
    let drinksList = document.querySelector('#drinks-list');
    let drinksArray = Array.from(drinksList.children).map((li) => li.textContent);
    drinksList.innerHTML = '';
    let uniqueDrinks = [...new Set(drinksArray)].sort().forEach((drink) => {
        let li = document.createElement('li');
        li.textContent = drink;
        drinksList.appendChild(li);
    });
}
removedrinks();


