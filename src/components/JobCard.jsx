import React from 'react';

function JobCard({ job, isSaved, onToggleSave, onClick }) {
  // Kartochka bosilganda ariza oynasini ochish
  function kartochkaBosildi(e) {
    e.preventDefault();
    onClick();
  }

  // Saqlash tugmasi bosilganda
  function saqlashBosildi(e) {
    e.preventDefault();
    e.stopPropagation(); // Kartochka ochilib ketmasligi uchun
    onToggleSave();
  }

  return (
    <a
      href="#vakansiya"
      onClick={kartochkaBosildi}
      className="border border-[#e5e5e5] hover:border-[#bbb] rounded-[10px] py-[16px] px-[20px] bg-white transition-colors duration-150 flex gap-[16px] items-start mb-[12px] no-underline text-inherit"
    >
      {/* Kompaniya bosh harfi */}
      <div className="w-[48px] h-[48px] rounded-[10px] bg-[#f2f2f2] flex items-center justify-center text-[18px] font-medium text-[#555] shrink-0">
        {job.letter}
      </div>

      {/* Asosiy ma'lumotlar */}
      <div className="flex-1">
        <div className="flex justify-between gap-[12px]">
          <div className="text-[16px] font-medium">{job.title}</div>
          <div className="text-[15px] font-medium whitespace-nowrap">
            {job.salaryText}{' '}
            <span className="font-normal text-[12px] text-[#999]">so'm/oy</span>
          </div>
        </div>

        <div className="text-[13px] text-[#777] mt-[2px]">{job.company}</div>

        {/* Shahar, vaqt va teglar */}
        <div className="flex gap-[14px] items-center mt-[8px] text-[12px] text-[#999]">
          <span className="inline-flex gap-[4px] items-center text-[#555]">
            <svg
              className="w-[14px] h-[14px] shrink-0"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C8.13 2 5 5.13 5 8.5C5 13.25 12 22 12 22C12 22 19 13.25 19 8.5C19 5.13 15.87 2 12 2ZM12 11C10.62 11 9.5 9.88 9.5 8.5C9.5 7.12 10.62 6 12 6C13.38 6 14.5 7.12 14.5 8.5C14.5 9.88 13.38 11 12 11Z" />
            </svg>
            {job.city}
          </span>

          <span>{job.time}</span>

          {job.tags.map((tag) => (
            <span
              key={tag}
              className="py-[2px] px-[8px] rounded-[6px] text-[12px] bg-[#f2f2f2] text-[#555]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Saqlash tugmasi */}
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
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={isSaved ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M11.1504 16.9189C11.6853 16.6515 12.3147 16.6515 12.8496 16.9189L17.9551 19.4717C18.0216 19.5049 18.0996 19.4562 18.0996 19.3818V5C18.0996 4.94477 18.0552 4.90039 18 4.90039H6C5.94477 4.90039 5.90039 4.94477 5.90039 5V19.3818C5.90039 19.4562 5.97843 19.5049 6.04492 19.4717L11.1504 16.9189Z" />
        </svg>
      </button>
    </a>
  );
}

export default JobCard;
