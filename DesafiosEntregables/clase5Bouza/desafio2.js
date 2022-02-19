const COTUSD = 215; //La idea del proyecto es obtener estos dos valores en tiempo real por alguna API
const COTEUR = 240;

const iva = n => n * 0.21;
const ars2Usd = p => p / COTUSD;
const ars2Eur = p => p / COTEUR;

let nombreProducto = "";
let descripcionProducto = "";
let precio = 0;

function entrada()
{
    nombreProducto = ingresoString("nombre del producto.");
    descripcionProducto = ingresoString("descripción del producto.");
    precio = ingresoInt("precio del producto");
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

function imprimirProducto(nombre, descripcion, precio)
{
    alert("Nombre del producto: "+ nombre +
        "\nDescripción: "+ descripcion +
        "\nPrecio final: $"+ Math.round(precio).toFixed(2) +
        "\nCotización en U$D: $"+Math.round(ars2Usd(precio)).toFixed(2)+
        "\nCotizacion en Euro: €"+Math.round(ars2Eur(precio)).toFixed(2)); //redondeo de las conversiones a dos decimales
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
    do{
        entrada();
        if(consultarSiNo("¿Desea incluir IVA en el precio final?")) 
            precio = precio + iva(precio);

        imprimirProducto(nombreProducto, descripcionProducto, precio);

    }while(consultarSiNo("¿Desea continuar ingresando productos?"));
}
main();
