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
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    padding: 28,
    paddingBottom: 74,
  },
  header: {
    alignItems: 'center',
    marginBottom: 44,
    marginTop: 40,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(8, 145, 178, 0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
    lineHeight: 44,
  },
  section: {
    marginBottom: 52,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0C4A6E',
    textAlign: 'right',
    marginBottom: 24,
    letterSpacing: 0.3,
    paddingHorizontal: 6,
  },
  categoryTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'right',
    marginBottom: 24,
    letterSpacing: 0.3,
    paddingHorizontal: 6,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 28,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 28,
    elevation: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  planRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 24,
    paddingTop: 6,
    borderBottomWidth: 1.5,
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
    gap: 18,
    flex: 1,
  },
  iconText: {
    fontSize: 44,
    lineHeight: 44,
  },
  planDetails: {
    alignItems: 'flex-end',
    flex: 1,
  },
  planName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'right',
    letterSpacing: 0.2,
    lineHeight: 28,
  },
  planSubtext: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'right',
    marginTop: 8,
    fontWeight: '500',
    lineHeight: 22,
  },
  priceContainer: {
    alignItems: 'flex-end',
    marginLeft: 14,
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0C4A6E',
    textAlign: 'right',
    letterSpacing: 0.3,
    lineHeight: 34,
  },
  annualInfo: {
    alignItems: 'flex-end',
    marginBottom: 12,
    backgroundColor: '#E0F2FE',
    borderRadius: 26,
    padding: 28,
    marginTop: 20,
    borderWidth: 1.5,
    borderColor: '#BAE6FD',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 5,
  },
  annualTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0C4A6E',
    textAlign: 'right',
    marginBottom: 10,
    letterSpacing: 0.3,
    lineHeight: 30,
  },
  annualPrice: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0C4A6E',
    textAlign: 'right',
    marginBottom: 10,
    letterSpacing: 0.4,
    lineHeight: 40,
  },
  commissionText: {
    fontSize: 17,
    color: '#0C4A6E',
    textAlign: 'right',
    fontWeight: '600',
    lineHeight: 24,
    opacity: 0.95,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 36,
    gap: 14,
    paddingHorizontal: 6,
  },
  button: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 22,
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 2.5,
    borderColor: '#0891B2',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 19,
    fontWeight: '700',
    color: '#0891B2',
    letterSpacing: 0.3,
    lineHeight: 26,
  },
});