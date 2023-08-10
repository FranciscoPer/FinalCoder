const shopContent = document.querySelector('#shopContent');
const verCarrito = document.getElementById('verCarrito');
const modalContainer = document.getElementById('modal-container');
const cantidadCarrito = document.getElementById ('cantidadCarrito')

let carrito = JSON.parse(localStorage.getItem("carrito")) || []

const getProducts = async ()=> {
    const response = await fetch("data.json")
    const data = await response.json()
    console.log(data)
    data.forEach((product) =>{
        let content = document.createElement('div');
        content.className = "card"
        content.innerHTML = ` 
        <img src="${product.img}">
        <h3>${product.name}</h3>
        <p class="price">${product.price} $</p>
        `;
    
        shopContent.append(content); 
    
        let comprar = document.createElement('button');
        comprar.innerText = "comprar";
        comprar.className = "comprar"
    
        content.append(comprar)
    
        comprar.addEventListener("click", () => {
            const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id)
            if (repeat) {
                carrito.map((prod) =>{
                    if(prod.id === product.id)
                    prod.cantidad ++
                
                })
            }else
            carrito.push({
                id: product.id,
                img: product.img,
                name: product.name,
                price: product.price,
                cantidad: product.cantidad,
            }
           
            
            )
            console.log(carrito)
            console.log(carrito.length)
            carritoCounter()
            saveLocal()
            Toastify({
                text: 'Producto agregado al carrito',
                duration: 2000,
                position: 'left',
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                  }
            }).showToast ()
        })
    
    });
};
getProducts();


const saveLocal = () => {
localStorage.setItem("carrito", JSON.stringify(carrito))
}
