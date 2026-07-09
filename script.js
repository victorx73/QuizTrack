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
    btnAddQuestion: document.getElementById('btn-add-question'),
    modalOverlay: document.getElementById('modal-overlay'),
    modalClose: document.getElementById('modal-close'),
    questionForm: document.getElementById('question-form'),

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
    btnNext: document.getElementById('btn-next'),

    // Form
    qPergunta: document.getElementById('q-pergunta'),
    qAltA: document.getElementById('q-alt-a'),
    qAltB: document.getElementById('q-alt-b'),
    qAltC: document.getElementById('q-alt-c'),
    qAltD: document.getElementById('q-alt-d'),
    qAltE: document.getElementById('q-alt-e'),
    qResposta: document.getElementById('q-resposta'),
    qExpA: document.getElementById('q-exp-a'),
    qExpB: document.getElementById('q-exp-b'),
    qExpC: document.getElementById('q-exp-c'),
    qExpD: document.getElementById('q-exp-d'),
    qExpE: document.getElementById('q-exp-e'),
    qMateria: document.getElementById('q-materia'),
    qDificuldade: document.getElementById('q-dificuldade')
};

// ==========================================
// INICIALIZAÇÃO E STORAGE
// ==========================================
window.onload = () => {
    carregarTema();
    carregarStats();
    carregarQuestoes();
    atualizarDashboard();
    atualizarInterface();
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
    const prefereDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (temaSalvo === 'dark' || (!temaSalvo && prefereDark)) {
        document.body.setAttribute('data-theme', 'dark');
        DOM.themeToggle.textContent = '☀️';
    }
}

// ==========================================
// GERENCIAMENTO DE QUESTÕES (LocalStorage)
// ==========================================
function carregarQuestoes() {
    const questoesSalvas = localStorage.getItem('quiztrack_questoes');
    if (questoesSalvas) {
        try {
            questoes = JSON.parse(questoesSalvas);
        } catch (e) {
            console.error('Erro ao carregar questões:', e);
            questoes = [];
        }
    }
}

function salvarQuestoes() {
    localStorage.setItem('quiztrack_questoes', JSON.stringify(questoes));
}

// ==========================================
// ESTATÍSTICAS E DASHBOARD
// ==========================================
function carregarStats() {
    const statsSalvos = localStorage.getItem('quiztrack_stats');
    if (statsSalvos) {
        try {
            stats = JSON.parse(statsSalvos);
        } catch (e) {
            console.error('Erro ao carregar estatísticas:', e);
            stats = { respondidas: 0, acertos: 0, erros: 0 };
        }
    }
}

function salvarStats() {
    localStorage.setItem('quiztrack_stats', JSON.stringify(stats));
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
    if (confirm('Tem certeza que deseja zerar seu histórico?')) {
        stats = { respondidas: 0, acertos: 0, erros: 0 };
        salvarStats();
    }
});

// ==========================================
// MODAL - ADICIONAR QUESTÃO
// ==========================================
function abrirModal() {
    DOM.modalOverlay.classList.remove('hidden');
    DOM.questionForm.reset();
    // Atualiza as opções do select com base nas alternativas preenchidas
    atualizarOpcoesResposta();
}

function fecharModal() {
    DOM.modalOverlay.classList.add('hidden');
}

DOM.btnAddQuestion.addEventListener('click', abrirModal);
DOM.modalClose.addEventListener('click', fecharModal);

// Fechar modal ao clicar fora
DOM.modalOverlay.addEventListener('click', (e) => {
    if (e.target === DOM.modalOverlay) {
        fecharModal();
    }
});

// Atualizar opções do select de resposta baseado nas alternativas
function atualizarOpcoesResposta() {
    const alternativas = [
        { id: 'q-alt-a', value: 'A' },
        { id: 'q-alt-b', value: 'B' },
        { id: 'q-alt-c', value: 'C' },
        { id: 'q-alt-d', value: 'D' },
        { id: 'q-alt-e', value: 'E' }
    ];

    // Limpar opções existentes (manter a primeira opção vazia)
    DOM.qResposta.innerHTML = '<option value="">Selecione...</option>';

    alternativas.forEach(alt => {
        const input = document.getElementById(alt.id);
        if (input && input.value.trim() !== '') {
            const option = document.createElement('option');
            option.value = alt.value;
            option.textContent = alt.value;
            DOM.qResposta.appendChild(option);
        }
    });
}

// Atualizar opções quando alguma alternativa for preenchida
['q-alt-a', 'q-alt-b', 'q-alt-c', 'q-alt-d', 'q-alt-e'].forEach(id => {
    document.getElementById(id).addEventListener('input', atualizarOpcoesResposta);
});

// ==========================================
// SUBMISSÃO DO FORMULÁRIO
// ==========================================
DOM.questionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Coletar alternativas
    const alternativas = {};
    const explicacoes = {};
    let temErro = false;

    const altMapping = [
        { id: 'q-alt-a', key: 'A', expId: 'q-exp-a' },
        { id: 'q-alt-b', key: 'B', expId: 'q-exp-b' },
        { id: 'q-alt-c', key: 'C', expId: 'q-exp-c' },
        { id: 'q-alt-d', key: 'D', expId: 'q-exp-d' },
        { id: 'q-alt-e', key: 'E', expId: 'q-exp-e' }
    ];

    altMapping.forEach(({ id, key, expId }) => {
        const altInput = document.getElementById(id);
        const expInput = document.getElementById(expId);
        
        if (altInput && altInput.value.trim() !== '') {
            alternativas[key] = altInput.value.trim();
            if (expInput && expInput.value.trim() !== '') {
                explicacoes[key] = expInput.value.trim();
            } else {
                // Se alternativa tem valor, explicação é obrigatória
                temErro = true;
                expInput.style.borderColor = 'var(--danger)';
            }
        } else {
            // Se alternativa está vazia, não precisa de explicação
            if (expInput) {
                expInput.style.borderColor = '';
                expInput.value = '';
            }
        }
    });

    // Verificar se pelo menos 2 alternativas foram preenchidas
    const numAlternativas = Object.keys(alternativas).length;
    if (numAlternativas < 2) {
        alert('Por favor, preencha pelo menos 2 alternativas.');
        return;
    }

    if (temErro) {
        alert('Por favor, preencha todas as explicações para as alternativas adicionadas.');
        return;
    }

    // Verificar resposta correta
    const respostaCorreta = DOM.qResposta.value;
    if (!respostaCorreta || !alternativas[respostaCorreta]) {
        alert('Por favor, selecione uma resposta correta válida.');
        return;
    }

    // Criar nova questão
    const novaQuestao = {
        pergunta: DOM.qPergunta.value.trim(),
        alternativas: alternativas,
        resposta_correta: respostaCorreta,
        explicacoes: explicacoes,
        materia: DOM.qMateria.value.trim() || 'Geral',
        dificuldade: DOM.qDificuldade.value || 'Médio'
    };

    // Adicionar à lista
    questoes.push(novaQuestao);
    salvarQuestoes();

    // Atualizar interface
    atualizarInterface();

    // Fechar modal e resetar
    fecharModal();
    DOM.questionForm.reset();
    DOM.qResposta.innerHTML = '<option value="">Selecione...</option>';
    
    // Resetar bordas
    document.querySelectorAll('.exp-input input').forEach(el => {
        el.style.borderColor = '';
    });

    // Feedback
    alert('✅ Questão adicionada com sucesso!');
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
            const novasQuestoes = JSON.parse(e.target.result);
            if (Array.isArray(novasQuestoes) && novasQuestoes.length > 0) {
                // Validar estrutura básica
                const valido = novasQuestoes.every(q => 
                    q.pergunta && q.alternativas && q.resposta_correta && q.explicacoes
                );
                
                if (valido) {
                    questoes = questoes.concat(novasQuestoes);
                    salvarQuestoes();
                    atualizarInterface();
                    alert(`✅ ${novasQuestoes.length} questões importadas com sucesso!`);
                } else {
                    alert('❌ Estrutura do JSON inválida. Verifique o formato.');
                }
            } else {
                alert('❌ O arquivo JSON está vazio ou inválido.');
            }
        } catch (error) {
            alert('❌ Erro ao ler o arquivo JSON. Verifique a formatação.');
            console.error(error);
        }
    };
    reader.readAsText(file);
    // Resetar input para permitir importar o mesmo arquivo novamente
    this.value = '';
});

// ==========================================
// LÓGICA DO QUIZ
// ==========================================
function atualizarInterface() {
    if (questoes.length > 0) {
        DOM.emptyState.classList.add('hidden');
        DOM.quizContainer.classList.remove('hidden');
        if (questaoAtualIndex >= questoes.length) {
            questaoAtualIndex = 0;
        }
        renderizarQuestao();
    } else {
        DOM.emptyState.classList.remove('hidden');
        DOM.quizContainer.classList.add('hidden');
        DOM.emptyState.querySelector('h2').textContent = 'Nenhuma questão cadastrada';
        DOM.emptyState.querySelector('p').textContent = 'Clique em "Adicionar Questão" para criar sua primeira questão ou importe um arquivo JSON.';
    }
}

function renderizarQuestao() {
    if (questoes.length === 0) {
        atualizarInterface();
        return;
    }

    DOM.feedbackBox.classList.add('hidden');
    DOM.feedbackBox.className = 'feedback-box hidden mt-3';

    const q = questoes[questaoAtualIndex];

    DOM.badgeMateria.textContent = q.materia || 'Geral';
    DOM.badgeDificuldade.textContent = q.dificuldade || 'Médio';
    DOM.qCounter.textContent = `Questão ${questaoAtualIndex + 1}/${questoes.length}`;
    DOM.qText.textContent = q.pergunta;

    const progresso = ((questaoAtualIndex) / questoes.length) * 100;
    DOM.progressBar.style.width = `${progresso}%`;

    DOM.optionsContainer.innerHTML = '';

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

    const botoes = DOM.optionsContainer.querySelectorAll('.option-btn');
    botoes.forEach(b => {
        b.disabled = true;
        if (b.innerHTML.includes(`<strong>${q.resposta_correta})</strong>`)) {
            b.classList.add('correct');
        }
    });

    stats.respondidas++;
    if (isCorreta) {
        stats.acertos++;
        DOM.feedbackBox.classList.add('success');
        DOM.feedbackTitle.textContent = "✅ Resposta Correta!";
        
        DOM.feedbackText.innerHTML = `
            <div class="exp-block">
                <strong>Explicação:</strong> ${q.explicacoes[q.resposta_correta] || 'Explicação não disponível.'}
            </div>`;
    } else {
        stats.erros++;
        btnClicado.classList.add('wrong');
        DOM.feedbackBox.classList.add('danger');
        DOM.feedbackTitle.textContent = "❌ Resposta Incorreta";
        
        const explicacaoErro = q.explicacoes[letraSelecionada] || 'Explicação não disponível.';
        const explicacaoCorreta = q.explicacoes[q.resposta_correta] || 'Explicação não disponível.';
        
        DOM.feedbackText.innerHTML = `
            <div class="exp-block" style="color: var(--danger); margin-bottom: 0.5rem;">
                <strong>Seu erro:</strong> ${explicacaoErro}
            </div>
            <div class="exp-block" style="color: var(--success);">
                <strong>O correto seria:</strong> ${explicacaoCorreta}
            </div>`;
    }

    salvarStats();

    DOM.feedbackBox.classList.remove('hidden');

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
        DOM.progressBar.style.width = '100%';
        alert('🎉 Parabéns! Você concluiu esta lista de exercícios.');
        questaoAtualIndex = 0;
        atualizarInterface();
    }
});