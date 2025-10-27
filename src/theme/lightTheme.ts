export const lightTheme = {
  name: 'light',
  colors: {
    primary: '#4BB4FF',
    secondary: '#B3E5FC',
    accent: '#FFB84C',
    success: '#5DD39E',
    error: '#FF6B6B',
    background: '#FFFFFF',
    surface: '#F6F7FB',
    gradientStart: '#E5F4FF',
    gradientEnd: '#FFFFFF',
    textPrimary: '#3C4A59',
    textSecondary: '#707E93',
    border: '#E0E6ED',
    shadow: 'rgba(0,0,0,0.05)',
    tabActive: '#4BB4FF',
    tabInactive: '#707E93',
    gradients: {
      background: ['#E5F4FF', '#FFFFFF'],
      orange: ['#FFB84C', '#FFD580'],
      success: ['#5DD39E', '#8BE9B4'],
      error: ['#FF6B6B', '#FFA5A5'],
    },
    icon: {
      default: '#4BB4FF',
      muted: '#94A3B8',
      active: '#4BB4FF',
      inverted: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: {
      regular: 'NunitoSans-Regular',
      medium: 'NunitoSans-Regular',
      semiBold: 'NunitoSans-Regular',
      bold: 'NunitoSans-Regular',
      extraBold: 'NunitoSans-Regular',
    },
    fontSize: { h1: 26, h2: 20, h3: 18, body: 14, small: 13, tiny: 12 }
  },
  spacing: { xs:4, sm:8, md:12, lg:16, xl:24, xxl:32 },
  radius: { sm:8, md:12, lg:16, xl:20, full:999 },
};
export type LightTheme = typeof lightTheme;
