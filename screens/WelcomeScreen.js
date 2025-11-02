import { Text, View, TouchableOpacity, Linking } from 'react-native';
import { styles } from '../styles/styles';

export default function WelcomeScreen({ onNavigateToPersonalInfo, onGoToContact, onLogout, userType }) {
  const openSocialMedia = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.welcomeContainer}>
      {/* 🌳 Logo Section */}
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>🌳</Text>
        </View>
        <Text style={styles.logoName}>Minapsy</Text>
      </View>

      {/* 🖐 Welcome Message */}
      <Text style={styles.welcomeTitle}>مرحبًا بك في منصة</Text>
      <Text style={styles.welcomeBrand}>MINAPSY</Text>

      {/* 🔗 Social Links */}
      <View style={styles.socialContainer}>
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => openSocialMedia('https://instagram.com')}
          activeOpacity={0.7}
        >
          <Text style={styles.socialIcon}>📷</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => openSocialMedia('https://facebook.com')}
          activeOpacity={0.7}
        >
          <Text style={styles.socialIcon}>f</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => openSocialMedia('https://linkedin.com')}
          activeOpacity={0.7}
        >
          <Text style={styles.socialIcon}>in</Text>
        </TouchableOpacity>
      </View>

      {/* 🔘 Navigation Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={onNavigateToPersonalInfo} activeOpacity={0.7}>
          <Text style={styles.loginLink}>تغيير معلوماتي الشخصية 🧾</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onGoToContact} activeOpacity={0.7}>
          <Text style={styles.loginLink}>الذهاب إلى المحادثة 💬</Text>
        </TouchableOpacity>

        {userType === 'specialist' && (
          <TouchableOpacity onPress={() => alert('صفحة الإحصائيات قادمة قريبًا 📊')} activeOpacity={0.7}>
            <Text style={styles.loginLink}>عرض الإحصائيات</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={onLogout} activeOpacity={0.7}>
          <Text style={[styles.loginLink, { color: '#DC2626' }]}>
            تسجيل الخروج 🔒
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
