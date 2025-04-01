
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Prescription } from "@/types/prescription";
import { PrescriptionStatusBadge } from "./PrescriptionStatusBadge";
import { Check, Edit, Pill, PillBottle, Trash } from "lucide-react";

type PrescriptionCardProps = {
  prescription: Prescription;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onChangeStatus: (id: string, status: 'filled' | 'ready' | 'picked-up') => void;
};

export function PrescriptionCard({ 
  prescription, 
  onEdit, 
  onDelete,
  onChangeStatus 
}: PrescriptionCardProps) {
  const isActionable = prescription.status !== 'cancelled' && prescription.status !== 'picked-up';
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 border-b">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <PillBottle className="h-5 w-5 text-pharmacy-600 mr-2" />
              <h3 className="font-semibold">{prescription.id}</h3>
            </div>
            <PrescriptionStatusBadge status={prescription.status} />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-baseline">
              <span className="font-medium text-lg">{prescription.patientName}</span>
              <span className="text-sm text-muted-foreground ml-2">({prescription.patientId})</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Pill className="h-4 w-4 text-pharmacy-500" />
              <div>
                <span className="font-medium">{prescription.medication}</span>
                <span className="text-muted-foreground"> - {prescription.dosage}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm text-muted-foreground">Quantity</p>
                <p className="font-medium">{prescription.quantity}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Refills</p>
                <p className="font-medium">{prescription.refillsRemaining}/{prescription.refillsTotal}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Issued</p>
                <p className="font-medium">{prescription.dateIssued}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expires</p>
                <p className="font-medium">{prescription.dateExpires}</p>
              </div>
            </div>
          </div>
          
          {prescription.notes && (
            <div className="mt-3 p-2 bg-muted rounded text-sm">
              <span className="font-medium">Notes: </span>
              {prescription.notes}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-3 bg-muted/30 flex justify-between">
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onEdit(prescription.id)}
          >
            <Edit className="h-4 w-4 mr-1" /> Details
          </Button>
          
          {isActionable && (
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => onDelete(prescription.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {prescription.status === 'pending' && (
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
            onClick={() => onChangeStatus(prescription.id, 'filled')}
          >
            <Check className="h-4 w-4 mr-1" /> Fill
          </Button>
        )}
        
        {prescription.status === 'filled' && (
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
            onClick={() => onChangeStatus(prescription.id, 'ready')}
          >
            <Check className="h-4 w-4 mr-1" /> Mark Ready
          </Button>
        )}
        
        {prescription.status === 'ready' && (
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200"
            onClick={() => onChangeStatus(prescription.id, 'picked-up')}
          >
            <Check className="h-4 w-4 mr-1" /> Mark Picked Up
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
