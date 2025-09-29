"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown2, ArrowRight } from "iconsax-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import FadeUp from "@/components/shared/FadeUp";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function Home() {
  const [firstDelay, setFirstDelay] = useState(0.4);
  const [secondDelay, setSecondDelay] = useState(0.8);
  const [showArrow, setShowArrow] = useState(false);

  const { setTheme } = useTheme();

  const router = useRouter();

  //set theme to light
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  return (
    <main
      style={{
        background:
          "linear-gradient(0deg, rgba(135,190,252,0.7) 0%, rgba(255,255,255,1) 80%)",
      }}
      className="flex flex-col min-h-screen items-center justify-center bg-background overflow-x-hidden !scroll-smooth"
    >
      <div
        className={"flex gap-20 justify-center items-center w-full h-screen"}
      >
        <AnimatePresence>
          {showArrow && (
            <motion.a
              href={"#about"}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 1],
                y: [0, 10],
              }}
              transition={{
                opacity: { duration: 1 },
                y: {
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 1,
                  ease: "easeInOut",
                },
              }}
              className={"absolute bottom-10"}
            >
              <ArrowDown2 size={40} className={"text-black cursor-pointer"} />
            </motion.a>
          )}
        </AnimatePresence>
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
            onAnimationComplete={() => setShowArrow(true)}
          >
            Start now
            <ArrowRight size={20} />
          </motion.a>
        </div>
      </div>
      <div className={"flex flex-col items-center pt-24"} id={"about"}>
        <FadeUp delay={0.25}>
          <h2
            className={"text-black text-center text-5xl max-w-[1000px] mb-12"}
          >
            An easy and intuitive solution for developing dashboards
          </h2>
        </FadeUp>
        <FadeUp delay={0.5}>
          <p className={"max-w-[700px] text-center mb-10"}>
            Connect your data sources and start creating your own dashboards
            with Fastboard. Just as simple as drag and dropping.
          </p>
        </FadeUp>
        <FadeUp delay={0.6}>
          <Button
            className={"bg-black text-white rounded-3xl mb-12"}
            variant={"shadow"}
            onClick={() => router.push("/auth/login")}
          >
            Get started for free
          </Button>
        </FadeUp>
        <FadeUp delay={0.75}>
          <div
            className={"w-[100%] rounded-lg shadow-2xl overflow-hidden mb-12"}
          >
            <Image
              src={"/screenshot.png"}
              alt={"image"}
              width={1000}
              height={400}
              quality={100}
            />
          </div>
        </FadeUp>
      </div>
      <footer
        className={
          "flex items-center justify-center w-full text-center p-5 gap-5 mt-12"
        }
      >
        <p className={"text-black"}>
          Star us on{" "}
          <a
            href={"https://github.com/fastboard-org"}
            target={"_blank"}
            className={"hover:underline"}
          >
            <b>Github</b>
          </a>
        </p>
        <p>|</p>
        <p className={"text-black"}>© 2024 Fastboard</p>
      </footer>
    </main>
  );
}
