import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, addDoc, deleteDoc, onSnapshot, collection, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { pillarZeroData, pillarData, jornadaFlorescerData, astrologyData, seasonalHerbData, cosmogramData, chakraData, pranayamaData } from "./data.js";

// --- STATE & DOM ELEMENTS ---
let app, db, auth, userId;

const errorModal = document.getElementById('error-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const loadingMessage = document.getElementById('loading-message');
const appContainer = document.getElementById('app-container');
const detailModal = document.getElementById('detail-modal');

// --- CORE FUNCTIONS ---
function showDiagnosticModal(title, checklist) {
    if (!modalTitle || !modalMessage || !errorModal) return;
    modalTitle.innerHTML = `<i class="fas fa-exclamation-triangle mr-3"></i><span>${title}</span>`;
    modalMessage.innerHTML = checklist;
    errorModal.classList.remove('hidden');
}

function hideModal(modalElement) { 
    if (!modalElement) return;
    modalElement.classList.remove('visible'); 
}

function showDetailModal(title, content) {
    if (!detailModal) return;
    const modalBody = document.getElementById('detail-modal-body');
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="text-center mb-6">
                <h2 class="font-cinzel text-2xl font-bold text-[#c8a44d]">${title}</h2>
            </div>
            <div>${content}</div>
        `;
    }
    detailModal.classList.add('visible');
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
    const pZeroCardHtml = `<div class="pillar-card rounded-lg p-4 text-center" data-pillar="zero">
        <div class="text-3xl mb-2">${pZero.symbol}</div>
        <h3 class="font-cinzel font-bold">${pZero.title}</h3>
        <p class="text-xs text-gray-400">A Cosmovisão Sincrética</p>
    </div>`;

    const pillarCardsHtml = Object.keys(pillarData).map(key => {
        const p = pillarData[key];
        return `<div class="pillar-card rounded-lg p-4 text-center" data-pillar="${key}">
            <div class="text-3xl mb-2">${p.title.split(' ')[0]}</div>
            <h3 class="font-cinzel font-bold">${p.title.split(' ').slice(2).join(' ')}</h3>
            <p class="text-xs text-gray-400">${p.chakra}</p>
        </div>`;
    }).join('');

    container.innerHTML = `
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold font-cinzel text-[#c8a44d] mb-6">Os Sete Pilares da Ascensão</h2>
        </div>
        <div id="pillar-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="md:col-span-2 lg:col-span-4">${pZeroCardHtml}</div>
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
                <p class="mb-6 italic text-gray-400">"${etapa.foco}"</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    <div class="space-y-4">
                        <div><h4 class="font-bold text-[#a37e2c] mb-2">Arquétipos Guia:</h4><p class="text-gray-400">${etapa.arquétipos}</p></div>
                        <div><h4 class="font-bold text-[#a37e2c] mb-2">Pilares Focais:</h4><p class="text-gray-400">${etapa.pilares}</p></div>
                    </div>
                    <div>
                        <h4 class="font-bold text-[#a37e2c] mb-2">Práticas Sugeridas:</h4>
                        <div class="text-gray-400">${etapa.praticas}</div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold font-cinzel text-[#c8a44d]">Jornada do Florescer: As Sete Etapas</h2>
            <p class="text-gray-400 mt-2 max-w-3xl mx-auto">Um caminho guiado para a autotransformação, inspirado na sua transição para o ciclo de Chesed (Júpiter). Cada etapa é um portal que integra sabedoria e prática, guiado por arquétipos poderosos e alinhado aos Pilares da Rota Pagã.</p>
        </div>
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

function renderHerbCards(season) {
    const container = document.getElementById('herb-cards-container');
    if (!container) return;
    const herbs = seasonalHerbData[season] || [];
    container.innerHTML = herbs.map(herb => `
        <div class="card rounded-lg overflow-hidden herb-card" data-season="${season}" data-herb-name="${herb.name}">
            <div class="herb-image-placeholder">${herb.name.charAt(0)}</div>
            <div class="p-4">
                <h4 class="font-cinzel font-bold text-lg text-[#c8a44d]">${herb.name}</h4>
                <p class="text-sm italic text-gray-400">${herb.scientificName}</p>
                <p class="text-xs text-gray-300 mt-2">${herb.magicalUses[0]}</p>
            </div>
        </div>
    `).join('');
}

function showHerbDetails(season, herbName) {
    const herb = seasonalHerbData[season]?.find(h => h.name === herbName);
    if (!herb) return;

    const content = `
        <p class="italic text-gray-400 text-center mb-6">${herb.scientificName}</p>
        <div class="grid grid-cols-2 gap-4 text-sm mb-4">
            <p><strong><i class="fas fa-globe-americas mr-2 text-[#a37e2c]"></i>Planeta:</strong> ${herb.planet}</p>
            <p><strong><i class="fas fa-fire mr-2 text-[#a37e2c]"></i>Elemento:</strong> ${herb.element}</p>
        </div>
        <p class="mb-6"><strong><i class="fas fa-goddess mr-2 text-[#a37e2c]"></i>Divindades:</strong> ${herb.deities}</p>
        <div>
            <h4 class="font-bold text-[#a37e2c] mb-2">Usos Mágicos:</h4>
            <ul class="list-disc list-inside text-gray-300 space-y-1">
                ${herb.magicalUses.map(use => `<li>${use}</li>`).join('')}
            </ul>
        </div>
        <div class="mt-4">
            <h4 class="font-bold text-[#a37e2c] mb-2">Usos Medicinais:</h4>
            <p class="text-gray-300">${herb.medicinalUses}</p>
        </div>
    `;
    showDetailModal(herb.name, content);
}

function renderHerbarioFlorestaSection() {
    const container = document.getElementById('herbario-floresta-section');
    if (!container) return;
    const seasons = ['Primavera', 'Verão', 'Outono', 'Inverno'];
    const currentSeason = getCurrentSeason();

    const tabsHtml = seasons.map(season => `
        <button class="herb-tab ${season === currentSeason ? 'active' : ''}" data-season="${season}">${season}</button>
    `).join('');

    container.innerHTML = `
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold font-cinzel text-[#c8a44d]">Herbário da Floresta</h2>
            <p class="text-gray-400 mt-2">Um guia sazonal para a sabedoria das plantas de poder.</p>
        </div>
        <div class="card p-2 rounded-lg mb-6">
            <div class="herb-tabs flex justify-center">${tabsHtml}</div>
        </div>
        <div id="herb-cards-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
    `;
    renderHerbCards(currentSeason);
}

function showCrystalDetails(crystal) {
    if (!crystal) return;

    const content = `
        <div class="space-y-6 text-sm">
            <div>
                <h4 class="font-bold font-cinzel text-[#a37e2c] mb-2">A Alma da Terra (Composição):</h4>
                <p class="text-gray-300">${crystal.composition}</p>
            </div>
            ${crystal.history ? `
            <div>
                <h4 class="font-bold font-cinzel text-[#a37e2c] mb-2">A Memória dos Povos (História):</h4>
                <p class="text-gray-300">${crystal.history}</p>
            </div>` : ''}
            <div>
                <h4 class="font-bold font-cinzel text-[#a37e2c] mb-2">O Sopro do Espírito (Propriedades Metafísicas):</h4>
                <p class="text-gray-300">${crystal.properties}</p>
            </div>
            <div>
                <h4 class="font-bold font-cinzel text-[#a37e2c] mb-2">A Mão do Mago (Usos Práticos):</h4>
                <div class="text-gray-300">${crystal.uses}</div>
            </div>
            <div class="pt-4 border-t border-gray-600">
                 <p class="text-xs text-gray-500"><strong>Termos de Pesquisa:</strong> ${crystal.searchTerms}</p>
            </div>
        </div>
    `;
    showDetailModal(`${crystal.icon} ${crystal.name}`, content);
}

function renderCosmogramaCristalinoSection() {
    const container = document.getElementById('cosmograma-cristalino-section');
    if (!container || !cosmogramData) return;

    const sunHtml = `
        <div class="cosmogram-sun">
            <div class="crystal-card sun-card" data-crystal-name="${cosmogramData.sun.name}">
                <div class="crystal-card-icon">${cosmogramData.sun.icon}</div>
                <h3 class="font-cinzel text-xl font-bold text-[#c8a44d]">${cosmogramData.sun.name}</h3>
                <p class="text-sm text-gray-400">${cosmogramData.sun.subtitle}</p>
            </div>
        </div>
    `;

    const orbitsHtml = cosmogramData.orbits.map(orbit => `
        <div class="orbit">
            <h3 class="orbit-title">${orbit.name}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${orbit.crystals.map(crystal => `
                    <div class="crystal-card" data-crystal-name="${crystal.name}">
                        <div class="crystal-card-icon">${crystal.icon}</div>
                        <h4 class="font-cinzel text-lg font-bold text-[#c8a44d]">${crystal.name}</h4>
                        <p class="text-xs text-gray-400">${crystal.subtitle}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="cosmogram-intro">
            <h2 class="text-2xl font-bold font-cinzel text-[#c8a44d] mb-4">Cosmograma Cristalino</h2>
            <p class="text-gray-400">${cosmogramData.intro}</p>
        </div>
        ${sunHtml}
        ${orbitsHtml}
    `;
}

function renderChakraSection() {
    const container = document.getElementById('chakra-section');
    if (!container) return;

    const chakraHtml = chakraData.map(chakra => `
        <div class="chakra-card">
            <div class="chakra-orb ${chakra.color}"></div>
            <div>
                <h3 class="font-cinzel text-xl font-bold text-[#c8a44d]">${chakra.name}</h3>
                <p class="text-md text-gray-400 mb-2">${chakra.translation}</p>
                <p class="text-sm text-gray-300">${chakra.description}</p>
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold font-cinzel text-[#c8a44d]">Centros de Poder</h2>
            <p class="text-gray-400 mt-2">Os sete vórtices de energia que governam seu corpo sutil.</p>
        </div>
        <div class="chakra-column">
            <div class="chakra-line"></div>
            ${chakraHtml}
        </div>
    `;
}

function renderPranayamaSection() {
    const container = document.getElementById('pranayama-section');
    if (!container) return;

    const pranayamaHtml = pranayamaData.map(pranayama => `
        <div class="card rounded-lg mb-4 overflow-hidden no-hover pranayama-card">
            <div class="accordion-header p-4 flex justify-between items-center bg-[#2c2c2c] hover:bg-[#3a3a3a]">
                <div>
                    <h3 class="font-cinzel text-lg font-bold text-[#c8a44d]">${pranayama.name}</h3>
                    <p class="text-sm text-gray-400">${pranayama.translation}</p>
                </div>
                <i class="fas fa-chevron-down transition-transform"></i>
            </div>
            <div class="accordion-content bg-[#222] p-6 border-t border-[#444]">
                <p class="mb-4 text-gray-300"><strong>Propósito:</strong> ${pranayama.purpose}</p>
                <div class="mb-4">
                    <h4 class="font-bold text-[#a37e2c] mb-2">Como Praticar:</h4>
                    <ol class="list-decimal list-inside text-gray-400 space-y-2">${pranayama.comoPraticar.map(step => `<li>${step}</li>`).join('')}</ol>
                </div>
                 <p class="mb-4 text-gray-300"><strong>Ponto de Foco:</strong> ${pranayama.pontoFoco}</p>
                 <div class="pt-4 border-t border-gray-600">
                     <p class="text-xs text-gray-500"><strong>Termos de Pesquisa:</strong> ${pranayama.termosPesquisa}</p>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold font-cinzel text-[#c8a44d]">Sopros de Vida: Pranayama</h2>
            <p class="text-gray-400 mt-2 max-w-3xl mx-auto">Domine a respiração para dominar sua energia vital. Cada técnica é uma chave para um estado de consciência diferente.</p>
        </div>
        <div>${pranayamaHtml}</div>
    `;
}

// --- FIRESTORE FUNCTIONS ---
const getCollectionRef = (collectionName) => collection(db, `users/${userId}/${collectionName}`);

async function handleAddItem(event) {
    event.preventDefault();
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;

    const titleEl = form.elements.namedItem('title');
    const contentEl = form.elements.namedItem('content');
    const tagsEl = form.elements.namedItem('tags');

    const title = titleEl instanceof HTMLInputElement ? titleEl.value : '';
    const content = contentEl instanceof HTMLTextAreaElement ? contentEl.value : '';
    const tagsValue = tagsEl instanceof HTMLInputElement ? tagsEl.value : '';
    const tags = tagsValue ? tagsValue.split(',').map(t => t.trim()).filter(Boolean) : [];

    if (!title || !content) return;

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
                ${entry.tags && entry.tags.map(tag => `<span class="grimoire-tag">${tag}</span>`).join('')}
             </div>
        </div>
    `).join('');
}


// --- EVENT LISTENERS ---
function setupEventListeners() {
    document.getElementById('close-modal-btn')?.addEventListener('click', () => hideModal(errorModal));
    document.getElementById('close-detail-modal')?.addEventListener('click', () => hideModal(detailModal));
    detailModal?.addEventListener('click', (e) => {
        if (e.target === detailModal) hideModal(detailModal);
    });
    
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
        if (e.target instanceof Element) {
            const card = e.target.closest('.pillar-card');
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
    
    function handleAccordionClick(sectionId) {
        document.getElementById(sectionId)?.addEventListener('click', (e) => {
            const target = e.target;
            if (target instanceof Element) {
                const header = target.closest('.accordion-header');
                if (header instanceof HTMLElement) {
                    const content = header.nextElementSibling;
                    const icon = header.querySelector('i');
                    if (content instanceof HTMLElement) {
                        document.querySelectorAll(`#${sectionId} .accordion-content`).forEach(acc => {
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
            }
        });
    }

    handleAccordionClick('jornada-section');
    handleAccordionClick('pranayama-section');

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
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                    icon?.classList.add('rotate-45');
                }
            }
        }
        const deleteButton = e.target.closest('.delete-btn');
        if (deleteButton instanceof HTMLElement && deleteButton.dataset.id) {
            handleDeleteItem(deleteButton.dataset.id);
        }
    });

    document.getElementById('herbario-floresta-section')?.addEventListener('click', (e) => {
        if (!(e.target instanceof Element)) return;
        const tab = e.target.closest('.herb-tab');
        if (tab instanceof HTMLElement && tab.dataset.season) {
            document.querySelectorAll('.herb-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderHerbCards(tab.dataset.season);
        }
        const card = e.target.closest('.herb-card');
        if (card instanceof HTMLElement && card.dataset.season && card.dataset.herbName) {
            showHerbDetails(card.dataset.season, card.dataset.herbName);
        }
    });

    document.getElementById('cosmograma-cristalino-section')?.addEventListener('click', (e) => {
        if (!(e.target instanceof Element)) return;
        const card = e.target.closest('.crystal-card');
        if (card instanceof HTMLElement && card.dataset.crystalName) {
            const crystalName = card.dataset.crystalName;
            let crystal;
            if (cosmogramData.sun.name === crystalName) {
                crystal = cosmogramData.sun;
            } else {
                for (const orbit of cosmogramData.orbits) {
                    crystal = orbit.crystals.find(c => c.name === crystalName);
                    if (crystal) break;
                }
            }
            if (crystal) showCrystalDetails(crystal);
        }
    });

    const grimoireForm = document.getElementById('add-grimoire-form');
    if (grimoireForm) {
        grimoireForm.addEventListener('submit', handleAddItem);
    }
}

function getCurrentSeason(hemisphere = 'south') {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    if (hemisphere === 'south') {
        if ((month === 9 && day >= 23) || month === 10 || month === 11 || (month === 12 && day < 21)) return 'Primavera';
        if ((month === 12 && day >= 21) || month === 1 || month === 2 || (month === 3 && day < 20)) return 'Verão';
        if ((month === 3 && day >= 20) || month === 4 || month === 5 || (month === 6 && day < 21)) return 'Outono';
        return 'Inverno';
    }
    return 'Primavera';
}


// --- INITIALIZATION ---
function initApp() {
    try {
        if (!import.meta.env) {
            throw new Error("O objeto de ambiente (import.meta.env) não está definido. Este erro ocorre quando o arquivo é aberto diretamente no navegador. Para rodar localmente, use o comando `npm run dev` (ou `vite`) no seu terminal. Para produção, garanta que seu provedor de hospedagem (ex: Netlify) está construindo o projeto com Vite.");
        }

        const firebaseConfig = {
            apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
            authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
            projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
            storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
            appId: import.meta.env.VITE_FIREBASE_APP_ID
        };

        if (!firebaseConfig.apiKey) {
            throw new Error("A chave de API do Firebase (apiKey) não foi encontrada. Verifique se suas variáveis de ambiente (ex: VITE_FIREBASE_API_KEY) estão configuradas corretamente no seu ambiente de hospedagem (ex: Netlify).");
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
                renderHerbarioFlorestaSection();
                renderCosmogramaCristalinoSection();
                renderChakraSection();
                renderPranayamaSection();
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
        let checklist;
        const errorMessage = error instanceof Error ? error.message : String(error);

        if (errorMessage.includes("import.meta.env")) {
            checklist = `<p><strong>A aplicação não está sendo executada no ambiente correto.</strong></p>
                         <p class="mt-2">Este erro ocorre quando o arquivo é aberto diretamente no navegador, em vez de através do servidor de desenvolvimento Vite.</p>
                         <ul class="list-disc list-inside mt-4 space-y-2">
                            <li><strong>Solução Local:</strong> Certifique-se de que você está rodando o comando <code>npm run dev</code> (ou <code>vite</code>) no terminal, na pasta do projeto.</li>
                            <li><strong>Solução Online:</strong> Verifique se suas variáveis de ambiente (<code>VITE_...</code>) estão corretamente configuradas no seu provedor de hospedagem (ex: Netlify) e se o projeto foi reconstruído.</li>
                         </ul>
                         <p class="mt-4 text-xs text-gray-500"><strong>Erro Técnico:</strong> ${errorMessage}</p>`;
        } else {
             checklist = `<p>A aplicação não conseguiu se conectar ao Firebase. Isso geralmente acontece por um destes motivos:</p><ul class="list-disc list-inside mt-2 space-y-2"><li><strong>Configuração Inválida:</strong> Verifique se suas variáveis de ambiente <code>VITE_...</code> estão corretas no seu ambiente de hospedagem (ex: Netlify) e se o projeto foi reconstruído após a alteração.</li><li><strong>Projeto Firebase:</strong> Confirme no <a href="https://console.firebase.google.com/" target="_blank" class="text-[#c8a44d] hover:underline">Console do Firebase</a> que o projeto existe e está ativo.</li><li><strong>Domínio Não Autorizado:</strong> Se estiver online, vá para 'Authentication' -> 'Settings' -> 'Authorized domains' no Firebase e adicione <code>${window.location.hostname}</code>.</li></ul><p class="mt-4 text-xs text-gray-500"><strong>Erro Detalhado:</strong> ${errorMessage || 'Verifique o console para mais detalhes.'}</p>`;
        }
        
        if(loadingMessage) loadingMessage.innerHTML = `<p class="text-red-500 font-semibold text-center">Erro crítico de inicialização.</p>`;
        showDiagnosticModal("Erro de Inicialização", checklist);
    }
}

document.addEventListener('DOMContentLoaded', initApp);