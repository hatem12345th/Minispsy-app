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
    backgroundColor: '#F5F7FA',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0E7490',
    marginBottom: 24,
    letterSpacing: 0.4,
    textShadowColor: 'rgba(8, 145, 178, 0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    lineHeight: 38,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#CBD5E1',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
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
    shadowRadius: 6,
    elevation: 4,
  },
  progressLine: {
    width: 40,
    height: 3,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
  },
  progressLineActive: {
    backgroundColor: '#0891B2',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  stepContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E8ECF0',
    overflow: 'hidden',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0E7490',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.2,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 28,
    fontWeight: '500',
    lineHeight: 22,
  },
  userTypeBadge: {
    fontSize: 16,
    color: '#0E7490',
    textAlign: 'center',
    backgroundColor: '#E0F2FE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 24,
    fontWeight: '700',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    lineHeight: 24,
  },
  userTypeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E8ECF0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  userTypeCardSelected: {
    backgroundColor: '#E0F2FE',
    borderColor: '#0891B2',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
    borderWidth: 2.5,
  },
  userTypeIcon: {
    fontSize: 48,
    marginBottom: 10,
    lineHeight: 48,
  },
  userTypeTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 26,
  },
  userTypeDescription: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  halfInput: {
    width: '48%',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E8ECF0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    lineHeight: 22,
  },
  uploadButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600',
    lineHeight: 22,
  },
  questionText: {
    textAlign: 'right',
    fontSize: 16,
    color: '#0E7490',
    marginBottom: 16,
    marginTop: 12,
    fontWeight: '600',
    lineHeight: 24,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 16,
  },
  radioButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 44,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#E8ECF0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  radioButtonSelected: {
    backgroundColor: '#0891B2',
    borderColor: '#0891B2',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  radioButtonText: {
    fontSize: 17,
    color: '#111827',
    fontWeight: '700',
    lineHeight: 24,
  },
  radioButtonTextSelected: {
    color: '#FFFFFF',
  },
  noteText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#64748B',
    marginBottom: 20,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  nextButton: {
    backgroundColor: '#0891B2',
    borderRadius: 16,
    padding: 18,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  backButton: {
    backgroundColor: '#64748B',
    borderRadius: 16,
    padding: 18,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  submitButton: {
    backgroundColor: '#059669',
    borderRadius: 16,
    padding: 18,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
    lineHeight: 24,
  },
});

export default SignUpScreen;