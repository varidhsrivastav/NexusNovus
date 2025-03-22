import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/db";
import {
  getLanesWithTicketAndTags,
  getPipelineDetails,
  updateLanesOrder,
  updateTicketsOrder,
} from "@/lib/queries";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import PipelineInfoBar from "../_components/pipeline-infobar";
import PipelineSettings from "../_components/pipeline-settings";
import PipelineView from "../_components/pipeline-view";

const PipelinePage = async ({ params }: any) => {
  try {
    // Fetch all data in parallel for better performance
    const [pipelineDetails, pipelines, lanes] = await Promise.all([
      getPipelineDetails(params.pipelineId),
      db.pipeline.findMany({ where: { subAccountId: params.subaccountId } }),
      getLanesWithTicketAndTags(params.pipelineId),
    ]);

    // Redirect if pipeline details are missing
    if (!pipelineDetails) {
      return redirect(`/subaccount/${params.subaccountId}/pipelines`);
    }

    return (
      <Tabs defaultValue="view" className="w-full">
        <TabsList className="bg-transparent border-b-2 h-16 w-full justify-between mb-4">
          <PipelineInfoBar
            pipelineId={params.pipelineId}
            subAccountId={params.subaccountId}
            pipelines={pipelines}
          />
          <div>
            <TabsTrigger value="view">Pipeline View</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="view">
          <Suspense
            fallback={<p className="text-center">Loading pipeline...</p>}
          >
            <PipelineView
              lanes={lanes || []}
              pipelineDetails={pipelineDetails}
              pipelineId={params.pipelineId}
              subaccountId={params.subaccountId}
              updateLanesOrder={updateLanesOrder}
              updateTicketsOrder={updateTicketsOrder}
            />
          </Suspense>
        </TabsContent>
        <TabsContent value="settings">
          <Suspense
            fallback={<p className="text-center">Loading settings...</p>}
          >
            <PipelineSettings
              pipelineId={params.pipelineId}
              pipelines={pipelines}
              subaccountId={params.subaccountId}
            />
          </Suspense>
        </TabsContent>
      </Tabs>
    );
  } catch (error) {
    console.error("🔴 Error loading pipeline:", error);
    return (
      <p className="text-center text-red-500">
        Failed to load the pipeline. Please try again later.
      </p>
    );
  }
};

export default PipelinePage;
