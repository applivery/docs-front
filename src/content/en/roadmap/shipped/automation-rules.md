---
title: "Automation Rules"
description: "Event-triggered automatic actions that execute workflows without manual intervention"
category: "Enterprise Features"
team: "Device Management"
vote: 45
priority: "high"
quarter: "Q3 2025"
status: "Private Access"
plan: "Enterprise"
order: 2
---

# Automation Rules

## The Problem We're Solving
IT teams spend significant time on repetitive tasks that follow predictable patterns—applying policies when devices enroll, renewing certificates before expiration, updating configurations when users change departments, or responding to compliance violations. These manual processes create delays, consume resources, and introduce human error.

## What It Does
Automation Rules execute predefined actions automatically when specific events occur in your device fleet. Configure once, then let the platform handle routine tasks—device enrollment workflows, policy assignments, certificate management, compliance remediation, and more.

## How It Works

Define triggers and corresponding actions:

```
Trigger: Device joins "Sales Team Android" audience
Actions: 
→ Apply Sales-Department policy (Priority: 200)
→ Install CRM mobile app
→ Send welcome email to user
→ Add device tag "Sales-Provisioned"
```

```
Trigger: Certificate expires in 30 days
Actions:
→ Request certificate renewal
→ Notify IT team via email
→ Create audit log entry
```

```
Trigger: Device becomes non-compliant
Actions:
→ Send warning notification to user
→ Wait 24 hours
→ If still non-compliant, restrict corporate data access
→ Create support ticket
```

The platform monitors for trigger conditions continuously and executes actions immediately when conditions are met.

## Key Benefits

### For IT Teams
- **Eliminate repetitive tasks**: Hours of manual work reduced to zero
- **Faster response times**: Actions execute in seconds, not hours or days
- **Consistent execution**: Rules apply uniformly across the entire fleet
- **Reduced human error**: No missed steps or forgotten tasks

### For Security & Compliance
- **Immediate remediation**: Non-compliant devices addressed automatically
- **Certificate management**: Never let certificates expire unexpectedly
- **Policy enforcement**: New devices secured immediately upon enrollment
- **Audit automation**: Compliance actions logged without manual documentation

### For End Users
- **Instant provisioning**: Devices ready to use immediately after enrollment
- **Seamless transitions**: Department changes reflected automatically in device access
- **Proactive notifications**: Informed about required actions before problems occur
- **Less disruption**: Issues resolved automatically without user intervention

## Available Triggers

**Device Events**
- Device enrolled or unenrolled
- Device joins or leaves an audience
- Device becomes compliant or non-compliant
- Device check-in after extended absence
- OS version changes

**User Events**
- User assigned or unassigned from device
- User attributes change (department, location, role)
- User account status changes

**Time-Based Events**
- Certificate expiration approaching
- Device warranty expiration
- Scheduled maintenance windows
- Periodic compliance checks

**Policy & Configuration**
- Policy assignment or removal
- App installation success or failure
- Configuration profile applied
- Command execution completed

**Security Events**
- Passcode compliance violation
- Encryption status changes
- Jailbreak or root detection
- Unauthorized app installation attempt

## Available Actions

**Device Management**
- Apply or remove policies (with priority levels)
- Install or uninstall applications
- Send device commands (lock, wipe, restart)
- Update device tags and custom attributes
- Modify audience membership

**User Communication**
- Send email notifications to users or IT
- Push notifications to device
- Create support tickets
- Log entries for audit trails

**Conditional Logic**
- Wait for time period before next action
- Check conditions before proceeding
- Branch based on device properties
- Retry failed actions with backoff

**Integration Actions**
- Webhook calls to external systems
- Update records in connected platforms
- Trigger workflows in ITSM tools
- Send data to analytics platforms

## Common Use Cases

**New Device Onboarding**
- Trigger: Device enrolled via DEP
- Apply baseline security policy
- Install required corporate apps
- Set device name using interpolation
- Send welcome email to user
- Notify IT of successful provisioning

**Department Transfer Workflows**
- Trigger: User department changes to Sales
- Remove Engineering apps and policies
- Apply Sales policies and apps
- Update device tags and naming
- Notify both IT teams of transfer

**Compliance Remediation**
- Trigger: Device becomes non-compliant (outdated OS)
- Send user notification with update instructions
- Wait 48 hours
- If still non-compliant, restrict email access
- Wait 72 hours
- If still non-compliant, lock device
- Create escalation ticket for IT

**Certificate Lifecycle**
- Trigger: Certificate expires in 30 days
- Request renewal from certificate authority
- Notify IT team of pending expiration
- Trigger: Certificate renewed successfully
- Deploy new certificate to affected devices
- Remove old certificate after validation

**Security Response**
- Trigger: Jailbreak detected
- Immediately lock device
- Send alert to security team
- Remove corporate data access
- Create incident ticket
- Notify user of policy violation

**Phased Rollout Automation**
- Trigger: Device in "Pilot Group" audience for 7 days with no issues
- Add device to "Phase 2 Rollout" audience
- Apply next rollout policy
- Log successful progression

## Workflow Composition

Chain multiple rules together for complex workflows:

**Rule 1**: New contractor device enrolled → Apply contractor baseline → Add to "Contractors-Pending" audience

**Rule 2**: Device in "Contractors-Pending" for 2 hours → Background checks cleared → Move to "Contractors-Active" → Apply full contractor policies

**Rule 3**: Device in "Contractors-Active" → Contract end date reached → Remove corporate apps → Lock device → Notify IT for return

## Safety Features

**Dry Run Mode**: Test rules without executing actions to validate behavior

**Rate Limiting**: Prevent runaway automation from overwhelming systems

**Audit Logging**: Complete history of every triggered rule and executed action

**Emergency Override**: Disable rules instantly if unexpected behavior occurs

**Rollback Support**: Undo automated changes when integrated with compatible actions

## Getting Started

1. **Identify repetitive manual tasks** that follow predictable patterns
2. **Start with simple rules** (single trigger, single action)
3. **Monitor execution logs** to validate rules work as expected
4. **Gradually add complexity** with conditional logic and multi-step workflows
5. **Document your rules** for team awareness and troubleshooting

Begin with high-volume, low-risk scenarios like device tagging or notification sending before automating critical security actions.

---

*Last updated: November 2025*  
*Status: Private Access - Available for Enterprise customers*  
*Contact your account manager to enable this feature*