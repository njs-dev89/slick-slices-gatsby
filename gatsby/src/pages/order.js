import { graphql } from 'gatsby'
import React from 'react'
import calculatePizzaPrice from '../utils/calculatePizzaPrice'
import formatMoney from '../utils/formatMoney'
import useForm from '../utils/useForm'
import Img from 'gatsby-image'
import SEO from "../components/SEO"
import OrderStyles from '../styles/OrderStyles'
import MenuItemStyles from '../styles/MenuItemStyles'
import usePizza from '../utils/usePizza'
import OrderPizza from '../components/OrderPizza'
import calculateOrderTotal from '../utils/calculateOrderTotal'

function OrderPage({data: {pizzas}}) {
    const {values, updateValue} = useForm({
        name: "",
        email: "",
        maplesyrup: ""
    })
    const {order, addToOrder, removeFromOrder, error, loading, message, submitOrder} = usePizza({pizzas: pizzas.nodes, values})
    {if(message) {
      return <p>{message}</p>
    }}
    return (
        <>
        <SEO title="Order a Pizza"/>
        <OrderStyles onSubmit={submitOrder}>
            <fieldset disabled={loading}>
                <legend>Your Info</legend>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={values.name} onChange={updateValue}/>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={values.email} onChange={updateValue}/>
                <input type="text" name="maplesyrup" value={values.maplesyrup} onChange={updateValue} className="maplesyrup"/>
            </fieldset>
            <fieldset className="menu" disabled={loading}>
                <legend>Menu</legend>
                {pizzas.nodes.map(pizza => (
                  <MenuItemStyles key={pizza.id}>
                    <Img fluid={pizza.image.asset.fluid}/>
                    <div>
                      <h2>{pizza.name}</h2>
                    </div>
                    <div>
                    {['S', 'M', 'L'].map(size => (
                      <button key={size} type="button" onClick={()=> addToOrder({id: pizza.id, size})}>{size} {formatMoney(calculatePizzaPrice(pizza.price, size))}</button>
                    ))}
                    </div>
                  </MenuItemStyles>
                ))}
            </fieldset>
            <fieldset className="order" disabled={loading}>
                <legend>Order</legend>
                <OrderPizza order={order} pizzas={pizzas.nodes} removeFromOrder={removeFromOrder}/>
            </fieldset>
            <fieldset>
              <h3>Your Total is {formatMoney(calculateOrderTotal(order, pizzas.nodes))}</h3>
              <div>
                {error ? <p>{error}</p>: ''}
              </div>
              <button type="submit" disabled={loading}>{loading? 'Placing order': 'Order Ahead'}</button>
            </fieldset>
        </OrderStyles>  
        </>
    )
}

export default OrderPage

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        price
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`
