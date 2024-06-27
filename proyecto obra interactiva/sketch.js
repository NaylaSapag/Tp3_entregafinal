//Comisión Matias aula 107
//Sapag Nayla Nahir 93541/6  y  Sampino Lucas 93080/8

//link del video: 

//---Configuracion de amplitud---------------------------------------------------------------

let AMP_MIN = 0.01; //umbral minimo de sonido que supera el ruido de fondo
let AMP_MAX = 0.2;  //umbral maximo de sonido que supera el ruido de fondo

//---Microfono-------------------------------------------------------------------------------

let mic;  

//---Amplitud-------------------------------------------------------------------------------

let amp;        //variable para cargar la amplitud
let haySonido = false;

//---imprimir------------------------------------------------------------------------------

let IMPRIMIR = true;

let paleta1 = [];
let paleta2 = [];
let paleta3 = [];


//---Variables circulo-----------------------------------------------------------------------

let MisCirculos = [];
let x,y,r,c,l,limc,col1,col2,col3;


//---gestor---------------------------------------------------------------------------------

let gestorAmp;

//---tamaño pantalla------------------------------------------------------------------------

let screenWidth, screenHeight;

//---Inicio del programa--------------------------------------------------------------------- 


function setup() {    
  
  let sizes = [                                       // Definir los tamaños posibles para la pantalla
    { width: 700, height: 700, probability: 0.75 },   //pantalla grande
    { width: 550, height: 700, probability: 0.25 }   //pantalla pequeña
  ];
  
  let selectedSize = monteCarloSelection(sizes);

  screenWidth = selectedSize.width;
  screenHeight = selectedSize.height;
  
  //ejecución inicial
  createCanvas(screenWidth, screenHeight);  //tamaño de pantalla

  //col1 = fill(207, 29, 29);     //colores
    
  //col2 = fill (31, 184, 150);
  
  //col3 = fill(237, 217, 57);


  crearCirculos(amp);                          //función de inicialización de circulos

  //----Microfono-----------------------------------------------------------------------------

  mic = new p5.AudioIn(); //comunicacion con entrada de audio
  mic.start();

  //---gestor--------------------------------------------------------------------------------

  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);  //inicia genstor con umbrales min y max

  //---Motor de Audio(inicio forzado)---------------------------------------------------------

  userStartAudio();
}

//---Inicio del dibujo------------------------------------------------------------------------


function draw() {                           //ejecución reperida
//colorMode(hsb);
  
/*col1 = fill(207, 29, 29);     //colores
    
col2 = fill (31, 184, 150);

col3 = fill(237, 217, 57);*/

  gestorAmp.actualizar(mic.getLevel());

  amp = gestorAmp.filtrada;

  //amp = mic.getLevel();

  background(0);                            //color de fondo
  //for(let i = 0; i < limc; i++){            //for para cantidad de circulos
  // MisCirculos[i].crecer();
  // MisCirculos[i].dibujar();
  //}


  

  //background(255);

  haySonido = amp > AMP_MIN;
  
  push();
  for(let i = 0; i < limc; i++){            //for para cantidad de circulos
    //MisCirculos[i].crecer();
    MisCirculos[i].dibujar();
  } 
  if( haySonido ){
    evaluarSiSeTocan();
    crecer();
  }
  pop();

  if(IMPRIMIR){
    printData();
  }


}



//---Funcion crecer-----------------------------------------------------------------------

function crecer(){
  for( let i=0 ; i< limc ; i++ ){
    MisCirculos[i].crecer();
  }
}



function evaluarSiSeTocan(){
  for( let i=0 ; i<limc ; i++ ){
    for( let j=0 ; j<limc ; j++ ){
      if( i!=j){
        MisCirculos[i].seTocaCon( MisCirculos[j] );
      }
    }
  }
}


//---Funcion que crea los cieculos-----------------------------------------------------------

function crearCirculos(amp, /*col1, col2, col3*/){ //función de inicialización de circulos

  limc = 2000;

  for(let i = 0; i < limc; i++){  //inicializacion de circulos con datos
    x = random(screenWidth);  //pos x
    y = random(screenHeight); //pos y
    r = 0;                    //radio
    c = random(0.1,0.3);      //crecimiento

    //if(amp < 0.03 && amp >= AMP_MIN){
    //  c = random(0.1, 0.3);
    //} else if(amp > 0.04){
    //  c = random(0.3, 0.6);
    //}

    
    l = random(1,3);          //tipo de tamaño

    //paletas();

    /*col1 = paleta1[];
    col2 = paleta2[];
    col3 = paleta3[];*/
  
    col1 = random(0,255);      //colores
    
    col2 = random(0,255); 

    col3 = random(0,255);



    MisCirculos[i] = new circulo(x, y, r, c, l, col1, col2, col3); //inicialización de los circulos
  }

}


//---Funcion montecarlo----------------------------------------------------------------------

function monteCarloSelection(sizes) {
  let r = random(1);
  let cumulativeProbability = 0;

  for (let size of sizes) {
    cumulativeProbability += size.probability;
    if (r < cumulativeProbability) {
      return size;
    }
  }

  // devuelve el último tamaño si no se selecciona ninguno
  return sizes[sizes.length - 1];
}

//---Funcion texto en pantalla---------------------------------------------------------------

function printData(){

  push();
    textSize(16);
    fill(255);
    let texto;

    texto = "amplitud: " + amp;
    text(texto,20,40);

    //fill(255);
    //ellipse(width/2, height-amp * 1000, 30, 30);

  pop();
}



/*function paletas(){

  for(let i = 0; i < 9; i++){
    paleta1[i] = random(0,255);
  }

  for(let i = 0; i < 9; i++){
    paleta2[i] = random(0,255);
  }

  for(let i = 0; i < 9; i++){
    paleta3[i] = random(0,255);
  }

}*/