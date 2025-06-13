// import { generateComponents } from '@uploadthing/react'
// import { generateReactHelpers } from '@uploadthing/react/hooks'

// import type { OurFileRouter } from '@/app/api/uploadthing/core'

// export const { UploadButton, UploadDropzone, Uploader } =
//   generateComponents<OurFileRouter>()

// export const { useUploadThing, uploadFiles } =
//   generateReactHelpers<OurFileRouter>()

// Updated imports
// @ts-nocheck
import { generateUploadButton, generateUploadDropzone } from '@uploadthing/react';
import { generateReactHelpers } from '@uploadthing/react';

import type { OurFileRouter } from '@/app/api/uploadthing/core';

// Use the new functions for generating components
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

// Use React helpers
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
