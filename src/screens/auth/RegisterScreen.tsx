import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Theme } from '../../theme';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/molecules/LanguageSwitcher';
import { apiClient } from '../../api/apiClient';

const RegisterScreen = ({ onNavigateBack }: { onNavigateBack: () => void }) => {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Error states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    setErrors({});
    setGeneralError('');

    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    if (!fullName) {
      newErrors.fullName = t('register.error_name_empty');
      isValid = false;
    }
    if (!email) {
      newErrors.email = t('register.error_email_empty');
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = t('register.error_email_invalid');
      isValid = false;
    }
    if (!password) {
      newErrors.password = t('register.error_password_empty');
      isValid = false;
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = t('register.error_passwords_match');
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      await apiClient.post('/auth/register', { email, password, fullName });
      Alert.alert('Success!', t('register.success_register'));
      onNavigateBack(); // Go back to login screen
    } catch (error: any) {
      let errorMessage = error.message;
      if (errorMessage === 'Invalid email or password.') {
        errorMessage = t('login.error_invalid_credentials');
      }
      setGeneralError(errorMessage || t('login.error_general'));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LanguageSwitcher />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.emoji}>📚</Text>
          <Text style={styles.title}>{t('register.welcome_title')}</Text>
          <Text style={styles.subtitle}>{t('register.welcome_subtitle')}</Text>
        </View>

        <View style={styles.form}>
          {generalError ? (
            <View style={styles.generalErrorContainer}>
              <Text style={styles.generalErrorText}>{generalError}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('register.name_label')}</Text>
            <TextInput
              style={[styles.input, errors.fullName ? styles.inputError : null]}
              placeholder="Enter your name"
              value={fullName}
              onChangeText={text => {
                setFullName(text);
                setErrors(prev => ({ ...prev, fullName: '' }));
              }}
            />
            {errors.fullName ? (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            ) : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('register.email_label')}</Text>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              placeholder="example@email.com"
              value={email}
              onChangeText={text => {
                setEmail(text);
                setErrors(prev => ({ ...prev, email: '' }));
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('register.password_label')}</Text>
            <TextInput
              style={[styles.input, errors.password ? styles.inputError : null]}
              placeholder="••••••••"
              value={password}
              onChangeText={text => {
                setPassword(text);
                setErrors(prev => ({ ...prev, password: '' }));
              }}
              secureTextEntry
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {t('register.confirm_password_label')}
            </Text>
            <TextInput
              style={[
                styles.input,
                errors.confirmPassword ? styles.inputError : null,
              ]}
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                setErrors(prev => ({ ...prev, confirmPassword: '' }));
              }}
              secureTextEntry
            />
            {errors.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>
              {t('register.register_button')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backLink} onPress={onNavigateBack}>
            <Text style={styles.backLinkText}>
              {t('register.back_to_login')}{' '}
              <Text style={styles.linkHighlight}>
                {t('register.login_link')}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  emoji: {
    fontSize: 60,
    marginBottom: Theme.spacing.sm,
  },
  title: {
    ...Theme.typography.h1,
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.lg,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: Theme.spacing.md,
  },
  label: {
    ...Theme.typography.caption,
    color: Theme.colors.textMain,
    marginBottom: Theme.spacing.xs,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: Theme.colors.background,
    padding: Theme.spacing.md,
    borderRadius: 20,
    fontSize: Theme.typography.body.fontSize,
    color: Theme.colors.textMain,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: Theme.colors.error,
  },
  errorText: {
    ...Theme.typography.caption,
    color: Theme.colors.error,
    marginTop: Theme.spacing.xs,
    marginLeft: Theme.spacing.xs,
  },
  generalErrorContainer: {
    backgroundColor: '#FFEBEE',
    padding: Theme.spacing.sm,
    borderRadius: 15,
    marginBottom: Theme.spacing.md,
    borderLeftWidth: 5,
    borderLeftColor: Theme.colors.error,
  },
  generalErrorText: {
    ...Theme.typography.caption,
    color: Theme.colors.error,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: Theme.colors.primary,
    padding: Theme.spacing.md,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: Theme.spacing.lg,
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  registerButtonText: {
    ...Theme.typography.button,
    color: Theme.colors.textInverse,
  },
  backLink: {
    marginTop: Theme.spacing.lg,
    alignItems: 'center',
  },
  backLinkText: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
  },
  linkHighlight: {
    color: Theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
