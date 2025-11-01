import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import PersonalInfoScreen from './screens/PersonalInfoScreen';
import ContactScreen from './screens/ContactScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <>
      <StatusBar style="dark" />
      {currentPage === 'login' && (
        <LoginScreen onLogin={() => setCurrentPage('welcome')} />
      )}
      {currentPage === 'welcome' && (
        <WelcomeScreen 
          onNavigateToPersonalInfo={() => setCurrentPage('personalInfo')}
          onLogout={() => setCurrentPage('login')}
          onGoToContact={() => setCurrentPage('contact')}
        />
      )}
      {currentPage === 'personalInfo' && (
        <SubscriptionScreen 
          onBack={() => setCurrentPage('welcome')}
          onPayment={() => {
            // Handle payment logic here
            console.log('Payment pressed');
          }}
        />
      )}
      {currentPage === 'subscription' && (
        <SubscriptionScreen 
          onBack={() => setCurrentPage('personalInfo')}
          onPayment={() => {
            // Handle payment logic here
            console.log('Payment pressed');
          }}
        />
      )}
      {currentPage === 'contact' && (
  <ContactScreen 
    onBack={() => setCurrentPage('welcome')}
  />
)}
    </>
  );
}