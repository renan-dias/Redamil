import axios from 'axios';

const API_KEY = "AIzaSyDLeezSy4a5GIG7vi-41KbCnR0zCS1O5tY"; // Adicionando a API_KEY

export async function corrigirRedacao(base64img) {
  const texto = `Esta é a imagem de uma redação manuscrita em português. Avalie como uma redação do ENEM e dê uma nota de 0 a 1000, explicando os critérios. Aqui está a imagem em base64: ${base64img}`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
    { contents: [{ parts: [{ text: texto }] }] }
  );
  return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Erro na correção.";
}
