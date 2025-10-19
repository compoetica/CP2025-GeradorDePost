function animado_mistura_noise_1(txt_a, txt_b, intensidade, t) {
  let caracteres_aleatorios = "@:!=*+-";
  for (let j = 0; j < linha_tamanho; j++) {
    for (let i = 0; i < coluna_tamanho; i++) {
      let x = coluna_largura * i;
      let y = linha_altura * j;
      
      let noise_valor = noise(x * 0.01, y * 0.01, t * 0.05);

      if (noise_valor < 0.7) {
        if(random(1) < intensidade) {
          text(txt_a[j][i], x, y);
        } else {
          text(txt_b[j][i], x, y);
        }
      } else {
        let c_qtd = caracteres_aleatorios.length;
        let c = floor(map(noise_valor, 0, 1, 0, c_qtd));
        text(caracteres_aleatorios[c], x, y);
      }
    }
  }
}



function animado_mistura_noise_2(txt_a, txt_b, intensidade, t) {
  let caracteres_aleatorios = "@:!=*+-";
  for (let j = 0; j < linha_tamanho; j++) {
    for (let i = 0; i < coluna_tamanho; i++) {
      let x = coluna_largura * i;
      let y = linha_altura * j;
      
      let noise_valor = noise(x * 0.005, y * 0.005, t * 0.05);
      let noise_valor_mistura = noise(x * 0.01, y * 0.01, t * 0.05);

      if (noise_valor < 0.7) {
        if(noise_valor_mistura < intensidade) {
          text(txt_a[j][i], x, y);
        } else {
          text(txt_b[j][i], x, y);
        }
      } else {
        let c_qtd = caracteres_aleatorios.length;
        let c = floor(random(c_qtd));
        text(caracteres_aleatorios[c], x, y);
      }
    }
  }
}



function animado_mistura_vertical(txt_a, txt_b, intensidade, t) {
  let linha = floor(map(intensidade, 0, 1, 0, txt_a.length));
  let caracteres_aleatorios = "@:!=*+-";
  console.log(linha);
  for (let j = 0; j < linha_tamanho; j++) {
    for (let i = 0; i < coluna_tamanho; i++) {
      let x = coluna_largura * i;
      let y = linha_altura * j;
      if(linha < j) {
        text(txt_b[j][i], x, y);
      } 
      if(linha == j) {
        c = floor(random(coluna_tamanho));
        text(txt_b[j][(c)%coluna_tamanho], x, y);
      }
      if(linha > j) {
        text(txt_a[j][i], x, y);
      }

    }
  }
}



function animado_noise(txt, intensidade, t) {
  let caracteres_aleatorios = "@#$%&1234567890?()><:!=*+-";
  for (let j = 0; j < linha_tamanho; j++) {
    for (let i = 0; i < coluna_tamanho; i++) {
      let x = coluna_largura * i;
      let y = linha_altura * j;
      let noise_valor = noise(x * 0.01, y * 0.01, t * 0.05);

      if (noise_valor < intensidade - 0.3) {
        text(txt[j][i], x, y);
      } else {
        let c_qtd = caracteres_aleatorios.length;
        let c = floor(map(noise_valor, 0, 1, 0, c_qtd));
        text(caracteres_aleatorios[c], x, y);
      }
    }
  }
}



function animado_aleatorio_1(txt, intensidade, t) {
  let caracteres_aleatorios = "!@#$%^&*()-=+1234567890?:/><";
  for (let j = 0; j < linha_tamanho; j++) {
    for (let i = 0; i < coluna_tamanho; i++) {
      let x = coluna_largura * i;
      let y = linha_altura * j;
      if (random() < intensidade) {
        text(txt[j][i], x, y);
      } else {
        let c_qtd = caracteres_aleatorios.length;
        let c = (floor(random(c_qtd)) + t) % c_qtd;
        text(caracteres_aleatorios[c], x, y);
      }
    }
  }
}



function animado_aleatorio_2(txt, intensidade, t) {
  // let caracteres_aleatorios = "-----------COMPOÉTICA";
  let caracteres_aleatorios = efeito_texto;
  for (let j = 0; j < linha_tamanho; j++) {
    for (let i = 0; i < coluna_tamanho; i++) {
      let index = i + j * coluna_tamanho;
      let x = coluna_largura * i;
      let y = linha_altura * j;
      if (random() < intensidade) {
        text(txt[j][i], x, y);
      } else {
        let c_qtd = caracteres_aleatorios.length;
        let c = (index + t) % c_qtd;
        text(caracteres_aleatorios[c], x, y);
      }
    }
  }
}


function animado_aleatorio_3(txt, intensidade, t) {
  for (let j = 0; j < linha_tamanho; j++) {
    for (let i = 0; i < coluna_tamanho; i++) {
      let index = i + j * coluna_tamanho;
      let x = coluna_largura * i;
      let y = linha_altura * j;
      if (random() < intensidade) {
        text(txt[j][i], x, y);
      } else {
        let c = random() > 0.5 ? "\\" : "/";
        text(c, x, y);
      }
    }
  }
}



function animado_desvio_h(txt, intensidade, t) {
  let intensidade_desvio = floor(map(intensidade, 0, 1, coluna_tamanho, 0));
  let caracteres_aleatorios = "@:!=*+-";

  for (let j = 0; j < linha_tamanho; j++) {
    for (let i = 0; i < coluna_tamanho; i++) {
      let x = coluna_largura * i;
      let y = linha_altura * j;

      if (random(0.8) < intensidade) {
        if (j % 2) {
          text(txt[j][(i + intensidade_desvio)], x, y);
        } else {
          text(txt[j][(i - intensidade_desvio)], x, y);
        }
      } else {
        let c_qtd = caracteres_aleatorios.length;
        let c = (floor(random(c_qtd)) + t) % c_qtd;
        text(caracteres_aleatorios[c], x, y);
      }
    }
  }
}



function animado_desenrolar(txt, intensidade, t) {
  let indice_coluna = floor(map(intensidade, 0, 1, 0, coluna_tamanho));
  for (let j = 0; j < linha_tamanho; j++) {
    for (let i = 0; i < coluna_tamanho; i++) {
      let x = coluna_largura * i;
      let y = linha_altura * j;
      text(txt[j][((i + t) % indice_coluna)], x, y);
    }
  }
}



function animado_deslizar(txt, intensidade, t) {
  for (let j = 0; j < linha_tamanho; j++) {
    for (let i = 0; i < coluna_tamanho; i++) {
      let x = coluna_largura * i;
      let y = linha_altura * j;
      text(txt[j][((i + t) % coluna_tamanho)], x, y);
    }
  }
}



function animado_deslizar_2(txt, intesidade, t) {
  for (let j = 0; j < linha_tamanho; j++) {
    for (let i = 0; i < coluna_tamanho; i++) {
      let index = i + j * coluna_tamanho;
      let x = coluna_largura * i;
      let y = linha_altura * j;
      text(txt[index], x, y);
    }
  }
}

function estatico(txt) {
  for (let j = 0; j < linha_tamanho; j++) {
    for (let i = 0; i < coluna_tamanho; i++) {
      let x = coluna_largura * i;
      let y = linha_altura * j;
      text(txt[j][i], x, y);
    }
  }
}