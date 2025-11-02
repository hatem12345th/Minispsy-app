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
        <Text style={styles.timeText}>45:00</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <Text style={styles.iconText}>📞</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <Text style={styles.iconText}>📹</Text>
          </TouchableOpacity>
        </View>
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
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage} activeOpacity={0.7}>
          <Text style={styles.sendIcon}>📤</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="إرسال رسالة"
          placeholderTextColor="#9CA3AF"
          value={input}
          onChangeText={setInput}
          textAlign="right"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
  },
  timeText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0891B2',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 22,
    color: '#0891B2',
  },

  messagesContainer: {
    padding: 18,
    flexGrow: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF',
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 24,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#0891B2',
    borderTopRightRadius: 6,
  },
  doctorBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 6,
    borderWidth: 1.5,
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
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderColor: 'rgba(226, 232, 240, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#0F172A',
    borderWidth: 0,
    maxHeight: 100,
    fontWeight: '500',
    marginRight: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  sendIcon: { 
    fontSize: 24,
    color: '#0891B2',
    lineHeight: 24,
  },
});
