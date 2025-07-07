"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useTransform, motion, useScroll } from "framer-motion";
import {
  whatwedoImg1,
  whatwedoImg2,
  whatwedoImg3,
  whatwedoImg4,
} from "@/public";

export default function Card() {
  const container1 = useRef(null);
  const container2 = useRef(null);
  const container3 = useRef(null);
  const container4 = useRef(null);

  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: container1,
    offset: ["start end", "start start"],
  });

  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: container2,
    offset: ["start end", "start start"],
  });

  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: container3,
    offset: ["start end", "start start"],
  });

  const { scrollYProgress: scrollYProgress4 } = useScroll({
    target: container4,
    offset: ["start end", "start start"],
  });

  const imageScale1 = useTransform(scrollYProgress1, [0, 1], [0.7, 1]);
  const imageScale2 = useTransform(scrollYProgress2, [0, 1], [0.7, 1]);
  const imageScale3 = useTransform(scrollYProgress3, [0, 1], [0.7, 1]);
  const imageScale4 = useTransform(scrollYProgress4, [0, 1], [0.7, 1]);

  // Direct content replacement
  const content = {
    whatwedoHeading: "Together we will look at your organization through four lenses of expertise: Home Services, Professional Support, Repairs & Maintenance, and Lifestyle Solutions. We help individuals and businesses access reliable services that improve everyday life—conveniently and affordably.",
  
    // Step 1 - Post Work
    title1: "Post what you need done",
        heading1: "Post your",
    heading2: "Work",
    para1: "Easily describe what you need help with, like “Need someone to repair my AC, issue with compressor.” Just type your requirement in simple words and post it. No complicated forms or phone calls — it only takes a few seconds.",
    href1: "Post your requirement",
    bgColor1: "#260A2F",
    textColor1: "#FFD7EF",
    linkColor1: "#FFC091",
  
    // Step 2 - Track Work
    title2: "Track the progress of your work",
    heading3: "Track status",
    heading4: "of work",
    para2: "Once your work is posted, you can monitor its status in real time. View which professionals have applied, compare their prices, estimated time, and responses — all through a clean and simple dashboard.",
    href2: "View your dashboard",
    bgColor2: "#9FE870",
    textColor2: "#260A2F",
    linkColor2: "#260A2F",
  
    // Step 3 - Choose Professionals
    title3: "Choose the right professional for the job",
    heading5: "Choose the best",
    heading6: "professionals",
    para3: "Compare each professional based on their specialization, price quotes, reviews, experience, and ratings. Make an informed decision by choosing the one that perfectly matches your needs and budget.",
    href3: "View applied professionals",
    bgColor3: "#163300",
    textColor3: "#9BE36D",
    linkColor3: "#FFC091",
  
    // Step 4 - Track Location
    title4: "Track your professional’s live location",
    heading7: "Track",
    heading8: "Location",
    para4: "Know exactly when and where your assigned professional is. Track their live location, check estimated arrival time, and coordinate date and time as per your convenience — all within the app.",
    href4: "Live track now",
    bgColor4: "#320707",
    textColor4: "#FFD7EF",
    linkColor4: "#FFC091"
  };
  

  return (
    <>
      <div
        ref={container1}
        className="h-auto flex items-center justify-center sticky top-40 w-full xm:top-[10%] sm:top-[10%]">
        <motion.div
          style={{
            backgroundColor: content.bgColor1,
            top: `calc(-5vh + ${1 * 25}px)`,
          }}
          className="w-full p-20 xm:p-7 sm:p-7 flex justify-between rounded-[30px] gap-10 relative -top-[45%] h-[800px] transform origin-top xm:flex-col sm:flex-col">
          <div className="w-1/2 xm:w-full sm:w-full h-full flex flex-col gap-14 pt-10 xm:pt-5 sm:pt-5 xm:gap-5 sm:gap-5">
            <div className="flex flex-col gap-2">
              <h4
                className="text-[24px] xm:text-lg sm:text-lg leading-tight tracking-tighter"
                style={{ color: content.textColor1 }}>
                {content.title1}
              </h4>
              <h2
                className="text-[80px] xm:text-[40px] sm:text-[40px] xm:leading-none sm:leading-none font-bold leading-[80px] tracking-tighter"
                style={{ color: content.textColor1 }}>
                {content.heading1}
                <br />
                {content.heading2}
              </h2>
              <h4
                className="text-[20px] sm:text-lg xm:text-lg leading-normal tracking-tighter"
                style={{ color: content.textColor1 }}>
                {content.para1}
              </h4>
            </div>
            <div className="w-fit flex flex-col gap-2">
              <Link
                style={{ color: content.linkColor1 }}
                className="text-[18px] font-normal leading-tight tracking-tight"
                href="/">
                {content.href1}
              </Link>
              <div
                className="w-full h-[1px] rounded-lg"
                style={{ backgroundColor: content.linkColor1 }}
              />
            </div>
          </div>
          <motion.div
            className="w-1/2 xm:w-full sm:w-full h-full flex items-center justify-center"
            style={{ scale: imageScale1 }}>
            <Image
              src={whatwedoImg1}
             
              alt="Business Development"
              className="object-cover w-[350px] h-[700px] sm:w-[180px] sm:h-[350px] xm:w-[160px] xm:h-[320px]"

            />
          </motion.div>
        </motion.div>
      </div>
      <div
        ref={container2}
        className="h-auto flex items-center justify-center sticky top-40 xm:top-[10%] sm:top-[10%] w-full">
        <motion.div
          style={{
            backgroundColor: content.bgColor2,
            top: `calc(-5vh + ${2 * 25}px)`,
          }}
          className="w-full p-20 xm:p-7 sm:p-7 flex justify-between rounded-[30px] gap-10 relative -top-[45%] h-[800px] transform origin-top xm:flex-col sm:flex-col">
          <div className="w-1/2 xm:w-full sm:w-full h-full flex flex-col gap-14 pt-10 xm:pt-5 sm:pt-5 xm:gap-5 sm:gap-5">
            <div className="flex flex-col gap-2">
              <h4
                className="text-[24px] xm:text-lg sm:text-lg leading-tight tracking-tighter"
                style={{ color: content.textColor2 }}>
                {content.title2}
              </h4>
              <h2
                className="text-[80px] xm:text-[40px] sm:text-[40px] xm:leading-none sm:leading-none font-bold leading-[80px] tracking-tighter"
                style={{ color: content.textColor2 }}>
                {content.heading3}
                <br />
                {content.heading4}
              </h2>
              <h4
                className="text-[20px] sm:text-lg xm:text-lg leading-normal tracking-tighter"
                style={{ color: content.textColor2 }}>
                {content.para2}
              </h4>
            </div>
            <div className="w-fit flex flex-col gap-2">
              <Link
                style={{ color: content.linkColor2 }}
                className="text-[18px] font-normal leading-tight tracking-tight"
                href="/">
                {content.href2}
              </Link>
              <div
                className="w-full h-[1px] rounded-lg"
                style={{ backgroundColor: content.linkColor2 }}
              />
            </div>
          </div>
          <motion.div
            className="w-1/2 xm:w-full sm:w-full h-full flex items-center justify-center"
            style={{ scale: imageScale2 }}>
            <Image
              src={whatwedoImg2}
             
              alt="Business Development"
              className="object-cover w-[350px] h-[700px] sm:w-[180px] sm:h-[350px] xm:w-[160px] xm:h-[320px]"

            />
          </motion.div>
        </motion.div>
      </div>
      <div
        ref={container3}
        className="h-auto flex items-center justify-center sticky top-40 xm:top-[10%] sm:top-[10%] w-full">
        <motion.div
          style={{
            backgroundColor: content.bgColor3,
            top: `calc(-5vh + ${3 * 25}px)`,
          }}
          className="w-full p-20 xm:p-7 sm:p-7 flex justify-between rounded-[30px] gap-10 relative -top-[45%] h-[800px] transform origin-top xm:flex-col sm:flex-col">
          <div className="w-1/2 xm:w-full sm:w-full h-full flex flex-col gap-14 pt-10 xm:pt-5 sm:pt-5 xm:gap-5 sm:gap-5">
            <div className="flex flex-col gap-2">
              <h4
                className="text-[24px] xm:text-lg sm:text-lg leading-tight tracking-tighter"
                style={{ color: content.textColor3 }}>
                {content.title3}
              </h4>
              <h2
                className="text-[80px] xm:text-[40px] sm:text-[40px] xm:leading-none sm:leading-none font-bold leading-[80px] tracking-tighter"
                style={{ color: content.textColor3 }}>
                {content.heading5}
                <br />
                {content.heading6}
              </h2>
              <h4
                className="text-[20px] sm:text-lg xm:text-lg leading-normal tracking-tighter"
                style={{ color: content.textColor3 }}>
                {content.para3}
              </h4>
            </div>
            <div className="w-fit flex flex-col gap-2">
              <Link
                style={{ color: content.linkColor3 }}
                className="text-[18px] font-normal leading-tight tracking-tight"
                href="/">
                {content.href3}
              </Link>
              <div
                className="w-full h-[1px] rounded-lg"
                style={{ backgroundColor: content.linkColor3 }}
              />
            </div>
          </div>
          <motion.div
            className="w-1/2 xm:w-full sm:w-full h-full flex items-center justify-center"
            style={{ scale: imageScale3 }}>
            <Image
              src={whatwedoImg3}
             
              alt="Business Development"
              className="object-cover w-[350px] h-[700px] sm:w-[180px] sm:h-[350px] xm:w-[160px] xm:h-[320px]"

            />
          </motion.div>
        </motion.div>
      </div>
      <div
        ref={container4}
        className="h-auto flex items-center justify-center sticky top-40 xm:top-[10%] sm:top-[10%] w-full">
        <motion.div
          style={{
            backgroundColor: content.bgColor4,
            top: `calc(-5vh + ${4 * 25}px)`,
          }}
          className="w-full p-20 xm:p-7 sm:p-7 flex justify-between rounded-[30px] gap-10 relative -top-[45%] h-[800px] transform origin-top xm:flex-col sm:flex-col">
          <div className="w-1/2 xm:w-full sm:w-full h-full flex flex-col gap-14 pt-10 xm:pt-5 sm:pt-5 xm:gap-5 sm:gap-5">
            <div className="flex flex-col gap-2">
              <h4
                className="text-[24px] xm:text-lg sm:text-lg leading-tight tracking-tighter"
                style={{ color: content.textColor4 }}>
                {content.title4}
              </h4>
              <h2
                className="text-[80px] xm:text-[40px] sm:text-[40px] xm:leading-none sm:leading-none font-bold leading-[80px] tracking-tighter"
                style={{ color: content.textColor4 }}>
                {content.heading7}
                <br />
                {content.heading8}
              </h2>
              <h4
                className="text-[20px] sm:text-lg xm:text-lg leading-normal tracking-tighter"
                style={{ color: content.textColor4 }}>
                {content.para4}
              </h4>
            </div>
            <div className="w-fit flex flex-col gap-2">
              <Link
                style={{ color: content.linkColor4 }}
                className="text-[18px] font-normal leading-tight tracking-tight"
                href="/">
                {content.href4}
              </Link>
              <div
                className="w-full h-[1px] rounded-lg"
                style={{ backgroundColor: content.linkColor4 }}
              />
            </div>
          </div>
          <motion.div
            className="w-1/2 xm:w-full sm:w-full h-full flex items-center justify-center"
            style={{ scale: imageScale4 }}>
            <Image
              src={whatwedoImg4}
             
              alt="Business Development"
              className="object-cover w-[350px] h-[700px] sm:w-[180px] sm:h-[350px] xm:w-[160px] xm:h-[320px]"

            />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}