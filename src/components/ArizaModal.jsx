// =========================================================================================================
// 1-QADAM: IMPORT VA ASOSIY HOOKLAR
// =========================================================================================================

// "useState" - React-ning xotira qutisi.
// Formadagi har bir katakcha (ism, telefon, rezyume fayli, rozilik chekboksi va yuborish holati)
// o'z ma'lumotlarini useState ichida saqlaydi va harflar yozilishi bilan doimiy yangilanib boradi.
import { useState } from "react";

// =========================================================================================================
// 2-QADAM: CHEKLOVLAR VA XAVFSIZLIK QOIDALARI (KONSTANTALAR)
// =========================================================================================================

// "MAX_FILE_SIZE" - Yuklanadigan rezyume faylining ruxsat berilgan eng katta hajmi (10 Megabayt).
// 10 * 1024 * 1024 bayt = 10,485,760 bayt. Bu server va brauzerning haddan tashqari og'ir yuklanishini to'xtatadi.
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// "MAX_LETTER_LENGTH" - Qo'shimcha xat (cover letter) maydoniga eng ko'pi bilan 1000 ta belgi yozish mumkin.
const MAX_LETTER_LENGTH = 1000;

// "ALLOWED_EXTENSIONS" - Qabul qilinadigan fayl kengaytmalarining rasmiy ro'yxati (PDF, Word formatlari).
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

// =========================================================================================================
// 3-QADAM: MATN VA INPUT MASKALARI (YORDAMCHI FUNKSIYALAR)
// =========================================================================================================

// 1. "formatFullName" - Ism va familiyani tozalovchi maska:
// Raqamlar yoki g'alati belgilarni kiritishga yo'l qo'ymaydi, faqat o'zbek/lotin/kirill harflari, 
// bitta probel va tutuq belgilariga ruxsat beradi.
function formatFullName(rawValue) {
  return String(rawValue || "")
    .replace(/[^a-zA-Zа-яА-ЯёЁўЎқҚғҒҳҲ'’`.\s-]/g, "") // Harflar va ruxsat berilgan belgilardan boshqasini o'chiradi
    .replace(/\s{2,}/g, " ") // Ketma-ket kelgan 2 yoki undan ortiq bo'shliqlarni bitta bo'shliqqa aylantiradi
    .replace(/^\s+/, ""); // Matn boshidagi keraksiz bo'shliqni yo'qotadi
}

// 2. "formatUzPhone" - O'zbekiston telefon raqamlari maskasi (+998 XX XXX XX XX formatida):
// Foydalanuvchi qanday yozishidan qat'i nazar, raqamlarni toza ajratib, oralariga chiroyli probellar qo'yadi.
// Shuningdek, Backspace (o'chirish) tugmasi bosilganda to'g'ri ishlashi uchun prevValue (oldingi qiymat) bilan solishtiradi.
function formatUzPhone(rawValue, prevValue = "") {
  let digits = String(rawValue || "").replace(/\D/g, ""); // Matndan faqat raqamlarni ajratib olamiz

  // Agar raqamlar "998" bilan boshlansa, uni kesib olamiz (chunki +998 prefiksini o'zimiz avtomatik qo'yamiz)
  if (digits.startsWith("998")) {
    digits = digits.slice(3);
  }

  const prevDigits = String(prevValue || "").replace(/\D/g, "");
  const cleanPrevDigits = prevDigits.startsWith("998")
    ? prevDigits.slice(3)
    : prevDigits;

  // Agar foydalanuvchi Backspace bosgan bo'lsa va raqam kamaymagan bo'lsa, oxirgi raqamni qo'lda kesamiz
  if (
    rawValue.length < prevValue.length &&
    digits.length === cleanPrevDigits.length &&
    digits.length > 0
  ) {
    digits = digits.slice(0, -1);
  }

  // O'zbekiston raqamlari 9 ta raqamdan oshmaydi (masalan: 90 123 45 67)
  digits = digits.slice(0, 9);
  if (digits.length === 0) return "";

  // Raqamlarni qismlarga bo'lib chiqamiz:
  const part1 = digits.slice(0, 2); // Kod (masalan: 90 yoki 88)
  const part2 = digits.slice(2, 5); // 3 ta raqam (123)
  const part3 = digits.slice(5, 7); // 2 ta raqam (45)
  const part4 = digits.slice(7, 9); // 2 ta raqam (67)

  // Formatlangan chiroyli matnni yig'amiz
  let result = `+998 ${part1}`;
  if (part2) result += ` ${part2}`;
  if (part3) result += ` ${part3}`;
  if (part4) result += ` ${part4}`;

  return result;
}

// 3. "normalizeEmail" - Email manzilini tozalash:
// Barcha bo'shliqlarni olib tashlaydi va harflarni bir xil kichik (lowercase) holatga keltiradi.
function normalizeEmail(rawValue) {
  return String(rawValue || "")
    .replace(/\s+/g, "")
    .toLowerCase();
}

// 4. "formatCoverLetter" - Xat matnini belgilangan 1000 ta belgidan oshirmaslik uchun kesib beradi.
function formatCoverLetter(rawValue) {
  return String(rawValue || "").slice(0, MAX_LETTER_LENGTH);
}

// =========================================================================================================
// 4-QADAM: ASOSIY KOMPONENT VA PROPS (KIRIB KELUVCHI QIYMATLAR)
// =========================================================================================================
// Props tushuntirishi:
// 1. job - qaysi vakansiyaga ariza topshirilayotgani haqidagi obyekt (title, company, id va h.k.).
// 2. onClose - modal oynani yopuvchi funksiya.
// 3. onSubmitSuccess - ariza muvaffaqiyatli topshirilganda App.jsx ga ma'lumot uzatuvchi funksiya.
// 4. alreadyApplied - bu vakansiyaga foydalanuvchi oldin ariza topshirganmi yoki yo'qmi (true/false).
function ArizaModal({ job, onClose, onSubmitSuccess, alreadyApplied = false }) {
  
  // -------------------------------------------------------------------------------------------------------
  // 5-QADAM: STATE (XOTIRA QISMI)
  // -------------------------------------------------------------------------------------------------------
  const [ismFamiliya, setIsmFamiliya] = useState(""); // Nomzodning to'liq ismi
  const [telefon, setTelefon] = useState(""); // Telefon raqami
  const [email, setEmail] = useState(""); // Elektron pochta
  const [faylNomi, setFaylNomi] = useState(""); // Yuklangan faylning nomi (masalan: "Ali_Rezyume.pdf")
  const [faylXatosi, setFaylXatosi] = useState(""); // Fayl formati yoki hajmi noto'g'ri bo'lsa chiqadigan xato
  const [xat, setXat] = useState(""); // Ish beruvchiga qo'shimcha xat matni
  const [rozilik, setRozilik] = useState(true); // Qonuniy shaxsiy ma'lumotlarni qayta ishlashga rozilik (checkbox)
  const [yuborildi, setYuborildi] = useState(false); // Ariza yuborilmoqda holatini ko'rsatish (loading / success)

  // Agar birorta ham vakansiya tanlanmagan bo'lsa (job null bo'lsa), modal oynani umuman chizmaymiz
  if (!job) {
    return null;
  }

  // Kompaniya nomini sof holatda ajratib olish (nuqtalarni olib tashlash)
  const kompaniyaNomi = (job?.company || "").split("·")[0].trim();

  // Telefon raqami to'liq kiritilganmi tekshiramiz (998 va yana 9 ta raqam, jami 12 ta bo'lishi kerak)
  const phoneDigits = telefon.replace(/\D/g, "");
  const isPhoneComplete = phoneDigits.length === 12;

  // -------------------------------------------------------------------------------------------------------
  // 6-QADAM: FAYL VA FORM BILAN ISHLASH FUNKSIYALARI (HANDLERS)
  // -------------------------------------------------------------------------------------------------------

  // "faylTanlandi" - Foydalanuvchi kompyuterdan fayl tanlaganda ishga tushadi:
  function faylTanlandi(e) {
    const tanlanganFayl = e.target.files?.[0]; // Tanlangan birinchi faylni olamiz
    if (!tanlanganFayl) return;

    const lowerName = tanlanganFayl.name.toLowerCase();
    
    // 1-tekshiruv: Kengaytmasi (.pdf, .doc, .docx) ro'yxatimizda bormi?
    const hasValidExt = ALLOWED_EXTENSIONS.some((ext) =>
      lowerName.endsWith(ext),
    );

    if (!hasValidExt) {
      setFaylNomi("");
      setFaylXatosi("Faqat PDF, DOC yoki DOCX formatdagi fayl yuklang.");
      e.target.value = ""; // Inputni bo'shatamiz
      return;
    }

    // 2-tekshiruv: Fayl hajmi 10 MB dan oshib ketmaganmi?
    if (tanlanganFayl.size > MAX_FILE_SIZE) {
      setFaylNomi("");
      setFaylXatosi("Fayl hajmi 10 MB dan oshmasligi kerak.");
      e.target.value = "";
      return;
    }

    // Agar ikkala tekshiruvdan muvaffaqiyatli o'tsa:
    setFaylXatosi(""); // Xatoni tozalaymiz
    setFaylNomi(tanlanganFayl.name); // Ekranda chiqarish uchun fayl nomini saqlaymiz
  }

  // "formaniYuborish" - "Ariza yuborish" tugmasi bosilganda:
  function formaniYuborish(e) {
    e.preventDefault(); // Sahifa to'liq yangilanib ketishining oldini oladi

    // Fayl tanlanganmi?
    if (!faylNomi) {
      setFaylXatosi("Iltimos, rezyume faylini tanlang (PDF, DOC yoki DOCX).");
      return;
    }

    // Qo'shimcha xavfsizlik tekshiruvlari:
    if (
      yuborildi ||
      !rozilik ||
      ismFamiliya.trim().length < 2 ||
      !isPhoneComplete ||
      faylXatosi
    ) {
      return;
    }

    // Yuboriladigan ariza ma'lumotlarini toza obyekt holatiga keltiramiz
    const arizaMalumoti = {
      jobId: job.id,
      fullName: ismFamiliya.trim(),
      phone: telefon,
      phoneRaw: `+${phoneDigits}`,
      email: email.trim(),
      resumeName: faylNomi,
      coverLetter: xat.trim(),
    };

    setYuborildi(true); // Yuborish holatini yoqamiz (tugma "Yuborildi!" bo'lib muzlaydi)

    // 1 soniya kutamiz (serverga yuborish simulyatsiyasi)
    setTimeout(() => {
      onSubmitSuccess(arizaMalumoti); // App.jsx dagi saqlash funksiyasini chaqiramiz
    }, 1000);
  }

  // "modalniYopish" - Yopish yoki bekor qilish bosilganda
  function modalniYopish(e) {
    e.preventDefault();
    onClose();
  }

  // =======================================================================================================
  // 7-QADAM: JSX RETURN (VIZUAL MODAL DIZAYNI)
  // =======================================================================================================

  return (
    // Ekranni to'liq egallovchi fiksatsiyalangan konteyner
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Qora yarim shaffof orqa fon pardasi: bosilganda modal yopiladi */}
      <div onClick={onClose} className="fixed inset-0 bg-black/45"></div>

      {/* Oq rangli modal oynasi qutisi */}
      <div className="relative max-w-[560px] my-[48px] mx-auto bg-white rounded-[14px] py-[24px] px-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
        
        {/* MODAL SARLAVHASI VA YOPISH "✕" TUGMASI */}
        <div className="flex justify-between items-start mb-[4px]">
          <div>
            <div className="text-[18px] font-medium">Ariza topshirish</div>
            <div className="text-[13px] text-[#777] mt-[2px]">
              {job?.title} · {kompaniyaNomi}
            </div>
          </div>

          {/* Yopish tugmasi */}
          <a
            href="#vakansiya"
            onClick={modalniYopish}
            className="text-[#777] p-[4px] hover:text-[#1a1a1a] transition-colors cursor-pointer"
          >
            <svg
              className="w-[14px] h-[14px] shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.9542 4.77253C18.3056 4.42106 18.8761 4.42106 19.2276 4.77253C19.579 5.12401 19.579 5.69452 19.2276 6.04597L13.2735 12.0001L19.2276 17.9542C19.5791 18.3056 19.5791 18.8761 19.2276 19.2276C18.8761 19.5791 18.3056 19.5791 17.9542 19.2276L12.0001 13.2735L6.04595 19.2276C5.69451 19.5791 5.12399 19.579 4.77252 19.2276C4.42104 18.8761 4.42104 18.3056 4.77252 17.9542L10.7266 12.0001L4.77252 6.04597C4.42104 5.69449 4.42104 5.12401 4.77252 4.77253C5.12399 4.42104 5.69451 4.42104 6.04595 4.77253L12.0001 10.7266L17.9542 4.77253Z" />
            </svg>
          </a>
        </div>

        {/* AGAR BU ISHGA AVVAL ARIZA TOPSHIRILGAN BO'LSA - YASHIL OGOHLANTIRISH BANNERI */}
        {alreadyApplied && !yuborildi && (
          <div className="mt-[10px] mb-[6px] border border-[#b7eb8f] bg-[#f6ffed] text-[#237804] rounded-[8px] py-[8px] px-[12px] text-[12px]">
            Siz bu vakansiyaga allaqachon ariza topshirgansiz. Xohlasangiz
            ma'lumotlarni yangilab qayta yuborishingiz mumkin.
          </div>
        )}

        {/* BOSQICHLAR INDIKATORI (1-BOSQICH VA 2-BOSQICH STEPPER) */}
        <div className="flex gap-[12px] mt-[12px] mb-[16px] items-center">
          {/* 1-bosqich: Shaxsiy ma'lumotlar */}
          <div className="flex gap-[6px] items-center text-[12px]">
            <span className="w-[20px] h-[20px] rounded-full bg-[#1a1a1a] text-white flex items-center justify-center">
              <svg
                className="w-[12px] h-[12px] shrink-0"
                viewBox="0 0 24 24"
                fill="#fff"
              >
                <path d="M19.3027 5.9053C19.6542 5.55397 20.2247 5.55388 20.5761 5.9053C20.9273 6.25675 20.9273 6.82734 20.5761 7.17874L9.65911 18.0948C9.30773 18.4461 8.73814 18.446 8.38665 18.0948L3.42376 13.1328C3.0726 12.7814 3.07263 12.2118 3.42376 11.8604C3.77524 11.509 4.34575 11.5089 4.6972 11.8604L9.02239 16.1856L19.3027 5.9053Z" />
              </svg>
            </span>
            <span>Shaxsiy ma'lumotlar</span>
          </div>

          <div className="flex-1 h-[1px] bg-[#e5e5e5]"></div>

          {/* 2-bosqich: Tasdiqlash */}
          <div
            className={`flex gap-[6px] items-center text-[12px] ${
              yuborildi ? "text-[#1a1a1a]" : "text-[#999]"
            }`}
          >
            <span
              className={`w-[20px] h-[20px] rounded-full flex items-center justify-center ${
                yuborildi
                  ? "bg-[#1a1a1a] text-white"
                  : "border border-[#e5e5e5]"
              }`}
            >
              2
            </span>
            <span>Tasdiqlash</span>
          </div>
        </div>

        {/* FORMA MAYDONLARI */}
        <form onSubmit={formaniYuborish}>
          
          {/* 1. ISM VA FAMILIYA */}
          <div className="mb-[14px]">
            <div className="text-[13px] text-[#555] mb-[5px]">
              Ism va familiya
            </div>
            <input
              required
              minLength={2}
              value={ismFamiliya}
              onChange={(e) => setIsmFamiliya(formatFullName(e.target.value))}
              onBlur={() => setIsmFamiliya((prev) => prev.trim())}
              placeholder="Masalan: Oyatillo Ahmadaliyev"
              className="border border-[#d9d9d9] rounded-[8px] py-[9px] px-[12px] text-[14px] bg-white text-[#1a1a1a] w-full focus:outline-2 focus:outline-[#1a1a1a] focus:-outline-offset-1"
            />
          </div>

          {/* 2. TELEFON RAQAMI */}
          <div className="mb-[14px]">
            <div className="text-[13px] text-[#555] mb-[5px]">Telefon</div>
            <input
              type="tel"
              inputMode="numeric"
              required
              pattern="^\+998 \d{2} \d{3} \d{2} \d{2}$"
              title="+998 88 123 45 67 formatida kiriting"
              value={telefon}
              onChange={(e) =>
                setTelefon((prev) => formatUzPhone(e.target.value, prev))
              }
              placeholder="+998 88 123 45 67"
              className="border border-[#d9d9d9] rounded-[8px] py-[9px] px-[12px] text-[14px] bg-white text-[#1a1a1a] w-full focus:outline-2 focus:outline-[#1a1a1a] focus:-outline-offset-1"
            />
          </div>

          {/* 3. EMAIL */}
          <div className="mb-[14px]">
            <div className="text-[13px] text-[#555] mb-[5px]">Email</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(normalizeEmail(e.target.value))}
              placeholder="name@example.com"
              className="border border-[#d9d9d9] rounded-[8px] py-[9px] px-[12px] text-[14px] bg-white text-[#1a1a1a] w-full focus:outline-2 focus:outline-[#1a1a1a] focus:-outline-offset-1"
            />
          </div>

          {/* 4. REZYUME YUKLASH MAYDONI */}
          <div className="mb-[14px]">
            <div className="text-[13px] text-[#555] mb-[5px]">Rezyume</div>

            <div
              className={`border border-dashed rounded-[10px] p-[16px] text-center text-[#999] text-[13px] ${
                faylXatosi ? "border-[#d4380d] bg-[#fff2f0]/40" : "border-[#999]"
              }`}
            >
              <span className="inline-block mb-[4px] text-[#555]">
                <svg
                  className="w-[16px] h-[16px] shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.3636 3.36358C11.7151 3.01211 12.2849 3.01211 12.6364 3.36358L17.0808 7.80802C17.4323 8.1595 17.4323 8.72934 17.0808 9.08082C16.7293 9.43229 16.1595 9.43229 15.808 9.08082L12.9 6.17277V14.6666C12.9 15.1637 12.497 15.5666 12 15.5666C11.5029 15.5666 11.1 15.1637 11.1 14.6666V6.17277L8.19193 9.08082C7.84046 9.43229 7.27061 9.43229 6.91914 9.08082C6.56767 8.72934 6.56767 8.1595 6.91914 7.80802L11.3636 3.36358Z" />
                </svg>
              </span>
              <div className="text-[#555]">
                PDF, DOC yoki DOCX yuklang — maks. 10 MB
              </div>

              {/* Chiroyli label tugmasi (ichida yashirin input bilan) */}
              <div className="mt-[8px]">
                <label className="inline-block border border-[#d9d9d9] bg-white text-[#1a1a1a] rounded-[8px] text-[13px] py-[5px] px-[14px] cursor-pointer hover:border-[#1a1a1a] transition-colors">
                  Fayl tanlash
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={faylTanlandi}
                    className="hidden" // Brauzerning xunuk standart inputini yashirib qo'yamiz
                  />
                </label>
              </div>
            </div>

            {/* Fayl xatosi bo'lsa qizil matn */}
            {faylXatosi && (
              <div className="mt-[8px] text-[12px] font-medium text-[#d4380d]">
                {faylXatosi}
              </div>
            )}

            {/* Fayl muvaffaqiyatli tanlanganda uning nomi va yashil tasdiq belgisi chiqadi */}
            {faylNomi !== "" && (
              <div className="flex gap-[8px] items-center mt-[8px] border border-[#e5e5e5] rounded-[8px] py-[8px] px-[12px] text-[13px]">
                <span className="text-[#555]">
                  <svg
                    className="w-[16px] h-[16px] shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14.5 3H7C5.9 3 5 3.9 5 5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V7.5L14.5 3ZM14 5L17 8H14V5Z" />
                  </svg>
                </span>

                <span className="flex-1">
                  {faylNomi}{" "}
                  <span className="text-[#237804] inline-flex items-center gap-[3px]">
                    <svg
                      className="w-[12px] h-[12px] shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.3027 5.9053C19.6542 5.55397 20.2247 5.55388 20.5761 5.9053C20.9273 6.25675 20.9273 6.82734 20.5761 7.17874L9.65911 18.0948C9.30773 18.4461 8.73814 18.446 8.38665 18.0948L3.42376 13.1328C3.0726 12.7814 3.07263 12.2118 3.42376 11.8604C3.77524 11.509 4.34575 11.5089 4.6972 11.8604L9.02239 16.1856L19.3027 5.9053Z" />
                    </svg>
                    yuklandi
                  </span>
                </span>

                {/* Tanlangan faylni bekor qilish "✕" belgisi */}
                <span
                  onClick={() => {
                    setFaylNomi("");
                    setFaylXatosi("Iltimos, rezyume faylini tanlang.");
                  }}
                  className="text-[#999] hover:text-[#d4380d] cursor-pointer transition-colors"
                >
                  <svg
                    className="w-[12px] h-[12px] shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.9542 4.77253C18.3056 4.42106 18.8761 4.42106 19.2276 4.77253C19.579 5.12401 19.579 5.69452 19.2276 6.04597L13.2735 12.0001L19.2276 17.9542C19.5791 18.3056 19.5791 18.8761 19.2276 19.2276C18.8761 19.5791 18.3056 19.5791 17.9542 19.2276L12.0001 13.2735L6.04595 19.2276C5.69451 19.5791 5.12399 19.579 4.77252 19.2276C4.42104 18.8761 4.42104 18.3056 4.77252 17.9542L10.7266 12.0001L4.77252 6.04597C4.42104 5.69449 4.42104 5.12401 4.77252 4.77253C5.12399 4.42104 5.69451 4.42104 6.04595 4.77253L12.0001 10.7266L17.9542 4.77253Z" />
                  </svg>
                </span>
              </div>
            )}
          </div>

          {/* 5. QO'SHIMCHA XAT (COVER LETTER) */}
          <div className="mb-[14px]">
            <div className="flex justify-between items-center text-[13px] text-[#555] mb-[5px]">
              <span>
                Xat <span className="text-[#999]">(ixtiyoriy)</span>
              </span>
              {/* Belgilar hisoblagichi: masalan, 120/1000 */}
              <span className="text-[11px] text-[#999]">
                {xat.length}/{MAX_LETTER_LENGTH}
              </span>
            </div>
            <textarea
              value={xat}
              onChange={(e) => setXat(formatCoverLetter(e.target.value))}
              placeholder="Ish beruvchiga o‘zingiz haqingizda qo‘shimcha ma‘lumot qoldiring..."
              className="border border-[#d9d9d9] rounded-[8px] py-[9px] px-[12px] text-[14px] bg-white text-[#1a1a1a] w-full h-[72px] resize-none focus:outline-2 focus:outline-[#1a1a1a] focus:-outline-offset-1"
            />
          </div>

          {/* 6. ROZILIK CHEKBOKSI */}
          <label className="flex items-center gap-[8px] text-[14px] text-[#555] py-[5px] cursor-pointer mb-[16px]">
            <input
              type="checkbox"
              checked={rozilik}
              onChange={(e) => setRozilik(e.target.checked)}
              className="accent-[#1a1a1a] w-[15px] h-[15px]"
            />
            Shaxsiy ma'lumotlarim qayta ishlashga roziman
          </label>

          {/* 7. TUGMALAR QATORI */}
          <div className="flex gap-[10px]">
            <a
              href="#vakansiya"
              onClick={modalniYopish}
              className="border border-[#d9d9d9] bg-white text-[#1a1a1a] rounded-[8px] px-[16px] py-[8px] text-[14px] flex-1 text-center no-underline hover:border-[#1a1a1a] transition-colors cursor-pointer"
            >
              Bekor qilish
            </a>

            {/* Ariza yuborish tugmasi */}
            <button
              type="submit"
              disabled={!rozilik || yuborildi}
              className="border border-[#1a1a1a] bg-[#1a1a1a] hover:bg-black disabled:opacity-50 text-white rounded-[8px] px-[16px] flex-[2] p-[11px] text-[15px] cursor-pointer transition-all"
            >
              {yuborildi ? "Yuborildi!" : "Ariza yuborish"}
            </button>
          </div>
        </form>

        {/* Tushuntirish bildirishnomasi */}
        <div className="text-[12px] text-[#999] text-center mt-[12px]">
          Ariza yuborilgach kompaniya siz bilan 3 ish kuni ichida bog'lanadi
        </div>
      </div>
    </div>
  );
}

// =========================================================================================================
// 2-QISM: ULTRA SLOW-MOTION (VOQEALAR SEKINLASHTIRILGAN KADRDA)
// =========================================================================================================
// 1. Foydalanuvchi "Telefon" maydoniga "901234567" raqamlarini bosishni boshlaydi:
//    - formatUzPhone har bir raqamni qabul qilib, uni avtomatik "+998 90 123 45 67" ko'rinishiga keltiradi.
//    - Foydalanuvchi qavs yoki probel yozishi shart emas, dastur o'zi to'g'irlaydi!
//
// 2. Foydalanuvchi "Fayl tanlash" orqali "rezyume.pdf" faylini tanlaydi:
//    - faylTanlandi() funksiyasi ishga tushadi:
//      a) Fayl kengaytmasini tekshiradi (.pdf bormi? Ha!).
//      b) Hajmini tekshiradi (10 MB dan kichikmi? Ha!).
//    - Fayl nomi xotiraga yoziladi va qutida yashil "yuklandi" belgisi paydo bo'ladi.
//
// 3. Foydalanuvchi "Ariza yuborish" tugmasini bosadi:
//    - onSubmit -> formaniYuborish() ishga tushadi.
//    - e.preventDefault() sahifani qayta yuklashni taqiqlaydi.
//    - setYuborildi(true) bo'ladi -> Tugma yozuvi "Yuborildi!" ga aylanadi va muzlaydi (disabled bo'ladi).
//    - Stepperdagi 2-raqam qora rangga bo'yaladi.
//    - 1000 millisekunddan so'ng onSubmitSuccess() orqali ma'lumot App.jsx ga yuboriladi va modal yopiladi.
//    - Vakansiya kartasidagi "Ariza topshirish" tugmasi bir zumda yashil "Ariza topshirildi" nishoniga aylanadi!

// =========================================================================================================
// 3-QISM: DASTURCHI TAFEKKURI VA NEGA AYNAN SHUNDAY YOZILGAN?
// =========================================================================================================
// 1. Nega standart file input "hidden" qilinib, ustiga <label> qo'yildi?
//    - Standart HTML fayl yuklash tugmasi har bir brauzerda har xil va juda xunuk ko'rinadi.
//      Uni hidden qilib yashirib, zamonaviy Tailwind dizayndagi <label> orqali ochish eng professional yondashuvdir.
// 2. Nega checkbox uchun e.target.checked ishlatildi?
//    - Matnli inputlarda yozuv e.target.value da saqlanadi. Lekin checkboxda matn emas, uning yoqilgan yoki
//      o'chirilganligi (true/false) e.target.checked xususiyatida bo'ladi.
// 3. Nega disabled={!rozilik || yuborildi} qo'yildi?
//    - Bu backend va serverni xatolikdan himoya qiladi. Agar foydalanuvchi rozilik bermasa yoki ariza allaqachon
//      yuborilayotgan bo'lsa, tugma bosilmaydi va bitta arizaning 5 marta qayta jo'natilishining oldi olinadi.

export default ArizaModal;
