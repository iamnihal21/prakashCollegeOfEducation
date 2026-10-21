import * as migration_20260320_130437 from './20260320_130437';
import * as migration_20260928_163954 from './20260928_163954';

export const migrations = [
  {
    up: migration_20260320_130437.up,
    down: migration_20260320_130437.down,
    name: '20260320_130437',
  },
  {
    up: migration_20260928_163954.up,
    down: migration_20260928_163954.down,
    name: '20260928_163954'
  },
];
