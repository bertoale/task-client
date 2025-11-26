"use client";

import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditProfile from "@/components/EditProfile";

interface Profile {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
export default function ProfilePage() {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.data.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // atau router.push("/login")
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Your Profile</CardTitle>
          <div className="flex gap-2">
            <EditProfile
              user={user}
              onUpdated={(u: SetStateAction<Profile | null>) => setUser(u)}
            />
            <Button onClick={handleLogout} variant={"destructive"}>
              Logout
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="font-medium">{user.username}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Created At</p>
                <p className="font-medium">
                  {new Date(user.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Updated At</p>
                <p className="font-medium">
                  {new Date(user.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <p>Failed to load user data.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
