import { Text, View, TouchableOpacity, Linking } from 'react-native';
import { styles } from '../styles/styles';

export default function WelcomeScreen({ onNavigateToPersonalInfo, onLogout ,onGoToContact}) {
  const openSocialMedia = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.welcomeContainer}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>🌳</Text>
        </View>
        <Text style={styles.logoName}>Minapsy</Text>
      </View>

      <Text style={styles.welcomeTitle}>مرحبًا بك في منصة</Text>
      <Text style={styles.welcomeBrand}>MINAPSY</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => openSocialMedia('https://instagram.com')}
        >
          <Text style={styles.socialIcon}>📷</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => openSocialMedia('https://facebook.com')}
        >
          <Text style={styles.socialIcon}>f</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => openSocialMedia('https://linkedin.com')}
        >
          <Text style={styles.socialIcon}>in</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={onNavigateToPersonalInfo}>
          <Text style={styles.loginLink}>الذهاب إلى المعلومات الشخصية</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onGoToContact}>
          <Text style={styles.loginLink}>الذهاب إلى المحادثة 💬</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.loginLink}>يرجى تسجيل الدخول للوصول إلى خدمتنا</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}