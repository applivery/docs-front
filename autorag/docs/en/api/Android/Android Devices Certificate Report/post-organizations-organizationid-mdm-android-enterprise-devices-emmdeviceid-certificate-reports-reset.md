---
method: POST
path: >-
  /organizations/:organizationId/mdm/android/enterprise/devices/:emmDeviceId/certificate-reports/reset
operationId: null
tags:
  - Android Devices Certificate Report
base_url: /v1
x_spec_hash: 0df4fe9e4245eb28decc109cd181bec78fedcbeb1da12fd7caa9188178be59cf
x_last_imported_at: '2026-02-26T08:45:56.375Z'
x_source_id: ce0d2887-b27a-41f2-afd0-e19900bdbdce
title: Reset Certificate Report API
description: >-
  API endpoint to reset a certificate report for a specific device within an
  organization. Requires organization and device IDs.
slug: reset-certificate-report-api
headline: 'API Reference: Reset Certificate Report'
item_name: Reset Certificate Report
keywords:
  - certificate report
  - reset certificate
  - API
  - device management
  - MDM
  - Android Enterprise
  - Reset Certificate Report
target_keyword: ''
secondary_keywords: []
author: ''
author_url: ''
author_credentials: ''
category: API Documentation
section: Android Device Management
type: api-doc
audience: developers
difficulty: intermediate
platform: API
intent: ''
language: en
domain: ''
capability: ''
schema_type: APIReference
reading_time: null
prerequisites: []
faq_items: []
how_to_steps: []
pubDate: '2026-02-27'
updatedDate: '2026-02-27'
last_reviewed_date: ''
version: ''
software_version: ''
reviewer: ''
canonical: ''
robots: ''
order: null
priority: null
changefreq: ''
breadcrumb: ''
show_child_grid: true
featured: false
noindex: false
evergreen: false
pillar_content: false
og_title: ''
og_description: ''
og_image: ''
og_type: article
og_template: gradient-modern
twitter_card: summary_large_image
twitter_site: ''
summary: >-
  This API endpoint allows developers to reset a certificate report for a
  specific device within an organization. It requires the organization ID and
  device ID as path parameters, and the certificate provider ID in the request
  body. Successful requests return a status indicating whether the reset and
  notification were successful.
tldr: ''
answer_target: ''
key_takeaways: []
main_topics: []
entities: []
related_queries: []
content_scope: ''
confidence_level: ''
limitations: ''
update_frequency: ''
word_count: null
sources: []
organization: ''
fact_checker: ''
related_articles: []
see_also: []
related_topics: []
translation_key: ''
translations: {}
sidebar_icon: ''
visible: true
---
# Reset certificate Report

Resets the certificate report for a specific Android Enterprise managed device. This clears the cached certificate status data and triggers a fresh certificate compliance evaluation on the device, ensuring the report reflects the current state of all installed, expired, or revoked certificates.

### When to Use This Endpoint

-   After deploying new CA, identity, or SCEP certificates to a device via policy and wanting to force an updated status report
    
-   When the certificate report shows stale or incorrect data (e.g., a certificate was renewed but the report still shows it as expired)
    
-   After manually revoking or removing a certificate from the device and needing the report to reflect the change immediately
    
-   As part of a troubleshooting workflow when a device fails to connect to corporate Wi-Fi, VPN, or Exchange due to certificate issues
    
-   After rotating certificates across a fleet and wanting per-device verification that new certificates are active

<!-- AUTO:operation-summary:START -->
Reseet certificate Report
<!-- AUTO:operation-summary:END -->

<!-- AUTO:security:START -->
<ApiSecurity requirements={[{"ApiKeyAuth":[]}]} />
<!-- AUTO:security:END -->

<!-- AUTO:params-table:START -->
<ApiParams parameters={[{"name":"organizationId","description":"Entity Id or Slug","in":"path","required":true,"schema":{"type":"string","pattern":"^(([a-fA-F0-9]{24})|([a-zA-Z0-9\\\\-]{3,}))$","description":"Entity Id or Slug"}},{"name":"emmDeviceId","description":"Entity Id","in":"path","required":true,"schema":{"type":"string","pattern":"^[a-fA-F0-9]{24}$","description":"Entity Id"}}]} />
<!-- AUTO:params-table:END -->

<!-- AUTO:request-body:START -->
<ApiRequest body={{"content":{"application/json":{"schema":{"type":"object","required":["certificateProviderId"],"properties":{"certificateProviderId":{"type":"string","pattern":"^[a-fA-F0-9]{24}$","description":"Entity Id"}}}}}}} />
<!-- AUTO:request-body:END -->

<!-- AUTO:responses:START -->
<ApiResponse responses={{"200":{"content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"boolean"},"data":{"type":"object","required":["reset","notify"],"properties":{"reset":{"type":"boolean"},"notify":{"type":"boolean"},"resetError":{"type":"string","maxLength":256},"notifyError":{"type":"string","maxLength":256}}}}}}}},"401":{"content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"status":{"type":"boolean","enum":[false]}}},{"type":"object","properties":{"error":{"oneOf":[{"type":"object","properties":{"code":{"type":"number","enum":[4002]},"message":{"type":"string","enum":["No auth token"]}}},{"type":"object","properties":{"code":{"type":"number","enum":[4004]},"message":{"type":"string","enum":["Invalid Token"]}}}]}}}]}}}},"404":{"content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"status":{"type":"boolean","enum":[false]}}},{"type":"object","properties":{"error":{"oneOf":[{"type":"object","properties":{"code":{"type":"number","enum":[3001]},"message":{"type":"string","enum":["Entity not found"]}}}]}}}]}}}}}} />
<!-- AUTO:responses:END -->

<!-- AUTO:code-samples:START -->

<!-- AUTO:code-samples:END -->
