import path from "path"
async function turnPizzasIntoPages({graphql, actions}) {
    const pizzaTemplate = path.resolve("./src/templates/Pizza.js")

    const {data} = await graphql(`
        query {
            pizzas: allSanityPizza {
                nodes {
                    name
                    slug {
                        current
                    }
                }
            }
        }
    `)
         
    data.pizzas.nodes.forEach(pizza => {
        actions.createPage({
            path: `/pizza/${pizza.slug.current}`,
            component: pizzaTemplate,
            context: {
                slug: pizza.slug.current
            }
        })
    })
    
}

async function turnToppingIntoPages({graphql, actions}) {
    const toppingTemplate = path.resolve("./src/pages/pizzas.js")
    const {data} = await graphql(`
        query {
            toppings: allSanityTopping {
                nodes {
                    name
                    id
                }
            }
        }
    `)
    data.toppings.nodes.forEach(topping => {
        actions.createPage({
            path: `/topping/${topping.name}`,
            component: toppingTemplate,
            context: {
                topping: topping.name
            }
        })
    })
}

async function turnSlicemastersIntoPages({graphql, actions}) {
    const {data} = await graphql(`
        query {
            slicemasters: allSanityPerson {
                totalCount
                nodes {
                    name
                    id
                    slug {
                        current
                    }
                }
            }
        }
    `)
    data.slicemasters.nodes.forEach(slicemaster => {
        actions.createPage({
            path: `/slicemaster/${slicemaster.slug.current}`,
            component: path.resolve('./src/templates/Slicemaster.js'),
            context: {
                slug: slicemaster.slug.current
            }
        })
    })
    const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE)
    const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize)

    Array.from({length: pageCount}).forEach((_, i)=> {
        actions.createPage({
            path: `/slicemasters/${i+1}`,
            component: path.resolve('./src/pages/slicemasters.js'),
            context: {
                skip: i * pageSize,
                currentPage: i+1,
                pageSize
            }
        })
    })
}

export async function createPages(params) {
await Promise.all([
    turnPizzasIntoPages(params), 
    turnToppingIntoPages(params),
    turnSlicemastersIntoPages(params)
])
}