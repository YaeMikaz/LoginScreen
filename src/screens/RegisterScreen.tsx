import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '../schemas/registerSchema';
import { FormInput } from '../components/FormInput';
import { FormCheckbox } from '../components/FormCheckbox';

export const RegisterScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterFormData): Promise<void> => {
    try {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert(
        'Registration Successful',
        `Welcome ${data.fullName}!\n\nEmail: ${data.email}\nPhone: ${data.phone}`,
        [
          {
            text: 'OK',
            onPress: () => reset(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Registration Failed',
        'An error occurred during registration. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Fill in the details below to create your account
          </Text>
        </View>

        <View style={styles.form}>
          <FormInput
            name="fullName"
            control={control}
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullName}
            autoComplete="name"
          />

          <FormInput
            name="email"
            control={control}
            label="Email Address"
            placeholder="Enter your email"
            keyboardType="email-address"
            error={errors.email}
            autoComplete="email"
          />

          <FormInput
            name="phone"
            control={control}
            label="Phone Number"
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            error={errors.phone}
            autoComplete="tel"
          />

          <FormInput
            name="password"
            control={control}
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            error={errors.password}
            autoComplete="password-new"
          />

          <FormInput
            name="confirmPassword"
            control={control}
            label="Confirm Password"
            placeholder="Re-enter your password"
            secureTextEntry
            error={errors.confirmPassword}
            autoComplete="password-new"
          />

          <FormCheckbox
            name="terms"
            control={control}
            label="I agree to the Terms and Conditions and Privacy Policy"
            error={errors.terms}
          />

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.linkText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  form: {
    flex: 1,
  },
  button: {
    height: 54,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#999',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  linkText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});
