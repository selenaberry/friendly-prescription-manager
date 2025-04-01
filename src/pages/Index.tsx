
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { PharmacySidebar } from "@/components/PharmacySidebar";
import { PharmacyHeader } from "@/components/PharmacyHeader";
import { PrescriptionCard } from "@/components/PrescriptionCard";
import { PrescriptionForm } from "@/components/PrescriptionForm";
import { mockPrescriptions } from "@/data/mockPrescriptions";
import { Prescription, PrescriptionStatus } from "@/types/prescription";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Index = () => {
  const { toast } = useToast();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPrescription, setEditingPrescription] = useState<Prescription | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Handle search functionality
  const handleSearch = (searchTerm: string) => {
    const term = searchTerm.toLowerCase();
    if (!term) {
      setFilteredPrescriptions(prescriptions);
      return;
    }
    
    const filtered = prescriptions.filter(p => 
      p.patientName.toLowerCase().includes(term) ||
      p.patientId.toLowerCase().includes(term) ||
      p.medication.toLowerCase().includes(term) ||
      p.id.toLowerCase().includes(term) ||
      p.doctor.toLowerCase().includes(term)
    );
    
    setFilteredPrescriptions(filtered);
  };
  
  // Open form for adding new prescription
  const handleAddPrescription = () => {
    setEditingPrescription(undefined);
    setIsFormOpen(true);
  };
  
  // Open form for editing prescription
  const handleEditPrescription = (id: string) => {
    const prescription = prescriptions.find(p => p.id === id);
    if (prescription) {
      setEditingPrescription(prescription);
      setIsFormOpen(true);
    }
  };
  
  // Handle deleting a prescription
  const handleDeletePrescription = (id: string) => {
    setDeletingId(id);
  };
  
  // Confirm deletion
  const confirmDelete = () => {
    if (deletingId) {
      const newPrescriptions = prescriptions.filter(p => p.id !== deletingId);
      setPrescriptions(newPrescriptions);
      setFilteredPrescriptions(newPrescriptions);
      
      toast({
        title: "Prescription Deleted",
        description: `Prescription ${deletingId} has been removed.`,
        variant: "destructive"
      });
      
      setDeletingId(null);
    }
  };
  
  // Save new or edited prescription
  const handleSavePrescription = (data: Omit<Prescription, 'id'>) => {
    if (editingPrescription) {
      // Update existing prescription
      const updated = prescriptions.map(p => 
        p.id === editingPrescription.id ? { ...data, id: p.id } : p
      );
      
      setPrescriptions(updated);
      setFilteredPrescriptions(updated);
      
      toast({
        title: "Prescription Updated",
        description: `Prescription ${editingPrescription.id} has been updated.`
      });
    } else {
      // Create new prescription with a new ID
      const newId = `RX-${Math.floor(1000 + Math.random() * 9000)}`;
      const newPrescription = { ...data, id: newId };
      
      const updated = [...prescriptions, newPrescription];
      setPrescriptions(updated);
      setFilteredPrescriptions(updated);
      
      toast({
        title: "Prescription Created",
        description: `New prescription ${newId} has been created.`
      });
    }
  };
  
  // Change prescription status
  const handleChangeStatus = (id: string, newStatus: PrescriptionStatus) => {
    const updated = prescriptions.map(p => 
      p.id === id ? { ...p, status: newStatus } : p
    );
    
    setPrescriptions(updated);
    setFilteredPrescriptions(updated);
    
    const statusText = {
      'filled': 'filled',
      'ready': 'ready for pickup',
      'picked-up': 'picked up'
    }[newStatus];
    
    toast({
      title: "Status Updated",
      description: `Prescription ${id} has been marked as ${statusText}.`
    });
  };
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <PharmacySidebar />
        
        <div className="flex-1">
          <PharmacyHeader 
            onAddPrescription={handleAddPrescription} 
            onSearch={handleSearch} 
          />
          
          <main className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPrescriptions.map(prescription => (
                <PrescriptionCard 
                  key={prescription.id}
                  prescription={prescription}
                  onEdit={handleEditPrescription}
                  onDelete={handleDeletePrescription}
                  onChangeStatus={handleChangeStatus}
                />
              ))}
              
              {filteredPrescriptions.length === 0 && (
                <div className="col-span-full py-16 text-center">
                  <p className="text-xl text-muted-foreground">No prescriptions found.</p>
                </div>
              )}
            </div>
          </main>
        </div>
        
        {/* Prescription Form Dialog */}
        <PrescriptionForm 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSavePrescription}
          initialData={editingPrescription}
        />
        
        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Prescription</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this prescription? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </SidebarProvider>
  );
};

export default Index;
