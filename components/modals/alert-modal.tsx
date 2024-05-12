"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  // Boolean state to track if the component has mounted to the DOM
  const [isMounted, setIsMounted] = useState(false);

  // String state storing the text input to confirm an action
  const [confirmText, setConfirmText] = useState("");

  // Boolean state handling if the user can proceed to an action
  const isConfirmDisabled = confirmText !== "permanently delete" || loading;

  // Hooks to set the isMounted state to true after initial render to avoid hydration error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If the component is not yet mounted, don't render anything
  if (!isMounted) {
    return null;
  }

  // Handler to check if the input matches the required phrase
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmText(event.target.value);
  };

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone. Please make sure before you proceed."
      isOpen={isOpen}
      onClose={onClose}
    >
      <p className="text-xs text-muted-foreground">
        To confirm, type permanently delete in the box below
      </p>
      <Input
        type="text"
        placeholder="permanently delete"
        value={confirmText}
        onChange={handleInputChange}
        disabled={loading}
        className="mb-3 italic text-muted-foreground"
      />
      <div className="pt-3 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={isConfirmDisabled}
          variant="destructive"
          onClick={onConfirm}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};
