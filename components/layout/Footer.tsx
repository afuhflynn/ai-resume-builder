import Link from "next/link";
import { FileText, Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight">Resumi</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              The AI-powered resume builder that helps you land more interviews.
              Professional templates, instant feedback, and ATS optimization.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#features"
                  className="hover:text-primary transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="hover:text-primary transition-colors"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/examples"
                  className="hover:text-primary transition-colors"
                >
                  Examples
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary transition-colors"
                >
                  Career Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/guide"
                  className="hover:text-primary transition-colors"
                >
                  Resume Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/cover-letter"
                  className="hover:text-primary transition-colors"
                >
                  Cover Letter Tips
                </Link>
              </li>
              <li>
                <Link
                  href="/interview"
                  className="hover:text-primary transition-colors"
                >
                  Interview Prep
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Resumi. All rights reserved.</p>
          <p>Made with ❤️ for job seekers everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
