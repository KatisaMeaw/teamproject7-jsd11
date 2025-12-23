export default function SubNavbar() {
  return (
    <div className="w-full font-sans">
            {/* (style={{ backgroundImage: ... }}  */}
      <div className="relative w-full h-[300px] bg-gray-200 flex flex-col justify-center items-center">

        {/* <img src="" className="absolute inset-0 w-full h-full object-cover blur-[2px]" /> */}

        <div className="z-10 flex flex-col items-center gap-2">
            <h1 className="text-5xl font-medium text-black">Shop</h1>

            <div className="flex items-center gap-2 text-base font-medium text-black">
                <span className="font-bold">Home</span>

                              <span className="text-xl">&gt;</span> 

                <span className="font-light">Shop</span>
            </div>
        </div>
      </div>
</div>
  );
}