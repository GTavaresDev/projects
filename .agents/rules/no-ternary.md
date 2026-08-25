# Strict Code Style Rule: NO Ternary Operators

> [!IMPORTANT]
> **ABSOLUTE RULE**: NEVER use ternary operators (`condition ? a : b`) in any file, function, component, or snippet in this workspace.

---

## 🚫 Forbidden:
```typescript
// ❌ NEVER DO THIS:
const value = isValid ? 'Valid' : 'Invalid';

const element = hasImage ? <Image /> : <Placeholder />;
```

---

## ✅ Required: Explicit `if` and `else`
Always declare `if` and `else` explicitly using standard blocks:

```typescript
// ✅ ALWAYS DO THIS:
let value: string;
if (isValid) {
  value = 'Valid';
} else {
  value = 'Invalid';
}

// In React Components:
let element: React.ReactNode;
if (hasImage) {
  element = <Image />;
} else {
  element = <Placeholder />;
}
```
