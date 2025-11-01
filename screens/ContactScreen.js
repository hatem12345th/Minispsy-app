import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';

export default function ContactScreen({ onBack }) {
  const [message, setMessage] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backArrow}>→</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>التواصل</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <Text style={styles.profileEmoji}>👨‍⚕️</Text>
          </View>
          <View style={styles.onlineIndicator} />
        </View>
        <Text style={styles.profileName}>د. أحمد محمد</Text>
        <Text style={styles.profileSpecialty}>أخصائي نفسي</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionButtonContent}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>📞</Text>
            </View>
            <Text style={styles.actionButtonLabel}>مكالمة صوتية</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionButtonContent}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>📹</Text>
            </View>
            <Text style={styles.actionButtonLabel}>مكالمة فيديو</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Message Section */}
      <View style={styles.messageSection}>
        <Text style={styles.messageSectionTitle}>إرسال رسالة</Text>
        
        <View style={styles.messageCard}>
          <TextInput
            style={styles.messageInput}
            placeholder="اكتب رسالتك هنا..."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={6}
            textAlign="right"
          />
          
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendButtonText}>إرسال</Text>
            <Text style={styles.sendIcon}>✈️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contact Info */}
      <View style={styles.contactInfoSection}>
        <Text style={styles.contactInfoTitle}>معلومات الاتصال</Text>
        
        <View style={styles.contactInfoCard}>
          <View style={styles.contactInfoRow}>
            <Text style={styles.contactInfoValue}>+213 555 123 456</Text>
            <View style={styles.contactInfoLabel}>
              <Text style={styles.contactInfoIcon}>📱</Text>
              <Text style={styles.contactInfoText}>الهاتف</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.contactInfoRow}>
            <Text style={styles.contactInfoValue}>doctor@minapsy.dz</Text>
            <View style={styles.contactInfoLabel}>
              <Text style={styles.contactInfoIcon}>✉️</Text>
              <Text style={styles.contactInfoText}>البريد الإلكتروني</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.contactInfoRow}>
            <Text style={styles.contactInfoValue}>متاح الآن</Text>
            <View style={styles.contactInfoLabel}>
              <Text style={styles.contactInfoIcon}>🕐</Text>
              <Text style={styles.contactInfoText}>الحالة</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.quickActionsTitle}>إجراءات سريعة</Text>
        
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={styles.quickActionCard}>
            <Text style={styles.quickActionIcon}>📅</Text>
            <Text style={styles.quickActionText}>حجز موعد</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionCard}>
            <Text style={styles.quickActionIcon}>📋</Text>
            <Text style={styles.quickActionText}>السجل الطبي</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionCard}>
            <Text style={styles.quickActionIcon}>⭐</Text>
            <Text style={styles.quickActionText}>تقييم</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionCard}>
            <Text style={styles.quickActionIcon}>📤</Text>
            <Text style={styles.quickActionText}>مشاركة</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    fontSize: 24,
    color: '#0077BE',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  placeholder: {
    width: 40,
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F4FA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#0077BE',
  },
  profileEmoji: {
    fontSize: 50,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  profileSpecialty: {
    fontSize: 16,
    color: '#666',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: '#fff',
    gap: 15,
  },
  actionButton: {
    flex: 1,
  },
  actionButtonContent: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E8F4FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconText: {
    fontSize: 32,
  },
  actionButtonLabel: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '600',
    textAlign: 'center',
  },
  messageSection: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  messageSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'right',
    marginBottom: 15,
  },
  messageCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageInput: {
    height: 120,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  sendButton: {
    flexDirection: 'row-reverse',
    backgroundColor: '#0077BE',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sendIcon: {
    fontSize: 20,
  },
  contactInfoSection: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  contactInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'right',
    marginBottom: 15,
  },
  contactInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  contactInfoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  contactInfoIcon: {
    fontSize: 20,
  },
  contactInfoText: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600',
  },
  contactInfoValue: {
    fontSize: 16,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: 5,
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 20,
  },
  quickActionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'right',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  quickActionCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  quickActionText: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '600',
    textAlign: 'center',
  },
});