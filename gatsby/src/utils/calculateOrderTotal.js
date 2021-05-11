import calculatePizzaPrice from "./calculatePizzaPrice"

export default function calculateOrderTotal(order, pizzas) {
    return order.reduce((total,item) => {
        const pizza = pizzas.find(pizza => pizza.id === item.id)
        return total + calculatePizzaPrice(pizza.price, item.size)
    }, 0)
}