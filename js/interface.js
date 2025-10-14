let container_interface;
let input_mascara;
let input_texto_A;
let input_texto_B;

let select_formato;
let select_paleta;
let select_modo;
let select_efeitos;

let slider_intensidade;
let slider_tempo;

let input_entrada_duracao;
let input_espera_duracao;
let input_saida_duracao;
let input_saida_espera_duracao;

let btn_salvar;
let btn_gravar;
let btn_play;

let label_arquivo;

function interface_inicializar() {

  container_interface = document.getElementById("interface");

  int_anexa_titulo(container_interface, "Arquivos e Formato");
  int_anexa_descricao(
    container_interface, 
    `
    Suba arquivos de textos com:
    <ul>
    <li>4x5: 60 colunas x 33 linhas</li>
    <li>16x9: 107 colunas x 27 linhas</li>
    </ul>
    `
  );

  select_formato = createSelect();
  select_formato.class('select');
  select_formato.option("4x5");
  select_formato.option("16x9");
  select_formato.selected('4x5');
  select_formato.changed(atualizar_formato);
  int_anexa(container_interface, select_formato.elt, "Formato");


  input_texto_A = createFileInput((f) => (handleFile(f, "A")));
  int_anexa(container_interface, input_texto_A.elt, "Texto A");

  input_texto_B = createFileInput((f) => (handleFile(f, "B")));
  int_anexa(container_interface, input_texto_B.elt, "Texto B");

  input_mascara = createFileInput((f) => (handleFile(f, "img")));
  int_anexa(container_interface, input_mascara.elt, "Mascara");

  int_anexa_divisor(container_interface);
  int_anexa_titulo(container_interface, "Paletas");
  int_anexa_descricao(container_interface, "Cor do texto e fundo.");

  select_paleta = createSelect();
  select_paleta.class('select');
  select_paleta.option("Cinza Escuro + Vermelho");
  select_paleta.option("Cinza Escuro + Verde");
  select_paleta.option("Cinza Escuro + Azul");
  select_paleta.option("Vermelho + Cinza Escuro");
  select_paleta.option("Verde + Cinza Escuro");
  select_paleta.option("Azul + Cinza Escuro");
  select_paleta.option("Vermelho + Cinza Claro");
  select_paleta.option("Verde + Cinza Claro");
  select_paleta.option("Azul + Cinza Claro");
  select_paleta.selected('Vermelho + Cinza Escuro');
  select_paleta.changed(atualizar_paleta)
  int_anexa(container_interface, select_paleta.elt);

  int_anexa_divisor(container_interface);
  int_anexa_titulo(container_interface, "Modos");
  int_anexa_descricao(container_interface, "Utilize o modo estático para criar imagens e o animado para vídeos.");

  select_modo = createSelect();
  select_modo.class('select');
  select_modo.option("Estático");
  select_modo.option("Animado");
  select_modo.selected("Animado");
  select_modo.changed(atualizar_modo);
  int_anexa(container_interface, select_modo.elt);

  int_anexa_divisor(container_interface);
  int_anexa_titulo(container_interface, "Efeitos");
  int_anexa_descricao(container_interface, "Os efeitos chamado 'Mistura' trabalham com os Textos A e B, os outros aplicam um efeito apenas em cima do Texto A.");

  select_efeitos = createSelect();
  select_modo.class('select');
  select_efeitos.option("Mistura: Noise 1");
  select_efeitos.option("Mistura: Noise 2");
  select_efeitos.option("Mistura: Vertical");
  select_efeitos.option("Simples: Noise 1");
  select_efeitos.option("Simples: Aleatório 1");
  select_efeitos.option("Simples: Aleatório 2");
  select_efeitos.option("Simples: Aleatório 3");
  select_efeitos.option("Simples: Desvio");
  select_efeitos.option("Simples: Desenrolar");
  select_efeitos.option("Simples: Deslizar");
  // select_efeitos.option("Simples: Deslizar 2");
  select_efeitos.selected("Simples: Noise 1");
  int_anexa(container_interface, select_efeitos.elt);

  int_anexa_divisor(container_interface);
  int_anexa_titulo(container_interface, "Controles: Estático");
  int_anexa_descricao(container_interface, "No modo estático utilize os controles abaixo para variar a intensidade do efeito aplicado.");

  slider_intensidade = createSlider(0, 1, 0, 0.01);
  int_anexa(container_interface, slider_intensidade.elt, "Intensidade");

  slider_tempo = createSlider(0, animacao_frame_total, 0, 1);
  int_anexa(container_interface, slider_tempo.elt, "Variação");

  int_anexa_divisor(container_interface);
  int_anexa_titulo(container_interface, "Controles: Animado");
  int_anexa_descricao(container_interface, "Controla a duração de cada etapa da animação.");

  input_entrada_duracao = createInput(15, 'number');
  input_entrada_duracao.attribute('min', '0');
  int_anexa(container_interface, input_entrada_duracao.elt, "Transição A");

  input_espera_duracao = createInput(30, 'number');
  input_espera_duracao.attribute('min', '0');
  int_anexa(container_interface, input_espera_duracao.elt, "Pausa A");

  input_saida_duracao = createInput(15, 'number');
  input_saida_duracao.attribute('min', '0');
  int_anexa(container_interface, input_saida_duracao.elt, "Transição B");

  input_saida_espera_duracao = createInput(30, 'number');
  input_saida_espera_duracao.attribute('min', '0');
  int_anexa(container_interface, input_saida_espera_duracao.elt, "Pausa B");

  btn_play = createButton("Play & Pause");
  btn_play.mousePressed(atualizar_animacao);
  int_anexa(container_interface, btn_play.elt);

  int_anexa_divisor(container_interface);

  btn_salvar = createButton("Salvar PNG");
  btn_salvar.mousePressed(salvar_png);
  int_anexa(container_interface, btn_salvar.elt);

  btn_gravar = createButton("Salvar MP4");
  btn_gravar.mousePressed(salvar_webm);
  int_anexa(container_interface, btn_gravar.elt);

 }

function int_anexa(interface_container, controle, rotulo) {
  let controle_container = document.createElement("div");
  controle_container.classList.add("controle");

  if(rotulo) { 
    let controle_rotulo = document.createElement("p");
    controle_rotulo.innerText = rotulo;
    controle_container.appendChild(controle_rotulo);
  }
  
  controle_container.appendChild(controle);

  interface_container.appendChild(controle_container);
}

function int_anexa_divisor(interface_container) {
  let divisor = document.createElement("hr");
  divisor.classList.add("divisor");
  interface_container.appendChild(divisor);
}

function int_anexa_titulo(interface_container, titulo) {
  let titulo_elt = document.createElement("h2");
  titulo_elt.classList.add("titulo");
  titulo_elt.innerText = titulo;
  interface_container.appendChild(titulo_elt);
}

function int_anexa_descricao(interface_container, texto) {
  let descricao_elt = document.createElement("p");
  descricao_elt.classList.add("descricao");
  descricao_elt.innerHTML = texto;
  interface_container.appendChild(descricao_elt);
}