---
title: "Device Audiences"
description: "Dynamic fleet segmentation based on device and user properties for targeted management"
category: "Enterprise Features"
team: "Device Management"
vote: 30
priority: "high"
quarter: "Q3 2025"
status: "Private Access"
plan: "Enterprise"
order: 3
---

# Device Audiences

## The Problem We're Solving
Managing large device fleets requires targeting specific subsets—devices running outdated OS versions, specific models with known issues, users in certain departments, or devices enrolled through particular programs. Manual group management doesn't scale, and static lists become outdated the moment devices change state or new devices enroll.

## What It Does
Device Audiences automatically segment your fleet based on real-time device properties, user attributes, or custom criteria. Create smart groups that update dynamically as your environment changes—no manual list maintenance required.

## How It Works

Define audience criteria using device and user properties:
```
Audience: "iOS Devices Needing Update"
- OS Type = iOS
- OS Version < 17.0
- Enrollment Status = Active
→ Automatically includes 247 devices
```
```
Audience: "Sales Team Android"
- OS Type = Android
- User Department = Sales
- Device Model contains "Samsung"
→ Automatically includes 89 devices
```

As devices update, users change departments, or new devices enroll, audiences update automatically. Target policies, apps, or configurations to these audiences without manual intervention.

## Key Benefits

### For IT Teams
- **Zero maintenance**: Audiences update automatically as device properties change
- **Precise targeting**: Combine multiple criteria for exact fleet segmentation
- **Faster response**: Instantly identify and target affected devices when issues arise
- **Simplified workflows**: Replace manual spreadsheets and static lists

### For Phased Rollouts
- **Risk mitigation**: Test policies on small audiences before broad deployment
- **Progressive updates**: Roll out OS updates or app versions in controlled stages
- **Automatic graduation**: Devices move between rollout phases as they update
- **Rollback precision**: Quickly target and revert specific device segments if issues occur

### For Complex Organizations
- **Multi-dimensional segmentation**: Combine user properties, device characteristics, and enrollment types
- **Separate BYOD and corporate devices**: Different rules for different ownership models
- **Geographic targeting**: Deploy region-specific configurations automatically
- **Compliance segmentation**: Group devices by regulatory requirements

## Available Criteria

**Device Properties**
- OS type, version, and build number
- Device model, manufacturer, and serial number
- Enrollment date, type, and ownership
- Hardware specs, storage capacity, and battery health
- Network status and connectivity type

**User Attributes**
- Department, job title, and location
- Employee type (full-time, contractor, temporary)
- Cost center and organizational unit
- Manager and reporting structure
- Custom user fields and tags

**Enrollment & Status**
- Enrollment method (DEP, manual, bulk)
- Supervision status
- Compliance state
- Last check-in date
- Device tags and custom attributes

**Combine Criteria**
Mix and match any properties with AND/OR logic for precise targeting.

## Common Use Cases

**OS Update Campaigns**
- Target devices running vulnerable OS versions
- Exclude devices with known compatibility issues
- Automatically remove devices once they update

**Hardware Lifecycle Management**
- Identify devices older than 3 years for replacement planning
- Track warranty expiration across the fleet
- Find devices with low storage or battery health

**Departmental Management**
- Sales team devices for CRM app deployment
- Engineering devices for development tool distribution
- Finance devices for enhanced security policies

**Pilot Programs**
- "Early Adopter" volunteers for beta testing
- Specific office locations for new feature trials
- IT team devices for internal validation

**Compliance Segmentation**
- Devices handling HIPAA-regulated data
- EU-based devices for GDPR compliance
- Financial sector devices for SOX requirements

**BYOD vs Corporate**
- Corporate-owned devices for full management
- Personal devices for containerized work apps
- Contractor devices with limited access

## Dynamic vs Static Groups

**Traditional Static Groups**: Manual assignment, becomes outdated, requires constant maintenance

**Device Audiences**: Automatic membership based on criteria, always current, scales effortlessly

Devices can belong to multiple audiences simultaneously, giving you overlapping segments for different purposes—testing audience, regional audience, department audience all at once.

## Integration with Other Features

**Policy Composition**: Assign policies to audiences with appropriate priority levels

**Interpolation**: Use audience membership in dynamic variable resolution

**Reporting**: Analyze metrics and compliance by audience segment

**Automation**: Trigger actions when devices enter or leave specific audiences

## Getting Started

1. **Identify common targeting patterns** in your current workflows
2. **Create foundational audiences** for major segments (OS types, departments, regions)
3. **Build specialized audiences** for specific use cases (pilot groups, update targets)
4. **Assign policies and apps** to audiences instead of individual devices
5. **Monitor audience size** to validate criteria are capturing the intended devices

---

*Last updated: November 2025*  
*Status: Private Access - Available for Enterprise customers*  
*Contact your account manager to enable this feature*