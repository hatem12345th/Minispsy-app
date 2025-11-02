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
  Alert,
} from 'react-native';
import AppointmentForm from './AppointmentForm';

export default function ContactScreen({ onBack, userType }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState({});
  const [activeTab, setActiveTab] = useState('appointments');
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientId: 101,
      specialistId: 1,
      patientName: 'حاتم طالب',
      specialistName: 'د. أحمد محمد',
      condition: 'اضطراب قلق',
      date: '2025-11-05',
      time: '10:00 ص',
      sessionType: 'video',
      status: 'pending',
    },
    {
      id: 2,
      patientId: 102,
      specialistId: 1,
      patientName: 'ليلى بن عيسى',
      specialistName: 'د. أحمد محمد',
      condition: 'توتر مزمن',
      date: '2025-11-06',
      time: '02:00 م',
      sessionType: 'text',
      status: 'approved',
    },
  ]);

  const specialists = [
    { id: 1, name: 'د. أحمد محمد', specialty: 'أخصائي نفسي', rating: 4.8, experience: '10 سنوات' },
    { id: 2, name: 'د. ليلى عبد الله', specialty: 'ارشاد زواجي', rating: 4.9, experience: '8 سنوات' },
    { id: 3, name: 'د. كريم ناصر', specialty: 'التوجيه المهني', rating: 4.7, experience: '12 سنة' },
    { id: 4, name: 'د. فاطمة حسن', specialty: 'استشارات أسرية', rating: 4.9, experience: '15 سنة' },
  ];

  const approvedPatients = appointments
    .filter((apt) => apt.status === 'approved')
    .map((apt) => ({
      id: apt.patientId,
      name: apt.patientName,
      condition: apt.condition,
    }));

  const hasApprovedAppointment = (specialistId) => {
    return appointments.some(
      (apt) => apt.specialistId === specialistId && apt.status === 'approved'
    );
  };

  const handleSpecialistPress = (specialist) => {
    if (hasApprovedAppointment(specialist.id)) {
      setSelectedUser(specialist);
    } else {
      setSelectedUser(specialist);
      setShowAppointmentForm(true);
    }
  };

  const handleAppointmentSubmit = (appointment) => {
    setAppointments([...appointments, appointment]);
    setShowAppointmentForm(false);
    Alert.alert(
      'تم إرسال الطلب',
      'سيتم إشعارك عند موافقة الأخصائي على الموعد',
      [{ text: 'حسناً' }]
    );
  };

  const handleAppointmentAction = (appointmentId, action) => {
    const appointment = appointments.find((apt) => apt.id === appointmentId);
    
    Alert.alert(
      action === 'approve' ? 'تأكيد الموعد' : 'رفض الموعد',
      action === 'approve'
        ? `هل تريد قبول موعد ${appointment.patientName}؟`
        : `هل تريد رفض موعد ${appointment.patientName}؟`,
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: action === 'approve' ? 'قبول' : 'رفض',
          style: action === 'approve' ? 'default' : 'destructive',
          onPress: () => {
            setAppointments((prev) =>
              prev.map((apt) =>
                apt.id === appointmentId
                  ? { ...apt, status: action === 'approve' ? 'approved' : 'rejected' }
                  : apt
              )
            );
            Alert.alert(
              'تم',
              action === 'approve' ? 'تم قبول الموعد بنجاح' : 'تم رفض الموعد'
            );
          },
        },
      ]
    );
  };

  const handleSend = () => {
    if (!message.trim()) return;

    const msg = {
      id: Date.now(),
      sender: 'user',
      text: message.trim(),
      timestamp: new Date().toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setChat((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), msg],
    }));
    setMessage('');

    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: 'other',
        text: 'شكراً لتواصلك، سأرد عليك في أقرب وقت 💬',
        timestamp: new Date().toLocaleTimeString('ar-SA', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setChat((prev) => ({
        ...prev,
        [selectedUser.id]: [...(prev[selectedUser.id] || []), reply],
      }));
    }, 1500);
  };

  if (selectedUser && !showAppointmentForm) {
    const currentChat = chat[selectedUser.id] || [];
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelectedUser(null)} activeOpacity={0.7}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>{selectedUser.name}</Text>
            {selectedUser.specialty && (
              <Text style={styles.headerSubtitle}>{selectedUser.specialty}</Text>
            )}
            {selectedUser.condition && (
              <Text style={styles.headerSubtitle}>{selectedUser.condition}</Text>
            )}
          </View>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>
              {selectedUser.specialty ? '👨‍⚕️' : '🧑‍🤝‍🧑'}
            </Text>
          </View>
        </View>

        <ScrollView
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileHeader}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileEmoji}>
                {selectedUser.specialty ? '👨‍⚕️' : '🧑‍🤝‍🧑'}
              </Text>
            </View>
            <Text style={styles.userName}>{selectedUser.name}</Text>
            <Text style={styles.userStatus}>
              {selectedUser.specialty && `الاختصاص: ${selectedUser.specialty}`}
              {selectedUser.condition && `الحالة: ${selectedUser.condition}`}
            </Text>
            <View style={styles.onlineBadge}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>متصل الآن</Text>
            </View>
          </View>

          {currentChat.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>💬</Text>
              <Text style={styles.emptyText}>ابدأ المحادثة الآن</Text>
            </View>
          )}

          {currentChat.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageWrapper,
                msg.sender === 'user' ? styles.userMessageWrapper : styles.otherMessageWrapper,
              ]}
            >
              <View
                style={[
                  styles.chatBubble,
                  msg.sender === 'user' ? styles.userBubble : styles.otherBubble,
                ]}
              >
                <Text
                  style={[
                    styles.chatText,
                    msg.sender === 'user' ? styles.userText : styles.otherText,
                  ]}
                >
                  {msg.text}
                </Text>
                <Text
                  style={[
                    styles.timestamp,
                    msg.sender === 'user' ? styles.userTimestamp : styles.otherTimestamp,
                  ]}
                >
                  {msg.timestamp}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.sendButton} onPress={handleSend} activeOpacity={0.7}>
            <Text style={styles.sendIcon}>✈️</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="اكتب رسالتك..."
            placeholderTextColor="#9CA3AF"
            value={message}
            onChangeText={setMessage}
            textAlign="right"
            multiline
            maxLength={500}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }

  if (userType !== 'specialist') {
    const pendingAppointments = appointments.filter((apt) => apt.status === 'pending');
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {onBack && (
            <TouchableOpacity onPress={onBack} activeOpacity={0.7}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.headerTitle}>الأخصائيين النفسيين</Text>
          <View style={{ width: 20 }} />
        </View>

        {pendingAppointments.length > 0 && (
          <View style={styles.statusBanner}>
            <Text style={styles.statusText}>
              📋 لديك {pendingAppointments.length} طلب قيد الانتظار
            </Text>
          </View>
        )}

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {specialists.map((specialist) => {
            const hasAppointment = hasApprovedAppointment(specialist.id);
            const pendingAppointment = appointments.find(
              (apt) => apt.specialistId === specialist.id && apt.status === 'pending'
            );

            return (
              <TouchableOpacity
                key={specialist.id}
                style={styles.card}
                onPress={() => handleSpecialistPress(specialist)}
              >
                <View style={styles.cardContent}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarIcon}>👨‍⚕️</Text>
                  </View>
                  
                  <View style={styles.infoContainer}>
                    <Text style={styles.userName}>{specialist.name}</Text>
                    <Text style={styles.specialty}>{specialist.specialty}</Text>
                    
                    <View style={styles.metaInfo}>
                      <Text style={styles.metaText}>⭐ {specialist.rating}</Text>
                      <Text style={styles.metaText}>• {specialist.experience}</Text>
                    </View>
                  </View>

                  <View style={styles.actionContainer}>
                    {hasAppointment ? (
                      <View style={styles.chatBadge}>
                        <Text style={styles.chatIcon}>💬</Text>
                      </View>
                    ) : pendingAppointment ? (
                      <View style={styles.pendingBadge}>
                        <Text style={styles.pendingText}>⏳</Text>
                      </View>
                    ) : (
                      <View style={styles.bookBadge}>
                        <Text style={styles.bookText}>حجز</Text>
                      </View>
                    )}
                  </View>
                </View>

                {pendingAppointment && (
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.appointmentText}>
                      🗓️ {pendingAppointment.date} • {pendingAppointment.time}
                    </Text>
                    <Text style={styles.statusLabel}>في انتظار الموافقة</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <AppointmentForm
          visible={showAppointmentForm}
          onClose={() => {
            setShowAppointmentForm(false);
            setSelectedUser(null);
          }}
          onSubmit={handleAppointmentSubmit}
          selectedSpecialist={selectedUser}
        />
      </View>
    );
  }

  const pendingAppointments = appointments.filter((apt) => apt.status === 'pending');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity onPress={onBack} activeOpacity={0.7}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>
          {activeTab === 'appointments'
            ? 'طلبات المواعيد'
            : activeTab === 'patients'
            ? 'قائمة المرضى'
            : 'قائمة الأطباء'}
        </Text>
        <View style={{ width: 20 }} />
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'appointments' && styles.activeTab]}
          onPress={() => setActiveTab('appointments')}
        >
          <Text style={[styles.tabText, activeTab === 'appointments' && styles.activeTabText]}>
            المواعيد {pendingAppointments.length > 0 && `(${pendingAppointments.length})`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'patients' && styles.activeTab]}
          onPress={() => setActiveTab('patients')}
        >
          <Text style={[styles.tabText, activeTab === 'patients' && styles.activeTabText]}>
            المرضى ({approvedPatients.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'specialists' && styles.activeTab]}
          onPress={() => setActiveTab('specialists')}
        >
          <Text style={[styles.tabText, activeTab === 'specialists' && styles.activeTabText]}>
            الأطباء
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === 'appointments' && (
          <>
            {pendingAppointments.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>📅</Text>
                <Text style={styles.emptyText}>لا توجد طلبات مواعيد حالياً</Text>
              </View>
            ) : (
              pendingAppointments.map((appointment) => (
                <View key={appointment.id} style={styles.appointmentCard}>
                  <View style={styles.appointmentHeader}>
                    <View style={styles.patientInfo}>
                      <Text style={styles.patientName}>{appointment.patientName}</Text>
                      <Text style={styles.patientCondition}>{appointment.condition}</Text>
                    </View>
                    <View style={styles.appointmentAvatar}>
                      <Text style={styles.appointmentAvatarText}>🧑‍🤝‍🧑</Text>
                    </View>
                  </View>

                  <View style={styles.appointmentDetails}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailText}>📅 {appointment.date}</Text>
                      <Text style={styles.detailText}>🕐 {appointment.time}</Text>
                    </View>
                    <View style={styles.sessionTypeBadge}>
                      <Text style={styles.sessionTypeText}>
                        {appointment.sessionType === 'video' && '📹 مكالمة فيديو'}
                        {appointment.sessionType === 'voice' && '🎤 جلسة صوتية'}
                        {appointment.sessionType === 'text' && '💬 جلسة نصية'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.appointmentActions}>
                    <TouchableOpacity
                      style={styles.rejectButton}
                      onPress={() => handleAppointmentAction(appointment.id, 'reject')}
                    >
                      <Text style={styles.rejectText}>رفض</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.approveButton}
                      onPress={() => handleAppointmentAction(appointment.id, 'approve')}
                    >
                      <Text style={styles.approveText}>قبول</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}

            {appointments.filter((apt) => apt.status !== 'pending').length > 0 && (
              <>
                <Text style={styles.sectionTitle}>المواعيد السابقة</Text>
                {appointments
                  .filter((apt) => apt.status !== 'pending')
                  .map((appointment) => (
                    <View key={appointment.id} style={styles.pastAppointmentCard}>
                      <Text style={styles.pastPatientName}>{appointment.patientName}</Text>
                      <Text style={styles.pastDetails}>
                        {appointment.date} • {appointment.time}
                      </Text>
                      <View
                        style={[
                          styles.statusBadgeSmall,
                          appointment.status === 'approved' ? styles.approvedBadge : styles.rejectedBadge,
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusTextSmall,
                            appointment.status === 'approved' ? styles.approvedText : styles.rejectedText,
                          ]}
                        >
                          {appointment.status === 'approved' ? '✓ تم القبول' : '✕ تم الرفض'}
                        </Text>
                      </View>
                    </View>
                  ))}
              </>
            )}
          </>
        )}

        {activeTab === 'patients' && (
          <>
            {approvedPatients.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>🧑‍🤝‍🧑</Text>
                <Text style={styles.emptyText}>لا توجد مرضى مقبولين حالياً</Text>
              </View>
            ) : (
              approvedPatients.map((patient) => (
                <TouchableOpacity
                  key={patient.id}
                  style={styles.card}
                  onPress={() => setSelectedUser(patient)}
                >
                  <View style={styles.avatar}>
                    <Text style={styles.avatarIcon}>🧑‍🤝‍🧑</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.userName}>{patient.name}</Text>
                    <Text style={styles.userInfo}>{patient.condition}</Text>
                  </View>
                  <Text style={styles.chatButton}>💬</Text>
                </TouchableOpacity>
              ))
            )}
          </>
        )}

        {activeTab === 'specialists' && (
          <>
            {specialists.map((specialist) => (
              <TouchableOpacity
                key={specialist.id}
                style={styles.card}
                onPress={() => setSelectedUser(specialist)}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarIcon}>👨‍⚕️</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.userName}>{specialist.name}</Text>
                  <Text style={styles.userInfo}>{specialist.specialty}</Text>
                </View>
                <Text style={styles.chatButton}>💬</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
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
    borderBottomColor: '#E8ECF0',
  },
  backArrow: {
    fontSize: 26,
    color: '#0891B2',
    fontWeight: '700',
    lineHeight: 30,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: 0.2,
    lineHeight: 28,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 12,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
    lineHeight: 18,
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerAvatarText: {
    fontSize: 24,
    lineHeight: 24,
  },
  statusBanner: {
    backgroundColor: '#FEF3C7',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FDE68A',
  },
  statusText: {
    textAlign: 'center',
    color: '#92400E',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    margin: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
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
    color: '#64748B',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 20,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8ECF0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    width: '100%',
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
  avatarIcon: {
    fontSize: 28,
  },
  infoContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#1F2937',
    letterSpacing: 0.2,
  },
  specialty: {
    color: '#6B7280',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
  },
  userInfo: {
    color: '#6B7280',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 2,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  metaText: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '600',
    marginRight: 8,
  },
  actionContainer: {
    marginRight: 12,
  },
  chatBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#10B981',
  },
  chatIcon: {
    fontSize: 24,
  },
  chatButton: {
    fontSize: 24,
    color: '#0891B2',
  },
  pendingBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  pendingText: {
    fontSize: 24,
  },
  bookBadge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#0891B2',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  bookText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  appointmentInfo: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  statusLabel: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '700',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#F59E0B',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  appointmentHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 16,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },
  patientCondition: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  appointmentAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  appointmentAvatarText: {
    fontSize: 28,
  },
  appointmentDetails: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '600',
  },
  sessionTypeBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  sessionTypeText: {
    fontSize: 13,
    color: '#0C4A6E',
    fontWeight: '700',
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  approveButton: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  approveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#FEE2E2',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#EF4444',
  },
  rejectText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 12,
  },
  pastAppointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pastPatientName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  pastDetails: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 8,
  },
  statusBadgeSmall: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  approvedBadge: {
    backgroundColor: '#D1FAE5',
  },
  rejectedBadge: {
    backgroundColor: '#FEE2E2',
  },
  statusTextSmall: {
    fontSize: 12,
    fontWeight: '700',
  },
  approvedText: {
    color: '#059669',
  },
  rejectedText: {
    color: '#DC2626',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  chatContent: {
    paddingHorizontal: 18,
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#0891B2',
  },
  profileEmoji: {
    fontSize: 40,
  },
  userStatus: {
    color: '#059669',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginLeft: 6,
  },
  onlineText: {
    color: '#059669',
    fontSize: 13,
    fontWeight: '700',
  },
  messageWrapper: {
    marginVertical: 6,
  },
  userMessageWrapper: {
    alignItems: 'flex-start',
  },
  otherMessageWrapper: {
    alignItems: 'flex-end',
  },
  chatBubble: {
    maxWidth: '75%',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#0891B2',
    borderTopLeftRadius: 6,
  },
  otherBubble: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 6,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  chatText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  userText: {
    color: '#FFFFFF',
    textAlign: 'right',
    fontWeight: '500',
  },
  otherText: {
    color: '#1F2937',
    textAlign: 'right',
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 11,
    fontWeight: '600',
  },
  userTimestamp: {
    color: '#BFDBFE',
    textAlign: 'right',
  },
  otherTimestamp: {
    color: '#9CA3AF',
    textAlign: 'right',
  },
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
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
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
    fontSize: 22,
  },
});