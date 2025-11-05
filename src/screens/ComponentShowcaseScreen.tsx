import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import styled from 'styled-components/native';
import {
  TextInput,
  Switch,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Dropdown,
  Badge,
  NotificationBadge,
  Avatar,
  AvatarGroup,
  Divider,
  Tabs,
  TabPanel,
  TabPanels,
  AccordionItem,
  Skeleton,
  SkeletonText,
  ThemedButton,
} from '@/components';
import { useToast } from '@/components/ui/Toast';

export const ComponentShowcaseScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState('option1');
  const [selectedFruit, setSelectedFruit] = useState('');
  const [activeTab, setActiveTab] = useState('components');
  const { showToast } = useToast();

  const dropdownOptions = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Mango', value: 'mango' },
  ];

  const tabs = [
    { key: 'components', label: 'Components', icon: 'cube' as const },
    { key: 'examples', label: 'Examples', icon: 'flask' as const, badge: 5 },
    { key: 'info', label: 'Info', icon: 'information-circle' as const },
  ];

  return (
    <Container>
      <Header>
        <HeaderTitle>Component Showcase</HeaderTitle>
        <HeaderSubtitle>All custom UI components in action</HeaderSubtitle>
      </Header>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="underline"
        fullWidth
      />

      <TabPanels>
        <TabPanel activeTab={activeTab} tabKey="components">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Section>
              <SectionTitle>Form Components</SectionTitle>

              <ComponentCard>
                <ComponentName>TextInput</ComponentName>
                <TextInput
                  label="Email Address"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (text && !text.includes('@')) {
                      setEmailError('Please enter a valid email');
                    } else {
                      setEmailError('');
                    }
                  }}
                  keyboardType="email-address"
                  error={emailError}
                  helperText="We'll never share your email"
                  variant="outlined"
                  fullWidth
                />
              </ComponentCard>

              <ComponentCard>
                <ComponentName>Switch</ComponentName>
                <Switch
                  value={isEnabled}
                  onValueChange={setIsEnabled}
                  label="Enable notifications"
                  labelPosition="left"
                  size="medium"
                />
              </ComponentCard>

              <ComponentCard>
                <ComponentName>Checkbox</ComponentName>
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={setIsChecked}
                  label="I agree to terms and conditions"
                  size="medium"
                />
              </ComponentCard>

              <ComponentCard>
                <ComponentName>RadioButton</ComponentName>
                <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                  <RadioGroupItem value="option1" label="Option 1" />
                  <RadioGroupItem value="option2" label="Option 2" />
                  <RadioGroupItem value="option3" label="Option 3" />
                </RadioGroup>
              </ComponentCard>

              <ComponentCard>
                <ComponentName>Dropdown</ComponentName>
                <Dropdown
                  options={dropdownOptions}
                  value={selectedFruit}
                  onValueChange={setSelectedFruit}
                  label="Select a fruit"
                  placeholder="Choose one"
                  searchable
                />
              </ComponentCard>
            </Section>

            <Divider>Display Components</Divider>

            <Section>
              <ComponentCard>
                <ComponentName>Badge</ComponentName>
                <BadgeRow>
                  <Badge text="New" variant="success" size="small" />
                  <Badge text="Featured" variant="primary" size="medium" />
                  <Badge text="Hot" variant="error" size="large" />
                  <Badge icon="star" variant="accent" outline />
                </BadgeRow>
              </ComponentCard>

              <ComponentCard>
                <ComponentName>NotificationBadge</ComponentName>
                <BadgeRow>
                  <NotificationBadge count={5} variant="error">
                    <IconPlaceholder>
                      <Text>🔔</Text>
                    </IconPlaceholder>
                  </NotificationBadge>
                  <NotificationBadge count={99} variant="primary">
                    <IconPlaceholder>
                      <Text>💬</Text>
                    </IconPlaceholder>
                  </NotificationBadge>
                </BadgeRow>
              </ComponentCard>

              <ComponentCard>
                <ComponentName>Avatar</ComponentName>
                <BadgeRow>
                  <Avatar name="John Doe" size="small" status="online" />
                  <Avatar name="JD" size="medium" shape="rounded" />
                  <Avatar icon="person" size="large" backgroundColor="#5DD39E" />
                </BadgeRow>
              </ComponentCard>

              <ComponentCard>
                <ComponentName>AvatarGroup</ComponentName>
                <AvatarGroup
                  avatars={[
                    { id: 1, name: 'John Doe' },
                    { id: 2, name: 'Jane Smith' },
                    { id: 3, name: 'Bob Johnson' },
                    { id: 4, name: 'Alice Williams' },
                    { id: 5, name: 'Charlie Brown' },
                  ]}
                  max={4}
                  size="medium"
                />
              </ComponentCard>

              <ComponentCard>
                <ComponentName>Skeleton</ComponentName>
                <SkeletonText lines={3} lastLineWidth="60%" />
              </ComponentCard>
            </Section>

            <Divider>Interactive Components</Divider>

            <Section>
              <ComponentCard>
                <ComponentName>Accordion</ComponentName>
                <AccordionItem
                  title="What is SmartUI Kit?"
                  icon="information-circle"
                  defaultExpanded
                >
                  <AccordionText>
                    SmartUI Kit is a comprehensive React Native component library with
                    full theme support, animations, and TypeScript integration.
                  </AccordionText>
                </AccordionItem>
                <AccordionItem title="How to use components?" icon="help-circle">
                  <AccordionText>
                    Import any component from @/components and use it with TypeScript
                    autocomplete and full theme integration.
                  </AccordionText>
                </AccordionItem>
              </ComponentCard>

              <ComponentCard>
                <ComponentName>Toast</ComponentName>
                <BadgeRow>
                  <ThemedButton
                    title="Success"
                    variant="success"
                    onPress={() => showToast({ message: 'Operation successful!', type: 'success' })}
                  />
                  <ThemedButton
                    title="Error"
                    variant="error"
                    onPress={() => showToast({ message: 'Something went wrong!', type: 'error' })}
                  />
                </BadgeRow>
              </ComponentCard>
            </Section>

            <View style={{ height: 100 }} />
          </ScrollView>
        </TabPanel>

        <TabPanel activeTab={activeTab} tabKey="examples">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Section>
              <SectionTitle>Usage Examples</SectionTitle>
              <ComponentCard>
                <ComponentName>Form Example</ComponentName>
                <ExampleText>
                  Combine TextInput, Checkbox, and Button for complete forms
                </ExampleText>
              </ComponentCard>
              <ComponentCard>
                <ComponentName>Card Example</ComponentName>
                <ExampleText>
                  Use Avatar, Badge, and Divider to create rich card layouts
                </ExampleText>
              </ComponentCard>
            </Section>
            <View style={{ height: 100 }} />
          </ScrollView>
        </TabPanel>

        <TabPanel activeTab={activeTab} tabKey="info">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Section>
              <SectionTitle>About SmartUI Kit</SectionTitle>
              <InfoCard>
                <InfoText>✨ 14 Custom UI Components</InfoText>
                <InfoText>🎨 Full Theme Integration</InfoText>
                <InfoText>⚡ React Native Reanimated</InfoText>
                <InfoText>📘 TypeScript Support</InfoText>
                <InfoText>📱 Responsive Design</InfoText>
                <InfoText>🚀 Production Ready</InfoText>
              </InfoCard>
            </Section>
            <View style={{ height: 100 }} />
          </ScrollView>
        </TabPanel>
      </TabPanels>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.View`
  padding: ${({ theme }) => theme.spacing.xl}px;
  padding-top: ${({ theme }) => theme.spacing.xxl}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const HeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.h1}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const HeaderSubtitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Section = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const SectionTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.h2}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const ComponentCard = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`;

const ComponentName = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const BadgeRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  flex-wrap: wrap;
`;

const IconPlaceholder = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  align-items: center;
  justify-content: center;
`;

const AccordionText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 20px;
`;

const ExampleText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 20px;
`;

const InfoCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const InfoText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
