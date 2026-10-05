import * as fs from 'node:fs';
import * as path from 'node:path';

export interface TreeShakingValidationResult {
  packageName: string;
  hasSideEffectsFalse: boolean;
  exports: string[];
  isolatedEntriesValid: boolean;
  errors: string[];
}

export function validatePackageTreeShaking(packageDir: string): TreeShakingValidationResult {
  const packageJsonPath = path.join(packageDir, 'package.json');
  const errors: string[] = [];

  if (!fs.existsSync(packageJsonPath)) {
    return {
      packageName: 'unknown',
      hasSideEffectsFalse: false,
      exports: [],
      isolatedEntriesValid: false,
      errors: [`package.json not found at ${packageJsonPath}`],
    };
  }

  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const hasSideEffectsFalse = pkg.sideEffects === false;
  if (!hasSideEffectsFalse) {
    errors.push(`Package ${pkg.name} does not declare "sideEffects": false`);
  }

  const exportKeys = pkg.exports ? Object.keys(pkg.exports) : [];
  if (exportKeys.length === 0) {
    errors.push(`Package ${pkg.name} does not define subpath exports`);
  }

  return {
    packageName: pkg.name,
    hasSideEffectsFalse,
    exports: exportKeys,
    isolatedEntriesValid: errors.length === 0,
    errors,
  };
}
