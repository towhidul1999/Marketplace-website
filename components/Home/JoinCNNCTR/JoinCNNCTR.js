import Image from "next/image";
const JoinCNNCTR = () => {
  return (
    <div className="bg-secondary h-[200px] md:h-[500px]">
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] md:text-[40px] font-bold">
              Freelance Services Just a Click Away!
            </h1>
            <button className=" mt-5 justify-center items-center mx-auto cursor-pointer ring-1 ring-primary  py-1 px-5 rounded text-center text-white hover:bg-transparent bg-primary hover:text-primary transition duration-300">
              Join CNNCTR
            </button>
          </div>
          <div>
            <Image
              width={3840}
              height={2880}
              className="w-[300px] md:w-[500px] h-[200px]  md:h-[500px]"
              src={
                "https://i.ibb.co/w4wP1Sv/ad6b113d2ad01a6f28c9eea4961de60d.png"
              }
              alt="Join CNNCTR"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinCNNCTR;
