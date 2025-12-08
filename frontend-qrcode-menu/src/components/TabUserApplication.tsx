import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Laptop, Smartphone, Tablet } from "lucide-react";
import Image from "next/image";

export function TabUserApplication() {
    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <Tabs defaultValue="mobile" className="w-full flex flex-col items-center">
                <TabsList className="grid w-full grid-cols-3 max-w-[400px] mb-8">
                    <TabsTrigger value="mobile" className="flex items-center gap-2 cursor-pointer">
                        <Smartphone className="w-4 h-4" />
                        Mobile
                    </TabsTrigger>
                    <TabsTrigger value="desktop" className="flex items-center gap-2 cursor-pointer">
                        <Laptop className="w-4 h-4" />
                        Desktop
                    </TabsTrigger>
                    <TabsTrigger value="tablet" className="flex items-center gap-2 cursor-pointer">
                        <Tablet className="w-4 h-4" />
                        Tablet
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="mobile" className="w-full flex justify-center">
                    <div className="w-full h-auto flex justify-center items-center bg-gray-100">
                        <div className="w-100 h-100 flex items-center justify-center bg-gray-100 text-gray-400">
                            <Image src="/mock/mobile.svg" alt="mobile" width={100} height={100} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="desktop" className="w-full flex justify-center">
                    <div className="w-full h-auto flex justify-center items-center bg-gray-100">
                        <div className="w-100 h-100 flex items-center justify-center bg-gray-100 text-gray-400">
                            <Image src="/mock/desktop.svg" alt="desktop" width={100} height={100} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="tablet" className="w-full flex justify-center">
                    <div className="w-full h-auto flex justify-center items-center bg-gray-100">
                        <div className="w-100 h-100 flex items-center justify-center bg-gray-100 text-gray-400">
                            <Image src="/mock/tablet.svg" alt="tablet" width={100} height={100} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
