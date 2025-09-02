
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, addDoc, deleteDoc, onSnapshot, collection, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { pillarZeroData, pillarData, jornadaFlorescerData, astrologyData } from "./data.js";


// --- CONFIG ---
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
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

    const pZero = pillarZeroData;
    const pZeroCardHtml = `<div class="pillar-card rounded-lg p-4 text-center md:col-span-2 lg:col-span-4 cursor-pointer" data-pillar="zero">
        <div class="text-3xl mb-2">${pZero.symbol}</div>
        <h3 class="font-cinzel font-bold">${pZero.title}</h3>
        <p class="text-xs text-gray-400">A Cosmovisão Sincrética</p>
    </div>`;

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
            <div class="accordion-header p-4 flex justify-between items-center bg-[#2c2c2c] hover:bg-[#3a3a3a]">
                <div>
                    <h3 class="font-cinzel text-lg font-bold text-[#c8a44d]">${etapa.title}</h3>
                    <p class="text-sm text-gray-400">Etapa ${etapa.etapa}</p>
                </div>
                <i class="fas fa-chevron-down transition-transform"></i>
            </div>
            <div class="accordion-content bg-[#222] p-6 border-t border-[#444]">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div><h4 class="font-bold text-[#a37e2c] mb-2">Arquétipos Guia:</h4><p class="text-gray-400">${etapa.arquétipos}</p></div>
                    <div><h4 class="font-bold text-[#a37e2c] mb-2">Pilares Focais:</h4><p class="text-gray-400">${etapa.pilares}</p></div>
                    <div><h4 class="font-bold text-[#a37e2c] mb-2">Práticas Sugeridas:</h4><p class="text-gray-400">${etapa.praticas}</p></div>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="text-center mb-8"><h2 class="text-2xl font-bold font-cinzel text-[#c8a44d]">Jornada do Florescer: As Sete Etapas</h2><p class="text-gray-400 mt-2">Um caminho guiado para a autotransformação.</p></div>
        <div>${jornadaHtml}</div>
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
        <div class="text-center mb-8"><h2 class="text-2xl font-bold font-cinzel text-[#c8a44d]">Altar de Manifestação: Trânsitos Astrológicos</h2><p class="text-gray-400 mt-2">Uma visão cósmica da sua jornada pessoal.</p></div>
        <div>${astrologyHtml}</div>
    `;
}

function renderTomoDePoderSection() {
    const container = document.getElementById('tomo-de-poder-section');
    if (!container) return;
    container.innerHTML = `
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold font-cinzel text-[#c8a44d]">Tomo de Poder</h2>
            <p class="text-gray-400 mt-2">Seu grimório pessoal para anotações mágicas e insights.</p>
        </div>
        <div class="card rounded-lg mb-6 overflow-hidden no-hover">
            <div id="add-entry-accordion-header" class="accordion-header p-4 flex justify-between items-center cursor-pointer bg-[#2c2c2c] hover:bg-[#3a3a3a]">
                <h3 class="font-cinzel text-lg font-bold text-[#c8a44d]">Adicionar Nova Inscrição</h3>
                <i class="fas fa-plus transition-transform"></i>
            </div>
            <div id="add-entry-accordion-content" class="accordion-content bg-[#222] p-6 border-t border-[#444]">
                <form id="add-grimoire-form" class="space-y-4">
                    <input type="text" name="title" placeholder="Título da Inscrição" class="form-input" required>
                    <textarea name="content" placeholder="Seus pensamentos, rituais, sonhos..." rows="4" class="form-input" required></textarea>
                    <input type="text" name="tags" placeholder="Etiquetas (ex: sonho, ritual, insight)" class="form-input">
                    <button type="submit" class="btn-primary w-full py-2 rounded-lg">Salvar Inscrição</button>
                </form>
            </div>
        </div>
        <div id="grimoire-entries-list" class="space-y-4"></div>
    `;
}


// --- FIRESTORE FUNCTIONS ---
const getCollectionRef = (collectionName) => collection(db, `users/${userId}/${collectionName}`);

async function handleAddItem(event) {
    event.preventDefault();
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;

    const title = form.elements.namedItem('title')?.value;
    const content = form.elements.namedItem('content')?.value;
    const tags = form.elements.namedItem('tags')?.value.split(',').map(t => t.trim()).filter(Boolean);

    try {
        await addDoc(getCollectionRef('grimoire_entries'), { title, content, tags, createdAt: serverTimestamp() });
        form.reset();
        const accordionContent = document.getElementById('add-entry-accordion-content');
        const icon = document.getElementById('add-entry-accordion-header')?.querySelector('i');
        if (accordionContent) accordionContent.style.maxHeight = null;
        if (icon) icon.classList.remove('rotate-45');
    } catch (error) {
        console.error("Error adding document: ", error);
        showDiagnosticModal("Erro ao Salvar", "Não foi possível salvar a inscrição. Verifique o console para mais detalhes.");
    }
}

async function handleDeleteItem(id) {
    if (confirm("Tem certeza que deseja apagar esta inscrição para sempre?")) {
        try {
            await deleteDoc(doc(db, `users/${userId}/grimoire_entries`, id));
        } catch (error) {
            console.error("Error deleting document: ", error);
            showDiagnosticModal("Erro ao Apagar", "Não foi possível apagar a inscrição. Verifique o console para mais detalhes.");
        }
    }
}

function setupCollectionListener(collectionName, renderFunction) {
    const q = query(getCollectionRef(collectionName), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderFunction(items);
    }, (error) => {
        console.error(`Error listening to ${collectionName}:`, error);
        showDiagnosticModal("Erro de Sincronização", `Não foi possível carregar os dados de '${collectionName}'.`);
    });
}

function renderGrimoireEntries(entries) {
    const listContainer = document.getElementById('grimoire-entries-list');
    if (!listContainer) return;
    if (entries.length === 0) {
        listContainer.innerHTML = `<p class="text-center text-gray-500">Seu Tomo está vazio. Adicione sua primeira inscrição acima.</p>`;
        return;
    }
    listContainer.innerHTML = entries.map(entry => `
        <div class="card p-6 rounded-lg grimoire-entry-card no-hover">
             <i class="fas fa-trash delete-btn" data-id="${entry.id}"></i>
             <h4 class="font-cinzel text-xl font-bold text-[#c8a44d] mb-2">${entry.title}</h4>
             <p class="text-gray-300 whitespace-pre-wrap mb-4">${entry.content}</p>
             <div class="flex flex-wrap gap-2">
                ${entry.tags.map(tag => `<span class="grimoire-tag">${tag}</span>`).join('')}
             </div>
        </div>
    `).join('');
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
        if (e.target instanceof Element && e.target.closest('.pillar-card') instanceof HTMLElement) {
            const card = e.target.closest('.pillar-card');
            if (card.dataset.pillar) showPillarDetails(card.dataset.pillar);
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
        if (e.target instanceof Element && e.target.closest('.accordion-header') instanceof HTMLElement) {
            const header = e.target.closest('.accordion-header');
            const content = header.nextElementSibling;
            const icon = header.querySelector('i');
            if (content instanceof HTMLElement) {
                document.querySelectorAll('#jornada-section .accordion-content').forEach(acc => {
                    if (acc !== content && acc instanceof HTMLElement) {
                        acc.style.maxHeight = null;
                        acc.previousElementSibling?.querySelector('i')?.classList.remove('rotate-180');
                    }
                });
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    icon?.classList.remove('rotate-180');
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                    icon?.classList.add('rotate-180');
                }
            }
        }
    });

    document.getElementById('tomo-de-poder-section')?.addEventListener('click', (e) => {
        if (!(e.target instanceof Element)) return;
        const header = e.target.closest('#add-entry-accordion-header');
        if (header) {
            const content = document.getElementById('add-entry-accordion-content');
            const icon = header.querySelector('i');
            if (content instanceof HTMLElement) {
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    icon?.classList.remove('rotate-45');
                    icon?.classList.add('fa-plus');
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                    icon?.classList.add('rotate-45');
                    icon?.classList.remove('fa-plus');
                }
            }
        }
        const deleteButton = e.target.closest('.delete-btn');
        if (deleteButton instanceof HTMLElement && deleteButton.dataset.id) {
            handleDeleteItem(deleteButton.dataset.id);
        }
    });
    
    document.getElementById('add-grimoire-form')?.addEventListener('submit', handleAddItem);
}

// --- INITIALIZATION ---
function initApp() {
    try {
        if (!firebaseConfig.apiKey) {
            throw new Error("A configuração do Firebase está incompleta. Verifique suas variáveis de ambiente.");
        }
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
                renderTomoDePoderSection();
                setupEventListeners();
                setupCollectionListener('grimoire_entries', renderGrimoireEntries);
                
            } else {
                signInAnonymously(auth).catch((err) => {
                    console.error("Auth Error:", err);
                     const checklist = `<p>A autenticação anônima falhou. Verifique no seu Console do Firebase:</p><ul class="list-disc list-inside mt-2 space-y-1"><li><strong>Autenticação Anônima Ativada:</strong> Vá para 'Authentication' -> 'Sign-in method' e garanta que 'Anônimo' está ativado.</li><li><strong>Domínios Autorizados:</strong> Verifique se o domínio (<code>${window.location.hostname}</code>) está na lista de domínios autorizados.</li></ul>`;
                    showDiagnosticModal("Falha na Autenticação", checklist);
                });
            }
        });
    } catch (error) {
        console.error("Initialization Error:", error);
        const checklist = `<p>A aplicação não conseguiu se conectar ao Firebase. Isso geralmente acontece por um destes motivos:</p><ul class="list-disc list-inside mt-2 space-y-2"><li><strong>Configuração Inválida:</strong> Verifique se o objeto <code>firebaseConfig</code> (geralmente gerenciado por variáveis de ambiente <code>VITE_...</code>) está 100% correto.</li><li><strong>Projeto Firebase:</strong> Confirme no <a href="https://console.firebase.google.com/" target="_blank" class="text-[#c8a44d] hover:underline">Console do Firebase</a> que o projeto existe e está ativo.</li><li><strong>Domínio Não Autorizado:</strong> Se estiver online, vá para 'Authentication' -> 'Settings' -> 'Authorized domains' no Firebase e adicione <code>${window.location.hostname}</code>.</li></ul><p class="mt-4 text-xs text-gray-500"><strong>Erro Detalhado:</strong> ${error.message || 'Verifique o console para mais detalhes.'}</p>`;
        if(loadingMessage) loadingMessage.innerHTML = `<p class="text-red-500 font-semibold text-center">Erro crítico de inicialização.</p>`;
        showDiagnosticModal("Erro de Conexão com Firebase", checklist);
    }
}

document.addEventListener('DOMContentLoaded', initApp);