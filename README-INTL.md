# next-intl Setup Documentation

This dashboard project has been configured with **next-intl** for internationalization support.

## 🌍 Supported Languages

- **English (en)** - Default language
- **Arabic (ar)** - RTL support enabled

## 📁 Project Structure

```
dashboard/
├── src/
│   ├── app/
│   │   └── [locale]/           # Locale-based routing
│   │       ├── layout.tsx      # Locale layout with NextIntlClientProvider
│   │       ├── page.tsx        # Home page (server component)
│   │       └── login/
│   │           └── page.tsx    # Login page (client component)
│   ├── components/
│   │   └── LanguageSwitcher.tsx  # Language switcher component
│   ├── i18n/
│   │   ├── config.ts           # i18n configuration
│   │   └── navigation.ts       # Typed navigation helpers
│   ├── types/
│   │   └── next-intl.d.ts      # TypeScript type definitions
│   └── middleware.ts           # Locale detection middleware
├── messages/
│   ├── en.json                 # English translations
│   └── ar.json                 # Arabic translations
└── next.config.ts              # Next.js config with next-intl plugin
```

## 🚀 Usage

### Adding New Languages

1. Add the locale to `src/i18n/config.ts`:

```typescript
export const locales = ["en", "ar", "fr"] as const; // Add 'fr'
```

2. Create a new translation file in `messages/`:

```
messages/fr.json
```

3. Update the middleware matcher in `src/middleware.ts`:

```typescript
matcher: ["/", "/(ar|en|fr)/:path*"];
```

### Using Translations in Server Components

```tsx
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("home");

  return <h1>{t("title")}</h1>;
}
```

### Using Translations in Client Components

```tsx
"use client";

import { useTranslations } from "next-intl";

export default function Component() {
  const t = useTranslations("auth");

  return <button>{t("login")}</button>;
}
```

### Navigation

Use the typed navigation helpers instead of Next.js default navigation:

```tsx
import { Link, useRouter, usePathname } from "@/i18n/navigation";

// Link component
<Link href="/login">Login</Link>;

// useRouter hook
const router = useRouter();
router.push("/dashboard");

// usePathname hook
const pathname = usePathname();
```

### Getting Current Locale

```tsx
import { useLocale } from "next-intl";

const locale = useLocale(); // 'en' or 'ar'
```

## 📝 Translation Keys Structure

The translation files are organized into namespaces:

- **common**: Shared/common translations (buttons, labels, etc.)
- **auth**: Authentication-related translations
- **dashboard**: Dashboard-specific translations
- **home**: Home page translations

### Adding New Translation Keys

1. Add to English file (`messages/en.json`):

```json
{
  "profile": {
    "title": "My Profile",
    "edit": "Edit Profile"
  }
}
```

2. Add corresponding translation to other languages (`messages/ar.json`):

```json
{
  "profile": {
    "title": "ملفي الشخصي",
    "edit": "تعديل الملف الشخصي"
  }
}
```

3. Use in your component:

```tsx
const t = useTranslations("profile");
<h1>{t("title")}</h1>;
```

## 🔄 RTL Support

RTL (Right-to-Left) is automatically enabled for Arabic. The layout detects the locale and sets the `dir` attribute:

```tsx
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
```

## 🎯 URL Structure

The app uses locale prefixes in URLs:

- English: `http://localhost:3000/en`
- Arabic: `http://localhost:3000/ar`
- Auto-redirect: `http://localhost:3000/` → `http://localhost:3000/en`

## 🛠️ Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📦 Dependencies

- `next-intl`: ^4.4.0
- Automatically configured in `next.config.ts`

## 🔐 TypeScript Support

Full TypeScript support with autocomplete for translation keys. Type definitions are in `src/types/next-intl.d.ts`.

## 🎨 Components

### LanguageSwitcher

A ready-to-use language switcher component:

```tsx
import LanguageSwitcher from "@/components/LanguageSwitcher";

<LanguageSwitcher />;
```

## 📖 Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)

## 🐛 Troubleshooting

### Translations not loading

- Check that the locale matches a file in `messages/` folder
- Verify the translation key exists in the JSON file
- Ensure the namespace is correct

### 404 on root path

- Check middleware configuration
- Verify `localePrefix: 'always'` is set in middleware

### TypeScript errors

- Run `npm run build` to regenerate types
- Check that `src/types/next-intl.d.ts` is included in `tsconfig.json`
