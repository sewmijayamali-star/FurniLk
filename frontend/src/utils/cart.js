export function Loadcart() {
    let cartString = localStorage.getItem("cart");

    if (cartString == null || cartString === "") {
        localStorage.setItem("cart", "[]");
        cartString = "[]";
    }

    return JSON.parse(cartString);
}

export function Addtocart(product, quantity = 1) {

    console.log("PRODUCT OBJECT:", product);
    console.log("PRODUCT _id:", product._id);

    let cart = Loadcart();

    const existingProductIndex = cart.findIndex(
        (item) => item.id === product._id
    );

    if (existingProductIndex !== -1) {

        cart[existingProductIndex].quantity += quantity;

        if (cart[existingProductIndex].quantity <= 0) {
            cart.splice(existingProductIndex, 1);
        }

    } else {

        if (quantity > 0) {

            const cartItem = {
                id: product._id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                img: product.img
            };

            cart.push(cartItem);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}