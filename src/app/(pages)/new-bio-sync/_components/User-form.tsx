"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { type Session } from "next-auth"
import { useState } from "react"
import classNames from "classnames"
import { FaDeleteLeft, FaPlus } from "react-icons/fa6"

import type { TUserBio } from "types"
import { INPUT_FIELDS_DETAILS } from "@/lib/constants/profile-input-details-list"
import { submitUserBio } from "@/actions/submit-user-bio"
import { useData } from "@/hooks/useBioData"

const ShowDemoDataButton = dynamic(() => import("./buttons/Show-demo-button"))
const PublishButton = dynamic(() => import("./buttons/Publish-button"))
const GithubLinkButton = dynamic(() => import("./buttons/Github-button"))
const PreviewButton = dynamic(() => import("./buttons/Preview-button"))
const ResetButton = dynamic(() => import("./buttons/Reset-button"))
const InputsField = dynamic(() => import("./input-field"))
const Button = dynamic(() => import("@/components/ui/button").then((mod) => mod.Button))
const Separator = dynamic(() => import("@/components/ui/separator").then((mod) => mod.Separator))
const Checkbox = dynamic(() => import("@/components/ui/checkbox").then((mod) => mod.Checkbox))
const Label = dynamic(() => import("@/components/ui/label").then((mod) => mod.Label))
const Input = dynamic(() => import("@/components/ui/input").then((mod) => mod.Input))


type TProps = Session["user"];


export default function InputForm({ image }: TProps) {
  const [projectLink, setProjectLink] = useState<string>("");
  const {
    data: userBioData,
    addProjectLink,
    toggleProfileImage,
    handleInputChange,
    removeProject,
  } = useData();


  // add project
  function addProject() {
    if (projectLink === undefined || projectLink.trim().length < 1) {
      alert("Link cannot be empty");
      setProjectLink("");
      return;
    }
    if (userBioData.projectLinks.includes(projectLink)) {
      alert("Link is already in project");
      setProjectLink("");
      return;
    }

    addProjectLink(projectLink);
    setProjectLink("")
  }


  // for checking if field required
  function isFieldRequired(id: keyof TUserBio) {
    return id === "bio" || id === "email" || id === "name"
  }



  return (
    <form
      action={async () => await submitUserBio(userBioData)}
      className={classNames({
        "overflow-y-auto": true,
        "h-[88vh] sm:h-[84vh] w-[95vw] md:w-[100vw] lg:w-[50vw]": true,
      })}
    >
      {/* PROFILE IMAGE */}
      <div className={classNames({
        "flex flex-col items-center justify-center gap-y-5": true,
        "w-auto sm:w-[40vw] mx-auto": true,
      })}>
        <Image
          src={userBioData.profilePicLink || String(image)}
          alt={userBioData.name}
          width={200}
          height={200}
          priority
          className={classNames({
            "h-40 w-40": true,
            "rounded-full": true,
            "transition duration-200": true,
            "brightness-50": !userBioData.displayProfile,
          })}
        />

        <div className={classNames({
          "flex flex-col sm:flex-row items-center gap-3": true,
        })}>
          <Label
            htmlFor="profile-image"
            className="text-muted-foreground text-center leading-5"
          >
            Include Profile pic in your BioSync
          </Label>
          <Checkbox
            id="profile-image"
            checked={userBioData.displayProfile}
            onCheckedChange={toggleProfileImage}
          />
        </div>
      </div>


      <Separator
        orientation="horizontal"
        className={classNames({
          "my-3 xs:my-10 lg:my-16 h-1 rounded-full bg-zinc-700": true,
        })}
      />


      {/* INPUT SECTIONS */}
      <div className={classNames({
        "flex flex-col items-center justify-center gap-5": true,
      })}>
        {INPUT_FIELDS_DETAILS.map((det) => (
          <InputsField
            key={det.id}
            id={det.id}
            inputType={det.inputType}
            label={det.label}
            required={isFieldRequired(det.id)}
            placeholder={det.placeholder}
            widthClass={"w-full"}
            value={String(userBioData[`${det.id}`])}
            onChange={(e) => handleInputChange(e.target.value, det.id)}
            Icon={det.icon}
          />
        ))}


        {/* PROJECT LINKS AND INPUT FIELD...!! */}
        <div className={classNames({
          "text-xl font-bold text-center": true,
          "py-3 lg:py-6": true,
          "space-y-3": true,
        })}>
          <h1>Mention Project links <br /> (if any) </h1>

          <div className={classNames({
            "flex flex-row items-center justify-center gap-3": true,
          })}>
            <Input
              value={projectLink}
              placeholder="paste your project link and press '+'"
              onChange={(e) => setProjectLink(e.target.value)}
              className={classNames({
                "outline-1 outline": true,
                "w-auto sm:w-[25rem]": true,
              })}
            />

            <Button
              size={"icon"}
              type="button"
              onClick={addProject}
            >
              <FaPlus />
            </Button>
          </div>

          <div className={classNames({
            "grid grid-cols-2 gap-2": true,
          })}>
            {userBioData.projectLinks.map((link, idx) => (
              <ProjectDisplayMockup
                key={idx}
                link={link}
                removeProject={() => removeProject(idx)}
              />
            ))}
          </div>
        </div>
      </div>


      {/* FOOTER BUTTONS */}
      <div className={classNames({
        "grid grid-cols-1 xs:grid-cols-2 items-center justify-around gap-1 sm:gap-3": true,
        "p-1 sm:p-3": true,
        "sticky bottom-0 left-0": true,
        "backdrop-blur-sm bg-opacity-100": true,
        "rounded-xl border-4 border-gray-600/80": true,
      })}>
        <ShowDemoDataButton />
        <PublishButton />
        <ResetButton />
        <GithubLinkButton />
        <PreviewButton />
      </div>
    </form>
  )
}



function ProjectDisplayMockup(
  { link, removeProject }: { link: string, removeProject: (idx: number) => void }
) {
  return (
    <div
      key={link}
      className={classNames({
        "flex flex-row gap-4 items-center justify-between": true,
        "border-2 border-zinc-800 rounded-lg": true,
        "text-sm font-thin": true,
        "p-2": true,
      })}
    >
      <Link
        href={link.startsWith("https://") ? link : "https://" + link}
        target="_blank"
      >
        {link}
      </Link>

      <FaDeleteLeft
        fill="black"
        onClick={removeProject}
        className={classNames({
          "hover:scale-110 transition ease-out": true,
          "cursor-pointer": true,
        })}
      />
    </div>
  )
}