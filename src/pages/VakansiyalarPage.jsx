// =========================================================================================================
// 1-QADAM: IMPORT BO'LIMI (KERAKLI QUROLLARNI CHAQIRISH)
// =========================================================================================================

// "useEffect" - Ekranga chizilgandan so'ng tashqi muhit bilan ishlash (masalan, o'lchamlarni hisoblash, hodisalarni tinglash).
// "useMemo" - Qimmatli hisob-kitoblarni (filtrlash, sanash) keshlab, kompyuterni ortiqcha yuklamadan asrovchi daho hook.
// "useRef" - HTML elementga (masalan, chap tarafdagi filtr paneliga) to'g'ridan-to'g'ri ko'rsatkich (havola) bog'lash.
// "useState" - Foydalanuvchi qidiruvga yozayotgan so'zlar, tanlagan shaharlar va maoshlarni eslab qoluvchi reaktiv xotira.
import { useEffect, useMemo, useRef, useState } from "react";

// Material-UI (MUI) kutubxonasidan zamonaviy shahar tanlash menyusi:
// "FormControl" - tanlov maydonining umumiy o'lchami va strukturasi.
// "MenuItem" - ochiluvchi ro'yxatning har bir varianti (masalan: "Toshkent", "Barcha shaharlar").
// "Select" - ochiluvchi qulay va chiroyli dropdown elementi.
import { FormControl, MenuItem, Select } from "@mui/material";

// =========================================================================================================
// 2-QADAM: ASOSIY KOMPONENT VA PROPS (KIRIB KELUVCHI MA'LUMOTLAR)
// =========================================================================================================
// "VakansiyalarPage" - platformaning eng asosiy ish qidirish, filtrlash va ariza topshirish sahifasi.
// Props tushuntirishi:
// 1. vakansiyalarRoyxati = [] -> Barcha mavjud vakansiyalar massivi (App.jsx dan keladi).
// 2. shaharlar = [] -> Saytdagi boshlang'ich shaharlar ro'yxati.
// 3. sohalar = [] -> Faoliyat yo'nalishlari (IT, Moliya, Savdo va h.k.).
// 4. bandlikTurlari = [] -> To'liq stavka, Masofaviy, Qisman bandlik kabi ish rejimlari.
// 5. maoshVariantlari = [] -> Maosh oralig'i filtri variantlari (id: 1..5).
// 6. savedjob = [] -> Saqlangan ishlar ro'yxati (xatcho'p qizil bo'lishini tekshirish uchun).
// 7. appliedJobs = [] -> Ariza topshirilgan ishlar ro'yxati (yashil "Ariza topshirildi" nishoni uchun).
// 8. handleToggleSave = () => {} -> Xatcho'p bosilganda saqlash/o'chirish pulti.
// 9. onOpenApplyModal = () => {} -> Ariza topshirish oynasini ochuvchi pult.
function VakansiyalarPage({
  vakansiyalarRoyxati = [],
  shaharlar = [],
  sohalar = [],
  bandlikTurlari = [],
  maoshVariantlari = [],
  savedjob = [],
  appliedJobs = [],
  handleToggleSave = () => {},
  onOpenApplyModal = () => {},
}) {
  // -------------------------------------------------------------------------------------------------------
  // 3-QADAM: STATE (FOYDALANUVCHI TANLOVLARI UCHUN XOTIRA MAYDONLARI)
  // -------------------------------------------------------------------------------------------------------

  // "searchterm" - Yuqoridagi qidiruv maydoniga yozilayotgan matn (lavozim yoki kompaniya nomi)
  const [searchterm, setsearchterm] = useState("");

  // "selectedCities" - Foydalanuvchi tanlagan shaharlar ro'yxati (massiv)
  const [selectedCities, setSelectedCities] = useState([]);

  // "selectedCategories" - Chap panelda tanlangan sohalar (kategoriyalar) ro'yxati
  const [selectedCategories, setSelectedCategories] = useState([]);

  // "selectedTypes" - Tanlangan bandlik turlari (To'liq stavka, Masofaviy va h.k.)
  const [selectedTypes, setSelectedTypes] = useState([]);

  // "selectedSalaryId" - Tanlangan maosh oralig'ining id raqami (1 = "Barchasi")
  const [selectedSalaryId, setSelectedSalaryId] = useState(1);

  // "appliedNotice" - "Filtrlarni qo'llash" tugmasi bosilganda pastda chiqadigan qisqa eslatma holati
  const [appliedNotice, setAppliedNotice] = useState(false);

  // -------------------------------------------------------------------------------------------------------
  // 4-QADAM: REAL STATISTIKA VA DINAMIK SANASH (USEMEMO MANTIQI)
  // -------------------------------------------------------------------------------------------------------

  // 1. SHAHARLAR BO'YICHA DINAMIK RO'YXAT VA REAL E'LONLAR SONINI HISOBLASH:
  // Bu yerda nafaqat standart shaharlar, balki foydalanuvchilar o'zlari qo'shgan yangi e'lonlardagi
  // yangi shaharlar ham avtomatik aniqlanadi va ularning har birida nechta e'lon borligi hisoblab chiqiladi.
  const dynamicCities = useMemo(() => {
    const baseNames =
      shaharlar.length > 0
        ? shaharlar.map((s) => s.name)
        : ["Toshkent", "Samarqand", "Farg‘ona", "Andijon", "Nukus"];

    // Set orqali takrorlanmaydigan barcha shahar nomlarini to'playmiz
    const allNames = Array.from(
      new Set([
        ...baseNames,
        ...vakansiyalarRoyxati.map((j) => j.city).filter(Boolean),
      ])
    );

    // Har bir shahar uchun ushbu shahardagi e'lonlar sonini hisoblaymiz:
    return allNames.map((cityName) => {
      const count = vakansiyalarRoyxati.filter(
        (j) => (j.city || "").toLowerCase() === cityName.toLowerCase()
      ).length;
      return { name: cityName, count };
    });
  }, [shaharlar, vakansiyalarRoyxati]);

  // Barcha mavjud shahar nomlari massivi (tekshirishlar uchun qulay)
  const allCityNames = useMemo(
    () => dynamicCities.map((c) => c.name),
    [dynamicCities],
  );

  // 2. SOHALAR (KATEGORIYALAR) BO'YICHA REAL E'LONLAR SONINI HISOBLASH:
  const dynamicCategories = useMemo(() => {
    const baseNames =
      sohalar.length > 0
        ? sohalar.map((s) => s.name)
        : [
            "IT va dasturlash",
            "Moliya va buxgalteriya",
            "Savdo",
            "Marketing",
            "Ta‘lim",
          ];

    const allNames = Array.from(
      new Set([
        ...baseNames,
        ...vakansiyalarRoyxati.map((j) => j.category).filter(Boolean),
      ])
    );

    return allNames.map((catName) => {
      const count = vakansiyalarRoyxati.filter(
        (j) => (j.category || "").toLowerCase() === catName.toLowerCase()
      ).length;
      return { name: catName, count };
    });
  }, [sohalar, vakansiyalarRoyxati]);

  // 3. BANDLIK TURLARI BO'YICHA REAL E'LONLAR SONINI HISOBLASH:
  const dynamicEmploymentTypes = useMemo(() => {
    const baseTypes =
      bandlikTurlari.length > 0
        ? bandlikTurlari.map((b) => b.name)
        : ["To‘liq stavka", "Masofaviy", "Qisman bandlik"];

    const allTypes = Array.from(
      new Set([
        ...baseTypes,
        ...vakansiyalarRoyxati
          .flatMap((j) => j.tags || [])
          .filter(Boolean),
      ])
    );

    return allTypes.map((typeName) => {
      const count = vakansiyalarRoyxati.filter((j) =>
        (j.tags || []).some(
          (t) => t.toLowerCase() === typeName.toLowerCase()
        )
      ).length;
      return { name: typeName, count };
    });
  }, [bandlikTurlari, vakansiyalarRoyxati]);

  // -------------------------------------------------------------------------------------------------------
  // 5-QADAM: BALANDLIKLARNI TENGLASHTIRISH (HEIGHT MATCHING & INTERNAL SCROLL)
  // Chap panel (filtrlar) bilan o'ng tomondagi kartalar qutisining balandligini bir xil qilish!
  // -------------------------------------------------------------------------------------------------------
  const filterAsideRef = useRef(null); // Chap tomondagi <aside> elementiga havola
  const [filterHeight, setFilterHeight] = useState(null); // Chap panelning pikseldagi balandligi

  useEffect(() => {
    // Balandlikni yangilash funksiyasi (faqat kompyuter ekranlarida - 768px dan katta bo'lganda)
    const updateHeight = () => {
      if (filterAsideRef.current && window.innerWidth >= 768) {
        setFilterHeight(filterAsideRef.current.offsetHeight);
      } else {
        setFilterHeight(null);
      }
    };

    updateHeight();

    // ResizeObserver - Agar chap panelning bo'yi kengaysa yoki qisqarsa, buni darhol sezadi
    let resizeObserver;
    if (filterAsideRef.current && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updateHeight();
      });
      resizeObserver.observe(filterAsideRef.current);
    }

    // Ekran o'lchami o'zgarganda (resize) ham balandlikni qayta hisoblaymiz
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [dynamicCities, dynamicCategories, dynamicEmploymentTypes]);

  // -------------------------------------------------------------------------------------------------------
  // 6-QADAM: FILTR BOSHQARUVI VA SINXRONIZATSIYA
  // -------------------------------------------------------------------------------------------------------

  // Hamma shaharlar belgilanganmi yoki yo'qligini tekshirish
  const isAllCitiesSelected =
    allCityNames.length > 0 &&
    allCityNames.every((city) => selectedCities.includes(city));

  // "Barcha shaharlar" checkboxi bosilganda:
  const handleToggleAllCities = () => {
    if (isAllCitiesSelected) {
      setSelectedCities([]); // Barchasini yechish
    } else {
      setSelectedCities([...allCityNames]); // Barcha shaharlarni belgilash
    }
  };

  // Bitta alohida shahar checkboxi bosilganda:
  const handleToggleSingleCity = (cityName) => {
    setSelectedCities((prev) =>
      prev.includes(cityName)
        ? prev.filter((item) => item !== cityName)
        : [...prev, cityName],
    );
  };

  // MUI Select qiymatini hisoblash: Agar hamma shahar tanlangan bo'lsa yoki bo'sh bo'lsa "Barcha shaharlar" chiqadi
  const selectValue = useMemo(() => {
    if (isAllCitiesSelected || selectedCities.length === 0) return "Barcha shaharlar";
    if (selectedCities.length === 1) return selectedCities[0];
    return "Barcha shaharlar";
  }, [isAllCitiesSelected, selectedCities]);

  // MUI Select dan shahar tanlanganda chap tarafdagi checkboxlar bilan sinxronlash:
  const handleSelectCityChange = (val) => {
    if (val === "Barcha shaharlar" || val === "Barcha shahlar") {
      setSelectedCities([...allCityNames]);
    } else {
      setSelectedCities([val]);
    }
  };

  // Massivga element qo'shish yoki olib tashlash uchun universal funksiya (toggle)
  const toggleArrayItem = (value, setter) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  // Barcha filtrlarni boshlang'ich holatiga qaytarish (tozalash)
  const handleResetFilters = () => {
    setsearchterm("");
    setSelectedCities([]);
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedSalaryId(1);
    setAppliedNotice(false);
  };

  // Maosh oralig'iga mos kelishini tekshiruvchi funksiya
  const matchesSalaryOption = (job, salaryId) => {
    const id = Number(salaryId);
    if (!id || id === 1) return true; // 1 = "Barchasi"

    const maxSal = Number(job.salaryMax);
    if (Number.isNaN(maxSal)) return true;

    if (id === 2) return maxSal >= 2; // 2 mln dan yuqori
    if (id === 3) return maxSal >= 2 && maxSal <= 5; // 2 dan 5 mln gacha
    if (id === 4) return maxSal > 5 && maxSal <= 10; // 5 dan 10 mln gacha
    if (id === 5) return maxSal > 10; // 10 mln dan yuqori

    return true;
  };

  // -------------------------------------------------------------------------------------------------------
  // 7-QADAM: ISHLARNI ELAKDAN O'TKAZISH (MULTI-FILTER YURAGI - USEMEMO)
  // -------------------------------------------------------------------------------------------------------
  const filterJobs = useMemo(() => {
    const query = searchterm.trim().toLowerCase();

    return vakansiyalarRoyxati.filter((job) => {
      // 1. Qidiruv so'zi bo'yicha tekshirish (kasb nomi yoki kompaniya nomida bormi?)
      const matchesSearch =
        !query ||
        (job.title || "").toLowerCase().includes(query) ||
        (job.company || "").toLowerCase().includes(query);

      // 2. Shahar filtri bo'yicha tekshirish
      const matchesCity =
        selectedCities.length === 0 ||
        isAllCitiesSelected ||
        selectedCities.includes(job.city);

      // 3. Faoliyat sohasi bo'yicha tekshirish
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(job.category);

      // 4. Bandlik turi (teglar) bo'yicha tekshirish
      const matchesEmployment =
        selectedTypes.length === 0 ||
        selectedTypes.some((type) => (job.tags || []).includes(type));

      // 5. Maosh miqdori bo'yicha tekshirish
      const matchesSalary = matchesSalaryOption(job, selectedSalaryId);

      // Barcha 5 ta shart bir vaqtda to'g'ri (true) bo'lsagina vakansiya ekranda qoladi!
      return (
        matchesSearch &&
        matchesCity &&
        matchesCategory &&
        matchesEmployment &&
        matchesSalary
      );
    });
  }, [
    searchterm,
    selectedCities,
    isAllCitiesSelected,
    selectedCategories,
    selectedTypes,
    selectedSalaryId,
    vakansiyalarRoyxati,
  ]);

  // =======================================================================================================
  // 8-QADAM: JSX RETURN (VIZUAL INTERFEYS VA DIZAYN)
  // =======================================================================================================

  return (
    <>
      {/* ------------------------------------------------------------------------------------------------- */}
      {/* A BO'LIM: YUQORI QIDIRUV PANELI */}
      {/* ------------------------------------------------------------------------------------------------- */}
      <section className="bg-[#f7f7f7] py-[20px]">
        <div className="max-w-7xl mx-auto px-[16px] xl:px-0">
          <form
            onSubmit={(e) => e.preventDefault()} // Enter bosilganda sahifa yangilanmasligi uchun
            className="flex flex-col md:flex-row gap-[12px] items-stretch md:items-center"
          >
            {/* 1. Qidiruv inputi qutisi */}
            <div className="relative flex-[2]">
              {/* Lupa ikonchasi */}
              <svg
                className="w-[16px] h-[16px] shrink-0 absolute left-[12px] top-1/2 -translate-y-1/2 text-[#999]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.5 3C16.1944 3 20 6.80558 20 11.5C20 13.523 19.2933 15.381 18.1132 16.8404L21.1364 19.8636C21.4879 20.2151 21.4879 20.7849 21.1364 21.1364C20.7849 21.4879 20.2151 21.4879 19.8636 21.1364L16.8404 18.1132C15.381 19.2933 13.523 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3ZM11.5 18.2C15.2003 18.2 18.2 15.2003 18.2 11.5C18.2 7.79969 15.2003 4.8 11.5 4.8C7.79969 4.8 4.8 7.79969 4.8 11.5C4.8 15.2003 7.79969 18.2 11.5 18.2Z" />
              </svg>

              <input
                value={searchterm}
                onChange={(e) => setsearchterm(e.target.value)}
                className="border border-[#d9d9d9] rounded-[8px] py-[9px] pr-[12px] pl-[36px] text-[14px] bg-white text-[#1a1a1a] w-full focus:outline-2 focus:outline-[#1a1a1a] focus:-outline-offset-1"
                placeholder="Lavozim yoki kompaniya"
              />
            </div>

            {/* 2. SHAHARLARNI TANLASH UCHUN MUI SELECT */}
            <FormControl className="flex-1 w-full" size="small">
              <Select
                value={selectValue}
                onChange={(e) => handleSelectCityChange(e.target.value)}
                displayEmpty
                MenuProps={{
                  disableScrollLock: true, // Ekran yonidagi skroll yo'qolib sayt qimirlab ketmasligi uchun!
                  PaperProps: {
                    sx: {
                      maxHeight: 200, // Aynan 5 ta option sig'adigan balandlik (~200px), qolganlari ichki scroll bo'ladi
                      borderRadius: "8px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                      "& .MuiMenuItem-root": {
                        fontSize: "14px",
                        minHeight: "38px",
                      },
                    },
                  },
                }}
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  fontSize: "14px",
                  color: "#1a1a1a",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#d9d9d9",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1a1a1a",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1a1a1a",
                    borderWidth: "1.5px",
                  },
                  "& .MuiSelect-select": {
                    paddingTop: "8.5px",
                    paddingBottom: "8.5px",
                  },
                }}
              >
                <MenuItem value="Barcha shaharlar">Barcha shaharlar</MenuItem>
                {allCityNames.map((cityName) => (
                  <MenuItem key={cityName} value={cityName}>
                    {cityName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Qidiruv tugmasi */}
            <button
              type="submit"
              className="border border-[#1a1a1a] bg-[#1a1a1a] hover:bg-black text-white rounded-[8px] py-[9px] px-[28px] text-[14px] cursor-pointer whitespace-nowrap"
            >
              Qidiruv
            </button>
          </form>
        </div>
      </section>

      {/* ------------------------------------------------------------------------------------------------- */}
      {/* B BO'LIM: ASOSIY MAYDON (CHAP PANEL FILTRLAR VA O'NG TOMON KARTALAR) */}
      {/* ------------------------------------------------------------------------------------------------- */}
      <div className="max-w-[1280px] mx-auto px-[16px] xl:px-0 flex flex-col md:flex-row gap-[24px] py-[24px] items-start">
        
        {/* ----------------------------------------------------------------------------------------------- */}
        {/* 1. CHAP YON PANEL: FILTRLAR (ASIDE) */}
        {/* ----------------------------------------------------------------------------------------------- */}
        <aside
          ref={filterAsideRef} // Balandligini o'lchash uchun ref bog'langan
          className="w-full md:w-[264px] shrink-0 border border-[#e5e5e5] rounded-[10px] py-[16px] px-[20px] bg-white shadow-xs"
        >
          {/* Filtrlar sarlavhasi va tozalash tugmasi */}
          <div className="flex justify-between items-center mb-[4px]">
            <span className="text-[15px] font-medium">Filtrlar</span>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-[12px] text-[#555] bg-transparent border-none cursor-pointer underline hover:text-black transition"
            >
              tozalash
            </button>
          </div>

          {/* 1. SHAHARLAR BO'LIMI VA REAL HISOB-KITOB */}
          <div className="text-[12px] text-[#999] mt-[16px] mb-[4px] font-medium">
            Shahar
          </div>

          {/* Barcha shaharlar checkboxi va umumiy e'lonlar soni */}
          <label className="flex items-center gap-[8px] text-[14px] text-[#555] py-[5px] cursor-pointer">
            <input
              type="checkbox"
              checked={isAllCitiesSelected}
              onChange={handleToggleAllCities}
              className="accent-[#1a1a1a] w-[15px] h-[15px]"
            />
            Barcha shaharlar
            <span className="ml-auto text-[12px] text-[#999]">
              {vakansiyalarRoyxati.length}
            </span>
          </label>

          {/* Shaharlar kesimida e'lonlar soni */}
          {dynamicCities.map((item) => (
            <label
              key={item.name}
              className="flex items-center gap-[8px] text-[14px] text-[#555] py-[5px] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCities.includes(item.name)}
                onChange={() => handleToggleSingleCity(item.name)}
                className="accent-[#1a1a1a] w-[15px] h-[15px]"
              />
              {item.name}
              <span className="ml-auto text-[12px] text-[#999]">
                {item.count}
              </span>
            </label>
          ))}

          {/* 2. SOHALAR (KATEGORIYALAR) KESIMIDA E'LONLAR SONI */}
          <div className="text-[12px] text-[#999] mt-[16px] mb-[4px] font-medium">
            Soha
          </div>
          {dynamicCategories.map((item) => (
            <label
              key={item.name}
              className="flex items-center gap-[8px] text-[14px] text-[#555] py-[5px] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(item.name)}
                onChange={() =>
                  toggleArrayItem(item.name, setSelectedCategories)
                }
                className="accent-[#1a1a1a] w-[15px] h-[15px]"
              />
              {item.name}
              <span className="ml-auto text-[12px] text-[#999]">
                {item.count}
              </span>
            </label>
          ))}

          {/* 3. BANDLIK TURI KESIMIDA E'LONLAR SONI */}
          <div className="text-[12px] text-[#999] mt-[16px] mb-[4px] font-medium">
            Bandlik turi
          </div>
          {dynamicEmploymentTypes.map((item) => (
            <label
              key={item.name}
              className="flex items-center gap-[8px] text-[14px] text-[#555] py-[5px] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(item.name)}
                onChange={() => toggleArrayItem(item.name, setSelectedTypes)}
                className="accent-[#1a1a1a] w-[15px] h-[15px]"
              />
              {item.name}
              <span className="ml-auto text-[12px] text-[#999]">
                {item.count}
              </span>
            </label>
          ))}

          {/* 4. MAOSH ORALIG'I (RADIO TUGMALAR) */}
          <div className="text-[12px] text-[#999] mt-[16px] mb-[4px] font-medium">
            Maosh (oyiga)
          </div>
          {maoshVariantlari.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-[8px] text-[14px] text-[#555] py-[5px] cursor-pointer"
            >
              <input
                type="radio"
                name="sal"
                checked={Number(selectedSalaryId) === Number(opt.id)}
                onChange={() => setSelectedSalaryId(opt.id)}
                className="accent-[#1a1a1a] w-[15px] h-[15px]"
              />
              {opt.label}
            </label>
          ))}

          {/* Filtrlarni qo'llash tugmasi */}
          <div className="mt-[20px]">
            <button
              type="button"
              onClick={() => setAppliedNotice(true)}
              className="border border-[#d9d9d9] bg-white hover:bg-[#fafafa] text-[#1a1a1a] rounded-[8px] px-[16px] py-[8px] text-[14px] cursor-pointer w-full transition"
            >
              Filtrlarni qo'llash
            </button>
            {appliedNotice && (
              <p className="text-[11px] text-[#666] mt-[6px] text-center">
                Filtrlar avtomatik qo‘llanmoqda
              </p>
            )}
          </div>
        </aside>

        {/* ----------------------------------------------------------------------------------------------- */}
        {/* 2. O'NG TOMON: VAKANSIYALAR RO'YXATI (BALANDLIGI CHAP PANEL BILAN TENG) */}
        {/* ----------------------------------------------------------------------------------------------- */}
        <main
          // Balandlikni to'g'ridan-to'g'ri chap panel height-iga tenglashtiramiz
          style={filterHeight ? { height: `${filterHeight}px` } : undefined}
          className="flex-1 min-w-0 flex flex-col"
        >
          {/* Topilgan vakansiyalar soni satri */}
          <div className="mb-[12px] shrink-0 flex items-center justify-between text-[14px]">
            <span className="font-medium text-[#1a1a1a]">
              {filterJobs.length} ta vakansiya topildi
            </span>
          </div>

          {/* Kartalar ro'yxati (ichki skroll maydoni) */}
          <div
            className="flex-1 overflow-y-auto pr-2 space-y-[12px]"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#d1d5db transparent",
            }}
          >
            {filterJobs.length > 0 ? (
              filterJobs.map((job, i) => {
                // Ushbu ish saqlanganlar ro'yxatida bormi?
                const saqlanganmi = savedjob.some((item) => item.id === job.id);
                // Ushbu ishga ariza topshirilganmi?
                const topshirilganmi = appliedJobs.some(
                  (item) => item.id === job.id,
                );

                return (
                  // Bitta vakansiya kartochkasi
                  <div
                    key={job.id ?? i}
                    className="group border border-[#e5e5e5] hover:border-[#1a1a1a] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] rounded-[12px] py-[18px] px-[22px] bg-white transition-all duration-200 flex gap-[16px] items-start cursor-pointer"
                  >
                    {/* Kompaniya bosh harfi logotipi */}
                    <div className="w-[50px] h-[50px] rounded-[12px] bg-[#f4f4f5] group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors duration-200 flex items-center justify-center text-[18px] font-semibold text-[#3f3f46] shrink-0">
                      {job.letter}
                    </div>

                    {/* Vakansiya ma'lumotlari */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-[6px]">
                        <h3 className="capitalize text-[16px] font-semibold text-[#1a1a1a] group-hover:underline decoration-[#1a1a1a]/40 underline-offset-4 truncate">
                          {job.title}
                        </h3>
                        {/* Oylik maosh nishoni */}
                        <div className="text-[15px] font-semibold text-[#1a1a1a] whitespace-nowrap bg-[#f9fafb] border border-[#ececec] px-[10px] py-[3px] rounded-[8px]">
                          {job.salaryText}{" "}
                          <span className="font-normal text-[12px] text-[#777]">
                            so'm/oy
                          </span>
                        </div>
                      </div>

                      {/* Kompaniya nomi */}
                      <p className="capitalize text-[13px] text-[#666] mt-[4px]">
                        {job.company}
                      </p>

                      {/* Shahar, vaqt va teglar */}
                      <div className="flex flex-wrap gap-[12px] items-center mt-[12px] text-[12px] text-[#777]">
                        <span className="inline-flex gap-[5px] items-center text-[#444] font-medium">
                          <svg
                            className="w-[14px] h-[14px] shrink-0 text-[#666]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2C8.13 2 5 5.13 5 8.5C5 13.25 12 22 12 22C12 22 19 13.25 19 8.5C19 5.13 15.87 2 12 2ZM12 11C10.62 11 9.5 9.88 9.5 8.5C9.5 7.12 10.62 6 12 6C13.38 6 14.5 7.12 14.5 8.5C14.5 9.88 13.38 11 12 11Z" />
                          </svg>
                          {job.city}
                        </span>

                        <span className="text-[#999]">•</span>
                        <span>{job.time}</span>

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

                    {/* O'ng tomondagi tugmalar: Ariza topshirish va Xatcho'p (Bookmark) */}
                    <div className="flex items-center gap-[8px] shrink-0">
                      
                      {/* ARIZA TOPSHIRISH TUGMASI */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation(); // Kartaning o'zi bosilib ketmasligi uchun hodisani to'xtatamiz
                          onOpenApplyModal(job); // Ariza topshirish oynasini ochamiz
                        }}
                        className={`border rounded-[8px] px-[14px] py-[7px] text-[13px] font-medium cursor-pointer transition-colors duration-150 whitespace-nowrap ${
                          topshirilganmi
                            ? "border-[#b7eb8f] bg-[#f6ffed] text-[#237804]" // Ariza topshirilgan: yashil
                            : "border-[#1a1a1a] bg-[#1a1a1a] hover:bg-black text-white" // Standart qora tugma
                        }`}
                      >
                        {topshirilganmi
                          ? "Ariza topshirildi"
                          : "Ariza topshirish"}
                      </button>

                      {/* SAQLASH (XATCHO'P / BOOKMARK) TUGMASI */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSave(job); // Saqlanganlarga qo'shish yoki olib tashlash
                        }}
                        className={`cursor-pointer p-[8px] rounded-[8px] border border-transparent bg-transparent hover:bg-[#f5f5f5] transition-colors duration-150 shrink-0 ${
                          saqlanganmi
                            ? "text-[#d4380d]" // Saqlangan bo'lsa: qizil rang
                            : "text-[#999] hover:text-[#1a1a1a]" // Saqlanmagan: och kulrang
                        }`}
                        title={
                          saqlanganmi ? "Saqlanganlardan o‘chirish" : "Saqlash"
                        }
                      >
                        <svg
                          className="w-[18px] h-[18px] shrink-0"
                          viewBox="0 0 24 24"
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
              // Agar hech qanday vakansiya topilmasa:
              <div className="border border-[#e5e5e5] rounded-[12px] py-[32px] px-[20px] bg-white text-center text-[14px] text-[#666] shadow-xs">
                Tanlangan filtrlar bo‘yicha mos vakansiya topilmadi.
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

// =========================================================================================================
// 2-QISM: ULTRA SLOW-MOTION (VOQEALAR SEKINLASHTIRILGAN KADRDA)
// =========================================================================================================
// 1. Foydalanuvchi "Barcha shaharlar" checkboxini bosadi:
//    - handleToggleAllCities chaqiriladi.
//    - Agar avval barcha shaharlar tanlanmagan bo'lsa, allCityNames massividagi hamma shaharlar
//      selectedCities ga joylashtiriladi.
//    - dynamicCities hisoblagichlari barcha shaharlardagi vakansiyalarni ko'rsatadi.
//    - Yuqoridagi MUI Select oynasida avtomatik "Barcha shaharlar" yozuvi paydo bo'ladi.
//
// 2. Foydalanuvchi chap panelda "Samarqand" checkboxini belgilaydi:
//    - handleToggleSingleCity("Samarqand") ishlaydi.
//    - selectedCities ro'yxatida faqat ["Samarqand"] qoladi.
//    - MUI Select bu holatni sezib, o'zining ko'rinishida ham "Samarqand" so'zini aks ettiradi.
//    - filterJobs useMemo hooki zudlik bilan ishga tushib, faqat Samarqanddagi vakansiyalarni qoldiradi!
//
// 3. Foydalanuvchi kartochkadagi xatcho'p (bookmark) belgisini bosadi:
//    - e.stopPropagation() chaqirilib, bosish to'lqini kartochkaga o'tishining oldi olinadi.
//    - handleToggleSave(job) chaqiriladi va App.jsx dagi savedjob massivi yangilanadi.
//    - Kartadagi xatcho'p ikonkasining fill parametri darhol qizil bo'lib to'ladi va Navbar-dagi "Saqlanganlar"
//      hisoblagichi 1 taga oshadi!

// =========================================================================================================
// 3-QISM: DASTURCHI TAFEKKURI VA NEGA AYNAN SHUNDAY YOZILGAN?
// =========================================================================================================
// 1. Nega ResizeObserver va filterAsideRef orqali balandlik tenglashtirildi?
//    - Foydalanuvchi talabiga binoan, o'ng tomondagi kartalar bloki chap tomondagi filtrlar bloki balandligi
//      bilan teng bo'lishi va sig'may qolgan kartalar ichki skroll bo'lishi kerak edi.
//      ResizeObserver filtrlar bloki dinamik ravishda kengayganda ham, balandlikni doim aniq ushlab turadi.
// 2. Nega dynamicCities, dynamicCategories va dynamicEmploymentTypes useMemo bilan sanaldi?
//    - Chunki foydalanuvchilar "E'lon joylash" orqali yangi shaharlar yoki yangi teglar qo'shishi mumkin.
//      Statik sonlar yozib qo'yilsa yangi e'lonlar hisobga kirmay qolardi. Bu dinamik hisoblagich esa
//      har bir shahar yoki sohada ayni damda nechta faol e'lon borligini 100% aniqlik bilan hisoblab beradi.
// 3. Nega MUI Select ga disableScrollLock: true qo'yildi?
//    - Material-UI Select ochilganda brauzer oynasining o'ng tomonidagi skroll yo'qolib, butun sayt ekrani
//      chapga-o'ngga siljib (qimirlab) ketardi. disableScrollLock bu noqulaylikni to'liq bartaraf etdi!

export default VakansiyalarPage;
