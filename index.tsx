
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { pillarZeroData, pillarData, jornadaFlorescerData, astrologyData } from "./data.js";


// --- CONFIG ---
const firebaseConfig = {
    apiKey: "AIzaSyDW7I2IInaifWd5mN-4XXHTbfUkHTZLxsg",
    authDomain: "repositriomistico.firebaseapp.com",
    projectId: "repositriomistico",
    storageBucket: "repositriomistico.appspot.com",
    messagingSenderId: "43222313411",
    appId: "1:43222313411:web:027dd33cc8030d24b9f576"
};

// --- STATE & DOM ELEMENTS ---
let app, db, auth, userId;

const errorModal = document.getElementById('error-modal');
const modalMessage = document.getElementById('modal-message');
const modalTitle = document.getElementById('modal-title');
const loadingMessage = document.getElementById('loading-message');
const appContainer = document.getElementById('app-container');

// --- CORE FUNCTIONS ---
function showDiagnosticModal(title, checklist) {
    if (!modalTitle || !modalMessage || !errorModal) return;
    modalTitle.innerHTML = `<i class="fas fa-exclamation-triangle mr-3"></i><span>${title}</span>`;
    modalMessage.innerHTML = checklist;
    errorModal.classList.remove('hidden');
}

function hideModal() { 
    if (!errorModal) return;
    errorModal.classList.add('hidden'); 
}

function showPillarDetails(pillarId) {
    const data = pillarId === 'zero' ? pillarZeroData : pillarData[pillarId];
    if (!data) return;
    const contentDiv = document.getElementById('pillar-content');
    if (!contentDiv) return;
    contentDiv.innerHTML = `<h2 class="text-2xl font-bold font-cinzel text-center text-[#c8a44d] mb-6">${data.title}</h2><div class="text-left">${data.content}</div>`;
    
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.getElementById('pillar-detail-section')?.classList.add('active');
}

// --- RENDER FUNCTIONS ---
function renderMainSection() {
    const container = document.getElementById('main-section');
    if(!container) return;

    // Pilar Zero Card
    const pZero = pillarZeroData;
    const pZeroCardHtml = `<div class="pillar-card rounded-lg p-4 text-center md:col-span-2 lg:col-span-4 cursor-pointer" data-pillar="zero">
        <div class="text-3xl mb-2">${pZero.symbol}</div>
        <h3 class="font-cinzel font-bold">${pZero.title}</h3>
        <p class="text-xs text-gray-400">A Cosmovisão Sincrética</p>
    </div>`;

    // Other Pillar Cards
    const pillarCardsHtml = Object.keys(pillarData).map(key => {
        const p = pillarData[key];
        return `<div class="pillar-card rounded-lg p-4 text-center cursor-pointer" data-pillar="${key}">
            <div class="text-3xl mb-2">${p.title.split(' ')[0]}</div>
            <h3 class="font-cinzel font-bold">${p.title.split(' ').slice(2).join(' ')}</h3>
            <p class="text-xs text-gray-400">${p.chakra}</p>
        </div>`;
    }).join('');

    container.innerHTML = `
        <h2 class="text-2xl font-bold font-cinzel text-center text-[#c8a44d] mb-6">Os Sete Pilares da Ascensão</h2>
        <div id="pillar-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            ${pZeroCardHtml}
            ${pillarCardsHtml}
        </div>
    `;
}

function renderJornadaSection() {
    const container = document.getElementById('jornada-section');
    if (!container) return;

    const jornadaHtml = jornadaFlorescerData.map(etapa => `
        <div class="card rounded-lg mb-4 overflow-hidden no-hover">
            <div class="accordion-header p-4 flex justify-between items-center cursor-pointer bg-[#2c2c2c] hover:bg-[#3a3a3a]">
                <div>
                    <h3 class="font-cinzel text-lg font-bold text-[#c8a44d]">${etapa.title}</h3>
                    <p class="text-sm text-gray-400">Etapa ${etapa.etapa}</p>
                </div>
                <i class="fas fa-chevron-down transition-transform"></i>
            </div>
            <div class="accordion-content bg-[#222] p-6 border-t border-[#444]">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div>
                        <h4 class="font-bold text-[#a37e2c] mb-2">Arquétipos Guia:</h4>
                        <p class="text-gray-400">${etapa.arquétipos}</p>
                    </div>
                    <div>
                        <h4 class="font-bold text-[#a37e2c] mb-2">Pilares Focais:</h4>
                        <p class="text-gray-400">${etapa.pilares}</p>
                    </div>
                    <div>
                        <h4 class="font-bold text-[#a37e2c] mb-2">Práticas Sugeridas:</h4>
                        <p class="text-gray-400">${etapa.praticas}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold font-cinzel text-[#c8a44d]">Jornada do Florescer: As Sete Etapas</h2>
            <p class="text-gray-400 mt-2">Um caminho guiado para a autotransformação.</p>
        </div>
        <div>
            ${jornadaHtml}
        </div>
    `;
}

function renderCosmogramaSection() {
    const container = document.getElementById('cosmograma-section');
    if (!container) return;

    const astrologyHtml = astrologyData.map(transit => `
        <div class="card p-6 mb-4 flex items-start space-x-4 no-hover">
            <i class="${transit.icon} text-3xl text-[#a37e2c] w-8 text-center"></i>
            <div>
                <p class="text-sm font-bold text-gray-400">${transit.year}</p>
                <h3 class="font-cinzel text-lg font-bold text-[#c8a44d]">${transit.title}</h3>
                <p class="text-gray-300 mt-1">${transit.description}</p>
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold font-cinzel text-[#c8a44d]">Altar de Manifestação: Trânsitos Astrológicos</h2>
            <p class="text-gray-400 mt-2">Uma visão cósmica da sua jornada pessoal.</p>
        </div>
        <div>
            ${astrologyHtml}
        </div>
    `;
}


// --- EVENT LISTENERS ---
function setupEventListeners() {
    document.getElementById('close-modal-btn')?.addEventListener('click', hideModal);
    
    document.querySelectorAll('#main-nav .tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const currentTarget = e.currentTarget;
            if (!(currentTarget instanceof HTMLElement)) return;

            const sectionId = currentTarget.dataset.section;
            if (!sectionId) return;
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            document.getElementById(sectionId)?.classList.add('active');
            document.querySelectorAll('#main-nav .tab').forEach(t => t.classList.remove('active'));
            currentTarget.classList.add('active');
        });
    });

    document.getElementById('main-section')?.addEventListener('click', (e) => {
        const target = e.target;
        if (target instanceof Element) {
            const card = target.closest('.pillar-card');
            if (card instanceof HTMLElement && card.dataset.pillar) {
                showPillarDetails(card.dataset.pillar);
            }
        }
    });

    document.querySelectorAll('.back-to-main').forEach(btn => {
        btn.addEventListener('click', () => {
             document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
             document.getElementById('main-section')?.classList.add('active');
             document.querySelectorAll('#main-nav .tab').forEach(t => t.classList.remove('active'));
             document.querySelector('#main-nav .tab[data-section="main-section"]')?.classList.add('active');
        });
    });

    document.getElementById('jornada-section')?.addEventListener('click', (e) => {
        const target = e.target;
        if (target instanceof Element) {
            const header = target.closest('.accordion-header');
            if (header) {
                const content = header.nextElementSibling;
                const icon = header.querySelector('i');
                if (content instanceof HTMLElement) {
                    // Fecha todos os outros accordions
                    document.querySelectorAll('#jornada-section .accordion-content').forEach(acc => {
                        if (acc !== content && acc instanceof HTMLElement) {
                            acc.style.maxHeight = null;
                            acc.previousElementSibling?.querySelector('i')?.classList.remove('rotate-180');
                        }
                    });

                    // Abre ou fecha o atual
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                        icon?.classList.remove('rotate-180');
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                        icon?.classList.add('rotate-180');
                    }
                }
            }
        }
    });
}

// --- INITIALIZATION ---
function initApp() {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                userId = user.uid;
                if(loadingMessage) loadingMessage.classList.add('hidden');
                if(appContainer) appContainer.classList.remove('hidden');
                
                const userIdDisplay = document.getElementById('user-id-display');
                if (userIdDisplay) {
                    userIdDisplay.innerHTML = `<strong>Guardião da Centelha:</strong><br><span class="text-xs text-gray-500">A água, como a magia, sempre encontra seu caminho.</span>`;
                }
                
                renderMainSection();
                renderJornadaSection();
                renderCosmogramaSection();
                setupEventListeners();
                
            } else {
                signInAnonymously(auth).catch((err) => {
                    console.error("Auth Error:", err);
                     const checklist = `
                        <p>A autenticação anônima falhou. Verifique no seu Console do Firebase:</p>
                        <ul class="list-disc list-inside mt-2 space-y-1">
                            <li><strong>Autenticação Anônima Ativada:</strong> Vá para 'Authentication' -> 'Sign-in method' e garanta que 'Anônimo' está ativado.</li>
                            <li><strong>Domínios Autorizados:</strong> Verifique se o domínio da aplicação (<code>${window.location.hostname}</code>) está na lista de domínios autorizados.</li>
                        </ul>
                    `;
                    showDiagnosticModal("Falha na Autenticação", checklist);
                });
            }
        });
    } catch (error) {
        console.error("Initialization Error:", error);
        const checklist = `
            <p>A aplicação não conseguiu se conectar ao Firebase. Isso geralmente acontece por um destes motivos:</p>
            <ul class="list-disc list-inside mt-2 space-y-2">
                <li>
                    <strong>Configuração Inválida:</strong> Verifique se o objeto <code>firebaseConfig</code> no seu código está 100% correto (apiKey, projectId, etc.).
                </li>
                <li>
                    <strong>Projeto Firebase:</strong> Confirme no <a href="https://console.firebase.google.com/" target="_blank" class="text-[#c8a44d] hover:underline">Console do Firebase</a> que o projeto com o ID '<code>${firebaseConfig.projectId}</code>' existe e que o aplicativo da web está configurado corretamente.
                </li>
                <li>
                    <strong>Domínio Não Autorizado:</strong> Se estiver online, vá para 'Authentication' -> 'Settings' -> 'Authorized domains' no Firebase e adicione o domínio do seu site (ex: <code>${window.location.hostname}</code>).
                </li>
            </ul>
            <p class="mt-4 text-xs text-gray-500"><strong>Erro Detalhado:</strong> ${error.message || 'Verifique o console para mais detalhes.'}</p>
        `;
        if(loadingMessage) {
            loadingMessage.innerHTML = `<p class="text-red-500 font-semibold text-center">Erro crítico de inicialização.</p>`;
        }
        showDiagnosticModal("Erro de Conexão com Firebase", checklist);
    }
}

document.addEventListener('DOMContentLoaded', initApp);
