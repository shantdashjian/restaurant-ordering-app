import {menuArray} from './data.js'

const menuOptions = document.getElementById('menu-options')
const orderItems = []
const order = []
const completeOrderBtn = document.getElementById('complete-order-btn')
const cardDetailsForm = document.getElementById('card-details-form')

renderMenuOptions()

function renderMenuOptions() {
    menuOptions.innerHTML = menuArray.map(menuOption => {
        const ingredients = menuOption.ingredients.join(', ');
        return `
            <div class="menu-option flex">
                <div class="emoji">
                  ${menuOption.emoji}
                </div>
                <div class="details">
                  <p class="menu-option-name">${menuOption.name}</p>
                  <p class="menu-option-ingredients">${ingredients}</p>
                  <p class="menu-option-price">$${menuOption.price}</p>
                </div>
                <div class="add-option-btn-container">
					<button class="add-option-btn" data-add-option-id="${menuOption.id}">+</button>				
                </div>
            </div>
        `
    }).join('')
}

document.addEventListener('click', (e) => {
    if (e.target.dataset.addOptionId) {
        addMenuOption(e.target.dataset.addOptionId)
    } else if (e.target.dataset.removeOptionId) {
        removeMenuOption(e.target.dataset.removeOptionId)
    }
})

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
        document.getElementById('order').classList.remove('hidden')
        document.getElementById('thank-you').classList.add('hidden')
        const orderItemsEl = document.getElementById('order-items')
        let totalPrice = 0
        orderItemsEl.innerHTML = orderItems.map(item => {
            totalPrice += item.price
            return `
            <div class="order-item flex">
              <p class="order-item-name">${item.name}</p>
              <button data-remove-option-id="${item.id}" class="order-item-remove">remove</button>
              <p class="order-item-price">$${item.price}</p>
            </div>
        `
        }).join('')
        document.getElementById('total-price').innerHTML = `
          <p class="total-price-title">Total price:</p>
          <p class="total-price-value">$${totalPrice}</p>
        `
    } else {
        document.getElementById('order-and-thank-you').classList.add('hidden')
    }
}

completeOrderBtn.addEventListener('click', () => {
    let cardDetails = document.getElementById('card-details');
    cardDetails.classList.remove('hidden')
})

cardDetailsForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const cardDetailsFormData = new FormData(cardDetailsForm)
    const name = cardDetailsFormData.get('name')
    cardDetailsForm.reset()
    document.getElementById('card-details').classList.add('hidden')
    let thankYouEl = document.getElementById('thank-you');
    document.getElementById('order').classList.add('hidden')
    thankYouEl.classList.remove('hidden')
    thankYouEl.innerHTML = `
        <p>Thanks, ${name}! Your order is on its way!</p>
    `
    orderItems.length = 0
})
