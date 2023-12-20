"use client"

import Image from "next/image";

import { useData } from "@/hooks/useBioData";
import { cn } from "@/lib/others/utils";
import { useUser } from "@/hooks/useUser";


export default function MobilePreview() {
  const { data: userBioData } = useData();
  const {userDetails}= useUser();

  return (
    <div className="relative z-50 mx-auto h-[600px] w-[300px] min-w-[320px] rounded-[42px] border-[14px] border-primary bg-primary shadow-xl ">
      <div className="absolute left-1/2 top-0 z-50 h-[18px] w-[148px] translate-x-[-50%] rounded-b-[1rem] bg-primary"></div>
      <div className="absolute left-[-17px] top-[124px] z-50 h-[46px] w-[4px] rounded-l-lg bg-primary"></div>
      <div className="absolute left-[-17px] top-[178px] z-50 h-[46px] w-[4px] rounded-l-lg bg-primary"></div>
      <div className="absolute right-[-17px] top-[142px] z-50 h-[64px] w-[4px] rounded-r-lg bg-primary"></div>
      <div
        className={cn(
          'relative h-full w-full overflow-hidden break-words rounded-[32px]',
          "bg-white dark:bg-black",
        )}
      >
        {userBioData.displayProfile ? (
          <Image 
            src={String(userDetails?.image)}
            alt="profile"
            width={200}
            height={200}
          />
        ) : (
          <>no data</>
        )}
      </div>
    </div>
  )
}