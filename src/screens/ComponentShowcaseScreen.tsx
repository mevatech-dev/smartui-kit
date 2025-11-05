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
  Slider,
  RangeSlider,
  SearchBar,
  Rating,
  Card,
  BottomSheet,
  ActionSheet,
  SegmentedControl,
  IconButton,
  Chip,
  Alert,
  Progress,
  CircularProgress,
  Stepper,
  FloatingActionButton,
  Menu,
  EmptyState,
  SwipeableItem,
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
  const [sliderValue, setSliderValue] = useState(50);
  const [searchText, setSearchText] = useState('');
  const [rating, setRating] = useState(3.5);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [segmentValue, setSegmentValue] = useState('all');
  const [progressValue, setProgressValue] = useState(65);
  const [currentStep, setCurrentStep] = useState(1);
  const [menuVisible, setMenuVisible] = useState(false);
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

              <ComponentCard>
                <ComponentName>Slider</ComponentName>
                <Slider
                  value={sliderValue}
                  min={0}
                  max={100}
                  onValueChange={setSliderValue}
                  showValue
                  color="primary"
                />
              </ComponentCard>

              <ComponentCard>
                <ComponentName>SearchBar</ComponentName>
                <SearchBar
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Search components..."
                  variant="rounded"
                  showCancel
                />
              </ComponentCard>

              <ComponentCard>
                <ComponentName>Rating</ComponentName>
                <Rating
                  value={rating}
                  onChange={setRating}
                  allowHalf
                  showValue
                  color="accent"
                />
              </ComponentCard>

              <ComponentCard>
                <ComponentName>SegmentedControl</ComponentName>
                <SegmentedControl
                  options={[
                    { label: 'All', value: 'all' },
                    { label: 'Active', value: 'active' },
                    { label: 'Done', value: 'done' },
                  ]}
                  value={segmentValue}
                  onChange={setSegmentValue}
                  variant="default"
                  color="primary"
                />
              </ComponentCard>
            </Section>

            <Divider>Display Components</Divider>

            <Section>
              <ComponentCard>
                <ComponentName>Card</ComponentName>
                <Card
                  variant="outlined"
                  title="Example Card"
                  subtitle="With header and footer"
                  headerIcon="star"
                  actions={[
                    { label: 'View', onPress: () => showToast('View clicked', 'info') },
                    { label: 'Edit', onPress: () => showToast('Edit clicked', 'info') },
                  ]}
                >
                  <ExampleText>This is a card with customizable header, footer, and actions.</ExampleText>
                </Card>
              </ComponentCard>

              <ComponentCard>
                <ComponentName>Chip</ComponentName>
                <BadgeRow>
                  <Chip label="React Native" color="primary" variant="filled" size="medium" />
                  <Chip label="TypeScript" color="accent" variant="outlined" size="medium" icon="logo-javascript" />
                  <Chip label="Remove" color="error" variant="filled" size="small" onDelete={() => showToast('Deleted', 'success')} />
                </BadgeRow>
              </ComponentCard>

              <ComponentCard>
                <ComponentName>Alert</ComponentName>
                <Alert
                  type="info"
                  message="This is an informational alert with theme integration"
                  variant="standard"
                  showIcon
                />
              </ComponentCard>

              <ComponentCard>
                <ComponentName>Progress</ComponentName>
                <Progress
                  value={progressValue}
                  size="medium"
                  color="primary"
                  showLabel
                />
                <View style={{ height: 16 }} />
                <BadgeRow style={{ justifyContent: 'center' }}>
                  <CircularProgress
                    value={progressValue}
                    size="large"
                    color="accent"
                    showLabel
                    thickness={6}
                  />
                </BadgeRow>
              </ComponentCard>

              <ComponentCard>
                <ComponentName>EmptyState</ComponentName>
                <EmptyState
                  icon="folder-open"
                  title="No Items"
                  description="There are no items to display"
                  variant="compact"
                />
              </ComponentCard>

              <ComponentCard>
                <ComponentName>IconButton</ComponentName>
                <BadgeRow>
                  <IconButton icon="heart" variant="filled" color="error" size="medium" onPress={() => showToast('Liked!', 'success')} />
                  <IconButton icon="share" variant="outlined" color="primary" size="medium" onPress={() => showToast('Share', 'info')} />
                  <IconButton icon="notifications" variant="default" color="accent" size="large" badge={3} />
                </BadgeRow>
              </ComponentCard>

              <ComponentCard>
                <ComponentName>BottomSheet & ActionSheet</ComponentName>
                <BadgeRow>
                  <ThemedButton
                    title="Open BottomSheet"
                    onPress={() => setBottomSheetVisible(true)}
                    variant="outlined"
                  />
                  <ThemedButton
                    title="Open ActionSheet"
                    onPress={() => setActionSheetVisible(true)}
                    variant="outlined"
                  />
                </BadgeRow>
              </ComponentCard>
            </Section>

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

            <Divider>Navigation Components</Divider>

            <Section>
              <ComponentCard>
                <ComponentName>Stepper</ComponentName>
                <Stepper
                  steps={[
                    { label: 'Account', description: 'Create account' },
                    { label: 'Profile', description: 'Set up profile', icon: 'person' },
                    { label: 'Verify', description: 'Verify email', icon: 'checkmark-circle' },
                    { label: 'Done', description: 'All set!', icon: 'rocket' },
                  ]}
                  currentStep={currentStep}
                  orientation="horizontal"
                  color="primary"
                  showStepNumbers
                />
                <View style={{ height: 16 }} />
                <BadgeRow>
                  <ThemedButton
                    title="Previous"
                    variant="outlined"
                    onPress={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  />
                  <ThemedButton
                    title="Next"
                    variant="primary"
                    onPress={() => setCurrentStep(Math.min(3, currentStep + 1))}
                    disabled={currentStep === 3}
                  />
                </BadgeRow>
              </ComponentCard>
            </Section>

            <Divider>Interactive Components</Divider>

            <Section>
              <ComponentCard>
                <ComponentName>FloatingActionButton</ComponentName>
                <ExampleText style={{ marginBottom: 12 }}>
                  FAB appears in fixed position (bottom-right corner)
                </ExampleText>
              </ComponentCard>

              <ComponentCard>
                <ComponentName>Menu</ComponentName>
                <Menu
                  visible={menuVisible}
                  onClose={() => setMenuVisible(false)}
                  trigger={
                    <ThemedButton
                      title="Open Menu"
                      variant="outlined"
                      onPress={() => setMenuVisible(true)}
                    />
                  }
                  items={[
                    { label: 'Edit', icon: 'create', onPress: () => showToast('Edit clicked', 'info') },
                    { label: 'Share', icon: 'share', onPress: () => showToast('Share clicked', 'info') },
                    { type: 'divider' },
                    { label: 'Delete', icon: 'trash', destructive: true, onPress: () => showToast('Delete clicked', 'error') },
                  ]}
                  placement="bottom-start"
                />
              </ComponentCard>

              <ComponentCard>
                <ComponentName>SwipeableItem</ComponentName>
                <SwipeableItem
                  leftActions={[
                    {
                      icon: 'archive',
                      backgroundColor: '#4BB4FF',
                      onPress: () => showToast('Archived', 'success'),
                    },
                  ]}
                  rightActions={[
                    {
                      icon: 'trash',
                      backgroundColor: '#E74C3C',
                      onPress: () => showToast('Deleted', 'error'),
                    },
                  ]}
                >
                  <SwipeableContent>
                    <ExampleText>Swipe left or right to reveal actions</ExampleText>
                  </SwipeableContent>
                </SwipeableItem>
              </ComponentCard>

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
                <InfoText>✨ 30 Custom UI Components</InfoText>
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

      <BottomSheet
        visible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        title="Example Bottom Sheet"
        size="medium"
      >
        <ExampleText style={{ marginBottom: 16 }}>
          This is a bottom sheet that slides from the bottom with smooth animations.
        </ExampleText>
        <ThemedButton
          title="Close"
          onPress={() => setBottomSheetVisible(false)}
          variant="primary"
        />
      </BottomSheet>

      <ActionSheet
        visible={actionSheetVisible}
        onClose={() => setActionSheetVisible(false)}
        title="Choose an Action"
        message="Select one of the following options"
        options={[
          {
            label: 'Edit',
            icon: 'create',
            onPress: () => showToast('Edit selected', 'info'),
          },
          {
            label: 'Share',
            icon: 'share',
            onPress: () => showToast('Share selected', 'info'),
          },
          {
            label: 'Delete',
            icon: 'trash',
            destructive: true,
            onPress: () => showToast('Delete selected', 'error'),
          },
        ]}
      />

      <FloatingActionButton
        icon="add"
        actions={[
          { icon: 'camera', label: 'Photo', onPress: () => showToast('Photo', 'info') },
          { icon: 'image', label: 'Gallery', onPress: () => showToast('Gallery', 'info') },
          { icon: 'document', label: 'File', onPress: () => showToast('File', 'info') },
        ]}
        position="bottom-right"
        color="primary"
      />
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

const SwipeableContent = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`;
