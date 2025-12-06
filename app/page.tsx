export const dynamic = "force-dynamic"; 
// OR: export const revalidate = 0;

import AIBox from "@/components/AIBox";
import { Header } from "@/components/Header";
import { HomeClient } from "@/components/HomeClient";

async function getInitialUsers() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users?limit=5&page=1`, {
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

  const users = data.users || [];
  const totalPages = data.totalPages || 0;

  return (
    <>
      <AIBox />
      <Header />
      <HomeClient initialUsers={users} initialTotalPages={totalPages} />
    </>
  );
}
