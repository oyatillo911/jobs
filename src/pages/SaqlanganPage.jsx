// =========================================================================================================
// 1-QADAM: ASOSIY USTAXONANI CHAQIRISH (IMPORT)
// =========================================================================================================

// "import" — Tashqi kutubxonadan asbobni chaqirish buyrug'i.
// "React" — JSX teglari (HTML ko'rinishidagi kodlar) ishlay olishi uchun bosh mutaxassis.
// "from 'react'" — Bular "node_modules/react" qutisidan olinmoqda.
// DIQQAT QILING: Bu yerda useState yoki useMemo YO'Q! Chunki bu sahifa o'zida shaxsiy xotira saqlamaydi.
// U faqat ota fayldan (App.jsx) kelgan ma'lumotlarni ko'rsatib beruvchi "Ijrochi (Presentational) Komponent".
import React from 'react';


// =========================================================================================================
// 2-QADAM: KOMPONENT VA UNING HIMOYALANGAN SOVG'ALAR QUTISI (PROPS)
// =========================================================================================================

// "function" — Yangi mustaqil funksiya/sahifa yaratish.
// "SaqlanganPage" — Sahifaning nomi (Katta harf bilan yozilishi shart).
// "({ ... })" — Object Destructuring: App.jsx berib yuborgan barcha sovg'alarni nomma-nom qabul qilib olish.
function SaqlanganPage({
  // "= []" — Xavfsizlik qalqoni (default value). Agar ota fayl bu ro'yxatni berishni unutsa,
  // dastur qizil xato bilan to'xtab qolmaydi, balki bo'sh ro'yxat deb ishlab ketaveradi!
  savedjob = [],               // App.jsx dagi saqlangan ishlar ro'yxati (ichida tanlangan obyektlar bor)
  appliedJobs = [],            // Ariza topshirilgan ishlar ro'yxati (yashil holatni ko'rsatish uchun)

  // "= () => {}" — Funksiyalar uchun xavfsizlik yostiqchasi (bo'sh funksiya).
  // Agar ota fayl funksiyani yubormasa ham, tugma bosilganda dastur qulab tushmaydi!
  handleRemoveSave = () => {}, // Bitta ishni o'chirish pulti (App.jsx ga boradi)
  handleclearAll = () => {},   // Barcha saqlanganlarni bir zumda tozalash pulti
  onOpenApplyModal = () => {}, // Ariza topshirish modal oynasini ochuvchi pult
}) {

  // =======================================================================================================
  // 3-QADAM: EKRANGA CHIZISH (JSX RETURN)
  // =======================================================================================================

  return (
    // Butun sahifani o'rab turuvchi asosiy quti (konteyner).
    // max-w-[1280px] — Sahifa eni eng ko'pi bilan 1280px bo'lsin.
    // mx-auto — Ekranning o'rtasiga tekislab qo'yish (chap va o'ngdan bir xil masofa).
    // px-[32px] py-[28px] — Ichki tomondan chetlardan bo'sh joy qoldirish (padding).
    <div className="max-w-[1280px] mx-auto px-[32px] py-[28px]">

      {/* ------------------------------------------------------------------------------------------------- */}
      {/* TEPADAGI SARLAVHA VA "BARCHASINI O'CHIRISH" TUGMASI QATORI */}
      {/* ------------------------------------------------------------------------------------------------- */}
      {/* flex justify-between — Chap tomonga sarlavhani, o'ng tomonga tugmani bir chiziqqa joylashtiradi */}
      <div className="flex justify-between items-center mb-[20px]">
        
        {/* Sarlavha va uning yonidagi hisoblagich raqam */}
        <div className="text-[22px] font-medium">
          Saqlangan vakansiyalar{' '}
          {/* savedjob.length — Massiv ichida nechta ish borligini hisoblaydi va raqam qilib chiqaradi */}
          <span className="text-[13px] text-[#999] font-normal">
            {savedjob.length} ta
          </span>
        </div>

        {/* 
          SHARTLI KO'RSATISH (&& operatori):
          "savedjob.length > 0 && ..."
          Agar ro'yxatda kamida 1 ta ish bo'lsa — "Barchasini o'chirish" tugmasi ko'rinsin.
          Agar ro'yxat bo'm-bo'sh bo'lsa — bu tugma ekranda umuman ko'rinmasin (chunki bo'sh narsani o'chirib bo'lmaydi).
        */}
        {savedjob.length > 0 && (
          <button
            type="button"
            // onClick={handleclearAll} — Bosilganda App.jsx dagi setsavedjob([]) funksiyasini ishga tushiradi
            onClick={handleclearAll}
            className="text-[12px] text-[#555] bg-transparent border-none cursor-pointer underline"
          >
            Barchasini o'chirish
          </button>
        )}
      </div>


      {/* ------------------------------------------------------------------------------------------------- */}
      {/* ASOSIY MAYDON: RO'YXAT BO'SHMI YOKI ISHLAR BORMI? (TERNARY OPERATOR) */}
      {/* ------------------------------------------------------------------------------------------------- */}
      {/* 
        savedjob.length === 0 ? (agar 0 ta bo'lsa) : (agar 0 dan ko'p bo'lsa)
      */}
      {savedjob.length === 0 ? (
        // A HOLAT: Agar birorta ham ish saqlanmagan bo'lsa, quyidagi xabar chiqadi:
        <div className="border border-[#e5e5e5] rounded-[10px] py-[40px] px-[20px] text-center text-[#777] text-[14px] mb-[12px]">
          Saqlangan vakansiyalar ro‘yxati bo‘sh.
        </div>
      ) : (
        // B HOLAT: Agar saqlangan ishlar bo'lsa, .map() orqali har birini bittalab ko'rib chiqamiz:
        savedjob.map((item, index) => {
          
          // -----------------------------------------------------------------------------------------------
          // MATNNI TOZALASH VA TAYYORLASH MANTIQI:
          // -----------------------------------------------------------------------------------------------
          // item.company — Masalan: "Datalab · IT Park rezidenti"
          // (item.company || '') — Agar kompaniya nomi yo'q bo'lsa, xato bermasligi uchun bo'sh matn olamiz.
          // .split('·') — Matnni o'rtadagi '·' belgisi bo'yicha ikkiga bo'lib, ro'yxat qiladi: ["Datalab ", " IT Park rezidenti"].
          // [0] — Shu ro'yxatning birinchi bo'lagini, ya'ni faqat sof kompaniya nomini ("Datalab ") oladi.
          // .trim() — So'zning boshi va oxiridagi keraksiz bo'shliqlarni kesib tashlaydi: "Datalab".
          const kompaniyaNomi = (item.company || '').split('·')[0].trim();

          // DETEKTIV TEKSHIRUVI:
          // .some() — Shu ko'rib chiqilayotgan saqlangan ishga avval ariza yuborilganmi?
          // Agar appliedJobs ichida xuddi shu ID-li ish bo'lsa, topshirilganmi = true bo'ladi!
          const topshirilganmi = appliedJobs.some((applied) => applied.id === item.id);

          return (
            // Bitta ish qatorining (row) asosiy qobig'i:
            // key={item.id ?? index} — React har bir qatorni tanib olishi uchun shaxsiy ID.
            <div
              key={item.id ?? index}
              className="row border border-[#e5e5e5] hover:border-[#bbb] rounded-[10px] py-[16px] px-[20px] bg-white transition-colors duration-150 flex gap-[16px] items-center mb-[12px]"
            >
              
              {/* 1-USTUN: QIZIL XATCHO'P (BOOKMARK) BELGISI */}
              {/* Bosilganda handleRemoveSave(item.id) chaqiriladi va shu ish saqlanganlardan o'chadi */}
              <span
                onClick={() => handleRemoveSave(item.id)}
                title="Saqlanganlardan o‘chirish"
                className="text-[#d4380d] cursor-pointer"
              >
                <svg
                  className="w-[18px] h-[18px] shrink-0"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor" // Qizil rang bilan to'liq bo'yalgan
                >
                  <path d="M11.1504 16.9189C11.6853 16.6515 12.3147 16.6515 12.8496 16.9189L17.9551 19.4717C18.0216 19.5049 18.0996 19.4562 18.0996 19.3818V5C18.0996 4.94477 18.0552 4.90039 18 4.90039H6C5.94477 4.90039 5.90039 4.94477 5.90039 5V19.3818C5.90039 19.4562 5.97843 19.5049 6.04492 19.4717L11.1504 16.9189Z" />
                </svg>
              </span>

              {/* 2-USTUN: KOMPANIYANING BOSH HARFI (LOGOTIP O'RNIDA) */}
              <div className="w-[44px] h-[44px] rounded-[10px] bg-[#f2f2f2] flex items-center justify-center text-[16px] font-medium text-[#555] shrink-0">
                {item.letter}
              </div>

              {/* 3-USTUN: ASOSIY MA'LUMOTLAR (KASB NOMI, KOMPANIYA, SHAHAR, VAQT) */}
              {/* flex-1 — Qolgan barcha bo'sh joyni egallaydi va boshqa ustunlarni chetga suradi */}
              <div className="flex-1">
                <div className="text-[15px] font-medium">{item.title}</div>
                <div className="text-[13px] text-[#777] mt-[2px]">
                  {/* Tozalangan kompaniya nomi, shahar va e'lon vaqti nuqta bilan ajratib ko'rsatiladi */}
                  {kompaniyaNomi} · {item.city} · {item.time}
                </div>
              </div>

              {/* 4-USTUN: OYLIK MAOSH KO'RSATKICHI */}
              <div className="text-[14px] font-medium mr-[12px]">
                {item.salaryText}{' '}
                <span className="font-normal text-[12px] text-[#999]">so'm</span>
              </div>

              {/* 5-USTUN: "ARIZA TOPSHIRISH" TUGMASI (HAVOLA SHAKLIDA) */}
              <a
                href="#ariza"
                onClick={(e) => {
                  // e.preventDefault() — Havola bosilganda brauzer manziliga #ariza qo'shilib,
                  // sahifa sakrab (sakrab ketish effekti) ketmasligi uchun standart harakatni to'xtatadi!
                  e.preventDefault();
                  // Shu vakansiyani App.jsx dagi setSelectedJobForApply ga uzatib modalni ochadi:
                  onOpenApplyModal(item);
                }}
                // Agar topshirilgan bo'lsa — YASHIL ramka va yashil fon, aks holda OQ fon:
                className={`border rounded-[8px] text-[13px] py-[6px] px-[14px] mr-[8px] no-underline transition-colors duration-150 ${
                  topshirilganmi
                    ? "border-[#b7eb8f] bg-[#f6ffed] text-[#237804] font-medium"
                    : "border-[#d9d9d9] hover:border-[#1a1a1a] bg-white text-[#1a1a1a]"
                }`}
              >
                {topshirilganmi ? "Ariza topshirildi" : "Ariza topshirish"}
              </a>

              {/* 6-USTUN: AXLAT QUTISI VA "O'CHIRISH" MATNI */}
              {/* Foydalanuvchiga yana bitta qulaylik: xatcho'pdan tashqari axlat qutisi orqali ham o'chira oladi */}
              <span
                onClick={() => handleRemoveSave(item.id)}
                className="rowact text-[#999] cursor-pointer inline-flex gap-[4px] items-center text-[12px] hover:text-[#d4380d] transition-colors"
              >
                <svg
                  className="w-[15px] h-[15px] shrink-0"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 3H15C15.55 3 16 3.45 16 4V5H20C20.55 5 21 5.45 21 6C21 6.55 20.55 7 20 7H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V7H4C3.45 7 3 6.55 3 6C3 5.45 3.45 5 4 5H8V4C8 3.45 8.45 3 9 3ZM7 7V19H17V7H7Z" />
                </svg>
                O'chirish
              </span>

            </div>
          );
        })
      )}


      {/* ------------------------------------------------------------------------------------------------- */}
      {/* ENG PASTKI BILDIRISHNOMA (NOTIFICATION BANNER) BLOKI */}
      {/* ------------------------------------------------------------------------------------------------- */}
      <div className="border border-[#e5e5e5] hover:border-[#bbb] rounded-[10px] py-[16px] px-[20px] bg-white transition-colors duration-150 flex gap-[12px] items-center text-[13px] text-[#555]">
        {/* Qo'ng'iroqcha / bildirishnoma belgisi */}
        <span className="text-[#999]">
          <svg
            className="w-[16px] h-[16px] shrink-0"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M11.1504 16.9189C11.6853 16.6515 12.3147 16.6515 12.8496 16.9189L17.9551 19.4717C18.0216 19.5049 18.0996 19.4562 18.0996 19.3818V5C18.0996 4.94477 18.0552 4.90039 18 4.90039H6C5.94477 4.90039 5.90039 4.94477 5.90039 5V19.3818C5.90039 19.4562 5.97843 19.5049 6.04492 19.4717L11.1504 16.9189Z" />
          </svg>
        </span>

        {/* Banner matni */}
        Yangi vakansiyalar chiqishi haqida{' '}
        <b className="font-medium text-[#1a1a1a]">kunlik bildirishnoma</b> olishni xohlaysizmi?

        {/* Bildirishnomani yoqish tugmasi (ml-auto uni butunlay o'ng burchakka suradi) */}
        <button
          type="button"
          className="border border-[#d9d9d9] bg-white text-[#1a1a1a] rounded-[8px] text-[13px] py-[5px] px-[14px] ml-auto cursor-pointer hover:border-[#1a1a1a] transition-colors"
        >
          Bildirishnomani yoqish
        </button>
      </div>

    </div>
  ); // return tugadi
} // SaqlanganPage komponenti tugadi

// Ushbu sahifani butun loyihada ishlatish uchun export qilamiz
export default SaqlanganPage;



// 2-QISM: SEKUNDNING MINGDAN BIR ULUSHIDA (ULTRA SLOW-MOTION REPLAY)

// Keling, foydalanuvchi "Saqlanganlar" sahifasida biror amal bajarganda dastur ichida nimalar yuz berishini sekinlashtirilgan kadrda ko‘ramiz.

// Voqea 1: Foydalanuvchi 2-ishning yonidagi "O'chirish" (axlat qutisi) tugmasini bosdi
// [0.000 soniya] - FOYDALANUVCHI HARAKATI:
// Foydalanuvchi "O'chirish" yozuviga sichqoncha bilan bosdi (Click).
// [0.001 soniya] - ONCLICK UYG'ONDI:
// SaqlanganPage ichidagi onClick={() => handleRemoveSave(2)} chaqirildi.
// Bu chaqiruv to'g'ridan-to'g'ri ota fayldagi (App.jsx) handleRemoveSave(2) ga yuborildi.
// [0.002 soniya] - APP.JSX DAHOSI VA FILTER ELAGI:
// App.jsx ichida:
// setsavedjob((prev) => prev.filter((item) => item.id !== 2));
// Kompyuter elakdan o'tkazadi:
// - 1-ish: ID=1 !== 2 (true, elakda qoladi).
// - 2-ish: ID=2 !== 2 (FALSE! 2-ish elakdan pastga tushib ketadi, ya'ni o'chadi).
// - 3-ish: ID=3 !== 2 (true, elakda qoladi).
// [0.003 soniya] - YANGI MASSIV YARATILDI:
// Xotiradagi savedjob endi faqat [1-ish, 3-ish] dan iborat yangi massivga aylandi.
// [0.004 soniya] - PROPS OQIMI (OTA -> BOLA):
// App.jsx yangilangan savedjob ro'yxatini qaytadan SaqlanganPage ga uzatadi.
// [0.005 soniya] - SAQLANGANPAGE RE-RENDER:
// SaqlanganPage qaytadan chiziladi:
// - savedjob.length endi 3 emas, 2 ta bo'lib qoldi.
// - 2-raqamli ish kartochkasi ko'z ochib yumguncha ekrandan g'oyib bo'ldi!
// Voqea 2: "Barchasini o'chirish" tugmasi bosildi
// [0.000 soniya] - HARAKAT:
// Foydalanuvchi tepada turgan "Barchasini o'chirish" tugmasini bosdi.
// [0.001 soniya] - HODISA UZATILDI:
// onClick={handleclearAll} orqali App.jsx dagi handleclearAll funksiyasi chaqirildi.
// [0.002 soniya] - TO'LIQ TOZALASH:
// App.jsx setsavedjob([]) qilib, xotiraga bo'm-bo'sh massiv joylashtirdi.
// [0.003 soniya] - SAQLANGANPAGE TERNARY SHARTI ISHLADI:
// SaqlanganPage yangi props oldi: savedjob = [].
// Shart tekshiriladi: savedjob.length === 0 ?
// Natija: 0 === 0 -> HAQIQAT (TRUE)!
// [0.004 soniya] - EKRAN TUBDAN O'ZGARDI:
// 1. Barcha ish kartochkalari bir zumda ekrandan olib tashlandi.
// 2. Tepada turgan "Barchasini o'chirish" tugmasi g'oyib bo'ldi (chunki savedjob.length > 0 emas).
// 3. O'rtada chiroyli qilib: "Saqlangan vakansiyalar ro‘yxati bo‘sh." degan blok paydo bo'ldi!
// 3-QISM: DASTURCHI TAFEKKURI VA 4 TA MUHIM SIR
// 1. Nega bu sahifada birorta ham useState yo‘q?

// Sababi (Presentational Component): Dasturlashda komponentlar ikkiga bo‘linadi:

// Aqlli (Smart / Container) komponentlar — barcha xotira va qarorlarni o‘zida saqlaydi (bizda bu App.jsx).
// Ijrochi (Dumb / Presentational) komponentlar — o‘zida hech qanday xotira saqlamaydi, otasi nima bersa shuni ekranga chiroyli qilib chiqaradi (bizda bu SaqlanganPage.jsx). Bu loyihani boshqarishni juda osonlashtiradi. Barcha xotira bitta joyda (App.jsx) bo‘lgani uchun ma’lumotlar hech qachon chalkashib ketmaydi.
// 2. item.company.split('·')[0].trim() — nega bu kod yozildi?

// E'lonlar bazasida kompaniya nomi shunday yozilgan: "Datalab · IT Park rezidenti". Lekin saqlanganlar sahifasida qatorlar kichikroq bo‘lgani sababli, uzun matn sig‘may qolishi mumkin. Shuning uchun dasturchi split('·') orqali uni o‘rtadagi nuqtadan kesib oldi va faqat bosh qismini ("Datalab") ko‘rsatishga qaror qildi. Bu dizaynni toza va ixcham saqlaydi!

// 3. Nega <a href="#ariza"> ga e.preventDefault() qo‘yildi?

// Standart HTML-da <a> tegi boshqa manzilga o‘tish uchun ishlatiladi. Agar unga e.preventDefault() qo‘yilmasa, tugma bosilganda brauzer manzil qatoriga mysite.uz/saqlangan#ariza deb yozib qo‘yadi va sahifani tepaga yoki pastga sakratib yuboradi. e.preventDefault() — bu "Hey brauzer, o‘z bilganingcha sakrama, to‘xtab tur! Men shunchaki ariza oynasini ochmoqchiman" deb buyruq berishdir.

// 4. Nega ikkita o‘chirish tugmasi bor (ham xatcho‘p, ham axlat qutisi)?

// Bu UX (User Experience — Foydalanuvchi qulayligi) qoidasi! Ba'zi odamlar xatcho‘p belgisini bosib o‘chirishga o‘rgangan, boshqa odamlar esa doim matnli "O‘chirish" yozuvini yoki axlat qutisini qidiradi. Ikkala tugmaga ham bir xil handleRemoveSave(item.id) ulab qo‘yilsa, foydalanuvchi qaysi birini bossa ham maqsadiga erishadi!