"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  Copy,
  FileText,
  Clock,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
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
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ResumesLoading } from "@/components/loading/resumes-loading";
import { useSession } from "@/lib/auth-client";
import { useDeleteResume, useResumes } from "@/hooks";
import { useQueryStates } from "nuqs";
import { searchParamsSchema } from "@/nuqs";

interface Resume {
  id: string;
  title: string;
  updatedAt: string;
  completeness: number;
  thumbnailUrl?: string | null;
  template?: {
    thumbnail: string | null;
  };
}

export default function ResumesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);
  const router = useRouter();
  const [params, setParams] = useQueryStates(searchParamsSchema);

  const page = Number(params.page);
  const limit = Number(params.limit);

  const { data, isPending: isLoading } = useResumes(page, limit);
  const resumes = data?.data;

  const { mutate: deleteResume } = useDeleteResume({ page, limit });

  const filteredResumes =
    resumes &&
    resumes.filter((resume) =>
      resume.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-8 p-4 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Resumes</h1>
          <p className="text-muted-foreground">
            Manage and organize your professional resumes.
          </p>
        </div>
        <Link href="/resumes/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Resume
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resumes..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <ResumesLoading />
      ) : filteredResumes && filteredResumes.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResumes.map((resume) => (
            <Card
              key={resume.id}
              className="group hover:shadow-md transition-shadow flex flex-col"
            >
              <CardHeader className="relative">
                <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => router.push(`/editor/${resume.id}`)}
                      >
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      {/* Duplicate functionality can be added later */}
                      {/* <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" /> Duplicate
                      </DropdownMenuItem> */}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setResumeToDelete(resume.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="truncate pr-8">{resume.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(new Date(resume.updatedAt), {
                    addSuffix: true,
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="aspect-210/297 w-full bg-muted rounded-md flex items-center justify-center mb-4 border overflow-hidden relative">
                  <Image
                    src={resume.thumbnailUrl!}
                    alt={resume.title}
                    height={377.02}
                    width={266}
                    className="h-full w-full object-cover hover:scale-110 duration-500 transition-all"
                  />
                  {/* <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-muted/50 to-muted hover:scale-3d">
                    <FileText className="h-12 w-12 text-muted-foreground/30" />
                  </div> */}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Completeness</span>
                    <span className="font-medium">{resume.completeness}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${resume.completeness}%` }}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/editor/${resume.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    Open Editor
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-lg bg-muted/10">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            {searchQuery ? "No resumes found" : "No resumes yet"}
          </h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            {searchQuery
              ? "Try adjusting your search terms."
              : "You haven't created any resumes yet. Start building your professional profile today."}
          </p>
          {!searchQuery && (
            <Link href="/resumes/create">
              <Button size="lg" className="gap-2">
                <Plus className="h-4 w-4" />
                Create Your First Resume
              </Button>
            </Link>
          )}
        </div>
      )}

      {data && (
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setParams({ page: String(page - 1) })}
          >
            Previous
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {page} of {data.totalPages}
          </span>

          <Button
            variant="outline"
            disabled={page >= data.totalPages}
            onClick={() => setParams({ page: String(page + 1) })}
          >
            Next
          </Button>
        </div>
      )}

      <AlertDialog
        open={!!resumeToDelete}
        onOpenChange={(open) => !open && setResumeToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              resume.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteResume(resumeToDelete!)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
