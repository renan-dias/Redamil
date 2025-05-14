import { View, Text, ScrollView } from 'react-native';
import { useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { gerarTema } from '../utils/gemini';
import { imageChoice } from '../utils/foto'; // Corrigido o nome da função importada
import { corrigirRedacao } from '../utils/corrigirImagem';

export default function Home() {
  const [tema, setTema] = useState('');
  const [resposta, setResposta] = useState('');

  const handleGerar = async () => {
    const result = await gerarTema();
    setTema(result);
  };

  const handleCorrigir = async () => {
    const imgBase64 = await imageChoice(); // Corrigido o nome da função chamada
    if (imgBase64) {
      const result = await corrigirRedacao(imgBase64);
      setResposta(result);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Header />
      <Button title="🎯 Gerar Tema" onPress={handleGerar} />
      <Text>{tema}</Text>
      <Button title="📤 Enviar Redação para Correção" onPress={handleCorrigir} />
      <Text style={{ marginTop: 10 }}>{resposta}</Text>
    </ScrollView>
  );
}
