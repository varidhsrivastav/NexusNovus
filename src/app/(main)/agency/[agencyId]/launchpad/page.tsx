import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { getStripeOAuthLink } from "@/lib/utils";
import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { stripe } from "@/lib/stripe";

type Props = {
  params: {
    agencyId: string;
  };
  searchParams: { code?: string };
};

const LaunchPadPage = async ({ params, searchParams }: Props) => {
  const agencyDetails = await db.agency.findUnique({
    where: { id: params.agencyId },
  });

  if (!agencyDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">Agency details not found.</p>
      </div>
    );
  }

  const allDetailsExist =
    agencyDetails.address &&
    agencyDetails.agencyLogo &&
    agencyDetails.city &&
    agencyDetails.companyEmail &&
    agencyDetails.companyPhone &&
    agencyDetails.country &&
    agencyDetails.name &&
    agencyDetails.state &&
    agencyDetails.zipCode;

  const stripeOAuthLink = getStripeOAuthLink(
    "agency",
    `launchpad___${agencyDetails.id}`,
  );

  let connectedStripeAccount = false;

  if (searchParams.code && !agencyDetails.connectAccountId) {
    try {
      const response = await stripe.oauth.token({
        grant_type: "authorization_code",
        code: searchParams.code,
      });
      await db.agency.update({
        where: { id: params.agencyId },
        data: { connectAccountId: response.stripe_user_id },
      });
      connectedStripeAccount = true;
    } catch (error) {
      console.error("🔴 Could not connect stripe account", error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-full max-w-[800px]">
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Let’s get started!</CardTitle>
            <CardDescription>
              Follow the steps below to set up your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* Step 1 */}
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image
                  src="/appstore.png"
                  alt="Save as mobile shortcut"
                  height={80}
                  width={80}
                  className="rounded-md object-contain"
                />
                <p>Save the website as a shortcut on your mobile device.</p>
              </div>
              <Button>Start</Button>
            </div>

            {/* Step 2 - Stripe Connection */}
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image
                  src="/stripelogo.png"
                  alt="Stripe Logo"
                  height={80}
                  width={80}
                  className="rounded-md object-contain"
                />
                <p>
                  Connect your Stripe account to accept payments and access your
                  dashboard.
                </p>
              </div>
              {agencyDetails.connectAccountId || connectedStripeAccount ? (
                <CheckCircleIcon
                  size={50}
                  className="text-primary p-2 flex-shrink-0"
                />
              ) : (
                <Link
                  className="bg-primary py-2 px-4 rounded-md text-white"
                  href={stripeOAuthLink}
                >
                  Start
                </Link>
              )}
            </div>

            {/* Step 3 - Business Details */}
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image
                  src={agencyDetails.agencyLogo}
                  alt="Agency Logo"
                  height={80}
                  width={80}
                  className="rounded-md object-contain"
                />
                <p>Fill in all your business details.</p>
              </div>
              {allDetailsExist ? (
                <CheckCircleIcon
                  size={50}
                  className="text-primary p-2 flex-shrink-0"
                />
              ) : (
                <Link
                  className="bg-primary py-2 px-4 rounded-md text-white"
                  href={`/agency/${params.agencyId}/settings`}
                >
                  Start
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaunchPadPage;
