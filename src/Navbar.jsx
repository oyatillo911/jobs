// =========================================================================================================
// 1-QADAM: ASBOBLARNI CHAQIRISH (IMPORT BO'LIMI)
// =========================================================================================================

// "{ Button }" — Material-UI (MUI) dizayn kutubxonasidan tayyor, chiroyli tugma asbobi.
// Bu asbob ichida to'lqin tarqalishi (ripple effect) va professional animatsiyalar oldindan tayyorlangan.
import { Button } from "@mui/material";

// "{ Link, NavLink }" — "react-router-dom" kutubxonasining maxsus aqlli ko'priklari (havolalari).
// "Link" — Sahifani qayta yuklamasdan (brauzerni refresh qilmasdan) bir manzildan ikkinchisiga o'tkazuvchi tezyurar poyezd.
// "NavLink" — Link-ning "aqlli egizagi". U ayni daqiqada foydalanuvchi qaysi sahifada turganini sezadi
//   va o'sha sahifa tugmasini yoritib (aktiv qilib) ko'rsatish uchun { isActive } kalitini beradi!
import { Link, NavLink } from "react-router-dom";

// =========================================================================================================
// 2-QADAM: KOMPONENT VA UNING HIMOYALANGAN SOVG'ALAR QUTISI (PROPS)
// =========================================================================================================

// "function Navbar" — Bosh menyu komponentini yasovchi funksiya.
// "({ savedCount = 0, myJobsCount = 0, onOpenElonModal = () => {} })":
//   - savedCount: foydalanuvchi nechta vakansiyani xatcho'pga (saqlanganlar) saqlaganligi soni (default: 0).
//   - myJobsCount: foydalanuvchi o'zi yaratgan faol e'lonlari soni (default: 0).
//   - onOpenElonModal: "E'lon joylash" tugmasi bosilganda modal oynani ochuvchi boshqaruv pulti.
function Navbar({
  savedCount = 0,
  myJobsCount = 0,
  onOpenElonModal = () => {},
}) {
  // =======================================================================================================
  // 3-QADAM: DINAMIK USLUB BERUVCHI FUNKSIYALAR (NAVLINK UCHUN)
  // =======================================================================================================

  // MATNLI HAVOLALAR UCHUN AQLLI BO'YOQCHI FUNKSIYA:
  // "({ isActive })" — NavLink avtomatik ravishda bu funksiyaga isActive (true/false) xabarini beradi.
  function havolaStili({ isActive }) {
    // Agar foydalanuvchi ayni shu sahifada turgan bo'lsa (isActive === true):
    if (isActive) {
      // OQ RANG (text-white) va qalinroq (font-medium) qilib yoritib ko'rsat:
      return "text-[16px] hover:text-white transition-all duration-300 ease-in-out text-white font-medium";
    }
    // Agar boshqa sahifada bo'lsa (isActive === false):
    // KULRANG (text-[#979797FF]) qilib ko'rsat, lekin sichqoncha ustiga borganda oqarsin (hover:text-white):
    return "text-[16px] hover:text-white transition-all duration-300 ease-in-out text-[#979797FF]";
  }

  // SAQLANGANLAR ICONKASI (BOOKMARK) UCHUN AQLLI BO'YOQCHI FUNKSIYA:
  function saqlanganIconStili({ isActive }) {
    // Agar foydalanuvchi "/saqlangan" sahifasida turgan bo'lsa:
    if (isActive) {
      // Belgini olovrang/qizil (text-[#d4380d]) rangda yorit:
      return "relative cursor-pointer p-[4px] bg-transparent border-none transition-colors duration-300 text-[#d4380d]";
    }
    // Boshqa sahifalarda turganda esa kulrang (text-[#979797FF]) bo'lib tursin, hoverda oqarsin:
    return "relative cursor-pointer p-[4px] bg-transparent border-none transition-colors duration-300 text-[#979797FF] hover:text-white";
  }

  // =======================================================================================================
  // 4-QADAM: VIZUAL TUZILISH (JSX RETURN)
  // =======================================================================================================

  return (
    // <nav> — Saytning navigatsiya qismi (bosh menyusi) ekanligini bildiruvchi semantik HTML tegi.
    // "bg-[black]" — Menyuning orqa foni to'liq qop-qora bo'lsin.
    <nav className="bg-[black]">
      {/* 
        ASOSIY CHEGARALOVCHI KONTEYNER:
        max-w-7xl — Katta ekranlarda eni 1280px dan oshmasin.
        mx-auto — Ekranning qoq o'rtasiga tekislab qo'yilsin.
        flex items-center justify-between — Chap va o'ng qismlarni ikki chekkaga surib, o'rtani ochib beradi.
        py-5 — Yuqori va pastdan 20px ichki bo'sh joy (padding-y).
      */}
      <div className="container flex items-center justify-between max-w-7xl mx-auto py-5 px-4 lg:px-0">
        {/* ----------------------------------------------------------------------------------------------- */}
        {/* CHAP TOMON: LOGOTIP VA ASOSIY MENYU HAVOLALARI */}
        {/* ----------------------------------------------------------------------------------------------- */}
        <div className="nav_left flex items-center gap-12 lg:gap-20">
          {/* SAYT LOGOTIPI */}
          <div className="logo">
            {/* 
              <Link to="/"> — Logotip ustiga bosilganda bosh sahifaga o'tish ko'prigi.
              Brauzerni qayta yuklamasdan bir zumda sahifani almashtiradi!
            */}
            <Link to="/">
              <h2 className="text-white text-[30px] font-bold tracking-tight">
                Jobs
              </h2>
            </Link>
          </div>

          {/* MENYU HAVOLALARI RO'YXATI (<ul>) */}
          <ul className="links flex items-center gap-8 lg:gap-10">
            {/* 1-HAVOLA: VAKANSIYALAR (BOSH SAHIFA) */}
            <li>
              {/* 
                <NavLink> — URL manzil "/" bo'lganda avtomatik isActive=true qilib oq rangda ko'rsatadi
              */}
              <NavLink to="/" className={havolaStili}>
                Vakansiyalar
              </NavLink>
            </li>

            {/* 2-HAVOLA: KOMPANIYALAR */}
            <li>
              <NavLink to="/kompaniyalar" className={havolaStili}>
                Kompaniyalar
              </NavLink>
            </li>

            {/* 3-HAVOLA: MENING E'LONLARIM (Yaratilgan e'lonlar soni hisoblagichi bilan) */}
            <li>
              <NavLink to="/mening-elonlarim" className={havolaStili}>
                <span>Mening e‘lonlarim</span>
                {/* 
                  Agar foydalanuvchining e'lonlari soni 0 dan katta bo'lsa,
                  yonida kichik kulrang aylanada soni ko'rinsin:
                */}
                {myJobsCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-[11px] bg-neutral-800 text-white font-normal border border-neutral-700">
                    {myJobsCount}
                  </span>
                )}
              </NavLink>
            </li>

            {/* 4-HAVOLA: BLOG (FOYDALI QO'LLANMALAR) */}
            <li>
              <NavLink to="/blog" className={havolaStili}>
                Blog
              </NavLink>
            </li>
          </ul>
        </div>

        {/* ----------------------------------------------------------------------------------------------- */}
        {/* O'NG TOMON: SAQLANGANLAR XATCHO'PI VA FOYDALANUVCHI TUGMALARI */}
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
                fill={savedCount > 0 ? "currentColor" : "none"}
                stroke="currentColor" // Tashqi ramka chizig'i
                strokeWidth="1.8" // Chiziq qalinligi
              >
                <path d="M11.1504 16.9189C11.6853 16.6515 12.3147 16.6515 12.8496 16.9189L17.9551 19.4717C18.0216 19.5049 18.0996 19.4562 18.0996 19.3818V5C18.0996 4.94477 18.0552 4.90039 18 4.90039H6C5.94477 4.90039 5.90039 4.94477 5.90039 5V19.3818C5.90039 19.4562 5.97843 19.5049 6.04492 19.4717L11.1504 16.9189Z" />
              </svg>
            </NavLink>
          </div>

          {/* HARAKAT TUGMALARI ("KIRISH" VA "E'LON JOYLASHTIRISH") */}
          <div className="nav_btns flex items-center gap-4">
            {/* 1. KIRISH TUGMASI (MATERIAL-UI BUTTON) */}
            <div className="kirish_btn">
              <Button
                variant="outlined" // Chegarali (ramkali) uslub
                // "sx={{ ... }}" — Material-UI ning maxsus CSS yozish maydoni (Style System):
                sx={{
                  width: "90px",
                  height: "40px",
                  background: "black", // Qora fon
                  border: "1px solid gray", // Kulrang ramka
                  color: "white", // Oq yozuv
                  textTransform: "capitalize", // Birinchi harfni katta qilib beradi ("Kirish")
                  // '&:hover' — Sichqoncha tugma ustiga kelganda sodir bo'ladigan animatsiya:
                  "&:hover": {
                    background: "white", // Fon oqaradi
                    color: "black", // Yozuv qorayadi
                    transition: "all .5s ease-in-out", // 0.5 sekundda silliq o'zgaradi
                    border: "none", // Ramka yo'qoladi
                  },
                }}
              >
                Kirish
              </Button>
            </div>

            {/* 2. E'LON JOYLASHTIRISH TUGMASI */}
            <div className="elon_btn">
              <Button
                onClick={onOpenElonModal} // Bosilganda modal oynani ochuvchi funksiya ishga tushadi
                variant="contained" // To'liq bo'yalgan uslub
                sx={{
                  width: "120px",
                  height: "40px",
                  cursor: "pointer",
                  textTransform: "none", // Harflarni o'z holicha saqlaydi
                  background: "white", // Oq fon
                  color: "black", // Qora yozuv
                  transition: "all .5s ease-in-out",
                  // Sichqoncha ustiga borganda:
                  "&:hover": {
                    background: "black", // Fon qorayadi
                    color: "white", // Yozuv oqaradi
                    border: "1px solid gray", // Kulrang ramka paydo bo'ladi
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

// Ushbu Navbar-ni boshqa fayllarda ishlatish uchun taqdim etamiz (export)
export default Navbar;

// =========================================================================================================
// 2-QISM: SEKUNDNING MINGDAN BIR ULUSHIDA (ULTRA SLOW-MOTION REPLAY)
// =========================================================================================================

// Keling, foydalanuvchi "Mening e'lonlarim" havolasini bosgan lahzada nima ro'y berishini ko'ramiz:
// [0.000 soniya] - FOYDALANUVCHI HARAKATI:
// Foydalanuvchi sichqoncha bilan Navbar-dagi "Mening e'lonlarim" yozuvini bosdi (Click).
// [0.001 soniya] - BROWSER ROUTER HARAKATI:
// <NavLink to="/mening-elonlarim"> brauzerga hech qanday server so'rovi yubormaydi!
// U brauzer manzil satrini "site.uz/" dan "site.uz/mening-elonlarim" ga o'zgartiradi (Single Page Application).
// [0.002 soniya] - NAVLINK AKTIVLIKNI QAYTA HISOBLAYDI:
// 1. "Vakansiyalar" uchun: isActive = false bo'lib, yozuv oqdan kulrangga o'tadi.
// 2. "Mening e'lonlarim" uchun: isActive = true bo'lib, yozuv oq rangga kiradi va qalinlashadi.
// [0.003 soniya] - APP.JSX YO'L XARITASI ISHLAYDI:
// App.jsx ichidagi <Routes> o'zgarishni ko'radi va darhol MeningElonlarimPage sahifasini ekranga chizadi.
// Hammasi 0.003 soniyada, foydalanuvchi ko'z ochib yumguncha bajariladi!
