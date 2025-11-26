"use client";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect } from "react";
import { use, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskDialog from "@/components/TaskDialog";

interface Tasks {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export default function TaskPage() {
  const [tasks, setTasks] = React.useState<Tasks[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (taskId: number, isCompleted: boolean) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
        { isCompleted },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error toggling task:", error);
    }
    fetchTasks();
  };

  const deleteTask = async (taskId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task!");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-4 px-10">
        <TaskDialog onSuccess={fetchTasks} />
      </div>

      <div className="flex w-full flex-col gap-8 p-8">
        <Card className="px-10">
          <Table>
            <TableCaption>A list of your tasks.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Completed</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                tasks.map((task, index) => (
                  <TableRow
                    className={
                      task.isCompleted ? "line-through text-gray-400" : ""
                    }
                    key={task.id}
                  >
                    <TableCell className={"font-medium"}>{index + 1}</TableCell>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell className="text-center">
                      <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={(e) => toggleTask(task.id, e.target.checked)}
                        className="accent-black w-5 h-5 cursor-pointer"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <TaskDialog
                        task={task}
                        onSuccess={fetchTasks}
                        trigger={
                          <button
                            className="mr-2 text-black hover:text-blue-800"
                            title="Edit"
                            type="button"
                          >
                            <Pencil size={18} />
                          </button>
                        }
                      />
                      <button
                        className="text-black hover:text-red-800 ml-2"
                        title="Delete"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
