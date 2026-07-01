
"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PDFUploader() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: false,
      onDrop,
    });

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Upload failed");
        return;
      }

      // Save flashcards
      sessionStorage.setItem(
        "flashcards",
        data.flashcards
      );

      // Save PDF name as deck title
      sessionStorage.setItem(
        "deckTitle",
        file.name.replace(".pdf", "")
      );

      toast.success("Flashcards generated successfully!");

      router.push("/flashcards?source=pdf");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <div
        {...getRootProps()}
        className={`rounded-3xl border-2 border-dashed p-14 text-center cursor-pointer transition
        ${
          isDragActive
            ? "border-purple-500 bg-purple-500/10"
            : "border-zinc-700 bg-zinc-900/50 hover:border-purple-500"
        }`}
      >
        <input {...getInputProps()} />

        <Upload
          size={70}
          className="mx-auto text-purple-500 mb-5"
        />

        <h2 className="text-3xl font-bold">
          Drag & Drop PDF
        </h2>

        <p className="text-zinc-400 mt-3">
          or click here to browse
        </p>

        <p className="mt-6 text-sm text-zinc-500">
          PDF only • Max 20MB
        </p>
      </div>

      {file && (
        <div className="mt-8 rounded-xl border border-zinc-700 bg-zinc-900 p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FileText className="text-purple-500" />

            <div>
              <p className="font-semibold">
                {file.name}
              </p>

              <p className="text-sm text-zinc-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="rounded-lg bg-purple-600 px-6 py-2 font-medium hover:bg-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Generating...
              </>
            ) : (
              "Upload PDF"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

