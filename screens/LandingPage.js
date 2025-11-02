import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';

const LandingPage = ({ onContinue }) => {
  const openSocialMedia = (url) => {
    Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/5773649696667667267.jpg')} // You'll need to add your logo
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Welcome Text */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTextArabic}>مرحباً بك في منصة</Text>
        <Text style={styles.brandName}>MINAPSY</Text>
      </View>

      {/* Social Media Icons */}
      <View style={styles.socialContainer}>
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => openSocialMedia('https://www.instagram.com/minapsy')}
          activeOpacity={0.7}
        >
          <Text style={styles.socialIcon}>📷</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => openSocialMedia('https://www.facebook.com/minapsy')}
          activeOpacity={0.7}
        >
          <Text style={styles.socialIcon}>📘</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => openSocialMedia('https://www.linkedin.com/company/minapsy')}
          activeOpacity={0.7}
        >
          <Text style={styles.socialIcon}>💼</Text>
        </TouchableOpacity>
      </View>

      {/* Login Message */}
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          يرجى تسجيل الدخول للوصول إلى خدمتنا
        </Text>
      </View>

      {/* Continue Button (Optional - auto-navigate after delay) */}
      {onContinue && (
        <TouchableOpacity style={styles.continueButton} onPress={onContinue} activeOpacity={0.7}>
          <Text style={styles.continueButtonText}>ابدأ الآن</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 72,
    paddingHorizontal: 28,
  },
  logoContainer: {
    marginTop: 56,
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: -60,
  },
  welcomeTextArabic: {
    fontSize: 28,
    color: '#0E7490',
    textAlign: 'center',
    marginBottom: 14,
    fontWeight: '700',
    letterSpacing: 0.4,
    lineHeight: 36,
  },
  brandName: {
    fontSize: 40,
    fontWeight: '800',
    color: '#0E7490',
    letterSpacing: 3.5,
    textShadowColor: 'rgba(8, 145, 178, 0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    lineHeight: 48,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 28,
    marginTop: 24,
  },
  socialButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#E8ECF0',
  },
  socialIcon: {
    fontSize: 32,
    lineHeight: 32,
  },
  messageContainer: {
    marginTop: 48,
    paddingHorizontal: 32,
  },
  messageText: {
    fontSize: 18,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#0891B2',
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 24,
    marginTop: 28,
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
    overflow: 'hidden',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.6,
    lineHeight: 26,
  },
});

export default LandingPage;