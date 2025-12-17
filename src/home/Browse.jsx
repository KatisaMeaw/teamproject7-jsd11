export default function Browse() {
  return (
    <>
      <div className="p-20 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-[#447F98]">Browse The Range</h1>
        <p className="text-[#629BB5] text-lg mt-3">
          We offer a full spectrum of solutions to transform your workspace and promote lasting health and productivity.
        </p>
      </div>

      <div className="flex flex-row justify-center items-start gap-8 mb-10">
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

        <div className="flex flex-col items-center">
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
  )
};