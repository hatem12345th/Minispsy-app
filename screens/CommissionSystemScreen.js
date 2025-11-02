import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, I18nManager } from 'react-native';

// Enable Right-to-Left layout for Arabic
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function CommissionSystemScreen({ onBack }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ماهو نظام العمولة؟</Text>

      <Text style={styles.subtitle}>الانضمام إلى MINAPSY بنظام العمولة</Text>

      <Text style={styles.sectionTitle}>المزايا</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• الوصول إلى عدد كبير من المفحوصين عبر المنصة.</Text>
        <Text style={styles.listItem}>• لا يوجد اشتراك شهري أو سنوي.</Text>
        <Text style={styles.listItem}>• إمكانية بناء قاعدة وسمعة إيجابية لزيادة عدد الجلسات.</Text>
        <Text style={styles.listItem}>• حرية اختيار الأوقات والتواصل مع المفحوصين.</Text>
      </View>

      <Text style={styles.sectionTitle}>الشروط</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          • يتم أخذ نسبة 40٪ من قيمة كل جلسة لصالح المنصة.
        </Text>
        <Text style={styles.listItem}>
          • الأرباح تدخل أولًا إلى حساب Minapsy ثم يتم تحويل نسبة 60٪ من المبلغ كل شهر.
        </Text>
        <Text style={styles.listItem}>
          • يجب احترام مواعيد الجلسات وفي حالة التماطل والإلغاء المتكرر من طرفك قد يتم تعليق حسابك.
        </Text>
        <Text style={styles.listItem}>
          • كل الجلسات تتم عبر المنصة.
        </Text>
      </View>

    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    paddingBottom: 74,
    backgroundColor: '#F8FAFC',
    marginTop: 64,
    flexGrow: 1,
  },
  title: {
    fontSize: 34,
    color: '#0F172A',
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 28,
    letterSpacing: 0.4,
    textShadowColor: 'rgba(8, 145, 178, 0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
    lineHeight: 42,
  },
  subtitle: {
    color: '#0C4A6E',
    fontSize: 19,
    textAlign: 'center',
    marginBottom: 36,
    fontWeight: '600',
    letterSpacing: 0.3,
    lineHeight: 28,
  },
  sectionTitle: {
    color: '#0C4A6E',
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 24,
    marginTop: 14,
    letterSpacing: 0.3,
    lineHeight: 32,
  },
  list: {
    marginBottom: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 28,
    elevation: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  listItem: {
    fontSize: 17,
    color: '#1F2937',
    lineHeight: 28,
    marginBottom: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
  backButton: {
    alignSelf: 'center',
    marginTop: 12,
  },
  backText: {
    color: '#0891B2',
    fontSize: 19,
    fontWeight: '700',
    lineHeight: 26,
  },
});
