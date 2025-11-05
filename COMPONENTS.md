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
  Slider,
  RangeSlider,
  SearchBar,
  Rating,
  Modal,
  Dialog,
  BottomSheet,
  ActionSheet,
  Card,
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
  SegmentedControl,
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
- **Slider** - Single and range slider with animated handles
- **SearchBar** - Search input with clear, cancel, and loading states
- **Rating** - Star rating component with half-star support

### Layout & Structure
- **Modal** - Modal dialog with multiple animations and positions
- **Dialog** - Simple confirmation dialog
- **Divider** - Horizontal/vertical divider with optional text
- **Accordion** - Expandable content sections
- **BottomSheet** - Slide-up sheet with swipe to dismiss
- **ActionSheet** - iOS-style action menu with options
- **Card** - Feature-rich card with header, footer, and actions

### Display Components
- **Badge** - Status badges and notification badges
- **Avatar** - User avatar with status indicator and groups
- **Skeleton** - Loading placeholders with multiple variants
- **Chip** - Compact elements for tags, filters, and selections

### Navigation Components
- **Tabs** - Tab navigation with multiple variants
- **SegmentedControl** - iOS-style segmented control for grouped selections

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

### Card

```typescript
import { Card } from '@/components';

<Card
  title="Product Title"
  subtitle="Product description"
  headerIcon="pricetag"
>
  <Text>Card content goes here</Text>
</Card>

<Card
  variant="outlined"
  title="User Profile"
  headerAvatar={<Avatar source={userImage} />}
  actions={[
    { label: 'View', onPress: () => console.log('View') },
    { label: 'Edit', onPress: () => console.log('Edit') },
  ]}
>
  <Text>User details here</Text>
</Card>

<Card
  variant="elevated"
  coverImage={require('./image.jpg')}
  coverImageHeight={200}
  title="Article Title"
  onPress={() => console.log('Card pressed')}
>
  <Text>Article content preview...</Text>
</Card>
```

**Props:**
- `children?: React.ReactNode` - Card body content
- `variant?: 'elevated' | 'outlined' | 'filled'` - Card style variant
- `title?: string` - Header title
- `subtitle?: string` - Header subtitle
- `headerIcon?: IoniconsName` - Icon in header
- `headerAvatar?: React.ReactNode` - Custom avatar component in header
- `headerAction?: React.ReactNode` - Custom action element in header
- `coverImage?: ImageSourcePropType` - Cover image source
- `coverImageHeight?: number` - Cover image height (default: 200)
- `actions?: CardAction[]` - Footer action buttons
- `footer?: React.ReactNode` - Custom footer content
- `onPress?: () => void` - Makes entire card pressable
- `containerStyle?: ViewStyle` - Custom container styles
- Extends `TouchableOpacityProps` - When onPress is provided

---

### Slider

```typescript
import { Slider, RangeSlider } from '@/components';

// Single value slider
<Slider
  value={volume}
  min={0}
  max={100}
  step={1}
  onValueChange={setVolume}
  onSlidingComplete={(value) => console.log('Final:', value)}
  showValue
  color="primary"
/>

// Range slider (dual handles)
<RangeSlider
  minValue={20}
  maxValue={80}
  min={0}
  max={100}
  step={5}
  onValueChange={(min, max) => console.log(min, max)}
  showValue
  color="accent"
/>
```

**Slider Props:**
- `value?: number` - Current value (default: 0)
- `min?: number` - Minimum value (default: 0)
- `max?: number` - Maximum value (default: 100)
- `step?: number` - Step increment (default: 1)
- `onValueChange?: (value: number) => void` - Called during sliding
- `onSlidingComplete?: (value: number) => void` - Called when released
- `disabled?: boolean` - Disable interaction
- `showValue?: boolean` - Show value label above slider
- `color?: 'primary' | 'secondary' | 'success' | 'error' | 'accent'`
- `containerStyle?: ViewStyle` - Custom container styles

**RangeSlider Props:**
- `minValue?: number` - Minimum handle value
- `maxValue?: number` - Maximum handle value
- `min?: number` - Minimum bound (default: 0)
- `max?: number` - Maximum bound (default: 100)
- `step?: number` - Step increment (default: 1)
- `onValueChange?: (minValue: number, maxValue: number) => void`
- `onSlidingComplete?: (minValue: number, maxValue: number) => void`
- `disabled?: boolean`
- `showValue?: boolean`
- `color?: 'primary' | 'secondary' | 'success' | 'error' | 'accent'`
- `containerStyle?: ViewStyle`

---

### BottomSheet

```typescript
import { BottomSheet } from '@/components';

const [visible, setVisible] = useState(false);

<BottomSheet
  visible={visible}
  onClose={() => setVisible(false)}
  title="Select Options"
  size="medium"
  dismissible
  showHandle
>
  <Text>Bottom sheet content here</Text>
  <Button title="Action" onPress={handleAction} />
</BottomSheet>
```

**Props:**
- `visible: boolean` - Control visibility
- `onClose: () => void` - Called when dismissed
- `children: React.ReactNode` - Sheet content
- `title?: string` - Optional title
- `size?: 'small' | 'medium' | 'large' | 'full'` - Sheet height
- `dismissible?: boolean` - Allow swipe/backdrop dismiss (default: true)
- `showHandle?: boolean` - Show drag handle (default: true)

---

### ActionSheet

```typescript
import { ActionSheet } from '@/components';

const [visible, setVisible] = useState(false);

<ActionSheet
  visible={visible}
  onClose={() => setVisible(false)}
  title="Choose an action"
  message="Select one of the following options"
  options={[
    {
      label: 'Edit',
      icon: 'create',
      onPress: () => console.log('Edit'),
    },
    {
      label: 'Share',
      icon: 'share',
      onPress: () => console.log('Share'),
    },
    {
      label: 'Delete',
      icon: 'trash',
      destructive: true,
      onPress: () => console.log('Delete'),
    },
  ]}
  showCancel
  cancelLabel="Cancel"
/>
```

**Props:**
- `visible: boolean` - Control visibility
- `onClose: () => void` - Called when dismissed
- `title?: string` - Optional title
- `message?: string` - Optional description
- `options: ActionSheetOption[]` - Array of action options
- `cancelLabel?: string` - Cancel button text (default: 'Cancel')
- `showCancel?: boolean` - Show cancel button (default: true)

**ActionSheetOption:**
- `label: string` - Option text
- `onPress: () => void` - Action handler
- `icon?: IoniconsName` - Optional icon
- `destructive?: boolean` - Use destructive (red) styling
- `disabled?: boolean` - Disable option

---

### SearchBar

```typescript
import { SearchBar } from '@/components';

const [search, setSearch] = useState('');

<SearchBar
  value={search}
  onChangeText={setSearch}
  onSearch={(text) => console.log('Search:', text)}
  onClear={() => setSearch('')}
  placeholder="Search products..."
  showCancel
  variant="rounded"
/>

<SearchBar
  value={query}
  onChangeText={setQuery}
  loading={isSearching}
  variant="default"
/>
```

**Props:**
- `value: string` - Search text value
- `onChangeText: (text: string) => void` - Text change handler
- `onSearch?: (text: string) => void` - Called on submit/enter
- `onClear?: () => void` - Called when cleared
- `onFocus?: () => void` - Focus handler
- `onBlur?: () => void` - Blur handler
- `placeholder?: string` - Placeholder text (default: 'Search...')
- `showCancel?: boolean` - Show animated cancel button (default: false)
- `cancelText?: string` - Cancel button text (default: 'Cancel')
- `loading?: boolean` - Show loading indicator
- `variant?: 'default' | 'rounded'` - Border radius style
- `containerStyle?: ViewStyle` - Custom container styles
- Extends `TextInputProps` - All TextInput props supported

---

### SegmentedControl

```typescript
import { SegmentedControl } from '@/components';

const [selected, setSelected] = useState('tab1');

<SegmentedControl
  options={[
    { label: 'Day', value: 'day', icon: 'sunny' },
    { label: 'Week', value: 'week', icon: 'calendar' },
    { label: 'Month', value: 'month', icon: 'calendar-outline' },
  ]}
  value={selected}
  onChange={setSelected}
  variant="default"
  color="primary"
/>

<SegmentedControl
  options={[
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ]}
  value={filter}
  onChange={setFilter}
  variant="pills"
  color="accent"
/>
```

**Props:**
- `options: SegmentOption[]` - Array of segment options
- `value: string` - Currently selected value
- `onChange: (value: string) => void` - Selection change handler
- `variant?: 'default' | 'pills'` - Visual style
- `color?: 'primary' | 'secondary' | 'accent'` - Active segment color
- `disabled?: boolean` - Disable all segments
- `containerStyle?: ViewStyle` - Custom container styles

**SegmentOption:**
- `label: string` - Segment label text
- `value: string` - Unique value identifier
- `icon?: IoniconsName` - Optional icon
- `disabled?: boolean` - Disable specific segment

---

### Rating

```typescript
import { Rating } from '@/components';

const [rating, setRating] = useState(3.5);

<Rating
  value={rating}
  onChange={setRating}
  max={5}
  allowHalf
  size="medium"
  color="warning"
  showValue
/>

<Rating
  value={4.5}
  readOnly
  max={5}
  allowHalf
  size="small"
/>
```

**Props:**
- `value: number` - Current rating value
- `onChange?: (value: number) => void` - Rating change handler
- `max?: number` - Maximum rating value (default: 5)
- `allowHalf?: boolean` - Enable half-star ratings (default: false)
- `readOnly?: boolean` - Disable interaction (default: false)
- `size?: 'small' | 'medium' | 'large'` - Star size
- `color?: 'primary' | 'secondary' | 'accent' | 'warning'` - Star color (warning falls back to accent if theme.colors.warning not available)
- `showValue?: boolean` - Show numeric value (default: false)
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
