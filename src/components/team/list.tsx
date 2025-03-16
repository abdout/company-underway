'use client';
import { team } from '@/constant/team'
import React, { useState } from 'react'
import TeamCard from './team';
import { 
  Dialog, 
  DialogContent
} from '@/components/ui/dialog';
import Profile from './profile';

const TeamList = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const openTeamProfile = (id: string) => {
    setSelectedTeam(id);
    setDialogOpen(true);
  };

  const teamMember = team.find(t => t.id === selectedTeam);

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md p-0 border rounded-lg">
          {teamMember && <Profile team={teamMember} onClose={() => setDialogOpen(false)} />}
        </DialogContent>
      </Dialog>

      <div className="p-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <TeamCard 
              key={index}
              member={member}
              onClick={() => member.id && openTeamProfile(member.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TeamList;