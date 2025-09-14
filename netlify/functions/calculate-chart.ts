import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Helper function to call the astrology API
const astrologyApiRequest = async (endpoint: string, apiKey: string, payload: any) => {
  const response = await fetch(`https://json.freeastrologyapi.com/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Astrology API request failed with status ${response.status}: ${errorBody}`);
  }
  return response.json();
};

// Helper function to determine which house a planet is in
const getHouseForPlanet = (planetDegree: number, houses: any[]) => {
    // The houses array is 1-based, but we use 0-based index. House 1 cusp is houses[0].
    for (let i = 0; i < 12; i++) {
        const currentHouse = houses[i];
        // The next house cusp. For House 12, the next cusp is House 1 of the next cycle.
        const nextHouse = houses[(i + 1) % 12];
        const startDegree = currentHouse.degree;
        let endDegree = nextHouse.degree;

        // Handle the wrap-around from 360 to 0 degrees (e.g., House 12 to House 1)
        if (endDegree < startDegree) {
            if (planetDegree >= startDegree || planetDegree < endDegree) {
                return currentHouse.House;
            }
        } else {
            if (planetDegree >= startDegree && planetDegree < endDegree) {
                return currentHouse.House;
            }
        }
    }
    return 'Unknown'; // Should not happen in a valid chart
};


// Main handler function
const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const astrologyApiKey = process.env.ASTROLOGY_API_KEY;
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!astrologyApiKey || !geminiApiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'API keys are not configured.' }) };
  }

  try {
    const birthData = JSON.parse(event.body || '{}');
    const requiredFields = ['year', 'month', 'date', 'hours', 'minutes', 'latitude', 'longitude', 'timezone'];
    for (const field of requiredFields) {
        if (birthData[field] === undefined) {
            return { statusCode: 400, body: JSON.stringify({ error: `Missing required field: ${field}` }) };
        }
    }

    const payload = {
      ...birthData,
      seconds: 0,
      config: {
        observation_point: "topocentric",
        ayanamsha: "tropical",
        house_system: "Placidus",
        language: "pt"
      }
    };

    const [planetsResponse, housesResponse] = await Promise.all([
      astrologyApiRequest('western/planets', astrologyApiKey, payload),
      astrologyApiRequest('western/houses', astrologyApiKey, payload)
    ]);

    const planets = planetsResponse.output;
    const houses = housesResponse.output.Houses;

    // Process the data to get "Planet in Sign in House" strings
    const chartPlacements = planets.map((planet: any) => {
        const houseNumber = getHouseForPlanet(planet.fullDegree, houses);
        const planetName = planet.planet.pt || planet.planet.en;
        const signName = planet.zodiac_sign.name.pt || planet.zodiac_sign.name.en;
        return `${planetName} em ${signName} na Casa ${houseNumber}`;
    }).join(', ');

    // Construct the prompt for Gemini
    const prompt = `
        Você é um astrólogo experiente e coach de desenvolvimento pessoal, especializado em uma abordagem holística que integra astrologia, cabala, e autoconhecimento. Seu objetivo é analisar os dados de um mapa astral para criar um relatório de "Sinergias e Desafios" para um plano de bem-estar chamado "Florescer".

        O cliente está em um ciclo de Júpiter/Chesed, focado em expansão, benevolência e crescimento.

        Analise os seguintes posicionamentos astrais: ${chartPlacements}.

        Com base nesses dados, gere um relatório com a seguinte estrutura:

        **I. SINERGIAS (Pontos Fortes do Mapa que APOIAM o Plano "Florescer"):**
        Para cada sinergia, crie um título, explique a "Conexão" (como o posicionamento astrológico se manifesta) e o "Alinhamento com 'Florescer'" (como isso ajuda especificamente no ciclo de Júpiter/Chesed). Use um tom encorajador e prático.

        **II. DESAFIOS (Pontos do Mapa que Exigem ATENÇÃO e ADAPTAÇÃO):**
        Para cada desafio, identifique o "Desafio" (como o posicionamento pode se manifestar como um obstáculo), sugira "Adaptação/Estratégia" (ações práticas e de autoconsciência para lidar com o desafio) e explique o "Alinhamento com 'Florescer'" (como superar esse desafio é parte da jornada de florescimento).

        **III. CONCLUSÃO DA ANÁLISE INTEGRADA:**
        Faça um parágrafo final que resuma a análise, oferecendo uma visão geral encorajadora sobre como o mapa da pessoa fornece as ferramentas para o sucesso no plano "Florescer".

        Seja profundo, mas claro e direto. Use os nomes dos planetas e signos em português.
    `;

    // Call Gemini API
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const geminiResponse = await result.response;
    const analysisText = geminiResponse.text();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ analysis: analysisText }),
    };

  } catch (error) {
    console.error('Error processing request:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to process request', details: error.message }) };
  }
};

export { handler };
