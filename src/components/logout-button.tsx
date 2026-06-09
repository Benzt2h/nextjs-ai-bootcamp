'use client'

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

export default function LogoutButton() {

  const handleLogout = async () => {
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
            window.location.reload();    
        }
        }
    });
  }
  
  return (
    <Button variant="secondary" size="sm" onClick={handleLogout}>
      ออกจากระบบ
    </Button>
  );
}