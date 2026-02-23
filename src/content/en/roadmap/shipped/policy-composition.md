---
title: "Policy Composition"
description: "Apply multiple overlapping policies per device with intelligent priority management"
category: "Enterprise Features"
team: "Platform Engineering"
votes: 50
order: 2
priority: "high"
quarter: "Q3 2025"
status: "Private Access"
plan: "Enterprise"
---

# Policy Composition

## The Problem We're Solving
Traditional MDM systems force you to choose: either maintain dozens of monolithic policies that duplicate configurations, or sacrifice granular control by applying only one policy per device. This creates management nightmares when you need company-wide standards, department-specific rules, and individual exceptions all working together.

## What It Does
Policy Composition lets you stack multiple policies on the same device with intelligent priority weighting (1-1000). Build your management strategy in layers—company baseline, department customizations, team rules, and individual exceptions—all working together without conflicts.

## How It Works

Instead of one massive policy containing everything:

```
❌ Sales-Team-iOS-Policy-With-Exceptions-v3-Final
   - Company security settings
   - Sales department apps
   - Regional WiFi configs
   - Individual device exceptions
```

You compose from multiple focused policies:

```
✓ Corporate-Baseline (Priority: 100)
✓ Sales-Department (Priority: 200)
✓ EU-Region (Priority: 300)
✓ Manager-Overrides (Priority: 400)
```

Higher priority numbers win when settings overlap. Each policy stays focused and reusable.

## Key Benefits

### For IT Teams
- **Cleaner policy architecture**: Single-purpose policies that are easier to understand and maintain
- **Reduced duplication**: Write common settings once, reuse across all teams
- **Faster changes**: Update one policy layer without touching others
- **Less risk**: Test changes in isolated policies without rebuilding entire configurations

### For Complex Organizations
- **Hierarchical control**: Corporate mandates + regional compliance + team preferences all coexist
- **Exception handling**: Override specific settings without duplicating entire policies
- **Role-based customization**: Different rules for executives, contractors, and standard users
- **Merger integration**: Maintain legacy policies alongside new standards during transitions

### For Compliance
- **Guaranteed baselines**: Core security policies apply regardless of other configurations
- **Clear precedence**: Know exactly which setting wins in any scenario
- **Audit transparency**: See the full policy stack applied to each device
- **Selective enforcement**: Different compliance requirements by region or device type

## Priority System

**1-100**: Foundation policies (security baselines, core compliance)  
**101-300**: Organizational policies (department, region, office location)  
**301-700**: Team and role-specific policies (job function, project teams)  
**701-1000**: Individual exceptions and temporary overrides  

When policies conflict, the highest priority value determines the final setting. Non-conflicting settings from all policies are applied.

## Common Use Cases

**Multi-Region Deployment**  
- Global security baseline (Priority: 100)
- Regional compliance (EU GDPR, US HIPAA) (Priority: 200)
- Office-specific networks (Priority: 300)

**Role-Based Access**  
- Company app catalog (Priority: 100)
- Department apps (Finance, Sales, Engineering) (Priority: 200)
- Executive privileges (Priority: 800)

**Temporary Projects**  
- Standard corporate policy (Priority: 100)
- Project-specific VPN access (Priority: 500)
- Automatically removed when project ends

**BYOD Programs**  
- Light corporate requirements (Priority: 100)
- Personal device allowances (Priority: 200)
- Individual user preferences (Priority: 300)

## Policy Inheritance

Policies can be assigned at multiple levels:
- **Organization-wide**: Applies to all devices automatically
- **Group/Tag-based**: Applies to devices matching criteria
- **Direct assignment**: Applies to specific devices

Devices inherit all applicable policies, creating their unique policy stack based on their organizational position, group memberships, and direct assignments.

## Migration Path

Existing single-policy deployments continue to work. Enable composition gradually:

1. **Start with additions**: Layer new policies on top of existing ones
2. **Extract common settings**: Move shared configurations to foundation policies
3. **Refactor incrementally**: Break monolithic policies into focused layers over time
4. **Deprecate old policies**: Remove legacy policies once composition covers all use cases

---

*Last updated: November 2025*  
*Status: Private Access - Available for Enterprise customers*  
*Contact your account manager to enable this feature*