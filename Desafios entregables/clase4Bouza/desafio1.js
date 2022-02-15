let numeroACalcular;
let respuesta;
let flag = false;
while(!flag)
{
    do 
    {
    
        numeroACalcular = parseInt(prompt("Ingrese un número para calcular su factorial: "));
        
        if(isNaN(numeroACalcular))
        {
            alert("Ingrese una entrada válida.");
        } 
    
    } while (isNaN(numeroACalcular));
    
    let factorial = 1;
    for(let i = numeroACalcular; i > 0; i--)
    {
        factorial *= i;
        console.log(factorial);
    }
    
    alert("El factorial de " + numeroACalcular + " es: " + factorial);

    do 
    {
    
        respuesta = parseInt(prompt("Desea salir?\n1=SI\n0=NO"));
        
        if(isNaN(respuesta) || respuesta > 1 || respuesta < 0)
        {
            alert("Ingrese una entrada válida.");
        } 
    
    } while (isNaN(respuesta) || respuesta > 1 || respuesta < 0);
    if(respuesta == 1) flag = true;
    else flag = false;
}


