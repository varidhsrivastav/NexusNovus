import BlurPage from "@/components/global/blur-page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getStripeOAuthLink } from "@/lib/utils";
import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const processStripeConnection = async (code: string, subaccountId: string) => {
  try {
    const response = await stripe.oauth.token({
      grant_type: "authorization_code",
      code,
    });

    await db.subAccount.update({
      where: { id: subaccountId },
      data: { connectAccountId: response.stripe_user_id },
    });

    return true;
  } catch (error) {
    console.error("🔴 Could not connect Stripe account:", error);
    return false;
  }
};

const LaunchPad = async ({ params, searchParams }: any) => {
  const subaccountDetails = await db.subAccount.findUnique({
    where: {
      id: params.subaccountId,
    },
  });

  if (!subaccountDetails) {
    return null;
  }

  const allDetailsExist =
    subaccountDetails.address &&
    subaccountDetails.subAccountLogo &&
    subaccountDetails.city &&
    subaccountDetails.companyEmail &&
    subaccountDetails.companyPhone &&
    subaccountDetails.country &&
    subaccountDetails.name &&
    subaccountDetails.state;

  const stripeOAuthLink = getStripeOAuthLink(
    "subaccount",
    `launchpad___${subaccountDetails.id}`,
  );

  let connectedStripeAccount = subaccountDetails.connectAccountId
    ? true
    : false;

  if (searchParams?.code && !connectedStripeAccount) {
    connectedStripeAccount = await processStripeConnection(
      searchParams.code,
      params.subaccountId,
    );
  }

  return (
    <BlurPage>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full h-full max-w-[800px]">
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Let&apos;s get started!</CardTitle>
              <CardDescription>
                Follow the steps below to get your account set up correctly.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {/* Step 1: Save Shortcut */}
              <div className="flex justify-between items-center w-full h-20 border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <Image
                    src="/appstore.png"
                    alt="App logo"
                    height={80}
                    width={80}
                    className="rounded-md object-contain"
                  />
                  <p>Save the website as a shortcut on your mobile device</p>
                </div>
                <Button>Start</Button>
              </div>

              {/* Step 2: Connect Stripe */}
              <div className="flex justify-between items-center w-full h-20 border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <Image
                    src="/stripelogo.png"
                    alt="Stripe logo"
                    height={80}
                    width={80}
                    className="rounded-md object-contain"
                  />
                  <p>
                    Connect your Stripe account to accept payments. Stripe is
                    used to run payouts.
                  </p>
                </div>
                {connectedStripeAccount ? (
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

              {/* Step 3: Fill Business Details */}
              <div className="flex justify-between items-center w-full h-20 border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <Image
                    src={subaccountDetails.subAccountLogo}
                    alt="Business Logo"
                    height={80}
                    width={80}
                    className="rounded-md object-contain p-4"
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
                    href={`/subaccount/${subaccountDetails.id}/settings`}
                  >
                    Start
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BlurPage>
  );
};

export default LaunchPad;
