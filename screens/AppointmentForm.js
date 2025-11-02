import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';

export default function AppointmentForm({ visible, onClose, onSubmit, selectedSpecialist }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [sessionType, setSessionType] = useState('');
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showSessionType, setShowSessionType] = useState(false);

  const dates = ['2025-11-03', '2025-11-04', '2025-11-05', '2025-11-06', '2025-11-07'];
  const times = ['09:00 ص', '10:00 ص', '11:00 ص', '02:00 م', '03:00 م', '04:00 م'];
  const sessionTypes = [
    { id: 'text', label: 'جلسة نصية', icon: '💬' },
    { id: 'voice', label: 'جلسة صوتية', icon: '🎤' },
    { id: 'video', label: 'مكالمة فيديو', icon: '📹' },
  ];

  const handleSubmit = () => {
    if (!date || !time || !sessionType) {
      alert('الرجاء ملء جميع الحقول');
      return;
    }

    const appointment = {
      id: Date.now(),
      specialistId: selectedSpecialist.id,
      specialistName: selectedSpecialist.name,
      date,
      time,
      sessionType,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    onSubmit(appointment);
    
    // Reset form
    setDate('');
    setTime('');
    setSessionType('');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.backArrow}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>حجز موعد</Text>
          <View style={{ width: 20 }} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {selectedSpecialist && (
            <View style={styles.specialistInfo}>
              <Text style={styles.specialistIcon}>👨‍⚕️</Text>
              <Text style={styles.specialistName}>{selectedSpecialist.name}</Text>
              <Text style={styles.specialistSpecialty}>{selectedSpecialist.specialty}</Text>
            </View>
          )}

          {/* Date Picker */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowDatePicker(!showDatePicker)}
            activeOpacity={0.7}
          >
            <Text style={styles.label}>{date || 'اختر التاريخ'}</Text>
            <Text style={styles.icon}>📅</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <View style={styles.dropdown}>
              {dates.map((d) => (
                <TouchableOpacity
                  key={d}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setDate(d);
                    setShowDatePicker(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.dropdownText}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Time Picker */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowTimePicker(!showTimePicker)}
            activeOpacity={0.7}
          >
            <Text style={styles.label}>{time || 'اختر الوقت'}</Text>
            <Text style={styles.icon}>🕐</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <View style={styles.dropdown}>
              {times.map((t) => (
                <TouchableOpacity
                  key={t}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setTime(t);
                    setShowTimePicker(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.dropdownText}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Session Type */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowSessionType(!showSessionType)}
            activeOpacity={0.7}
          >
            <Text style={styles.label}>
              {sessionType 
                ? sessionTypes.find(s => s.id === sessionType)?.label 
                : 'اختر نوع الجلسة'}
            </Text>
            <Text style={styles.chevron}>{showSessionType ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {showSessionType && (
            <View style={styles.dropdown}>
              {sessionTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSessionType(type.id);
                    setShowSessionType(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.dropdownText}>
                    {type.icon} {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              💡 سيتم إرسال تأكيد الموعد بعد موافقة الأخصائي
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.7}>
            <Text style={styles.submitText}>تأكيد الحجز</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  specialistInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 28,
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1.5,
    borderColor: '#E8ECF0',
  },
  specialistIcon: {
    fontSize: 56,
    marginBottom: 12,
    lineHeight: 56,
  },
  specialistName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
    lineHeight: 28,
  },
  specialistSpecialty: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600',
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: 18,
    borderWidth: 1.5,
    borderColor: '#E8ECF0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
    lineHeight: 22,
  },
  icon: {
    fontSize: 24,
    marginLeft: 12,
    lineHeight: 24,
  },
  chevron: {
    fontSize: 16,
    color: '#0891B2',
    fontWeight: '700',
    marginLeft: 12,
    lineHeight: 20,
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    marginTop: -12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E8ECF0',
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
    textAlign: 'right',
    lineHeight: 22,
  },
  infoBox: {
    backgroundColor: '#E0F2FE',
    borderRadius: 18,
    padding: 18,
    marginTop: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    color: '#0C4A6E',
    textAlign: 'right',
    lineHeight: 20,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1.5,
    borderTopColor: '#E8ECF0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  submitButton: {
    backgroundColor: '#0891B2',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
    overflow: 'hidden',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
    lineHeight: 24,
  },
});