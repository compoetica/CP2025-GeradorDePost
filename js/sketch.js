let fonte;
let paleta = {
  cinza_escuro: "#262626",
  cinza_claro:  "#f5f5f5",
  azul:         "#94bff1",
  verde:        "#29bf9d",
  vermelho:     "#f95343",
}

let cor_texto = paleta.vermelho;
let cor_fundo = paleta.cinza_escuro;

let mascaras = {
  cinza_escuro: "CP-2025-Mascara-Post-4x5-Cinza-Escuro.png",
  cinza_claro:  "CP-2025-Mascara-Post-4x5-Cinza-Claro.png",
  azul:         "CP-2025-Mascara-Post-4x5-Azul.png",
  verde:        "CP-2025-Mascara-Post-4x5-Verde.png",
  vermelho:     "CP-2025-Mascara-Post-4x5-Vermelho.png",
}

let texto_A;
let texto_B;
let texto_A_1D;
let texto_B_1D;
let mascara;

let margem = 107;
let coluna_tamanho = 60;
let linha_tamanho = 33;
let coluna_largura;
let coluna_altura;

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

// Capture
let capture;
let capture_estado_gravando;


P5Capture.setDefaultOptions({
  disableUi: true,
});

let debug = false;

function preload() {
  fonte = loadFont("../assets/IBMPlexMono-Medium.otf");
  texto_A = loadStrings("../assets/CP-2025-Instagram-Post-Apresentação-Parte-01.txt");
  texto_B = loadStrings("../assets/CP-2025-Instagram-Post-Apresentação-Parte-02.txt");
  
  for (const m in mascaras) {
    mascaras[m] = loadImage("../assets/" + mascaras[m]);
  }
  mascara = mascaras.vermelho;
}

function setup() {
  c = createCanvas(1080, 1350);
  c_container = document.getElementById("canvas-container");
  c_container.appendChild(c.elt);

  coluna_largura = width / coluna_tamanho * 0.993;
  linha_altura = (height - margem * 2) / linha_tamanho * 0.994;

  texto_A_1D = concatenar_linhas(texto_A);
  texto_B_1D = concatenar_linhas(texto_B);
  
  colorMode(RGB);
  noStroke();
  pixelDensity(1);

  interface_inicializar();
  frameRate(animacao_framerate);

  capture = P5Capture.getInstance();
  capture_estado_gravando = false;

  atualizar_animacao_dados();

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
  textSize(linha_altura * 0.83);
  textAlign(LEFT, TOP);

  translate(margem * 0.04, margem * 1.01);

  let intensidade;

  if (animacao) {
    // animado_aleatorio(texto, tempo);

    switch (animacao_estado) {
      case "entrada":

        intensidade = map(animacao_frame_atual, 0, animacao_entrada_duracao, 0, 1);
        animacao_frame_atual++;
        animacao_estado = animacao_frame_atual > animacao_entrada_chave ? "espera" : "entrada";

        break;

      case "espera":

        intensidade = 1;
        animacao_frame_atual++;
        animacao_estado = animacao_frame_atual > animacao_espera_chave ? "saida" : "espera";

        break;

      case "saida":

        intensidade = map(animacao_frame_atual, animacao_espera_chave, animacao_saida_chave, 1, 0);
        animacao_frame_atual++;
        animacao_estado = animacao_frame_atual > animacao_saida_chave ? "saida_espera" : "saida";
        
        break;

      case "saida_espera":

        intensidade = 0;
        animacao_frame_atual++;
        if (animacao_frame_atual > animacao_saida_espera_chave) {
          animacao_estado = "entrada";
          animacao_frame_atual = 0;
        }

        break;
    }
  } else {
    intensidade = slider_intensidade.value();
    animacao_frame_atual = slider_tempo.value();
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
}