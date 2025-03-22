import { db } from "@/lib/db";
import DataTable from "./data-table";
import { Plus } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { columns } from "./columns";
import { Suspense, lazy } from "react";

// Lazily load the Client Component to avoid rendering issues
const SendInvitation = lazy(() => import("@/components/forms/send-invitation"));

const TeamPage = async ({ params }: any) => {
  const authUser = await currentUser();
  if (!authUser) return null;

  const [teamMembers, agencyDetails] = await Promise.all([
    db.user.findMany({
      where: { Agency: { id: params.agencyId } },
      include: {
        Agency: { include: { SubAccount: true } },
        Permissions: { include: { SubAccount: true } },
      },
    }),
    db.agency.findUnique({
      where: { id: params.agencyId },
      include: { SubAccount: true },
    }),
  ]);

  if (!agencyDetails) return null;

  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
          Add
        </>
      }
      modalChildren={
        <Suspense fallback={<div>Loading...</div>}>
          <SendInvitation agencyId={agencyDetails.id} />
        </Suspense>
      }
      filterValue="name"
      columns={columns}
      data={teamMembers}
    />
  );
};

export default TeamPage;
