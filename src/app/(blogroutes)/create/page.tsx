import CreateBlogScreen from "@/components/CreateBlogScreen";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
    const session = await getServerSession(authOptions)
    if (!session) redirect("/blog");
    return <CreateBlogScreen />;
};

export default page;
