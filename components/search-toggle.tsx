"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const SearchToggle = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-auto flex items-center gap-x-3">
          <Search className="h-4 w-4" />
          <p className="text-sm hidden md:block">Search Designful...</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search Designful...</DialogTitle>
        </DialogHeader>
        <Command>
          <CommandInput placeholder="Type your interest" />
          <CommandEmpty>No results found</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto"></CommandGroup>
        </Command>
      </DialogContent>
    </Dialog>
  );
};
