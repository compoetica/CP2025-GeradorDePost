let fonte;
let paleta = {
  cinza_escuro: "#262626",
  cinza_claro:  "#f5f5f5",
  azul:         "#94bff1",
  verde:        "#29bf9d",
  vermelho:     "#f95343",
}

let mascaras = {
  cinza_escuro: {
    formato_4x5: "CP-2025-Mascara-Post-4x5-Cinza-Escuro.png",
    formato_16x9: "CP-2025-Mascara-Post-16x9-Cinza-Escuro.png",
   },
  cinza_claro: {
    formato_4x5: "CP-2025-Mascara-Post-4x5-Cinza-Claro.png",
    formato_16x9: "CP-2025-Mascara-Post-16x9-Cinza-Claro.png",
  },
  azul:{
    formato_4x5: "CP-2025-Mascara-Post-4x5-Azul.png",
    formato_16x9: "CP-2025-Mascara-Post-16x9-Azul.png",
  },  
  verde: {
    formato_4x5: "CP-2025-Mascara-Post-4x5-Verde.png",
    formato_16x9: "CP-2025-Mascara-Post-16x9-Verde.png",
  },       
  vermelho: {
    formato_4x5: "CP-2025-Mascara-Post-4x5-Vermelho.png",
    formato_16x9: "CP-2025-Mascara-Post-16x9-Vermelho.png",
  }    
}


let texto_A;
let texto_B;
let texto_A_base_4x5;
let texto_B_base_4x5;
let texto_A_base_16x9;
let texto_B_base_16x9;
let mascara;
let efeito_texto = "----------- EM BREVE " // "-----------COMPOÉTICA"

let pagina = {
  formato_4x5: {
    margem: {x: 4.28, y: 108.07},
    coluna_tamanho: 60,
    linha_tamanho: 33,
  },
  formato_16x9: {
    margem: {x: 4.28, y: 76},
    coluna_tamanho: 107,
    linha_tamanho: 27,
  },
}

let margem;
let coluna_tamanho;
let linha_tamanho;
let coluna_largura;
let linha_altura;
let fonte_tamanho;

let animacao = true;
let animacao_estado = "entrada";
let animacao_framerate = 10;

let animacao_entrada_duracao;
let animacao_espera_duracao;
let animacao_saida_duracao;
let animacao_saida_espera_duracao;

let animacao_entrada_chave;
let animacao_espera_chave;
let animacao_saida_chave;
let animacao_saida_espera_chave;

let animacao_frame_total;
let animacao_frame_atual = 0;

let formato;
let modo;

// Capture
let capture;
let capture_estado_gravando;


P5Capture.setDefaultOptions({
  disableUi: true,
  verbose: true,
});

let debug = false;
let base_url = "";

function preload() {
  
  // let base_url = "https://compoetica.github.io/CP2025-GeradorDePost/";
  fonte = loadFont(base_url + "assets/IBMPlexMono-Medium.otf");
  texto_A_base_4x5 = loadStrings(base_url + "assets/CP-2025-Base-4x5-Parte-01.txt");
  texto_B_base_4x5 = loadStrings(base_url + "assets/CP-2025-Base-4x5-Parte-02.txt");
  texto_A_base_16x9 = loadStrings(base_url + "assets/CP-2025-Base-16x9-Parte-01.txt");
  texto_B_base_16x9 = loadStrings(base_url + "assets/CP-2025-Base-16x9-Parte-02.txt");
  texto_A = texto_A_base_4x5;
  texto_B = texto_B_base_4x5;
  
  for (const m in mascaras) {
    mascaras[m].formato_4x5 = loadImage(base_url + "assets/" + mascaras[m].formato_4x5 );
    mascaras[m].formato_16x9 = loadImage(base_url + "assets/" + mascaras[m].formato_16x9 );
  }
  formato = "4x5";
  mascara = mascaras.vermelho.formato_4x5;

  // formato = "16x9";
  // mascara = mascaras.vermelho.formato_16x9;

  cor_texto = paleta.vermelho;
  cor_fundo = paleta.cinza_escuro;
  
}

function setup() {
  c = createCanvas(1080, 1350);
  c_container = document.getElementById("canvas-container");
  c_container.appendChild(c.elt);

  
  atualizar_pagina();

  // texto_A_1D = concatenar_linhas(texto_A);
  // texto_B_1D = concatenar_linhas(texto_B);
  
  colorMode(RGB);
  noStroke();
  pixelDensity(1);

  interface_inicializar();
  frameRate(animacao_framerate);

  capture = P5Capture.getInstance();
  capture_estado_gravando = false;

  atualizar_animacao_dados();

  modo = select_modo.value();
}

function draw() {

  atualizar_animacao_dados();

  background(cor_fundo);
  fill(cor_texto);

  randomSeed(0);
  noiseSeed(0);
  image(mascara, 0, 0, width, height);

  noStroke();
  textFont(fonte);
  textSize(fonte_tamanho);
  textAlign(LEFT, TOP);

  translate(margem.x, margem.y);

  let intensidade;

  if (animacao && modo == "Animado") {
    // animado_aleatorio(texto, tempo);

    if( animacao_estado == "entrada") {
      intensidade = map(animacao_frame_atual, 0, animacao_entrada_duracao, 0, 1);
      animacao_estado = animacao_frame_atual > animacao_entrada_chave ? "espera" : "entrada";
    }

    if( animacao_estado =="espera"){
      intensidade = 1;
      animacao_estado = animacao_frame_atual > animacao_espera_chave ? "saida" : "espera";
    }

    if( animacao_estado == "saida"){
      intensidade = map(animacao_frame_atual, animacao_espera_chave, animacao_saida_chave, 1, 0);
      animacao_estado = animacao_frame_atual > animacao_saida_chave ? "saida_espera" : "saida";
    }

    if( animacao_estado =="saida_espera"){
      intensidade = 0;
      if (animacao_frame_atual > animacao_saida_espera_chave) {
        animacao_estado = "entrada";
        animacao_frame_atual = 0;
      }
    }

    if(animacao_frame_total > 0) {
      animacao_frame_atual++;
    }
    
  } 
  
  if (modo == "Estático") {
    intensidade = slider_intensidade.value();
    animacao_frame_atual = slider_tempo.value();
  }

  if (modo == "Contínuo") {
    intensidade = slider_intensidade.value();
    animacao_frame_atual++;
  }
  
  switch (select_efeitos.value()) {
    case "Mistura: Noise 1":
      animado_mistura_noise_1(texto_A, texto_B, intensidade, animacao_frame_atual);
      break;
    case "Mistura: Noise 2":
      animado_mistura_noise_2(texto_A, texto_B, intensidade, animacao_frame_atual);
      break;

    case "Mistura: Vertical":
      animado_mistura_vertical(texto_A, texto_B, intensidade, animacao_frame_atual);
      break;
    case "Simples: Noise 1":
      animado_noise(texto_A, intensidade, animacao_frame_atual);
      break;
    case "Simples: Aleatório 1":
      animado_aleatorio_1(texto_A, intensidade, animacao_frame_atual);
      break;
    case "Simples: Aleatório 2":
      animado_aleatorio_2(texto_A, intensidade, animacao_frame_atual);
      break;
    case "Simples: Aleatório 3":
      animado_aleatorio_3(texto_A, intensidade, animacao_frame_atual);
      break;
    case "Simples: Desvio":
      animado_desvio_h(texto_A, intensidade, animacao_frame_atual);
      break;
    case "Simples: Desenrolar":
      animado_desenrolar(texto_A, intensidade, animacao_frame_atual);
      break;
    case "Simples: Deslizar":
      animado_deslizar(texto_A, intensidade, animacao_frame_atual);
      break;
    case "Simples: Deslizar 2":
      animado_deslizar_2(texto_A_1D, intensidade, animacao_frame_atual);
      break;
  }
  
  if (debug) {
    let animacao_log = `Frame: ${animacao_frame_atual} - Estado: ${animacao_estado}`;
    fill("#0f0");
    text(animacao_log, 0, 0);
    // grid();
  }

  status_frame_atual.elt.innerText = `Frame atual: ${String(animacao_frame_atual).padStart(4, '0')} / ${String(animacao_frame_total).padStart(4, '0')}`;

}