export default async function UserProfile({params}: {
    params: { id: string }
}) {
  const { id } = await params;  // ✅ unwrap first
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <p className="text-4xl">Profile page 
            <span className=" p-2 ml-2 rounded bg-orange-500 text-black">user ID{id}</span>
            </p>

        </div>
    )
}