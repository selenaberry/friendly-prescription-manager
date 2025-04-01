
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PrescriptionStatus } from "@/types/prescription";

type StatusStyles = {
  [key in PrescriptionStatus]: {
    className: string;
    label: string;
  };
};

const statusStyles: StatusStyles = {
  'pending': {
    className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    label: 'Pending'
  },
  'filled': {
    className: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    label: 'Filled'
  },
  'ready': {
    className: 'bg-green-100 text-green-800 hover:bg-green-100',
    label: 'Ready'
  },
  'picked-up': {
    className: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
    label: 'Picked Up'
  },
  'cancelled': {
    className: 'bg-red-100 text-red-800 hover:bg-red-100',
    label: 'Cancelled'
  }
};

type PrescriptionStatusBadgeProps = {
  status: PrescriptionStatus;
  className?: string;
};

export function PrescriptionStatusBadge({ status, className }: PrescriptionStatusBadgeProps) {
  const style = statusStyles[status];
  
  return (
    <Badge className={cn(style.className, className)} variant="outline">
      {style.label}
    </Badge>
  );
}
