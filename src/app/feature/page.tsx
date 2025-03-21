"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileTextIcon, ClockIcon, DatabaseIcon, FolderIcon, BarChartIcon, CreditCardIcon } from "lucide-react";

export default function FeatureLandingPage() {
  const features = [
    {
      title: "PDF Extractor",
      description: "Extract relay settings from PDF documents",
      icon: <FileTextIcon className="h-8 w-8" />,
      href: "/feature/pdf-extractor",
    },
    {
      title: "Report Generator",
      description: "Generate testing and commissioning reports",
      icon: <FileTextIcon className="h-8 w-8" />,
      href: "/feature/report-generator",
    },
    {
      title: "Document Library",
      description: "Centralized repository for all generated documents",
      icon: <FolderIcon className="h-8 w-8" />,
      href: "/feature/document-library",
    },
    {
      title: "Invoice/Petty Cash",
      description: "Process and track petty cash reimbursements",
      icon: <CreditCardIcon className="h-8 w-8" />,
      href: "/feature/invoice",
    },
    {
      title: "Timesheet",
      description: "Track working hours and generate timesheets",
      icon: <ClockIcon className="h-8 w-8" />,
      href: "/feature/timesheet",
    },
    {
      title: "MVP Tracker",
      description: "Track progress, optimizations, and roadmap for the MVP",
      icon: <BarChartIcon className="h-8 w-8" />,
      href: "/mvp-tracker",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Engineering Tools Platform</h1>
        <p className="text-muted-foreground">
          A comprehensive suite of tools for engineering professionals, specializing in electrical testing and commissioning documentation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <Link href={feature.href} key={i} className="block">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{feature.title}</CardTitle>
                  {feature.icon}
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-blue-600 hover:underline">
                  Open Feature →
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 