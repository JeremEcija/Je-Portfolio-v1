import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Download, Mail } from "lucide-react";
import { JeNavigator } from "@/components/je/JeNavigator";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden py-10 sm:py-14">
      <div className="grid min-h-[calc(100vh-10rem)] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-md overflow-hidden rounded-[28px] border border-[#a2cb8b]/20 bg-[#161d12] p-3">
            <div className="relative overflow-hidden rounded-[22px] border border-[#5b7e3c]/35 bg-[#1a2215]">
              <Image
                src="/images/profile.jpg"
                alt="Jeremiah Ecija portrait"
                width={700}
                height={900}
                priority
                className="h-auto w-full object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded-full border border-[#e8f5bd]/15 bg-[#161d12] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#e8f5bd]">
                Full-Stack Dev
              </span>
              <span className="absolute bottom-3 right-3 rounded-full border border-[#e8f5bd]/15 bg-[#161d12] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#e8f5bd]">
                v.2026
              </span>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">

          <div className="flex flex-col gap-3 text-sm uppercase tracking-[0.34em] text-[#e8f5bd]/55 sm:flex-row sm:flex-wrap sm:items-center">
            <span className="typing-callme shrink-0">Call me JE.</span>
            <JeNavigator />
          </div>
          <h1 className="mt-4 max-w-4xl text-5xl font-black uppercase leading-[0.9] text-[#f7fbe8] sm:text-6xl lg:text-7xl">
            <span className="block">I build </span>
            <span className="block text-[#a2cb8b]">full-stack</span>
            <span className="block">systems</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#e8f5bd]/75 sm:text-lg">
            Laravel and PHP on the Backend, Vue and React on the frontend.
          </p>
          <div className="mt-8">
            <p className="font-serif text-xl italic text-[#f7fbe8]">
              &quot;In every problem there is a{" "}
              <span className="border-b border-[#c44545]/100 pb-1 font-bold">solution.&quot;</span>
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-[#5b7e3c] px-6 text-[#f7fbe8] hover:bg-[#4d6d32]"
            >
              <Link href="/#projects">
                Projects <ArrowDown className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full border border-[#a2cb8b]/30 bg-[#a2cb8b]/10 px-6 text-[#e8f5bd] hover:bg-[#a2cb8b]/18"
            >
              <Link href="/#contact">
                Get in touch <Mail className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-[#5b7e3c] px-6 text-[#f7fbe8] hover:bg-[#4d6d32]"
            >
              <a href="/Ecija-Resume.pdf" target="_blank" rel="noopener noreferrer">
                Resume <Download className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[#e8f5bd]/45">
            Scroll
          </p>
        </div>
      </div>
    </section>
  );
}
