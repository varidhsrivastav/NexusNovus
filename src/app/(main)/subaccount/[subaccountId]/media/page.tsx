import BlurPage from "@/components/global/blur-page";
import MediaComponent from "@/components/media";
import { getMedia } from "@/lib/queries";
import React, { Suspense } from "react";

const MediaPage = async ({ params }: any) => {
  try {
    const data = await getMedia(params.subaccountId);

    if (!data) {
      return (
        <BlurPage>
          <p className="text-center text-gray-500">No media available.</p>
        </BlurPage>
      );
    }

    return (
      <BlurPage>
        <Suspense fallback={<p className="text-center">Loading media...</p>}>
          <MediaComponent data={data} subaccountId={params.subaccountId} />
        </Suspense>
      </BlurPage>
    );
  } catch (error) {
    console.error("🔴 Error fetching media:", error);
    return (
      <BlurPage>
        <p className="text-center text-red-500">
          Failed to load media. Please try again.
        </p>
      </BlurPage>
    );
  }
};

export default MediaPage;
