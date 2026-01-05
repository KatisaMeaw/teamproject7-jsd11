export default function Browse() {
  return (
    <>
      <div className="p-10 md:p-20 flex flex-col justify-center items- text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#447F98]">
          Browse The Range
        </h1>
        <p className="text-[#629BB5] text-sm md:text-lg mt-3">
          We offer a full spectrum of solutions to transform your workspace and
          promote lasting health and productivity.
        </p>
      </div>

      {/* ----------------------------------mobile 📱 ---------------------------------- */}

      <div
        id="controls-carousel" className="relative w-full flex md:hidden gap-4 " data-carousel="static" 
      >
        <div className="relative h-fit rounded-xl ">

          {/* Item 1: Chair (เอา hidden ออกถ้าเป็นตัวแรก หรือให้ Library จัดการ) */}
          <div className="flex-none duration-700 ease-in-out flex flex-col items-center" data-carousel-item>
            <img
              src="./img-prod/Blue Gaming Chair - Pastel Series.jpeg"
              alt="Ergonomic Chair"
              className="rounded-xl block w-[250px] h-[300px] object-cover cursor-pointer hover:-translate-y-3 transition duration-300 hover:shadow-xl"
            />
            <span className="inline-block text-xl mt-8 text-[#447F98] font-bold cursor-pointer">
            Ergonomic Chair
          </span>
          </div>
        </div>

        {/* Item 2: Table */}
        <div className="flex-none duration-700 ease-in-out flex flex-col items-center">
          <div>
            <img
              src="./img-prod/White gaming setup inspiration _ Secretlab.jpeg"
              alt="Table"
              className="rounded-xl block w-[250px] h-[300px] object-cover cursor-pointer hover:-translate-y-3 transition duration-300 hover:shadow-xl"
            />
          </div>
          <span className="inline-block mt-8 text-xl  text-[#447F98] font-bold cursor-pointer ">
            Table
          </span>
        </div>

        {/* Item 3: Accessories */}
        <div className="flex-none duration-700 ease-in-out flex flex-col items-center text-center">
          <div>
            <img
              src="./img-prod/Desk Ideas for the Perfect Home Office Setup.jpeg"
              alt="Accessories"
              className="rounded-xl block w-[250px] h-[300px] object-cover cursor-pointer hover:-translate-y-3 transition duration-300 hover:shadow-xl"
            />
          <span className="text-xl inline-block mt-8 text-[#447F98] font-bold cursor-pointer"
            >Accessories
          </span>
          </div>
        </div>

        {/* 2. ปุ่ม Buttons < > */}
        <button type="button" className="absolute top-42 transform -translate-y-1/2 start-0 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#447F98] group-hover:bg-[#31647a] shadow-lg">
                <svg className="w-5 h-5 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/></svg>
            </span>
        </button>

        <button type="button" className="absolute top-42 transform -translate-y-1/2 end-0 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none" data-carousel-next>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#447F98] group-hover:bg-[#31647a] shadow-lg">
                <svg className="w-5 h-5 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg>
            </span>
        </button>

      </div>

      {/* ----------------------------------Desktop 💻---------------------------------- */}

      <div className="flex-row justify-center items-start gap-8 mb-10 hidden md:flex ">
        <div className="flex flex-col items-center">
          <div>
            <img
              src="./img-prod/Blue Gaming Chair - Pastel Series.jpeg"
              alt="Ergonomic Chair"
              className="rounded-xl w-[350px] h-[400px] cursor-pointer hover:-translate-y-3 transition duration-300 hover:shadow-xl"
            />
          </div>
          <span className="text-xl mt-8 text-[#447F98] font-bold cursor-pointer">
            Ergonomic Chair
          </span>
        </div>

        <div className="flex flex-col items-center ">
          <div>
            <img
              src="./img-prod/White gaming setup inspiration _ Secretlab.jpeg"
              alt="Table"
              className="rounded-xl w-[350px] h-[400px] cursor-pointer hover:-translate-y-3 transition duration-300 hover:shadow-xl"
            />
          </div>
          <span className="text-xl mt-8 text-[#447F98] font-bold cursor-pointer">
            Table
          </span>
        </div>

        <div className="flex flex-col items-center ">
          <div>
            <img
              src="./img-prod/Desk Ideas for the Perfect Home Office Setup.jpeg"
              alt="Accessories"
              className="rounded-xl w-[350px] h-[400px] cursor-pointer hover:-translate-y-3 transition duration-300 hover:shadow-xl"
            />
          </div>
          <span className="text-xl mt-8 text-[#447F98] font-bold cursor-pointer"
            >Accessories
          </span>
        </div>
      </div>
    </>
  );
}
