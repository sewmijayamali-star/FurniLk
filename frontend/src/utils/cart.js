export function Loadcart(){
    let catr = localStorage.getItem("cart");
    if (catr== null){
        localStorage.SetItem("cart", []);
        catr=="[]"

    }

    const catr = JSON.parse(catr);
    return catr;
}
export function Addtocart(product){
    let cart = Loadcart();

    const existingProductIndex = cart.findIndex
    (item =>{
        return item.id === product.id;
    }
);
    if (existingProductIndex !== -1){

        if (quantity<1){
            console.log("Quantity must be at least 1");
            return;
        }

        const CartItem = {
            id: product.id,
            name: product.name,
            price: product.price,  
            quantity: cart[existingProductIndex].quantity + 1,
            img: product.img
        }
        cart.push(CartItem);
    } else {
        const existingProductIndex = cart[existingProductIndex]

        const newQuantity = existingProductIndex.quantity +quantity;

        if (newQuantity < 1){
            cart=cart.folter(
                (item) => item.id !== product.id
            );
        } else { 
            existingProductIndex.quantity = newQuantity;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}