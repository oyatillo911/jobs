// =========================================================================================================
// 1-QADAM: ASBOBLARNI CHAQIRISH (IMPORT)
// =========================================================================================================

// "import React" — JSX teglari brauzer tushunadigan tilga aylanishi uchun bosh poydevor.
// "{ useState }" — Formadagi har bir katakcha (ism, telefon, rezyume, rozilik) ma'lumotlarini eslab qoluvchi "Reaktiv Xotira".
// "from 'react'" — Bular React kutubxonasining asosiy qutisidan olinmoqda.
import React, { useState } from 'react';


// =========================================================================================================
// 2-QADAM: KOMPONENT VA UNGA KELADIGAN SOVG'ALAR QUTISI (PROPS)
// =========================================================================================================

// "function ArizaModal" — Ariza topshirish modal oynasini yasovchi funksiya.
// "({ ... })" — App.jsx dan kelayotgan parametrlarni qabul qilish:
function ArizaModal({
  job,                    // Foydalanuvchi qaysi ish uchun ariza bermoqchi bo'lsa, o'sha ishning to'liq obyekti (title, company...)
  onClose,                // Modalni yopish uchun pult (App.jsx dagi setSelectedJobForApply(null) ni chaqiradi)
  onSubmitSuccess,        // Ariza muvaffaqiyatli yuborilganda ishga tushadigan signal pulti
  alreadyApplied = false, // Bu ishga avval topshirilganmi? (Agar berilmasa, boshlang'ich qiymati false bo'ladi)
}) {

  // =======================================================================================================
  // 3-QADAM: FORMA MAYDONLARI UCHUN SHAXSIY REAKTIV XOTIRALAR (STATE)
  // =======================================================================================================

  // 1-XOTIRA: Foydalanuvchi yozayotgan ism va familiya (boshida bo'sh: '')
  const [ismFamiliya, setIsmFamiliya] = useState('');

  // 2-XOTIRA: Telefon raqami (boshida bo'sh: '')
  const [telefon, setTelefon] = useState('');

  // 3-XOTIRA: Elektron pochta manzili (boshida bo'sh: '')
  const [email, setEmail] = useState('');

  // 4-XOTIRA: Yuklangan rezyume faylining nomi (masalan: "Ali_Rezyume.pdf")
  const [faylNomi, setFaylNomi] = useState('');

  // 5-XOTIRA: Qo'shimcha xat / ma'lumot (Cover letter)
  const [xat, setXat] = useState('');

  // 6-XOTIRA: Shartlarga rozilik belgisi (Checkbox). Boshida true (roziman) holatida turadi
  const [rozilik, setRozilik] = useState(true);

  // 7-XOTIRA: Ariza yuborildimi-yo'qmi? (boshida false, "Yuborish" bosilgach 1 sekundga true bo'ladi)
  const [yuborildi, setYuborildi] = useState(false);


  // =======================================================================================================
  // 4-QADAM: YORDAMCHI HISOBLASHLAR VA HODISALAR (EVENT HANDLERS)
  // =======================================================================================================

  // KOMPANIYA NOMINI TOZALAB OLISH:
  // "job?.company" — Optional Chaining (?.) — agar job mavjud bo'lmasa xato bermasdan undefined qaytaradi.
  // "|| ''" — Agar company bo'sh bo'lsa, bo'sh matn olib xatolikdan asraydi.
  // ".split('·')[0].trim()" — "Datalab · IT Park" so'zini nuqtadan bo'lib, birinchi qismini oladi va bo'shliqlarni kesadi ("Datalab").
  const kompaniyaNomi = (job?.company || '').split('·')[0].trim();


  // REZYUME FAYLI TANLANGANDA ISHGA TUSHUVCHI FUNKSIYA:
  // "e" — Fayl tanlash hodisasi (event).
  function faylTanlandi(e) {
    // "e.target.files" — Kompyuterdan tanlangan barcha fayllar ro'yxati.
    // "[0]" — Biz faqat 1 ta fayl yuklashga ruxsat berganimiz uchun ro'yxatning birinchi faylini olamiz.
    const tanlanganFayl = e.target.files[0];
    
    // Agar foydalanuvchi fayl tanlash oynasini ochib, faylni tanlab "OK" ni bossa (bekor qilmasa):
    if (tanlanganFayl) {
      // O'sha faylning nomini xotiraga yozib qo'yamiz (ekranda ko'rsatish uchun)
      setFaylNomi(tanlanganFayl.name);
    }
  }


  // FORMANI YUBORISH FUNKSIYASI (TUGMA BOSILGANDA):
  function formaniYuborish(e) {
    // "e.preventDefault()" — FORMANING BRAUZERNI YANGILAB YUBORISHINING OLDINI OLUVCHI TORMOZ!
    e.preventDefault();

    // DARVOZABON SHARTI (GUARD CLAUSE):
    // 1. yuborildi bo'lsa (allaqachon bitta bosilgan bo'lsa)
    // 2. !rozilik bo'lsa (rozilik katagi belgilanmagan bo'lsa)
    // 3. ismFamiliya bo'sh bo'lsa
    // 4. telefon bo'sh bo'lsa
    // Agar bulardan bittasi to'g'ri kelsa, funksiya DARHOL TO'XTAYDI va pastga o'tmaydi!
    if (yuborildi || !rozilik || ismFamiliya.trim() === '' || telefon.trim() === '') {
      return;
    }

    // Agar hamma shartlar to'g'ri bo'lsa, yuborildi holatini true qilamiz (tugma "Yuborildi!" ga aylanadi)
    setYuborildi(true);

    // "setTimeout" — Haqiqiy hayotdagi internet kutishini (serverga borib kelish vaqtini) taqlid qiluvchi soat!
    // 1000 millisekund (ya'ni 1 soniya) kutib, keyin ichidagi kodni ishga tushiradi:
    setTimeout(() => {
      // App.jsx ga signal yuboramiz: "Ariza yetib keldi, uni arizalar ro'yxatiga qo'sh va modalni yop!"
      onSubmitSuccess();
    }, 1000);
  }


  // MODAL OYNASINI YOPISH FUNKSIYASI ("X" yoki "Bekor qilish" bosilganda):
  function modalniYopish(e) {
    e.preventDefault(); // Brauzer manziliga #vakansiya qo'shilib ketmasin
    onClose();          // Ota komponentga signal berib o'zini yoptiradi
  }


  // =======================================================================================================
  // 5-QADAM: VIZUAL KO'RINISh (JSX RETURN)
  // =======================================================================================================

  return (
    // BUTUN EKRANNI QOPLOVCHI ASOSIY QOBIQ:
    // fixed inset-0 — Ekranning to'rtala burchagiga (tepa, past, chap, o'ng) mixlab qo'yish.
    // z-50 — Z-index 50: Barcha boshqa narsalarning eng ustida ko'rinib turishi uchun.
    // overflow-y-auto — Agar telefon ekrani kichik bo'lib, oyna sig'may qolsa, vertikal aylantirish (scroll) imkoni.
    <div className="fixed inset-0 z-50 overflow-y-auto">

      {/* 
        ORQA XIRA FON (BACKDROP):
        bg-black/45 — Orqa fonni 45% qora xiralashtirib, diqqatni faqat o'rtadagi oynaga qaratadi.
        onClick={onClose} — Foydalanuvchi modalning yonidagi bo'sh qora joyga bossa ham oyna yopiladi (UX qoidasi!).
      */}
      <div onClick={onClose} className="fixed inset-0 bg-black/45"></div>

      {/* 
        O'RTADAGI OQ MODAL QUTISI:
        relative — Qora fonning ustida ko'rinishi uchun.
        max-w-[560px] — Eni maksimum 560px bo'lsin.
        my-[48px] mx-auto — Tepadan va pastdan 48px, o'ng va chapdan o'rtaga tekislangan.
        shadow-[...] — Oynaning orqasiga chiroyli yumshoq soya beradi.
      */}
      <div className="relative max-w-[560px] my-[48px] mx-auto bg-white rounded-[14px] py-[24px] px-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
        
        {/* SARLAVHA VA YOPISH "X" TUGMASI QATORI */}
        <div className="flex justify-between items-start mb-[4px]">
          <div>
            <div className="text-[18px] font-medium">Ariza topshirish</div>
            {/* Ish nomi va tozalangan kompaniya nomi */}
            <div className="text-[13px] text-[#777] mt-[2px]">
              {job?.title} · {kompaniyaNomi}
            </div>
          </div>

          {/* Oynani yopish uchun "X" (krestik) belgisi */}
          <a href="#vakansiya" onClick={modalniYopish} className="text-[#777] p-[4px] hover:text-[#1a1a1a] transition-colors">
            <svg
              className="w-[14px] h-[14px] shrink-0"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.9542 4.77253C18.3056 4.42106 18.8761 4.42106 19.2276 4.77253C19.579 5.12401 19.579 5.69452 19.2276 6.04597L13.2735 12.0001L19.2276 17.9542C19.5791 18.3056 19.5791 18.8761 19.2276 19.2276C18.8761 19.5791 18.3056 19.5791 17.9542 19.2276L12.0001 13.2735L6.04595 19.2276C5.69451 19.5791 5.12399 19.579 4.77252 19.2276C4.42104 18.8761 4.42104 18.3056 4.77252 17.9542L10.7266 12.0001L4.77252 6.04597C4.42104 5.69449 4.42104 5.12401 4.77252 4.77253C5.12399 4.42104 5.69451 4.42104 6.04595 4.77253L12.0001 10.7266L17.9542 4.77253Z" />
            </svg>
          </a>
        </div>

        {/* 
          OGOHLANTIRISH BANNERI:
          Agar alreadyApplied true bo'lsa va hali yangi yuborilmagan bo'lsa:
          Foydalanuvchiga yashil chiroyli xabar chiqadi.
        */}
        {alreadyApplied && !yuborildi && (
          <div className="mt-[10px] mb-[6px] border border-[#b7eb8f] bg-[#f6ffed] text-[#237804] rounded-[8px] py-[8px] px-[12px] text-[12px]">
            Siz bu vakansiyaga allaqachon ariza topshirgansiz. Xohlasangiz ma'lumotlarni yangilab qayta yuborishingiz mumkin.
          </div>
        )}

        {/* 
          BOSQICHLAR KO'RSATKICHI (STEPPER):
          1-bosqich: Shaxsiy ma'lumotlar (doim qora fonli, galochka bilan bajarilgan holatda).
          2-bosqich: Tasdiqlash (yuborildi holatiga qarab rangi o'zgaradi).
        */}
        <div className="flex gap-[12px] mt-[12px] mb-[16px] items-center">
          
          {/* 1-Qadam ikonka va matn */}
          <div className="flex gap-[6px] items-center text-[12px]">
            <span className="w-[20px] h-[20px] rounded-full bg-[#1a1a1a] text-white flex items-center justify-center">
              <svg
                className="w-[12px] h-[12px] shrink-0"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="#fff"
              >
                <path d="M19.3027 5.9053C19.6542 5.55397 20.2247 5.55388 20.5761 5.9053C20.9273 6.25675 20.9273 6.82734 20.5761 7.17874L9.65911 18.0948C9.30773 18.4461 8.73814 18.446 8.38665 18.0948L3.42376 13.1328C3.0726 12.7814 3.07263 12.2118 3.42376 11.8604C3.77524 11.509 4.34575 11.5089 4.6972 11.8604L9.02239 16.1856L19.3027 5.9053Z" />
              </svg>
            </span>
            <span>Shaxsiy ma'lumotlar</span>
          </div>

          {/* O'rtadagi ulovchi ingichka kulrang chiziq */}
          <div className="flex-1 h-[1px] bg-[#e5e5e5]"></div>

          {/* 2-Qadam ikonka va matn */}
          <div
            className={`flex gap-[6px] items-center text-[12px] ${
              yuborildi ? 'text-[#1a1a1a]' : 'text-[#999]'
            }`}
          >
            {/* Agar ariza yuborilgan bo'lsa 2 raqami qorayadi, aks holda kulrang chegarali bo'ladi */}
            <span
              className={`w-[20px] h-[20px] rounded-full flex items-center justify-center ${
                yuborildi ? 'bg-[#1a1a1a] text-white' : 'border border-[#e5e5e5]'
              }`}
            >
              2
            </span>
            <span>Tasdiqlash</span>
          </div>
        </div>


        {/* =============================================================================================== */}
        {/* ASOSIY ANKETA FORMASI (<form>) */}
        {/* =============================================================================================== */}
        <form onSubmit={formaniYuborish}>
          
          {/* 1. ISM VA FAMILIYA INPUTI */}
          <div className="mb-[14px]">
            <div className="text-[13px] text-[#555] mb-[5px]">Ism va familiya</div>
            <input
              required // HTML tekshiruvi: to'ldirilishi majburiy
              value={ismFamiliya}
              onChange={(e) => setIsmFamiliya(e.target.value)} // Har bir bosilgan harfni xotiraga yozadi
              className="border border-[#d9d9d9] rounded-[8px] py-[9px] px-[12px] text-[14px] bg-white text-[#1a1a1a] w-full focus:outline-2 focus:outline-[#1a1a1a] focus:-outline-offset-1"
            />
          </div>

          {/* 2. TELEFON RAQAMI INPUTI */}
          <div className="mb-[14px]">
            <div className="text-[13px] text-[#555] mb-[5px]">Telefon</div>
            <input
              required // To'ldirilishi majburiy
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
              className="border border-[#d9d9d9] rounded-[8px] py-[9px] px-[12px] text-[14px] bg-white text-[#1a1a1a] w-full focus:outline-2 focus:outline-[#1a1a1a] focus:-outline-offset-1"
            />
          </div>

          {/* 3. EMAIL INPUTI */}
          <div className="mb-[14px]">
            <div className="text-[13px] text-[#555] mb-[5px]">Email</div>
            <input
              type="email" // Brauzer ichida @ belgisi bor-yo'qligini tekshiradi
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#d9d9d9] rounded-[8px] py-[9px] px-[12px] text-[14px] bg-white text-[#1a1a1a] w-full focus:outline-2 focus:outline-[#1a1a1a] focus:-outline-offset-1"
            />
          </div>

          {/* 4. REZYUME FAYLI YUKLASH BLOKI */}
          <div className="mb-[14px]">
            <div className="text-[13px] text-[#555] mb-[5px]">Rezyume</div>
            
            {/* Chiziqli (dashed) ramka qutisi */}
            <div className="border border-dashed border-[#999] rounded-[10px] p-[16px] text-center text-[#999] text-[13px]">
              <span className="inline-block mb-[4px] text-[#555]">
                {/* Tepaga qaratilgan yuklash strelkasi SVG */}
                <svg
                  className="w-[16px] h-[16px] shrink-0"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.3636 3.36358C11.7151 3.01211 12.2849 3.01211 12.6364 3.36358L17.0808 7.80802C17.4323 8.1595 17.4323 8.72934 17.0808 9.08082C16.7293 9.43229 16.1595 9.43229 15.808 9.08082L12.9 6.17277V14.6666C12.9 15.1637 12.497 15.5666 12 15.5666C11.5029 15.5666 11.1 15.1637 11.1 14.6666V6.17277L8.19193 9.08082C7.84046 9.43229 7.27061 9.43229 6.91914 9.08082C6.56767 8.72934 6.56767 8.1595 6.91914 7.80802L11.3636 3.36358Z" />
                </svg>
              </span>
              <div className="text-[#555]">PDF, DOC yoki DOCX yuklang — maks. 10 MB</div>
              
              {/* 
                SEHRLI FAYL TUGMASI:
                Nega <label> ishlatilgan? Chunki oddiy <input type="file"> juda xunuk ko'rinadi.
                Biz uni "className='hidden'" qilib butunlay ko'rinmas qildik va <label> ichiga o'rab qo'ydik.
                Foydalanuvchi chiroyli oq <label> tugmasini bossa ham, orqadagi yashirin <input> avtomatik bosiladi!
              */}
              <div className="mt-[8px]">
                <label className="inline-block border border-[#d9d9d9] bg-white text-[#1a1a1a] rounded-[8px] text-[13px] py-[5px] px-[14px] cursor-pointer hover:border-[#1a1a1a] transition-colors">
                  Fayl tanlash
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx" // Faqat shu formatdagi fayllarga ruxsat beriladi
                    onChange={faylTanlandi}  // Fayl tanlanganda faylTanlandi() funksiyasi ishlaydi
                    className="hidden"       // Ekranda ko'rinmaydi!
                  />
                </label>
              </div>
            </div>

            {/* 
              YUKLANGAN FAYLNING CHIQISH BLOKI:
              Agar faylNomi bo'sh bo'lmasa (fayl tanlangan bo'lsa), shu blok ko'rinadi:
            */}
            {faylNomi !== '' && (
              <div className="flex gap-[8px] items-center mt-[8px] border border-[#e5e5e5] rounded-[8px] py-[8px] px-[12px] text-[13px]">
                {/* Hujjat belgisi */}
                <span className="text-[#555]">
                  <svg
                    className="w-[16px] h-[16px] shrink-0"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14.5 3H7C5.9 3 5 3.9 5 5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V7.5L14.5 3ZM14 5L17 8H14V5Z" />
                  </svg>
                </span>
                
                {/* Fayl nomi va "yuklandi" yozuvi */}
                <span className="flex-1">
                  {faylNomi}{' '}
                  <span className="text-[#237804] inline-flex items-center gap-[3px]">
                    <svg
                      className="w-[12px] h-[12px] shrink-0"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.3027 5.9053C19.6542 5.55397 20.2247 5.55388 20.5761 5.9053C20.9273 6.25675 20.9273 6.82734 20.5761 7.17874L9.65911 18.0948C9.30773 18.4461 8.73814 18.446 8.38665 18.0948L3.42376 13.1328C3.0726 12.7814 3.07263 12.2118 3.42376 11.8604C3.77524 11.509 4.34575 11.5089 4.6972 11.8604L9.02239 16.1856L19.3027 5.9053Z" />
                    </svg>
                    yuklandi
                  </span>
                </span>

                {/* Faylni o'chirib tashlash "X" belgisi */}
                {/* setFaylNomi('') qilib xotirani tozalaydi va bu blok yo'qoladi */}
                <span onClick={() => setFaylNomi('')} className="text-[#999] hover:text-[#d4380d] cursor-pointer transition-colors">
                  <svg
                    className="w-[12px] h-[12px] shrink-0"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.9542 4.77253C18.3056 4.42106 18.8761 4.42106 19.2276 4.77253C19.579 5.12401 19.579 5.69452 19.2276 6.04597L13.2735 12.0001L19.2276 17.9542C19.5791 18.3056 19.5791 18.8761 19.2276 19.2276C18.8761 19.5791 18.3056 19.5791 17.9542 19.2276L12.0001 13.2735L6.04595 19.2276C5.69451 19.5791 5.12399 19.579 4.77252 19.2276C4.42104 18.8761 4.42104 18.3056 4.77252 17.9542L10.7266 12.0001L4.77252 6.04597C4.42104 5.69449 4.42104 5.12401 4.77252 4.77253C5.12399 4.42104 5.69451 4.42104 6.04595 4.77253L12.0001 10.7266L17.9542 4.77253Z" />
                  </svg>
                </span>
              </div>
            )}
          </div>

          {/* 5. QO'SHIMCHA XAT (COVER LETTER) MAYDONI */}
          <div className="mb-[14px]">
            <div className="text-[13px] text-[#555] mb-[5px]">
              Xat <span className="text-[#999]">(ixtiyoriy)</span>
            </div>
            {/* textarea — ko'p qatorli matn yozish maydoni. resize-none — foydalanuvchi quti o'lchamini buzmasligi uchun */}
            <textarea
              value={xat}
              onChange={(e) => setXat(e.target.value)}
              className="border border-[#d9d9d9] rounded-[8px] py-[9px] px-[12px] text-[14px] bg-white text-[#1a1a1a] w-full h-[72px] resize-none focus:outline-2 focus:outline-[#1a1a1a] focus:-outline-offset-1"
            />
          </div>

          {/* 6. SHAXSIY MA'LUMOTLARNI QAYTA ISHLASHGA ROZILIK CHECKBOX'I */}
          <label className="flex items-center gap-[8px] text-[14px] text-[#555] py-[5px] cursor-pointer mb-[16px]">
            <input
              type="checkbox"
              checked={rozilik} // Checkbox belgilanganmi? (true yoki false)
              onChange={(e) => setRozilik(e.target.checked)} // Checkbox uchun "e.target.value" emas, "e.target.checked" ishlatiladi!
              className="accent-[#1a1a1a] w-[15px] h-[15px]"
            />
            Shaxsiy ma'lumotlarim qayta ishlashga roziman
          </label>

          {/* 7. PASTDAGI AMAL TUGMALARI */}
          <div className="flex gap-[10px]">
            {/* "Bekor qilish" tugmasi */}
            <a
              href="#vakansiya"
              onClick={modalniYopish}
              className="border border-[#d9d9d9] bg-white text-[#1a1a1a] rounded-[8px] px-[16px] py-[8px] text-[14px] flex-1 text-center no-underline hover:border-[#1a1a1a] transition-colors"
            >
              Bekor qilish
            </a>

            {/* 
              "Ariza yuborish" TUGMASI:
              type="submit" — Formani yuborishni chaqiradi.
              disabled={!rozilik || yuborildi} — Agar rozilik olingan bo'lmasa (!rozilik) yoki allaqachon yuborilayotgan bo'lsa (yuborildi),
              tugma bosilmaydigan (faol bo'lmagan, disabled) holatga o'tadi!
            */}
            <button
              type="submit"
              disabled={!rozilik || yuborildi}
              className="border border-[#1a1a1a] bg-[#1a1a1a] hover:bg-black disabled:opacity-50 text-white rounded-[8px] px-[16px] flex-[2] p-[11px] text-[15px] cursor-pointer transition-all"
            >
              {/* yuborildi bo'lganda yozuv "Yuborildi!" ga aylanadi */}
              {yuborildi ? 'Yuborildi!' : 'Ariza yuborish'}
            </button>
          </div>
        </form>

        {/* ENG PASTDAGI ESLATMA MATNI */}
        <div className="text-[12px] text-[#999] text-center mt-[12px]">
          Ariza yuborilgach kompaniya siz bilan 3 ish kuni ichida bog'lanadi
        </div>

      </div>
    </div>
  ); // return tugadi
} // ArizaModal komponenti tugadi

// Ushbu modalni loyihaga taqdim etamiz
export default ArizaModal;


// 2-QISM: SEKUNDNING MINGDAN BIR ULUSHIDA (ULTRA SLOW-MOTION REPLAY)

// Keling, foydalanuvchi ma'lumotlarni to'ldirib, "Ariza yuborish" tugmasini bosgan lahzada kompyuter ichida sekundma-sekund nima yuz berishini kuzatamiz.

// [0.000 soniya] - FOYDALANUVCHI HARAKATI:
// Foydalanuvchi ismini ("Ali"), telefonini ("+998901234567") yozib, "Ariza yuborish" tugmasini bosdi.
// [0.001 soniya] - ONSUBMIT VA E.PREVENTDEFAULT():
// <form> ning onSubmit hodisasi ishga tushdi va formaniYuborish(e) chaqirildi.
// e.preventDefault() brauzerga qat'iy buyruq berdi: "Sahifani yangilama!"
// [0.002 soniya] - DARVOZABON TEKSHIRUVI (VALIDATION):
// Dastur tekshiradi:
// - yuborildi === false? Ha.
// - rozilik === true? Ha.
// - ism bo'sh emasmi? Ha ("Ali").
// - telefon bo'sh emasmi? Ha.
// Barcha eshiklar ochiq!
// [0.003 soniya] - TUGMANI MUZLATISH (SETYUBORILDI = TRUE):
// setYuborildi(true) ishga tushdi.
// React modalni qayta chizdi:
// 1. Stepperdagi 2-raqam qora bo'lib yondi (Tasdiqlash bosqichi).
// 2. Tugmadagi yozuv "Yuborildi!" deb o'zgardi.
// 3. Tugma muzladi (disabled bo'ldi). Foydalanuvchi asabiylashib yana 10 marta bossa ham, ikkinchi marta so'rov ketmaydi!
// [0.004 soniya] - SETTIMEOUT VAQTI BOSHLANDI:
// Kompyuter taymeri 1000 ms (1 sekund) sanashni boshladi.
// [1.004 soniya] - 1 SEKUND O'TDI VA SIGNAL CHALINDI:
// setTimeout ichidagi onSubmitSuccess() chaqirildi!
// Bu chaqiruv to'g'ri App.jsx dagi handleApplySuccess(selectedJobForApply) ga yetib bordi.
// [1.005 soniya] - APP.JSX XOTIRANI YANGILADI:
// 1. appliedJobs massiviga shu ish qo'shildi: appliedJobs = [ { id: 1, ... } ].
// 2. setSelectedJobForApply(null) chaqirildi.
// [1.006 soniya] - MODAL YO'Q BO'LDI VA VAKANSIYA YASHIL BO'LDI:
// 1. selectedJobForApply === null bo'lgani sababli, ArizaModal butunlay yo'qoldi.
// 2. Sayt sahifasidagi o'sha vakansiyaning "Ariza topshirish" tugmasi "Ariza topshirildi" deb yashil rangga kirdi!
// 3-QISM: DASTURCHI TAFEKKURI VA 5 TA OLTIN QOIDA
// 1. Nega <input type="file"> yashirildi (className="hidden")?

// Sababi (UI/UX dizayn): Brauzerning standart <input type="file"> tugmasi ("Choose file / No file chosen") juda xunuk, uni chiroyli qilib stillab bo‘lmaydi. Shuning uchun zamonaviy dasturchilar bu hiylani ishlatishadi: inputni hidden qilib yashirib qo‘yishadi va uning ustiga o‘zlari xohlagan uslubdagi chiroyli <label> tugmasini qo‘yishadi. HTML qoidasiga ko‘ra, <label> bosilganda uning ichidagi <input> avtomatik tarzda bosiladi!

// 2. Nega checkbox uchun e.target.value emas, e.target.checked ishlatildi?

// Matn yoziladigan kataklarda (<input type="text">) ichidagi matn value da saqlanadi. Lekin katakchali tanlagichlarda (<input type="checkbox">) matn bo‘lmaydi, ularda faqat ikkita holat bor: belgilanganmi yoki yo‘qmi. JavaScript buni checked (true/false) xususiyatida saqlaydi. Agar siz e.target.value deb yozsangiz, u doim "on" degan yozuv qaytaradi va mantiq buziladi.

// 3. Nega disabled={!rozilik || yuborildi} qilindi?

// Agar foydalanuvchi "Ariza yuborish" tugmasini bosganda tugma muzlatilmasa (disabled qilinmasa), internet sekin ishlaganda odamlar tugmani 4-5 marta ketma-ket bosib yuborishadi. Natijada serverga bitta odamdan 5 ta bir xil ariza borib tushadi. disabled qilib qo‘yish — bu serverni ortiqcha yuklamadan va foydalanuvchini xatolikdan asrashning asosiy qoidasidir.

// 4. Nega job?.company da ?. (Optional Chaining) qo‘yilgan?

// Modal oyna ochilayotgan yoki yopilayotgan soniyaning mingdan bir ulushida job parametri bir lahzaga null bo‘lib qolishi mumkin. Agar biz shunchaki job.company deb yozsak: Cannot read properties of null deb butun dastur qulab tushadi. job?.company — bu: "Agar job obyekti mavjud bo‘lsa uning ichidagi company-ni ol, agar yo‘q bo‘lsa tinchgina to‘xta va dasturni buzma" degan himoyadir.

// 5. setTimeout(..., 1000) ning vazifasi nima?

// Haqiqiy loyihalarda ariza serverga (backend) yuboriladi va u yerdan javob kelguncha 1-2 soniya vaqt ketadi. Bu yerda setTimeout orqali server kutish jarayoni simulyatsiya qilingan: foydalanuvchi 1 soniya davomida o‘z harakati qabul qilinganini ("Yuborildi!" holatini) ko‘radi va shundan keyingina oyna yopiladi. Bu foydalanuvchiga jarayon muvaffaqiyatli yakunlangani haqida to‘liq xotirjamlik bag‘ishlaydi.