import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      onLogin();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تسجيل الدخول</Text>

      <TextInput
        style={styles.input}
        placeholder="البريد الإلكتروني / رقم الهاتف"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        textAlign="right"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="كلمة المرور"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        textAlign="right"
        secureTextEntry
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>تسجيل الدخول</Text>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>هل نسيت كلمة المرور؟</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signupContainer}>
        <TouchableOpacity>
          <Text style={styles.signupText}>ليس لديك حساب؟ سجل الآن.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}