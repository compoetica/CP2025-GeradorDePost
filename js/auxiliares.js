function salvar_png() {
  save(`${arquivo_nome()}.png`);
}

function arquivo_nome() {
  return `${Date.now()}`
}

function handleFile(f, campo) {
  if (f.type === 'image') {
    mascara = loadImage(f.data);
  }
  if (f.type === 'text' && campo == "A") {
    texto_A = f.data;
    texto_A = texto_A.split(/\r?\n/);
  }
  if (f.type === 'text' && campo == "B") {
    texto_B = f.data;
    texto_B = texto_B.split(/\r?\n/);
  }
}

function concatenar_linhas(a) {
  let b = "";
  for(let i = 0; i < a.length; i++) {
    // console.log(a[i]);
    b += a[i];
  }
  return b;
}

function grid() {
  for(let j = 0; j < linha_tamanho; j++ ) {
    for(let i = 0; i < coluna_tamanho; i++ ) {
      let x = coluna_largura * i ;
      let y = linha_altura * j;
      noFill();
      stroke(0,255,0);
      rect(x, y, coluna_largura, linha_altura); 
    }  
  }
}

function salvar_webm() {
  if (capture.state === "idle") {
    animacao_frame_atual = 0;
    animacao_estado = "entrada";
    capture_estado_gravando = true;
    
    // gravacaoRetorno.classList.add('gravando');
    capture.start({
      format: "mp4",
      bitrate: 8000,
      framerate: animacao_framerate,
      duration: animacao_frame_total,
      verbose: true
    });
  } else {
    capture.stop();
    // gravacaoRetorno.classList.remove('gravando');
  }
}

function salvar_sequencia_png() {
  if (capture.state === "idle") {
    animacao_frame_atual = 0;
    animacao_estado = "entrada";
    capture_estado_gravando = true;
    
    // gravacaoRetorno.classList.add('gravando');
    capture.start({
      format: "png",
      framerate: animacao_framerate,
      duration: animacao_frame_total,
      verbose: true
    });
  } else {
    capture.stop();
    // gravacaoRetorno.classList.remove('gravando');
  }
}

function atualizar_paleta() {
  let paleta_selecionada = select_paleta.value();
  
  switch (paleta_selecionada) {
    case "Cinza Escuro + Vermelho":
      mascara = mascaras.cinza_escuro;
      cor_texto = paleta.cinza_escuro;  
      cor_fundo = paleta.vermelho;
      break;
    case "Cinza Escuro + Verde":
      mascara = mascaras.cinza_escuro;
      cor_texto = paleta.cinza_escuro;  
      cor_fundo = paleta.verde;
      break;
    case "Cinza Escuro + Azul":
      mascara = mascaras.cinza_escuro;
      cor_texto = paleta.cinza_escuro;  
      cor_fundo = paleta.azul;    
      break;
    case "Vermelho + Cinza Escuro":
      mascara = mascaras.vermelho;
      cor_texto = paleta.vermelho;  
      cor_fundo = paleta.cinza_escuro;    
      break;
    case "Verde + Cinza Escuro":
      mascara = mascaras.verde;
      cor_texto = paleta.verde;  
      cor_fundo = paleta.cinza_escuro;    
      break;
    case "Azul + Cinza Escuro":
      mascara = mascaras.azul;
      cor_texto = paleta.azul;  
      cor_fundo = paleta.cinza_escuro;    
      break;
    case "Vermelho + Cinza Claro":
      mascara = mascaras.vermelho;
      cor_texto = paleta.vermelho;  
      cor_fundo = paleta.cinza_claro;    
      break;
    case "Verde + Cinza Claro":
      mascara = mascaras.verde;
      cor_texto = paleta.verde;  
      cor_fundo = paleta.cinza_claro;    
      break;
    case "Azul + Cinza Claro":
      mascara = mascaras.azul;
      cor_texto = paleta.azul;  
      cor_fundo = paleta.cinza_claro;        
      break;
  }
  if(formato == "4x5") {
    mascara = mascara.formato_4x5;
  }
  if(formato == "16x9") {
    mascara = mascara.formato_16x9;
  }
}

function atualizar_modo() {
  modo = select_modo.value();
  // if(modo_selecionado == "Estático") {
  //   animacao = false;
  // }
  // if(modo_selecionado == "Animado") {
  //   animacao = true;
  // }
}

function atualizar_animacao() {
  animacao = !animacao;
}

function atualizar_animacao_dados() {
  
  animacao_entrada_duracao = Number(input_entrada_duracao.value());
  animacao_espera_duracao =  Number(input_espera_duracao.value());
  animacao_saida_duracao =  Number(input_saida_duracao.value());
  animacao_saida_espera_duracao = Number(input_saida_espera_duracao.value());

  animacao_entrada_chave = animacao_entrada_duracao;
  animacao_espera_chave = animacao_entrada_chave + animacao_espera_duracao;
  animacao_saida_chave = animacao_espera_chave + animacao_saida_duracao;
  animacao_saida_espera_chave = animacao_saida_chave + animacao_saida_espera_duracao;

  animacao_frame_total = animacao_saida_espera_chave;

}

function atualizar_formato() {
  let formato_selecionado = select_formato.value();
  formato = formato_selecionado;
  if(formato_selecionado == "4x5") {
    resizeCanvas(1080,1350);
  }
  if(formato_selecionado == "16x9") {
    resizeCanvas(1920,1080);
  }
  atualizar_paleta();
  atualizar_pagina();
}

function atualizar_pagina() {
  if(formato == "4x5") {
    coluna_tamanho = pagina.formato_4x5.coluna_tamanho;
    linha_tamanho = pagina.formato_4x5.linha_tamanho;
    margem = pagina.formato_4x5.margem;
    coluna_largura = width / coluna_tamanho * 0.993;
    linha_altura = (height - margem.y * 2) / linha_tamanho * 0.994;
    fonte_tamanho = linha_altura * 0.83;
    texto_A = texto_A_base_4x5;
    texto_B = texto_B_base_4x5;

  }

  if(formato == "16x9") {
    coluna_tamanho = pagina.formato_16x9.coluna_tamanho;
    linha_tamanho = pagina.formato_16x9.linha_tamanho;
    margem = pagina.formato_16x9.margem;
    coluna_largura = width / coluna_tamanho * 0.997;
    linha_altura = 34.3;
    fonte_tamanho = 30;
    texto_A = texto_A_base_16x9;
    texto_B = texto_B_base_16x9;
  }
  
  
}