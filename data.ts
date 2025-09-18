// --- CONFIG & DATA ---

// --- CONFIG & DATA ---

export const seasonalHerbData = {
    intro: "Bem-vindo ao Herbário da Floresta Sazonal, um portal para a sabedoria viva da flora brasileira. Nossos ancestrais viviam em profunda sintonia com os ritmos da Terra, mas a dança da vida é regida por um parceiro ainda maior: o Sol. Nossa estrela-mãe pulsa em um grande ciclo de aproximadamente 11 anos, entre um Máximo Solar (energia de expansão) e um Mínimo Solar (energia de introspecção). Atualmente, estamos no Máximo Solar do Ciclo 25 (2024-2025), um longo 'verão cósmico' ideal para rituais de crescimento. O próximo Mínimo Solar é previsto para ~2030-2032. Alinhar nossa prática herbal com as estações da Terra e do Sol é a mais pura forma de magia.",
    'Primavera': [
        { 
            name: 'Alecrim', 
            scientificName: 'Salvia rosmarinus',
            image: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Rosmarinus_officinalis_-_Köhler–s_Medizinal-Pflanzen-258.jpg',
            planet: 'Sol',
            element: 'Fogo',
            deities: 'Apolo, Hélios',
            content: {
                almaDaErva: "Erva solar, regida pelo Fogo e associada à lembrança e à clareza. Seu nome, 'rosmarinus', significa 'orvalho do mar'. Usada para purificação, coragem, e para trazer alegria. Sua fumaça limpa o ambiente e a mente para a inspiração, fortalecendo a memória e o foco.",
                farmaciaDaFloresta: `<ul class="list-disc list-inside space-y-2"><li><strong>Chá de Alecrim (O Despertar da Mente):</strong> Uma infusão pela manhã é um ritual para aguçar o foco e a memória.</li><li><strong>Banho de Coragem:</strong> Macere alecrim fresco em água morna para um banho revigorante antes de desafios.</li><li><strong>Defumação:</strong> Queime um ramo seco para purificar um espaço e consagrar ferramentas mágicas.</li></ul>`,
                insightsDoBemViver: "O alecrim é um pilar na dieta mediterrânea (Zona Azul). Seus compostos, como o ácido carnósico, têm efeitos neuroprotetores, combatendo a inflamação e apoiando a saúde cerebral, o que valida cientificamente seu uso tradicional para a memória."
            }
        },
        {
            name: 'Lavanda',
            scientificName: 'Lavandula angustifolia',
            image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Lavandula_angustifolia_-_Köhler–s_Medizinal-Pflanzen-085.jpg',
            planet: 'Mercúrio',
            element: 'Ar',
            deities: 'Hermes, Mercúrio',
            content: {
                almaDaErva: "Erva de Mercúrio e do Ar, a grande pacificadora do reino vegetal. Sua energia acalma a mente, equilibra as emoções e abre o Chakra Frontal (Ajna) para a intuição. É a fragrância da clareza, da paz interior e da comunicação gentil, sendo também usada em feitiços de amor e amizade.",
                farmaciaDaFloresta: `<ul class="list-disc list-inside space-y-2"><li><strong>Sachê para Sonhos:</strong> Coloque flores secas sob o travesseiro para um sono reparador e sonhos lúcidos.</li><li><strong>Banho Calmante:</strong> Adicione um punhado de flores a um banho morno para aliviar o estresse.</li><li><strong>Spray de Travesseiro:</strong> Misture óleo essencial de lavanda com água em um borrifador para um sono tranquilo.</li></ul>`,
                insightsDoBemViver: "O aroma da lavanda (especificamente o linalol) comprovadamente reduz os níveis de cortisol (hormônio do estresse) e ativa o sistema nervoso parassimpático, o modo 'descansar e digerir' do corpo, promovendo um relaxamento profundo."
            }
        },
        {
            name: 'Manjericão',
            scientificName: 'Ocimum basilicum',
            image: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Ocimum_basilicum_-_Köhler–s_Medizinal-Pflanzen-105.jpg',
            planet: 'Vênus',
            element: 'Fogo',
            deities: 'Vrinda Devi, Vênus, Afrodite',
            content: {
                almaDaErva: "Erva de Vênus com a energia do Fogo, sagrada na Índia como a deusa Tulsi. É uma ponte entre o amor, a proteção e a prosperidade. Seu aroma doce harmoniza ambientes, atrai clientes para um negócio e fortalece os laços afetivos. Possui uma dualidade interessante: enquanto atrai amor, também é usada para banir negatividade.",
                farmaciaDaFloresta: `<ul class="list-disc list-inside space-y-2"><li><strong>Amuleto de Prosperidade:</strong> Carregue folhas secas na carteira para atrair dinheiro.</li><li><strong>Banho de Harmonia:</strong> Use uma infusão de manjericão em um banho para acalmar os ânimos e promover a paz.</li><li><strong>Vaso Protetor:</strong> Plante manjericão na entrada de casa para proteger e trazer boa sorte ao lar.</li></ul>`,
                insightsDoBemViver: "O Manjericão Sagrado (Tulsi) é um poderoso adaptógeno, uma substância que ajuda o corpo a se adaptar ao estresse físico e mental. Ele nos ensina que a verdadeira prosperidade nasce de um sistema equilibrado e resiliente."
            }
        }
    ],
    'Verão': [
        {
            name: 'Rosa',
            scientificName: 'Rosa spp.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Rosa_gallica_officinalis_-_Köhler–s_Medizinal-Pflanzen-127.jpg/800px-Rosa_gallica_officinalis_-_Köhler–s_Medizinal-Pflanzen-127.jpg',
            planet: 'Vênus',
            element: 'Água',
            deities: 'Afrodite, Vênus, Ísis',
            content: {
                almaDaErva: "Erva de Vênus e da Água, símbolo supremo do amor incondicional. Suas pétalas em espiral representam o desdobrar dos mistérios do coração. Abre e cura o Chakra Cardíaco (Anahata), ensinando a beleza da vulnerabilidade, compaixão e amor-próprio.",
                farmaciaDaFloresta: `<ul class="list-disc list-inside space-y-2"><li><strong>Água de Rosas para o Amor-Próprio:</strong> Borrife em sua aura pela manhã como um ato de autocarinho.</li><li><strong>Banho de Atração:</strong> Combine pétalas de rosa com mel em um banho para atrair amor e beleza.</li><li><strong>Óleo de Unção:</strong> Infunda pétalas de rosa em óleo de amêndoas para consagrar o corpo ou ferramentas para rituais de amor.</li></ul>`,
                insightsDoBemViver: "A rosa nos ensina o equilíbrio entre a beleza e a proteção (os espinhos). Ela lembra que para amar plenamente, precisamos ter limites saudáveis. O simples ato de cheirar uma rosa pode diminuir a frequência cardíaca e a pressão arterial, um bálsamo instantâneo para o sistema nervoso."
            }
        },
        {
            name: 'Canela',
            scientificName: 'Cinnamomum zeylanicum',
            image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Cinnamomum_verum_-_Köhler–s_Medizinal-Pflanzen-187.jpg',
            planet: 'Sol',
            element: 'Fogo',
            deities: 'Afrodite, Lakshmi',
            content: {
                almaDaErva: "Especiaria do Sol e do Fogo, um catalisador de energia rápida e ardente. Historicamente mais valiosa que o ouro, sua energia está ligada à manifestação de prosperidade, sucesso e paixão. Seu aroma quente e picante aquece a alma, atrai boa sorte e acelera a ação de qualquer feitiço.",
                farmaciaDaFloresta: `<ul class="list-disc list-inside space-y-2"><li><strong>Pó de Prosperidade:</strong> No primeiro dia do mês, sopre canela em pó da porta para dentro de casa para atrair abundância.</li><li><strong>Feitiço Rápido de Dinheiro:</strong> Unte uma vela verde com óleo e canela em pó, mentalizando seus objetivos financeiros.</li><li><strong>Incenso para Paixão:</strong> Queimar um pau de canela ajuda a criar um ambiente de sedução e energia sexual.</li></ul>`,
                insightsDoBemViver: "A canela ajuda a regular os níveis de açúcar no sangue, prevenindo picos e quedas de energia. Isso nos ensina a gerenciar nossa própria energia física e vital (Prana) para uma manifestação mais estável e duradoura."
            }
        },
        {
            name: 'Hortelã-pimenta',
            scientificName: 'Mentha piperita',
            image: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Mentha_piperita_-_Köhler–s_Medizinal-Pflanzen-095.jpg',
            planet: 'Mercúrio',
            element: 'Ar',
            deities: 'Mercúrio, Hermes',
            content: {
                almaDaErva: "Erva de Mercúrio e do Ar, um tônico mental. Na mitologia grega, a ninfa Minthe foi transformada em hortelã. Sua energia refrescante remove bloqueios mentais, alivia a raiva, purifica e abre caminhos para a clareza de pensamento e comunicação.",
                farmaciaDaFloresta: `<ul class="list-disc list-inside space-y-2"><li><strong>Óleo para Foco:</strong> Uma gota de óleo essencial diluído nas têmporas ajuda a aliviar dores de cabeça e a melhorar a concentração.</li><li><strong>Spray de Limpeza:</strong> Misture chá de hortelã forte com água em um borrifador para limpar energeticamente seu espaço de trabalho.</li><li><strong>Chá para Cura:</strong> Uma infusão após as refeições ajuda na digestão e acalma o sistema nervoso.</li></ul>`,
                insightsDoBemViver: "A hortelã-pimenta nos ensina que a cura começa com a clareza. Ao ajudar na digestão física, ela nos lembra simbolicamente da importância de 'digerir' informações e emoções para manter uma mente e um espírito saudáveis."
            }
        }
    ],
    'Outono': [
        { 
            name: 'Arruda', 
            scientificName: 'Ruta graveolens',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Ruta_graveolens_-_Köhler–s_Medizinal-Pflanzen-129.jpg/800px-Ruta_graveolens_-_Köhler–s_Medizinal-Pflanzen-129.jpg',
            planet: 'Marte',
            element: 'Fogo',
            deities: 'Marte, Hécate',
            content: {
                almaDaErva: "Erva de Marte e do Fogo, a grande protetora. Famosa por 'quebrar demandas' e banir o mau-olhado, era um ingrediente chave no 'Vinagre dos Quatro Ladrões' durante a Peste. Sua energia é assertiva, purificadora e cria um escudo energético impenetrável.",
                farmaciaDaFloresta: `<ul class="list-disc list-inside space-y-2"><li><strong>Banho de Descarrego:</strong> Macere folhas frescas em água morna, coe e jogue do pescoço para baixo.</li><li><strong>Amuleto de Proteção:</strong> Carregue um pequeno galho em um saquinho de pano vermelho.</li><li><strong>Sal de Banimento:</strong> Misture sal grosso com folhas de arruda secas para purificar objetos e ambientes.</li><li><strong>Atenção:</strong> Erva tóxica se ingerida e pode causar irritação na pele. Use com extremo respeito.</li></ul>`,
                insightsDoBemViver: "A energia da Arruda nos ensina sobre a importância de estabelecer limites energéticos saudáveis e a praticar a 'higiene psíquica'. O ato de cuidar da planta, com respeito por sua toxicidade, fortalece nossa própria capacidade de dizer 'não' ao que nos faz mal."
            }
        },
        { 
            name: 'Guiné', 
            scientificName: 'Petiveria alliacea',
            image: 'https://live.staticflickr.com/65535/48252251317_2628404555_b.jpg',
            planet: 'Marte',
            element: 'Fogo',
            deities: 'Ogum',
            content: {
                almaDaErva: "Erva de alta vibração, ligada à força de Ogum, o Orixá guerreiro que abre caminhos. Sua energia é como a lâmina de um facão, cortando e desmanchando as mais densas larvas astrais e magias negativas. É uma força da natureza para limpezas pesadas.",
                farmaciaDaFloresta: `<ul class="list-disc list-inside space-y-2"><li><strong>Defumação de Banimento:</strong> Queimar suas folhas secas é um ritual poderoso para limpar um ambiente após conflitos ou doenças.</li><li><strong>Barreira Protetora:</strong> Plante guiné perto da entrada de sua casa para criar uma barreira espiritual.</li><li><strong>Atenção:</strong> Erva extremamente forte e tóxica. Não deve ser ingerida sob nenhuma circunstância e o contato com a pele deve ser cuidadoso.</li></ul>`,
                insightsDoBemViver: "A Guiné nos ensina a importância de 'limpar o terreno' antes de plantar novas intenções. Seu cheiro forte (semelhante ao alho) nos lembra que, às vezes, a proteção mais eficaz é ser claro e inequívoco sobre o que não permitimos em nosso espaço."
            }
        },
        {
            name: 'Sálvia Branca',
            scientificName: 'Salvia apiana',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Salvia_apiana_-_sagesmudge.jpg/800px-Salvia_apiana_-_sagesmudge.jpg',
            planet: 'Júpiter',
            element: 'Ar',
            deities: 'Júpiter, Zeus',
            content: {
                almaDaErva: "Erva de Júpiter e do Ar, sagrada para muitos povos nativos norte-americanos. Sua fumaça (smudge) não apenas limpa energias negativas, mas eleva a vibração, convidando a sabedoria, a clareza espiritual e os espíritos benévolos. Deve ser usada com o máximo respeito, honrando suas origens.",
                farmaciaDaFloresta: `<ul class="list-disc list-inside space-y-2"><li><strong>Smudging (Defumação):</strong> Queime um bastão de sálvia (de fonte ética e sustentável), movendo a fumaça com uma pena ou com a mão para limpar sua casa, seus cristais ou seu campo áurico.</li><li><strong>Spray de Limpeza Energética:</strong> Ferva as folhas em água e use o líquido (coado e resfriado) em um borrifador para locais onde a fumaça não é permitida.</li></ul>`,
                insightsDoBemViver: "O uso da Sálvia Branca nos conecta a uma linhagem ancestral de cura. A prática do smudging libera íons negativos, que pesquisas sugerem poder combater a depressão. É um convite para aprender sobre a sustentabilidade e honrar as tradições que nos presenteiam com esta ferramenta sagrada."
            }
        },
        {
            name: 'Louro',
            scientificName: 'Laurus nobilis',
            image: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Laurus_nobilis_-_Köhler–s_Medizinal-Pflanzen-086.jpg',
            planet: 'Sol',
            element: 'Fogo',
            deities: 'Apolo',
            content: {
                almaDaErva: "Erva do Sol e do Fogo. Coroando heróis e poetas na antiguidade, o Louro é a personificação da vitória, do reconhecimento e da profecia. A Pítia, oráculo de Delfos, mascava folhas de louro para induzir suas visões. Use para sucesso, inspiração e para fortalecer a intuição.",
                farmaciaDaFloresta: `<ul class="list-disc list-inside space-y-2"><li><strong>Feitiço de Desejo:</strong> Escreva um desejo em uma folha de louro e queime-a para enviar seu pedido ao universo.</li><li><strong>Banho de Vitória:</strong> Adicione folhas de louro a um banho quente antes de um evento importante (entrevista, prova) para atrair sucesso.</li><li><strong>Amuleto da Sorte:</strong> Carregue uma folha de louro na carteira para atrair boa sorte.</li></ul>`,
                insightsDoBemViver: "O Louro nos ensina a reconhecer e celebrar nossas próprias vitórias. Seu uso lento na culinária, liberando sabor ao longo do tempo, é uma metáfora para como o sucesso duradouro é infundido com paciência e consistência em nossos projetos."
            }
        },
        {
            name: 'Espinheira-Santa',
            scientificName: 'Maytenus ilicifolia',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Maytenus_ilicifolia_-_espinheira-santa.jpg/800px-Maytenus_ilicifolia_-_espinheira-santa.jpg',
            planet: 'Saturno',
            element: 'Terra',
            deities: 'Povos Indígenas, Curandeiros',
            content: {
                almaDaErva: "Planta nativa do sul do Brasil, seu nome revela sua magia: 'Espinheira' por sua aparência espinhosa que simboliza proteção, e 'Santa' por seu imenso poder de cura. É um amuleto verde, uma guardiã que ensina que a verdadeira cura vem da proteção e do estabelecimento de limites saudáveis.",
                farmaciaDaFloresta: `<ul class="list-disc list-inside space-y-2"><li><strong>Chá de Proteção Gástrica:</strong> Seu uso mais conhecido é para o sistema digestivo, mas a nível mágico, este chá cria um 'escudo' no plexo solar, protegendo contra energias densas que 'engolimos'.</li><li><strong>Amuleto de Proteção:</strong> Carregue folhas secas em um saquinho para criar um escudo pessoal contra energias negativas e inveja.</li><li><strong>Ritual de Limpeza:</strong> Use uma infusão de suas folhas para limpar objetos rituais ou o ambiente, consagrando um espaço seguro.</li></ul>`,
                insightsDoBemViver: "A Espinheira-Santa nos mostra a conexão direta entre o corpo e o espírito. Ao proteger fisicamente a mucosa do estômago, ela nos lembra da importância de proteger nosso campo energético. Ela pergunta: 'O que você está engolindo que te faz mal?'. Sua sabedoria está em criar barreiras para que possamos nos curar por dentro."
            }
        },
        {
            name: 'Aroeira-Vermelha',
            scientificName: 'Schinus terebinthifolius',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Schinus_terebinthifolia_-_fruits.jpg/800px-Schinus_terebinthifolia_-_fruits.jpg',
            planet: 'Marte',
            element: 'Fogo',
            deities: 'Exu, Ogum, Iansã',
            content: {
                almaDaErva: "Também conhecida como Pimenta-Rosa, a Aroeira é uma guerreira espiritual. Sua energia é de ação rápida, ligada ao poder de Orixás do fogo e do ferro. É a força que quebra demandas, abre caminhos e desintegra energias estagnadas. É uma das ervas mais poderosas para limpeza e proteção nas tradições afro-brasileiras.",
                farmaciaDaFloresta: `<ul class="list-disc list-inside space-y-2"><li><strong>Banho de Descarrego:</strong> Um banho com suas folhas é um dos mais potentes rituais de limpeza, ideal para quando se sente um peso espiritual ou após conflitos. Jogue do pescoço para baixo.</li><li><strong>Defumação de Abertura de Caminhos:</strong> Queime suas folhas secas para limpar o ambiente de obstáculos e atrair a energia de ação e coragem de Ogum.</li><li><strong>Pó de Proteção:</strong> Triture as folhas secas e assopre nos cantos da casa para criar uma barreira contra energias negativas.</li></ul>`,
                insightsDoBemViver: "A Aroeira ensina sobre a necessidade da 'destruição criativa'. Às vezes, é preciso quebrar e dissolver o velho para que o novo possa surgir. Sua energia de fogo nos dá a coragem para tomar decisões difíceis e cortar laços que não nos servem mais, abrindo caminho para o nosso verdadeiro propósito."
            }
        }
    ],
    'Inverno': [
        {
            name: 'Mirra',
            scientificName: 'Commiphora myrrha',
            image: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Commiphora_myrrha_-_Köhler–s_Medizinal-Pflanzen-042.jpg',
            planet: 'Lua',
            element: 'Água',
            deities: 'Ísis, Anúbis, Saturno',
            content: {
                almaDaErva: "Resina da Lua e da Água, com a sabedoria ancestral de Saturno. Usada nos rituais de embalsamamento egípcios, a Mirra está ligada aos mistérios da vida e da morte. É usada para cura profunda, meditação, purificação de espaços sagrados e para honrar os ancestrais. Seu aroma amargo nos ajuda a processar o luto.",
                farmaciaDaFloresta: `<ul class="list-disc list-inside space-y-2"><li><strong>Incenso de Meditação:</strong> Queime a resina em um carvão para aprofundar a meditação e conectar-se com o sagrado feminino e os ancestrais.</li><li><strong>Óleo de Unção:</strong> Misturado a um óleo carreador, pode ser usado para consagrar ferramentas ou para rituais de cura de feridas emocionais.</li></ul>`,
                insightsDoBemViver: "A Mirra nos convida a olhar para nossas sombras e feridas com compaixão. Ela nos ensina que a verdadeira cura muitas vezes vem de processos de introspecção profunda e da aceitação da finitude e dos ciclos de 'morte' e 'renascimento' em nossas vidas."
            }
        },
        {
            name: 'Olíbano',
            scientificName: 'Boswellia sacra',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Boswellia_sacra_resin_2.jpg/1024px-Boswellia_sacra_resin_2.jpg',
            planet: 'Sol',
            element: 'Fogo',
            deities: 'Ra, Apolo, Sol Invictus',
            content: {
                almaDaErva: "Resina do Sol e do Fogo, cujas 'lágrimas' são uma oferenda sagrada da árvore. O Olíbano é um dos mais potentes purificadores e elevadores de vibração. Sua fumaça sagrada limpa a negatividade, dissipa ilusões e abre um canal direto com o divino, sendo ideal para oração, consagração e meditação.",
                farmaciaDaFloresta: `<ul class="list-disc list-inside space-y-2"><li><strong>Defumação de Consagração:</strong> Queime a resina para consagrar um novo altar, casa ou amuleto, selando-o com energia solar divina.</li><li><strong>Spray de Limpeza e Proteção:</strong> Dissolva a resina em álcool para criar um spray de limpeza energética para ambientes.</li></ul>`,
                insightsDoBemViver: "O olfato está diretamente ligado ao sistema límbico do cérebro, o centro da emoção e da memória. O aroma do Olíbano pode criar uma 'âncora' olfativa, associando o cheiro a um estado de paz e sacralidade, tornando mais fácil acessar esse estado mental no futuro."
            }
        },
        {
            name: 'Gengibre',
            scientificName: 'Zingiber officinale',
            image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Zingiber_officinale_-_Köhler–s_Medizinal-Pflanzen-141.jpg',
            planet: 'Marte',
            element: 'Fogo',
            deities: 'Marte, Ares',
            content: {
                almaDaErva: "Raiz de Marte e do Fogo. O Gengibre é um catalisador mágico, um 'chute' energético para acelerar resultados e adicionar uma explosão de poder a qualquer feitiço. Ele aumenta a força pessoal, a coragem, a paixão e a confiança, ativando o Chakra do Plexo Solar (Manipura).",
                farmaciaDaFloresta: `<ul class="list-disc list-inside space-y-2"><li><strong>Chá Energizante:</strong> Beba um chá de gengibre antes de um ritual para aumentar sua energia pessoal e poder mágico.</li><li><strong>Pó Acelerador:</strong> Adicione gengibre em pó a sachês ou feitiços para acelerar seus efeitos.</li><li><strong>Amuleto de Sucesso:</strong> Carregue um pedaço da raiz para atrair sucesso e proteger contra o fracasso.</li></ul>`,
                insightsDoBemViver: "As propriedades do gengibre de aquecer o corpo e aumentar a circulação são um paralelo físico de sua função energética: melhorar o 'fluxo' de dinheiro, amor e oportunidades em nossa vida. Ele nos lembra que para manifestar, precisamos de ação e circulação de energia."
            }
        },
        {
            name: 'Andiroba',
            scientificName: 'Carapa guianensis',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Andiroba_sementes.jpg/1024px-Andiroba_sementes.jpg',
            planet: 'Saturno',
            element: 'Terra',
            deities: 'Espíritos da Floresta, Povos da Amazônia',
            content: {
                almaDaErva: "O nome vem do tupi e significa 'gosto amargo'. A Andiroba é uma árvore-mestra da Amazônia, e seu poder reside em seu óleo amargo. Na espiritualidade da floresta, o amargo não é ruim; é um remédio poderoso. A Andiroba limpa, protege e regenera. Sua energia é de uma cura profunda e resiliente, que ensina a encontrar força nas dificuldades.",
                farmaciaDaFloresta: `<ul class="list-disc list-inside space-y-2"><li><strong>Óleo de Proteção Corporal:</strong> Usar o óleo de Andiroba no corpo cria um escudo energético que repele influências 'parasitárias' e fortalece a aura.</li><li><strong>Limpeza de Objetos:</strong> Um pano umedecido com seu óleo pode ser usado para limpar fisicamente e energeticamente ferramentas mágicas, especialmente as de madeira.</li><li><strong>Cura de Feridas Emocionais:</strong> Medite com o aroma do óleo, pedindo à energia da Andiroba que ajude a cicatrizar velhas feridas emocionais, assim como ela cicatriza a pele.</li></ul>`,
                insightsDoBemViver: "A Andiroba nos ensina que a cura nem sempre é doce. O 'amargo' de seu óleo, que repele insetos e cura inflamações, é uma metáfora para a necessidade de enfrentar verdades desconfortáveis para alcançar a cura verdadeira. Ela nos conecta com a resiliência e a sabedoria ancestral da floresta."
            }
        },
        {
            name: 'Palo Santo',
            scientificName: 'Bursera graveolens',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Palo_Santo_Holy_Wood.jpg/1024px-Palo_Santo_Holy_Wood.jpg',
            planet: 'Sol',
            element: 'Ar',
            deities: 'Xamãs, Curandeiros',
            content: {
                almaDaErva: "A 'Madeira Sagrada' da América do Sul. Seu aroma doce e resinoso é liberado quando a madeira é queimada, e acredita-se que eleva a vibração de um espaço, limpando energias negativas e atraindo positividade. É uma ferramenta de purificação que acalma a mente e o espírito, preparando o ambiente para a meditação e o ritual.",
                farmaciaDaFloresta: `<ul class="list-disc list-inside space-y-2"><li><strong>Defumação de Limpeza Rápida:</strong> Acenda um pedaço de madeira de Palo Santo, deixe queimar por alguns segundos, apague a chama e espalhe a fumaça pelo ambiente, por sua aura ou por cristais.</li><li><strong>Chamado à Criatividade:</strong> Queime Palo Santo antes de iniciar um trabalho criativo para limpar bloqueios mentais e convidar a inspiração.</li><li><strong>Ancoragem de Paz:</strong> O simples ato de cheirar a madeira (sem queimar) pode ser uma âncora olfativa para um estado de calma e centramento.</li></ul>`,
                insightsDoBemViver: "O Palo Santo só libera seu aroma característico anos após a morte natural da árvore. Ele nos ensina sobre o tempo, a paciência e a transformação. A verdadeira sabedoria e o poder de cura (o 'aroma') muitas vezes só se manifestam após um ciclo de vida, morte e renascimento ter sido completado."
            }
        }
    ]
};

export const cosmogramData = {
    intro: "Bem-vindo ao Cosmograma Cristalino. Esta não é uma galeria, mas um sistema solar de energias, um mapa vivo da consciência da Terra. No centro, pulsa o Grande Sol, o Quartzo Transparente, mestre curador e amplificador universal. Orbitando-o, os planetas de cristal dançam em suas esferas de influência, cada um um guardião de uma sabedoria ancestral. Passe o mouse para sentir sua energia, clique para desvendar seus mistérios.",
    sun: {
        name: "Quartzo Transparente",
        subtitle: "O Mestre Curador",
        icon: "💎",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Quartz%2C_Tibet.jpg",
        color: "#F0F0F0",
        composition: "Dióxido de silício (SiO₂), o mineral mais abundante da Terra. Sua estrutura cristalina hexagonal perfeita o torna um receptor, armazenador e amplificador de energia incomparável, funcionando como um circuito integrado da natureza.",
        history: "Visto como 'luz congelada' ou 'água eterna' por gregos e romanos. Usado em bolas de cristal por videntes celtas, como crânios de cristal por civilizações pré-colombianas para canalizar sabedoria e, na mitologia moderna, associado à Lemúria e Atlântida como 'bibliotecas de cristal'.",
        properties: "É o coringa do reino mineral, um amplificador e programador de intenções. Promove clareza, alinha todos os chakras e conecta ao Chakra da Coroa (Sahasrara), abrindo um canal para a sabedoria divina e a consciência cósmica. Ele não transforma a energia, mas a amplifica em seu estado puro.",
        uses: `<ul class="list-disc list-inside space-y-1"><li><strong>Programação:</strong> Segure o quartzo, visualize sua intenção com clareza emocional e 'sopre' essa intenção para dentro do cristal, selando-a.</li><li><strong>Grades de Cristal:</strong> Use-o no centro de qualquer grade para amplificar e unificar a energia das outras pedras.</li><li><strong>Limpeza:</strong> Use uma ponta de quartzo para 'pentear' sua aura, limpando detritos energéticos.</li></ul>`,
        searchTerms: `"como programar um quartzo transparente", "grade de cristal para manifestação"`
    },
    orbits: [
        {
            name: "Órbita I: Aterramento e Proteção",
            crystals: [
                { name: "Turmalina Negra", subtitle: "O Escudo Impenetrável", icon: "⚫", image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Schorl-181105.jpg", color: "#333333", composition: "Um borossilicato complexo com uma estrutura trigonal. Suas estrias verticais canalizam a luz e a energia. É piroelétrica e piezoelétrica, gerando uma carga elétrica quando aquecida ou pressionada.", properties: "O cristal de proteção por excelência. Cria um campo de força que repele e transmuta energias densas, ataques psíquicos e radiação eletromagnética (EMF). Ligada ao Pilar da Terra e ao Chakra Raiz, ela nos ancora firmemente na realidade física.", uses: `<ul class="list-disc list-inside space-y-1"><li>Coloque na entrada de casa como um guardião.</li><li>Posicione perto de eletrônicos (computador, Wi-Fi) para absorver a poluição eletromagnética.</li><li>Carregue no bolso para proteção pessoal diária.</li></ul>`, searchTerms: `"como limpar turmalina negra", "proteção contra energia negativa"` },
                { name: "Hematita", subtitle: "A Âncora da Alma", icon: "🕳️", image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Hematite-207234.jpg", color: "#A9A9A9", composition: "Óxido de ferro (Fe₂O₃) com brilho metálico. Seu nome vem do grego 'haima' (sangue), pois sua forma em pó é vermelha e era usada como pigmento (ocre vermelho).", history: "Usada por guerreiros romanos para invocar coragem e por egípcios em amuletos para acalmar a histeria. É a pedra da 'mente', não do 'coração'.", properties: "A grande âncora do reino mineral. Aterra a energia 'aérea' no corpo físico, promovendo foco, coragem e a força para transformar sonhos em realidade. Dissolve a negatividade e equilibra a conexão corpo-mente.", uses: `<ul class="list-disc list-inside space-y-1"><li>Segure uma em cada mão para descarregar o excesso de energia após um dia estressante.</li><li>Use no local de trabalho para manter o foco e a mente lógica.</li><li>Coloque nos pés para um aterramento rápido e profundo.</li></ul>`, searchTerms: `"benefícios da hematita", "aterramento com hematita"` },
                { name: "Obsidiana Negra", subtitle: "O Espelho da Verdade", icon: "⚫", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Obsidian_Rainbow_Mexico.jpg/1024px-Obsidian_Rainbow_Mexico.jpg", color: "#2d2d2d", composition: "Um vidro vulcânico, formado pelo resfriamento ultrarrápido da lava, o que impede a formação de cristais. É amorfa, uma 'sombra' solidificada.", history: "Usada por culturas mesoamericanas para lâminas cirúrgicas e de sacrifício, e para espelhos de escriação (scrying). O Dr. John Dee, astrólogo da Rainha Elizabeth I, usava um espelho de obsidiana para se comunicar com anjos.", properties: "O espelho da alma. Uma pedra sem limites, que expõe impiedosamente a verdade, as sombras e os medos para serem confrontados. Corta laços energéticos e remove bloqueios, mas exige coragem e preparação. Use com respeito.", uses: `<ul class="list-disc list-inside space-y-1"><li>Use em meditações de <em>shadow work</em> para revelar verdades ocultas.</li><li>Coloque sobre o umbigo para cortar cordões energéticos.</li><li><strong>Atenção:</strong> Pode ser muito intensa. Use junto com um Quartzo Rosa para suavizar o processo.</li></ul>`, searchTerms: `"como usar obsidiana negra", "shadow work com cristais"` }
            ]
        },
        {
            name: "Órbita II: Cura e Elevação",
            crystals: [
                { name: "Quartzo Rosa", subtitle: "O Bálsamo do Coração", icon: "💖", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Rose_Quartz_Brazil.jpg/1024px-Rose_Quartz_Brazil.jpg", color: "#FFC0CB", composition: "Uma variedade rosa do quartzo, cuja cor vem de traços de titânio, ferro ou manganês. É a pedra do amor universal.", history: "Contas de quartzo rosa datadas de 7000 a.C. foram encontradas na Mesopotâmia. Egípcios e romanos a usavam como um símbolo de amor e beleza.", properties: "A vibração do amor incondicional e da paz infinita. Dissolve feridas emocionais, medo e ressentimento, abrindo e purificando o Chakra Cardíaco. Ensina sobre amor-próprio, perdão e compaixão. Atrai o amor e fortalece os relacionamentos existentes.", uses: `<ul class="list-disc list-inside space-y-1"><li>Coloque sobre o coração durante a meditação para curar mágoas.</li><li>Tenha no quarto para promover um ambiente de amor e intimidade.</li><li>Faça um elixir (método indireto) para beber a energia do amor-próprio.</li></ul>`, searchTerms: `"meditação com quartzo rosa", "amor-próprio com quartzo rosa"` },
                { name: "Ametista", subtitle: "A Transmutadora Violeta", icon: "💜", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Amethyst._Magaliesburg%2C_South_Africa.jpg/800px-Amethyst._Magaliesburg%2C_South_Africa.jpg", color: "#9966CC", composition: "Uma variedade violeta do quartzo, cuja cor vem de irradiação e impurezas de ferro. Abundante no Brasil e no Uruguai.", history: "O nome vem do grego 'amethystos' (não ébrio). Acreditava-se que prevenia a embriaguez. Leonardo da Vinci escrevia que a Ametista dissipava maus pensamentos e aguçava a inteligência.", properties: "A grande transmutadora. Sua vibração violeta eleva a energia, acalma a mente e transmuta padrões negativos em sabedoria. É uma ponte para a espiritualidade, abrindo os Chakras Coronário e Frontal (Terceiro Olho), e facilitando a meditação e a intuição.", uses: `<ul class="list-disc list-inside space-y-1"><li>Coloque na mesa de cabeceira para um sono tranquilo e para afastar pesadelos.</li><li>Medite com ela sobre o Terceiro Olho para aprofundar a prática e despertar a intuição.</li><li>Use para limpar a energia de outros cristais.</li></ul>`, searchTerms: `"meditação com ametista", "elixir de ametista método indireto"` },
                { name: "Quartzo Verde", subtitle: "O Curador da Alma", icon: "💚", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Aventurine_Brazil.jpg/1024px-Aventurine_Brazil.jpg", color: "#98FB98", composition: "Quartzo com inclusões de fuchsita (uma variedade de mica verde), que lhe confere a cor e um brilho sutil (aventurescência). Também conhecido como Aventurina Verde.", properties: "A pedra da saúde, vitalidade e do bem-estar. Sua energia calmante equilibra o corpo físico, emocional e mental, atuando como um 'vitamínico' para a alma. Atua diretamente no Chakra Cardíaco, acalmando o sistema nervoso e promovendo a cura e a prosperidade.", uses: `<ul class="list-disc list-inside space-y-1"><li>Use em contato com a pele na área que necessita de cura.</li><li>Coloque sobre o coração para acalmar a ansiedade e o pânico.</li><li>Tenha na sua mesa de trabalho ou carteira para atrair oportunidades e sorte.</li></ul>`, searchTerms: `"como usar quartzo verde", "quartzo verde chakra cardíaco"` }
            ]
        },
        {
            name: "Órbita III: Conexão e Espiritualidade",
            crystals: [
                 { name: "Selenita", subtitle: "A Luz Líquida", icon: "⚪", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Selenite_-_Naica%2C_Mun._de_Saucillo%2C_Chihuahua%2C_Mexico.jpg/800px-Selenite_-_Naica%2C_Mun._de_Saucillo%2C_Chihuahua%2C_Mexico.jpg", color: "#F0FFF0", composition: "Uma variedade cristalina da gipsita. Seu nome vem de Selene, a deusa grega da Lua. É muito macia (dureza 2 na escala Mohs) e solúvel em água.", properties: "Vibra em uma frequência extremamente elevada, manifestando a luz líquida no plano físico. Capaz de limpar e purificar outros cristais, o ambiente e a aura. Abre os chakras superiores (Coronário e acima), conectando à consciência angélica. É auto-limpante.", uses: `<ul class="list-disc list-inside space-y-1"><li>Use um bastão para 'varrer' seu campo áurico, cortando energias estagnadas.</li><li>Coloque outros cristais sobre uma placa de selenita para limpá-los e recarregá-los.</li><li>Crie uma grade de proteção ao redor da sua cama ou casa.</li><li><strong>Atenção:</strong> Nunca a coloque na água, ela se dissolverá.</li></ul>`, searchTerms: `"como limpar aura com selenita", "placa de selenita"` },
                { name: "Pedra da Lua", subtitle: "O Oráculo da Intuição", icon: "🌙", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Moonstone_gem.jpg/800px-Moonstone_gem.jpg", color: "#A0D6E8", composition: "Um feldspato conhecido pela adularescência, um brilho místico que parece flutuar sob a superfície, como a luz da lua na água.", history: "Em Roma, acreditava-se que era formada por raios de luar solidificados. Na Índia, é uma pedra sagrada, um presente de casamento tradicional para trazer harmonia.", properties: "Conectada à energia da Lua e ao feminino divino. Acalma as emoções, desperta a intuição, a clarividência e a empatia. É uma pedra de 'novos começos', alinhada com os ciclos da lua e da vida.", uses: `<ul class="list-disc list-inside space-y-1"><li>Durma com ela sob o travesseiro para estimular sonhos proféticos e lúcidos.</li><li>Use durante a Lua Nova para definir intenções e na Lua Cheia para celebrar e liberar.</li><li>Ajuda a equilibrar os ciclos hormonais femininos.</li></ul>`, searchTerms: `"pedra da lua e ciclos lunares", "ativar intuição"` },
                { name: "Cianita Azul", subtitle: "A Espada do Arcanjo", icon: "💙", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Kyanite-2013-01.jpg/800px-Kyanite-2013-01.jpg", color: "#4682B4", composition: "Um silicato de alumínio que cristaliza em lâminas. Possui uma propriedade única de ter dureza variável dependendo do eixo. Não acumula energia negativa.", properties: "A 'Espada de São Miguel Arcanjo'. Alinha instantaneamente todos os chakras e corpos sutis, sem necessidade de esforço consciente. Corta cordões energéticos negativos, confusão e raiva. Abre o Chakra Laríngeo, facilitando a comunicação da verdade com calma e clareza.", uses: `<ul class="list-disc list-inside space-y-1"><li>Use em meditações para um alinhamento rápido dos chakras.</li><li>Use sua forma de lâmina para 'cortar' simbolicamente pensamentos negativos ou laços energéticos.</li><li>Coloque sobre a garganta para desbloquear a comunicação antes de uma conversa difícil.</li></ul>`, searchTerms: `"alinhamento chakras cianita azul", "cianita azul espada de miguel"` }
            ]
        }
    ]
};

export const chakraData = {
    introTitle: "Centros de Poder: O Diagnóstico da Alma",
    introText: "Nossos chakras são os sete sóis interiores, os vórtices de energia que governam nosso ser. Eles são um mapa da nossa paisagem interna. Aqui, exploramos não apenas o que cada centro representa, mas como os grandes trânsitos cósmicos podem influenciar seu fluxo, oferecendo um diagnóstico para o seu trabalho de equilíbrio.",
    soundPillarIntro: "O Pilar do Som nos ensina que toda a existência é vibração. Os Bija Mantras ('sílabas semente') são os sons primordiais de cada centro de poder. Ao entoar um mantra, você sintoniza o chakra com sua frequência natural, ajudando a limpá-lo, equilibrá-lo e ativá-lo. Use o mantra correspondente como um foco para sua meditação ou prática de harmonização.",
    chakras: [
        { 
            name: "Muladhara", 
            translation: "Chakra Raiz", 
            color: "bg-red-700",
            mantra: "LAM",
            essencia: "Sua fundação, sua conexão com o Pilar da Terra. Governa a sobrevivência, segurança e estabilidade.",
            diagnostico: "Um trânsito desafiador de Saturno pode se manifestar aqui como medos de escassez. A atual passagem de Plutão em Aquário desafia este centro, pedindo uma reestruturação do que significa 'segurança' para você.",
            praticas: `
                <ul class="list-disc list-inside space-y-1">
                    <li><strong>Pilar da Terra:</strong> Pratique o aterramento (grounding) e conecte-se com a Turmalina Negra e a Hematita.</li>
                    <li><strong>Sopros de Vida:</strong> Use a Respiração Quadrada (Sama Vritti) para criar estabilidade interna.</li>
                </ul>`
        },
        { 
            name: "Svadhisthana", 
            translation: "Chakra Sacral", 
            color: "bg-orange-600",
            mantra: "VAM",
            essencia: "O centro do fluxo, da criatividade e das emoções, alinhado ao Pilar da Água. Governa o prazer e a paixão.",
            diagnostico: "Tensões entre a Lua (necessidades emocionais) e Vênus (prazer) em seu mapa podem se manifestar como bloqueios aqui, levando à busca por gratificação externa para preencher um vazio interno.",
            praticas: `
                <ul class="list-disc list-inside space-y-1">
                    <li><strong>Pilar da Água:</strong> Explore a Regulação Emocional e o Trabalho com Sonhos para navegar seu oceano interior.</li>
                    <li><strong>Herbário da Floresta:</strong> Conecte-se com ervas como a Calêndula e a Rosa para estimular a alegria.</li>
                </ul>`
        },
        { name: "Manipura", translation: "Chakra do Plexo Solar", color: "bg-yellow-500", mantra: "RAM", essencia: "Sua forja interior, o centro do poder pessoal e da vontade. Governa a autoestima, a disciplina e a ação.", diagnostico: "Marte ou Sol fortes no mapa natal podem superativar este centro, levando à impaciência. Um Saturno desafiador pode enfraquecê-lo, resultando em baixa autoestima.", praticas: `<ul class="list-disc list-inside space-y-1"><li><strong>Pilar do Fogo:</strong> Use Rituais de Queima para liberar bloqueios e a Respiração do Fole (Bhastrika) para ativá-lo.</li></ul>` },
        { name: "Anahata", translation: "Chakra Cardíaco", color: "bg-green-600", mantra: "YAM", essencia: "A ponte entre o material e o espiritual. Governa o amor, a compaixão e a conexão.", diagnostico: "Aspectos desafiadores com a Lua ou Vênus podem se manifestar como dificuldade em se abrir para relacionamentos ou em praticar o amor-próprio.", praticas: `<ul class="list-disc list-inside space-y-1"><li><strong>Pilar do Ar:</strong> Pratique a Meditação Metta Bhavana (Amor-Bondade) e a Comunicação Não-Violenta.</li><li><strong>Cosmograma Cristalino:</strong> Medite com o Quartzo Rosa sobre o peito.</li></ul>` },
        { name: "Vishuddha", translation: "Chakra Laríngeo", color: "bg-blue-500", mantra: "HAM", essencia: "O centro da expressão e da verdade. Governa a comunicação e a autenticidade.", diagnostico: "Um Mercúrio retrógrado ou desafiado no mapa pode dificultar a expressão clara. O medo de julgamento muitas vezes bloqueia este centro.", praticas: `<ul class="list-disc list-inside space-y-1"><li><strong>Pilar do Som:</strong> Pratique o canto de mantras para fazer este centro vibrar e se abrir.</li><li><strong>Cosmograma Cristalino:</strong> Use a Cianita Azul para facilitar a expressão da verdade.</li></ul>` },
        { name: "Ajna", translation: "Chakra do Terceiro Olho", color: "bg-indigo-600", mantra: "OM", essencia: "O portal da intuição e da sabedoria. Governa a percepção, a clareza e a visão além do véu.", diagnostico: "O excesso de estímulo do mundo moderno (Pilar do Ar em desequilíbrio) pode 'ensurdecer' a voz sutil da intuição. Netuno forte no mapa pode aumentar a sensibilidade psíquica, exigindo mais aterramento.", praticas: `<ul class="list-disc list-inside space-y-1"><li><strong>Pilar da Luz:</strong> Pratique a meditação no Terceiro Olho e mantenha um Diário de Sincronicidades.</li><li><strong>Cosmograma Cristalino:</strong> A Ametista e a Pedra da Lua são aliadas poderosas aqui.</li></ul>` },
        { name: "Sahasrara", translation: "Chakra Coronário", color: "bg-purple-700", mantra: "Silêncio (ou OM)", essencia: "Sua conexão com o Divino, a Fonte. Governa a transcendência e a consciência cósmica.", diagnostico: "O maior bloqueio aqui é o ego e a sensação de separação. A jornada de individuação de Jung é o caminho para abrir este centro, integrando todas as partes do ser.", praticas: `<ul class="list-disc list-inside space-y-1"><li><strong>Pilar da Mente:</strong> Estude o Pilar Zero, pratique a meditação silenciosa e contemple a Natureza para sentir a unidade de todas as coisas.</li><li><strong>Cosmograma Cristalino:</strong> A Selenita e o Quartzo Transparente abrem e limpam este canal.</li></ul>` }
    ]
};

export const pranayamaData = {
    introTitle: "Sopros de Vida: A Amizade com a Respiração",
    introMessage: "Se você, como muitos de nós, sente que a respiração consciente é uma 'deficiência', saiba que esta é a porta mais convidativa da Rota Pagã. Não há nada a 'conquistar', apenas a redescobrir. A respiração é sua âncora mais antiga. Este pilar não é sobre técnicas complexas, é sobre reacender a amizade com seu próprio sopro.",
    initialRitual: "A qualquer hora do dia, pause. Inspire profundamente, sinta sua barriga expandir. Segure por um instante. Expire lentamente, com um suspiro. Faça isso três vezes. Pronto. Você acabou de praticar a magia mais poderosa que existe: você trouxe sua mente de volta para casa, para o seu corpo.",
    techniques: [
        { name: "Nadi Shodhana", translation: "Respiração das Narinas Alternadas", imagePlaceholder: "☯️", paraQueServe: "Para harmonizar os hemisférios cerebrais, acalmar o sistema nervoso e equilibrar as energias masculina (Pingala, solar, lógica) e feminina (Ida, lunar, intuição) dentro de você.", pontoFoco: "Sinta que, ao inspirar pela narina esquerda, você está nutrindo seu lado intuitivo. Ao inspirar pela direita, você alimenta sua ação no mundo. Você é o tecelão que une as duas energias.", comoPraticar: ["Sente-se confortavelmente com a coluna ereta.", "Use o polegar direito para fechar a narina direita. Inspire lenta e profundamente pela narina esquerda.", "Feche a narina esquerda com o dedo anelar direito, libere o polegar e expire completamente pela narina direita.", "Inspire pela narina direita.", "Feche a narina direita com o polegar, libere o anelar e expire pela narina esquerda. Este é um ciclo. Continue por 3-5 minutos."], termosPesquisa: "tutorial Nadi Shodhana para iniciantes, equilibrar Ida e Pingala nadis" },
        { name: "Ujjayi Pranayama", translation: "Respiração Vitoriosa", imagePlaceholder: "🌊", paraQueServe: "Para aquecer o corpo, aumentar o foco e criar um ritmo meditativo que ancora a mente no presente. O som do oceano interior.", pontoFoco: "O som é a própria ferramenta. Concentre-se na vibração suave na sua garganta. Deixe que o som rítmico, como as ondas do mar, lave seus pensamentos ansiosos.", comoPraticar: ["Sente-se ou fique em uma postura confortável.", "Contraia suavemente a parte de trás da sua garganta (glote), como se estivesse sussurrando.", "Inspire e expire pelo nariz, mantendo a contração. A respiração produzirá um som suave, sibilante.", "Mantenha a inspiração e a expiração com a mesma duração."], termosPesquisa: "como fazer a respiração Ujjayi, benefícios do som na meditação" },
        { name: "Bhastrika", translation: "Respiração do Fole", imagePlaceholder: "🔥", paraQueServe: "Para energizar o corpo e a mente, aumentar a vitalidade e transmutar a inércia. É uma explosão de Prana que purifica e desperta o fogo interior.", pontoFoco: "Visualize que você é um fole de ferreiro atiçando as brasas do seu Chakra do Plexo Solar (Manipura).", comoPraticar: ["Sente-se com a coluna ereta.", "Inspire e expire de forma forçada e rápida pelo nariz. O movimento deve vir do seu diafragma.", "Faça um ciclo de 10 respirações, depois respire normalmente. Comece com um ciclo e aumente para 3. (Cuidado: pode causar tontura)."], termosPesquisa: "Bhastrika pranayama tutorial, contraindicações Bhastrika" },
        { name: "Sama Vritti", translation: "Respiração Quadrada", imagePlaceholder: "🔲", paraQueServe: "Para acalmar a mente, reduzir a ansiedade e criar um estado de equilíbrio e estabilidade. É uma âncora de serenidade em meio ao caos.", pontoFoco: "Visualize a construção de um quadrado perfeito com sua respiração, dando à sua mente uma estrutura sagrada para habitar.", comoPraticar: ["Sente-se ou deite-se confortavelmente.", "Expire todo o ar.", "Inspire contando até 4.", "Segure o ar, contando até 4.", "Expire contando até 4.", "Segure sem ar, contando até 4. Este é um ciclo."], termosPesquisa: "box breathing navy seals, respiração quadrada para ansiedade" },
        { name: "Sheetali Pranayama", translation: "Respiração Refrescante", imagePlaceholder: "❄️", paraQueServe: "Para resfriar o corpo, acalmar a mente e aliviar a frustração ou o excesso de 'fogo' (raiva).", pontoFoco: "Sinta o ar frio entrando e refrescando todo o seu sistema, como uma brisa suave em um dia quente.", comoPraticar: ["Sente-se confortavelmente.", "Enrole a língua em formato de 'U', colocando-a para fora da boca.", "Inspire lentamente pela língua enrolada, como se estivesse bebendo o ar por um canudo.", "Recolha a língua, feche a boca e expire lentamente pelo nariz.", "Repita por 5 a 10 ciclos."], termosPesquisa: "Sheetali pranayama tutorial, pranayama para resfriar o corpo" },
        { name: "Bhramari Pranayama", translation: "Respiração da Abelha", imagePlaceholder: "🐝", paraQueServe: "Para acalmar a mente de forma quase instantânea, aliviar a ansiedade e a raiva. A vibração do som tem um efeito calmante profundo no sistema nervoso.", pontoFoco: "Concentre-se na vibração que o som produz em todo o seu crânio, permitindo que ela dissolva os pensamentos agitados.", comoPraticar: ["Sente-se em um lugar tranquilo e feche os olhos.", "Use os polegares para tapar suavemente os ouvidos.", "Inspire profundamente pelo nariz.", "Ao expirar, mantenha a boca fechada e produza um som de 'Mmmmm', como o zumbido de uma abelha.", "Continue pelo tempo que for confortável."], termosPesquisa: "Bhramari pranayama benefícios, respiração da abelha para ansiedade" }
    ]
};

export const jornadaFlorescerData = [
    {
        etapa: 1,
        title: "Etapa 1: Despertar da Consciência (Malkuth)",
        sephirot: "Malkuth (O Reino)",
        foco: "O primeiro passo no caminho do 'Florescer' é a coragem de olhar para dentro, no nosso reino físico e material (Malkuth). É o momento de reconhecer os medos e as crenças limitantes que nos petrificam, e acender a primeira chama da consciência para iluminar o caminho à frente.",
        arquétipos: "Perseu e Medusa, Rá, Atena",
        pilares: "Terra e Luz",
        praticas: `
            <ol class="list-decimal list-inside space-y-2">
                <li><strong>Aterramento Diário:</strong> Inicie cada dia com o ritual de caminhar descalço na grama, sentindo a estabilidade da Terra para ter a coragem de olhar para dentro. <em class="text-xs text-gray-500">[ref: Pilar da Terra]</em></li>
                <li><strong>Diário de Sincronicidades:</strong> Mantenha um registro em seu Tomo de Poder das "coincidências significativas", aprendendo a ler a linguagem do universo. <em class="text-xs text-gray-500">[ref: Pilar da Luz]</em></li>
                <li><strong>Meditação "Não-Cachimbo" (Magritte):</strong> Use a técnica do Pilar da Luz para questionar uma crença limitante. Escreva "Isto não é [sua crença]" e redefina-a.</li>
            </ol>
        `
    },
    {
        etapa: 2,
        title: "Etapa 2: Definindo o Propósito (Yesod)",
        sephirot: "Yesod (O Fundamento)",
        foco: "Uma vez que a consciência desperta em Malkuth, ela busca um alicerce. Em Yesod, o Fundamento, construímos a base de nossa jornada. É sobre alinhar a vontade com a voz da alma, definindo um propósito claro que irá nutrir e guiar o crescimento.",
        arquétipos: "Hércules, Ísis, Thoth",
        pilares: "Água e Som",
        praticas: `
            <ol class="list-decimal list-inside space-y-2">
                <li><strong>Criação de um 'Altar de Intenções':</strong> Dedique um pequeno espaço com objetos que simbolizem seu propósito. Use a fluidez da Água para carregar este espaço com emoção.</li>
                <li><strong>Prática do "Eu Sou":</strong> Crie e vocalize afirmações poderosas que declarem seu propósito no tempo presente (ex: "Eu sou um canal de cura e sabedoria"). <em class="text-xs text-gray-500">[ref: Pilar do Som]</em></li>
                <li><strong>Escrita Terapêutica:</strong> Em seu Tomo, explore: "Se não houvesse limitações, o que minha alma desejaria criar?".</li>
            </ol>
        `
    },
    {
        etapa: 3,
        title: "Etapa 3: A Forja da Vontade (Hod & Netzach)",
        sephirot: "Hod (Esplendor) & Netzach (Vitória)",
        foco: "O propósito precisa ser forjado na ação. Esta etapa é o equilíbrio entre Hod (o intelecto, a estrutura) e Netzach (a emoção, a paixão). É onde confrontamos a procrastinação, transformando a inércia em momentum e a paixão em vitória duradoura.",
        arquétipos: "Teseu e o Minotauro, Sekhmet, Ares",
        pilares: "Fogo",
        praticas: `
            <ol class="list-decimal list-inside space-y-2">
                <li><strong>Rituais de Queima de Intenções:</strong> Utilize o poder do Fogo para liberar o que não serve mais, escrevendo medos e hábitos em um papel e entregando-os à chama. <em class="text-xs text-gray-500">[ref: Pilar do Fogo]</em></li>
                <li><strong>Prática de Bhastrika Pranayama:</strong> Use a "Respiração do Fole" para gerar energia e despertar a força de vontade do seu plexo solar (Manipura).</li>
                <li><strong>Ação Focada:</strong> Escolha uma meta desafiadora e dedique um tempo focado e ininterrupto para trabalhar nela, mesmo que por apenas 15 minutos.</li>
            </ol>
        `
    },
    {
        etapa: 4,
        title: "Etapa 4: A Ponte do Coração (Tiphareth)",
        sephirot: "Tiphareth (Beleza)",
        foco: "No centro da Árvore da Vida, encontramos Tiphareth, a Beleza e a Harmonia. O crescimento verdadeiro não é um ato solitário. Esta etapa é sobre abrir o coração, cultivar a compaixão e construir pontes de conexão, entendendo que nosso florescimento se nutre e nutre os outros.",
        arquétipos: "Inanna, Afrodite, Kuan Yin",
        pilares: "Ar",
        praticas: `
            <ol class="list-decimal list-inside space-y-2">
                <li><strong>Meditação Metta Bhavana (Amor-Bondade):</strong> Pratique enviar desejos de bem-estar para si mesmo, para entes queridos e, gradualmente, para todos os seres.</li>
                <li><strong>Prática da CNV:</strong> Em um relacionamento, pratique expressar uma necessidade usando a estrutura da Comunicação Não-Violenta (observação, sentimento, necessidade, pedido).</li>
                <li><strong>Atos de Generosidade Anônima:</strong> Realize um pequeno ato de bondade sem buscar reconhecimento, nutrindo a pura alegria de dar.</li>
            </ol>
        `
    },
    {
        etapa: 5,
        title: "Etapa 5: A Voz da Alma (Geburah & Chesed)",
        sephirot: "Geburah (Julgamento) & Chesed (Misericórdia)",
        foco: "Após conectar-se com o coração, é hora de dar voz à verdade. Esta etapa é o equilíbrio entre Geburah (a força e o discernimento para saber *o que* falar) e Chesed (a misericórdia e a gentileza de saber *como* falar). É a expressão autêntica e compassiva.",
        arquétipos: "Hermes, Apolo, Bragi",
        pilares: "Som e Mente",
        praticas: `
            <ol class="list-decimal list-inside space-y-2">
                <li><strong>Prática de Canto de Mantras:</strong> Escolha um mantra que ressoe com você (como "OM") e cante-o por 5 minutos, sentindo a vibração em seu corpo e limpando o Chakra Laríngeo.</li>
                <li><strong>Exercício de Falar Sua Verdade:</strong> Identifique uma situação segura onde você normalmente ficaria em silêncio e prepare-se para expressar sua opinião de forma calma.</li>
                <li><strong>Prática da Escuta Ativa:</strong> Em uma conversa, dedique-se a ouvir para compreender, sem formular sua resposta enquanto a outra pessoa fala.</li>
            </ol>
        `
    },
    {
        etapa: 6,
        title: "Etapa 6: A Visão Interior (Binah & Chokmah)",
        sephirot: "Binah (Entendimento) & Chokmah (Sabedoria)",
        foco: "Com a voz alinhada, aprofundamos a percepção, atravessando o Abismo para a Tríade Superna. Esta etapa é sobre silenciar o ruído externo para acessar Binah (o entendimento intuitivo) e Chokmah (a sabedoria pura), navegando pelas sombras com um guia interno.",
        arquétipos: "Anúbis, Hécate, Odin",
        pilares: "Luz",
        praticas: `
            <ol class="list-decimal list-inside space-y-2">
                <li><strong>Diário de Sonhos Junguiano:</strong> Anote o sonho, suas associações pessoais e depois reflita sobre a mensagem arquetípica. <em class="text-xs text-gray-500">[ref: Pilar da Água]</em></li>
                <li><strong>Meditação no Terceiro Olho (Ajna):</strong> Leve sua atenção para o ponto entre as sobrancelhas, visualizando uma luz índigo pulsante, despertando sua intuição.</li>
                <li><strong>Prática de Atenção às Sincronicidades:</strong> Esteja aberto para notar as "coincidências significativas" e anote-as, refletindo sobre suas mensagens.</li>
            </ol>
        `
    },
    {
        etapa: 7,
        title: "Etapa 7: União Divina (Kether)",
        sephirot: "Kether (A Coroa)",
        foco: "A culminação da jornada. Kether, a Coroa, representa a integração de todos os pilares, a transcendência do ego e a experiência da união com a Consciência Cósmica, onde o Guardião da Centelha se reconhece como parte inseparável da Grande Teia.",
        arquétipos: "Shiva e Shakti, A Grande Mãe, O Andrógino Divino",
        pilares: "Mente",
        praticas: `
            <ol class="list-decimal list-inside space-y-2">
                <li><strong>Meditação Silenciosa:</strong> Sente-se sem objetivo, mantra ou foco, apenas testemunhando a existência e permitindo que a mente se dissolva na quietude.</li>
                <li><strong>Contemplação da Natureza:</strong> Vá para um lugar na natureza e pratique ver a si mesmo em tudo: na árvore, na rocha, no rio. Sinta a unidade de toda a vida.</li>
                <li><strong>Estudo do Pilar Zero "A Teia do Mundo":</strong> Releia e medite sobre o pilar filosófico, sentindo a conexão entre Jung, Gaia, Sagan e Ubuntu.</li>
            </ol>
        `
    }
];