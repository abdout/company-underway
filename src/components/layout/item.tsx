// Item.tsx
"use client";
import { item } from "@/constant/side";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Item = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center space-x-4">
      {item.map((item, index) => {
        // Prepend '/root' to the path
        const rootPath = `/root${item.path}`;
        
        // Check if the current path starts with the item path
        const isActive = pathname.startsWith(rootPath) || 
                        (item.children && item.children.some(childPath => 
                          pathname.startsWith(`/root${childPath}`)));
        
        return (
          <Link key={index} href={rootPath}>
            <div className={`px-3 py-2 rounded-md ${
              isActive 
                ? "bg-black text-white" 
                : "text-gray-700 hover:bg-gray-100"
            }`}>
              <span className="text-sm font-medium">{item.title}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Item;