import { AdmissionForm } from "@/components/AdmissionForm";
import logo from "@/assets/logo.jpeg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <header className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-50" />
        <div className="relative max-w-4xl mx-auto text-center">
          <img
            src={logo}
            alt="Grow With Guidance Academy"
            className="h-24 sm:h-32 mx-auto mb-6 object-contain"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Admission Application Form
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Take the first step towards your academic excellence. Fill out the form below to apply.
          </p>
        </div>
      </header>

      {/* Form Section */}
      <main className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl shadow-[var(--shadow-form)] p-6 sm:p-8 lg:p-10 border border-border/50 backdrop-blur-sm">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2 text-card-foreground">
                Application Details
              </h2>
              <p className="text-muted-foreground">
                Please provide accurate information. All fields marked with * are required.
              </p>
            </div>

            <AdmissionForm apiEndpoint="https://admission-form-backend-4sz2.onrender.com/api/admissions" />

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Need assistance? Contact us via WhatsApp or email provided on our website.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Grow With Guidance Academy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
