import { twMerge } from "tailwind-merge"


export default function BigButton({ children, className }) {
  const newClassName = twMerge("bg-black hover:bg-gray-400 hover:text-black w-96 text-white font-bold py-4 px-5 rounded-md shadow-lg",className)
  return (
    <>
    <button className={newClassName}>{children}</button>
    </>
  )
}
