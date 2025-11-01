import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

const SignUpScreen = ({ onSignUpSuccess, onBack,userType,setUserType }) => {
  const [step, setStep] = useState(0);
  
  // Step 1: Personal Information
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [state, setState] = useState('');

  // Step 2: Account Information
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 3: Professional Information (Specialist only)
  const [specialization, setSpecialization] = useState('');
  const [qualification, setQualification] = useState('');
  const [hasCurrentJob, setHasCurrentJob] = useState(null);

  const validateUserType = () => {
    if (!userType) {
      Alert.alert('تنبيه', 'الرجاء اختيار نوع الحساب');
      return false;
    }
    return true;
  };

  const validateStep1 = () => {
    if (!title || !name || !birthDate || !phoneNumber || !gender || !state) {
      Alert.alert('تنبيه', 'الرجاء ملء جميع الحقول');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('تنبيه', 'الرجاء ملء جميع الحقول');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('خطأ', 'كلمة المرور غير متطابقة');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('خطأ', 'البريد الإلكتروني غير صحيح');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!specialization || !qualification) {
      Alert.alert('تنبيه', 'الرجاء ملء جميع الحقول المطلوبة');
      return false;
    }
    if (hasCurrentJob === null) {
      Alert.alert('تنبيه', 'الرجاء تحديد إذا كان لديك جهة عمل حالية');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 0 && validateUserType()) {
      setStep(1);
    } else if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      if (userType === 'specialist') {
        setStep(3);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const handleSubmit = () => {
    if (userType === 'specialist' && !validateStep3()) {
      return;
    }

    const formData = {
      userType,
      title,
      name,
      birthDate,
      phoneNumber,
      gender,
      state,
      email,
      password,
    };

    if (userType === 'specialist') {
      formData.specialization = specialization;
      formData.qualification = qualification;
      formData.hasCurrentJob = hasCurrentJob;
    }
    
    console.log('Form Data:', formData);
    Alert.alert(
      'نجح', 
      userType === 'patient' 
        ? 'تم التسجيل كمريض بنجاح!' 
        : 'تم التسجيل كأخصائي بنجاح!',
      [{ text: 'موافق', onPress: onSignUpSuccess }]
    );
  };

  const renderUserTypeSelection = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>اختر نوع الحساب</Text>
      <Text style={styles.subtitle}>يرجى تحديد نوع الحساب الذي تريد إنشاءه</Text>

      <TouchableOpacity
        style={[styles.userTypeCard, userType === 'patient' && styles.userTypeCardSelected]}
        onPress={() => setUserType('patient')}
      >
        <Text style={styles.userTypeIcon}>🏥</Text>
        <Text style={styles.userTypeTitle}>مريض</Text>
        <Text style={styles.userTypeDescription}>
          للحصول على الاستشارات الطبية وحجز المواعيد
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.userTypeCard, userType === 'specialist' && styles.userTypeCardSelected]}
        onPress={() => setUserType('specialist')}
      >
        <Text style={styles.userTypeIcon}>👨‍⚕️</Text>
        <Text style={styles.userTypeTitle}>أخصائي</Text>
        <Text style={styles.userTypeDescription}>
          لتقديم الخدمات الطبية وإدارة المواعيد
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.buttonText}>رجوع</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>التالي</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>المعلومات الشخصية</Text>
      <Text style={styles.userTypeBadge}>
        {userType === 'patient' ? '👤 مريض' : '👨‍⚕️ أخصائي'}
      </Text>

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <TextInput
            style={styles.input}
            placeholder="الاسم"
            value={name}
            onChangeText={setName}
            textAlign="right"
          />
        </View>
        <View style={styles.halfInput}>
          <TextInput
            style={styles.input}
            placeholder="اللقب"
            value={title}
            onChangeText={setTitle}
            textAlign="right"
          />
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="تاريخ الميلاد (YYYY-MM-DD)"
        value={birthDate}
        onChangeText={setBirthDate}
        textAlign="right"
      />

      <TextInput
        style={styles.input}
        placeholder="رقم الهاتف"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        textAlign="right"
      />

      <TextInput
        style={styles.input}
        placeholder="الجنس"
        value={gender}
        onChangeText={setGender}
        textAlign="right"
      />

      <TextInput
        style={styles.input}
        placeholder="الولاية"
        value={state}
        onChangeText={setState}
        textAlign="right"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.buttonText}>رجوع</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>التالي</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>معلومات الحساب</Text>
      <Text style={styles.userTypeBadge}>
        {userType === 'patient' ? '👤 مريض' : '👨‍⚕️ أخصائي'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="البريد الإلكتروني"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        textAlign="right"
      />

      <TextInput
        style={styles.input}
        placeholder="كلمة المرور"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textAlign="right"
      />

      <TextInput
        style={styles.input}
        placeholder="تأكيد كلمة المرور"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        textAlign="right"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.buttonText}>رجوع</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={userType === 'patient' ? styles.submitButton : styles.nextButton} 
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {userType === 'patient' ? 'التسجيل' : 'التالي'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>المعلومات المهنية</Text>
      <Text style={styles.userTypeBadge}>👨‍⚕️ أخصائي</Text>

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <TextInput
            style={styles.input}
            placeholder="المؤهل العلمي"
            value={qualification}
            onChangeText={setQualification}
            textAlign="right"
          />
        </View>
        <View style={styles.halfInput}>
          <TextInput
            style={styles.input}
            placeholder="التخصص"
            value={specialization}
            onChangeText={setSpecialization}
            textAlign="right"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>📄 تحميل السيرة الذاتية CV</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>🎓 تحميل الشهادة العلمية</Text>
      </TouchableOpacity>

      <Text style={styles.questionText}>
        تمتلك جهة عمل حاليا (عيادة، مستشفى...؟)
      </Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioButton, hasCurrentJob === false && styles.radioButtonSelected]}
          onPress={() => setHasCurrentJob(false)}
        >
          <Text style={[styles.radioButtonText, hasCurrentJob === false && styles.radioButtonTextSelected]}>
            لا
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, hasCurrentJob === true && styles.radioButtonSelected]}
          onPress={() => setHasCurrentJob(true)}
        >
          <Text style={[styles.radioButtonText, hasCurrentJob === true && styles.radioButtonTextSelected]}>
            نعم
          </Text>
        </TouchableOpacity>
      </View>

      {hasCurrentJob && (
        <>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>📋 تحميل إثبات مكان العمل</Text>
          </TouchableOpacity>
          <Text style={styles.noteText}>
            توضيح (إما ترخيص عيادة أو ورقة إشراف من إحصائي معتمد).
          </Text>
        </>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.buttonText}>رجوع</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>التسجيل</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const getProgressSteps = () => {
    if (userType === 'patient') {
      return 3; // Type selection, Personal info, Account info
    }
    return 4; // Type selection, Personal info, Account info, Professional info
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>إنشاء حساب جديد</Text>
        <View style={styles.progressContainer}>
          {[...Array(getProgressSteps())].map((_, index) => (
            <React.Fragment key={index}>
              <View style={[styles.progressDot, step >= index && styles.progressDotActive]} />
              {index < getProgressSteps() - 1 && (
                <View style={[styles.progressLine, step > index && styles.progressLineActive]} />
              )}
            </React.Fragment>
          ))}
        </View>
      </View>

      {step === 0 && renderUserTypeSelection()}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && userType === 'specialist' && renderStep3()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0891B2',
    marginBottom: 24,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(8, 145, 178, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#D1D5DB',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  progressDotActive: {
    backgroundColor: '#0891B2',
    width: 16,
    height: 16,
    borderRadius: 8,
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  progressLine: {
    width: 40,
    height: 3,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
  },
  progressLineActive: {
    backgroundColor: '#0891B2',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  stepContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  stepTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0891B2',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 28,
    fontWeight: '500',
    lineHeight: 22,
  },
  userTypeBadge: {
    fontSize: 17,
    color: '#0891B2',
    textAlign: 'center',
    backgroundColor: '#E0F2FE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignSelf: 'center',
    marginBottom: 24,
    fontWeight: '700',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#B6E6F8',
  },
  userTypeCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 18,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  userTypeCardSelected: {
    backgroundColor: '#E0F2FE',
    borderColor: '#0891B2',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 3,
  },
  userTypeIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  userTypeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  userTypeDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  halfInput: {
    width: '48%',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#374151',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  uploadButton: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#6b7280',
  },
  questionText: {
    textAlign: 'right',
    fontSize: 16,
    color: '#0891b2',
    marginBottom: 15,
    marginTop: 10,
    fontWeight: '600',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 20,
  },
  radioButton: {
    backgroundColor: '#F9FAFB',
    paddingVertical: 14,
    paddingHorizontal: 44,
    borderRadius: 12,
    borderWidth: 2.5,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  radioButtonSelected: {
    backgroundColor: '#0891B2',
    borderColor: '#0891B2',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  radioButtonText: {
    fontSize: 17,
    color: '#374151',
    fontWeight: '700',
  },
  radioButtonTextSelected: {
    color: '#FFFFFF',
  },
  noteText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  nextButton: {
    backgroundColor: '#0891B2',
    borderRadius: 14,
    padding: 18,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 0,
  },
  backButton: {
    backgroundColor: '#6B7280',
    borderRadius: 14,
    padding: 18,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 0,
  },
  submitButton: {
    backgroundColor: '#059669',
    borderRadius: 14,
    padding: 18,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default SignUpScreen;