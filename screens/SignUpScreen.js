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
        activeOpacity={0.7}
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
        activeOpacity={0.7}
      >
        <Text style={styles.userTypeIcon}>👨‍⚕️</Text>
        <Text style={styles.userTypeTitle}>أخصائي</Text>
        <Text style={styles.userTypeDescription}>
          لتقديم الخدمات الطبية وإدارة المواعيد
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
          <Text style={styles.buttonText}>رجوع</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.7}>
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
        <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
          <Text style={styles.buttonText}>رجوع</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.7}>
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
        <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
          <Text style={styles.buttonText}>رجوع</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={userType === 'patient' ? styles.submitButton : styles.nextButton} 
          onPress={handleNext}
          activeOpacity={0.7}
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

      <TouchableOpacity style={styles.uploadButton} activeOpacity={0.7}>
        <Text style={styles.uploadButtonText}>📄 تحميل السيرة الذاتية CV</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadButton} activeOpacity={0.7}>
        <Text style={styles.uploadButtonText}>🎓 تحميل الشهادة العلمية</Text>
      </TouchableOpacity>

      <Text style={styles.questionText}>
        تمتلك جهة عمل حاليا (عيادة، مستشفى...؟)
      </Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioButton, hasCurrentJob === false && styles.radioButtonSelected]}
          onPress={() => setHasCurrentJob(false)}
          activeOpacity={0.7}
        >
          <Text style={[styles.radioButtonText, hasCurrentJob === false && styles.radioButtonTextSelected]}>
            لا
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, hasCurrentJob === true && styles.radioButtonSelected]}
          onPress={() => setHasCurrentJob(true)}
          activeOpacity={0.7}
        >
          <Text style={[styles.radioButtonText, hasCurrentJob === true && styles.radioButtonTextSelected]}>
            نعم
          </Text>
        </TouchableOpacity>
      </View>

      {hasCurrentJob && (
        <>
          <TouchableOpacity style={styles.uploadButton} activeOpacity={0.7}>
            <Text style={styles.uploadButtonText}>📋 تحميل إثبات مكان العمل</Text>
          </TouchableOpacity>
          <Text style={styles.noteText}>
            توضيح (إما ترخيص عيادة أو ورقة إشراف من إحصائي معتمد).
          </Text>
        </>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
          <Text style={styles.buttonText}>رجوع</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.7}>
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
    padding: 28,
    paddingBottom: 52,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 32,
    letterSpacing: 0.4,
    textShadowColor: 'rgba(8, 145, 178, 0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
    lineHeight: 42,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  progressDotActive: {
    backgroundColor: '#0891B2',
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  progressLine: {
    width: 48,
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
  },
  progressLineActive: {
    backgroundColor: '#0891B2',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  stepContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 28,
    elevation: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.3,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16.5,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 36,
    fontWeight: '600',
    lineHeight: 26,
    opacity: 0.95,
  },
  userTypeBadge: {
    fontSize: 18,
    color: '#0891B2',
    textAlign: 'center',
    backgroundColor: '#E0F2FE',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 26,
    alignSelf: 'center',
    marginBottom: 32,
    fontWeight: '800',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: '#BAE6FD',
    lineHeight: 28,
  },
  userTypeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 32,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 5,
  },
  userTypeCardSelected: {
    backgroundColor: '#E0F2FE',
    borderColor: '#0891B2',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 22,
    elevation: 10,
    borderWidth: 3,
  },
  userTypeIcon: {
    fontSize: 52,
    marginBottom: 12,
    lineHeight: 52,
  },
  userTypeTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 10,
    lineHeight: 28,
  },
  userTypeDescription: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    gap: 14,
  },
  halfInput: {
    width: '48%',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
    fontSize: 16.5,
    color: '#0F172A',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
    lineHeight: 26,
  },
  uploadButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  uploadButtonText: {
    fontSize: 17,
    color: '#64748B',
    fontWeight: '600',
    lineHeight: 24,
  },
  questionText: {
    textAlign: 'right',
    fontSize: 17,
    color: '#0C4A6E',
    marginBottom: 18,
    marginTop: 14,
    fontWeight: '600',
    lineHeight: 26,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 18,
  },
  radioButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 52,
    borderRadius: 20,
    borderWidth: 2.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  radioButtonSelected: {
    backgroundColor: '#0891B2',
    borderColor: '#0891B2',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 10,
  },
  radioButtonText: {
    fontSize: 18,
    color: '#1F2937',
    fontWeight: '700',
    lineHeight: 26,
  },
  radioButtonTextSelected: {
    color: '#FFFFFF',
  },
  noteText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 24,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
    gap: 14,
  },
  nextButton: {
    backgroundColor: '#0891B2',
    borderRadius: 22,
    padding: 22,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  backButton: {
    backgroundColor: '#64748B',
    borderRadius: 22,
    padding: 22,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 8,
    overflow: 'hidden',
  },
  submitButton: {
    backgroundColor: '#059669',
    borderRadius: 22,
    padding: 22,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
    lineHeight: 26,
  },
});

export default SignUpScreen;