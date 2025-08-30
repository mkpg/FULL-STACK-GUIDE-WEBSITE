// Workshop sections - importing from individual files
import { BASICS_SECTION } from './basics';
import { ANGULAR_SECTION } from './angular';
import { REACT_SECTION } from './react';
import { PHP_SECTION } from './php';
import { JAVA_SECTION } from './java';

import type { Section } from '../types';

export const SECTIONS: Section[] = [
  BASICS_SECTION,
  ANGULAR_SECTION,
  REACT_SECTION,
  PHP_SECTION,
  JAVA_SECTION
];
