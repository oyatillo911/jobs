// =========================================================================================================
// 1-QADAM: IMPORT BO'LIMI
// =========================================================================================================
// Diqqat: React 19 zamonaviy versiyasida JSX kodlari ishlashi uchun fayl boshiga "import React" yozish shart emas.
// Bu komponent tashqaridan faqat props (xususiyatlar) olib, uni chiroyli vakansiya kartochkasi qilib chizadi.

// =========================================================================================================
// 2-QADAM: KOMPONENT VA PROPS (KIRIB KELUVCHI MA'LUMOTLAR)
// =========================================================================================================
// "JobCard" - saytda bitta vakansiya haqidagi ma'lumotlarni (kompaniya harfi, lavozim, maosh, shahar, teglar)
// chiroyli oq kartochka shaklida ko'rsatib beruvchi universal komponent.
// Props tushuntirishi:
// 1. job - vakansiyaning barcha ma'lumotlari jamlangan obyekt (id, letter, title, company, salaryText, city, time, tags).
// 2. isSaved - bu vakansiya foydalanuvchi tomonidan saqlanganmi yoki yo'qmi (true bo'lsa xatcho'p qizil bo'ladi).
// 3. onToggleSave - foydalanuvchi xatcho'pni bosganda uni saqlanganlarga qo'shish yoki olib tashlash funksiyasi.
// 4. onClick - kartochkaning o'zi bosilganda ariza topshirish modalini ochish funksiyasi.
function JobCard({ job, isSaved, onToggleSave, onClick }) {
  
  // -------------------------------------------------------------------------------------------------------
  // 3-QADAM: HODISALARNI BOSHQARISH (EVENT HANDLERS)
  // -------------------------------------------------------------------------------------------------------

  // "kartochkaBosildi" - Butun kartochka ustiga bosilganda ishga tushadi:
  function kartochkaBosildi(e) {
    // "e.preventDefault()" - Standart HTML havolasi (#vakansiya) brauzer manziliga qo'shilib,
    // sahifaning sakrab (jump) ketishining oldini oladi.
    e.preventDefault();
    // Ota komponent uzatgan ariza modalini ochish pultini chaqiramiz:
    onClick();
  }

  // "saqlashBosildi" - O'ng burchakdagi xatcho'p (bookmark) tugmasi bosilganda ishga tushadi:
  function saqlashBosildi(e) {
    // Brauzerning standart havola harakatini to'xtatamiz:
    e.preventDefault();
    // "e.stopPropagation()" - SEHRLI QALQON!
    // Agar bu yozilmasa, xatcho'p bosilganda zarba to'lqini uning orqasidagi butun kartochkaga ham o'tib ketadi
    // va xatcho'p bilan birga ariza modali ham ochilib ketardi (bunga "Event Bubbling" deyiladi).
    // stopPropagation() zarbani shu joyning o'zidayoq ushlab qoladi!
    e.stopPropagation();
    // Saqlash/o'chirish funksiyasini ishga tushiramiz:
    onToggleSave();
  }

  // =======================================================================================================
  // 4-QADAM: JSX RETURN (VIZUAL KARTOCKA TUZILISHI)
  // =======================================================================================================

  return (
    // Asosiy havola qobig'i: bosilganda butun kartochka sezgir (clickable) bo'ladi
    <a
      href="#vakansiya"
      onClick={kartochkaBosildi}
      className="border border-[#e5e5e5] hover:border-[#bbb] rounded-[10px] py-[16px] px-[20px] bg-white transition-colors duration-150 flex gap-[16px] items-start mb-[12px] no-underline text-inherit cursor-pointer"
    >
      {/* 1-USTUN: Kompaniya nomining bosh harfi logotipi */}
      <div className="w-[48px] h-[48px] rounded-[10px] bg-[#f2f2f2] flex items-center justify-center text-[18px] font-medium text-[#555] shrink-0">
        {job.letter}
      </div>

      {/* 2-USTUN: Asosiy ma'lumotlar bloki (kasb, maosh, kompaniya, shahar, vaqt, teglar) */}
      <div className="flex-1">
        {/* Yuqori qator: Kasb nomi va oylik maosh */}
        <div className="flex justify-between gap-[12px]">
          <div className="text-[16px] font-medium text-neutral-900">{job.title}</div>
          <div className="text-[15px] font-medium whitespace-nowrap text-neutral-900">
            {job.salaryText}{' '}
            <span className="font-normal text-[12px] text-[#999]">so'm/oy</span>
          </div>
        </div>

        {/* Kompaniya nomi */}
        <div className="text-[13px] text-[#777] mt-[2px]">{job.company}</div>

        {/* Shahar, e'lon vaqti va bandlik teglari qatori */}
        <div className="flex gap-[14px] items-center mt-[8px] text-[12px] text-[#999] flex-wrap">
          {/* Joylashgan shahar nishoni */}
          <span className="inline-flex gap-[4px] items-center text-[#555]">
            {/* Joylashuv (lokatsiya) ikonchasi */}
            <svg
              className="w-[14px] h-[14px] shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C8.13 2 5 5.13 5 8.5C5 13.25 12 22 12 22C12 22 19 13.25 19 8.5C19 5.13 15.87 2 12 2ZM12 11C10.62 11 9.5 9.88 9.5 8.5C9.5 7.12 10.62 6 12 6C13.38 6 14.5 7.12 14.5 8.5C14.5 9.88 13.38 11 12 11Z" />
            </svg>
            {job.city}
          </span>

          {/* E'lon vaqti (masalan: "Hozirgina", "Bugun") */}
          <span>{job.time}</span>

          {/* Har bir bandlik tegi (#To'liq stavka, #Masofaviy va h.k.) */}
          {(job.tags || []).map((tag) => (
            <span
              key={tag}
              className="py-[2px] px-[8px] rounded-[6px] text-[12px] bg-[#f2f2f2] text-[#555]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 3-USTUN: Xatcho'p (Saqlash / Bookmark) tugmasi */}
      <button
        type="button"
        onClick={saqlashBosildi}
        className={`cursor-pointer p-[4px] bg-transparent border-none ${
          isSaved ? 'text-[#d4380d]' : 'text-[#999]'
        }`}
        title={isSaved ? 'Saqlanganlardan olib tashlash' : 'Saqlash'}
      >
        <svg
          className="w-[18px] h-[18px] shrink-0"
          viewBox="0 0 24 24"
          fill={isSaved ? 'currentColor' : 'none'} // Saqlangan bo'lsa ichi qizil bo'yaladi
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M11.1504 16.9189C11.6853 16.6515 12.3147 16.6515 12.8496 16.9189L17.9551 19.4717C18.0216 19.5049 18.0996 19.4562 18.0996 19.3818V5C18.0996 4.94477 18.0552 4.90039 18 4.90039H6C5.94477 4.90039 5.90039 4.94477 5.90039 5V19.3818C5.90039 19.4562 5.97843 19.5049 6.04492 19.4717L11.1504 16.9189Z" />
        </svg>
      </button>
    </a>
  );
}

// =========================================================================================================
// 2-QISM: ULTRA SLOW-MOTION (VOQEALAR SEKINLASHTIRILGAN KADRDA)
// =========================================================================================================
// Voqea: Foydalanuvchi xatcho'p belgisini bosdi:
// [0.000 soniya] - FOYDALANUVCHI HARAKATI:
// Foydalanuvchi kartochka ichidagi kichik xatcho'p (bookmark) tugmasiga bosdi.
// [0.001 soniya] - SAQLASHBOSILDI() FUNKSIYASI ISHGA TUSHDI:
// e.preventDefault() sahifaning sakrab ketishining oldini oldi.
// e.stopPropagation() hodisaning butun kartochkaga tarqalishini to'xtatdi (ariza modali ochilmadi!).
// [0.002 soniya] - ONTOGGLESAVE() CHAQIRILDI:
// Bu buyruq ota komponentdagi handleToggleSave funksiyasini uyg'otadi.
// [0.003 soniya] - XATCHO'P RANGI O'ZGARDI:
// isSaved holati false dan true ga o'tdi.
// SVG ikonkasi "none" o'rniga "currentColor" (qizil) bilan bo'yaldı va darhol foydalanuvchiga saqlanganini bildirdi!

// =========================================================================================================
// 3-QISM: DASTURCHI TAFEKKURI VA NEGA AYNAN SHUNDAY YOZILGAN?
// =========================================================================================================
// 1. Nega butun kartochka <a> tegi bilan o'ralgan?
//    - Bu foydalanuvchiga juda qulay (UX): kartochkaning ixtiyoriy joyiga (matniga, chetiga) bosganda ham
//      vakansiya tafsilotlari yoki ariza topshirish ochiladi.
// 2. Nega aynan e.stopPropagation() bu yerda hayotiy muhim?
//    - Agar stopPropagation() bo'lmasa, foydalanuvchi "Men buni shunchaki saqlab qo'ymoqchi edim" deb xatcho'pni
//      bosganida birdaniga ariza berish modali ham ochilib ketib, foydalanuvchining g'ashiga tekkan bo'lardi.
//      stopPropagation() bitta kartochka ichida mustaqil ikkita amal bo'lishini ta'minlaydi!

export default JobCard;
