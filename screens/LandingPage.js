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
        >
          <Text style={styles.socialIcon}>📷</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => openSocialMedia('https://www.facebook.com/minapsy')}
        >
          <Text style={styles.socialIcon}>📘</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => openSocialMedia('https://www.linkedin.com/company/minapsy')}
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
        <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
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
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
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
    color: '#0891B2',
    textAlign: 'center',
    marginBottom: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  brandName: {
    fontSize: 42,
    fontWeight: '800',
    color: '#0891B2',
    letterSpacing: 3.5,
    textShadowColor: 'rgba(8, 145, 178, 0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
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
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  socialIcon: {
    fontSize: 32,
  },
  messageContainer: {
    marginTop: 48,
    paddingHorizontal: 32,
  },
  messageText: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#0891B2',
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginTop: 28,
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 0,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});

export default LandingPage;