import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MarkdownDisplay from 'react-native-markdown-display';
import Header from '../components/Header';
// import Button from '../components/Button'; // Comentado pois estamos usando ButtonComponent definido abaixo
import { gerarTema } from '../utils/gemini';
import { imageChoice } from '../utils/foto';
import { corrigirRedacao } from '../utils/corrigirImagem';

export default function Home() {
  const [tema, setTema] = useState('');
  const [resposta, setResposta] = useState('');
  const [loadingTema, setLoadingTema] = useState(false);
  const [loadingCorrecao, setLoadingCorrecao] = useState(false);

  const handleGerar = async () => {
    setLoadingTema(true);
    setTema(''); // Limpa o tema anterior
    try {
      const result = await gerarTema();
      setTema(result);
    } catch (error) {
      console.error("Erro ao gerar tema:", error);
      setTema("Ocorreu um erro ao tentar gerar o tema. Por favor, tente novamente.");
    } finally {
      setLoadingTema(false);
    }
  };

  const handleCorrigir = async () => {
    setLoadingCorrecao(true);
    setResposta(''); // Limpa a resposta anterior
    try {
      const imgBase64 = await imageChoice();
      if (imgBase64) {
        const result = await corrigirRedacao(imgBase64);
        setResposta(result);
      } else {
        // Opcional: Informar que nenhuma imagem foi selecionada se desejar
        // setResposta("Nenhuma imagem selecionada."); 
      }
    } catch (error) {
      console.error("Erro ao corrigir redação:", error);
      setResposta("Ocorreu um erro ao tentar corrigir a redação. Por favor, tente novamente.");
    } finally {
      setLoadingCorrecao(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Header /> 
        {/* Assumindo que o Header ocupa a largura total e não precisa de centralização específica aqui */}

        <View style={styles.section}>
          <ButtonComponent // Renomeado para evitar conflito com o nome do seu componente
            title="🎯 Gerar Tema"
            onPress={handleGerar}
            disabled={loadingTema}
            loading={loadingTema}
          />
          {loadingTema && <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />}
          {tema && !loadingTema ? (
            <View style={styles.markdownContainer}>
              <MarkdownDisplay style={markdownStyles}>{tema}</MarkdownDisplay>
            </View>
          ) : null}
        </View>

        <View style={styles.section}>
          <ButtonComponent
            title="📤 Enviar Redação"
            onPress={handleCorrigir}
            disabled={loadingCorrecao}
            loading={loadingCorrecao}
          />
          {loadingCorrecao && <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />}
          {resposta && !loadingCorrecao ? (
            <View style={styles.markdownContainer}>
              <MarkdownDisplay style={markdownStyles}>{resposta}</MarkdownDisplay>
            </View>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}

// Componente Button estilizado (você pode mover para src/components/Button.js e importar)
// Se você já tem um componente Button customizado, adapte-o ou use este.
const ButtonComponent = ({ title, onPress, disabled, loading, style, textStyle }) => (
  <TouchableOpacity
    style={[styles.button, style, (disabled || loading) && styles.buttonDisabled]}
    onPress={onPress}
    disabled={disabled || loading}
  >
    {loading ? (
      <ActivityIndicator size="small" color="#FFFFFF" />
    ) : (
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f0f2f5', // Um cinza bem claro para o fundo
  },
  container: {
    flex: 1,
    alignItems: 'center', // Centraliza os filhos horizontalmente
    paddingHorizontal: 20,
    paddingVertical: 10, // Adiciona um pouco de padding vertical
  },
  section: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20, // Espaçamento entre as seções
  },
  button: {
    backgroundColor: '#007AFF', // Azul vibrante
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25, // Bordas mais arredondadas
    minWidth: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#a9a9a9', // Cinza para botão desabilitado/loading
  },
  markdownContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  loader: {
    marginVertical: 20,
  },
});

// Estilos para o Markdown (opcional, mas recomendado para melhor visualização)
const markdownStyles = StyleSheet.create({
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 5,
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 8,
    marginBottom: 4,
  },
  body: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  list_item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  bullet_list_icon: {
    marginRight: 10,
    fontSize: 16,
    color: '#007AFF',
  },
  // Adicione mais estilos conforme necessário (para strong, em, code, etc.)
});
