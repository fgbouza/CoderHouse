const COTUSD = 215; //La idea del proyecto es obtener estos dos valores en tiempo real por alguna API
const COTEUR = 240;


const ars2Usd = p => p / COTUSD;
const ars2Eur = p => p / COTEUR;

let nombreProducto = "";
let descripcionProducto = "";
let precio = 0;
let prodId = 0;
let btnStart = document.getElementById("btnStart");

btnStart.onclick = () => {
    main();
}

class Producto
{
    constructor(nombreProducto, descripcionProducto, precio)
    {
        this.nombre = nombreProducto;
        this.descripcion = descripcionProducto;
        this.precio = precio;
    }
    setIva()
    {
        this.precio = this.precio + this.precio * 0.21;
    }
}

function entrada()
{
    nombreProducto = ingresoString("nombre del producto.");
    descripcionProducto = ingresoString("descripción del producto.");
    precio = ingresoInt("precio del producto");

    return new Producto(nombreProducto, descripcionProducto, precio);
}

function ingresoString(nombreDato)
{
    let flag = false;
    let salida;
    while(!flag)
    {
        salida = prompt("Ingrese " + nombreDato);
        
        if(salida != "" && salida != null) 
        {
            flag = true;
        }else 
        {
            alert("Ingrese una entrada válida");
            flag = false;
        }
    }
    return salida;
}
function ingresoInt(nombreDato)
{
    do 
    {
        salida = parseInt(prompt("Ingrese "+ nombreDato));
        
        if(isNaN(salida))
        {
            alert("Ingrese una entrada válida.");
        } 
        
    } while (isNaN(salida));
    return salida;
}

function imprimirProducto(producto, htmlId, prodId)
{
    alert("Nombre del producto: "+ producto.nombre +
        "\nDescripción: "+ producto.descripcion +
        "\nPrecio final: $"+ Math.round(producto.precio).toFixed(2) +
        "\nCotización en U$D: $"+Math.round(ars2Usd(producto.precio)).toFixed(2)+
        "\nCotizacion en Euro: €"+Math.round(ars2Eur(producto.precio)).toFixed(2)); //redondeo de las conversiones a dos decimales

    htmlId.innerHTML += "<div id = 'prod"+ prodId +"'>"
    +"<h3>Producto ID:"+ prodId +"</h3>"
    +"<p><strong>Nombre del producto: "+ producto.nombre +"</strong></p>"
    +"<p><strong>Descripción: "+ producto.descripcion +"</strong></p>"
    +"<p><strong>Precio final: $"+ Math.round(producto.precio).toFixed(2) +"</strong></p>"
    +"<p><strong>Cotización en U$D: $"+ Math.round(ars2Usd(producto.precio)).toFixed(2) +"</strong></p>"
    +"<p><strong>Cotizacion en Euro: €"+ Math.round(ars2Eur(producto.precio)).toFixed(2) +"</strong></p>"
    +"</div><br/>"
}
function consultarSiNo(pregunta)
{
    do 
    {
        respuesta = parseInt(prompt(pregunta+"\n1=SI\n0=NO"));
        
        if(isNaN(respuesta) || respuesta > 1 || respuesta < 0)
        {
            alert("Ingrese una entrada válida.");
        }else if(respuesta == 1) return true;
            else if(respuesta == 0) return false;
    
    } while (isNaN(respuesta) || respuesta > 1 || respuesta < 0);
}
function main(){
    alert("Bienvenido al ingreso de productos para su nuevo E-Commerce.");
    let productos = [];
    let container = document.getElementById("listProd");
    do{
        let productoIngresado = entrada();
        if(consultarSiNo("¿Desea incluir IVA en el precio final?")) 
            productoIngresado.setIva();
        prodId ++;
        imprimirProducto(productoIngresado, container, prodId);
        productos.push(productoIngresado);

    }while(consultarSiNo("¿Desea continuar ingresando productos?"));

    if(consultarSiNo("¿Desea ver la lista de productos?"))
    {
        let productosAInformar = "------------\n";
        for(const producto of productos)
        {
            productosAInformar = productosAInformar 
            + "Nombre: " + producto.nombre + "\n"
            + "Descripción: " + producto.descripcion + "\n"
            + "Precio: $" + Math.round(producto.precio).toFixed(2) + "\n"
            + "Cotización en U$D: $" + Math.round(ars2Usd(producto.precio)).toFixed(2) + "\n"
            + "Cotizacion en Euro: €" + Math.round(ars2Eur(producto.precio)).toFixed(2) + "\n";

            productosAInformar = productosAInformar + "------------\n";
        }
        alert(productosAInformar);
    }

    while(consultarSiNo("¿Desea buscar productos por nombre?"))
    {
        let param = prompt("Ingrese nombre de producto a buscar:")
        const filtrados = productos.filter((pr) => pr.nombre.includes(param));
        if(filtrados.length == 0) alert("No se encontraron productos");
        else {
            let productosAInformar = "------------\n";
            for(const prod of filtrados)
            {
                productosAInformar = productosAInformar 
                + "Nombre: " + prod.nombre + "\n"
                + "Descripción: " + prod.descripcion + "\n"
                + "Precio: $" + Math.round(prod.precio).toFixed(2) + "\n"
                + "Cotización en U$D: $" + Math.round(ars2Usd(prod.precio)).toFixed(2) + "\n"
                + "Cotizacion en Euro: €" + Math.round(ars2Eur(prod.precio)).toFixed(2) + "\n";

                productosAInformar = productosAInformar + "------------\n";
            }
            alert(productosAInformar);
        }
    }
}