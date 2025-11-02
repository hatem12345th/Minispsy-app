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
    padding: 24,
    paddingBottom: 60,
    backgroundColor: '#F5F7FA',
    marginTop: 56,
    flexGrow: 1,
  },
  title: {
    fontSize: 30,
    color: '#0E7490',
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 20,
    letterSpacing: 0.4,
    textShadowColor: 'rgba(8, 145, 178, 0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    lineHeight: 38,
  },
  subtitle: {
    color: '#0E7490',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '600',
    letterSpacing: 0.2,
    lineHeight: 26,
  },
  sectionTitle: {
    color: '#0E7490',
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 20,
    marginTop: 12,
    letterSpacing: 0.2,
    lineHeight: 30,
  },
  list: {
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E8ECF0',
    overflow: 'hidden',
  },
  listItem: {
    fontSize: 16,
    color: '#111827',
    lineHeight: 26,
    marginBottom: 12,
    fontWeight: '500',
    textAlign: 'right',
  },
  backButton: {
    alignSelf: 'center',
    marginTop: 10,
  },
  backText: {
    color: '#0891B2',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
});
