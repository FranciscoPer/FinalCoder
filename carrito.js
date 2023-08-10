const pintarCarrito = () => {
    modalContainer.innerHTML = ""
    modalContainer.style.display = "flex"
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
     <h1 class= "modal-header title">Carrito.</h1>
    `;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1")
    modalButton.innerText = "x"
    modalButton.className = "modal-header-button"

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })      
    
    modalHeader.append(modalButton)

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `.
         <img src="${product.img}">
         <h3>${product.name}</h3>
         <p>${product.price} $</p>
         <span class="restar"> - </span>
         <p>Cantidad ${product.cantidad}</p>.
         <span class="sumar"> + </span>
         <p>Total: ${product.cantidad * product.price}</p>
        `;

        modalContainer.append(carritoContent)

        let restar = carritoContent.querySelector(".restar")
        restar.addEventListener("click", () => {
            if (product.cantidad !== 1){
            product.cantidad--
            }
            saveLocal()
            pintarCarrito()
        })
        let sumar = carritoContent.querySelector(".sumar")
        sumar.addEventListener("click", () => {
            product.cantidad++
            saveLocal()
            pintarCarrito()
        })



        let eliminar = document.createElement("span");
        eliminar.innerText = "❌"
        eliminar.className = "delete-product"
        
        carritoContent.append(eliminar)

        eliminar.addEventListener("click", eliminarProducto)

    });

    const total = carrito.reduce((acc, el) => acc + el.price * el.cantidad, 0);

    const totalPrice = document.createElement("div")
    totalPrice.className = "total-content"
    totalPrice.innerHTML = `total a pagar: ${total} $`;
    modalContainer.append(totalPrice);
   
}

verCarrito.addEventListener("click", pintarCarrito)

const eliminarProducto = () => {
    const foundId = carrito.find((element,) => element.id)
    
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    }   
    
    
    )

    carritoCounter()
    saveLocal()
    pintarCarrito()

    Toastify({
        text: 'Se eliminó tu producto',
        duration: 2000,
        position: 'left',
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          }
    }).showToast ()
    
}

const carritoCounter = () => {
    cantidadCarrito.style.display = "block"

    const carritoLength = carrito.length
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))
    
}

carritoCounter()

