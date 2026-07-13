// URL CSV publicada de Google Sheets
const CSV =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vTnhSgHPEOV15vBySZvIbf6mnxZsZi5oavE3qq3-S1kQ31ziLYw2Xwc8vSoWKSWTD6nsKE5Jyfh-o1R/pub?output=csv";

const soccerBall =
"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/26bd.png";

async function cargar(){

const texto = await fetch(CSV).then(r=>r.text());

const filas = texto.trim().split("\n");

const datos=[];

for(let i=1;i<filas.length;i++){

let c = filas[i].split(",");

datos.push({

nombre:c[0].replace(/"/g,''),

goles:Number(c[1])

});

}

datos.sort((a,b)=>b.goles-a.goles);

const tabla=document.getElementById("tabla");

tabla.innerHTML="";

datos.forEach((j,i)=>{

const fila=document.createElement("div");

fila.className="fila";

if(i==0)fila.classList.add("oro");
if(i==1)fila.classList.add("plata");
if(i==2)fila.classList.add("bronce");

let balones="";

for(let k=0;k<j.goles;k++){

balones+=`<img src="${soccerBall}">`;

}

fila.innerHTML=`

<div class="nombre">${j.nombre}</div>

<div class="barra">

${balones}

</div>

<div class="numero">

${j.goles}

</div>

`;

tabla.appendChild(fila);

});

}

cargar();

setInterval(cargar,30000);
