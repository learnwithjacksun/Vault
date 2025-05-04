import { ChevronRight } from "lucide-react";

const ImageItems = () => {
  return (
    <div className="flex items-center gap-4 border-b border-line pb-4">
      <div className="h-14 w-14 overflow-hidden rounded-md">
        <img src="/dp.jpg" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <p className="text-muted">My celeb</p>
        <p className="text-sm">https://gfhg.com/bg.png</p>
      </div>
      <ChevronRight/>
    </div>
  );
};

export default ImageItems;
