"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Marquee, Card } from "@/components";
import { whatwedoCircleImg } from "@/public";

export default function Whatwedo() {
  return (
    <div
      id="what-we-do"
      className="w-full py-20 bg-[#070606] relative"
    >
      <motion.div
        animate={{ rotate: [-360, 360] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        }}
        className="flex items-center absolute -top-14 right-40"
      >
        <Image
          src={whatwedoCircleImg}
          alt="heroCircleImg"
          width={120}
          height={120}
        />
      </motion.div>
      
      <Marquee
        className="text-[#FFFFFF]"
        titile1="What we do"
        titile2="What we do"
      />
      
      <div className="w-full flex items-center justify-center">
        <div className="w-[80%] xm:w-full sm:w-full xm:padding-x sm:padding-x">
          <p
            className="text-[22px] text-[#FFFFFF] leading-tight tracking-tight"
            dangerouslySetInnerHTML={{ __html: 
                "Together, we approach your needs through four core service pillars: Home Services,<br /> Professional Support, Repair & Maintenance, and Lifestyle Solutions. We help individuals<br /> and businesses access reliable services that improve everyday life—conveniently and affordably."
            }}
          />
        </div>
      </div>
      
      <div className="w-full padding-x py-20 px-20 xm:py-10 sm:py-10">
        <Card />
      </div>
    </div>
  );
}