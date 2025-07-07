"use client";
import Link from "next/link";
import { useRef } from "react";
import { TextMask } from "../animation";
import { ArrowUpRight } from "lucide-react";
import { Eyes, RoundButton, Rounded } from "@/components";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Ready() {
	const container = useRef(null);
	const phrase = ["Ready", "to start", "the project"];

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start end", "end start"],
	});
	const mq = useTransform(scrollYProgress, [0, 1], [0, -700]);

	return (
		<section
			className="w-full relative z-30 min-h-screen sm:h-screen xm:h-screen bg-about padding-y mt-[-20px] bg-[#D3E97A] py-[100px]"
			ref={container}
		>
			<div className="w-full h-full flex justify-center gap-[50px] items-center flex-col">
				<div className="flex flex-col gap-[10px]">
					<h1 className="text-[290px] leading-[230px] lg:text-[220px] lg:leading-[170px] md:text-[180px] md:leading-[140px] sm:text-[120px] sm:leading-[90px] xm:text-[80px] xm:leading-[60px] tracking-[-2.5px] text-center font-bold font-FoundersGrotesk text-black uppercase pointer-events-none">
						<TextMask>{phrase}</TextMask>
					</h1>
				</div>

				<div className="flex flex-col items-center gap-[10px]">
					{/* Original White Button */}
					<Link href="/contact">
						<div className="px-6 py-3 rounded-full bg-[#070606] text-white text-[16px] sm:text-[14px] font-medium uppercase hover:opacity-90 transition-all duration-300 shadow-lg flex items-center gap-3">
							<span>Start with Dark Mode</span>
							<ArrowUpRight size={20} strokeWidth={1.5} />
						</div>
					</Link>

					{/* OR Separator */}
					<p className="text-[20px] font-NeueMontreal text-black">OR</p>

					{/* NEW: Custom 070606 Button */}
					

					{/* Existing contact email button */}
					<div className="flex items-center justify-between bg-transparent cursor-pointer rounded-full group border border-[#212121] mt-4">
						<Link
							className="xl:text-[18px] xl:leading-[28px] text-[14px] leading-[24px] uppercase font-normal font-NeueMontreal text-black"
							href="/contact"
						>
							<Rounded className="py-[6px]" backgroundColor="#212121">
								<p className="z-10 px-[10px] ml-[15px] py-[6px] group-hover:text-white text-black">
									hello@ochi.design
								</p>
								<div className="bg-black group-hover:bg-white text-black p-[10px] rounded-full scale-[0.3] mr-[10px] group-hover:scale-[0.9] transition-all z-10 transform duration-[0.3s] ease-[.215,.61,.355,1]">
									<ArrowUpRight
										strokeWidth={1.5}
										size={30}
										className="scale-[0] group-hover:scale-[1]"
									/>
								</div>
							</Rounded>
						</Link>
					</div>
				</div>
			</div>

			{/* Eyes Motion Graphic */}
			<motion.div
				className="w-full absolute top-[50%] transform translate-y-[-50%] gap-[30px] flex items-center justify-center"
				style={{ y: mq }}
			>
				<Eyes className="w-[200px] h-[200px] md:w-[170px] md:h-[170px] sm:w-[150px] sm:h-[150px] xm:w-[150px] xm:h-[150px] sm:flex-col xm:flex-col" />
			</motion.div>
		</section>
	);
}
