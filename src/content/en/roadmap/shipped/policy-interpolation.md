---
title: "Policy Interpolation"
description: "Deploy personalized device configurations at scale using dynamic variables"
category: "Platform Features"
priority: "medium"
team: "Platform Engineering"
quarter: "Q3 2025"
status: "Generally Available"
votes: 50
order: 1
---

# Policy Interpolation

## The Problem We're Solving
Configuring device-specific or user-specific settings across large fleets requires either manual configuration for each device (time-consuming and error-prone) or generic one-size-fits-all policies that don't meet individual needs. Teams often resort to maintaining dozens of policy variations or spreadsheets to track custom values.

## What It Does
Interpolation lets you use dynamic variables in your configurations and policies that automatically resolve to the correct values for each device or user. Write your policy once with placeholders, and the platform replaces them with actual values during deployment.

## How It Works

Instead of creating separate policies or manually entering values:
```
Device Name: Marketing-Laptop-042
Email: john.doe@company.com
Department: Marketing Team
```

You configure once using variables:
```
Device Name: {{department}}-Laptop-{{device.serial_short}}
Email: {{user.email}}
Department: {{user.department}}
```

The platform automatically substitutes the correct values for each device and user at deployment time.

## Key Benefits

### For IT Teams
- **90% faster deployment**: Configure hundreds of devices with a single policy
- **Zero copy-paste errors**: Variables ensure consistency across the fleet
- **Automatic updates**: When user details change, configurations update automatically
- **Easier maintenance**: Update one policy instead of managing multiple variations

### For Compliance & Audit
- **Standardized naming**: Enforce consistent device naming conventions across the organization
- **Accurate records**: Device and user information always matches your source of truth
- **Audit trails**: Clear visibility into which values were applied and when

## Available Variables

- **User attributes**: Name, email, department, employee ID, location
- **Device properties**: Serial number, model, OS version, enrollment date
- **Custom fields**: Any custom attributes you've defined in your organization
- **Organizational data**: Team names, cost centers, office locations

## Common Use Cases

**Device Naming**: Create consistent, descriptive device names automatically  
`{{user.location}}-{{device.type}}-{{user.department}}-{{device.serial_short}}`

**Email Configuration**: Set up user-specific email signatures and settings  
`Sent from {{user.name}}'s {{device.model}}`

**Network Settings**: Assign department-specific WiFi profiles  
`SSID: {{department}}-Secure | Username: {{user.email}}`

**App Configurations**: Pre-populate user details in managed apps  
`Display Name: {{user.full_name}} | License: {{user.license_id}}`

## Getting Started

1. **Identify repetitive configurations** where you're manually entering similar values
2. **Replace static values** with interpolation variables in your policies
3. **Test with a small group** to verify the variables resolve correctly
4. **Deploy at scale** knowing each device gets personalized settings automatically

Variables work in all policy types: compliance rules, app configurations, device restrictions, and custom profiles.

---

*Last updated: November 2025*  
*Status: Generally Available*