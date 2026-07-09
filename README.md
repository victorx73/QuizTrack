# 🧠 QuizTrack | Plataforma de Estudos

Um aplicativo web leve e moderno para resolução de questões, focado em performance e simplicidade. Ideal para revisões rápidas e estudos por questões sem distrações.

---

# 🚀 Funcionalidades

- ➕ **Adicionar Questões**: Crie suas próprias questões diretamente na interface através de um formulário intuitivo.
- 📥 **Importação de Questões**: Carregue listas completas através de arquivos JSON (compatível com importação incremental).
- ✅ **Correção Instantânea**: Veja o gabarito e a explicação detalhada de cada alternativa no momento da resposta.
- 📊 **Dashboard de Performance**: Acompanhe seu progresso com estatísticas de acertos, erros e aproveitamento.
- 🌙 **Dark Mode**: Interface adaptável para estudos diurnos ou noturnos (salva a preferência do usuário).
- 💾 **Persistência Local**: Todas as questões e estatísticas são salvas automaticamente no `localStorage` do navegador.
- 📱 **100% Responsivo**: Experiência fluida em smartphones, tablets e desktops.
- 🔒 **Privacidade Total**: Todos os dados permanecem armazenados localmente no navegador, sem necessidade de servidor ou login.

---

# 🛠️ Tecnologias Utilizadas

- **HTML5** — Estrutura semântica e acessível.
- **CSS3** — Variáveis CSS, Flexbox, Grid e animações.
- **JavaScript (Vanilla JS)** — Manipulação de DOM, gerenciamento de estado e persistência local.

---

# 📂 Como Usar

## 1. Download

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/quiztrack.git
```

Ou faça o download do projeto em formato ZIP.

---

## 2. Executando

Abra o arquivo:

```text
index.html
```

em qualquer navegador moderno:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

---

## 3. Adicionando Questões

### Opção A — Formulário

Clique em **➕ Adicionar Questão** e preencha:

- Pergunta
- Alternativas (mínimo 2 e máximo 5)
- Explicação de cada alternativa
- Matéria
- Dificuldade
- Alternativa correta

---

### Opção B — Importação JSON

Clique em **Importar Questões** e selecione um arquivo JSON seguindo o modelo abaixo.

```json
[
  {
    "pergunta": "Qual é a capital do Brasil?",
    "alternativas": {
      "A": "São Paulo",
      "B": "Rio de Janeiro",
      "C": "Brasília",
      "D": "Salvador"
    },
    "resposta_correta": "C",
    "explicacoes": {
      "A": "São Paulo é a maior cidade do Brasil.",
      "B": "Rio de Janeiro foi capital até 1960.",
      "C": "Correto! Brasília é a capital federal.",
      "D": "Salvador foi a primeira capital do Brasil."
    },
    "materia": "Geografia",
    "dificuldade": "Fácil"
  }
]
```

### Campos obrigatórios

| Campo | Descrição |
|--------|-----------|
| `pergunta` | Texto da questão |
| `alternativas` | Objeto contendo A, B, C, D e/ou E |
| `resposta_correta` | Letra da resposta correta |
| `explicacoes` | Explicação de cada alternativa |
| `materia` | Nome da matéria |
| `dificuldade` | Fácil, Médio ou Difícil |

---

## 4. Resolvendo Questões

1. Escolha uma alternativa.
2. Veja imediatamente se acertou.
3. Leia a explicação da alternativa.
4. Acompanhe seu progresso.
5. Consulte o Dashboard de desempenho.

---

# 📊 Estrutura de Dados

## Questão

```javascript
{
  pergunta: string,

  alternativas: {
    A: string,
    B: string,
    C?: string,
    D?: string,
    E?: string
  },

  resposta_correta: "A" | "B" | "C" | "D" | "E",

  explicacoes: {
    A: string,
    B: string,
    C?: string,
    D?: string,
    E?: string
  },

  materia: string,

  dificuldade: "Fácil" | "Médio" | "Difícil"
}
```

---

## Estatísticas

```javascript
{
  respondidas: number,
  acertos: number,
  erros: number
}
```

---

# 🎯 Dicas de Uso

- Organize questões por matéria.
- Utilize o Dark Mode durante a noite.
- Acompanhe constantemente o Dashboard.
- Importe várias questões de uma única vez.
- Aproveite a interface limpa para manter o foco.

---

# 🔄 Fluxo de Dados

```text
Adicionar Questões
        │
        ▼
Formulário ou JSON
        │
        ▼
localStorage
        │
        ▼
Usuário responde
        │
        ▼
Correção automática
        │
        ▼
Atualização das estatísticas
```

---

# 🌟 Diferenciais

- ✅ Zero dependências externas
- ✅ Funciona offline
- ✅ Interface moderna
- ✅ Feedback imediato
- ✅ Até 5 alternativas por questão
- ✅ Persistência automática
- ✅ Dark Mode
- ✅ Importação incremental
- ✅ Adição manual de questões

---

# 🤝 Contribuindo

Contribuições são muito bem-vindas!

Você pode:

- Reportar bugs
- Sugerir melhorias
- Abrir Pull Requests
- Melhorar a documentação

---

# 📝 Licença

Este projeto está licenciado sob a **MIT License**.

Consulte o arquivo **LICENSE** para mais informações.

---

<div align="center">

## ❤️ Desenvolvido para facilitar os estudos

### **QuizTrack**

**Resolva • Aprenda • Evolua 🚀**

</div>