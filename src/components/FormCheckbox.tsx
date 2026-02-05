import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Control, Controller, FieldError } from 'react-hook-form';

interface FormCheckboxProps {
  name: string;
  control: Control<any>;
  label: string;
  error?: FieldError;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  control,
  label,
  error,
}) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => onChange(!value)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, value && styles.checkboxChecked]}>
              {value && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.label}>{label}</Text>
          </TouchableOpacity>
        )}
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    color: '#ff3b30',
    marginTop: 4,
    marginLeft: 36,
  },
});
