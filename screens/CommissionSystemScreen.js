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
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    color: '#007ACC',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    color: '#007ACC',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
  },
  sectionTitle: {
    color: '#007ACC',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  list: {
    marginBottom: 25,
  },
  listItem: {
    fontSize: 16,
    color: '#333',
    lineHeight: 26,
    marginBottom: 5,
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
