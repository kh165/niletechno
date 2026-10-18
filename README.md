# NileTechno 2

## هيكل المشروع

```text
niletechno2/
├── public/          # صور وملفات ثابتة
├── src/
│   ├── assets/      # الصور
│   ├── components/  # الأقسام والمكونات
│   ├── constants/   # بيانات الشركة
│   ├── data/        # الشركاء وبيانات الـ Hero والتطبيق
│   ├── hooks/
│   ├── pages/       # صفحات الموقع
│   ├── utils/       # الأدوات المساعدة
│   ├── data.js      # الأنظمة والتطبيقات والفروع والترجمات
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

## التشغيل

```bash
npm install
npm run dev
npm run build
npm run preview
npm run build:local
```

- `npm run dev` — تشغيل المشروع للتطوير
- `npm run build` — إنشاء نسخة الإنتاج داخل `dist`
- `npm run preview` — تجربة نسخة الإنتاج
- `npm run build:local` — إنشاء نسخة للتجربة محليًا

## الرفع

بعد تنفيذ:

```bash
npm run build
```

يتم رفع مجلد `dist` إلى الاستضافة.