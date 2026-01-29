---
title: "Types Devices"
description: "Explore the diversity of endpoints in modern organizations — from mobile devices and laptops to IoT systems and virtual desktops — and learn how each requires specific management strategies."
order: 3
type: "article"
---

# Types of Manageable Devices

Not all devices are created equal in the context of Unified Endpoint Management (UEM). Each device type — mobile, laptop, desktop, or IoT — has its own operating systems, management capabilities, connectivity models, and risk profiles. Understanding these differences is essential to apply the right management strategy and policy controls.

This lesson introduces the **main categories of manageable devices**, explains their unique characteristics, and describes how they are integrated into UEM platforms such as Applivery.

## Mobile Devices

**Examples:** smartphones and tablets running iOS, iPadOS, or Android

Mobile devices are the most dynamic endpoints in any organization. They operate over diverse networks (Wi-Fi, LTE, 5G), often outside corporate boundaries, and handle sensitive data through both native and corporate applications.

**Key management features:**

* Enrollment through **Apple ABM/ASM** or **Android Zero-Touch**
* Enforcement of security policies (passcode, encryption, biometrics)
* Application management and app catalog delivery
* Remote actions: lock, wipe, locate, or reset
* Work/personal data separation (BYOD, COPE modes)

**Applivery capabilities:** Applivery integrates directly with **Apple MDM/DDM** and **Android Enterprise** APIs to manage enrollment, compliance, and app lifecycle. Its agent enhances telemetry and automation beyond OS-level APIs.

## Laptops and Desktops

**Examples:** Windows and macOS computers (corporate or personal)

These endpoints remain the backbone of corporate productivity. They host advanced business applications, connect to local and cloud services, and often store or process confidential information.

**Key management features:**

* Enrollment via **Windows Autopilot** or **Apple ABM**
* Device hardening (firewall, FileVault/BitLocker, Gatekeeper, Secure Boot)
* OS and app patch automation
* Compliance enforcement and vulnerability scanning
* Integration with IdP for conditional access

**Applivery capabilities:** Through **Windows MDM (OMA-DM/CSP)** and **macOS Declarative Management**, Applivery delivers unified policies, patch automation, and cross-platform compliance. The **Applivery Agent** extends visibility into installed apps, software versions, and security posture.

## IoT and Specialized Devices

**Examples:** digital signage, POS systems, kiosks, scanners, industrial handhelds, and embedded IoT devices

IoT and rugged endpoints represent a growing category within enterprise infrastructure. While their management capabilities depend on the operating system, many now support MDM integration or lightweight agents.

**Key management features:**

* Kiosk and dedicated modes (single-app environments)
* Remote configuration and firmware updates
* Telemetry for device health and availability
* Policy enforcement to restrict access or connectivity
* Remote access and control

**Applivery capabilities:** Applivery can manage Android-based or Windows IoT devices through native APIs and agent-based supervision, ensuring consistent visibility and security compliance across industrial and retail environments.

## Virtual and Cloud-Based Endpoints

**Examples:** VDI sessions, cloud PCs, or containerized workspaces

As organizations move workloads to the cloud, virtual endpoints have become a key part of modern IT ecosystems. They require similar governance to physical devices but operate in controlled, virtualized environments.

**Key management features:**

* Lifecycle control of virtual desktops and session pools
* Policy synchronization between physical and virtual environments
* Integration with IdP for single sign-on and access control
* Monitoring of performance and compliance posture
* Remote access and control

**Applivery capabilities:** Applivery can manage virtual endpoints as part of its unified inventory, applying the same compliance and patch rules as physical devices, ensuring a seamless experience for hybrid environments.

## BYOD and Shared Devices

**Examples:** employee-owned devices or devices used by multiple users (e.g., retail, education)

These models introduce new challenges for IT governance and privacy. The goal is to maintain security without compromising user autonomy or personal data.

**Key management features:**

* User enrollment and dynamic profile assignment
* Separation of personal and corporate data containers
* Conditional access based on compliance state
* Self-service portals for enrollment or troubleshooting

**Applivery capabilities:** Applivery supports **User Enrollment (Apple)** and **Work Profile (Android)** models, allowing IT teams to deploy corporate apps and policies in a privacy-respecting, isolated environment.

## Comparative Summary

| Device Type | Common OS | Typical Enrollment | Management Model | Risk Profile | Applivery Integration |
|----|----|----|----|----|----|
| **Mobile** | iOS, iPadOS, Android | ABM/ASM, Zero-Touch | MDM/DDM | Medium–High | Native API + Agent |
| **Laptop/Desktop** | Windows, macOS | Autopilot, ABM | MDM + Agent | High | Native API + Agent |
| **IoT/Specialized** | Android IoT, Windows IoT | Manual/Zero-Touch | MDM/Agent | Medium | Native API + Agent |
| **Virtual** | Windows, Linux | Cloud-based | API | Medium | Unified Inventory |
| **BYOD/Shared** | iOS, Android | User Enrollment, Work Profile | Container-based | Variable | Privacy-aware MDM |

## Key Takeaways

* Modern enterprises must manage diverse device types with different operating systems, connectivity models, and risk profiles
* Mobile devices require enrollment automation, app management, and work/personal data separation
* Laptops and desktops remain critical productivity tools requiring hardening, patching, and compliance enforcement
* IoT and specialized devices need kiosk modes, remote configuration, and health monitoring
* Virtual endpoints require unified inventory and policy synchronization with physical devices
* BYOD and shared device models demand privacy-respecting containerization and conditional access
* Applivery's API-first design and hybrid agent model provide consistent management across all device categories

## Next Steps

Understanding the types of devices is crucial, but organizations must also decide how these devices are owned and controlled. Proceed to **Lesson 4: Enterprise Use Cases and Ownership Models** to learn about BYOD, COPE, CYOD, and COBO strategies and how they impact security, privacy, and operational efficiency.