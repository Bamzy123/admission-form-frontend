import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const admissionSchema = z.object({
  fullName: z.string()
    .trim()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(100, { message: "Full name must be less than 100 characters" }),
  faculty: z.string()
    .trim()
    .min(2, { message: "Faculty is required" })
    .max(100, { message: "Faculty must be less than 100 characters" }),
  department: z.string()
    .trim()
    .min(2, { message: "Department is required" })
    .max(100, { message: "Department must be less than 100 characters" }),
  university: z.string()
    .trim()
    .min(2, { message: "University/School is required" })
    .max(150, { message: "University/School must be less than 150 characters" }),
  whatsappNumber: z.string()
    .trim()
    .min(10, { message: "Please enter a valid WhatsApp number" })
    .max(20, { message: "WhatsApp number is too long" })
    .regex(/^[0-9+\s()-]+$/, { message: "Please enter a valid phone number" }),
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
});

type AdmissionFormData = z.infer<typeof admissionSchema>;

interface AdmissionFormProps {
  apiEndpoint?: string;
}

export const AdmissionForm = ({ apiEndpoint = "/api/admissions" }: AdmissionFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionSchema),
  });

  const onSubmit = async (data: AdmissionFormData) => {
    setIsSubmitting(true);
    
    try {
      // Prepare data for backend
      const payload = {
        fullName: data.fullName,
        faculty: data.faculty,
        department: data.department,
        university: data.university,
        whatsappNumber: data.whatsappNumber,
        email: data.email,
      };

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();

      toast({
        title: "Success!",
        description: "Your admission form has been submitted successfully.",
      });

      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name *</Label>
        <Input
          id="fullName"
          placeholder="Enter your full name"
          {...register("fullName")}
          className="transition-all focus:scale-[1.01]"
        />
        {errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="faculty">Faculty *</Label>
        <Input
          id="faculty"
          placeholder="e.g., Science, Arts, Engineering"
          {...register("faculty")}
          className="transition-all focus:scale-[1.01]"
        />
        {errors.faculty && (
          <p className="text-sm text-destructive">{errors.faculty.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="department">Department *</Label>
        <Input
          id="department"
          placeholder="e.g., Computer Science, Biology"
          {...register("department")}
          className="transition-all focus:scale-[1.01]"
        />
        {errors.department && (
          <p className="text-sm text-destructive">{errors.department.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="university">University / School *</Label>
        <Input
          id="university"
          placeholder="Enter your institution name"
          {...register("university")}
          className="transition-all focus:scale-[1.01]"
        />
        {errors.university && (
          <p className="text-sm text-destructive">{errors.university.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsappNumber">WhatsApp Number *</Label>
        <Input
          id="whatsappNumber"
          type="tel"
          placeholder="+234 xxx xxx xxxx"
          {...register("whatsappNumber")}
          className="transition-all focus:scale-[1.01]"
        />
        {errors.whatsappNumber && (
          <p className="text-sm text-destructive">{errors.whatsappNumber.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail Address *</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          {...register("email")}
          className="transition-all focus:scale-[1.01]"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Application"
        )}
      </Button>
    </form>
  );
};
