//El proyecto trata de un juego en donde se presentan operaciones matemáticas al usuario y al responder correctamente, suma un puntaje (siendo el límite 10) y a su vez subiendo al dificualtad. Al llegar al límite ganará pero si falla, se termina el juego y se indicará con un mensaje su puntaje. También se puede poner una variable en donde se guarde el record para que intente superarlo.

let respuesta;
let puntaje;
let intentar;
let dificultad = 25;

function generarNumero() {
    let numUno = Math.ceil(Math.random()*dificultad);
    let numDos = Math.ceil(Math.random()*dificultad);
    let res = numUno + numDos;
    console.log("La operación a realizar es: " + numUno + "+" + numDos);
    return res;
}

console.log("----------------------=°=----------------------");
console.log("La temática es fácil, deberás responder correctamente a las operaciones matemáticas. Si acertás sumas un punto y si fallás perdés.");
respuesta = 1;
res = respuesta;
puntaje = 0;
do{
    if(res == respuesta){
        console.log("////////////////////////////////////////////////");
        res = generarNumero();
        respuesta = Number(prompt("Ingrese el resultado de la operación."));
        if(res == respuesta){
            console.log("+1 punto");
            puntaje += 1;
            dificultad +=25;
        }
    }else{
        if(puntaje < 1){
            puntaje = 0;
        }
        respuesta = 1;
        res = 1;
        console.log("////////////////////////////////////////////////");
        console.log("Fallaste. Tu puntaje es de " + puntaje + " puntos.");
        console.log("Si deseas reintentar, escribí la letra Y, si deseas terminar el juego escribí la letra N");
        intentar = prompt("¿Cuál es tu elección?").toUpperCase();
        puntaje = 0;
        dificultad = 25;
    }
}while(intentar != "N");

console.log("¡Gracias por jugar!");
console.log("----------------------=°=----------------------");

