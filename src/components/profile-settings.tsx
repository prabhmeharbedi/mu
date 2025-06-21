"use client";

import type { UserProfile } from "@/lib/types";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast";

interface ProfileSettingsProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

const profileSchema = z.object({
  age: z.coerce.number().int().min(13, "Must be at least 13").max(100, "Age seems high"),
  location: z.string().min(2, "Location is too short"),
  language: z.enum(["English", "Hinglish", "Hindi"]),
});

export function ProfileSettings({ profile, onUpdateProfile }: ProfileSettingsProps) {
  const form = useForm<UserProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile,
  });
  const { toast } = useToast();

  const onSubmit: SubmitHandler<UserProfile> = (data) => {
    onUpdateProfile(data);
    toast({
        title: "Profile Updated!",
        description: "Your settings have been saved.",
    });
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Profile Settings</SheetTitle>
        <SheetDescription>
          This information helps me give you more relevant guidance.
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-4">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Your age" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Tier 2 City, a specific state..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Language</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Hinglish">Hinglish (Mix)</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <SheetFooter>
            <SheetClose asChild>
                <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
