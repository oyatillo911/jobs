// =========================================================================================================
// 1-QADAM: IMPORT BO'LIMI (REACT ILOVASINING KIRISH DARVOZASI)
// =========================================================================================================

// "StrictMode" - React-ning qat'iy nazoratchisi (inspektori).
// U dasturni ishlab chiqish (development) jarayonida xatoliklar, eskirgan usullar yoki xotira sizib chiqishini
// oldindan aniqlash uchun komponentlarni sinov tariqasida ikki marta chaqirib tekshiradi.
import { StrictMode } from 'react';

// "createRoot" - Zamonaviy React 18 va 19-versiyalarining "Bosh me'mori".
// U HTML sahifasidagi oddiy bo'sh <div> qutisini topib, uni React-ning jonli virtual olamiga aylantirib beradi.
import { createRoot } from 'react-dom/client';

// "index.css" - Butun sayt uchun umumiy CSS stillari (Tailwind CSS qoidalari, shriftlar, skrollbar qoidalari).
import './index.css';

// "App" - Saytimizning bosh yuragi, ya'ni barcha sahifalar, modallar va navigatsiyani o'zida birlashtirgan ota komponent.
import App from './App.jsx';

// =========================================================================================================
// 2-QADAM: ILOVANI HTML DOKUMENTIGA BOG'LASH VA ISHGA TUSHIRISH (RENDER)
// =========================================================================================================

// 1. "document.getElementById('root')" - Brauzerning index.html faylidagi <div id="root"></div> elementini ushlab oladi.
// 2. "createRoot(...)" - Shu div ichida React ilovasi uchun yangi ildiz (root) ochadi.
// 3. ".render(...)" - Ushbu ildiz ichiga bizning <App /> komponentimizni joylashtiradi va ekranda chizadi.
createRoot(document.getElementById('root')).render(
  // Qat'iy nazorat rejimida ilovani o'rab turamiz:
  <StrictMode>
    {/* Butun saytning asosiy komponenti ekranga chizilmoqda */}
    <App />
  </StrictMode>,
);

// =========================================================================================================
// 2-QISM: ULTRA SLOW-MOTION (ILOVA BRAUZERDA QANDAY TUG'ILADI?)
// =========================================================================================================
// [0.000 soniya] - Brauzer foydalanuvchi saytga kirganda "index.html" faylini yuklaydi.
//                  U yerda faqat bitta bo'sh <div id="root"></div> elementi turgan bo'ladi.
// [0.001 soniya] - Brauzer "main.jsx" faylini o'qiy boshlaydi.
// [0.002 soniya] - "document.getElementById('root')" chaqirilib, o'sha bo'sh div topiladi.
// [0.003 soniya] - "createRoot" uning ichida React boshqaruv tizimini o'rnatadi.
// [0.004 soniya] - ".render(<App />)" orqali App.jsx komponenti chaqiriladi.
// [0.005 soniya] - App.jsx o'zining Navbar, Vakansiyalar sahifasi va modallarini chizib,
//                  bir lahzada ekranda to'laqonli chiroyli saytni namoyon qiladi!

// =========================================================================================================
// 3-QISM: DASTURCHI TAFEKKURI VA NEGA AYNAN SHUNDAY YOZILGAN?
// =========================================================================================================
// 1. Nega html faylga to'g'ridan-to'g'ri yozilmasdan, createRoot ishlatiladi?
//    - Bu Single Page Application (SPA) arxitekturasi deb ataladi. Sahifadagi hamma narsa JavaScript
//      tomonidan dinamik yaratiladi va sahifa yangilanmasdan (refresh bo'lmasdan) yashindek tez ishlaydi.
// 2. Nega StrictMode kerak?
//    - StrictMode ishlab chiquvchiga o'zi sezmagan xatolarini (masalan, useEffect ichida tozalanmagan taymerlar)
//      oldindan topishga yordam beradi. Ishlab chiqarishda (production build) esa u foydalanuvchiga ta'sir qilmaydi.
