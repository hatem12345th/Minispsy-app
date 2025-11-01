import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function ContactScreen({ onBack, userType }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState({});
  const [activeTab, setActiveTab] = useState('patients'); // 🔹 "patients" or "specialists"

  // 👩‍⚕️ Specialists list
  const specialists = [
    { id: 1, name: 'د. أحمد محمد', specialty: 'أخصائي نفسي' },
    { id: 2, name: 'د. ليلى عبد الله', specialty: 'ارشاد زواجي' },
    { id: 3, name: 'د. كريم ناصر', specialty: 'التوجيه المهني' },
  ];

  // 🧑‍🤝‍🧑 Patients list
  const patients = [
    { id: 101, name: 'حاتم طالب', condition: 'اضطراب قلق' },
    { id: 102, name: 'ليلى بن عيسى', condition: 'توتر مزمن' },
    { id: 103, name: 'يوسف علي', condition: 'إجهاد نفسي' },
  ];

  // ✅ Choose list based on userType + active tab
  let list = [];
  if (userType === 'specialist') {
    list = activeTab === 'patients' ? patients : specialists;
  } else {
    list = specialists;
  }

  // 📨 Send message
  const handleSend = () => {
    if (!message.trim()) return;
    const msg = { id: Date.now(), sender: 'user', text: message.trim() };

    setChat((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), msg],
    }));
    setMessage('');

    // Simulated reply
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: 'other',
        text: 'تم استلام رسالتك، شكرًا لتواصلك 💬',
      };
      setChat((prev) => ({
        ...prev,
        [selectedUser.id]: [...(prev[selectedUser.id] || []), reply],
      }));
    }, 1000);
  };

  // 💬 Chat screen
  if (selectedUser) {
    const currentChat = chat[selectedUser.id] || [];
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelectedUser(null)}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{selectedUser.name}</Text>
          <View style={{ width: 20 }} />
        </View>

        <ScrollView
          style={styles.chatContainer}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <View style={styles.profileHeader}>
            <Text style={styles.userEmoji}>💬</Text>
            <Text style={styles.userName}>{selectedUser.name}</Text>
            <Text style={styles.userStatus}>
              {selectedUser.specialty
                ? `الاختصاص: ${selectedUser.specialty}`
                : `الحالة: ${selectedUser.condition}`}
            </Text>
          </View>

          {currentChat.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.chatBubble,
                msg.sender === 'user'
                  ? styles.userBubble
                  : styles.otherBubble,
              ]}
            >
              <Text
                style={[
                  styles.chatText,
                  msg.sender === 'user'
                    ? styles.userText
                    : styles.otherText,
                ]}
              >
                {msg.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="اكتب رسالتك..."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
            textAlign="right"
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendIcon}>✈️</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  // 📋 List view
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>
          {userType === 'specialist'
            ? activeTab === 'patients'
              ? 'قائمة المرضى'
              : 'قائمة الأطباء'
            : 'قائمة الأطباء'}
        </Text>
        <View style={{ width: 20 }} />
      </View>

      {/* 🔹 Tabs visible only for specialists */}
      {userType === 'specialist' && (
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'patients' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('patients')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'patients' && styles.activeTabText,
              ]}
            >
              المرضى
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'specialists' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('specialists')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'specialists' && styles.activeTabText,
              ]}
            >
              الأطباء
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {list.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={styles.card}
            onPress={() => setSelectedUser(user)}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarIcon}>
                {user.specialty ? '👨‍⚕️' : '🧑‍🤝‍🧑'}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userInfo}>
                {user.specialty || user.condition}
              </Text>
            </View>
            <Text style={styles.chatButton}>💬</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  backArrow: { fontSize: 22, color: '#0077BE' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#2C3E50' },

  // 🔹 Tabs
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    margin: 15,
    padding: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#0077BE',
  },
  tabText: {
    color: '#555',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },

  card: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0F2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  avatarIcon: { fontSize: 25 },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50' },
  userInfo: { color: '#777', fontSize: 14 },
  chatButton: { fontSize: 20 },

  chatContainer: { flex: 1, backgroundColor: '#F5F7FA', paddingHorizontal: 15 },
  profileHeader: { alignItems: 'center', marginVertical: 15 },
  userEmoji: { fontSize: 50 },
  userStatus: { color: '#4CAF50', fontSize: 14, marginTop: 4 },
  chatBubble: {
    maxWidth: '80%',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 6,
  },
  userBubble: {
    backgroundColor: '#0077BE',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  otherBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  chatText: { fontSize: 16 },
  userText: { color: '#fff', textAlign: 'right' },
  otherText: { color: '#2C3E50', textAlign: 'right' },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#E8E8E8',
  },
  input: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: '#2C3E50',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#0077BE',
    borderRadius: 25,
    padding: 10,
  },
  sendIcon: { fontSize: 20, color: '#fff' },
});
