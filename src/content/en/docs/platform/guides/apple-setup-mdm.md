---
title: "Setup Apple Device Management"
description: "Setting up Apple Device Management with Applivery involves enabling your workspace to interact with Apple services and registering your Apple Enterprise organization through a few essential setup steps."
keywords: ['apple device management', 'apple mdm setup', 'applivery configuration', 'push certificate creation', 'csr download', 'device management guide', 'applivery apple services', 'mdm integration steps', 'enterprise device management', 'apple business manager']
pubDate: '2024-06-03'
updatedDate: '2024-06-03'
author: Paulo Lima
section: "Apple MDM Setup"
type: article
canonical: 'https://learn.applivery.com/learn/device-management/apple-mdm-setup'
audience: "administrators"
platform: "iOS, macOS"
schema_type: "HowTo"
---

# How to get started with Apple Device Management?

Getting started with Apple Device Management on Applivery involves enabling your workspace to interact with Apple services and registering your Apple Enterprise organization through a few essential setup steps.

Before starting using Applivery Apple Device Management there are a few steps you must go through in order to enable your workspace to interact with Apple services and register your Apple Enterprise organization. The next steps will guide you through the process:

## How to download Applivery's Certificate Signing Request (CSR)?

- Sign-in to the [Applivery Dashboard](https://dashboard.applivery.io/) and navigate to Device Management > Configuration > Apple > Setup. Beside the step 1, click the Download CSR button.
![Screenshot of Applivery dashboard showing step 1 for Apple MDM setup with download CSR button](https://www.applivery.com/wp-content/uploads/2022/05/Screenshot-2024-02-15-at-001813-1024x651.png)
A file named Applivery-CSR.csr will be downloaded in your computer.

**Applivery TL;DR:**
- Streamline Apple Device Management setup by first downloading the CSR.
- Ensure secure communication with Apple services for enterprise organizations.
- Initiate MDM integration directly from the Applivery dashboard.

## How do you create an Apple Push Certificate?

Now visit [Apple Push Certificate Portal](https://identity.apple.com/pushcert/) and login with your Apple ID. Once inside the portal, click on Create a Certificate button.
![Screenshot of Apple Push Certificate Portal with create a certificate button highlighted](https://www.applivery.com/wp-content/uploads/2022/05/applivery-apple-push-portal-1024x651.png)
Read and accept the Terms of Use:
![Screenshot of Apple Push Certificate Portal terms of use agreement](https://www.applivery.com/wp-content/uploads/2022/05/applivery-apple-push-terms-1024x651.png)
Select and upload the Applivery-CSR.csr file you downloaded in Step 1 and click Upload.
![Screenshot of Apple Push Certificate Portal showing file upload section for CSR](https://www.applivery.com/wp-content/uploads/2022/05/applivery-apple-push-upload-1024x651.png)
Click on Download and save the certificate .pem file.
![Screenshot of Apple Push Certificate Portal showing download button for the .pem certificate](https://www.applivery.com/wp-content/uploads/2022/05/apple-push-download-1024x651.png)

## How to upload your Apple Push Certificate to Applivery?

Now get back to Applivery’s dashboard and, beside step 5, click Select and upload the certificate (.pem file) downloaded from the previous step. then click Finish registration button to finish.
![Screenshot of Applivery dashboard showing step 5 for Apple MDM setup to upload the .pem certificate](https://www.applivery.com/wp-content/uploads/2022/05/Screenshot-2024-02-15-at-002200-1024x651.png)