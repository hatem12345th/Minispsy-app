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
        >
          <Text style={styles.buttonText}>← الدفع</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={onBack}
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
    padding: 24,
    paddingBottom: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 28,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0891B2',
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(8, 145, 178, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  section: {
    marginBottom: 44,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0891B2',
    textAlign: 'right',
    marginBottom: 24,
    letterSpacing: 0.3,
  },
  categoryTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'right',
    marginBottom: 24,
    letterSpacing: 0.3,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  planRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: '#E5E7EB',
  },
  planRowLast: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  planInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  iconText: {
    fontSize: 44,
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
  },
  planSubtext: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'right',
    marginTop: 4,
    fontWeight: '500',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0891B2',
    textAlign: 'right',
    letterSpacing: 0.3,
  },
  annualInfo: {
    alignItems: 'flex-end',
    marginBottom: 12,
    backgroundColor: '#E0F2FE',
    borderRadius: 16,
    padding: 18,
    marginTop: 8,
    borderWidth: 1.5,
    borderColor: '#B6E6F8',
  },
  annualTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0891B2',
    textAlign: 'right',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  annualPrice: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0891B2',
    textAlign: 'right',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  commissionText: {
    fontSize: 18,
    color: '#0891B2',
    textAlign: 'right',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
    gap: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#0891B2',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontSize: 19,
    fontWeight: '700',
    color: '#0891B2',
    letterSpacing: 0.3,
  },
});