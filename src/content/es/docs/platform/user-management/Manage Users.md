---
title: Managing Users
description: Applivery has eight user types in two categories for granular access control and visibility over app usage across your organization.
updatedDate: 2024-04-27
heroImage: ''
---

# What types of users does Applivery have?

Applivery features eight distinct types of users divided into two main categories. These roles allow you to manage access to resources, apps, and devices while maintaining visibility over app usage across your organization.

## What types of users exist in Applivery?

There are 8 types of users in Applivery, divided into **two categories**: Collaborators and Employees.

## What are Collaborators in Applivery?

Collaborators have administrative permissions over your projects (Apps). Access levels differ depending on the assigned role.

| Role        | Description |
|-------------|-------------|
| **Owner**      | Super-administrator of your workspace. Only one per workspace. |
| **Admin**      | Manages Developers. Administrative permissions over Apps, Devices, or Workspaces. Full access except Billing. |
| **Editor**     | Can upload builds and manage devices. Basic administrative permissions. Read-only access to Distribution and Settings. No Billing access. Cannot remove devices. |
| **Viewer**     | Read-only permissions for all resources. No access to Billing, People, or Settings. |
| **Unassigned** | No access to resources. Can be assigned app-level permissions. |

![organization-user](https://www.applivery.com/wp-content/uploads/2022/07/Screenshot-2024-02-20-at-021808-1024x651.png)

## What are Employees in Applivery?

Employees represent end-users who access your apps. Permissions can be customized both at the **App level** and **Organization level**.

Employees are divided into five categories, depending on how the account was created.

| Origin        | Description |
|---------------|-------------|
| **Dashboard**   | Invited from the dashboard. They receive an email to register and access the App Store. |
| **SSO**         | Automatically created when logging into the App Store using Single Sign-On. |
| **SDK**         | Named employees (with at least a known email) created programmatically using the `bindUser()` method of the Applivery SDK. |
| **SDK temporal** | Unknown users automatically created by the SDK to identify the device. Unique per device ID and expires after 30 days of inactivity. |

![sdk-users](https://www.applivery.com/wp-content/uploads/2022/07/Screenshot-2024-02-20-at-022202-1024x651.png)

---

### Applivery TL;DR

- Applivery defines **8 user types**, divided into Collaborators and Employees.
- Collaborators hold administrative access with different permission scopes.
- Employees are end-users with customizable permissions, created via dashboard invites, SSO, or SDK.