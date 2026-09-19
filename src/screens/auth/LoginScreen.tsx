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

const LoginScreen = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Error states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    // Reset errors
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    let isValid = true;

    // 1. Validate Email
    if (!email) {
      setEmailError(t('login.error_email_empty'));
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError(t('login.error_email_invalid'));
      isValid = false;
    }

    // 2. Validate Password
    if (!password) {
      setPasswordError(t('login.error_password_empty'));
      isValid = false;
    }

    if (!isValid) return;

    try {
      // Simulation: Simulate network/database delay
      console.log('Attempting to login with:', email);

      // For now, we simulate a successful login
      alert('Welcome back! 🌟');
    } catch (error) {
      setGeneralError(t('login.error_general'));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LanguageSwitcher />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.emoji}>📚</Text>
          <Text style={styles.title}>{t('login.welcome_title')}</Text>
          <Text style={styles.subtitle}>{t('login.welcome_subtitle')}</Text>
        </View>

        {/* Form Section */}
        <View style={styles.form}>
          {/* General Error Banner */}
          {generalError ? (
            <View style={styles.generalErrorContainer}>
              <Text style={styles.generalErrorText}>{generalError}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('login.email_label')}</Text>
            <TextInput
              style={[styles.input, emailError ? styles.inputError : null]}
              placeholder="example@email.com"
              value={email}
              onChangeText={text => {
                setEmail(text);
                if (emailError) setEmailError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('login.password_label')}</Text>
            <TextInput
              style={[styles.input, passwordError ? styles.inputError : null]}
              placeholder="••••••••"
              value={password}
              onChangeText={text => {
                setPassword(text);
                if (passwordError) setPasswordError('');
              }}
              secureTextEntry
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>
              {t('login.login_button')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerLink}>
            <Text style={styles.registerLinkText}>
              {t('login.register_text')}{' '}
              <Text style={styles.linkHighlight}>
                {t('login.register_link')}
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
  loginButton: {
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
  loginButtonText: {
    ...Theme.typography.button,
    color: Theme.colors.textInverse,
  },
  registerLink: {
    marginTop: Theme.spacing.lg,
    alignItems: 'center',
  },
  registerLinkText: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
  },
  linkHighlight: {
    color: Theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
