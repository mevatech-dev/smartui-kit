import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useThemeStore } from '@/store/ThemeStore';

export const ProgressScreen: React.FC = () => {
  const { theme, toggleTheme, isDark } = useThemeStore();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text
        style={[
          styles.title,
          { color: theme.colors.textPrimary, fontFamily: theme.typography.fontFamily.bold },
        ]}
      >
        Your Progress
      </Text>

      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.label, { color: theme.colors.textPrimary }]}>Lessons Completed</Text>
        <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
          <View style={[styles.progress, { width: '60%', backgroundColor: theme.colors.primary }]} />
        </View>
        <Text style={{ color: theme.colors.textSecondary }}>24 / 50</Text>
      </View>

      <Pressable
        onPress={toggleTheme}
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
      >
        <Text style={{ color: '#fff', fontWeight: '700' }}>
          Switch to {isDark ? 'Light' : 'Dark'} Mode
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 24,
  },
  card: {
    width: '100%',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  progressBar: {
    height: 12,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progress: {
    height: '100%',
    borderRadius: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
});
