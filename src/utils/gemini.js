import axios from 'axios';

const API_KEY = "AIzaSyDLeezSy4a5GIG7vi-41KbCnR0zCS1O5tY";
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

export async function gerarTema() {
  const prompt = "Crie um tema de redação estilo prosa, nos moldes do ENEM com um texto motivador curto.";
  const response = await axios.post(BASE_URL, {
    contents: [{ parts: [{ text: prompt }] }]
  });

  const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
  return result || "Erro ao gerar tema.";
}
