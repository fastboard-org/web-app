"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "iconsax-react";
import { useState } from "react";

export default function Home() {
  const [firstDelay, setFirstDelay] = useState(0.4);
  const [secondDelay, setSecondDelay] = useState(0.8);

  return (
    <main
      style={{
        background:
          "linear-gradient(0deg, rgba(135,190,252,0.7) 0%, rgba(255,255,255,1) 80%)",
      }}
      className="flex flex-col min-h-screen items-center justify-center p-24 bg-background overflow-hidden"
    >
      <div className={"flex gap-20 justify-center items-center"}>
        <p className={"absolute top-20 text-white z-20 cursor-default"}>
          Made by @JulianBiancardi, @TGRodriguez & @stein257
        </p>
        <div className={"flex gap-[10px]"}>
          <motion.div
            drag
            dragSnapToOrigin
            whileDrag={{ scale: 1.1, cursor: "grabbing" }}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.25 }}
            className={
              "w-[106px] h-[240px] bg-primary rounded-[10px] cursor-grab"
            }
          />
          <div className={"flex flex-col justify-between "}>
            <motion.div
              drag
              dragSnapToOrigin
              whileDrag={{ scale: 1.1, cursor: "grabbing" }}
              initial={{ y: -200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
                delay: firstDelay,
              }}
              className={
                "w-[106px] h-[115px] bg-primary rounded-[10px] cursor-grab"
              }
              onAnimationComplete={() => setFirstDelay(0)}
            />
            <motion.div
              drag
              dragSnapToOrigin
              whileDrag={{ scale: 1.1, cursor: "grabbing" }}
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                ease: "easeInOut",
                duration: 0.25,
                delay: secondDelay,
              }}
              className={
                "w-[106px] h-[115px] bg-primary rounded-[10px] cursor-grab"
              }
              onAnimationComplete={() => setSecondDelay(0)}
            />
          </div>
        </div>
        <div className={"flex flex-col"}>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 1.2 }}
            className={
              "text-8xl font-normal text-center text-black z-10 relative top-0"
            }
          >
            Fastboard
          </motion.h1>
          <motion.a
            initial={{ opacity: 0, x: 10, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 10 }}
            transition={{ ease: "easeInOut", duration: 0.25, delay: 1.6 }}
            href={"/auth/login"}
            className={
              "text-xl text-black flex gap-1 items-center self-end hover:underline"
            }
          >
            Start now
            <ArrowRight size={20} />
          </motion.a>
        </div>
      </div>
    </main>
  );
}
