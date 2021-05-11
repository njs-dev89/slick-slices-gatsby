import React from 'react'
import MenuItemStyles from '../styles/MenuItemStyles'
import calculatePizzaPrice from '../utils/calculatePizzaPrice'
import formatMoney from '../utils/formatMoney'
import Img from 'gatsby-image'

export default function OrderPizza({order, pizzas, removeFromOrder}) {
    return (
        <>
            {order.map((item, idx) =>{
                const pizza = pizzas.find(pizza => pizza.id === item.id)
                return (
                    <MenuItemStyles key={`${item.id} - ${idx}`}>
                        <Img fluid={pizza.image.asset.fluid}/>
                        <h2>{pizza.name}</h2>
                        <p>
                            {formatMoney(calculatePizzaPrice(pizza.price, item.size))}
                            <button 
                            type="button" 
                            className="remove" 
                            title={`Remove ${item.size} ${pizza.name} from Order`}
                            onClick={()=> removeFromOrder(idx)}
                            >
                                &times;
                            </button>
                        </p>
                    </MenuItemStyles>
                    )
            })}
        </>
    )
}
