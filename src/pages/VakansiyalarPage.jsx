// =========================================================================================================
// 1-QADAM: ASBOBLARNI CHAQIRISH (IMPORT BO'LIMI)
// =========================================================================================================

// "import" — Tashqi qutidan kerakli vositalarni chaqiruvchi buyruq.
// "React" — Butun kutubxona poydevori (JSX formatini brauzer tushunadigan JS kodiga aylantiradi).
// "{ useMemo }" — "Keshlovchi Daho". Qidiruv va filtrlash kabi og'ir hisob-kitoblarni qayta-qayta bajarmay,
//   faqat qidiruv so'zi o'zgargandagina ishga tushib, natijani xotirasida eslab qoluvchi maxsus React asbobi.
// "{ useState }" — "Reaktiv Xotira". Foydalanuvchi klaviaturada yozayotgan harflarni eslab qoluvchi quti.
// "from 'react'" — Bularning barchasi "node_modules/react" degan katta ombordan olinmoqda.
// ";" — Buyruq tugaganini bildiruvchi belgi.
import React, { useMemo, useState } from "react";


// =========================================================================================================
// 2-QADAM: SAHIFA KOMPONENTI VA HIMOYALANGAN SOVG'ALAR QUTISI (PROPS VA DEFAULT VALUES)
// =========================================================================================================

// "function" — Yangi mustaqil funksiya (sahifa komponenti) yaratish.
// "VakansiyalarPage" — Sahifaning nomi (Katta harf bilan boshlangan, demak bu React komponent).
// "({ ... })" — Object Destructuring (Ota komponent — App.jsx yuborgan sovg'alarni nomma-nom qabul qilish).
function VakansiyalarPage({
  // "= []" — Default qiymat (Xavfsizlik yostiqchasi!). Agar App.jsx biron sababga ko'ra bu ma'lumotni
  // yuborishni unutsa, dastur qizil xatolik bilan qulab tushmaydi, balki bo'sh massiv deb hisoblab ketaveradi.
  vakansiyalarRoyxati = [], // Saytdagi barcha e'lonlar ro'yxati
  shaharlar = [],           // Chap yon panel uchun shaharlar ro'yxati
  sohalar = [],             // Chap yon panel uchun yo'nalishlar (IT, Moliya...) ro'yxati
  bandlikTurlari = [],      // Kun tartibi (Masofaviy, To'liq stavka...)
  maoshVariantlari = [],    // Maosh filtri variantlari
  savedjob = [],            // App.jsx dan kelayotgan, hozir saqlangan ishlar ro'yxati
  appliedJobs = [],         // Ariza topshirib bo'lingan ishlar ro'yxati

  // "= () => {}" — Funksiya uchun xavfsizlik yostiqchasi (bo'sh funksiya).
  // Agar ota fayl funksiya yubormasa ham, tugma bosilganda "handleToggleSave is not a function" degan xato chiqmaydi!
  handleToggleSave = () => {}, // Saqlash tugmasini bosganda App.jsx dagi xotirani o'zgartiruvchi pult
  onOpenApplyModal = () => {}, // Ariza topshirish tugmasi bosilganda modalni ochuvchi pult
}) {

  // =======================================================================================================
  // 3-QADAM: QIDIRUV XOTIRASI (STATE)
  // =======================================================================================================

  // searchterm: Qidiruv maydonchasiga foydalanuvchi hozir nima yozgan bo'lsa, o'sha matn (boshida bo'sh: "").
  // setsearchterm: Foydalanuvchi klaviaturada harf bosganida shu xotirani yangilovchi pult funksiya.
  // useState(""): Boshlang'ich holat — bo'sh quti.
  const [searchterm, setsearchterm] = useState("");


  // =======================================================================================================
  // 4-QADAM: KESHLANGAN AQLLI QIDIRUV ALGORITMI (useMemo)
  // =======================================================================================================

  // useMemo(() => { ... }, [bog'liqliklar]) — React-ning eng kuchli optimallashtiruvchi vositasi.
  // U ichidagi mantiqni faqat [searchterm, vakansiyalarRoyxati] dan biri o'zgargandagina qayta hisoblaydi!
  const filterJobs = useMemo(() => {
    // 1-qadam: Qidiruv so'zini tozalaymiz.
    // .trim() — Qidiruv boshidagi va oxiridagi keraksiz bo'shliqlarni (probellarni) kesib tashlaydi.
    // .toLowerCase() — Hamma harflarni kichik harfga aylantiradi (chunki "Python" va "python" bir xil topilishi kerak).
    const query = searchterm.trim().toLowerCase();

    // 2-qadam: Guard Clause (Erta to'xtatish / Darvozabon sharti).
    // "!query" — Inkor belgisi. Agar foydalanuvchi hech narsa yozmagan bo'lsa ("" bo'lsa):
    // Kompyuter ortiqcha filtrlab vaqt yo'qotmaydi, barcha vakansiyalarni qanday bo'lsa shunday qaytaradi!
    if (!query) return vakansiyalarRoyxati;

    // 3-qadam: Agar qidiruv yozilgan bo'lsa, ro'yxatni elakdan o'tkazamiz (.filter).
    return vakansiyalarRoyxati.filter((job) => {
      // (job.title || "") — Himoya: agar qaysidir ishda sarlavha yo'q bo'lsa, undefined bo'lib xato bermasligi uchun bo'sh matn olamiz.
      // .toLowerCase() — Kichik harfga o'tkazamiz.
      // .includes(query) — "Ichida bormi?" detektivi. Agar lavozim nomida biz yozgan so'z qatnashgan bo'lsa -> true bo'ladi.
      const matchtitle = (job.title || "").toLowerCase().includes(query);

      // Xuddi shu tekshiruvni kompaniya nomi uchun ham qilamiz:
      const matchcompany = (job.company || "").toLowerCase().includes(query);

      // "||" — Mantiqiy YOKI (OR).
      // Agar qidiruv so'zi YO lavozim nomida, YOKI kompaniya nomida bo'lsa ham bu ish elakdan o'tadi va ro'yxatda qoladi!
      return matchtitle || matchcompany;
    });
  }, [searchterm, vakansiyalarRoyxati]); // Faqat shu 2 ta narsa o'zgargandagina hisob-kitob qaytadan ishlaydi.


  // =======================================================================================================
  // 5-QADAM: VIZUAL KO'RINISh (JSX RETURN)
  // =======================================================================================================

  return (
    // "<>" — React Fragment (Shaffof qobiq). React bitta return ichida faqat bitta umumiy ota tegga ruxsat beradi.
    // Ortiqcha keraksiz <div> qo'shib DOM daraxtini og'irlashtirmaslik uchun Fragment ishlatiladi.
    <>
      {/* ------------------------------------------------------------------------------------------------- */}
      {/* A BO'LIM: YUQORI QIDIRUV PANELI */}
      {/* ------------------------------------------------------------------------------------------------- */}
      {/* <section> — Semantik HTML tegi (sahifaning alohida mustaqil qismi ekanini bildiradi). */}
      {/* className="..." — Tailwind CSS sinflari: kulrang fon (bg-[#f7f7f7]) va vertikal 20px bo'shliq (py-[20px]). */}
      <section className="bg-[#f7f7f7] py-[20px]">
        {/* max-w-7xl — Katta ekranlarda eni 1280px dan oshmasin; mx-auto — o'rtaga tekislash. */}
        <div className="max-w-7xl mx-auto">
          {/* 
            <form> — Forma tegi. 
            onSubmit={(e) => e.preventDefault()} — JUDA MUHIM: Foydalanuvchi "Enter" tugmasini bosganda 
            brauzer butun sahifani qayta yuklab (refresh qilib) yuborishining oldini oluvchi tormoz!
          */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col md:flex-row gap-[12px]" // Mobil qurilmada ustun (col), kompyuterda qator (row)
          >
            {/* Qidiruv inputini o'rab turuvchi quti (ichida qidiruv belgisi bo'lgani uchun relative) */}
            <div className="relative flex-[2]">
              {/* Lupa (qidiruv) belgisi — SVG formatda. absolute orqali inputning chap burchagiga qadalgan */}
              <svg
                className="w-[16px] h-[16px] shrink-0 absolute left-[12px] top-[12px] text-[#999]"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.5 3C16.1944 3 20 6.80558 20 11.5C20 13.523 19.2933 15.381 18.1132 16.8404L21.1364 19.8636C21.4879 20.2151 21.4879 20.7849 21.1364 21.1364C20.7849 21.4879 20.2151 21.4879 19.8636 21.1364L16.8404 18.1132C15.381 19.2933 13.523 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3ZM11.5 18.2C15.2003 18.2 18.2 15.2003 18.2 11.5C18.2 7.79969 15.2003 4.8 11.5 4.8C7.79969 4.8 4.8 7.79969 4.8 11.5C4.8 15.2003 7.79969 18.2 11.5 18.2Z" />
              </svg>

              {/* 
                BOSHQARILADIGAN INPUT (CONTROLLED INPUT):
                value={searchterm} — Katakdagi yozuv faqat searchterm xotirasidan o'qiladi.
                onChange={(e) => setsearchterm(e.target.value)} — Har bir bosilgan harfni xotiraga yozadi.
                pl-[36px] — Chap tomondan 36px joy qoldirilgan, shunda yozuv lupa belgisining ustiga chiqib ketmaydi.
              */}
              <input
                value={searchterm}
                onChange={(e) => setsearchterm(e.target.value)}
                className="border border-[#d9d9d9] rounded-[8px] py-[9px] pr-[12px] pl-[36px] text-[14px] bg-white text-[#1a1a1a] w-full focus:outline-2 focus:outline-[#1a1a1a] focus:-outline-offset-1"
                placeholder="Lavozim yoki kompaniya"
              />
            </div>

            {/* Shahar tanlash ochiladigan ro'yxati (Dropdown select) */}
            <select className="flex-1 border border-[#d9d9d9] rounded-[8px] px-[12px] py-[9px] text-[14px] bg-white text-[#1a1a1a] w-full focus:outline-2 focus:outline-[#1a1a1a] focus:-outline-offset-1">
              <option value="Barcha shahlar">Barcha shahlar</option>
              <option value="Toshkent shahri">Toshkent shahri</option>
            </select>

            {/* Qidiruv tugmasi (type="submit" formani ishga tushiradi) */}
            <button
              type="submit"
              className="border border-[#1a1a1a] bg-[#1a1a1a] hover:bg-black text-white rounded-[8px] py-[9px] px-[28px] text-[14px] cursor-pointer"
            >
              Qidiruv
            </button>
          </form>
        </div>
      </section>


      {/* ------------------------------------------------------------------------------------------------- */}
      {/* B BO'LIM: ASOSIY TANA (CHAP TOMONDA FILTRLAR, O'NG TOMONDA VAKANSIYALAR) */}
      {/* ------------------------------------------------------------------------------------------------- */}
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row gap-[24px] py-[24px] items-start">

        {/* ----------------------------------------------------------------------------------------------- */}
        {/* CHAP YON PANEL (<aside>): FILTRLAR BLOKI */}
        {/* md:sticky md:top-[16px] — Foydalanuvchi sahifani pastga aylantirganda filtrlar tepaga yopishib turadi */}
        {/* ----------------------------------------------------------------------------------------------- */}
        <aside className="w-full md:w-[264px] shrink-0 border border-[#e5e5e5] rounded-[10px] py-[16px] px-[20px] md:sticky md:top-[16px]">
          
          {/* Filtrlar sarlavhasi va "tozalash" tugmasi */}
          <div className="flex justify-between items-center mb-[4px]">
            <span className="text-[15px] font-medium">Filtrlar</span>
            {/* 
              onClick={() => setsearchterm("")} — Tugma bosilganda qidiruv xotirasi yana bo'shatiladi ("").
              Buning natijasida barcha vakansiyalar yana ekranda to'liq ko'rinadi!
            */}
            <button
              type="button"
              onClick={() => setsearchterm("")}
              className="text-[12px] text-[#555] bg-transparent border-none cursor-pointer underline"
            >
              tozalash
            </button>
          </div>

          {/* 1. SHAHARLAR BO'LIMI */}
          <div className="text-[12px] text-[#999] mt-[16px] mb-[4px] font-medium">
            Shahar
          </div>
          {/* .map() — Shaharlar massividagi har bir elementni olib, checkbox ko'rinishida ekranga chizadi */}
          {shaharlar.map((item) => (
            // key={item.name} — React ro'yxatdagi elementlarni adashtirib yubormasligi uchun beriladigan maxsus ID
            <label
              key={item.name}
              className="flex items-center gap-[8px] text-[14px] text-[#555] py-[5px] cursor-pointer"
            >
              <input
                type="checkbox"
                className="accent-[#1a1a1a] w-[15px] h-[15px]"
              />
              {item.name}
              {/* ml-auto — Shahardagi ishlar sonini avtomatik ravishda qatorning eng o'ng tomoniga surib qo'yadi */}
              <span className="ml-auto text-[12px] text-[#999]">
                {item.count}
              </span>
            </label>
          ))}

          {/* 2. SOHALAR BO'LIMI */}
          <div className="text-[12px] text-[#999] mt-[16px] mb-[4px] font-medium">
            Soha
          </div>
          {sohalar.map((item) => (
            <label
              key={item.name}
              className="flex items-center gap-[8px] text-[14px] text-[#555] py-[5px] cursor-pointer"
            >
              <input
                type="checkbox"
                className="accent-[#1a1a1a] w-[15px] h-[15px]"
              />
              {item.name}
              <span className="ml-auto text-[12px] text-[#999]">
                {item.count}
              </span>
            </label>
          ))}

          {/* 3. BANDLIK TURI BO'LIMI */}
          <div className="text-[12px] text-[#999] mt-[16px] mb-[4px] font-medium">
            Bandlik turi
          </div>
          {bandlikTurlari.map((item) => (
            <label
              key={item.name}
              className="flex items-center gap-[8px] text-[14px] text-[#555] py-[5px] cursor-pointer"
            >
              <input
                type="checkbox"
                className="accent-[#1a1a1a] w-[15px] h-[15px]"
              />
              {item.name}
              <span className="ml-auto text-[12px] text-[#999]">
                {item.count}
              </span>
            </label>
          ))}

          {/* 4. MAOSH ORALIG'I BO'LIMI */}
          <div className="text-[12px] text-[#999] mt-[16px] mb-[4px] font-medium">
            Maosh (oyiga)
          </div>
          {maoshVariantlari.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-[8px] text-[14px] text-[#555] py-[5px] cursor-pointer"
            >
              {/* type="radio" va name="sal" — Faqat bitta variant tanlanishini kafolatlaydi */}
              <input
                type="radio"
                name="sal"
                className="accent-[#1a1a1a] w-[15px] h-[15px]"
              />
              {opt.label}
            </label>
          ))}

          {/* Filtrlarni tasdiqlash tugmasi */}
          <div className="mt-[20px]">
            <button
              type="button"
              className="border border-[#d9d9d9] bg-white text-[#1a1a1a] rounded-[8px] px-[16px] py-[8px] text-[14px] cursor-pointer w-full"
            >
              Filtrlarni qo'llash
            </button>
          </div>
        </aside>


        {/* ----------------------------------------------------------------------------------------------- */}
        {/* O'NG TOMON (<main>): TOPILGAN VAKANSIYALAR RO'YXATI */}
        {/* ----------------------------------------------------------------------------------------------- */}
        <main className="flex-1 min-w-0 flex flex-col gap-[12px]">
          
          {/* Topilgan vakansiyalar soni hisoblagichi */}
          <div>
            <span>{filterJobs.length} ta vakansiya topildi</span>
          </div>

          {/* 
            TERNARY OPERATOR (Shartli ko'rsatish):
            filterJobs.length > 0 ? (agar ishlar topilgan bo'lsa) : (agar birorta ham ish topilmagan bo'lsa)
          */}
          {filterJobs.length > 0 ? (
            // Topilgan har bir ishni kartochka qilib chizamiz:
            filterJobs.map((job, i) => {
              // DETEKTIV 1: Bu ish saqlanganlar ro'yxatida bormi? (true yoki false)
              const saqlanganmi = savedjob.some((item) => item.id === job.id);

              // DETEKTIV 2: Bu ishga ariza topshirib bo'linganmi? (true yoki false)
              const topshirilganmi = appliedJobs.some((item) => item.id === job.id);

              return (
                // Kartochkaning asosiy ramkasi:
                // "group" — ichki elementlar uchun umumiy maydon (group-hover ishlashi uchun).
                // "key={job.id ?? i}" — Nullish Coalescing (agar id bo'lsa id, bo'lmasa index i olinadi).
                <div
                  key={job.id ?? i}
                  className="group border border-[#e5e5e5] hover:border-[#1a1a1a] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] rounded-[12px] py-[18px] px-[22px] bg-white transition-all duration-200 flex gap-[16px] items-start cursor-pointer"
                >
                  {/* Kompaniya bosh harfi logotipi (masalan: "D", "M", "Z") */}
                  <div className="w-[50px] h-[50px] rounded-[12px] bg-[#f4f4f5] group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors duration-200 flex items-center justify-center text-[18px] font-semibold text-[#3f3f46] shrink-0">
                    {job.letter}
                  </div>

                  {/* Asosiy matnli ma'lumotlar ustuni */}
                  <div className="flex-1 min-w-0">
                    {/* Sarlavha va Maosh bir qatorda */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-[6px]">
                      {/* Sarlavha (truncate — agar sig'may qolsa, uch nuqta "..." qo'yib kesadi) */}
                      <h3 className="text-[16px] font-semibold text-[#1a1a1a] group-hover:underline decoration-[#1a1a1a]/40 underline-offset-4 truncate">
                        {job.title}
                      </h3>
                      {/* Maosh yorlig'i (whitespace-nowrap — so'zlar ikkiga bo'linib pastga tushib ketmaydi) */}
                      <div className="text-[15px] font-semibold text-[#1a1a1a] whitespace-nowrap bg-[#f9fafb] border border-[#ececec] px-[10px] py-[3px] rounded-[8px]">
                        {job.salaryText}{" "}
                        <span className="font-normal text-[12px] text-[#777]">
                          so'm/oy
                        </span>
                      </div>
                    </div>

                    {/* Kompaniya nomi */}
                    <p className="text-[13px] text-[#666] mt-[4px]">
                      {job.company}
                    </p>

                    {/* Qo'shimcha parametrlar: Shahar, Vaqt va Teglar */}
                    <div className="flex flex-wrap gap-[12px] items-center mt-[12px] text-[12px] text-[#777]">
                      {/* Shahar nomi va lokatsiya belgisi */}
                      <span className="inline-flex gap-[5px] items-center text-[#444] font-medium">
                        <svg
                          className="w-[14px] h-[14px] shrink-0 text-[#666]"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 8.5C5 13.25 12 22 12 22C12 22 19 13.25 19 8.5C19 5.13 15.87 2 12 2ZM12 11C10.62 11 9.5 9.88 9.5 8.5C9.5 7.12 10.62 6 12 6C13.38 6 14.5 7.12 14.5 8.5C14.5 9.88 13.38 11 12 11Z" />
                        </svg>
                        {job.city}
                      </span>

                      {/* Ajratuvchi nuqta */}
                      <span className="text-[#999]">•</span>
                      {/* E'lon vaqti */}
                      <span>{job.time}</span>

                      {/* 
                        Teglar ro'yxati (Masofaviy, To'liq stavka...).
                        "job.tags?.map" — Optional Chaining (?.) — agar tags mavjud bo'lmasa sayt qulamasligini ta'minlaydi.
                      */}
                      {job.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="py-[3px] px-[10px] rounded-[6px] text-[12px] font-medium bg-[#f3f4f6] text-[#374151] border border-[#e5e7eb]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* O'NG CHEKKA TUGMALAR BLOKI: ARIZA TOPSHIRISH VA SAQLASH */}
                  <div className="flex items-center gap-[8px] shrink-0">
                    
                    {/* 1. ARIZA TOPSHIRISH TUGMASI */}
                    <button
                      type="button"
                      onClick={(e) => {
                        // e.stopPropagation() — "To'lqinni to'xtatish!".
                        // Agar kartochkaning o'zida ham onClick bo'lsa, tugma bosilganda ota kartochkaga o'tib ketishining oldini oladi.
                        e.stopPropagation();
                        // App.jsx dagi handleOpenApplyModal funksiyasiga shu ishni uzatib modalni ochamiz:
                        onOpenApplyModal(job);
                      }}
                      className={`border rounded-[8px] px-[14px] py-[7px] text-[13px] font-medium cursor-pointer transition-colors duration-150 whitespace-nowrap ${
                        topshirilganmi
                          ? "border-[#b7eb8f] bg-[#f6ffed] text-[#237804]" // Topshirilgan bo'lsa — YASHIL rang
                          : "border-[#1a1a1a] bg-[#1a1a1a] hover:bg-black text-white" // Topshirilmagan bo'lsa — QORA rang
                      }`}
                    >
                      {/* Holatga qarab matn o'zgaradi */}
                      {topshirilganmi ? "Ariza topshirildi" : "Ariza topshirish"}
                    </button>

                    {/* 2. SAQLASH (BOOKMARK) TUGMASI */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); // Kartochka bosilishi bilan aralashib ketmasin
                        handleToggleSave(job); // App.jsx dagi saqlash funksiyasini chaqiramiz
                      }}
                      className={`cursor-pointer p-[8px] rounded-[8px] border border-transparent bg-transparent hover:bg-[#f5f5f5] transition-colors duration-150 shrink-0 ${
                        saqlanganmi
                          ? "text-[#d4380d]" // Saqlangan bo'lsa — QIZIL rang
                          : "text-[#999] hover:text-[#1a1a1a]" // Saqlanmagan bo'lsa — KULRANG
                      }`}
                      title={
                        saqlanganmi ? "Saqlanganlardan o‘chirish" : "Saqlash"
                      }
                    >
                      {/* Bookmark SVG belgisi */}
                      <svg
                        className="w-[18px] h-[18px] shrink-0"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        // fill — belgining ichki bo'yog'i: agar saqlangan bo'lsa to'liq bo'yaladi, aks holda ichi bo'sh (none)
                        fill={saqlanganmi ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M11.1504 16.9189C11.6853 16.6515 12.3147 16.6515 12.8496 16.9189L17.9551 19.4717C18.0216 19.5049 18.0996 19.4562 18.0996 19.3818V5C18.0996 4.94477 18.0552 4.90039 18 4.90039H6C5.94477 4.90039 5.90039 4.94477 5.90039 5V19.3818C5.90039 19.4562 5.97843 19.5049 6.04492 19.4717L11.1504 16.9189Z" />
                      </svg>
                    </button>

                  </div>
                </div>
              );
            })
          ) : (
            // Agar filtrdan keyin hech narsa topilmasa, ko'rsatiladigan xabar:
            <div className="border border-[#e5e5e5] rounded-[12px] py-[32px] px-[20px] bg-white text-center text-[14px] text-[#666]">
              "{searchterm}" bo‘yicha mos vakansiya topilmadi.
            </div>
          )}
        </main>

      </div>
    </>
  ); // return tugadi
} // VakansiyalarPage komponenti tugadi

// Ushbu sahifani butun ilovaga taqdim etamiz
export default VakansiyalarPage;



// 2-QISM: SEKUNDNING MINGDAN BIR ULUSHIDA (ULTRA SLOW-MOTION REPLAY)
// Keling, foydalanuvchi qidiruv maydoniga yozganda va tugmalarni bosganda kompyuterning xotirasi (RAM), protsessori (CPU) va brauzer ekrani qanday ishlashini sekinlashtirilgan kadrda kuzatamiz.

// Voqea 1: Foydalanuvchi qidiruvga "py" deb yozdi


// [0.000 soniya] - FOYDALANUVCHI HARAKATI:
// Foydalanuvchi klaviaturadan "p" va "y" harflarini bosdi.
// [0.001 soniya] - ONCHANGE HODISASI:
// <input> dagi onChange=(e) ishga tushdi.
// e.target.value = "py" ekanligini bildirdi.
// setsearchterm("py") chaqirildi.
// [0.002 soniya] - REACT RE-RENDER TO'LQINI:
// searchterm yangi qiymat oldi: "py".
// React VakansiyalarPage funksiyasini qaytadan o'qishni boshladi.
// [0.003 soniya] - USEMEMO KESH TEKSHIRUVI:
// useMemo o'zining bog'liqliklar ro'yxatiga qaradi: [searchterm, vakansiyalarRoyxati].
// "searchterm avval "" edi, hozir "py" bo'ldi! Demak, eski kesh eskirgan, qayta hisoblashim shart!"
// [0.004 soniya] - .FILTER() ELAGI ISHLADI:
// query = "py"
// - 1-ish: "Senior frontend" -> "py" bormi? YO'Q (false).
// - 2-ish: "Python backend" -> "python".includes("py") -> HA, BOR! (true).
// - 3, 4, 5, 6-ishlar -> YO'Q (false).
// Natijada: filterJobs = [ { id: 2, title: "Python backend dasturchi", ... } ].
// [0.005 soniya] - VIRTUAL DOM SOLISHTIRUVI (DIFFING):
// React yangi chizilgan Virtual DOM-ni eskisi bilan solishtirdi.
// Natija: 5 ta ish ekrandan yashirilishi, faqat 2-ish qolishi va tepada "1 ta vakansiya topildi" deb yozilishi kerak.
// [0.006 soniya] - HAQIQIY DOM YANGILANDI:
// Ekranda ko'z ochib yumguncha faqat Python dasturchi vakansiyasi qoldi!
// Voqea 2: "Ariza topshirish" bosildi va e.stopPropagation() sehri


// [0.000 soniya] - KLIK SODIR BO'LDI:
// Foydalanuvchi Python vakansiyasining "Ariza topshirish" tugmasini bosdi.
// [0.001 soniya] - E.STOPPROPAGATION() QALQONI:
// Brauzerlarda "Event Bubbling" (ko'piklanish) qoidasi bor: bola element bosilsa, 
// zarba to'lqini uning otasiga (butun kartochkaga) ham o'tib ketadi.
// e.stopPropagation() bu to'lqinni shu soniyadayoq qat'iy to'xtatadi!
// Kartochka bexosdan bosilib ketmaydi.
// [0.002 soniya] - ONOPENAPPLYMODAL(JOB) CHAQIRILDI:
// App.jsx dagi handleOpenApplyModal funksiyasiga 2-raqamli ish yuborildi.
// [0.003 soniya] - OTA KOMPONENT (APP.JSX) UYG'ONDI:
// App.jsx da setSelectedJobForApply({ id: 2, ... }) bo'ldi.
// Ekranda ArizaModal oynasi paydo bo'ldi!
// 3-QISM: DASTURCHI TAFEKKURI VA 6 TA OLTIN QOIDA
// 1. Nega vakansiyalarRoyxati = [] deb default qiymat berilgan?
// 10 yoshli bolaga misol: Tasavvur qiling, sizga do‘stingiz "Ichidagi mevalarni sanab ber" deb yopiq quti berdi. Agar quti bo‘m-bo‘sh bo‘lsa ham, qutining o‘zi bor bo‘lsa, siz "0 ta meva" deysiz. Lekin agar do‘stingiz sizga umuman hech narsa bermasa (undefined), siz qidirib yiqilib tushasiz. Default qiymat = [] — bu doimo qo‘lingizda kamida bo‘sh quti bo‘lishini ta'minlaydi. Shuning uchun .filter() yoki .length hech qachon dasturni to‘xtatib qo‘ymaydi.

// 2. Nega oddiy funksiya emas, aynan useMemo?
// Har safar siz qidiruvga bitta harf yozganingizda yoki sahifada boshqa biror narsa yangilanganda, agar useMemo bo‘lmasa, kompyuter minglab ma'lumotlarni qaytadan boshidan saralab chiqadi. Bu esa kuchsiz telefon va kompyuterlarni qotirib qo‘yadi (lag beradi). useMemo — bu aqlli matematika daftari: hisoblab qo‘ygan javobini yodlab oladi va savol o‘zgarmaguncha javobni daftardan qaramasdan aytib beradi.

// 3. Nega (job.title || "") deb yozilgan?
// Agar ma'lumotlar bazasidagi qaysidir e'londa sarlavha qolib ketgan bo‘lsa (title: null yoki undefined), to‘g‘ridan-to‘g‘ri .toLowerCase() chaqirish butun saytni o‘chirib qo‘yadi (TypeError: Cannot read properties of undefined). || "" — bu himoya qalqoni: agar sarlavha bo‘lmasa, uning o‘rniga bo‘sh matn "" olib ketiladi va xatolik yuz bermaydi.

// 4. Nega key={job.id ?? i} ishlatilgan?
// ?? — bu Nullish Coalescing operatori. "Agar job.id mavjud bo‘lsa, shuni ol! Agar u yo‘q bo‘lsa (null yoki undefined), massivning navbat raqamini (i) ol". Bu har bir chizilayotgan kartochkaga albatta takrorlanmas shaxsiy raqam berilishini kafolatlaydi.

