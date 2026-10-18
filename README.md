هيكل المشروع
text
niletechno2/
├── public/          صور وملفات ثابتة (favicon, PDF, شعارات, لقطات التطبيق)
├── src/
│   ├── assets/      صور يعالجها Vite
│   ├── components/  الأقسام والنوافذ والمكونات
│   ├── constants/   بيانات الشركة وأرقام التواصل
│   ├── data/        الشركاء، شرائح الـ Hero، لقطات التطبيق
│   ├── hooks/
│   ├── pages/       صفحة دليل الشركاء
│   ├── utils/       واتساب، QR، الصور
│   ├── data.js      الأنظمة والتطبيقات والفروع والترجمات
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
التشغيل
bash
npm install
npm run dev            # تطوير
npm run build          # بناء للرفع (dist)
npm run preview        # تجربة dist على localhost:4173
npm run build:local    # ملف واحد للتجربة بدبل كليك (dist-local)
الرفع
