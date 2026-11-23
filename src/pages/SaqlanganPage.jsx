// =========================================================================================================
// 1-QADAM: IMPORT BO'LIMI
// =========================================================================================================
// Diqqat: React 19 zamonaviy versiyasida JSX yozish uchun "import React from 'react'" yozish shart emas.
// Shuningdek, bu sahifada useState yoki useMemo kerak emas, chunki u barcha ma'lumotlarni ota komponentdan
// (App.jsx) tayyor holda oladi. Bu dasturlashda "Ijrochi (Presentational) Komponent" deyiladi.

// =========================================================================================================
// 2-QADAM: KOMPONENT VA PROPS (KIRUVCHI QIYMATLAR VA FUNKSIYALAR)
// =========================================================================================================
// "SaqlanganPage" - foydalanuvchi xatcho'p (bookmark) orqali saqlab qo'ygan vakansiyalarini ko'rsatuvchi sahifa.
// Props tushuntirishi:
// 1. savedjob = [] -> Saqlangan vakansiyalar massivi (agar kelmasa, xato bermasligi uchun default bo'sh massiv).
// 2. appliedJobs = [] -> Ariza topshirilgan vakansiyalar massivi (yashil "Ariza topshirildi" nishonini chiqarish uchun).
// 3. handleRemoveSave = () => {} -> Bitta vakansiyani saqlanganlar ro'yxatidan o'chirish funksiyasi.
// 4. handleclearAll = () => {} -> Barcha saqlangan vakansiyalarni bir klik bilan tozalash funksiyasi.
// 5. onOpenApplyModal = () => {} -> Vakansiyaga ariza topshirish modal oynasini ochuvchi funksiya.
function SaqlanganPage({
  savedjob = [],
  appliedJobs = [],
  handleRemoveSave = () => {},
  handleclearAll = () => {},
  onOpenApplyModal = () => {},
}) {
  // =======================================================================================================
  // 3-QADAM: JSX RETURN (FOYDALANUVCHI KO'RADIGAN VIZUAL INTERFEYS)
  // =======================================================================================================

  return (
    // Asosiy konteyner: maksimal eni 1280px, gorizontal markazlashtirilgan (mx-auto), qulay ichki bo'shliqlar
    <div className="max-w-[1280px] mx-auto px-[32px] py-[28px]">
      
      {/* ------------------------------------------------------------------------------------------------- */}
      {/* TEPADAGI SARLAVHA VA "BARCHASINI O'CHIRISH" TUGMASI */}
      {/* ------------------------------------------------------------------------------------------------- */}
      <div className="flex justify-between items-center mb-[20px]">
        {/* Sarlavha va saqlanganlar soni */}
        <div className="text-[22px] font-medium">
          Saqlangan vakansiyalar{" "}
          <span className="text-[13px] text-[#999] font-normal">
            {savedjob.length} ta
          </span>
        </div>

        {/* 
          Shartli render: Agar ro'yxatda kamida 1 ta vakansiya bo'lsa (savedjob.length > 0),
          "Barchasini o'chirish" tugmasi ko'rinadi. Ro'yxat bo'sh bo'lsa bu tugma ko'rinmaydi.
        */}
        {savedjob.length > 0 && (
          <button
            type="button"
            onClick={handleclearAll} // Bosilganda App.jsx dagi setsavedjob([]) ishga tushadi
            className="text-[12px] text-[#555] bg-transparent border-none cursor-pointer underline hover:text-black transition"
          >
            Barchasini o'chirish
          </button>
        )}
      </div>

      {/* ------------------------------------------------------------------------------------------------- */}
      {/* ASOSIY MAYDON: RO'YXAT BO'SHMI YOKI VAKANSIYALAR BORMI? */}
      {/* ------------------------------------------------------------------------------------------------- */}
      {savedjob.length === 0 ? (
        // A HOLAT: Agar hech qanday ish saqlanmagan bo'lsa (bo'sh quti ko'rsatiladi)
        <div className="border border-[#e5e5e5] rounded-[10px] py-[40px] px-[20px] text-center text-[#777] text-[14px] mb-[12px] bg-white shadow-xs">
          Saqlangan vakansiyalar ro‘yxati bo‘sh.
        </div>
      ) : (
        // B HOLAT: Agar saqlangan vakansiyalar mavjud bo'lsa, ularni .map() orqali birma-bir chizamiz
        savedjob.map((item, index) => {
          // Kompaniya nomini ajratib tozalash: "Datalab · IT Park rezidenti" -> "Datalab"
          const kompaniyaNomi = (item.company || "").split("·")[0].trim();

          // Ushbu vakansiyaga avval ariza yuborilganmi? (.some() orqali tekshirish)
          const topshirilganmi = appliedJobs.some(
            (applied) => applied.id === item.id,
          );

          return (
            // Har bir saqlangan vakansiya kartochkasi qatori
            <div
              key={item.id ?? index}
              className="row border border-[#e5e5e5] hover:border-[#bbb] rounded-[10px] py-[16px] px-[20px] bg-white transition-colors duration-150 flex gap-[16px] items-center mb-[12px] shadow-xs"
            >
              {/* 1-USTUN: Qizil to'ldirilgan xatcho'p (bookmark) belgisi */}
              <span
                onClick={() => handleRemoveSave(item.id)} // Bosilganda shu vakansiyani saqlanganlardan o'chiradi
                title="Saqlanganlardan o‘chirish"
                className="text-[#d4380d] cursor-pointer"
              >
                <svg
                  className="w-[18px] h-[18px] shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.1504 16.9189C11.6853 16.6515 12.3147 16.6515 12.8496 16.9189L17.9551 19.4717C18.0216 19.5049 18.0996 19.4562 18.0996 19.3818V5C18.0996 4.94477 18.0552 4.90039 18 4.90039H6C5.94477 4.90039 5.90039 4.94477 5.90039 5V19.3818C5.90039 19.4562 5.97843 19.5049 6.04492 19.4717L11.1504 16.9189Z" />
                </svg>
              </span>

              {/* 2-USTUN: Kompaniya nomining bosh harfi */}
              <div className="w-[44px] h-[44px] rounded-[10px] bg-[#f2f2f2] flex items-center justify-center text-[16px] font-medium text-[#555] shrink-0">
                {item.letter}
              </div>

              {/* 3-USTUN: Kasb nomi, kompaniya, shahar va e'lon vaqti */}
              <div className="flex-1">
                <div className="text-[15px] font-medium text-neutral-900">{item.title}</div>
                <div className="text-[13px] text-[#777] mt-[2px]">
                  {kompaniyaNomi} · {item.city} · {item.time}
                </div>
              </div>

              {/* 4-USTUN: Oylik maosh miqdori */}
              <div className="text-[14px] font-medium mr-[12px] text-neutral-900">
                {item.salaryText}{" "}
                <span className="font-normal text-[12px] text-[#999]">
                  so'm
                </span>
              </div>

              {/* 5-USTUN: Ariza topshirish tugmasi */}
              <a
                href="#ariza"
                onClick={(e) => {
                  e.preventDefault(); // Havola sahifani sakratib yubormasligi uchun standart harakatni to'xtatish
                  onOpenApplyModal(item); // Ariza oynasini shu vakansiya uchun ochish
                }}
                className={`border rounded-[8px] text-[13px] py-[6px] px-[14px] mr-[8px] no-underline transition-colors duration-150 cursor-pointer ${
                  topshirilganmi
                    ? "border-[#b7eb8f] bg-[#f6ffed] text-[#237804] font-medium"
                    : "border-[#d9d9d9] hover:border-[#1a1a1a] bg-white text-[#1a1a1a]"
                }`}
              >
                {topshirilganmi ? "Ariza topshirildi" : "Ariza topshirish"}
              </a>

              {/* 6-USTUN: Axlat qutisi va "O'chirish" matnli tugmasi */}
              <span
                onClick={() => handleRemoveSave(item.id)}
                className="rowact text-[#999] cursor-pointer inline-flex gap-[4px] items-center text-[12px] hover:text-[#d4380d] transition-colors"
              >
                <svg
                  className="w-[15px] h-[15px] shrink-0"
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
      {/* BILDIRISHNOMA (NOTIFICATION) BANNERI */}
      {/* ------------------------------------------------------------------------------------------------- */}
      <div className="border border-[#e5e5e5] hover:border-[#bbb] rounded-[10px] py-[16px] px-[20px] bg-white transition-colors duration-150 flex gap-[12px] items-center text-[13px] text-[#555] shadow-xs">
        <span className="text-[#999]">
          <svg
            className="w-[16px] h-[16px] shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M11.1504 16.9189C11.6853 16.6515 12.3147 16.6515 12.8496 16.9189L17.9551 19.4717C18.0216 19.5049 18.0996 19.4562 18.0996 19.3818V5C18.0996 4.94477 18.0552 4.90039 18 4.90039H6C5.94477 4.90039 5.90039 4.94477 5.90039 5V19.3818C5.90039 19.4562 5.97843 19.5049 6.04492 19.4717L11.1504 16.9189Z" />
          </svg>
        </span>
        Yangi vakansiyalar chiqishi haqida{" "}
        <b className="font-medium text-[#1a1a1a]">kunlik bildirishnoma</b>{" "}
        olishni xohlaysizmi?
        <button
          type="button"
          className="border border-[#d9d9d9] bg-white text-[#1a1a1a] rounded-[8px] text-[13px] py-[5px] px-[14px] ml-auto cursor-pointer hover:border-[#1a1a1a] transition-colors"
        >
          Bildirishnomani yoqish
        </button>
      </div>
    </div>
  );
}

// =========================================================================================================
// 2-QISM: ULTRA SLOW-MOTION (VOQEALAR SEKINLASHTIRILGAN KADRDA)
// =========================================================================================================
// Voqea 1: Foydalanuvchi qizil xatcho'p yoki "O'chirish" tugmasini bosdi:
//    - onClick -> handleRemoveSave(item.id) chaqiriladi.
//    - Xabar ota komponent App.jsx ga yetib boradi.
//    - App.jsx da: setsavedjob((prev) => prev.filter((it) => it.id !== item.id)) ishga tushadi.
//    - Filter elagi o'sha id-ga teng bo'lgan vakansiyani olib tashlaydi va yangi massivni localStorage ga yozadi.
//    - SaqlanganPage yangilangan savedjob propini oladi va o'sha qator ko'z ochib yumguncha ekrandan o'chadi.
//
// Voqea 2: Foydalanuvchi "Barchasini o'chirish" tugmasini bosdi:
//    - onClick -> handleclearAll chaqiriladi.
//    - App.jsx setsavedjob([]) qiladi (bo'sh massiv yuklaydi).
//    - savedjob.length endi 0 bo'ladi.
//    - Shartli render (savedjob.length === 0 ?) ishga tushib, barcha qatorlar o'rniga
//      "Saqlangan vakansiyalar ro'yxati bo'sh" degan blok chiqadi.
//
// Voqea 3: Foydalanuvchi "Ariza topshirish" tugmasini bosdi:
//    - e.preventDefault() sahifaning sakrab ketishining oldini oladi.
//    - onOpenApplyModal(item) orqali Ariza topshirish oynasi ochiladi va ariza jo'natilgach,
//      topshirilganmi o'zgaruvchisi true bo'lib, tugma yashil "Ariza topshirildi" nishoniga aylanadi.

// =========================================================================================================
// 3-QISM: DASTURCHI TAFEKKURI VA NEGA AYNAN SHUNDAY YOZILGAN?
// =========================================================================================================
// 1. Nega bu sahifada shaxsiy useState yo'q?
//    - Chunki barcha saqlangan ishlar va arizalar butun sayt bo'ylab (Navbar, VakansiyalarPage, SaqlanganPage)
//      bir xil bo'lishi shart. Agar SaqlanganPage o'zida alohida state ochsa, Navbar-dagi hisoblagich bilan
//      bir-biriga to'g'ri kelmay qolardi. Shuning uchun ma'lumotlar bitta manbada (App.jsx) saqlanadi.
// 2. Nega split('·')[0].trim() qilindi?
//    - Asosiy bazada kompaniya nomi "Datalab · IT Park rezidenti" shaklida to'liq yozilgan.
//      Saqlanganlar sahifasida qatorlar torroq bo'lgani sababli, faqat toza nom ("Datalab") qoldirildi.
// 3. Nega ikkita o'chirish imkoni bor (ham xatcho'p, ham matnli "O'chirish")?
//    - Bu foydalanuvchi tajribasini (UX) oshiradi. Ba'zi foydalanuvchilar qizil bookmark ikonkasini bosishga
//      o'rgangan bo'lsa, boshqalar aniq matnli "O'chirish" yozuvini qidiradi.

export default SaqlanganPage;
