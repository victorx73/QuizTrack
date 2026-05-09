// ==========================================
// ESTADO GLOBAL DO APLICATIVO
// ==========================================
let questoes = [];
let questaoAtualIndex = 0;
let stats = {
    respondidas: 0,
    acertos: 0,
    erros: 0
};

// ==========================================
// SELETORES DO DOM
// ==========================================
const DOM = {
    themeToggle: document.getElementById('theme-toggle'),
    jsonUpload: document.getElementById('json-upload'),
    dashboard: document.getElementById('dashboard'),
    emptyState: document.getElementById('empty-state'),
    quizContainer: document.getElementById('quiz-container'),
    
    // Stats
    sTotal: document.getElementById('stat-total'),
    sCorrect: document.getElementById('stat-correct'),
    sWrong: document.getElementById('stat-wrong'),
    sPercent: document.getElementById('stat-percent'),
    btnResetStats: document.getElementById('reset-stats'),
    
    // Quiz Elements
    progressBar: document.getElementById('progress-bar'),
    badgeMateria: document.getElementById('badge-materia'),
    badgeDificuldade: document.getElementById('badge-dificuldade'),
    qCounter: document.getElementById('question-counter'),
    qText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    
    // Feedback
    feedbackBox: document.getElementById('feedback-box'),
    feedbackTitle: document.getElementById('feedback-title'),
    feedbackText: document.getElementById('feedback-text'),
    btnNext: document.getElementById('btn-next')
};

// ==========================================
// INICIALIZAÇÃO E STORAGE
// ==========================================
window.onload = () => {
    carregarTema();
    carregarStats();
    atualizarDashboard();
};

// ==========================================
// DARK MODE
// ==========================================
DOM.themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('tema', 'light');
        DOM.themeToggle.textContent = '🌙';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('tema', 'dark');
        DOM.themeToggle.textContent = '☀️';
    }
});

function carregarTema() {
    const temaSalvo = localStorage.getItem('tema');
    // Preferência do sistema caso não tenha salvo
    const prefereDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (temaSalvo === 'dark' || (!temaSalvo && prefereDark)) {
        document.body.setAttribute('data-theme', 'dark');
        DOM.themeToggle.textContent = '☀️';
    }
}

// ==========================================
// ESTATÍSTICAS E DASHBOARD
// ==========================================
function carregarStats() {
    const statsSalvos = localStorage.getItem('estudaPlusStats');
    if (statsSalvos) {
        stats = JSON.parse(statsSalvos);
    }
}

function salvarStats() {
    localStorage.setItem('estudaPlusStats', JSON.stringify(stats));
    atualizarDashboard();
}

function atualizarDashboard() {
    DOM.sTotal.textContent = stats.respondidas;
    DOM.sCorrect.textContent = stats.acertos;
    DOM.sWrong.textContent = stats.erros;
    
    const percentual = stats.respondidas === 0 ? 0 : Math.round((stats.acertos / stats.respondidas) * 100);
    DOM.sPercent.textContent = `${percentual}%`;
}

DOM.btnResetStats.addEventListener('click', () => {
    if(confirm('Tem certeza que deseja zerar seu histórico?')) {
        stats = { respondidas: 0, acertos: 0, erros: 0 };
        salvarStats();
    }
});

// ==========================================
// IMPORTAÇÃO DE JSON LOCAL
// ==========================================
DOM.jsonUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            questoes = JSON.parse(e.target.result);
            if (questoes.length > 0) {
                iniciarQuiz();
            } else {
                alert("O arquivo JSON está vazio ou inválido.");
            }
        } catch (error) {
            alert("Erro ao ler o arquivo JSON. Verifique a formatação.");
            console.error(error);
        }
    };
    reader.readAsText(file);
});

// ==========================================
// LÓGICA DO QUIZ
// ==========================================
function iniciarQuiz() {
    DOM.emptyState.classList.add('hidden');
    DOM.quizContainer.classList.remove('hidden');
    questaoAtualIndex = 0;
    renderizarQuestao();
}

function renderizarQuestao() {
    // Esconder feedback anterior
    DOM.feedbackBox.classList.add('hidden');
    DOM.feedbackBox.className = 'feedback-box hidden mt-3'; // Reseta as classes
    
    const q = questoes[questaoAtualIndex];
    
    // Atualizar UI
    DOM.badgeMateria.textContent = q.materia;
    DOM.badgeDificuldade.textContent = q.dificuldade;
    DOM.qCounter.textContent = `Questão ${questaoAtualIndex + 1}/${questoes.length}`;
    DOM.qText.textContent = q.pergunta;
    
    // Atualizar Barra de Progresso
    const progresso = ((questaoAtualIndex) / questoes.length) * 100;
    DOM.progressBar.style.width = `${progresso}%`;

    // Renderizar Alternativas
    DOM.optionsContainer.innerHTML = '';
    
    // O Object.entries converte {"A":"...", "B":"..."} em array
    for (const [letra, texto] of Object.entries(q.alternativas)) {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<strong>${letra})</strong> ${texto}`;
        btn.onclick = () => verificarResposta(letra, btn);
        DOM.optionsContainer.appendChild(btn);
    }
}

function verificarResposta(letraSelecionada, btnClicado) {
    const q = questoes[questaoAtualIndex];
    const isCorreta = letraSelecionada === q.resposta_correta;
    
    // Desabilitar todos os botões
    const botoes = DOM.optionsContainer.querySelectorAll('.option-btn');
    botoes.forEach(b => {
        b.disabled = true;
        // Destacar a correta visualmente de qualquer forma
        if (b.innerHTML.includes(`<strong>${q.resposta_correta})</strong>`)) {
            b.classList.add('correct');
        }
    });

    // Atualizar Estatísticas
    stats.respondidas++;
    if (isCorreta) {
        stats.acertos++;
        DOM.feedbackBox.classList.add('success');
        DOM.feedbackTitle.textContent = "✅ Resposta Correta!";
        
        DOM.feedbackText.innerHTML = `
            <div class="exp-block">
                <strong>Explicação:</strong> ${q.explicacoes[q.resposta_correta]}
            </div>`;
    } else {
        stats.erros++;
        btnClicado.classList.add('wrong');
        DOM.feedbackBox.classList.add('danger');
        DOM.feedbackTitle.textContent = "❌ Resposta Incorreta";
        
        DOM.feedbackText.innerHTML = `
            <div class="exp-block" style="color: var(--danger); margin-bottom: 0.5rem;">
                <strong>Seu erro:</strong> ${q.explicacoes[letraSelecionada]}
            </div>
            <div class="exp-block" style="color: var(--success);">
                <strong>O correto seria:</strong> ${q.explicacoes[q.resposta_correta]}
            </div>`;
    }

    salvarStats();
    
    // Mostrar feedback
    DOM.feedbackBox.classList.remove('hidden');
    
    // Alterar texto do botão Next se for a última questão
    if (questaoAtualIndex === questoes.length - 1) {
        DOM.btnNext.textContent = "Finalizar Estudos 🏁";
    } else {
        DOM.btnNext.textContent = "Próxima Questão ➔";
    }
}

DOM.btnNext.addEventListener('click', () => {
    if (questaoAtualIndex < questoes.length - 1) {
        questaoAtualIndex++;
        renderizarQuestao();
    } else {
        // Fim das questões
        DOM.progressBar.style.width = `100%`;
        alert("🎉 Parabéns! Você concluiu esta lista de exercícios.");
        DOM.quizContainer.classList.add('hidden');
        DOM.emptyState.classList.remove('hidden');
        DOM.emptyState.querySelector('h2').textContent = "Lista Concluída!";
        DOM.emptyState.querySelector('p').textContent = "Carregue um novo arquivo JSON para continuar estudando.";
    }
});