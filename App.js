import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LandingPage from './screens/LandingPage'; // Import LandingPage
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import PersonalInfoScreen from './screens/PersonalInfoScreen';
import ContactScreen from './screens/ContactScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import CommissionSystemScreen from './screens/CommissionSystemScreen';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // Start with landing page
  const [userType, setUserType] = useState(null); 

  const renderScreen = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onContinue={() => setCurrentPage('login')} />;
      case 'login':
        return <LoginScreen onLogin={() => setCurrentPage('welcome')} onSignUp={() => setCurrentPage('signup')} />;
      case 'signup':
        return <SignUpScreen onSignUpSuccess={() => setCurrentPage('welcome')} onBack={() => setCurrentPage('login')} userType={userType} setUserType={setUserType} />;
      case 'welcome':
        return <WelcomeScreen />;
      case 'personalInfo':
        return <CommissionSystemScreen onBack={() => setCurrentPage('welcome')} />;
      case 'subscription':
        return <SubscriptionScreen />;
      case 'contact':
        return <ContactScreen userType={userType} />;
      default:
        return <LandingPage onContinue={() => setCurrentPage('login')} />;
    }
  };

  // Don't show the navbar on landing, login or signup screens
  const showNavbar = currentPage !== 'landing' && currentPage !== 'login' && currentPage !== 'signup';

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>{renderScreen()}</View>

      {showNavbar && (
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => setCurrentPage('welcome')} style={styles.navItem}>
            <Text style={[styles.navText, currentPage === 'welcome' && styles.active]}>
              🏠
            </Text>
            <Text style={[styles.navLabel, currentPage === 'welcome' && styles.activeText]}>
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setCurrentPage('personalInfo')} style={styles.navItem}>
            <Text style={[styles.navText, currentPage === 'personalInfo' && styles.active]}>
              👤
            </Text>
            <Text style={[styles.navLabel, currentPage === 'personalInfo' && styles.activeText]}>
              Info
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setCurrentPage('subscription')} style={styles.navItem}>
            <Text style={[styles.navText, currentPage === 'subscription' && styles.active]}>
              💳
            </Text>
            <Text style={[styles.navLabel, currentPage === 'subscription' && styles.activeText]}>
              Plan
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setCurrentPage('contact')} style={styles.navItem}>
            <Text style={[styles.navText, currentPage === 'contact' && styles.active]}>
              📞
            </Text>
            <Text style={[styles.navLabel, currentPage === 'contact' && styles.activeText]}>
              Contact
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setCurrentPage('landing')} style={styles.navItem}>
            <Text style={styles.navText}>🚪</Text>
            <Text style={styles.navLabel}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { flex: 1 },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 12,
    paddingBottom: 20,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: { 
    alignItems: 'center', 
    flex: 1,
    paddingVertical: 6,
    borderRadius: 12,
    marginHorizontal: 2,
  },
  navText: { 
    fontSize: 24,
    marginBottom: 4,
  },
  navLabel: { 
    fontSize: 11, 
    color: '#6B7280',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  active: { 
    color: '#0891B2',
    transform: [{ scale: 1.1 }],
  },
  activeText: { 
    color: '#0891B2', 
    fontWeight: '700',
    fontSize: 11,
  },
});