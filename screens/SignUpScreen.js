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
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0891b2',
    marginBottom: 20,
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
    backgroundColor: '#d1d5db',
  },
  progressDotActive: {
    backgroundColor: '#0891b2',
  },
  progressLine: {
    width: 30,
    height: 2,
    backgroundColor: '#d1d5db',
  },
  progressLineActive: {
    backgroundColor: '#0891b2',
  },
  stepContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0891b2',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 25,
  },
  userTypeBadge: {
    fontSize: 16,
    color: '#0891b2',
    textAlign: 'center',
    backgroundColor: '#e0f2fe',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  userTypeCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  userTypeCardSelected: {
    backgroundColor: '#e0f2fe',
    borderColor: '#0891b2',
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
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#374151',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  uploadButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
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
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  radioButtonSelected: {
    backgroundColor: '#0891b2',
    borderColor: '#0891b2',
  },
  radioButtonText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  radioButtonTextSelected: {
    color: '#fff',
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
    backgroundColor: '#0891b2',
    borderRadius: 8,
    padding: 15,
    flex: 1,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#6b7280',
    borderRadius: 8,
    padding: 15,
    flex: 1,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#059669',
    borderRadius: 8,
    padding: 15,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;