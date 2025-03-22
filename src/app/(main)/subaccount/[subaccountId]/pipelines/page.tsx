import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: { subaccountId: string };
};

const Pipelines = async ({ params }: Props) => {
  try {
    // Check if a pipeline already exists
    let pipeline = await db.pipeline.findFirst({
      where: { subAccountId: params.subaccountId },
    });

    // If no pipeline exists, create one
    if (!pipeline) {
      pipeline = await db.pipeline.create({
        data: { name: "First Pipeline", subAccountId: params.subaccountId },
      });
    }

    // Redirect to the existing or newly created pipeline
    return redirect(
      `/subaccount/${params.subaccountId}/pipelines/${pipeline.id}`,
    );
  } catch (error) {
    console.error("🔴 Error in Pipelines component:", error);
    return (
      <p className="text-center text-red-500">
        Failed to load or create pipeline. Please try again.
      </p>
    );
  }
};

export default Pipelines;
