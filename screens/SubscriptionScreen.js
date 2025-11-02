import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function SubscriptionScreen({ onBack, onPayment }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>خطة الاشتراك</Text>
      </View>

      {/* Monthly Subscription Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>الاشتراك الشهري</Text>
        
        <View style={styles.card}>
          {/* Gold Card */}
          <View style={styles.planRow}>
            <View style={styles.planInfo}>
              <Text style={styles.iconText}>💰</Text>
              <View style={styles.planDetails}>
                <Text style={styles.planName}>البطاقة الذهبية</Text>
                <Text style={styles.planSubtext}>المزايا</Text>
              </View>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>9000 دج</Text>
            </View>
          </View>

          {/* Silver Card */}
          <View style={[styles.planRow, styles.planRowLast]}>
            <View style={styles.planInfo}>
              <Text style={styles.iconText}>💰</Text>
              <View style={styles.planDetails}>
                <Text style={styles.planName}>البطاقة الفضية</Text>
                <Text style={styles.planSubtext}>المزايا</Text>
              </View>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>7000 دج</Text>
            </View>
          </View>
        </View>

        {/* Annual Subscription Info */}
        <View style={styles.annualInfo}>
          <Text style={styles.annualTitle}>الاشتراك السنوي</Text>
          <Text style={styles.annualPrice}>84000دج</Text>
          <Text style={styles.commissionText}>بدون اشتراك فقط عمولة 40%</Text>
        </View>
      </View>

      {/* Master & PhD Section */}
      <View style={styles.section}>
        <Text style={styles.categoryTitle}>فئة الدكاترة والماستر</Text>
        
        <View style={styles.card}>
          {/* Gold Card */}
          <View style={styles.planRow}>
            <View style={styles.planInfo}>
              <Text style={styles.iconText}>💰</Text>
              <View style={styles.planDetails}>
                <Text style={styles.planName}>البطاقة الذهبية</Text>
                <Text style={styles.planSubtext}>المزايا</Text>
              </View>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>20000 دج</Text>
            </View>
          </View>

          {/* Silver Card */}
          <View style={[styles.planRow, styles.planRowLast]}>
            <View style={styles.planInfo}>
              <Text style={styles.iconText}>💰</Text>
              <View style={styles.planDetails}>
                <Text style={styles.planName}>البطاقة الفضية</Text>
                <Text style={styles.planSubtext}>المزايا</Text>
              </View>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>15000 دج</Text>
            </View>
          </View>
        </View>

        {/* Annual Subscription Info */}
        <View style={styles.annualInfo}>
          <Text style={styles.annualTitle}>الاشتراك السنوي</Text>
          <Text style={styles.annualPrice}>126000دج</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={onPayment}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>← الدفع</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>رجوع →</Text>
        </TouchableOpacity>
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
    padding: 20,
    paddingBottom: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 36,
    marginTop: 32,
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0E7490',
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(8, 145, 178, 0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  section: {
    marginBottom: 48,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0E7490',
    textAlign: 'right',
    marginBottom: 20,
    letterSpacing: 0.2,
    paddingHorizontal: 4,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'right',
    marginBottom: 20,
    letterSpacing: 0.2,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E8ECF0',
    overflow: 'hidden',
  },
  planRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    paddingTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
  },
  planRowLast: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  planInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  iconText: {
    fontSize: 40,
    lineHeight: 40,
  },
  planDetails: {
    alignItems: 'flex-end',
    flex: 1,
  },
  planName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'right',
    letterSpacing: 0.1,
    lineHeight: 26,
  },
  planSubtext: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'right',
    marginTop: 6,
    fontWeight: '500',
    lineHeight: 20,
  },
  priceContainer: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  price: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0E7490',
    textAlign: 'right',
    letterSpacing: 0.2,
    lineHeight: 32,
  },
  annualInfo: {
    alignItems: 'flex-end',
    marginBottom: 8,
    backgroundColor: '#E0F2FE',
    borderRadius: 18,
    padding: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  annualTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0E7490',
    textAlign: 'right',
    marginBottom: 8,
    letterSpacing: 0.2,
    lineHeight: 28,
  },
  annualPrice: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0E7490',
    textAlign: 'right',
    marginBottom: 8,
    letterSpacing: 0.3,
    lineHeight: 36,
  },
  commissionText: {
    fontSize: 16,
    color: '#0E7490',
    textAlign: 'right',
    fontWeight: '600',
    lineHeight: 22,
    opacity: 0.95,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    gap: 12,
    paddingHorizontal: 4,
  },
  button: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#0891B2',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0891B2',
    letterSpacing: 0.2,
    lineHeight: 24,
  },
});