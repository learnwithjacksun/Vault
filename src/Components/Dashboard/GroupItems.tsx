import { ChevronRight } from "lucide-react"

const GroupItems = () => {
  return (
    <>
    <div className="flex items-center justify-between border-b border-line pb-4">
        <div className="space-y-2">
            <p className="text-muted text-sm">My IDs</p>
            <p>Number of Items: <span className="text-muted">4</span></p>
        </div>
        <ChevronRight/>
    </div>
    </>
  )
}

export default GroupItems