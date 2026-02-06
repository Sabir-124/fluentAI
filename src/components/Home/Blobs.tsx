const Blobs = () => {
  return (
    <>
      <div
        className="fixed w-125 h-125 -top-50 -left-50 
    bg-[#6C47FF] rounded-full blur-[100px] opacity-40 
    animate-float -z-10"
      ></div>

      <div
        className="fixed w-100 h-100 top-1/2 -right-37.5 
    bg-[#FF6B9D] rounded-full blur-[100px] opacity-40 
    animate-float-delayed -z-10"
      ></div>

      <div
        className="fixed w-87.5 h-87.5 -bottom-25 left-[30%] 
    bg-[#00D9C0] rounded-full blur-[100px] opacity-40 
    animate-float-delayed-more -z-10"
      ></div>
    </>
  );
};

export default Blobs;
