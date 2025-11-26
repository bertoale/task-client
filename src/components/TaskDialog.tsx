// TaskDialog.tsx
// Komponen dialog untuk add/edit task.
// - Jika props task diberikan, dialog berfungsi sebagai edit task.
// - Jika props task tidak diberikan, dialog berfungsi sebagai add task.
// - onSuccess dipanggil setelah berhasil add/edit task.
//
// Props:
//   task?: object task yang akan diedit (jika ada)
//   onSuccess: function yang dipanggil setelah task berhasil ditambah/diupdate
//   trigger?: custom trigger element (optional)
//
// Contoh penggunaan:
//   <TaskDialog onSuccess={fetchTasks} /> // untuk add
//   <TaskDialog task={task} onSuccess={fetchTasks} trigger={<Button>Edit</Button>} /> // untuk edit

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TaskDialog({ task, onSuccess, trigger }: any) {
  const isEdit = !!task;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && open) {
      // Fetch data task by id dari backend
      const fetchTask = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTitle(res.data.data.task.title);
          setDescription(res.data.data.task.description);
          console.log("Fetched task data:", res.data.data.task);
        } catch (err) {
          setTitle("");
          setDescription("");
        }
      };
      fetchTask();
    } else {
      setTitle(task?.title || "");
      setDescription(task?.description || "");
    }
  }, [task, open, isEdit]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (isEdit) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}`,
          { title, description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Task updated successfully!");
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
          { title, description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Task added successfully!");
        setTitle("");
        setDescription("");
      }
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      alert(isEdit ? "Failed to update task!" : "Failed to add task!");
      console.error(isEdit ? "Update task failed:" : "Add task failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? trigger : <Button>Add Task</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Task" : "Add Task"}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
