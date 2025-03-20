'use client';
import React from 'react';

import { columns } from '@/components/table/coloum';
import { useMember } from '@/components/member/context';
import { Content } from '@/components/member/content';


const Member = () => {

  const { members } = useMember();

  return (
    <div>
      <Content columns={columns} data={members} />
      
    </div>
  );
};

export default Member;