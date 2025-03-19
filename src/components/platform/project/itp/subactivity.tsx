'use client';
import React from "react";
import {
  EvCable,
  EvRmu,
  EvSwgr,
  EvTrafo,
  HvCable,
  HvRmu,
  HvSwgr,
  HvTrafo,
  LvCable,
  LvRmu,
  LvSwgr,
  LvTrafo,
  MvCable,
  MvRmu,
  MvSwgr,
  MvTrafo,
} from "@/constant/project/item";
import Table from "@/components/platform/project/itp/table";
import { Abb } from "@/constant/abb";

type OptionKey = 'evSwgr' | 'evTrafo' | 'evCable' | 'evRmu' | 'hvSwgr' | 'hvTrafo' | 'hvCable' | 'hvRmu' | 'mvSwgr' | 'mvTrafo' | 'mvCable' | 'mvRmu' | 'lvSwgr' | 'lvTrafo' | 'lvCable' | 'lvRmu';

interface IndexProps {
  option: OptionKey;
}

const SubActivity: React.FC<IndexProps> = ({ option }) => {
  const optionArrays = {
    evSwgr: EvSwgr,
    evTrafo: EvTrafo,
    evCable: EvCable,
    evRmu: EvRmu,
    hvSwgr: HvSwgr,
    hvTrafo: HvTrafo,
    hvCable: HvCable,
    hvRmu: HvRmu,
    mvSwgr: MvSwgr,
    mvTrafo: MvTrafo,
    mvCable: MvCable,
    mvRmu: MvRmu,
    lvSwgr: LvSwgr,
    lvTrafo: LvTrafo,
    lvCable: LvCable,
    lvRmu: LvRmu,
  };

  const data = [
    [
      '2', '2.1', 'Name plate details checks <br /> as per approved drawing', 'Visual <br /> inspection', 'Factory <br /> test report', 'Each item', 'Factory test report/ Rated <br /> name plate data/ MOS/', 'Vendor <br /> manual', 'Test <br /> report', 'H', 'w', 'w', 'R', ''
    ],
    [
      '', '2.2', 'Physical inspection test <br /> as per approved drawing', 'Visual <br /> inspection', 'Factory <br /> test report', 'Each item', 'Factory test report/ Rated <br /> name plate data/ MOS/', 'Vendor <br /> manual', 'Test <br /> report', 'H', 'w', 'w', 'R', ''
    ],
    ...optionArrays[option].map((item, index) => [
      "",
      `2.${
        index + 3 < 10
          ? index + 3
          : (index + 3).toString().padStart(2, "0")
      }`,
      Abb[item.label],
      "Test",
      "Factory <br /> test report",
      "Each item",
      "Factory test report/ Rated <br /> name plate data/ MOS/",
      "Vendor <br /> manual",
      "Test <br /> report",
      "H",
      "w",
      "w",
      "R",
      "",
    ])
  ];

  return <Table data={data} />;
};

export default SubActivity;