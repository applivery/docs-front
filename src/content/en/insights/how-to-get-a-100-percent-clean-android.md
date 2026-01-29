---
title: 'How to Get a 100% Clean Android with Smart Enrollment?'
description: 'Smart Enrollment enables a 100% clean Android experience by automatically removing manufacturer bloatware during provisioning for secure, efficient devices.'
heroImage: 'https://www.applivery.com/wp-content/uploads/2025/09/Applivery-Smart_Enrollment_Update.jpg'
imageAlt: 'Smart Enrollment feature enabling 100% clean Android device provisioning'
keywords:
  - 100% clean Android
  - Android Smart Enrollment
  - bloatware removal Android
  - Android device management
  - Applivery
  - automatic bloatware removal
  - Android Enterprise provisioning
  - device security
  - fleet management
  - enterprise Android
pubDate: 2025-01-10
updatedDate: 2025-01-10
author: Paulo Lima
category: Mobile Device Management
section: Android Enrollment
type: article
canonical: https://learn.applivery.com/how-to-get-a-100-percent-clean-android/
tags: ['100% clean Android', 'Android Smart Enrollment', 'bloatware removal', 'Applivery']
audience: business
difficulty: intermediate
platform: Android
schema_type: TechArticle
---

# How can you get a 100% clean Android using the latest Smart Enrollment update?

Smart Enrollment provides a 100% clean Android experience by automatically removing manufacturer bloatware during provisioning, delivering secure and optimized devices from day one. It integrates bloatware removal into Android device management for effortless fleet standardization.

## What challenges does bloatware cause in Android enterprise deployments?

The arrival of new Android devices at a company often reveals the same challenge: a screen cluttered with the manufacturer’s bloatware. This software is not only a performance drain but also a security risk that forces you into a manual, repetitive, and inconsistent cleanup process. To directly address this friction point, we at [Applivery](https://www.applivery.com/solutions/android-device-management/) have refined our system with the latest update to our Android Smart Enrollment feature. Now, removing these apps is an automatic, integrated process that gives you full control to deploy a clean and secure fleet from day one. Let us show you how it works.

### What are the hidden costs of bloatware in the enterprise?

In corporate Android deployments, the presence of pre-installed applications from manufacturers (OEMs) is a constant challenge. This software, often of questionable utility, creates three main issues for any IT administrator:

- **Security risks:** every third-party app you don’t control is a potential attack vector. Unpatched vulnerabilities in these apps can compromise the security of the entire device and, by extension, your corporate network.

- **Resource consumption and performance:** Bloatware runs in the background, consuming RAM, CPU, and battery life. This results in slower devices and a frustrating user experience that generates unnecessary support tickets.

- **Lack of standardization:** managing a fleet with devices from different manufacturers means dealing with various customization layers and sets of pre-installed apps. This makes it extremely difficult to create a uniform and controlled user experience.

For a professional like you, who seeks maximum efficiency and security, dealing with these variables is a waste of time and a constant source of concern.

![Android enrollment with Applivery MDM](https://www.applivery.com/wp-content/uploads/2025/09/Android-enrrollment-devices--768x512.jpg)

**Applivery TL;DR:**
- Automate bloatware removal during Android Smart Enrollment.
- Gain secure, standardized, and better-performing devices.
- Simplify fleet management with one-click controls.

## How does the Android Enterprise technical solution remove bloatware?

Fortunately, Android Enterprise offers an official mechanism to tackle this issue. The solution is based on a parameter within the DevicePolicyManager called `EXTRA_PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED`. In plain language, this parameter is a boolean (true or false) that tells the system what to do with non-essential apps during provisioning:

- If set to **true**, the device retains all system applications, including all manufacturer bloatware.

- If set to **false** (or not specified), the system defaults to disabling all applications that it does not consider vital for its operation.

This is the key to achieving a clean device. However, implementing this manually often requires editing JSON files or navigating complex settings, a process that is prone to errors and takes up time you don’t have.

## How does Applivery simplify bloatware removal with Smart Enrollment?

We know your time is limited and that technological complexity creates frustration. That’s why at [Applivery](https://www.applivery.com/solutions/android-device-management/) we have integrated this powerful functionality directly into our console in an incredibly simple way: through a single toggle switch in the Android Smart Enrollment [settings](https://www.google.com/search?q=URL_TO_PRODUCT_OR_DOCS_PAGE). Here’s how we translate that complex technical setting to speak your language:

- **Toggle OFF (default option):** Applivery automatically sets the parameter to false. When the device is provisioned, all non-vital system apps will be disabled. This is the foundation of our acclaimed automatic bloatware removal feature.

- **Toggle ON:** If, for some reason, you need to keep all the manufacturer’s apps, you just have to activate this option. Applivery will set the parameter to true, and the device will retain all factory software.

With this simple choice, we give you full control without needing advanced technical knowledge, allowing you to be more productive and efficient.

[Book a demo](https://www.applivery.com/demo/)

## What are the steps to provision a 100% clean Android device with Applivery?

Using this feature is so easy it feels like magic. Just follow these steps:

- **Navigate to the Smart Enrollment section:** in your [Applivery console](https://www.applivery.com/docs/mobile-device-management/android-mdm/enrollment/smart-enrollment/), go to Device Management > Enrollment > Android Smart enrollment and create a new configuration.

- **Locate the key option:** during setup, look for the toggle switch named “Leave all system apps enabled”.

- **Leave it disabled:** to achieve automatic bloatware removal, simply ensure the toggle is in its default (off) position.

- **Provision your devices:** use the generated enrollment token to register your devices. You will see them arrive in your users’ hands completely clean, secure, and ready for productivity.

![Android Smart Enrollment Update](https://www.applivery.com/wp-content/uploads/2025/09/Android-Smart-Enrrolment-Update-768x472.jpg)

## Why is having a bloatware-free fleet valuable for your business?

At the end of the day, a feature is only useful if it solves real-world challenges. Here is what you gain by using Applivery’s bloatware removal:

- **Fewer risks, more peace of mind:** by disabling dozens of uncontrolled applications, you dramatically reduce the entry points for attackers, strengthening your company’s security.

- **Maximum productivity:** fewer background processes mean more available memory and resources. The result is a better-performing device and a happier, more productive end-user.

- **Full control and standardization:** no more inconsistencies between manufacturers. With this feature, you ensure that all devices in your fleet start from the same clean and secure baseline.

- **Flexibility tailored to you:** need a specific system app? No problem. You can always enable the toggle or create policies to enable specific apps ([sample policies](https://www.applivery.com/docs/mobile-device-management/android-mdm/policies/sample-policies/)), giving you granular control.

## How does Applivery empower your fleet management with Smart Enrollment?

The `PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED` key is the official Android Enterprise mechanism for deciding the fate of bloatware. Applivery makes it incredibly easy to use. We have integrated this capability into a simple toggle within Android Smart Enrollment so that with a single click, you can provision safer, faster, and more consistent devices. It is further proof of our commitment to offering you a powerful platform that speaks your language and solves your daily challenges.

To see it in action, [request a personalized demo](https://www.applivery.com/demo/), or for more technical details, consult our [documentation](https://www.applivery.com/docs/mobile-device-management/android-mdm/enrollment/smart-enrollment/).

![Applivery Header](https://www.applivery.com/wp-content/uploads/2024/06/Applivery-Header-emails-768x179.png)