import { FC } from "react";
import { Icon } from "@iconify/react";
import { docs } from "@/constant/team";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, Phone, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TeamDetial {
  src: string;
  alt: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  mail?: string;
  location?: string;
  width: number;
  height?: number;
  id?: string;
  iqama?: string;
  eligible?: string[];
}

interface Props {
  team: TeamDetial;
  onClose?: () => void;
}

const Profile: FC<Props> = ({ team, onClose }) => {
  // Determine role based on expertise - if they have eligible skills list, they're likely engineers
  const isEngineer = team.eligible && team.eligible.length > 0;
  const firstName = team.firstName || team.alt.split(' ')[0];
  const lastName = team.lastName || team.alt.split(' ')[1] || '';
  const fullName = `${firstName} ${lastName}`;
  const role = isEngineer ? "Engineer" : "Technician";

  return (
    <div className="flex flex-col h-full max-w-[280px]">
      <DialogHeader className="relative p-3 text-center">
        <div className="absolute top-2 right-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
          >
            <X size={20} />
          </Button>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="mb-3 w-[100px] h-[100px] relative">
            <Image
              className="rounded-full object-cover"
              src={team.src}
              alt={fullName}
              fill
              sizes="100px"
            />
          </div>
          
          <DialogTitle className="text-lg font-medium text-gray-800 mb-1">
            {fullName}
          </DialogTitle>
          <p className="text-xs text-gray-500 mb-3">
            {role}
            {team.location ? ` • ${team.location}` : ''}
          </p>
            
          <div className="flex justify-center gap-2 mt-1 mb-2">
            {team.mail && (
              <button 
                className="w-9 h-9 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-50"
                onClick={() => {
                  if (team.mail) window.location.href = `mailto:${team.mail}`;
                }}
              >
                <Mail size={18} />
              </button>
            )}
            
            {team.phone && (
              <button 
                className="w-9 h-9 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-50"
                onClick={() => {
                  if (team.phone) window.location.href = `https://wa.me/${team.phone.replace(/\s+/g, '')}`;
                }}
              >
                <Icon icon="ri:whatsapp-line" width={18} height={18} />
              </button>
            )}
          </div>
        </div>
      </DialogHeader>

      <div className="p-3 border-t flex-grow overflow-auto">
        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="eligibility">Skills</TabsTrigger>
          </TabsList>
          
          <TabsContent value="documents" className="py-3">
            {team.iqama ? (
              <div className="grid grid-cols-2 gap-3">
                {docs.map((doc, index) => (
                  <div 
                    key={index}
                    className="border rounded-md p-2 flex flex-col items-center gap-1 cursor-pointer hover:border-gray-300 shadow-none"
                  >
                    <Icon icon={doc.icon} width={24} />
                    <span className="text-xs">{doc.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No documents available
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="eligibility" className="py-3">
            {team.eligible && team.eligible.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {team.eligible.map((skill, index) => (
                  <Badge key={index} variant="outline" className="py-1 px-2">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No skills information available
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;