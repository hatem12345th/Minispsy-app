import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function ChatScreen({ onBack }) {
  const [messages, setMessages] = useState([
    { id: '1', text: 'مرحبًا دكتور 👋', sender: 'user' },
    { id: '2', text: 'مرحبًا، كيف يمكنني مساعدتك اليوم؟ 😊', sender: 'doctor' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { id: Date.now().toString(), text: input, sender: 'user' }]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>المحادثة</Text>
        <View style={{ width: 20 }} />
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.sender === 'user' ? styles.userBubble : styles.doctorBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                item.sender === 'user' ? styles.userText : styles.doctorText,
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.messagesContainer}
      />

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="اكتب رسالة..."
          placeholderTextColor="#999"
          value={input}
          onChangeText={setInput}
          textAlign="right"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage} activeOpacity={0.7}>
          <Text style={styles.sendIcon}>📤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5F7FA' 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 18,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECF0',
  },
  backArrow: { 
    fontSize: 26, 
    color: '#0891B2', 
    fontWeight: '700' 
  },
  headerTitle: { 
    fontSize: 22, 
    fontWeight: '800', 
    color: '#111827',
    letterSpacing: 0.2,
    lineHeight: 28,
  },

  messagesContainer: {
    padding: 18,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 20,
    padding: 14,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#0891B2',
    borderTopRightRadius: 4,
  },
  doctorBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E8ECF0',
  },
  messageText: { 
    fontSize: 16, 
    lineHeight: 22,
    fontWeight: '500',
  },
  userText: { 
    color: '#FFFFFF',
    textAlign: 'right',
  },
  doctorText: { 
    color: '#111827',
    textAlign: 'right',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1.5,
    borderColor: '#E8ECF0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E8ECF0',
    maxHeight: 100,
    fontWeight: '500',
  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: '#0891B2',
    borderRadius: 28,
    padding: 12,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  sendIcon: { 
    fontSize: 20,
    lineHeight: 20,
  },
});
