//El proyecto trata de un juego en donde se presentan operaciones matemáticas al usuario y al responder correctamente, suma un puntaje (siendo el límite 10) y a su vez subiendo al dificualtad. Al llegar al límite ganará pero si falla, se termina el juego y se indicará con un mensaje su puntaje. También se puede poner una variable en donde se guarde el record para que intente superarlo.

let numUno;
let numDos;
let res;
let eleccion;
let puntaje;
let intentar;
const dificultad = 50;

console.log("----------------------=°=----------------------");
console.log("La temática es fácil, deberás responder correctamente a las operaciones matemáticas. Si acertás sumas un punto y si fallás perdés.");
eleccion = 1;
res = eleccion;
puntaje = 0;
do{
    if(res == eleccion){
        console.log("////////////////////////////////////////////////");
        numUno = Math.ceil(Math.random()*dificultad);
        numDos = Math.ceil(Math.random()*dificultad);
        res = numUno + numDos;
        console.log("La operación a realizar es: " + numUno + "+" + numDos);
        eleccion = Number(prompt("Ingrese el resultado de la operación."));
        if(res == eleccion){
            console.log("+1 punto");
            puntaje += 1;
            // dificultad +=100;
        }
    }else{
        if(puntaje < 1){
            puntaje = 0;
        }
        eleccion = 1;
        res = 1;
        console.log("Fallaste. Tu puntaje es de " + puntaje + " puntos.");
        console.log("Si deseas reintentar, escribí la letra Y, si deseas terminar el juego escribí la letra N");
        intentar = prompt("¿Cuál es tu elección?").toUpperCase();
    }
}while(intentar != "N");

console.log("¡Gracias por jugar!");
console.log("----------------------=°=----------------------");

