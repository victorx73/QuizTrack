# 🧠 QuizTrack | Plataforma de Estudos

Um aplicativo web leve e moderno para resolução de questões, focado em performance e simplicidade. Ideal para revisões rápidas e estudos por questões sem distrações.

## 🚀 Funcionalidades

* **Importação de Questões:** Carrega as tuas próprias listas através de ficheiros JSON.
* **Correção Instantânea:** Vê o gabarito e a explicação detalhada de cada alternativa no momento da resposta.
* **Dashboard de Performance:** Acompanha o teu progresso com estatísticas de acertos, erros e aproveitamento.
* **Dark Mode:** Interface adaptável para estudos diurnos ou noturnos.
* **100% Responsivo:** Experiência fluida em smartphones, tablets e desktops.
* **Privacidade Local:** Todos os dados são guardados no teu navegador (LocalStorage), sem necessidade de servidor ou login.

## 🛠️ Tecnologias Utilizadas

* **HTML5** (Estrutura semântica)
* **CSS3** (Variáveis, Flexbox e Grid)
* **JavaScript Puro** (Manipulação de DOM e lógica de estado)

## 📂 Como Usar

1.  Faz o download ou clona este repositório.
2.  Abre o ficheiro `index.html` em qualquer navegador moderno.
3.  Clica em **"Importar Questões"** e seleciona um ficheiro JSON seguindo o modelo:

```json
[
  {
    "pergunta": "Exemplo de pergunta?",
    "alternativas": { 
      "A": "Opção 1", 
      "B": "Opção 2" 
    },
    "resposta_correta": "A",
    "explicacoes": { 
      "A": "Explicação do porquê está correta", 
      "B": "Explicação do erro" 
    },
    "materia": "Geral",
    "dificuldade": "Fácil"
  }
]