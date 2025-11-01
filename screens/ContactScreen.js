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
    backgroundColor: '#FFFFFF',
    paddingTop: 56,
    paddingBottom: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backArrow: { fontSize: 26, color: '#0891B2', fontWeight: '700' },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#1F2937', letterSpacing: 0.3 },

  // 🔹 Tabs
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    margin: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#0891B2',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  tabText: {
    color: '#6B7280',
    fontWeight: '700',
    fontSize: 15,
  },
  activeTabText: {
    color: '#FFFFFF',
  },

  card: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarIcon: { fontSize: 28 },
  userName: { fontSize: 19, fontWeight: '800', color: '#1F2937', letterSpacing: 0.2 },
  userInfo: { color: '#6B7280', fontSize: 15, fontWeight: '500', marginTop: 2 },
  chatButton: { fontSize: 24, color: '#0891B2' },

  chatContainer: { flex: 1, backgroundColor: '#F8FAFC', paddingHorizontal: 18 },
  profileHeader: { alignItems: 'center', marginVertical: 20, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  userEmoji: { fontSize: 56 },
  userStatus: { color: '#059669', fontSize: 15, marginTop: 6, fontWeight: '600' },
  chatBubble: {
    maxWidth: '80%',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#0891B2',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 4,
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  otherBubble: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-end',
    borderTopRightRadius: 4,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  chatText: { fontSize: 17, lineHeight: 24 },
  userText: { color: '#FFFFFF', textAlign: 'right', fontWeight: '500' },
  otherText: { color: '#1F2937', textAlign: 'right', fontWeight: '500' },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderTopWidth: 1.5,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 17,
    color: '#1F2937',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
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
  sendIcon: { fontSize: 22, color: '#FFFFFF' },
});
