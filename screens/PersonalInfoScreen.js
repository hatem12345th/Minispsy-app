import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../styles/styles';

export default function PersonalInfoScreen({ onNext }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [state, setState] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.personalInfoContainer}>
      <Text style={styles.personalInfoTitle}>المعلومات الشخصية</Text>

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="الاسم"
          placeholderTextColor="#999"
          value={firstName}
          onChangeText={setFirstName}
          textAlign="right"
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="اللقب"
          placeholderTextColor="#999"
          value={lastName}
          onChangeText={setLastName}
          textAlign="right"
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="تاريخ الميلاد"
        placeholderTextColor="#999"
        value={birthDate}
        onChangeText={setBirthDate}
        textAlign="right"
      />

      <TextInput
        style={styles.input}
        placeholder="رقم الهاتف"
        placeholderTextColor="#999"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        textAlign="right"
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="الجنس"
        placeholderTextColor="#999"
        value={gender}
        onChangeText={setGender}
        textAlign="right"
      />

      <TextInput
        style={styles.input}
        placeholder="الولاية"
        placeholderTextColor="#999"
        value={state}
        onChangeText={setState}
        textAlign="right"
      />

      <TouchableOpacity 
        style={styles.nextButton}
        onPress={onNext}
      >
        <Text style={styles.nextButtonText}>التالي</Text>
        <Text style={styles.arrow}>←</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}