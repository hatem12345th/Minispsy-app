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
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  welcomeTextArabic: {
    fontSize: 24,
    color: '#2c5aa0',
    textAlign: 'center',
    marginBottom: 10,
  },
  brandName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c5aa0',
    letterSpacing: 2,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    marginTop: 20,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialIcon: {
    fontSize: 28,
  },
  messageContainer: {
    marginTop: 40,
    paddingHorizontal: 30,
  },
  messageText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  continueButton: {
    backgroundColor: '#2c5aa0',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LandingPage;