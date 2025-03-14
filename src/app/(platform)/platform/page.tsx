'use client';
import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
// import { useRouter } from 'next/navigation';

export default function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  // const router = useRouter();
  // useEffect(() => {
  //   if (window.location.hash === '#_=_') {
  //       router.replace('/platform'); 
  //   }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-3xl font-bold mb-4">منصة الحركة الوطنية للبناء والتنمية</h1>
      <p className="text-lg text-muted-foreground mb-8">مرحباً بك في منصتنا</p>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[80%] md:max-w-[60%] pr-20" onInteractOutside={() => setIsDialogOpen(false)}>
          <DialogHeader>
            <h1 className="font-heading font-bold text-start text-3xl leading-normal sm:text-2xl md:text-3xl">
              مرحبا بيك
            </h1>
          </DialogHeader>
          
          <div className='relative -mt-2 '>
            <p className='text-[16px] text-muted-foreground'>في منصة الحركة الوطنية للبناء والتنمية</p>

            <p className='w-full md:w-4/5 pt-4'>لن يصيب المجد كف واحد - إيماناً بسحر العمل الجماعي، نسعى من خلال هذه المنصة إلى أتمتة أعمال الحركة  وامتلاك ادوات تنسيق وتعاون افضل. ساهم في خلق تجربة جديدة من الكفاءة والتنظيم.</p>

            <div className='flex flex-col md:flex-row justify-between items-center mt-8'>
              <div>
                <p className='-mt-2 mb-4 text-sm'>استكشف الروابط أدناه للدليل المستخدم ومركز المساعدة👇</p>
                <div className='flex gap-8 items-center'>
                  <Icon icon={"ph:book-fill"} height="60" className="opacity-80 hover:opacity-100 transition-opacity duration-200" />
                  <Icon icon={"ant-design:customer-service-filled"} height="60" className="opacity-80 hover:opacity-100 transition-opacity duration-200" />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}