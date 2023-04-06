import {menuArray} from './data.js'

const menuOptions = document.getElementById('menu-options')
const order = []

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
                <div>
					<button class="add-option-btn" data-add-option-id="${menuOption.id}">+</button>				
                </div>
            </div>
        `

    })
    menuOptions.innerHTML = innerHTML
}

renderMenuOptions()

document.addEventListener('click', (e) => {
    if (e.target.dataset.addOptionId) {
        addMenuOption(e.target.dataset.addOptionId)
    } else if (e.target.dataset.removeOptionId) {
        removeMenuOption(e.target.dataset.removeOptionId)
    }
})

let orderItems = []

function addMenuOption(id) {
    let option = menuArray.filter(option => option.id == id)[0]
    orderItems.push(option)
    renderOrder()
}

function removeMenuOption(id) {
    let option = menuArray.filter(option => option.id == id)[0]
    let index = orderItems.indexOf(option)
    orderItems.splice(index, 1)
    renderOrder()
}

function renderOrder() {
    if (orderItems.length > 0) {
        document.getElementById('order-and-thank-you').classList.remove('hidden')
        const orderItemsEl = document.getElementById('order-items')
        let innerHTML = ''
        let totalPrice = 0
        orderItems.forEach(item => {
            totalPrice += item.price
            innerHTML += `
            <div>
              <p>${item.name}</p>
              <button data-remove-option-id="${item.id}">Remove</button>
              <p>${item.price}</p>
            </div>
        `
        })
        orderItemsEl.innerHTML = innerHTML
        document.getElementById('total-price').innerHTML = `
          <p>Total price:</p>
          <p>${totalPrice}</p>
        `
    } else {
        document.getElementById('order-and-thank-you').classList.add('hidden')
    }
}

const completeOrderBtn = document.getElementById('complete-order-btn')
completeOrderBtn.addEventListener('click', () => {
})
