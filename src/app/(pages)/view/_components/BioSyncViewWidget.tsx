"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import type { TUserBio } from "types";
import BioSyncNotFound from "./not-found";
import ViewBioSync from "./view-bio-sync-widget";


export default function BioSyncViewWidget() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<TUserBio>();

  const bId = searchParams.get("bid");


  useEffect(() => {
    async function getBioSyncDetails() {
      await fetch("/api/getBioSyncById", {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        cache: "no-store",
        body: JSON.stringify({ bid: bId }),
      })
        .then((resp) => resp.json())
        .then((data: TUserBio) => setData(data))
    }

    getBioSyncDetails().catch(err => console.log(err));
  }, [bId])



  return (
    <div>
      {data ?
        <ViewBioSync bioSyncDetails={data} />
        :
        <BioSyncNotFound />
      }
    </div>
  )
}
