---
title: "Endpoint Introduction"
description: "Learn the fundamental definition of endpoints, their taxonomy, lifecycle, and key attributes that form the foundation of modern endpoint management."
order: 1
type: "article"
---

# What is an Endpoint?

An **endpoint** is any **computing asset that serves as the final point of interaction** with a network or digital service and **runs software and processes/stores data**, whether **used by a human** or **by another service**. In UEM (Unified Endpoint Management), we mainly focus on **end-user endpoints** (computers, smartphones, tablets) and **special-purpose devices** (kiosks, POS systems, rugged devices, etc.).

:::note
In Applivery, when we talk about an "endpoint," we usually refer to a managed device (physical or virtual) that appears in the inventory with its identity, operating system, applied policies, and compliance state.
:::

## Criteria for Identifying an Endpoint

Before classifying an asset as an endpoint, it's important to evaluate a few criteria. These help IT teams distinguish endpoints from other network-connected elements such as routers, switches, or servers. The following list describes the most common features that define an endpoint:

* It **terminates communication** (does not route for others like a router does)
* It **runs an operating system** or runtime capable of executing apps/services
* It **stores or processes data** (temporary or persistent)
* It has a unique **identity** (serial number, UUID, certificate, device ID) and **affiliation** (user, department, owner)
* It **can be managed** through policies, agents, or management protocols (MDM, APIs, etc.)

This classification ensures that only the right assets are onboarded into UEM systems, allowing administrators to focus resources on devices that directly influence the security posture of the organization.

## Endpoint Taxonomy (UEM Perspective)

| Dimension | Categories | Examples |
|----|----|----|
| **Usage role** | End user · Purpose-built · Headless | Laptop, iPhone · Kiosk, POS · IoT gateway |
| **Nature** | Physical · Virtual | MacBook, Zebra TC5X · Windows 11 VDI, macOS VM |
| **Operating system** | Windows · macOS · iOS/iPadOS · Android · Others | Win 10/11 · macOS 13–15 · iOS/iPadOS 16–18 · AE/COPE · ChromeOS, Linux |
| **Ownership** | COBO · COPE · BYOD | Corporate-only · Corporate/Personal split · Personal with controls |
| **Connectivity** | Always-on · Intermittent · Offline-first | Office · Field · Rugged |
| **Management method** | Native MDM · UEM Agent · EDR/RMM | Apple MDM/DDM · Applivery Agent · Defender/EDR |

<br>

:::note
In UEM, we typically exclude networking gear (switches, routers, firewalls) and data center servers, unless they are user-assigned or act as virtual desktops (VDI) that represent an endpoint.
:::

This classification is crucial because the management strategy, policies, and compliance checks often depend on which type of endpoint is being handled.

## Examples and Non-Examples

Understanding which assets qualify as endpoints is essential for inventory accuracy and for defining scope within compliance or patching frameworks. Below are examples that illustrate the distinction between endpoints and non-endpoints:

**Endpoints (in UEM):**

* Laptops and desktops (Windows, macOS)
* Smartphones and tablets (iOS/iPadOS, Android)
* Rugged devices, scanners, handhelds
* Thin clients and **VDI** (if representing a user's workstation)
* Kiosks, digital signage, POS systems

**Not typically endpoints (in UEM):**

* Network equipment: routers, switches, load balancers
* Headless back-office systems: servers, security appliances
* Ephemeral containers: DevOps workloads that fall outside UEM scope

This separation ensures that IT and security teams don't overload their endpoint management systems with assets that require entirely different management approaches.

## Key Endpoint Attributes (Inventory)

Every endpoint must be associated with a set of structured attributes to make it manageable. These data points form the backbone of any UEM platform's **inventory module** and enable advanced use cases like compliance, patch automation, or risk scoring.

A managed endpoint should record at least the following data:

* **Device identity:** serial number, Device ID/UDID, asset tag
* **Ownership and assignment:** owner (user/group), ownership mode (COBO/COPE/BYOD), location
* **System:** platform (Windows/macOS/iOS/Android), version/build, kernel, build number
* **Hardware:** model, CPU, RAM, storage, battery (if applicable), peripherals
* **Security:** encryption (BitLocker/FileVault), secure boot, firewall, EDR/AV state, certificates, compliance
* **Software:** installed applications (version, vendor), agent footprint, key services
* **Network:** IP/MAC (where relevant), VPN, Wi-Fi profiles, posture
* **Telemetry:** patch level, last check-in, health metrics
<br>
:::note
In Applivery UEM, these attributes support modules such as Inventory, Compliance, Patching, Vulnerability Management, and Automation.
:::

Having consistent data across these fields is vital for reporting and for detecting deviations that might compromise compliance or security.

## Endpoint Lifecycle

Endpoints follow a well-defined lifecycle from procurement to retirement. Understanding this lifecycle helps administrators plan and automate management workflows efficiently.

1. **Acquisition:** purchase and zero-touch enrollment (Apple ABM/ASM, Windows Autopilot, Android Zero-Touch)
2. **Provisioning:** profile configuration, certificate issuance, device hardening, app installation, encryption, and account setup
3. **Operation:** normal daily use, helpdesk support, self-service tools, dynamic policies, and conditional access
4. **Maintenance:** OS and app patching, credential or certificate rotation, automated remediation
5. **Audit:** compliance checks, evidence collection, reporting, and attestations
6. **Reassignment:** selective wipe, re-provisioning, or role reassignment
7. **Retirement:** secure wipe, asset removal from inventory, destruction or recycling with traceability

Each of these phases can be partially or fully automated using Applivery's management policies and workflows.

## Security and Risk (Why Endpoints Matter)

Endpoints represent one of the most exposed and dynamic parts of any IT infrastructure. Their constant connectivity and mobility make them both essential and risky. Understanding this is key to modern cybersecurity.

* **Largest attack surface:** endpoints are mobile, often exposed to public networks, and run diverse software
* **Attack vector:** they are common entry points for phishing, malware, and lateral movement
* **Data sensitivity:** endpoints handle personal and corporate data, requiring encryption, DLP, and app control
* **Regulatory pressure:** frameworks like GDPR, ISO 27001, SOC 2, and ENS require endpoint oversight

**Typical UEM/EDR controls:** encryption enforcement, device isolation, remote wipe, compliance enforcement, posture checks, patch baselines, and app allow/deny lists.

## Management Channels and Methods

There are different ways to manage endpoints depending on their platform and capabilities. Each method provides a specific level of control, visibility, and automation.

* **MDM:** manages configuration profiles, declarative policies, managed apps, and user enrollment. In the case of Windows devices uses policy CSPs and OMA URIs to enforce configurations and updates
* **Android Enterprise:** leverages Device Owner (COBO/COPE) or Work Profile (BYOD) modes for policy enforcement
* **UEM Agent:** extends management with advanced inventory, telemetry, patch automation, and remediation
* **Security integrations:** connects with EDR/AV, IdP (for conditional access), VPN, and ZTNA systems

Choosing the right management channel often depends on organizational goals, regulatory requirements, and the desired depth of control.

## Key Takeaways

* An endpoint is a computing asset that terminates network communication and runs software or processes data
* Endpoints are classified by usage role, nature, OS, ownership, connectivity, and management method
* A complete inventory requires structured attributes covering identity, hardware, software, security, and telemetry
* The endpoint lifecycle spans from acquisition to retirement, with multiple automation opportunities
* Endpoints are the primary attack surface in modern IT, requiring comprehensive security controls
* Multiple management channels (MDM, agents, integrations) provide flexible control options

## Next Steps

Now that you understand what an endpoint is and how it's managed, move on to **Lesson 2: Evolution from Device Management to Endpoint Management** to learn how the industry has evolved and why modern UEM platforms like Applivery take a unified approach.