import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, addDoc, deleteDoc, onSnapshot, collection, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { GoogleGenAI } from "https://esm.run/@google/genai";

// --- CONFIG & DATA ---
const firebaseConfig = {
    apiKey: "AIzaSyDW7I2IInaifWd5mN-4XXHTbfUkHTZLxsg",
    authDomain: "repositriomistico.firebaseapp.com",
    projectId: "repositriomistico",
    storageBucket: "repositriomistico.appspot.com",
    messagingSenderId: "43222313411",
    appId: "1:43222313411:web:027dd33cc8030d24b9f576"
};

const pillarData = {
    terra: { 
        title: "🌍 Pilar da Terra", 
        chakra: "Muladhara (Raiz)", 
        content: `
            <h3 class="text-xl font-bold font-cinzel text-[#c8a44d] mb-4">O Templo do Corpo e a Abundância da Alma</h3>
            <p class="mb-4 text-gray-400">A Terra não é apenas chão sob seus pés; é o seu primeiro templo, seu corpo. Este Pilar governa a fundação da sua existência material, a sua saúde, segurança e a sua conexão inata com a prosperidade do planeta. Aterrar-se é reivindicar seu direito divino à estabilidade e nutrição, construindo uma base sólida de onde sua alma pode florescer sem medo.</p>
            <p class="text-gray-400"><strong>Prática Essencial:</strong> Caminhar descalço na natureza, nutrição consciente, organização do seu espaço físico para refletir a ordem interior.</p>` 
    },
    agua: { 
        title: "🌊 Pilar da Água", 
        chakra: "Svadhisthana (Sacral)", 
        content: `
            <h3 class="text-xl font-bold font-cinzel text-[#c8a44d] mb-4">O Fluxo das Emoções e a Alquimia Criativa</h3>
            <p class="mb-4 text-gray-400">A Água é o solvente universal, o reino das emoções, da criatividade e do prazer. Este Pilar te convida a mergulhar nas correntes do seu mundo interior, a navegar seus sentimentos com fluidez e a transformar a paixão em expressão artística. Honrar a Água é permitir-se sentir sem julgamento, é dançar com os ciclos da vida e encontrar poder na sua vulnerabilidade.</p>
            <p class="text-gray-400"><strong>Prática Essencial:</strong> Journaling emocional (escrita livre), banhos ritualísticos, engajar-se em qualquer forma de arte (pintura, música, dança).</p>`
    },
    fogo: { 
        title: "🔥 Pilar do Fogo", 
        chakra: "Manipura (Plexo Solar)", 
        content: `
            <h3 class="text-xl font-bold font-cinzel text-[#c8a44d] mb-4">A Centelha da Vontade e a Forja da Transformação</h3>
            <p class="mb-4 text-gray-400">O Fogo é a sua centelha divina, a energia da ação, do poder pessoal e da transmutação. Este Pilar é a forja onde a vontade é temperada, a disciplina é cultivada e os obstáculos são transformados em combustível para sua ascensão. Ativar seu Fogo interior é assumir o comando da sua jornada, definir limites saudáveis e manifestar sua verdade com coragem inabalável.</p>
            <p class="text-gray-400"><strong>Prática Essencial:</strong> Exercício físico desafiador, afirmações de poder pessoal, completar tarefas que você tem procrastinado.</p>`
    },
    ar: { 
        title: "🌬️ Pilar do Ar", 
        chakra: "Anahata (Coração)", 
        content: `
            <h3 class="text-xl font-bold font-cinzel text-[#c8a44d] mb-4">O Sopro da Conexão e a Sabedoria do Coração</h3>
            <p class="mb-4 text-gray-400">O Ar é o sopro da vida que nos une a todos, o reino do amor, da compaixão e do equilíbrio. Este Pilar reside no seu centro cardíaco, Anahata, onde o 'eu' e o 'outro' se encontram. Respirar conscientemente é conectar-se com a teia da existência, perdoar, cultivar a gratidão e abrir-se para relacionamentos que nutrem a alma.</p>
            <p class="text-gray-400"><strong>Prática Essencial:</strong> Pranayanas (exercícios de respiração), meditação da compaixão (Metta Bhavana), atos de gentileza desinteressada.</p>`
    },
    som: { 
        title: "🎶 Pilar do Som", 
        chakra: "Vishuddha (Laríngeo)", 
        content: `
            <h3 class="text-xl font-bold font-cinzel text-[#c8a44d] mb-4">A Vibração da Verdade e a Expressão da Alma</h3>
            <p class="mb-4 text-gray-400">O Som é a força criadora do universo, a vibração que manifesta a realidade. Este Pilar governa a sua expressão autêntica, a sua capacidade de comunicar sua verdade interior com clareza e integridade. Ativar o Pilar do Som é encontrar sua voz, usar mantras para reprogramar sua realidade e ouvir atentamente os silêncios entre as palavras.</p>
            <p class="text-gray-400"><strong>Prática Essencial:</strong> Cantar ou entoar mantras, praticar a escuta ativa, falar sua verdade em situações onde normalmente ficaria em silêncio.</p>`
    },
    luz: { 
        title: "💡 Pilar da Luz", 
        chakra: "Ajna (Terceiro Olho)", 
        content: `
            <h3 class="text-xl font-bold font-cinzel text-[#c8a44d] mb-4">O Olho da Intuição e a Clareza da Percepção</h3>
            <p class="mb-4 text-gray-400">A Luz é a sabedoria que transcende a lógica, o reino da intuição, do discernimento e da visão interior. Este Pilar é o seu oráculo interno, a capacidade de ver além do véu das ilusões e perceber os padrões sutis do universo. Despertar a Luz é confiar na sua sabedoria inata, interpretar os sinais e símbolos e iluminar as sombras com a clareza da consciência.</p>
            <p class="text-gray-400"><strong>Prática Essencial:</strong> Meditação focada no terceiro olho, trabalho com sonhos, prestar atenção a sincronicidades.</p>`
    },
    mente: { 
        title: "🌌 Pilar da Mente", 
        chakra: "Sahasrara (Coronário)", 
        content: `
            <h3 class="text-xl font-bold font-cinzel text-[#c8a44d] mb-4">A Consciência Cósmica e a União com a Fonte</h3>
            <p class="mb-4 text-gray-400">A Mente, ou Consciência Pura, é a ponte entre o finito e o infinito, o ponto de união com a Fonte universal. Este Pilar transcende o ego e o intelecto, abrindo-nos para a experiência da unidade, da transcendência e do propósito maior. Cultivar este pilar é silenciar o ruído mental para ouvir a sabedoria cósmica e reconhecer a centelha divina em todas as coisas.</p>
            <p class="text-gray-400"><strong>Prática Essencial:</strong> Meditação silenciosa, contemplação da natureza, estudo de filosofias espirituais.</p>`
    }
};
const astrologyData = [
    { year: "2024-2026", title: "Transformação e Fundações", icon: "fas fa-sync-alt", description: "Plutão em Aquário desafia sua identidade (Asc) e segurança (Lua), pedindo uma reestruturação profunda de quem você é e do que você valoriza. É tempo de soltar velhas estruturas e abraçar a autenticidade." },
    { year: "2025", title: "Expansão da Criatividade", icon: "fas fa-palette", description: "Júpiter em Leão traz uma grande oportunidade para expandir sua autoexpressão, criatividade e alegria. É um período para brilhar, se arriscar em projetos apaixonados e se conectar com sua criança interior." },
    { year: "2026-2028", title: "Disciplina e Novos Inícios", icon: "fas fa-fire", description: "Saturno em Áries testará sua coragem e iniciativa. Será um tempo para construir novas estruturas com disciplina e ação focada, solidificando sua nova identidade. O esforço agora define a base para o futuro." },
    { year: "Contínuo", title: "Navegando a Sensibilidade", icon: "fas fa-water", description: "Com Netuno em Peixes e Júpiter natal, sua jornada é marcada por uma profunda sensibilidade e intuição. O desafio é usar essa conexão como uma força, sem se perder em ilusões. O aterramento é crucial." }
];
const seasonalHerbData = {
    'Primavera': [
        { name: 'Lavanda', image: 'https://placehold.co/100x100/9370DB/FFFFFF?text=Lavanda', description: 'Para calma e clareza na renovação. Ideal para rituais de novos começos e equilíbrio emocional.' },
        { name: 'Manjericão', image: 'https://placehold.co/100x100/2E8B57/FFFFFF?text=Manjericão', description: 'Atrai a prosperidade da nova estação. Use em banhos ou como amuleto para atrair sorte e sucesso.' },
        { name: 'Alecrim', image: 'https://placehold.co/100x100/556B2F/FFFFFF?text=Alecrim', description: 'Purifica e energiza para o crescimento. Queime para clareza mental ou use em chás para vitalidade.' }
    ],
    'Verão': [
        { name: 'Rosa', image: 'https://placehold.co/100x100/FF69B4/FFFFFF?text=Rosa', description: 'Abre o coração para o amor e a alegria. Use em banhos de amor-próprio ou para harmonizar relações.' },
        { name: 'Canela', image: 'https://placehold.co/100x100/D2691E/FFFFFF?text=Canela', description: 'Acelera o sucesso e atrai a paixão. Perfeita para feitiços de prosperidade rápida e para aumentar a energia vital.' },
        { name: 'Hortelã-pimenta', image: 'https://placehold.co/100x100/3CB371/FFFFFF?text=Hortelã', description: 'Traz clareza e energia para a ação. Beba como chá para foco ou use em rituais de despertar.' }
    ],
    'Outono': [
        { name: 'Sálvia Branca', image: 'https://placehold.co/100x100/CAD3C8/000000?text=Sálvia', description: 'Limpeza profunda para a colheita. Ideal para banir energias e preparar o espírito para a introspecção.' },
        { name: 'Arruda', image: 'https://placehold.co/100x100/006400/FFFFFF?text=Arruda', description: 'Proteção forte contra negatividade. Carregue como amuleto ou coloque em portas e janelas.' },
        { name: 'Louro', image: 'https://placehold.co/100x100/808000/FFFFFF?text=Louro', description: 'Atrai sucesso e clareza nas visões. Queime folhas para ter vislumbres proféticos ou use em amuletos de vitória.' }
    ],
    'Inverno': [
        { name: 'Mirra', image: 'https://placehold.co/100x100/B8860B/FFFFFF?text=Mirra', description: 'Conexão com o sagrado e cura interior. Use como incenso para meditações profundas e rituais de cura.' },
        { name: 'Olíbano', image: 'https://placehold.co/100x100/DEB887/000000?text=Olíbano', description: 'Elevação espiritual e purificação. Queime para consagrar espaços ou para se conectar com guias espirituais.' },
        { name: 'Gengibre', image: 'https://placehold.co/100x100/F4A460/000000?text=Gengibre', description: 'Aquece o corpo e a alma. Beba como chá para fortalecer a energia interna e a resistência.' }
    ]
};
const crystalData = {
    'Cristais de Aterramento e Proteção': [
        { name: 'Turmalina Negra', image: 'https://placehold.co/100x100/000000/FFFFFF?text=Turmalina', description: 'O escudo impenetrável. Repele e transmuta energias negativas, criando um campo de força protetor.' },
        { name: 'Hematita', image: 'https://placehold.co/100x100/A9A9A9/FFFFFF?text=Hematita', description: 'A âncora da alma. Aterra a energia no corpo físico, promove foco, coragem e fortalece a vontade.' },
        { name: 'Obsidiana Negra', image: 'https://placehold.co/100x100/1C1C1C/FFFFFF?text=Obsidiana', description: 'O espelho da verdade. Revela o que está oculto, corta laços energéticos e limpa o subconsciente.' },
    ],
    'Cristais de Cura e Elevação': [
         { name: 'Quartzo Rosa', image: 'https://placehold.co/100x100/FFC0CB/000000?text=Quartzo+Rosa', description: 'O bálsamo do coração. Vibra amor incondicional, cura feridas emocionais e promove paz e compaixão.' },
         { name: 'Ametista', image: 'https://placehold.co/100x100/8A2BE2/FFFFFF?text=Ametista', description: 'A transmutadora violeta. Eleva a vibração, acalma a mente, transmuta energia e abre portais para a espiritualidade.' },
         { name: 'Quartzo Verde', image: 'https://placehold.co/100x100/2E8B57/FFFFFF?text=Quartzo+Verde', description: 'O curador do corpo e da alma. Traz equilíbrio, saúde e bem-estar, alinhando o corpo físico e emocional.' },
    ]
};
const chakraData = [
    { name: "Muladhara", translation: "Chakra Raiz", color: "bg-red-700", description: "Sua fundação, sua conexão com a Terra. Governa a sobrevivência, segurança e estabilidade. Um Muladhara forte te aterra na realidade e te dá a base para crescer." },
    { name: "Svadhisthana", translation: "Chakra Sacral", color: "bg-orange-600", description: "O centro do fluxo, da criatividade e das emoções. Governa o prazer, a paixão e a capacidade de se adaptar. Um Svadhisthana fluido permite que a vida flua através de você." },
    { name: "Manipura", translation: "Chakra do Plexo Solar", color: "bg-yellow-500", description: "Sua forja interior, o centro do poder pessoal e da vontade. Governa a autoestima, a disciplina e a ação. Um Manipura aceso transforma intenção em realidade." },
    { name: "Anahata", translation: "Chakra Cardíaco", color: "bg-green-600", description: "A ponte entre o material e o espiritual. Governa o amor, a compaixão e a conexão. Um Anahata aberto te permite dar e receber amor incondicionalmente." },
    { name: "Vishuddha", translation: "Chakra Laríngeo", color: "bg-blue-500", description: "O centro da expressão e da verdade. Governa a comunicação e a autenticidade. Um Vishuddha claro te permite expressar sua alma e manifestar sua verdade." },
    { name: "Ajna", translation: "Chakra do Terceiro Olho", color: "bg-indigo-600", description: "O portal da intuição e da sabedoria. Governa a percepção, a clareza e a visão além do véu. Um Ajna desperto te guia com a sabedoria do universo." },
    { name: "Sahasrara", translation: "Chakra Coronário", color: "bg-purple-700", description: "Sua conexão com o Divino, a Fonte. Governa a transcendência e a consciência cósmica. Um Sahasrara aberto revela a unidade de todas as coisas." }
];
const pranayamaData = [
    { 
        name: "Nadi Shodhana", 
        translation: "Respiração das Narinas Alternadas",
        image: "https://placehold.co/150x150/4a4a4a/a37e2c?text=Equilíbrio",
        purpose: "Para harmonizar os hemisférios cerebrais, acalmar o sistema nervoso e equilibrar as energias masculina (Pingala) e feminina (Ida) dentro de você.",
        steps: [
            "Sente-se confortavelmente com a coluna ereta.",
            "Use o polegar direito para fechar a narina direita. Inspire lenta e profundamente pela narina esquerda.",
            "Feche a narina esquerda com o dedo anelar direito, libere o polegar e expire completamente pela narina direita.",
            "Inspire pela narina direita.",
            "Feche a narina direita com o polegar, libere o anelar e expire pela narina esquerda. Este é um ciclo. Continue por 3-5 minutos."
        ]
    },
    { 
        name: "Ujjayi Pranayama", 
        translation: "Respiração Vitoriosa ou do Oceano",
        image: "https://placehold.co/150x150/4a4a4a/a37e2c?text=Poder",
        purpose: "Para aquecer o corpo, aumentar o foco e a concentração, e criar um ritmo meditativo que ancora a mente no presente. O som do oceano interior.",
        steps: [
            "Sente-se ou fique em uma postura confortável.",
            "Contraia suavemente a parte de trás da sua garganta (glote), como se estivesse sussurrando.",
            "Inspire e expire pelo nariz, mantendo a contração. A respiração produzirá um som suave, sibilante, como as ondas do mar.",
            "Mantenha a inspiração e a expiração com a mesma duração. Pratique por 2-3 minutos, aumentando gradualmente."
        ]
    },
    { 
        name: "Bhastrika", 
        translation: "Respiração do Fole",
        image: "https://placehold.co/150x150/4a4a4a/a37e2c?text=Energia",
        purpose: "Para energizar o corpo e a mente, aumentar a vitalidade e transmutar a inércia. É uma explosão de Prana que purifica e desperta o fogo interior.",
        steps: [
            "Sente-se com a coluna ereta.",
            "Inspire e expire de forma forçada e rápida pelo nariz. A inspiração e a expiração devem ser ativas e ter a mesma duração.",
            "Mantenha a boca fechada. O movimento deve vir do seu diafragма.",
            "Faça um ciclo de 10 respirações, depois respire normalmente. Comece com um ciclo e aumente para 3 ciclos, com pausas entre eles. (Cuidado: pode causar tontura inicialmente)."
        ]
    },
    { 
        name: "Sama Vritti", 
        translation: "Respiração Quadrada",
        image: "https://placehold.co/150x150/4a4a4a/a37e2c?text=Calma",
        purpose: "Para acalmar a mente, reduzir a ansiedade e criar um estado de equilíbrio e estabilidade. É uma âncora de serenidade em meio ao caos.",
        steps: [
            "Sente-se ou deite-se confortavelmente.",
            "Expire todo o ar dos pulmões.",
            "Inspire contando até 4.",
            "Segure o ar, contando até 4.",
            "Expire contando até 4.",
            "Segure sem ar, contando até 4. Este é um ciclo. Continue por 3-5 minutos, mantendo o ritmo suave e sem esforço."
        ]
    }
];
const jornadaFlorescerData = [
    {
        title: "Etapa 1: Despertar da Consciência (Iniciação)",
        color: "Verde Esmeralda",
        content: `
            <p><strong>Cor Principal:</strong> Verde Esmeralda</p>
            <p><strong>Chakra:</strong> Muladhara (Raiz) & Ajna (Frontal)</p>
            <p><strong>Pilar:</strong> Pilar da Terra - Corpo & Pilar da Luz (Início)</p>
            <p><strong>Mitologia:</strong> Perseu e Medusa - Coragem para olhar a "fera" interior.</p>
            <p><strong>PNL:</strong> Auto-Observação e criação de âncoras vibracionais de presença e clareza.</p>
            <p><strong>AÇÃO:</strong> Prática diária de diário, visualização e ancoragem.</p>
            <p><strong>Elementos Sensoriais:</strong> Sálvia (purificação), Olíbano (conexão espiritual), Chá de Hortelã-pimenta (clareza mental).</p>
        `
    },
    {
        title: "Etapa 2: Semeando com Propósito",
        color: "Amarelo Dourado",
        content: `
            <p><strong>Cor Principal:</strong> Amarelo Dourado</p>
            <p><strong>Chakra:</strong> Svadhisthana (Sacral) & Anahata (Cardíaco)</p>
            <p><strong>Pilar:</strong> Pilar da Água - Emoções & Pilar do Ar (Início)</p>
            <p><strong>Mitologia:</strong> 12 trabalhos de Hércules - Determinação na jornada.</p>
            <p><strong>PNL:</strong> Metas S.M.A.R.T. alinhadas com o "Florescer", visualização criativa.</p>
            <p><strong>AÇÃO:</strong> Criar um Mural dos Deuses Vibracional (quadro visual) e consagrá-lo.</p>
            <p><strong>Elementos Sensoriais:</strong> Louro (sucesso), Sândalo (foco), Chá de Gengibre com Limão (energia e clareza).</p>
        `
    },
    {
        title: "Etapa 3: Transformação Resiliente",
        color: "Vermelho Fogo",
        content: `
            <p><strong>Cor Principal:</strong> Vermelho Fogo</p>
            <p><strong>Chakra:</strong> Manipura (Plexo Solar)</p>
            <p><strong>Pilar:</strong> Pilar do Fogo - Energia/Ação</p>
            <p><strong>Mitologia:</strong> Teseu e Minotauro - Navegar o labirinto interior e domar a sombra.</p>
            <p><strong>PNL:</strong> Reestruturação Cognitiva, técnica do Swish para substituir imagens limitantes.</p>
            <p><strong>AÇÃO:</strong> Criar um plano de ação detalhado para superar bloqueios.</p>
            <p><strong>Elementos Sensoriais:</strong> Alecrim (coragem), Mirra (proteção), Chá de Canela com Pimenta (vitalidade).</p>
        `
    },
     {
        title: "Etapa 4: Colheita Consciente",
        color: "Rosa Quente",
        content: `
            <p><strong>Cor Principal:</strong> Rosa Quente</p>
            <p><strong>Chakra:</strong> Anahata (Coração)</p>
            <p><strong>Pilar:</strong> Pilar do Ar - Respiração/Relacionamentos</p>
            <p><strong>Mitologia:</strong> Retorno da Era de Ouro - Harmonia interior alcançada.</p>
            <p><strong>PNL:</strong> Análise de resultados, celebração do esforço e compromisso contínuo.</p>
            <p><strong>AÇÃO:</strong> Ritual Diário com foco em gratidão, contentamento e visualização da abundância.</p>
            <p><strong>Elementos Sensoriais:</strong> Manjericão (alegria), Benjoim (abundância), Chá de Camomila (calma).</p>
        `
    },
     {
        title: "Etapa 5: Irradiando o Legado",
        color: "Azul Royal",
        content: `
            <p><strong>Cor Principal:</strong> Azul Royal</p>
            <p><strong>Chakra:</strong> Vishuddha (Garganta)</p>
            <p><strong>Pilar:</strong> Pilar do Som - Comunicação/Expressão</p>
            <p><strong>Mitologia:</strong> O Legado de Prometeu - Compartilhar a "chama" do conhecimento.</p>
            <p><strong>PNL:</strong> Mentoria, definição de novas metas que expandam o legado.</p>
            <p><strong>AÇÃO:</strong> Compartilhar a Jornada, semear inspiração.</p>
            <p><strong>Elementos Sensoriais:</strong> Hortelã (clareza para comunicar), Sândalo (conexão ancestral), Chá de Jasmim (otimismo).</p>
        `
    },
    {
        title: "Etapa 6: Introspecção Curativa",
        color: "Roxo/Violeta",
        content: `
            <p><strong>Cor Principal:</strong> Roxo/Violeta</p>
            <p><strong>Chakra:</strong> Ajna (Frontal)</p>
            <p><strong>Pilar:</strong> Pilar da Luz - Intuição/Visão</p>
            <p><strong>Mitologia:</strong> Jornada de ressignificar desafios, como Anúbis (ressignificação).</p>
            <p><strong>PNL:</strong> Identificação de Padrões Limitantes, Reenquadramento Transformador.</p>
            <p><strong>AÇÃO:</strong> Plano de Ação Estratégico e Terapêutico focado em cura emocional.</p>
            <p><strong>Elementos Sensoriais:</strong> Lavanda (relaxamento), Sândalo e Mirra (introspecção), Chá de Jasmim (sono reparador).</p>
        `
    },
    {
        title: "Etapa 7: União Transcendental",
        color: "Branco/Dourado Luminoso",
        content: `
            <p><strong>Cor Principal:</strong> Branco/Dourado Luminoso</p>
            <p><strong>Chakra:</strong> Sahasrara (Coroa)</p>
            <p><strong>Pilar:</strong> Pilar da Mente - Consciência Pura</p>
            <p><strong>Mitologia:</strong> Encontro de Shiva e Shakti - União consciência/energia.</p>
            <p><strong>PNL:</strong> Estado de Flow Contínuo, Mindfulness Absoluto, Entrega e Confiança Divina.</p>
            <p><strong>AÇÃO:</strong> Prática Contemplativa Diária (Bhakti Yoga, Meditação da União).</p>
            <p><strong>Elementos Sensoriais:</strong> Lótus Branco (pureza), Âmbar Branco (elevação), Chá Branco e Água de Rosas (amor divino).</p>
        `
    }
];

// --- STATE & DOM ELEMENTS ---
let app, db, auth, userId, ai;

const errorModal = document.getElementById('error-modal');
const modalMessage = document.getElementById('modal-message');
const modalTitle = document.getElementById('modal-title');

// --- CORE FUNCTIONS ---
function showDiagnosticModal(title, checklist) {
    modalTitle.innerHTML = `<i class="fas fa-exclamation-triangle mr-3"></i><span>${title}</span>`;
    modalMessage.innerHTML = checklist;
    errorModal.classList.remove('hidden');
}

function hideModal() { errorModal.classList.add('hidden'); }

// --- RENDER FUNCTIONS ---
function renderPillarCards() {
    const grid = document.getElementById('pillar-grid');
    grid.innerHTML = Object.keys(pillarData).map(key => {
        const p = pillarData[key];
        return `<div class="pillar-card rounded-lg p-4 text-center" data-pillar="${key}"><div class="text-3xl mb-2">${p.title.split(' ')[0]}</div><h3 class="font-cinzel font-bold">${p.title.split(' ').slice(2).join(' ')}</h3><p class="text-xs text-gray-400">${p.chakra}</p></div>`;
    }).join('');
}

function createGrimoireCard(doc) {
    const data = doc.data();
    const card = document.createElement('div');
    card.className = 'card rounded-lg p-4';
    const tagsHtml = (data.tags && Array.isArray(data.tags)) ? data.tags.map(tag => `<span class="text-xs bg-[#444] text-[#a37e2c] font-semibold px-2 py-1 rounded">${tag}</span>`).join(' ') : `<span class="text-xs bg-[#444] text-[#a37e2c] font-semibold px-2 py-1 rounded">${data.tags || 'Sem Selo'}</span>`;
    card.innerHTML = `<div class="flex justify-between items-start"><div><h4 class="text-lg font-bold font-cinzel text-[#c8a44d]">${data.title}</h4><p class="text-sm text-gray-400 whitespace-pre-wrap my-2">${data.content}</p><div class="flex flex-wrap gap-2">${tagsHtml}</div></div><button class="delete-btn text-red-500 hover:text-red-700" data-id="${doc.id}"><i class="fas fa-times"></i></button></div>`;
    return card;
}

function renderAstrologyTimeline() {
    const container = document.getElementById('timeline-container');
    container.innerHTML = `<div class="timeline absolute h-full"></div>` + astrologyData.map(item => `<div class="timeline-item relative mb-8 pl-8"><div class="flex items-center mb-1"><div class="bg-[#a37e2c] text-[#1a1a1a] rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold ring-4 ring-[#1a1a1a] z-10"><i class="${item.icon}"></i></div><div class="flex-1 ml-4"><h4 class="font-cinzel font-bold">${item.title} (${item.year})</h4></div></div><div class="ml-4"><p class="text-sm text-gray-400">${item.description}</p></div></div>`).join('');
}

function renderSeasonalHerbs() {
    const container = document.getElementById('herbs-list');
    const month = new Date().getMonth();
    let season;
    if ([8, 9, 10].includes(month)) season = 'Primavera'; // Set-Nov
    else if ([11, 0, 1].includes(month)) season = 'Verão'; // Dez-Fev
    else if ([2, 3, 4].includes(month)) season = 'Outono'; // Mar-Mai
    else season = 'Inverno'; // Jun-Ago

    const herbs = seasonalHerbData[season];
    const createInfoCard = (item) => `<div class="card p-4 flex gap-4 items-center no-hover"><img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-md object-cover border-2 border-[#444]"><div class="flex-1"><h4 class="font-bold text-[#c8a44d]">${item.name}</h4><p class="text-xs text-gray-400">${item.description}</p></div></div>`;
    
    container.innerHTML = `<div class="mb-6"><h3 class="text-lg font-bold font-cinzel text-[#c8a44d] mb-4">Sabedoria do ${season}</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4">${herbs.map(createInfoCard).join('')}</div></div>`;
}

function renderCrystalList() {
    const container = document.getElementById('crystals-list');
    const createInfoCard = (item) => `<div class="card p-4 flex gap-4 items-center no-hover"><img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-md object-cover border-2 border-[#444]"><div class="flex-1"><h4 class="font-bold text-[#c8a44d]">${item.name}</h4><p class="text-xs text-gray-400">${item.description}</p></div></div>`;
    container.innerHTML = Object.entries(crystalData).map(([category, items]) => `<div class="mb-6"><h3 class="text-lg font-bold font-cinzel text-[#c8a44d] mb-4">${category}</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4">${items.map(createInfoCard).join('')}</div></div>`).join('');
}

function renderChakras() {
    const container = document.getElementById('chakra-list');
    container.innerHTML = chakraData.map(chakra => `
        <div class="card p-4 flex flex-col items-center text-center no-hover">
            <div class="w-12 h-12 rounded-full ${chakra.color} mb-3 flex items-center justify-center font-bold text-white shadow-lg"></div>
            <h4 class="font-bold font-cinzel text-[#c8a44d]">${chakra.name}</h4>
            <p class="text-sm text-gray-400 mb-2">(${chakra.translation})</p>
            <p class="text-xs text-gray-400">${chakra.description}</p>
        </div>
    `).join('');
}

function renderPranayamas() {
    const container = document.getElementById('pranayama-list');
    container.innerHTML = pranayamaData.map(pranayama => `
        <div class="card p-6 no-hover">
            <div class="flex flex-col md:flex-row gap-6 items-center">
                <img src="${pranayama.image}" alt="${pranayama.name}" class="w-24 h-24 md:w-36 md:h-36 rounded-full object-cover border-4 border-[#444]">
                <div class="flex-1 text-center md:text-left">
                    <h3 class="text-xl font-bold font-cinzel text-[#c8a44d]">${pranayama.name}</h3>
                    <p class="text-sm text-gray-400 mb-3 italic">(${pranayama.translation})</p>
                    <p class="text-sm text-gray-300 mb-4">${pranayama.purpose}</p>
                </div>
            </div>
            <div class="mt-4 border-t border-[#444] pt-4">
                <h4 class="font-semibold mb-2">Como Praticar:</h4>
                <ol class="list-decimal list-inside space-y-2 text-sm text-gray-400">
                    ${pranayama.steps.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>
        </div>
    `).join('');
}

function renderJornadaFlorescer() {
    const container = document.getElementById('jornada-container');
    const colorMap = {
        "Verde Esmeralda": "border-emerald-500",
        "Amarelo Dourado": "border-yellow-500",
        "Vermelho Fogo": "border-red-500",
        "Rosa Quente": "border-pink-500",
        "Azul Royal": "border-blue-500",
        "Roxo/Violeta": "border-purple-500",
        "Branco/Dourado Luminoso": "border-amber-300"
    };
    container.innerHTML = jornadaFlorescerData.map(etapa => `
        <div class="border-l-4 ${colorMap[etapa.color] || 'border-gray-500'}">
            <div class="accordion-header flex justify-between items-center p-4 bg-[#1f1f1f] rounded-r-lg">
                <h3 class="font-semibold font-cinzel text-lg text-${(colorMap[etapa.color] || '').split('-')[1]}-400">${etapa.title}</h3>
                <i class="fas fa-chevron-down text-xs"></i>
            </div>
            <div class="accordion-content bg-[#1f1f1f] px-4 pb-4 rounded-b-lg text-sm text-gray-400 space-y-2">
                ${etapa.content}
            </div>
        </div>
    `).join('');

    container.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling as HTMLElement;
            const icon = header.querySelector('i');
            document.querySelectorAll('.accordion-content').forEach(c => {
                if (c !== content) {
                    (c as HTMLElement).style.maxHeight = null;
                    c.previousElementSibling.querySelector('i').classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
            });
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            }
        });
    });
}

function showPillarDetails(pillarId) {
    const data = pillarData[pillarId];
    if (!data) return;
    const contentDiv = document.getElementById('pillar-content');
    contentDiv.innerHTML = `<h2 class="text-2xl font-bold font-cinzel text-center text-[#c8a44d] mb-6">${data.title}</h2><div class="text-left">${data.content}</div>`;
    
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.getElementById('pillar-detail-section').classList.add('active');
}

// --- FIRESTORE FUNCTIONS ---
const getCollectionRef = (collectionName) => collection(db, `users/${userId}/${collectionName}`);

async function handleAddItem(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const tagsValue = formData.get('tags');
    const tags = typeof tagsValue === 'string' ? tagsValue.split(',').map(t => t.trim()).filter(Boolean) : [];
    const data = { 
        title: formData.get('title'),
        content: formData.get('content'),
        tags: tags,
        createdAt: serverTimestamp() 
    };

    try { 
        await addDoc(getCollectionRef('grimoire_entries'), data); 
        form.reset(); 
        const accordionContent = form.closest('.accordion-content') as HTMLElement | null;
        if (accordionContent) accordionContent.style.maxHeight = null;
    }
    catch (error) { showDiagnosticModal("Falha ao Salvar", "Ocorreu um erro ao salvar sua inscrição. Verifique sua conexão e tente novamente."); }
}

async function handleDeleteItem(event: MouseEvent) {
    const button = (event.target as HTMLElement).closest('.delete-btn') as HTMLElement | null;
    if (!button) return;
    if (confirm("Tem certeza que deseja apagar esta inscrição do seu Tomo?")) {
        try { await deleteDoc(doc(db, `users/${userId}/grimoire_entries/${button.dataset.id}`)); }
        catch (error) { showDiagnosticModal("Falha ao Apagar", "Não foi possível apagar a inscrição. Verifique sua conexão e tente novamente."); }
    }
}

function setupCollectionListener(collectionName, listId, cardFn) {
    const q = query(getCollectionRef(collectionName), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
        const listEl = document.getElementById(listId);
        listEl.innerHTML = '';
        if (snapshot.empty) { listEl.innerHTML = '<p class="text-center text-gray-500">Seu tomo ainda aguarda as primeiras palavras.</p>'; return; }
        snapshot.forEach(doc => listEl.appendChild(cardFn(doc)));
    }, error => {
        console.error("Firestore Snapshot Error:", error);
        const checklist = `
            <p>A aplicação não conseguiu se conectar ao seu santuário de dados. Por favor, verifique os seguintes pontos no seu Console do Firebase:</p>
            <ul class="list-disc list-inside mt-2 space-y-1">
                <li><strong>Cloud Firestore Ativado:</strong> Verifique se você criou um banco de dados Cloud Firestore no seu projeto.</li>
                <li><strong>Regras de Segurança:</strong> Suas regras de segurança podem estar bloqueando o acesso. Para testar, você pode usar regras que permitem leitura/escrita para usuários autenticados:
                <code class="text-xs bg-[#1f1f1f] p-1 rounded block mt-1">service cloud.firestore { match /databases/{database}/documents { match /users/{userId}/{allPaths=**} { allow read, write: if request.auth != null && request.auth.uid == userId; } } }</code></li>
            </ul>
        `;
        showDiagnosticModal("Falha na Conexão com o Santuário de Dados", checklist);
    });
}

// --- GEMINI AI FUNCTIONS ---
function getAiClient() {
    if (!ai) {
        if (!process.env.API_KEY) {
            throw new Error("A chave da API Gemini não foi encontrada. Configure-a no ambiente.");
        }
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
}

async function callGeminiApi(prompt) {
    try {
        const aiClient = getAiClient();
        const response = await aiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ parts: [{ text: prompt }] }],
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API call failed:", error);
        if (error.message.includes("API key")) {
             throw new Error("Sua chave da API Gemini não é válida ou não foi configurada no ambiente.");
        }
        throw new Error("A conexão com a sabedoria cósmica falhou.");
    }
}

async function handleOracleQuery() {
    const btn = document.getElementById('oracle-btn') as HTMLButtonElement;
    const btnText = document.getElementById('oracle-btn-text');
    const spinner = document.getElementById('oracle-spinner');
    const resultDiv = document.getElementById('oracle-result');

    btn.disabled = true;
    btnText.textContent = 'Consultando...';
    spinner.classList.remove('hidden');
    resultDiv.innerHTML = '<p class="text-gray-500">O oráculo está se conectando com o cosmos...</p>';

    const dayName = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][new Date().getDay()];
    const prompt = `Aja como um oráculo pagão, sábio e poético para a aplicação "Rota Pagã". Hoje é ${dayName}. Com base nas correspondências energéticas deste dia e nos Sete Pilares da Ascensão (Terra, Água, Fogo, Ar, Som, Luz, Mente), gere uma mensagem inspiradora e engajadora. A resposta deve ser concisa e conter: 1. Uma Saudação Oracular. 2. Um Conselho Direto para o dia. 3. Um Foco Mágico: uma pequena ação ou reflexão ligada a um dos Pilares. Formate a resposta com os títulos em negrito (markdown **): **Saudação:**, **Conselho:** e **Foco Mágico:**.`;

    try {
        const generatedText = await callGeminiApi(prompt);
        const formattedText = generatedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        resultDiv.innerHTML = formattedText;
    } catch (error) {
        const errorMessage = error.message || 'O oráculo está em silêncio no momento. Tente novamente mais tarde.';
        resultDiv.innerHTML = `<p class="text-red-500">${errorMessage}</p>`;
        showDiagnosticModal("Oráculo Silencioso", errorMessage);
    } finally {
        btn.disabled = false;
        btnText.textContent = 'Consultar o Oráculo';
        spinner.classList.add('hidden');
    }
}

// --- EVENT LISTENERS ---
function setupEventListeners() {
    document.getElementById('close-modal-btn').addEventListener('click', hideModal);
    
    document.querySelectorAll('#main-nav .tab').forEach(tab => {
        tab.addEventListener('click', (e: MouseEvent) => {
            const currentTarget = e.currentTarget as HTMLElement;
            const sectionId = currentTarget.dataset.section;
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            document.getElementById(sectionId)?.classList.add('active');
            document.querySelectorAll('#main-nav .tab').forEach(t => t.classList.remove('active'));
            currentTarget.classList.add('active');
        });
    });

    document.getElementById('pillar-grid').addEventListener('click', (e: MouseEvent) => {
        const card = (e.target as Element).closest('.pillar-card') as HTMLElement | null;
        if(card) showPillarDetails(card.dataset.pillar);
    });

    document.querySelectorAll('.back-to-main').forEach(btn => {
        btn.addEventListener('click', () => {
             document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
             document.getElementById('main-section').classList.add('active');
             document.querySelectorAll('#main-nav .tab').forEach(t => t.classList.remove('active'));
             document.querySelector('#main-nav .tab[data-section="main-section"]').classList.add('active');
        });
    });
    
    document.getElementById('add-grimoire-form').addEventListener('submit', handleAddItem);
    document.getElementById('grimoire-list').addEventListener('click', handleDeleteItem);
    document.getElementById('oracle-btn').addEventListener('click', handleOracleQuery);

    document.querySelector('#tomo-de-poder-section .accordion-header').addEventListener('click', (e: MouseEvent) => {
        const header = e.currentTarget as HTMLElement;
        const content = header.nextElementSibling as HTMLElement | null;
        const icon = header.querySelector('i');
        if (!content || !icon) return;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
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
                document.getElementById('loading-message').classList.add('hidden');
                document.getElementById('app-container').classList.remove('hidden');
                document.getElementById('user-id-display').innerText = `Guardião da Centelha: ${userId.substring(0, 8)}...`;
                
                setupCollectionListener('grimoire_entries', 'grimoire-list', createGrimoireCard);
                
                renderPillarCards();
                renderAstrologyTimeline();
                renderSeasonalHerbs();
                renderCrystalList();
                renderChakras();
                renderPranayamas();
                renderJornadaFlorescer();
                setupEventListeners();
                
            } else {
                signInAnonymously(auth).catch(err => {
                    console.error("Auth Error", err);
                     const checklist = `
                        <p>A autenticação anônima falhou. Isso geralmente acontece por uma configuração no seu Console do Firebase. Verifique:</p>
                        <ul class="list-disc list-inside mt-2 space-y-1">
                            <li><strong>Autenticação Anônima Ativada:</strong> Vá para a seção 'Authentication' -> 'Sign-in method' e garanta que 'Anônimo' está ativado.</li>
                            <li><strong>Domínios Autorizados:</strong> Na mesma seção, em 'Settings', verifique se o domínio onde você está testando a aplicação está na lista de domínios autorizados.</li>
                        </ul>
                    `;
                    showDiagnosticModal("Falha na Autenticação", checklist);
                });
            }
        });
    } catch (error) {
        console.error("Initialization Error:", error);
        const errorMessage = error.message.includes("API key") 
            ? "A chave da API Gemini não foi encontrada. Verifique a configuração do seu ambiente."
            : "Ocorreu um erro crítico na inicialização. Verifique o console para mais detalhes.";
        document.getElementById('loading-message').innerHTML = `<p class="text-red-500 font-semibold text-center">${errorMessage}</p>`;
        showDiagnosticModal("Erro Crítico de Inicialização", errorMessage);
    }
}

document.addEventListener('DOMContentLoaded', initApp);