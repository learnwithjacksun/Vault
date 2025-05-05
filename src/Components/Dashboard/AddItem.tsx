import { AnimatePresence } from "framer-motion"
import { Box, Boxes, ChevronRight, ImagePlus, Plus } from "lucide-react"
import { useState } from "react"
import { Modal } from "../UI"
import { Link } from "react-router-dom"

const list = [
    {
        id:1,
        name: "Single Item",
        icon: Box,
        link: "/add/single",
        bg: "bg-pink-500/10",
        color: "text-pink-500"
    },
    {
        id:2,
        name: "Group Item",
        icon: Boxes,
        link: "/add/group",
        bg: "bg-yellow-500/10",
        color: "text-yellow-500"
    },
    {
        id:3,
        name: "Image",
        icon: ImagePlus,
        link: "/add/image",
        bg: "bg-blue-500/10",
        color: "text-blue-500"
    },  
]

const AddItem = () => {
    const [isShow, setShow] = useState(false)
  return (
    <>
    <button onClick={() => setShow(true)} className="btn-secondary h-12 rounded-full px-5 shadow-2xl fixed bottom-4 left-1/2 -translate-x-1/2">
        <Plus size={18}/>
        Add item
    </button>

    <AnimatePresence>
        {isShow && (
            <Modal title="Add Item" isOpen={isShow} onClose={() => setShow(false)}>
                <div className="flex flex-col gap-2">
                    {list.map((item) => (
                        <Link to={item.link} key={item.id} className="flex items-center gap-4 border-b border-line py-2">
                           <div className={`h-9 w-9 center rounded-lg ${item.bg}`}><item.icon size={20} className={`${item.color}`}/></div>
                           <span className="flex-1 dark:text-main text-muted">{item.name}</span>
                           <ChevronRight size={20}/>
                        </Link>
                    ))}
                </div>
            </Modal>
        )}

    </AnimatePresence>
    </>
  )
}

export default AddItem