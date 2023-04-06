import { menuArray } from './data.js'

const menuOptions = document.getElementById('menu-options')

function renderMenuOptions() {
    let innerHTML = ''
    menuArray.forEach(menuOption => {
        let ingredients = ''
        menuOption.ingredients.forEach(ingredient => {
            ingredients += ingredient + ', '
        })
        ingredients = ingredients.substring(0, ingredients.length - 1)

        innerHTML += `
            <div class="menu-option">
                <div id="emoji">
                  ${menuOption.emoji}
                </div>
                <div id="details">
                  <p>${menuOption.name}</p>
                  <p>${ingredients}</p>
                  <p>${menuOption.price}</p>
                </div>
                <div id="add-option-btn">
					<button>+</button>				
                </div>
            </div>
        `

    })
    menuOptions.innerHTML = innerHTML
}

renderMenuOptions()
