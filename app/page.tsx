import AIBox from "@/components/AIBox";
import { Header } from "@/components/Header";
import { HomeClient } from "@/components/HomeClient";

async function getInitialUsers() {
  try {
    const res = await fetch(`/api/users?limit=5&page=1`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API failed:", errorText);
      throw new Error("Failed to fetch users");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return { users: [], totalPages: 0 };
  }
}


export default async function Home() {
  const data = await getInitialUsers();

  // Handle backend response structure (data.users or data directly)
  const users = data.users || [];
  const totalPages = data.totalPages || 0;

  return (
    <>
     <AIBox />
      <Header />
      <HomeClient initialUsers={users} initialTotalPages={totalPages} />;
    </>
  )
}