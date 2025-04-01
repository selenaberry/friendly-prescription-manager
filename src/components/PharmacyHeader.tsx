
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, PlusCircle } from "lucide-react";

type PharmacyHeaderProps = {
  onAddPrescription: () => void;
  onSearch: (term: string) => void;
};

export function PharmacyHeader({ onAddPrescription, onSearch }: PharmacyHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between p-4 border-b">
      <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
        <SidebarTrigger className="mr-2" />
        <h1 className="text-2xl font-bold">Prescription Management</h1>
      </div>
      
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search prescriptions..." 
            className="pl-8 w-full"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        <Button onClick={onAddPrescription} className="whitespace-nowrap">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Prescription
        </Button>
      </div>
    </header>
  );
}
