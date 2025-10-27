import 'styled-components/native';

import { lightTheme } from './lightTheme';

type ThemeShape = typeof lightTheme;

declare module 'styled-components/native' {
  // Augment DefaultTheme so styled-components knows about our tokens.
  export interface DefaultTheme extends ThemeShape {}
}
