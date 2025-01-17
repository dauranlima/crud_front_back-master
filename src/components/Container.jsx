import { twMerge } from "tailwind-merge"

// eslint-disable-next-line react/prop-types
const Container = ({ children,className }) => {
  const newClassName = twMerge("max-w-7xl  mx-auto mt-28 py-1 lg:px-4 ",className)
  return (
    <div className={newClassName}>{ children}</div>
  )
}
export default Container