// =========================================================================================================
// 1-QADAM: TASHQI DUNYODAN KERAKLI ASBOBLARNI CHAQIRISH (IMPORT BO'LIMI)
// =========================================================================================================

// "import" — "olib kelish" buyrug'i. 
// "React" — butun kutubxona boshqaruvchisi. JSX (HTML kodni JS ichida yozish) ishlashi uchun poydevor.
// "{ useState }" — Jingalak qavs { } ichida: React zavodidagi 100 ta asbobdan aynan "xotira yaratuvchi" asbobni ajratib olyapmiz.
// "from 'react'" — bu asboblar "node_modules/react" degan katta qutidan olinishini bildiradi.
// ";" — gap tugaganini bildiruvchi nuqta.
import React, { useState } from "react";

// "BrowserRouter" — butun saytni qamrab oluvchi "yo'l xaritasi kompas"i. Saytda sahifalar yangilanmasdan almashishi uchun javobgar.
// "Route" — bitta aniq yo'nalish (masalan, "/saqlangan" yo'liga qaysi sahifa to'g'ri kelishi).
// "Routes" — bir nechta yo'nalishlarni o'z ichiga olgan "yo'l ko'rsatkichlar chorrahasi".
// "from 'react-router-dom'" — sahifalararo harakatlanish uchun brauzer asboblari joylashgan quti.
import { BrowserRouter, Route, Routes } from "react-router-dom";

// "./Navbar" — shu fayl turgan papkadagi Navbar.jsx faylidan yuqori menyu qismini (bosh menyu) chaqirish.
// Jingalak qavssiz, chunki u fayldan asosiy "export default" qilib chiqarilgan.
import Navbar from "./Navbar";

// "./pages/VakansiyalarPage" — "pages" papkasidagi VakansiyalarPage (barcha ish o'rinlari sahifasi)ni chaqirish.
import VakansiyalarPage from "./pages/VakansiyalarPage";

// "./pages/SaqlanganPage" — saqlab qo'yilgan vakansiyalar ko'rinadigan alohida sahifani olib kelish.
import SaqlanganPage from "./pages/SaqlanganPage";

// "./components/ArizaModal" — foydalanuvchi ishga ariza topshirmoqchi bo'lib tugmani bosganda ekranda qalqib chiquvchi oyna (modal).
import ArizaModal from "./components/ArizaModal";


// =========================================================================================================
// 2-QADAM: ASOSIY KOMPONENT (APP FUNKSIYASI) — BUTUN SAYTNING BOSHQARUV MARKAZI
// =========================================================================================================

// "function" — yangi mustaqil funksiya (vazifa bajaruvchi mashina) yaratish kalit so'zi.
// "App" — bosh komponentning nomi. React-da barcha komponentlar KATTA harf bilan boshlanishi shart!
// "()" — funksiyaning parametrlari (eshigi). App-ga tashqaridan hech narsa kirmaydi, shuning uchun bo'sh.
// "{" — funksiya tanasining boshlanishi.
function App() {

  // -------------------------------------------------------------------------------------------------------
  // STATIK (O'ZGARMAS) MA'LUMOTLAR BAZASI — SAYTNING TAXTASI VA E'LONLARI
  // -------------------------------------------------------------------------------------------------------

  // "const" — o'zgarmas qiymat (constant). Ya'ni bu ro'yxatning o'zi butunlay boshqa narsaga almashtirib yuborilmaydi.
  // "vakansiyalarRoyxati" — barcha mavjud ish o'rinlari ro'yxati.
  // "=" — tenglash belgisi (o'ng tarafdagi ma'lumotni chapdagi qutiga solish).
  // "[" — Massiv (Array) boshlanishi. Ichida bir nechta ish o'rinlari ketma-ket joylashadi.
  const vakansiyalarRoyxati = [
    // "{" — Obyekt (bitta ish o'rnining to'liq guvohnomasi, barcha ma'lumotlari).
    {
      id: 1, // "id" — takrorlanmas raqam (pasport seriyasi). Har bir ishning o'ziga xos ID-si bo'lishi shart!
      letter: "D", // Kompaniya logotipi o'rnida chiqadigan bosh harf ("Datalab" so'zidan).
      title: "Senior frontend dasturchi", // Kasb nomi (matn ko'rinishida, qo'shtirnoqda).
      salaryText: "8 – 12 mln", // Saytda chiroyli ko'rinishi uchun mo'ljallangan oylik maosh matni.
      salaryMax: 12, // Filtrlash oson bo'lishi uchun sof raqam ko'rinishidagi maksimal oylik (12 mln).
      company: "Datalab · IT Park rezidenti", // Ish beruvchi tashkilot nomi.
      city: "Toshkent", // Ish joylashgan shahar (filtrlashda kerak bo'ladi).
      category: "IT va dasturlash", // Soha/yo'nalish nomi.
      time: "2 soat oldin", // E'lon qachon qo'yilgani haqida foydalanuvchiga xabar.
      createdAt: 6, // Vaqt bo'yicha saralash (sorting) uchun qo'yilgan raqam (qanchalik katta bo'lsa, shuncha yangi).
      tags: ["Masofaviy", "To‘liq stavka"], // Qo'shimcha belgilar massivi (remote yoki ofis).
    }, // Vergul — keyingi e'longa o'tish belgisi.
    {
      id: 2,
      letter: "D",
      title: "Python backend dasturchi",
      salaryText: "7 – 10 mln",
      salaryMax: 10,
      company: "Datalab",
      city: "Toshkent",
      category: "IT va dasturlash",
      time: "4 soat oldin",
      createdAt: 5,
      tags: ["Masofaviy"],
    },
    {
      id: 3,
      letter: "M",
      title: "Buxgalter",
      salaryText: "3.5 – 5 mln",
      salaryMax: 5,
      company: "Moliya Invest MChJ",
      city: "Samarqand",
      category: "Moliya va buxgalteriya",
      time: "5 soat oldin",
      createdAt: 4,
      tags: ["To‘liq stavka"],
    },
    {
      id: 4,
      letter: "Z",
      title: "SMM mutaxassisi",
      salaryText: "4 – 6 mln",
      salaryMax: 6,
      company: "Zamon Media",
      city: "Toshkent",
      category: "Marketing",
      time: "Kecha",
      createdAt: 3,
      tags: ["Qisman bandlik"],
    },
    {
      id: 5,
      letter: "T",
      title: "Savdo menejeri",
      salaryText: "2.5 mln + bonus",
      salaryMax: 2.5,
      company: "Texnomart",
      city: "Farg‘ona",
      category: "Savdo",
      time: "Kecha",
      createdAt: 2,
      tags: ["To‘liq stavka"],
    },
    {
      id: 6,
      letter: "P",
      title: "Ingliz tili o‘qituvchisi",
      salaryText: "3 – 4.5 mln",
      salaryMax: 4.5,
      company: "Progress Academy",
      city: "Andijon",
      category: "Ta‘lim",
      time: "2 kun oldin",
      createdAt: 1,
      tags: ["Qisman bandlik"],
    },
  ]; // Massiv yakunlandi.

  // Shaharlar ro'yxati (har bir shaharning nomi va unda nechta ish borligi soni)
  const shaharlar = [
    { name: "Toshkent", count: 84 },
    { name: "Samarqand", count: 21 },
    { name: "Farg‘ona", count: 12 },
    { name: "Andijon", count: 9 },
    { name: "Nukus", count: 2 },
  ];

  // Sohalar ro'yxati (kategoriya bo'yicha saralash tugmalari uchun)
  const sohalar = [
    { name: "IT va dasturlash", count: 45 },
    { name: "Moliya va buxgalteriya", count: 18 },
    { name: "Savdo", count: 15 },
    { name: "Marketing", count: 11 },
    { name: "Ta‘lim", count: 8 },
  ];

  // Bandlik turlari (kun tartibi: uyda o'tiribmi yoki ofisdami)
  const bandlikTurlari = [
    { name: "To‘liq stavka", count: 70 },
    { name: "Masofaviy", count: 22 },
    { name: "Qisman bandlik", count: 14 },
  ];

  // Maosh variantlari filtri (foydalanuvchi o'ziga yoqqan maosh chegarasini tanlashi uchun)
  const maoshVariantlari = [
    { id: "all", label: "Barchasi" },
    { id: "2plus", label: "2 mln dan" },
    { id: "2to5", label: "2 – 5 mln" },
    { id: "5to10", label: "5 – 10 mln" },
    { id: "10plus", label: "10 mln dan yuqori" },
  ];


  // -------------------------------------------------------------------------------------------------------
  // 3-QADAM: STATE (REAKTIV XOTIRA) — SAYTNING O'ZGARUVCHAN YURAGI
  // -------------------------------------------------------------------------------------------------------

  // 1-XOTIRA: Saqlangan ishlar ro'yxati
  // savedjob: Hozirgi saqlangan ishlar qutisi (boshida bo'sh ro'yxat: []).
  // setsavedjob: Shu qutini qonuniy ravishda o'zgartiruvchi yagona pult funksiya.
  // useState([]): Boshlang'ich holat — bo'sh massiv.
  const [savedjob, setsavedjob] = useState([]);

  // 2-XOTIRA: Foydalanuvchi ariza topshirib bo'lgan ishlar ro'yxati
  // appliedJobs: Qaysi ishlarga ariza yuborilganini eslab qoladi.
  // setAppliedJobs: Yangi ariza yuborilganda bu ro'yxatni yangilovchi pult.
  const [appliedJobs, setAppliedJobs] = useState([]);

  // 3-XOTIRA: Ariza modalida ayni daqiqada qaysi ish ko'rsatilayotgani
  // selectedJobForApply: Agar null bo'lsa — demak hech qaysi ish tanlanmagan, modal oyna YOPIQ.
  // Agar ichida bitta ish obyekti turgan bo'lsa — o'sha ish haqidagi modal oyna OCHIQ.
  // setSelectedJobForApply: Modalni ochish (ish berish) yoki yopish (null qilish) pulti.
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);


  // -------------------------------------------------------------------------------------------------------
  // 4-QADAM: MANTIQIY FUNKSIYALAR (HODISALARNI BOSHQARUVCHILAR / HANDLERS)
  // -------------------------------------------------------------------------------------------------------

  // A) ARIZA MUVAFFAQIYATLI YUBORILGANDA ISHGA TUSHUVCHI FUNKSIYA
  // (job) — qaysi vakansiyaga ariza yuborilgani parametr sifatida kirib keladi.
  const handleApplySuccess = (job) => {
    // setAppliedJobs pultini chaqiryapmiz.
    // "(prev) => { ... }" — prev (previous) — ayni shu lahzagacha topshirilgan barcha arizalar ro'yxati.
    setAppliedJobs((prev) => {
      // .some() — Detektiv asbob. Ro'yxatdagi kamida bitta ishning ID raqami biz yuborgan ishning ID siga tengmi?
      const allaqachonTopshirilgan = prev.some((item) => item.id === job.id);
      
      // Agar foydalanuvchi qandaydir yo'l bilan bir ishga ikki marta ariza yuborsa:
      // Hech narsani o'zgartirmasdan, eski ro'yxatning o'zini (prev) qaytaramiz.
      if (allaqachonTopshirilgan) return prev;

      // Agar birinchi marta topshirayotgan bo'lsa:
      // "[...prev, job]" — Spread operatori: eski arizalarni yangi massivga to'kamiz va orqasidan yangi ishni qo'shamiz.
      return [...prev, job];
    });

    // Ariza qabul qilingach, ekrandagi modal oynani yopamiz (xotirani bo'shatamiz -> null).
    setSelectedJobForApply(null);
  };


  // B) ARIZA TOPSHIRISH MODALINI OCHUVCHI FUNKSIYA
  // Qaysi vakansiyaning "Ariza topshirish" tugmasi bosilgan bo'lsa, o'sha ish obyekti kirib keladi.
  const handleOpenApplyModal = (job) => {
    // Xotiraga shu ishni solib qo'yamiz. React buni ko'rib darhol modalni ekranda chizadi.
    setSelectedJobForApply(job);
  };


  // C) VAKANSIYANI SAQLASH / SAQLASHNI BEKOR QILISH FUNKSIYASI (TOGGLE)
  // "Toggle" so'zi chiroqni o'chirib-yoqadigan kalit degani: agar yo'q bo'lsa qo'shadi, bor bo'lsa o'chiradi.
  const handleToggleSave = (job) => {
    setsavedjob((prev) => {
      // 1-qadam: Izquvar tekshiruvi. Bu ish avval saqlanganmi?
      const allaqachonbor = prev.some((item) => item.id === job.id);

      // 2-qadam: Agar allaqachon saqlangan bo'lsa (true bo'lsa) — uni o'chirishimiz kerak:
      if (allaqachonbor) {
        // .filter() — "Sehrli Elak". Faqat ID raqami biz bosgan ishga TENG BO'LMAGANLARNI elakdan o'tkazib qoldiradi.
        // Natijada, bosilgan ish elakdan tushib qoladi (o'chadi).
        return prev.filter((item) => item.id !== job.id);
      }

      // 3-qadam: Agar ro'yxatda yo'q bo'lsa — ro'yxatning oxiriga qo'shib yangi massiv yaratamiz.
      return [...prev, job];
    });
  };


  // D) SAQLANGAN SAHIFASIDAN BITTA ISHNI BUTUNLAY O'CHIRISH FUNKSIYASI
  // "jobId" — aynan qaysi raqamli ishni o'chirish kerakligini bildiruvchi raqam (masalan, 2).
  const handleRemoveSave = (jobId) => {
    // setsavedjob pultini bosib, elakdan faqat ID-si jobId ga teng bo'lmaganlarini saqlab qolamiz.
    setsavedjob((prev) => prev.filter((item) => item.id !== jobId));
  };


  // E) BARCHA SAQLANGAN ISHLARNI BIR ZUMDA TOZALASH (HAMMASINI O'CHIRISH)
  const handleclearAll = () => {
    // setsavedjob ichiga bo'sh massiv [] solsak, xotira butunlay tozalanadi.
    setsavedjob([]);
  };


  // =========================================================================================================
  // 5-QADAM: RETURN (JSX) — FOYDALANUVCHINING KO'ZIGA KO'RINADIGAN VIZUAL DUNYO
  // =========================================================================================================

  return (
    // <BrowserRouter> — butun veb-ilovamizni qamrab oluvchi tashqi qobiq. 
    // Sayt URL manzili (masalan: "/" yoki "/saqlangan") o'zgarganda sahifani qayta yuklamay boshqaradi.
    <BrowserRouter>

      {/* <Navbar /> — Doimiy bosh menyu qismi. Saytning eng yuqori qismida doim turadi. */}
      <Navbar />

      {/* <Routes> — Sahifalar yo'llari xaritasi. URL manzilga qarab ichidagi kerakli <Route> ni ochadi. */}
      <Routes>

        {/* 1-YO'L: Bosh sahifa (path="/") */}
        <Route
          path="/" // Brauzer qidiruv qatorida faqat sayt nomi turgandagi manzil.
          element={
            // element={...} — shu manzilga kirganda ekranda chizilishi kerak bo'lgan sahifa.
            <VakansiyalarPage
              // PROPS (Parametrlar) — ota komponent (App) o'z bolasiga (VakansiyalarPage) berayotgan narsalar:
              vakansiyalarRoyxati={vakansiyalarRoyxati} // Barcha ishlar ro'yxati
              shaharlar={shaharlar} // Shaharlar filtri
              sohalar={sohalar} // Sohalar filtri
              bandlikTurlari={bandlikTurlari} // Bandlik turlari
              maoshVariantlari={maoshVariantlari} // Maosh filtri
              savedjob={savedjob} // Hozirda qaysi ishlar saqlanganligi (yurakchani qizil qilish uchun)
              appliedJobs={appliedJobs} // Qaysi ishlarga ariza topshirilganligi (tugmaga "Topshirildi" deb yozish uchun)
              handleToggleSave={handleToggleSave} // Saqlash tugmasini bosganda ishlaydigan pult
              onOpenApplyModal={handleOpenApplyModal} // Ariza oynasini ochuvchi pult
            />
          }
        />

        {/* 2-YO'L: Saqlangan ishlar sahifasi (path="/saqlangan") */}
        <Route
          path="/saqlangan" // Foydalanuvchi "Saqlanganlar" tugmasini bosganda brauzer manzili shu bo'ladi.
          element={
            <SaqlanganPage
              savedjob={savedjob} // Saqlangan ishlar qutisi (faqat saqlanganlarni ko'rsatish uchun)
              appliedJobs={appliedJobs} // Arizalar holati
              handleRemoveSave={handleRemoveSave} // Ro'yxatdan bittalab o'chirish pulti
              handleclearAll={handleclearAll} // Hammasini tozalash pulti
              onOpenApplyModal={handleOpenApplyModal} // Bu yerdan turib ham ariza topshirish oynasini ochish imkoni
            />
          }
        />

      </Routes>

      {/* 
        SHARTLI RENDERLASH (Conditional Rendering) — "&&" (VA) operatori yordamida:
        selectedJobForApply ? (haqiqatmi?) 
        Agar selectedJobForApply === null bo'lsa — hech narsa chizilmaydi (yopiq turadi).
        Agar foydalanuvchi qaysidir ishning "Ariza topshirish" tugmasini bossa va selectedJobForApply ichiga ish obyekti tushsa:
        Darhol quyidagi <ArizaModal /> ekranda qalqib chiqadi!
      */}
      {selectedJobForApply && (
        <ArizaModal
          // Modal ichida qaysi ish haqida so'z borayotganini bildirish uchun ish ma'lumotlarini beramiz:
          job={selectedJobForApply}
          
          // Foydalanuvchi bu ishga allaqachon topshirib bo'lganmi? 
          // .some() tekshiradi va natija true yoki false bo'lib modalga o'tadi:
          alreadyApplied={appliedJobs.some(
            (item) => item.id === selectedJobForApply.id
          )}
          
          // Modal oynadagi "X" (yopish) tugmasi bosilganda:
          // setSelectedJobForApply(null) qilinadi, oyna ko'zdan yo'qoladi.
          onClose={() => setSelectedJobForApply(null)}
          
          // Modaldagi anketani to'ldirib, "Yuborish" tugmasi bosilganda:
          // handleApplySuccess funksiyasi chaqiriladi va arizalar ro'yxatiga qo'shiladi.
          onSubmitSuccess={() => handleApplySuccess(selectedJobForApply)}
        />
      )}

    </BrowserRouter>
  ); // return tugadi.
} // App funksiyasi tugadi.


// =========================================================================================================
// 6-QADAM: EXPORT (LOYIHAGA TAQDIM ETISH)
// =========================================================================================================

// "export default" — bu faylning bosh mahsuloti aynan shu App funksiyasi ekanini bildiradi.
// index.js (yoki main.jsx) fayli uni olib butun veb-sayt sahifasiga ulaydi.
export default App;


// 2-QISM: ULTRA SLOW-MOTION (VOQEALAR SEKINLASHTIRILGAN KADRDA)

// Keling, foydalanuvchi ekranda biror harakat qilganda kompyuterning ichida (RAM, Virtual DOM, haqiqiy DOM) sekundning mingdan bir ulushlarida nimalar ro‘y berishini ko‘ramiz.

// Voqea 1: Foydalanuvchi "Ariza topshirish" tugmasini bosdi
// [0.000 soniya] - FOYDALANUVCHI HARAKATI:
// Foydalanuvchi 1-vakansiya ("Senior frontend dasturchi") yonidagi "Ariza topshirish" tugmasiga sichqoncha bilan bosdi (Click).
// [0.001 soniya] - EVENT LISTENER & PROPS ZANJIRI:
// VakansiyalarPage ichidagi tugma onOpenApplyModal(job) funksiyasini chaqiradi.
// Bu chaqiruv to'g'ri ota komponentdagi `handleOpenApplyModal(job)` funksiyasiga uzatiladi.
// [0.002 soniya] - STATE O'ZGARISHI:
// `setSelectedJobForApply(job)` chaqiriladi.
// Xotira katakchasidagi `null` qiymati o'rniga 1-ishning obyekti joylashadi:
// selectedJobForApply = { id: 1, title: "Senior frontend dasturchi", ... }
// [0.003 soniya] - REACT RE-RENDER:
// React state o'zgarganini sezadi va butun `App` funksiyasini boshidan qayta o'qib chiqadi.
// [0.004 soniya] - SHARTLI RENDER TEKSHIRUVI:
// React kodning pastki qismidagi `{selectedJobForApply && <ArizaModal ... />}` qatoriga keladi.
// Oldin bu yerda `null && ...` edi (natija yolg'on bo'lib, oyna chizilmagan edi).
// Hozir esa `{id: 1, ...} && <ArizaModal ... />` (haqiqat!).
// [0.005 soniya] - BRAUZER EKRANI YANGILANDI:
// Virtual DOM orqali ekranning ustiga xira qora fon va o'rtada Ariza to'ldirish oynasi (Modal) paydo bo'ladi.
// Voqea 2: Modaldan ariza yuborildi ("Yuborish" bosildi)
// [0.000 soniya] - FOYDALANUVCHI HARAKATI:
// Foydalanuvchi ism-familiyasini yozib, "Yuborish" tugmasini bosdi.
// [0.001 soniya] - onSubmitSuccess ISHGA TUSHDI:
// Modal ichidagi hodisa App.jsx dagi `handleApplySuccess(selectedJobForApply)` ga signal beradi.
// [0.002 soniya] - XAVFSIZ TEKSHIRUV (.some):
// `setAppliedJobs((prev) => ...)` ichida `prev.some(item => item.id === 1)` ishlaydi.
// Oldin ariza yuborilganmi? Yo'q, ro'yxatda hali 1 raqamli ish yo'q. Natija: false.
// [0.003 soniya] - IMMUTABLE (BUZILMAS) YANGILANISH:
// `[...prev, job]` orqali yangi massiv yasaladi.
// appliedJobs endi = [{ id: 1, title: "Senior frontend dasturchi", ... }] bo'ldi.
// [0.004 soniya] - MODALNI YOPISH:
// Darhol `setSelectedJobForApply(null)` chaqiriladi.
// Xotiradagi tanlangan ish yana `null` ga aylanadi.
// [0.005 soniya] - EKRAN IKKI XIL YANGILANADI:
// 1. Modal oyna ekrandan g'oyib bo'ladi (chunki selectedJobForApply yana null).
// 2. 1-vakansiyaning "Ariza topshirish" tugmasi avtomatik tarzda "Topshirildi" (yoki faol bo'lmagan) holatga aylanadi.
// Chunki VakansiyalarPage ichiga uzatilgan appliedJobs endi bo'sh emas!
// 3-QISM: NEGA AYNAN SHUNDAY YOZILGAN? (DASTURCHI TAFEKKURI)

// Keling, dasturlashdagi 4 ta asosiy "Nega?" savoliga javob beramiz:

// 1. Nega savedjob va appliedJobs App.jsx ichida turibdi? Nega ular VakansiyalarPage ichida emas?

// Sababi (Lifting State Up): Agar biz savedjob xotirasini VakansiyalarPage ichida ochganimizda, SaqlanganPage sahifasi u ma'lumotlarni ko‘ra olmasdi! Chunki ikkita bola sahifa bir-birining xotirasiga to‘g‘ridan-to‘g‘ri kira olmaydi. Shuning uchun React-da umumiy xotira doimo ularning umumiy otasi (App) ichida saqlanadi va bolalarga meros (props) qilib beriladi.

// 2. Nega setsavedjob((prev) => ...) ko‘rinishida yozildi?

// Sababi (Asinxron xavfsizlik): Agar siz setsavedjob([...savedjob, job]) deb yozsangiz, foydalanuvchi tugmani juda tez-tez bosgan paytda, React xotiraning eski nusxasini olib qo‘yishi va ma’lumotlar yo‘qolib ketishi mumkin. (prev) degani — kompyuterga: "Shu daqiqada xotirada eng oxirgi nima bor bo‘lsa, aynan o‘shani olib ber" deb qat'iy kafolat berish demakdir.

// 3. Nega selectedJobForApply uchun alohida boolean (isOpen) ochilmadi?

// Sababi: Yangi o‘rganuvchilar ko‘pincha ikkita state ochishadi: const [isOpen, setIsOpen] = useState(false) va const [selectedJob, setSelectedJob] = useState(null). Bu ortiqcha ish! Agar biz selectedJobForApply ning o‘ziga ish obyektini yuklasak — bu oyna ochiq ekanini bildiradi, agar null qilib qo‘ysak — oyna yopiq ekanini bildiradi. Bitta o‘q bilan ikki quyon uriladi!

// 4. Nega ...prev (uchta nuqta) ishlatiladi? prev.push(job) qilsak bo‘lmaydimi?

// 10 yoshli bolaga tushuntirish: Tasavvur qiling, siz do‘konda yangi kiyim kiymoqchisiz. Agar kiyinib chiqib onangizga ko‘rsatsangiz (...prev — yangi narsa), onangiz o‘zgarishni darhol payqaydi. Agar eski kiyimingizning cho‘ntagiga shunchaki bitta konfet solib qo‘ysangiz (prev.push), onangiz sizga qarab hech qanday o‘zgarish sezmaydi. React ham xuddi shunday: u faqat yangi massiv yaratilgandagina ekranni yangilaydi (bunga Immutability deyiladi).