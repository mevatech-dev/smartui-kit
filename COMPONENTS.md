# SmartUI Kit - Component Library Documentation

Comprehensive custom UI component library for React Native/Expo applications with full theme support, animations, and accessibility features.

## 📦 Installation & Import

```typescript
// Import all components
import {
  TextInput,
  Switch,
  Checkbox,
  RadioButton,
  RadioGroup,
  RadioGroupItem,
  Dropdown,
  MultiSelect,
  Modal,
  Dialog,
  Badge,
  NotificationBadge,
  Avatar,
  AvatarGroup,
  Divider,
  ToastProvider,
  useToast,
  useToastActions,
  Tooltip,
  ControlledTooltip,
  Tabs,
  TabPanel,
  TabPanels,
  Accordion,
  AccordionItem,
  ControlledAccordionItem,
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonList,
  SkeletonGrid,
  SkeletonProfile,
  Chip,
  IconButton,
  Alert,
} from '@/components';
```

## 🎨 Component Categories

### Form Components
- **TextInput** - Styled text input with label, error states, and icon support
- **Switch** - Animated toggle switch with multiple sizes
- **Checkbox** - Checkbox with animation and label support
- **RadioButton** - Radio button with group support
- **Dropdown** - Select dropdown with search functionality
- **MultiSelect** - Multi-selection dropdown

### Layout & Structure
- **Modal** - Modal dialog with multiple animations and positions
- **Dialog** - Simple confirmation dialog
- **Divider** - Horizontal/vertical divider with optional text
- **Accordion** - Expandable content sections

### Display Components
- **Badge** - Status badges and notification badges
- **Avatar** - User avatar with status indicator and groups
- **Skeleton** - Loading placeholders with multiple variants
- **Chip** - Compact elements for tags, filters, and selections

### Navigation Components
- **Tabs** - Tab navigation with multiple variants

### Interactive Components
- **IconButton** - Icon-only button with multiple variants and animations

### Feedback Components
- **Toast** - Toast notifications with provider
- **Tooltip** - Hoverable tooltips
- **Alert** - Informational banners with actions and dismiss

---

## 📝 Component Usage Examples

### TextInput

```typescript
import { TextInput } from '@/components';
import { Ionicons } from '@expo/vector-icons';

<TextInput
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  leftIcon={<Ionicons name="mail" size={20} color="#4BB4FF" />}
  error={emailError}
  helperText="We'll never share your email"
  variant="outlined"
  fullWidth
/>
```

**Props:**
- `label?: string` - Label text
- `error?: string` - Error message
- `helperText?: string` - Helper text
- `leftIcon?: ReactNode` - Left icon
- `rightIcon?: ReactNode` - Right icon
- `variant?: 'default' | 'filled' | 'outlined'`
- `fullWidth?: boolean`

---

### Switch

```typescript
import { Switch } from '@/components';

<Switch
  value={isEnabled}
  onValueChange={setIsEnabled}
  label="Enable notifications"
  labelPosition="left"
  size="medium"
  activeColor="#5DD39E"
/>
```

**Props:**
- `value: boolean`
- `onValueChange: (value: boolean) => void`
- `label?: string`
- `labelPosition?: 'left' | 'right'`
- `size?: 'small' | 'medium' | 'large'`
- `disabled?: boolean`

---

### Checkbox

```typescript
import { Checkbox } from '@/components';

<Checkbox
  checked={isChecked}
  onCheckedChange={setIsChecked}
  label="I agree to terms and conditions"
  size="medium"
  color="#4BB4FF"
/>
```

---

### RadioButton

```typescript
import { RadioGroup, RadioGroupItem } from '@/components';

<RadioGroup value={selected} onValueChange={setSelected}>
  <RadioGroupItem value="option1" label="Option 1" />
  <RadioGroupItem value="option2" label="Option 2" />
  <RadioGroupItem value="option3" label="Option 3" disabled />
</RadioGroup>
```

---

### Dropdown

```typescript
import { Dropdown } from '@/components';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
];

<Dropdown
  options={options}
  value={selectedFruit}
  onValueChange={setSelectedFruit}
  label="Select a fruit"
  placeholder="Choose one"
  searchable
  error={fruitError}
/>
```

**MultiSelect variant:**
```typescript
<MultiSelect
  options={options}
  values={selectedFruits}
  onValuesChange={setSelectedFruits}
  searchable
/>
```

---

### Modal

```typescript
import { Modal, Dialog } from '@/components';

<Modal
  visible={isModalVisible}
  onClose={() => setIsModalVisible(false)}
  title="Modal Title"
  size="medium"
  animationType="scale"
  position="center"
>
  <Text>Modal content here</Text>
</Modal>

{/* Simple Dialog */}
<Dialog
  visible={isDialogVisible}
  onClose={() => setIsDialogVisible(false)}
  title="Delete Item?"
  description="Are you sure you want to delete this item?"
  confirmText="Delete"
  cancelText="Cancel"
  onConfirm={handleDelete}
  variant="danger"
/>
```

---

### Badge

```typescript
import { Badge, NotificationBadge } from '@/components';

<Badge
  text="New"
  variant="success"
  size="medium"
  shape="rounded"
/>

<Badge
  icon="star"
  variant="accent"
  outline
/>

{/* Notification Badge */}
<NotificationBadge count={5} variant="error" position="top-right">
  <Ionicons name="notifications" size={24} />
</NotificationBadge>
```

---

### Avatar

```typescript
import { Avatar, AvatarGroup } from '@/components';

<Avatar
  source="https://example.com/avatar.jpg"
  name="John Doe"
  size="large"
  status="online"
  onPress={handleAvatarPress}
/>

<Avatar
  name="JD"
  size={64}
  shape="rounded"
/>

{/* Avatar Group */}
<AvatarGroup
  avatars={[
    { name: 'John Doe', source: 'url1' },
    { name: 'Jane Smith', source: 'url2' },
    { name: 'Bob Johnson', source: 'url3' },
  ]}
  max={3}
  size="medium"
  spacing={-8}
/>
```

---

### Divider

```typescript
import { Divider } from '@/components';

<Divider />

<Divider orientation="vertical" />

<Divider textAlign="center">
  <Text>OR</Text>
</Divider>
```

---

### Toast

```typescript
// 1. Wrap your app with ToastProvider
import { ToastProvider } from '@/components';

<ToastProvider maxToasts={3}>
  <App />
</ToastProvider>

// 2. Use toast in your components
import { useToast, useToastActions } from '@/components';

const MyComponent = () => {
  const { showToast } = useToast();
  const toast = useToastActions();

  const handleSuccess = () => {
    toast.success('Operation completed!');
  };

  const handleError = () => {
    toast.error('Something went wrong!');
  };

  const handleCustom = () => {
    showToast({
      message: 'Custom toast message',
      type: 'info',
      duration: 5000,
      action: {
        label: 'UNDO',
        onPress: () => console.log('Undo pressed'),
      },
    });
  };

  return <Button onPress={handleSuccess} title="Show Success" />;
};
```

---

### Tooltip

```typescript
import { Tooltip } from '@/components';

<Tooltip content="This is a helpful tip" placement="top">
  <Text>Hover me</Text>
</Tooltip>

<ControlledTooltip
  content="Controlled tooltip"
  visible={isTooltipVisible}
  onClose={() => setIsTooltipVisible(false)}
  placement="bottom"
>
  <TouchableOpacity onPress={() => setIsTooltipVisible(true)}>
    <Text>Press me</Text>
  </TouchableOpacity>
</ControlledTooltip>
```

---

### Tabs

```typescript
import { Tabs, TabPanel, TabPanels } from '@/components';

const tabs = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'profile', label: 'Profile', icon: 'person', badge: 3 },
  { key: 'settings', label: 'Settings', icon: 'settings' },
];

const [activeTab, setActiveTab] = useState('home');

<Tabs
  tabs={tabs}
  activeTab={activeTab}
  onChange={setActiveTab}
  variant="underline"
  size="medium"
  fullWidth
/>

<TabPanels>
  <TabPanel activeTab={activeTab} tabKey="home">
    <Text>Home Content</Text>
  </TabPanel>
  <TabPanel activeTab={activeTab} tabKey="profile">
    <Text>Profile Content</Text>
  </TabPanel>
  <TabPanel activeTab={activeTab} tabKey="settings">
    <Text>Settings Content</Text>
  </TabPanel>
</TabPanels>
```

---

### Accordion

```typescript
import { Accordion, AccordionItem } from '@/components';

<Accordion allowMultiple>
  <AccordionItem title="Section 1" icon="information-circle">
    <Text>Content for section 1</Text>
  </AccordionItem>
  <AccordionItem title="Section 2" defaultExpanded>
    <Text>Content for section 2</Text>
  </AccordionItem>
  <AccordionItem title="Section 3" disabled>
    <Text>Content for section 3</Text>
  </AccordionItem>
</Accordion>
```

---

### Skeleton

```typescript
import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonList,
  SkeletonGrid,
  SkeletonProfile,
} from '@/components';

{/* Basic Skeleton */}
<Skeleton width={200} height={20} variant="rounded" animation="pulse" />

{/* Text Skeleton */}
<SkeletonText lines={3} lastLineWidth="70%" />

{/* Card Skeleton */}
<SkeletonCard hasAvatar hasImage lines={2} />

{/* List Skeleton */}
<SkeletonList items={5} hasAvatar hasSubtitle />

{/* Grid Skeleton */}
<SkeletonGrid columns={2} rows={3} imageHeight={150} />

{/* Profile Skeleton */}
<SkeletonProfile />
```

---

### Chip

```typescript
import { Chip } from '@/components';

<Chip label="New Feature" color="primary" size="medium" />

<Chip
  label="JavaScript"
  color="accent"
  variant="outlined"
  icon="logo-javascript"
/>

<Chip
  label="Removable Tag"
  color="success"
  onDelete={() => console.log('Deleted')}
/>

<Chip
  label="Clickable"
  color="primary"
  onPress={() => console.log('Clicked')}
/>
```

**Props:**
- `label: string` - Chip text
- `variant?: 'filled' | 'outlined'`
- `color?: 'primary' | 'secondary' | 'success' | 'error' | 'accent'`
- `size?: 'small' | 'medium'`
- `icon?: IoniconsName` - Icon to display (not shown if avatar is provided)
- `avatar?: React.ReactNode` - Custom avatar component
- `onPress?: () => void` - Click handler for the entire chip
- `onDelete?: () => void` - Delete handler (shows close icon)
- `disabled?: boolean` - Disable all interactions
- `containerStyle?: ViewStyle` - Custom container styles

---

### IconButton

```typescript
import { IconButton } from '@/components';

<IconButton
  icon="heart"
  variant="filled"
  color="error"
  size="medium"
/>

<IconButton
  icon="notifications"
  variant="outlined"
  color="primary"
  badge={5}
/>

<IconButton
  icon="settings"
  variant="ghost"
  color="neutral"
  shape="rounded"
  onPress={() => console.log('Settings')}
/>
```

**Props:**
- `icon: IoniconsName` - Icon name
- `size?: 'small' | 'medium' | 'large'`
- `variant?: 'default' | 'filled' | 'outlined' | 'ghost'`
- `color?: 'primary' | 'secondary' | 'success' | 'error' | 'accent' | 'neutral'`
- `shape?: 'circle' | 'rounded' | 'square'`
- `badge?: number` - Badge count (shows "99+" if > 99)
- `animated?: boolean` - Enable press animation (default: true)
- `disabled?: boolean` - Disable button interactions
- Extends `TouchableOpacityProps` - Accepts all TouchableOpacity props (onPress, style, etc.)

---

### Alert

```typescript
import { Alert } from '@/components';

<Alert
  type="success"
  message="Your changes have been saved successfully!"
/>

<Alert
  type="error"
  title="Error Occurred"
  message="Unable to complete the operation. Please try again."
  variant="filled"
  closable
  onClose={() => console.log('Alert closed')}
/>

<Alert
  type="warning"
  message="Your session will expire in 5 minutes"
  variant="outlined"
  action={{
    label: 'Extend',
    onPress: () => console.log('Session extended'),
  }}
/>

<Alert
  type="info"
  message="New features are available!"
  icon="sparkles"
  variant="standard"
/>
```

**Props:**
- `message: string` - Alert message
- `title?: string` - Optional title
- `type?: 'info' | 'success' | 'warning' | 'error'`
- `variant?: 'standard' | 'filled' | 'outlined'`
- `icon?: IoniconsName` - Custom icon (overrides default icon)
- `showIcon?: boolean` - Show/hide icon (default: true)
- `closable?: boolean` - Enable close button
- `onClose?: () => void` - Callback when alert is closed
- `action?: { label: string; onPress: () => void }` - Action button
- `containerStyle?: ViewStyle` - Custom container styles

---

## 🎨 Theme Integration

All components automatically use theme values from your styled-components theme:

```typescript
import { useTheme } from 'styled-components/native';

const theme = useTheme();
// Access: theme.colors, theme.spacing, theme.typography, theme.radius
```

## ✨ Features

✅ **Full TypeScript Support** - Type-safe props and excellent IntelliSense
✅ **Theme Integration** - Seamless light/dark mode support
✅ **Animations** - Smooth transitions using react-native-reanimated
✅ **Accessibility** - Built-in accessibility features
✅ **Customizable** - Extensive prop APIs for customization
✅ **Responsive** - Mobile-first design
✅ **Icons** - Integrated with @expo/vector-icons

## 📄 License

This component library is part of the SmartUI Kit project.

---

**Created with ❤️ using React Native, Expo, and styled-components**
