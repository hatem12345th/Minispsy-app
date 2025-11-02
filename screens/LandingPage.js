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
    backgroundColor: '#F8FAFC',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 88,
    paddingHorizontal: 36,
  },
  logoContainer: {
    marginTop: 72,
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 16,
    borderWidth: 5,
    borderColor: '#FFFFFF',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: -72,
  },
  welcomeTextArabic: {
    fontSize: 32,
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 18,
    fontWeight: '700',
    letterSpacing: 0.4,
    lineHeight: 40,
  },
  brandName: {
    fontSize: 48,
    fontWeight: '800',
    color: '#0891B2',
    letterSpacing: 4.5,
    textShadowColor: 'rgba(8, 145, 178, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
    lineHeight: 56,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 36,
    marginTop: 32,
  },
  socialButton: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 22,
    elevation: 12,
    borderWidth: 2.5,
    borderColor: '#E2E8F0',
  },
  socialIcon: {
    fontSize: 36,
    lineHeight: 36,
  },
  messageContainer: {
    marginTop: 56,
    paddingHorizontal: 40,
  },
  messageText: {
    fontSize: 18.5,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 32,
    fontWeight: '600',
    opacity: 0.95,
  },
  continueButton: {
    backgroundColor: '#0891B2',
    paddingVertical: 24,
    paddingHorizontal: 96,
    borderRadius: 28,
    marginTop: 36,
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 14,
    overflow: 'hidden',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: 0.8,
    lineHeight: 30,
  },
});

export default LandingPage;