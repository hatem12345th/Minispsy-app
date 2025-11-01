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
    padding: 28,
    paddingBottom: 50,
    backgroundColor: '#F8FAFC',
    marginTop: 60,
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    color: '#0891B2',
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 16,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(8, 145, 178, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    color: '#0891B2',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  sectionTitle: {
    color: '#0891B2',
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 16,
    marginTop: 8,
    letterSpacing: 0.3,
  },
  list: {
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  listItem: {
    fontSize: 17,
    color: '#374151',
    lineHeight: 28,
    marginBottom: 10,
    fontWeight: '500',
  },
  backButton: {
    alignSelf: 'center',
    marginTop: 10,
  },
  backText: {
    color: '#007ACC',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
