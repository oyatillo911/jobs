// =========================================================================================================
// 1-QADAM: ASBOBLARNI CHAQIRISH (IMPORT BO'LIMI)
// =========================================================================================================

// "import React" — JSX teglari (HTML ko'rinishidagi teglarni JS ichida yozish) ishlashi uchun poydevor.
// "from 'react'" — React kutubxonasi omboridan chaqirilmoqda.
import React from 'react';

// "{ Button }" — Material-UI (MUI) degan dunyoga mashhur dizayn kutubxonasidan tayyor, professional tugma asbobi.
// "from '@mui/material'" — Material-UI asboblar qutisidan olib kelinmoqda.
import { Button } from '@mui/material';

// "{ Link, NavLink }" — "react-router-dom" kutubxonasining maxsus aqlli ko'priklari (havolalari).
// "Link" — Sahifani qayta yuklamasdan (refresh qilmasdan) bir manzildan ikkinchisiga o'tkazuvchi tezyurar poyezd.
// "NavLink" — Link-ning "aqlli egizagi". U ayni daqiqada foydalanuvchi qaysi sahifada turganini sezadi
//   va o'sha sahifa tugmasini yoritib (aktiv qilib) ko'rsatish uchun { isActive } kalitini beradi!
import { Link, NavLink } from 'react-router-dom';


// =========================================================================================================
// 2-QADAM: KOMPONENT VA UNING HIMOYALANGAN SOVG'ALAR QUTISI (PROPS)
// =========================================================================================================

// "function Navbar" — Bosh menyu komponentini yasovchi funksiya.
// "({ savedCount = 0 })" — Destructuring orqali nechta ish saqlangani sonini qabul qiladi.
// "= 0" — Default qiymat (agar ota komponent bu sonni bermasa, dastur qulamasligi uchun 0 deb hisoblaydi).
function Navbar({ savedCount = 0 }) {
  
  // =======================================================================================================
  // 3-QADAM: DINAMIK USLUB BERUVCHI FUNKSIYALAR (NAVLINK UCHUN)
  // =======================================================================================================

  // MATNLI HAVOLALAR (VAKANSIYALAR) UCHUN AQLLI BO'YOQCHI FUNKSIYA:
  // "({ isActive })" — NavLink avtomatik ravishda bu funksiyaga isActive (true/false) xabarini beradi.
  function havolaStili({ isActive }) {
    // Agar foydalanuvchi ayni shu sahifada turgan bo'lsa (isActive === true):
    if (isActive) {
      // OQ RANG (text-white) va qalinroq (font-medium) qilib ko'rsat:
      return 'text-[16px] hover:text-white transition-all duration-300 ease-in-out text-white font-medium';
    }
    // Agar boshqa sahifada bo'lsa (isActive === false):
    // KULRANG (text-[#979797FF]) qilib ko'rsat, lekin sichqoncha ustiga borganda oqarsin (hover:text-white):
    return 'text-[16px] hover:text-white transition-all duration-300 ease-in-out text-[#979797FF]';
  }


  // SAQLANGANLAR ICONKASI (BOOKMARK) UCHUN AQLLI BO'YOQCHI FUNKSIYA:
  function saqlanganIconStili({ isActive }) {
    // Agar foydalanuvchi "/saqlangan" sahifasida turgan bo'lsa:
    if (isActive) {
      // Belgini olovrang/qizil (text-[#d4380d]) rangda yorit:
      return 'relative cursor-pointer p-[4px] bg-transparent border-none transition-colors duration-300 text-[#d4380d]';
    }
    // Boshqa sahifalarda turganda esa kulrang (text-[#979797FF]) bo'lib tursin:
    return 'relative cursor-pointer p-[4px] bg-transparent border-none transition-colors duration-300 text-[#979797FF] hover:text-white';
  }


  // =======================================================================================================
  // 4-QADAM: VIZUAL TUZILISH (JSX RETURN)
  // =======================================================================================================

  return (
    // <nav> — Saytning navigatsiya qismi (menyusi) ekanligini bildiruvchi semantik HTML tegi.
    // "bg-[black]" — Menyuning orqa foni to'liq qop-qora bo'lsin.
    <nav className="bg-[black]">
      
      {/* 
        ASOSIY CHEGARALOVCHI KONTEYNER:
        max-w-7xl — Katta ekranlarda eni 1280px dan oshmasin.
        mx-auto — Ekranning qoq o'rtasiga tekislab qo'yilsin.
        flex items-center justify-between — Chap va o'ng qismlarni ikki chekkaga surib, o'rtani ochib beradi.
        py-5 — Yuqori va pastdan 20px bo'sh joy (padding-y).
      */}
      <div className="container flex items-center justify-between max-w-7xl mx-auto py-5">
       
        {/* ----------------------------------------------------------------------------------------------- */}
        {/* CHAP TOMON: LOGOTIP VA ASOSIY HAVOLALAR (LINKS) */}
        {/* ----------------------------------------------------------------------------------------------- */}
        <div className="nav_left flex items-center gap-25">
          
          {/* SAYT LOGOTIPI */}
          <div className="logo">
            {/* 
              <Link to="/"> — Logotip ustiga bosilganda bosh sahifaga o'tish ko'prigi.
              HTML-dagi <a href="/"> dan farqi — brauzerni qayta yuklamasdan 0.001 soniyada sahifani almashtiradi!
            */}
            <Link to="/">
              <h2 className="text-white text-[30px] font-bold">Jobs</h2>
            </Link>
          </div>

          {/* MENYU HAVOLALARI RO'YXATI (<ul>) */}
          <ul className="links flex items-center gap-12">
            
            {/* 1-HAVOLA: VAKANSIYALAR */}
            <li>
              {/* 
                <NavLink> — className ga to'g'ridan-to'g'ri yuqoridagi havolaStili funksiyasini beryapmiz.
                NavLink URL manzilni tekshiradi va agar manzil "/" bo'lsa, avtomatik isActive=true qilib beradi!
              */}
              <NavLink to="/" className={havolaStili}>
                Vakansiyalar
              </NavLink>
            </li>

            {/* 2-HAVOLA: KOMPANIYALAR (HOZIRCHA TAYYOR BO'LMAGAN BO'LIM) */}
            <li>
              <Link
                to="/kompaniyalar"
                // "e.preventDefault()" — Bu sahifa hali tayyor bo'lmagani sababli, 
                // foydalanuvchi tugmani bosganda hech qayerga sakramasligi uchun tormoz vazifasini bajaradi!
                onClick={(e) => e.preventDefault()}
                className="text-[#979797FF] text-[16px] hover:text-white transition-all duration-300 ease-in-out"
              >
                Kompaniyalar
              </Link>
            </li>

            {/* 3-HAVOLA: BLOG (TAYYOR BO'LMAGAN BO'LIM) */}
            <li>
              <Link
                to="/blog"
                onClick={(e) => e.preventDefault()} // Sahifa ochilmasligi uchun tormoz
                className="text-[#979797FF] text-[16px] hover:text-white transition-all duration-300 ease-in-out"
              >
                Blog
              </Link>
            </li>

          </ul>
        </div>


        {/* ----------------------------------------------------------------------------------------------- */}
        {/* O'NG TOMON: SAQLANGANLAR BELGISI VA FOYDALANUVCHI TUGMALARI */}
        {/* ----------------------------------------------------------------------------------------------- */}
        <div className="nav_right flex items-center gap-5">
          
          {/* SAQLANGAN VAKANSIYALAR ICONKASI */}
          <div className="icons flex items-center">
            {/* 
              to="/saqlangan" — Bosilganda saqlanganlar sahifasiga olib o'tadi.
              className={saqlanganIconStili} — Agar shu sahifada tursak, iconkani qizil qiladi!
            */}
            <NavLink
              to="/saqlangan"
              title="Saqlangan vakansiyalar"
              className={saqlanganIconStili}
            >
              {/* Xatcho'p (Bookmark) SVG belgisi */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                // "fill" — ICHKI BO'YOQ MANTIQI:
                // Agar savedCount > 0 bo'lsa (kamida bitta ish saqlangan bo'lsa) -> currentColor (ichini to'liq bo'yadi).
                // Agar hech narsa saqlanmagan bo'lsa (0 bo'lsa) -> 'none' (faqat tashqi chizig'i qoladi).
                fill={savedCount > 0 ? 'currentColor' : 'none'}
                stroke="currentColor" // Tashqi ramka chizig'i
                strokeWidth="1.8"     // Chiziq qalinligi
              >
                <path d="M11.1504 16.9189C11.6853 16.6515 12.3147 16.6515 12.8496 16.9189L17.9551 19.4717C18.0216 19.5049 18.0996 19.4562 18.0996 19.3818V5C18.0996 4.94477 18.0552 4.90039 18 4.90039H6C5.94477 4.90039 5.90039 4.94477 5.90039 5V19.3818C5.90039 19.4562 5.97843 19.5049 6.04492 19.4717L11.1504 16.9189Z" />
              </svg>
            </NavLink>
          </div>

          {/* HARAKAT TUGMALARI ("KIRISH" VA "E'LON JOYLASHTIRISH") */}
          <div className="nav_btns flex items-center gap-5">
            
            {/* 1. KIRISH TUGMASI (MATERIAL-UI BUTTON) */}
            <div className="kirish_btn">
              <Button
                variant="outlined" // Chegarali (ramkali) uslub
                // "sx={{ ... }}" — Material-UI ning maxsus CSS yozish maydoni (Style System):
                sx={{
                  width: '90px',
                  height: '40px',
                  background: 'black',        // Qora fon
                  border: '1px solid gray',    // Kulrang ramka
                  color: 'white',              // Oq yozuv
                  textTransform: 'capitalize', // Birinchi harfni katta qilib beradi ("Kirish")
                  // '&:hover' — Sichqoncha tugma ustiga kelganda sodir bo'ladigan animatsiya:
                  '&:hover': {
                    background: 'white',       // Fon oqaradi
                    color: 'black',            // Yozuv qorayadi
                    transition: 'all .5s ease-in-out', // 0.5 sekundda silliq o'zgaradi
                    border: 'none',            // Ramka yo'qoladi
                  },
                }}
              >
                Kirish
              </Button>
            </div>

            {/* 2. E'LON JOYLASHTIRISH TUGMASI */}
            <div className="elon_btn">
              <Button
                variant="contained" // To'liq bo'yalgan uslub
                sx={{
                  width: '120px',
                  height: '40px',
                  textTransform: 'none',       // Harflarni o'z holicha saqlaydi (hammasini KATTA qilib yubormaydi)
                  background: 'white',         // Oq fon
                  color: 'black',              // Qora yozuv
                  transition: 'all .5s ease-in-out',
                  // Sichqoncha ustiga borganda:
                  '&:hover': {
                    background: 'black',       // Fon qorayadi
                    color: 'white',            // Yozuv oqaradi
                    border: '1px solid gray',  // Kulrang ramka paydo bo'ladi
                  },
                }}
              >
                E`lon joylash
              </Button>
            </div>

          </div>

        </div>

      </div>
    </nav>
  ); // return tugadi
} // Navbar komponenti tugadi

// Ushbu Navbar-ni boshqa fayllarda ishlatish uchun export qilamiz
export default Navbar;


// 2-QISM: SEKUNDNING MINGDAN BIR ULUSHIDA (ULTRA SLOW-MOTION REPLAY)

// Keling, foydalanuvchi bosh sahifada turganda "Saqlanganlar" (xatcho‘p) tugmasini bosgan lahzada nima ro‘y berishini ko‘ramiz.

// [0.000 soniya] - FOYDALANUVCHI HARAKATI:
// Foydalanuvchi sichqoncha bilan Navbar-dagi xatcho'p (bookmark) belgisini bosdi.
// [0.001 soniya] - BROWSER ROUTER HARAKATI:
// <NavLink to="/saqlangan"> brauzerga hech qanday so'rov (server request) yubormaydi!
// U brauzer manzil satrini "mysite.uz/" dan "mysite.uz/saqlangan" ga o'zgartiradi.
// Sahifa oqib (reload bo'lib) ketmaydi!
// [0.002 soniya] - NAVLINK AKTIVLIKNI QAYTA HISOBLAYDI:
// 1. "Vakansiyalar" havolasi uchun:
//    Manzil hozir "/saqlangan", demak isActive = false bo'ldi.
//    havolaStili({ isActive: false }) chaqirilib, yozuv oqdan kulrangga aylandi.
// 2. "Saqlanganlar" belgisi uchun:
//    Manzil ayni "/saqlangan", demak isActive = true bo'ldi!
//    saqlanganIconStili({ isActive: true }) chaqirildi.
// [0.003 soniya] - SVG RANGI REAKSIYASI:
// saqlanganIconStili ichidagi `text-[#d4380d]` sinfi SVG-ga o'tdi.
// Xatcho'p belgisi kulrangdan yonib turuvchi qizil/olovrang tusga kirdi.
// [0.004 soniya] - APP.JSX YO'L XARITASI (ROUTES) ISHLADI:
// App.jsx ichidagi <Routes> brauzer manzilida "/saqlangan" ni ko'rdi.
// VakansiyalarPage yashirildi va o'rniga SaqlanganPage ochildi!
// Bularning barchasi foydalanuvchining ko'z ochib yumishidan 100 baravar tez (0.004 soniyada) amalga oshdi!
// 3-QISM: DASTURCHI TAFEKKURI VA 4 TA MUHIM SIR
// 1. Nega <Link> bor joyda <NavLink> ham ishlatildi? Ular orasida qanday farq bor?

// 10 yoshli bolaga tushuntirish: Tasavvur qiling, uyingizda ikkita eshik bor:

// Oddiy eshik (Link) — sizni bir xonadan ikkinchi xonaga olib o‘tadi, xolos.
// Aqlli chiroqli eshik (NavLink) — siz qaysi xonaga kirsangiz, o‘sha eshikning tepasidagi chiroqni avtomatik ravishda yoqib qo‘yadi (isActive = true). Shuning uchun saytda odam qaysi sahifada turganini bildirib turish uchun doim NavLink ishlatiladi!
// 2. Nega savedCount > 0 ? 'currentColor' : 'none' yozilgan?

// Bu saytning jonli ekanligini ko‘rsatuvchi detal! Agar foydalanuvchi hali birorta ham ishni saqlamagan bo‘lsa (savedCount === 0), xatcho‘pning faqat ingichka chegarasi ko‘rinadi (ichi bo‘sh bo‘ladi). Lekin bitta bo‘lsa ham ish saqlanishi bilan, xatcho‘pning ichi to‘lib qoladi. Foydalanuvchi qaramasdan ham ichida narsa borligini sezadi!

// 3. Nega "Kompaniyalar" va "Blog" havolalarida e.preventDefault() bor?

// Sayt yaratayotganda ba'zi sahifalar (masalan, blog yoki kompaniyalar ro‘yxati) hali dasturlab tugatilmagan bo‘lishi mumkin. Agar oddiy havola qilib qoldirilsa, foydalanuvchi bossa, sayt bo‘sh sahifaga o‘tib ketadi yoki sahifa sakrab tepaga chiqib ketadi. e.preventDefault() — bu "Hozircha bu tugmani bosganda hech qayerga sakrama, kutib tur" degan vaqtinchalik xavfsizlik qulfidir.

// 4. Nega Tailwind bor joyda Material-UI (MUI Button) ham ishlatilgan?

// Katta loyihalarda odatda tugmalar uchun Material-UI yoki shunga o‘xshash kutubxonalar ishlatiladi, chunki ularning ichida sichqoncha bosilganda chiroyli to‘lqin tarqalishi (Ripple effect), klaviatura orqali boshqarish (Accessibility) va professional animatsiyalar oldindan tayyor qilib qo‘yilgan bo‘ladi. sx={{ ... }} esa — o‘sha MUI komponentining ranglarini xuddi Tailwind-dek tez va oson o‘zgartirish imkonini beradi.