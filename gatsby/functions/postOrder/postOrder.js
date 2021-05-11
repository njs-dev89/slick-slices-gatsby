const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

function generateOrderEmail({order, total}) {
    return `
        <div>
            <h2>Your Recent Order for ${total}</h2>
            <p>Please start walking over your order would be ready in 20 minutes</p>
            <ul>
            ${order.map(item => `<li>
                <img src="${item.thumbnail}" alt="${item.name}"/>
                ${item.size} ${item.name} - ${item.price}
            </li>`).join('')}
            </ul>
            <p>Your total is <strong>${total}</strong> at pickup</p>
            <style>
                ul {
                    list-style: none;
                }
            </style>
        </div>
    `
}

exports.handler = async (event, context) => {
    const body = JSON.parse(event.body)

    const requiredField = ['name', 'email', 'order']

    if(body.maplesyrup) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: `I Know You are a bot`})
        }
    }

    for (const field of requiredField) {
        if(!body[field]) {
            return {
                statusCode: 400,
                body: JSON.stringify({message: `Oops it looks like you are missing ${field} field`})
            }
        }
    }
    if(!body.order.length) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: `Oops Your order is Empty`})
        }
    }

    const info = await transporter.sendMail({
        from: "Slick's Slices <slick@example.com>",
        to: `${body.name} <${body.email}> ,orders@example.com`,
        subject: "New order",
        html: generateOrderEmail({order: body.order, total: body.total})
    })
    
    return {
        statusCode: 200,
        body: JSON.stringify({message: "Success"})
    }
}