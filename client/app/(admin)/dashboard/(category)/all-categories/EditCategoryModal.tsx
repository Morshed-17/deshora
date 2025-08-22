import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UploadSingleImage from "@/components/ui/upload-single-image";
import {
  useCreateCategoryMutation,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/features/category/categoryApi";
import { ICategory } from "@/types/type";
import { Edit, Loader } from "lucide-react";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";

interface EditCategoryModalProps {
  slug: string;
}

export function EditCategoryModal({ slug }: EditCategoryModalProps) {
  // const [category, setCategory] = useState<ICategory | null>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [updatCategory, { isLoading, error }] = useUpdateCategoryMutation();
  const {
    data,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetSingleCategoryQuery(slug);

  const categoryData: ICategory = data?.data;
  useEffect(() => {
    setTitle(categoryData?.title);
    setDescription(categoryData?.description);
  }, [categoryLoading, open]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("data", JSON.stringify({ title, description }));

    if (file) {
      formData.append("file", file);
    }
    try {
      const res = await updatCategory({
        id: categoryData._id,
        data: formData,
      }).unwrap();
      toast.success("Castegory created");
      setFormError("");
      setTitle("");
      setDescription("");
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] w-full  space-y-2">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit This category</DialogTitle>
          </DialogHeader>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  name="title"
                  placeholder="Eg. Summer Collection"
                />
              </div>
              <div className="grid gap-3 mt-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  name="description"
                  placeholder="Explore our new summer collection. etc"
                />
              </div>
            </div>
            <div>
              <p>
                Image size must be{" "}
                <span className="text-red-500 font-medium">(1080X1340)px</span>
              </p>
              <UploadSingleImage
                onFileSelect={setFile}
                label="Category Image"
              />
            </div>
          </div>
          {formError && <p className="text-red-500 mt-2">{formError}</p>}
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => {
                  setFormError("");
                  setTitle("");
                  setDescription("");
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            {isLoading ? (
              <Button type="submit">
                <Loader className="animate-spin" />
                Updating..
              </Button>
            ) : (
              <Button type="submit">Update Category</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
