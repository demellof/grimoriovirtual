
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, addDoc, deleteDoc, onSnapshot, collection, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { seasonalHerbData, cosmogramData, chakraData, pranayamaData } from "./data.js";

// --- STATE & DOM ELEMENTS ---
let app, db, auth, userId;
let pranayamaCycleTimeout;
let pranayamaCountdownInterval;

const pranayamaPatterns = {
    "Nadi Shodhana": [
        { instruction: "Inspire (Esquerda)", duration: 4000, action: 'inhale' },
        { instruction: "Expire (Direita)", duration: 4000, action: 'exhale' },
        { instruction: "Inspire (Direita)", duration: 4000, action: 'inhale' },
        { instruction: "Expire (Esquerda)", duration: 4000, action: 'exhale' }
    ],
    "Ujjayi Pranayama": [
        { instruction: "Inspire (com som)", duration: 5000, action: 'inhale' },
        { instruction: "Expire (com som)", duration: 5000, action: 'exhale' }
    ],
    "Bhastrika": [
        { instruction: "Inspire (Forçado)", duration: 500, action: 'inhale' },
        { instruction: "Expire (Forçado)", duration: 500, action: 'exhale' }
    ],
    "Sama Vritti": [
        { instruction: "Inspire", duration: 4000, action: 'inhale' },
        { instruction: "Segure", duration: 4000, action: 'hold' },
        { instruction: "Expire", duration: 4000, action: 'exhale' },
        { instruction: "Segure", duration: 4000, action: 'hold' }
    ],
    "Sheetali Pranayama": [
        { instruction: "Inspire (pela boca)", duration: 5000, action: 'inhale' },
        { instruction: "Expire (pelo nariz)", duration: 5000, action: 'exhale' }
    ],
    "Bhramari Pranayama": [
        { instruction: "Inspire", duration: 4000, action: 'inhale' },
        { instruction: "Expire (Zumbido)", duration: 6000, action: 'exhale' }
    ]
};

const errorModal = document.getElementById('error-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const loadingMessage = document.getElementById('loading-message');
const appContainer = document.getElementById('app-container');
const detailModal = document.getElementById('detail-modal');

// --- CORE FUNCTIONS ---
function startPranayamaPractice(techniqueName) {
    const pattern = pranayamaPatterns[techniqueName];
    if (!pattern) return;

    const guide = document.getElementById('pranayama-guide');
    const container = document.getElementById('pranayama-anim-container');
    const instructionEl = document.getElementById('pranayama-instruction');
    const timerEl = document.getElementById('pranayama-timer');
    if (!guide || !container || !instructionEl || !timerEl) return;

    stopPranayamaPractice();
    container.innerHTML = '';
    guide.classList.add('active');

    const cycleDuration = pattern.reduce((sum, step) => sum + step.duration, 0);

    const runCycle = () => {
        let cumulativeTime = 0;

        // Setup animations for the cycle
        if (techniqueName === "Sama Vritti") {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 180 180");
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("class", "anim-square");
            rect.setAttribute("x", "5");
            rect.setAttribute("y", "5");
            rect.setAttribute("width", "170");
            rect.setAttribute("height", "170");
            svg.appendChild(rect);
            container.appendChild(svg);
        } else if (techniqueName === "Ujjayi Pranayama") {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 180 100");
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("class", "anim-wave");
            path.setAttribute("d", "M 10,50 Q 50,10 90,50 T 170,50");
            svg.appendChild(path);
            container.appendChild(svg);
        } else if (techniqueName === "Nadi Shodhana") {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 180 120");
            svg.innerHTML = `
                <path id="path-left" class="anim-nostril-path" d="M 90 110 C 40 110, 40 10, 90 10" />
                <path id="path-right" class="anim-nostril-path" d="M 90 110 C 140 110, 140 10, 90 10" />
            `;
            container.appendChild(svg);
        } else {
            const circle = document.createElement('div');
            circle.className = 'anim-shape anim-circle';
            container.appendChild(circle);
        }

        // Run steps and timers
        pattern.forEach((step, index) => {
            setTimeout(() => {
                instructionEl.textContent = step.instruction;
                let remainingTime = step.duration / 1000;
                timerEl.textContent = `${remainingTime}s`;

                clearInterval(pranayamaCountdownInterval);
                pranayamaCountdownInterval = setInterval(() => {
                    remainingTime--;
                    timerEl.textContent = `${remainingTime}s`;
                    if (remainingTime <= 0) clearInterval(pranayamaCountdownInterval);
                }, 1000);

                if (techniqueName === "Sama Vritti") {
                    const rect = container.querySelector('.anim-square');
                    if(rect) {
                        rect.setAttribute("class", `anim-square draw-side-${index + 1}`);
                        rect.style.animationDuration = `${step.duration}ms`;
                    }
                } else if (techniqueName === "Ujjayi Pranayama") {
                    const wave = container.querySelector('.anim-wave');
                    if(wave) {
                        wave.style.animationDuration = `${step.duration}ms`;
                        wave.setAttribute("class", `anim-wave ${step.action === 'inhale' ? 'draw-wave-inhale' : 'draw-wave-exhale'}`);
                    }
                } else if (techniqueName === "Nadi Shodhana") {
                    const leftPath = container.querySelector('#path-left');
                    const rightPath = container.querySelector('#path-right');
                    if (leftPath && rightPath) {
                        leftPath.style.animationDuration = `${step.duration}ms`;
                        rightPath.style.animationDuration = `${step.duration}ms`;
                        if (step.instruction.includes("Esquerda")) {
                            leftPath.classList.add('active');
                            rightPath.classList.remove('active');
                        } else {
                            rightPath.classList.add('active');
                            leftPath.classList.remove('active');
                        }
                    }
                } else {
                    const circle = container.querySelector('.anim-circle');
                    if(circle) {
                        circle.style.transitionDuration = `${step.duration}ms`;
                        circle.classList.remove('breathing-inhale', 'breathing-exhale');
                        if(step.action === 'inhale') circle.classList.add('breathing-inhale');
                        else if (step.action === 'exhale') circle.classList.add('breathing-exhale');
                    }
                }
            }, cumulativeTime);
            cumulativeTime += step.duration;
        });

        pranayamaCycleTimeout = setTimeout(runCycle, cycleDuration);
    };

    runCycle();
}

function stopPranayamaPractice() {
    const guide = document.getElementById('pranayama-guide');
    const container = document.getElementById('pranayama-anim-container');
    if (guide) guide.classList.remove('active');
    if (container) container.innerHTML = '';
    clearTimeout(pranayamaCycleTimeout);
    clearInterval(pranayamaCountdownInterval);
}

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

function showHerbDetails(season, herbName) {
    const herb = seasonalHerbData[season]?.find(h => h.name === herbName);
    if (!herb) return;

    let content;
    if (herb.content) {
        content = `
            <p class="italic text-gray-400 text-center mb-6">${herb.scientificName}</p>
            <div class="space-y-6 text-sm">
                <div>
                    <h4 class="herb-detail-heading">A Alma da Erva (Propriedades Mágicas)</h4>
                    <p class="text-gray-300">${herb.content.almaDaErva}</p>
                </div>
                <div>
                    <h4 class="herb-detail-heading">A Farmácia da Floresta (Rituais e Usos)</h4>
                    <div class="text-gray-300">${herb.content.farmaciaDaFloresta}</div>
                </div>
                <div>
                    <h4 class="herb-detail-heading">Insights do Bem Viver (Conexão Holística)</h4>
                    <p class="text-gray-300">${herb.content.insightsDoBemViver}</p>
                </div>
            </div>
        `;
    } else {
        content = `
            <p class="italic text-gray-400 text-center mb-6">${herb.scientificName}</p>
            <div class="grid grid-cols-2 gap-4 text-sm mb-4">
                <p><strong><i class="fas fa-globe-americas mr-2 text-[#a37e2c]"></i>Planeta:</strong> ${herb.planet}</p>
                <p><strong><i class="fas fa-fire mr-2 text-[#a37e2c]"></i>Elemento:</strong> ${herb.element}</p>
            </div>
            <p class="mb-6"><strong><i class="fas fa-goddess mr-2 text-[#a37e2c]"></i>Divindades:</strong> ${herb.deities}</p>
            <div>
                <h4 class="font-bold text-[#a37e2c] mb-2">Usos Mágicos:</h4>
                <ul class="list-disc list-inside text-gray-300 space-y-1">${herb.magicalUses.map(use => `<li>${use}</li>`).join('')}</ul>
            </div>
        `;
    }
    showDetailModal(herb.name, content);
}

function showCrystalDetails(crystal) {
    if (!crystal) return;

    const imageHtml = crystal.image ? `<img src="${crystal.image}" alt="${crystal.name}" class="w-full h-48 object-cover rounded-md mb-6">` : '';

    const content = `
        ${imageHtml}
        <div class="space-y-6 text-sm">
            <div><h4 class="font-bold font-cinzel text-[#a37e2c] mb-2">A Alma da Terra (Composição):</h4><p class="text-gray-300">${crystal.composition}</p></div>
            ${crystal.history ? `<div><h4 class="font-bold font-cinzel text-[#a37e2c] mb-2">A Memória dos Povos (História):</h4><p class="text-gray-300">${crystal.history}</p></div>` : ''}
            <div><h4 class="font-bold font-cinzel text-[#a37e2c] mb-2">O Sopro do Espírito (Propriedades Metafísicas):</h4><p class="text-gray-300">${crystal.properties}</p></div>
            <div><h4 class="font-bold font-cinzel text-[#a37e2c] mb-2">A Mão do Mago (Usos Práticos):</h4><div class="text-gray-300">${crystal.uses}</div></div>
            <div class="pt-4 border-t border-gray-600"><p class="text-xs text-gray-500"><strong>Termos de Pesquisa:</strong> ${crystal.searchTerms}</p></div>
        </div>`;
    showDetailModal(`${crystal.icon} ${crystal.name}`, content);
}

// --- RENDER FUNCTIONS ---
function renderHerbCards(season) {
    const container = document.getElementById('herb-cards-container');
    if (!container) return;
    const herbs = seasonalHerbData[season] || [];
    container.innerHTML = herbs.map(herb => {
        const imageHtml = herb.image
            ? `<img src="${herb.image}" alt="${herb.name}" class="w-full h-48 object-cover">`
            : `<div class="herb-image-placeholder">${herb.name.charAt(0)}</div>`;

        return `
            <div class="card rounded-lg overflow-hidden herb-card" data-season="${season}" data-herb-name="${herb.name}">
                ${imageHtml}
                <div class="p-4">
                    <h4 class="font-cinzel font-bold text-lg text-[#c8a44d]">${herb.name}</h4>
                    <p class="text-sm italic text-gray-400">${herb.scientificName}</p>
                    <p class="text-xs text-gray-300 mt-2">${(herb.content ? herb.content.almaDaErva : (herb.magicalUses ? herb.magicalUses[0] : '')).substring(0, 70)}...</p>
                </div>
            </div>
        `;
    }).join('');
}

function renderHerbarioFlorestaSection() {
    const container = document.getElementById('herbario-floresta-section');
    if (!container) return;
    const seasons = ['Primavera', 'Verão', 'Outono', 'Inverno'];
    const currentSeason = getCurrentSeason();

    const tabsHtml = seasons.map(season => `<button class="herb-tab ${season === currentSeason ? 'active' : ''}" data-season="${season}">${season}</button>`).join('');

    container.innerHTML = `
        <div class="section-intro">
            <h2 class="text-2xl font-bold font-cinzel text-[#c8a44d]">Herbário da Floresta Sazonal</h2>
        </div>
        <div class="card p-4 rounded-lg mb-6 text-center text-gray-300">${seasonalHerbData.intro}</div>
        <div class="card p-2 rounded-lg mb-6"><div class="herb-tabs flex justify-center">${tabsHtml}</div></div>
        <div id="herb-cards-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
    `;
    renderHerbCards(currentSeason);
}

function renderCosmogramaCristalinoSection() {
    const container = document.getElementById('cosmograma-cristalino-section');
    if (!container || !cosmogramData) return;

    // Flatten all crystals into a single array for a responsive layout
    const allCrystals = cosmogramData.orbits.flatMap(orbit => orbit.crystals);

    const crystalsHtml = allCrystals.map(crystal => {
        return `
            <div class="crystal-orb" data-crystal-name="${crystal.name}">
                <div class="crystal-orb-icon">${crystal.icon}</div>
                <div>
                    <h4 class="font-cinzel text-lg font-bold text-[#c8a44d]">${crystal.name}</h4>
                    <p class="text-xs text-gray-400">${crystal.subtitle}</p>
                </div>
            </div>
        `;
    }).join('');

    const sunHtml = `
        <div class="crystal-orb sun-orb" data-crystal-name="${cosmogramData.sun.name}">
            <div class="crystal-orb-icon">${cosmogramData.sun.icon}</div>
            <div>
                <h3 class="font-cinzel text-xl font-bold text-[#c8a44d]">${cosmogramData.sun.name}</h3>
                <p class="text-sm text-gray-400">${cosmogramData.sun.subtitle}</p>
            </div>
        </div>
    `;

    container.innerHTML = `
        <div class="cosmogram-intro">
            <h2 class="text-2xl font-bold font-cinzel text-[#c8a44d] mb-4">Cosmograma Cristalino</h2>
            <p class="text-gray-400">${cosmogramData.intro}</p>
        </div>
        <div class="cosmograma-container-responsive">
            ${sunHtml}
            ${crystalsHtml}
        </div>
    `;
}

function renderChakraSection() {
    const container = document.getElementById('chakra-section');
    if (!container) return;

    const chakraHtml = chakraData.chakras.map(chakra => `
        <div class="card rounded-lg mb-2 overflow-hidden no-hover chakra-card">
            <div class="accordion-header p-4 flex justify-between items-center bg-[#2c2c2c] hover:bg-[#3a3a3a]">
                <div class="flex items-center gap-4">
                    <div class="chakra-orb ${chakra.color} !w-8 !h-8 !static !animate-none flex items-center justify-center font-bold text-lg">
                        ${chakra.mantra.charAt(0)}
                    </div>
                    <div>
                        <h3 class="font-cinzel text-lg font-bold text-[#c8a44d]">${chakra.name}</h3>
                        <p class="text-sm text-gray-400">${chakra.translation} - Mantra: ${chakra.mantra}</p>
                    </div>
                </div>
                <i class="fas fa-chevron-down transition-transform"></i>
            </div>
            <div class="accordion-content bg-[#222] p-6 border-t border-[#444] text-sm space-y-4">
                 <div><h4 class="font-bold text-[#a37e2c] mb-2">A Essência:</h4><p class="text-gray-300">${chakra.essencia}</p></div>
                 <div><h4 class="font-bold text-[#a37e2c] mb-2">Diagnóstico Energético:</h4><p class="text-gray-300">${chakra.diagnostico}</p></div>
                 <div><h4 class="font-bold text-[#a37e2c] mb-2">Práticas de Harmonização:</h4><div class="text-gray-300">${chakra.praticas}</div></div>
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="section-intro">
            <h2 class="text-2xl font-bold font-cinzel text-[#c8a44d]">${chakraData.introTitle}</h2>
            <p class="text-gray-400 mt-2">${chakraData.introText}</p>
            <div class="card p-4 rounded-lg my-6 text-sm bg-black/20 border border-amber-600/20">
                <h4 class="font-bold text-[#a37e2c] mb-2">O Pilar do Som e os Bija Mantras</h4>
                <p class="text-gray-300">${chakraData.soundPillarIntro}</p>
            </div>
        </div>
        <div>${chakraHtml}</div>
    `;
}

function renderPranayamaSection() {
    const container = document.getElementById('pranayama-section');
    if (!container) return;

    const pranayamaHtml = pranayamaData.techniques.map(pranayama => `
        <div class="card rounded-lg mb-4 overflow-hidden no-hover pranayama-card">
            <div class="accordion-header p-4 flex justify-between items-center bg-[#2c2c2c] hover:bg-[#3a3a3a]">
                <div><h3 class="font-cinzel text-lg font-bold text-[#c8a44d]">${pranayama.name}</h3><p class="text-sm text-gray-400">${pranayama.translation}</p></div>
                <i class="fas fa-chevron-down transition-transform"></i>
            </div>
            <div class="accordion-content bg-[#222] p-6 border-t border-[#444]">
                 <div class="pranayama-image-placeholder">${pranayama.imagePlaceholder || ''}</div>
                <div class="space-y-4 text-sm">
                    <div><h4 class="font-bold text-[#a37e2c]">Para que serve:</h4><p class="text-gray-300">${pranayama.paraQueServe}</p></div>
                    <div><h4 class="font-bold text-[#a37e2c]">Ponto de Foco:</h4><p class="text-gray-300">${pranayama.pontoFoco}</p></div>
                    <div><h4 class="font-bold text-[#a37e2c]">Como Praticar:</h4><ol class="list-decimal list-inside text-gray-400 space-y-1">${pranayama.comoPraticar.map(step => `<li>${step}</li>`).join('')}</ol></div>
                    <div class="pt-4 mt-4 border-t border-gray-600 clear-both">
                        <button class="btn-primary w-full py-2 rounded-lg pranayama-practice-btn" data-pranayama="${pranayama.name}">
                            <i class="fas fa-play-circle mr-2"></i>Praticar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="section-intro">
            <h2 class="text-2xl font-bold font-cinzel text-[#c8a44d]">${pranayamaData.introTitle}</h2>
            <p class="text-gray-400 mt-2 italic">${pranayamaData.introMessage}</p>
            <div class="card p-4 rounded-lg my-6 text-sm">
                <h4 class="font-bold text-[#a37e2c] mb-2">O Ritual de Três Respirações (Seu Estímulo Inicial)</h4>
                <p class="text-gray-300">${pranayamaData.initialRitual}</p>
            </div>
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
function triggerTouchAnimation(element) {
    if (!element) return;
    if (element.classList.contains('touch-hover')) return;
    element.classList.add('touch-hover');
    setTimeout(() => {
        element.classList.remove('touch-hover');
    }, 1000);
}

function setupEventListeners() {
    document.getElementById('close-modal-btn')?.addEventListener('click', () => hideModal(errorModal));
    document.getElementById('close-detail-modal')?.addEventListener('click', () => hideModal(detailModal));
    detailModal?.addEventListener('click', (e) => { if (e.target === detailModal) hideModal(detailModal); });
    
    appContainer?.addEventListener('click', (e) => {
        if (!(e.target instanceof Element)) return;
        const target = e.target;

        const tab = target.closest('.tab');
        if (tab instanceof HTMLElement && tab.dataset.section) {
            const sectionId = tab.dataset.section;

            // Update active content section
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            document.getElementById(sectionId)?.classList.add('active');

            // Update active tab style
            document.querySelectorAll('#main-nav .tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update body class for thematic background
            const sectionClass = `${sectionId.replace('-section', '')}-active`;
            document.body.className = 'bg-[#1a1a1a] text-[#e0e0e0]'; // Reset to default classes
            document.body.classList.add(sectionClass);

            return;
        }

        const accordionHeader = target.closest('.accordion-header');
        if (accordionHeader instanceof HTMLElement) {
            const content = accordionHeader.nextElementSibling;
            if (!(content instanceof HTMLElement)) return;
            const icon = accordionHeader.querySelector('i');
            const isTomoAdd = accordionHeader.id === 'add-entry-accordion-header';
            const rotationClass = isTomoAdd ? 'rotate-45' : 'rotate-180';
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon?.classList.remove(rotationClass);
            } else {
                const parentSection = accordionHeader.closest('.content-section, .detail-modal-content');
                parentSection?.querySelectorAll('.accordion-content').forEach(acc => {
                    if (acc !== content && acc instanceof HTMLElement) {
                       acc.style.maxHeight = null;
                       const prevIcon = acc.previousElementSibling?.querySelector('i');
                       prevIcon?.classList.remove('rotate-180', 'rotate-45');
                    }
                });
                content.style.maxHeight = content.scrollHeight + "px";
                icon?.classList.add(rotationClass);
            }
            return;
        }

        const deleteButton = target.closest('.delete-btn');
        if (deleteButton instanceof HTMLElement && deleteButton.dataset.id) {
            handleDeleteItem(deleteButton.dataset.id);
            return;
        }
        
        const herbTab = target.closest('.herb-tab');
        if (herbTab instanceof HTMLElement && herbTab.dataset.season) {
            document.querySelectorAll('.herb-tab').forEach(t => t.classList.remove('active'));
            herbTab.classList.add('active');
            renderHerbCards(herbTab.dataset.season);
            return;
        }
        const herbCard = target.closest('.herb-card');
        if (herbCard instanceof HTMLElement && herbCard.dataset.season && herbCard.dataset.herbName) {
            showHerbDetails(herbCard.dataset.season, herbCard.dataset.herbName);
            return;
        }

        const crystalOrb = target.closest('.crystal-orb');
        if (crystalOrb instanceof HTMLElement && crystalOrb.dataset.crystalName) {
            triggerTouchAnimation(crystalOrb);
            const name = crystalOrb.dataset.crystalName;
            const crystal = (cosmogramData.sun.name === name) ? cosmogramData.sun : cosmogramData.orbits.flatMap(o => o.crystals).find(c => c.name === name);

            if (crystal?.color) {
                crystalOrb.classList.add('light-up');
                setTimeout(() => crystalOrb.classList.remove('light-up'), 1000);
            }

            if (crystal) showCrystalDetails(crystal);
            return;
        }

        const pranayamaBtn = target.closest('.pranayama-practice-btn');
        if (pranayamaBtn instanceof HTMLElement && pranayamaBtn.dataset.pranayama) {
            startPranayamaPractice(pranayamaBtn.dataset.pranayama);
            return;
        }

        // Handle the stop button via event delegation for robustness
        const stopPranayamaBtn = target.closest('#stop-pranayama-btn');
        if (stopPranayamaBtn) {
            stopPranayamaPractice();
            return;
        }
    });

    // The listener below is now delegated to the appContainer, so this direct binding is no longer needed.
    // document.getElementById('stop-pranayama-btn')?.addEventListener('click', stopPranayamaPractice);

    appContainer?.addEventListener('mouseover', (e) => {
        if (!(e.target instanceof Element)) return;
        const crystalOrb = e.target.closest('.crystal-orb');
        if (crystalOrb instanceof HTMLElement && crystalOrb.dataset.crystalName) {
            const name = crystalOrb.dataset.crystalName;
            const crystal = (cosmogramData.sun.name === name) ? cosmogramData.sun : cosmogramData.orbits.flatMap(o => o.crystals).find(c => c.name === name);
            if (crystal?.color) {
                crystalOrb.style.setProperty('--crystal-light-color', crystal.color);
            }
        }
    });

    document.getElementById('add-grimoire-form')?.addEventListener('submit', handleAddItem);
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


function createFloatingItems() {
    const container = document.getElementById('floating-items-container');
    if (!container) return;

    const items = ['✨', '✦', '⚗️', '🔭', '🧬', '⚛️', '✶', '·', '•', '∘'];
    const itemCount = 30;

    for (let i = 0; i < itemCount; i++) {
        const item = document.createElement('span');
        item.className = 'floating-item';
        item.textContent = items[Math.floor(Math.random() * items.length)];

        const size = Math.random() * 20 + 10; // 10px to 30px
        item.style.fontSize = `${size}px`;

        item.style.left = `${Math.random() * 100}vw`;

        const duration = Math.random() * 20 + 15; // 15s to 35s
        item.style.animationDuration = `${duration}s`;

        const delay = Math.random() * 15; // 0s to 15s
        item.style.animationDelay = `${delay}s`;

        container.appendChild(item);
    }
}

// --- INITIALIZATION ---
function initApp() {
    try {
        if (!import.meta.env) {
            const guardMessage = `<h4 class="font-cinzel text-lg text-amber-300">O Guardião do Templo se manifesta!</h4><p class="mt-4">Saudações, Guardião da Centelha.</p><p class="mt-2">Você tentou abrir um portal para este templo diretamente, mas a magia deste local requer um ritual de ativação para que flua corretamente.</p><p class="mt-4"><strong>Isto não é um bug, mas sim a proteção do santuário.</strong></p><ul class="list-disc list-inside mt-4 space-y-2"><li><strong>Para acessar o templo em seu ambiente local:</strong> Realize o ritual de abertura no seu terminal com o comando sagrado: <code>npm run dev</code>.</li><li><strong>Seu templo online:</strong> Permanece consagrado e funcionando perfeitamente no Netlify.</li></ul><p class="mt-4">Prossiga com o ritual e a energia fluirá.</p>`;
            showDiagnosticModal("Portal Selado", guardMessage);
            loadingMessage?.classList.add('hidden');
            return;
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
                loadingMessage?.classList.add('hidden');
                appContainer?.classList.remove('hidden');
                
                const userIdDisplay = document.getElementById('user-id-display');
                if (userIdDisplay) userIdDisplay.innerHTML = `<strong>Guardião da Centelha:</strong><br><span class="text-xs text-gray-500">A água, como a magia, sempre encontra seu caminho.</span>`;
                
                renderHerbarioFlorestaSection();
                renderCosmogramaCristalinoSection();
                renderChakraSection();
                renderPranayamaSection();
                setupEventListeners();
                setupCollectionListener('grimoire_entries', renderGrimoireEntries);
                createFloatingItems();
                
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
        const errorMessage = error instanceof Error ? error.message : String(error);
        const checklist = `<p>A aplicação não conseguiu se conectar ao Firebase. Isso geralmente acontece por um destes motivos:</p><ul class="list-disc list-inside mt-2 space-y-2"><li><strong>Configuração Inválida:</strong> Verifique se suas variáveis de ambiente <code>VITE_...</code> estão corretas no seu ambiente de hospedagem (ex: Netlify) e se o projeto foi reconstruído após a alteração.</li><li><strong>Projeto Firebase:</strong> Confirme no <a href="https://console.firebase.google.com/" target="_blank" class="text-[#c8a44d] hover:underline">Console do Firebase</a> que o projeto existe e está ativo.</li><li><strong>Domínio Não Autorizado:</strong> Se estiver online, vá para 'Authentication' -> 'Settings' -> 'Authorized domains' no Firebase e adicione <code>${window.location.hostname}</code>.</li></ul><p class="mt-4 text-xs text-gray-500"><strong>Erro Detalhado:</strong> ${errorMessage || 'Verifique o console para mais detalhes.'}</p>`;
        if (loadingMessage) {
            loadingMessage.innerHTML = `<p class="text-red-500 font-semibold text-center">Erro crítico de inicialização.</p>`;
        }
        showDiagnosticModal("Erro de Inicialização", checklist);
    }
}

document.addEventListener('DOMContentLoaded', initApp);
