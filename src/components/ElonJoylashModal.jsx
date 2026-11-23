// =========================================================================================================
// 1-QADAM: IMPORT BO'LIMI (KUTUBXONA VA HOOKLARNI CHAQIRISH)
// =========================================================================================================

// "useState" - React-ning asosiy xotira hooki.
// Bu modal oynadagi har bir input maydoni (kasb nomi, kompaniya, shahar, oylik maosh, tanlangan teglar)
// o'z qiymatini useState orqali xotirada saqlaydi va foydalanuvchi yozishi bilan yangilanib boradi.
import { useState } from "react";

// Material-UI (MUI) kutubxonasidan tayyor va chiroyli Select komponentlarini chaqirib olamiz:
// "FormControl" - formadagi tanlov maydonining umumiy o'rami (label va inputni birlashtirib turadi).
// "MenuItem" - ochiluvchi ro'yxatning har bitta varianti (masalan, "Toshkent", "Samarqand").
// "Select" - bosganda pastga ro'yxat ochiluvchi zamonaviy tanlov qutisi.
import { FormControl, MenuItem, Select } from "@mui/material";

// =========================================================================================================
// 2-QADAM: YORDAMCHI FUNKSIYALAR (HELPER UTILS)
// Komponentdan tashqarida yozilgan, chunki u har safar qayta hisoblanmasdan, alohida mustaqil ishlay oladi.
// =========================================================================================================

// "parseSalaryFromJob" - Mavjud vakansiya tahrirlanayotganda (editJob), uning "4 - 8 mln" yoki "10 mln gacha"
// kabi matnli maoshini tahlil qilib, min (eng kami) va max (eng ko'pi) raqamlariga ajratib beruvchi aqlli funksiya.
function parseSalaryFromJob(job) {
  // Agar vakansiyada salaryText matni mavjud bo'lsa
  if (job?.salaryText) {
    // Regex yordamida harflarni tozalab, faqat raqamlar, nuqta va chiziqchalarni qoldiramiz
    const cleaned = job.salaryText.replace(/[^0-9.–-]/g, "");
    // Chiziqcha (– yoki -) orqali matnni ikki bo'lakka ajratamiz
    const parts = cleaned.split(/[–-]/);
    // Agar kamida ikkita raqam topilsa (masalan, min: 4, max: 8)
    if (parts.length >= 2 && parts[0] && parts[1]) {
      return { min: parts[0].trim(), max: parts[1].trim() };
    } else if (parts.length === 1 && parts[0]) {
      // Agar bitta raqam bo'lsa (masalan: "10 mln gacha")
      return { min: "", max: parts[0].trim() };
    }
  } else if (job?.salaryMax) {
    // Agar faqat salaryMax soni berilgan bo'lsa
    return { min: "", max: String(job.salaryMax) };
  }
  // Agar maosh haqida hech narsa bo'lmasa, ikkalasini bo'sh qator qilib qaytaramiz
  return { min: "", max: "" };
}

// =========================================================================================================
// 3-QADAM: ASOSIY KOMPONENT VA PROPS (KIRIB KELUVCHI MA'LUMOTLAR)
// =========================================================================================================
// "ElonJoylashModal" - saytga yangi vakansiya e'lon qilish yoki mavjud e'lonni tahrirlash oynasi.
// Props tushuntirishi:
// 1. isOpen - modal oyna ochiqmi (true) yoki yopiqmi (false)?
// 2. editJob - agar tahrirlash bosilgan bo'lsa shu vakansiya obyekti keladi, yangi qo'shilayotganda esa null bo'ladi.
// 3. onClose - modal oynani yopish buyrug'ini beruvchi funksiya.
// 4. onSubmit - to'ldirilgan ma'lumotlarni ota komponentga (App.jsx) yuboruvchi funksiya.
// 5. shaharlar - saytdagi mavjud shaharlar ro'yxati.
// 6. sohalar - saytdagi mavjud sohalar (kategoriyalar) ro'yxati.
function ElonJoylashModal({
  isOpen = false,
  editJob = null,
  onClose = () => {},
  onSubmit = () => {},
  shaharlar = [],
  sohalar = [],
}) {
  // Agar editJob mavjud bo'lsa, uning maoshini min va max qismlariga ajratib olamiz
  const initialSalary = parseSalaryFromJob(editJob);

  // -------------------------------------------------------------------------------------------------------
  // 4-QADAM: STATE (FORMA INPUTLARI UCHUN XOTIRA MAYDONLARI)
  // -------------------------------------------------------------------------------------------------------

  // "title" - Vakansiya/kasb nomi (masalan: "Frontend Dasturchi"). Tahrirlanayotgan bo'lsa eski nomi chiqadi.
  const [title, setTitle] = useState(editJob?.title || "");

  // "company" - Kompaniya nomi (masalan: "Datalab").
  const [company, setCompany] = useState(editJob?.company || "");

  // "city" - Joylashgan shahar (boshlang'ich qiymati: editJob shahri yoki "Toshkent").
  const [city, setCity] = useState(editJob?.city || "Toshkent");

  // "category" - Faoliyat sohasi (boshlang'ich qiymati: editJob sohasi yoki "IT va dasturlash").
  const [category, setCategory] = useState(editJob?.category || "IT va dasturlash");

  // "salaryMin" - Minimal oylik maosh (masalan: 6).
  const [salaryMin, setSalaryMin] = useState(initialSalary.min);

  // "salaryMaxInput" - Maksimal oylik maosh (masalan: 12).
  const [salaryMaxInput, setSalaryMaxInput] = useState(initialSalary.max);

  // "selectedTags" - Tanlangan bandlik turlari ro'yxati (masalan: ["To'liq stavka", "Masofaviy"]).
  const [selectedTags, setSelectedTags] = useState(
    Array.isArray(editJob?.tags) && editJob.tags.length > 0
      ? editJob.tags
      : ["To‘liq stavka"]
  );

  // "customTag" - Foydalanuvchi o'zi kiritmoqchi bo'lgan maxsus qo'shimcha teg (masalan: "Junior", "1C").
  const [customTag, setCustomTag] = useState("");

  // "errorMsg" - Agar forma chala to'ldirilsa, foydalanuvchiga chiqadigan ogohlantirish qizil xabari.
  const [errorMsg, setErrorMsg] = useState("");

  // "successNotice" - Forma muvaffaqiyatli saqlanganda chiqadigan yashil bildirishnoma.
  const [successNotice, setSuccessNotice] = useState(false);

  // AGAR isOpen = false BO'LSA, KOMPYUTERGA AYTAMIZ: "HECH NARSA CHIZMA, EKRAN BO'SH QOLSIN (null)"
  if (!isOpen) return null;

  // -------------------------------------------------------------------------------------------------------
  // 5-QADAM: VARIANTLARNI SHAKLLANTIRISH (OPTIONS)
  // -------------------------------------------------------------------------------------------------------

  // Shaharlar variantlari: props orqali kelgan bo'lsa o'shalar, aks holda standart O'zbekiston shaharlari
  const shaharVariantlari =
    shaharlar.length > 0
      ? shaharlar.map((s) => s.name)
      : ["Toshkent", "Samarqand", "Farg‘ona", "Andijon", "Nukus", "Buxoro", "Namangan"];

  // Sohalar variantlari
  const sohaVariantlari =
    sohalar.length > 0
      ? sohalar.map((s) => s.name)
      : [
          "IT va dasturlash",
          "Moliya va buxgalteriya",
          "Savdo",
          "Marketing",
          "Ta‘lim",
          "Menejment",
        ];

  // Standart tezkor tanlanuvchi bandlik teglari
  const mavjudTeglar = ["To‘liq stavka", "Masofaviy", "Qisman bandlik", "Amaliyot"];

  // -------------------------------------------------------------------------------------------------------
  // 6-QADAM: FORM BILAN ISHLASH FUNKSIYALARI (HANDLERS)
  // -------------------------------------------------------------------------------------------------------

  // "handleTagToggle" - Teg tugmasi bosilganda: agar ro'yxatda bor bo'lsa o'chiradi, yo'q bo'lsa qo'shadi (toggle)
  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // "handleAddCustomTag" - Foydalanuvchi o'z tegi matnini kiritib "+ Qo'shish" tugmasini bosganda
  const handleAddCustomTag = (e) => {
    e.preventDefault(); // Sahifa yangilanib ketishining oldini oladi
    const tozaTeg = customTag.trim();
    // Agar matn bo'sh bo'lmasa va avval tanlanmagan bo'lsa
    if (tozaTeg && !selectedTags.includes(tozaTeg)) {
      setSelectedTags((prev) => [...prev, tozaTeg]);
      setCustomTag(""); // Inputni qayta bo'shatamiz
    }
  };

  // "calculatedLetter" - Kompaniya nomining birinchi harfini katta harf qilib logotip yasaydi (masalan: "Datalab" -> "D")
  const calculatedLetter = company.trim()
    ? company.trim()[0].toUpperCase()
    : "💼";

  // "formatSalaryText" - Foydalanuvchi kiritgan min va max sonlaridan chiroyli matn yasaydi:
  // Masalan: 4 va 8 -> "4 – 8 mln", faqat 10 -> "10 mln gacha", bo'sh bo'lsa -> "Kelishilgan"
  const formatSalaryText = () => {
    const min = parseFloat(salaryMin);
    const max = parseFloat(salaryMaxInput);

    if (min && max) {
      return `${min} – ${max} mln`;
    }
    if (max && !min) {
      return `${max} mln gacha`;
    }
    if (min && !max) {
      return `${min} mln dan`;
    }
    return editJob?.salaryText || "Kelishilgan";
  };

  // "calculateSalaryMax" - Vakansiyalar sahifasida oylik maosh slayderi (filter) to'g'ri ishlashi uchun
  // sonli eng katta qiymatni hisoblab beradi
  const calculateSalaryMax = () => {
    const max = parseFloat(salaryMaxInput);
    const min = parseFloat(salaryMin);
    if (!isNaN(max) && max > 0) return max;
    if (!isNaN(min) && min > 0) return min;
    return editJob?.salaryMax || 10;
  };

  // "handleSubmit" - Formaning "E'lonni joylashtirish" yoki "O'zgarishlarni saqlash" tugmasi bosilganda:
  const handleSubmit = (e) => {
    e.preventDefault(); // Formaning brauzer tomonidan qayta yuklanishini to'xtatamiz

    // 1. VALIDATSIYA (MA'LUMOTLARNI TEKSHIRISH):
    if (!title.trim()) {
      setErrorMsg("Iltimos, kasb/lavozim nomini kiriting.");
      return;
    }
    if (!company.trim()) {
      setErrorMsg("Iltimos, kompaniya nomini kiriting.");
      return;
    }
    if (selectedTags.length === 0) {
      setErrorMsg("Iltimos, kamida bitta bandlik turini tanlang.");
      return;
    }

    // Xato yo'q bo'lsa, xato xabarini tozalaymiz
    setErrorMsg("");

    // 2. TAYYOR VAKANSIYA OBYEKTINI YASASH:
    const jobData = {
      // Agar tahrirlanayotgan bo'lsa eski unikal ID saqlanadi, yangi bo'lsa joriy vaqt millisekundlarda ID bo'ladi
      id: editJob ? editJob.id : Date.now(),
      letter: calculatedLetter,
      title: title.trim(),
      salaryText: formatSalaryText(),
      salaryMax: calculateSalaryMax(),
      company: company.trim(),
      city: city,
      category: category,
      time: editJob ? "Tahrirlandi" : "Hozirgina",
      createdAt: editJob ? editJob.createdAt : Date.now(),
      tags: selectedTags,
      isMyJob: true, // Foydalanuvchi tomonidan qo'shilgan e'lon belgisi (Mening e'lonlarimda ko'rinadi)
    };

    // 3. Muvaffaqiyat bildirishnomasini ko'rsatib, 500ms dan so'ng modalni yopamiz
    setSuccessNotice(true);
    setTimeout(() => {
      // Ota komponentga tayyor ma'lumotni va tahrirlash holatini (true/false) uzatamiz
      onSubmit(jobData, !!editJob);
      setSuccessNotice(false);
      onClose(); // Modalni yopish
    }, 500);
  };

  // =======================================================================================================
  // 7-QADAM: JSX RETURN (VIZUAL DIZAYN VA LAYOUT)
  // =======================================================================================================

  return (
    // Tashqi qora yarim shaffof parda (Overlay): ustiga bosilganda modal yopiladi (onClose)
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
    >
      {/* Modal oynasining asosiy oq qutisi: ichiga bosilganda yopilib ketmasligi uchun stopPropagation qo'yilgan */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-2xl w-full my-8 max-h-[90vh] flex flex-col shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150"
      >
        {/* ----------------------------------------------------------------------------------------------- */}
        {/* MODAL BOSHI (HEADER) */}
        {/* ----------------------------------------------------------------------------------------------- */}
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Qora kvadrat ikonka: yangi e'londa "+" chiqadi, tahrirlashda esa "✎" qalam belgisi */}
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center text-lg font-bold">
              {editJob ? "✎" : "+"}
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900">
                {editJob ? "E‘lonni tahrirlash" : "Yangi e‘lon (vakansiya) joylashtirish"}
              </h2>
              <p className="text-xs text-neutral-500">
                {editJob
                  ? "E‘lon ma‘lumotlarini o‘zgartiring va saqlang"
                  : "Ma‘lumotlarni to‘ldiring va vakansiyangiz darhol e‘lonlar taxtasida paydo bo‘ladi"}
              </p>
            </div>
          </div>

          {/* Modalni yopish "✕" tugmasi */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center cursor-pointer transition text-sm"
          >
            ✕
          </button>
        </div>

        {/* ----------------------------------------------------------------------------------------------- */}
        {/* MODAL TANASI (FORMA VA LIVE PREVIEW KARTASI) */}
        {/* ----------------------------------------------------------------------------------------------- */}
        <div className="p-6 overflow-y-auto">
          
          {/* Yashil muvaffaqiyat bildirishnomasi */}
          {successNotice && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <span className="text-base">✓</span>
              <span>
                {editJob
                  ? "O‘zgarishlar muvaffaqiyatli saqlandi!"
                  : "Vakansiya muvaffaqiyatli qabul qilindi va ro‘yxatga qo‘shilmoqda!"}
              </span>
            </div>
          )}

          {/* Qizil ogohlantirish xatosi */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <span className="text-base">⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form tegi: onSubmit orqali tekshirish va yuborish */}
          <form onSubmit={handleSubmit} id="elon-joylash-form" className="space-y-4">
            
            {/* 1. KASB NOMI VA KOMPANIYA NOMI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Vakansiya / Kasb nomi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Senior frontend dasturchi"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Kompaniya nomi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Datalab yoki Texnomart"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 transition"
                />
              </div>
            </div>

            {/* 2. SHAHAR VA SOHA (MATERIAL-UI SELECT) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Joylashgan shahar */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Joylashgan shahar <span className="text-red-500">*</span>
                </label>
                <FormControl fullWidth size="small">
                  <Select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    displayEmpty
                    // disableScrollLock: true - Ekran ochilib yopilganda yon tomondagi skroll qimirlab ketmasligi uchun!
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                    sx={{
                      backgroundColor: "#f9fafb",
                      borderRadius: "8px",
                      fontSize: "14px",
                      color: "#1a1a1a",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e5e7eb",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#171717",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#171717",
                        borderWidth: "1.5px",
                      },
                      "& .MuiSelect-select": {
                        paddingTop: "7.5px",
                        paddingBottom: "7.5px",
                        paddingLeft: "12px",
                      },
                    }}
                  >
                    {shaharVariantlari.map((sh) => (
                      <MenuItem key={sh} value={sh}>
                        {sh}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              {/* Faoliyat sohasi */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Faoliyat sohasi <span className="text-red-500">*</span>
                </label>
                <FormControl fullWidth size="small">
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    displayEmpty
                    // disableScrollLock: true - brauzer oynasining siljib ketmasligini kafolatlaydi
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                    sx={{
                      backgroundColor: "#f9fafb",
                      borderRadius: "8px",
                      fontSize: "14px",
                      color: "#1a1a1a",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e5e7eb",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#171717",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#171717",
                        borderWidth: "1.5px",
                      },
                      "& .MuiSelect-select": {
                        paddingTop: "7.5px",
                        paddingBottom: "7.5px",
                        paddingLeft: "12px",
                      },
                    }}
                  >
                    {sohaVariantlari.map((so) => (
                      <MenuItem key={so} value={so}>
                        {so}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            {/* 3. OYLIK MAOSH (MIN VA MAX) */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Oylik maosh (mln so‘mda)
              </label>
              <div className="grid grid-cols-2 gap-3 items-center">
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    placeholder="Min (masalan: 6)"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 transition"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
                    mln
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    placeholder="Max (masalan: 12)"
                    value={salaryMaxInput}
                    onChange={(e) => setSalaryMaxInput(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 transition"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
                    mln
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">
                Ekranda: <span className="font-semibold text-neutral-700">{formatSalaryText()} so‘m/oy</span> ko‘rinishida aks etadi
              </p>
            </div>

            {/* 4. BANDLIK TURI VA TEGLAR */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Bandlik turi / Teglar <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {mavjudTeglar.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition ${
                        isSelected
                          ? "bg-black text-white" // Tanlangan: qora fon
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200" // Tanlanmagan: och kulrang fon
                      }`}
                    >
                      {isSelected ? "✓ " : "+ "}
                      {tag}
                    </button>
                  );
                })}
              </div>

              {/* Shaxsiy qo'shimcha yangi teg kiritish maydoni */}
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Yangi teg qo‘shish (masalan: Junior, 1C)..."
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900"
                />
                <button
                  type="button"
                  onClick={handleAddCustomTag}
                  className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs rounded-lg font-medium cursor-pointer"
                >
                  Qo‘shish
                </button>
              </div>
            </div>

            {/* ------------------------------------------------------------------------------------------- */}
            {/* 5. JONLI OLDINDAN KO'RISH (LIVE CARD PREVIEW) */}
            {/* Foydalanuvchi yuqorida harf yozishi bilan bu karta real vaqtda o'zgarib turadi! */}
            {/* ------------------------------------------------------------------------------------------- */}
            <div className="mt-6 pt-5 border-t border-neutral-200">
              <div className="text-xs font-semibold text-neutral-500 mb-2 uppercase tracking-wider">
                Vakansiyalar ro‘yxatida qanday ko‘rinadi:
              </div>

              <div className="border border-[#e5e5e5] rounded-[10px] py-[16px] px-[20px] bg-white flex gap-[16px] items-start shadow-xs">
                {/* Kompaniya nomining bosh harfi */}
                <div className="w-[48px] h-[48px] rounded-[10px] bg-[#f2f2f2] flex items-center justify-center text-[18px] font-medium text-[#555] shrink-0">
                  {calculatedLetter}
                </div>

                {/* Kasb va maosh */}
                <div className="flex-1">
                  <div className="flex justify-between gap-[12px]">
                    <div className="text-[16px] font-medium text-neutral-900 capitalize">
                      {title || "Kasb / Lavozim nomi"}
                    </div>
                    <div className="text-[15px] font-medium whitespace-nowrap text-neutral-900">
                      {formatSalaryText()}{" "}
                      <span className="font-normal text-[12px] text-[#999]">
                        so'm/oy
                      </span>
                    </div>
                  </div>

                  {/* Kompaniya nomi */}
                  <div className="text-[13px] text-[#777] mt-[2px] capitalize">
                    {company || "Kompaniya nomi"}
                  </div>

                  {/* Shahar, vaqt va teglar */}
                  <div className="flex gap-[14px] items-center mt-[8px] text-[12px] text-[#999] flex-wrap">
                    <span className="inline-flex gap-[4px] items-center text-[#555] capitalize">
                      <svg
                        className="w-[14px] h-[14px] shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 8.5C5 13.25 12 22 12 22C12 22 19 13.25 19 8.5C19 5.13 15.87 2 12 2ZM12 11C10.62 11 9.5 9.88 9.5 8.5C9.5 7.12 10.62 6 12 6C13.38 6 14.5 7.12 14.5 8.5C14.5 9.88 13.38 11 12 11Z" />
                      </svg>
                      {city}
                    </span>

                    <span>{editJob ? "Tahrirlangan" : "Hozirgina"}</span>

                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="py-[2px] px-[8px] rounded-[6px] text-[12px] bg-[#f2f2f2] text-[#555]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* ----------------------------------------------------------------------------------------------- */}
        {/* MODAL ETOGI (FOOTER): TUGMALAR QATORI */}
        {/* ----------------------------------------------------------------------------------------------- */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50 rounded-b-2xl flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer transition"
          >
            Bekor qilish
          </button>

          {/* Formani topshirish tugmasi */}
          <button
            type="submit"
            form="elon-joylash-form"
            className="px-6 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl cursor-pointer transition flex items-center gap-2 shadow-xs"
          >
            <span>{editJob ? "O‘zgarishlarni saqlash" : "E‘lonni joylashtirish"}</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// =========================================================================================================
// 2-QISM: ULTRA SLOW-MOTION (VOQEALAR SEKINLASHTIRILGAN KADRDA)
// =========================================================================================================
// 1. Foydalanuvchi "Vakansiya / Kasb nomi" maydoniga "NodeJS Backend" deb yozadi:
//    - Har bir harf bosilganda onChange -> setTitle(e.target.value) chaqiriladi.
//    - Pastdagi "Jonli oldindan ko'rish" (Live Card Preview) bo'limida sarlavha bir lahzada
//      "NodeJS Backend" ga aylanadi! Foydalanuvchi o'z e'loni qanday chiqishini darhol ko'radi.
//
// 2. Foydalanuvchi MUI Select shahar menyusini ochadi:
//    - "disableScrollLock: true" tufayli brauzerning asosiy skrolli qulflanmaydi va butun sahifa sakrab ketmaydi.
//    - "Samarqand" ni tanlaydi -> setCity("Samarqand") bo'ladi.
//
// 3. Foydalanuvchi "Masofaviy" tugmasini bosadi:
//    - handleTagToggle("Masofaviy") ishlaydi.
//    - selectedTags massiviga "Masofaviy" qo'shiladi va tugma rangi qora bo'lib "✓ Masofaviy" ko'rinishiga kiradi.
//
// 4. Foydalanuvchi "E'lonni joylashtirish" tugmasini bosadi:
//    - handleSubmit funksiyasi barcha maydonlarni tekshiradi: nom va kompaniya to'ldirilganmi?
//    - Hammasi to'g'ri bo'lsa, successNotice = true qilinib yashil belgi chiqadi.
//    - 500 millisekunddan so'ng onSubmit(jobData) chaqirilib, e'lon App.jsx ga boradi va ekranga tushadi!

// =========================================================================================================
// 3-QISM: DASTURCHI TAFEKKURI VA NEGA AYNAN SHUNDAY YOZILGAN?
// =========================================================================================================
// 1. Nega Material-UI Select uchun "disableScrollLock: true" ishlatildi?
//    - Material-UI odatda Select yoki Modal ochilganda brauzer body-siga "overflow: hidden" va "padding-right" beradi.
//      Bu esa ekranning o'ng tomonidagi skroll yo'qolib, butun sayt chapga-o'ngga siljib (qimirlab) ketishiga sabab bo'ladi.
//      "disableScrollLock: true" bu xatoni to'liq bartaraf etadi va sahifani mutlaqo qo'zg'almas saqlaydi!
// 2. Nega formaning ichida "Live Card Preview" yaratildi?
//    - Bu foydalanuvchiga e'lon saytda qanday ko'rinishini oldindan ko'rish imkonini beradi.
//      Agar xato yoki kamchilik bo'lsa, saqlashdan oldin tuzatib olish juda qulay bo'ladi.
// 3. Nega bitta modal ham qo'shish, ham tahrirlash uchun ishlatiladi?
//    - DRY (Don't Repeat Yourself) qoidasi! Alohida tahrirlash modali yaratish kod hajmini 2 barobar ko'paytirgan bo'lardi.
//      editJob propining bor yoki yo'qligiga qarab bitta modal ikkala rolni ham mukammal bajaradi.

export default ElonJoylashModal;
