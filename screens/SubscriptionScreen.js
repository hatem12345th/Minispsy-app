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
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0077BE',
    textAlign: 'center',
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0077BE',
    textAlign: 'right',
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'right',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#E8F4FA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  planRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  planRowLast: {
    marginBottom: 0,
  },
  planInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconText: {
    fontSize: 40,
  },
  planDetails: {
    alignItems: 'flex-end',
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'right',
  },
  planSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'right',
  },
  annualInfo: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  annualTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0077BE',
    textAlign: 'right',
    marginBottom: 8,
  },
  annualPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'right',
    marginBottom: 8,
  },
  commissionText: {
    fontSize: 18,
    color: '#0077BE',
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    gap: 15,
  },
  button: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0077BE',
  },
});