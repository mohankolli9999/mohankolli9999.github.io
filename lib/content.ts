// Single source of truth for all portfolio content.
// Verified from Mohan's canonical CV. Do not add a phone number here (PII).

export const profile = {
  name: "Mohan Naga Sai Kolli",
  display: "Mohan Kolli",
  title: "Associate Security Engineer",
  company: "Deutsche Telekom Digital Labs",
  tagline: "I break AI systems, then build the controls that make those attacks fail.",
  location: "Gurugram, India",
  availability: "open to Dubai / UAE · 60 days' notice",
  years: "~2 years",
  bio: "Application and AI Security Engineer with ~2 years at Deutsche Telekom Digital Labs, a Tier-1 telecom, securing products, APIs and AI systems. I do hands-on VAPT and AI red teaming, and I build the defenses: production LLM security automation, agentic-AI guardrails, and DevSecOps pipelines. I like finding the vulnerability before an attacker does, then fixing it for good.",
  targets: [
    "Application Security",
    "AI Security",
    "Cloud Security",
    "DevSecOps",
    "Offensive Security / VAPT",
  ],
};

export const contact = {
  email: "mohankolligm@gmail.com",
  linkedin: "https://linkedin.com/in/mohankolli9999",
  github: "https://github.com/mohankolli9999",
  resume: "/resume/mohan-kolli-resume.pdf",
};

export type Project = {
  id: string;
  name: string;
  date: string;
  stack: string;
  summary: string;
  bullets: string[];
  flag: string;
  vuln: string;
};

export const projects: Project[] = [
  {
    id: "themis",
    name: "Themis — Agentic AI Triage Engine",
    date: "Aug–Sep 2026",
    stack: "Python · AWS Bedrock (Claude, EU-region-gated) · Ollama",
    summary:
      "A clean-room, advisory LLM engine that ranks GitLab security-scan findings (SAST, dependency, container, secret) as likely-real / uncertain / likely-false-positive with reasoning — advisory only, it never suppresses a finding.",
    bullets: [
      "Zero-runtime-dependency engine with a two-tier judge harness (cheap first pass, optional stronger re-judge) over a pluggable provider layer: Bedrock for EU data residency, local Ollama, or an offline stub.",
      "Agentic judge with read-only repo tools and prompt-injection defenses: nonce-fenced untrusted input, steering detection, and secret masking / redaction.",
      "Validated against a real 15,127-finding GitLab export across 51 projects; 139 automated tests passing.",
    ],
    vuln: "prompt-injection in agentic tool-use",
    flag: "FLAG{themis_agentic_triage}",
  },
  {
    id: "nessus",
    name: "Nessus Vulnerability Triage MCP Server",
    date: "2024–present",
    stack: "TypeScript · Node.js · Docker · Model Context Protocol",
    summary:
      "A production MCP server (~1,000 LOC, integrated with Claude Desktop) that automates true/false-positive classification heuristics for Nessus findings and standardizes analyst output.",
    bullets: [
      "50–60% triage-time reduction.",
      "1,000+ findings processed per cycle in production.",
    ],
    vuln: "false-positive noise burying real risk",
    flag: "FLAG{nessus_mcp_triage}",
  },
  {
    id: "qata",
    name: "QATA — Qualys AI Triage Assistant",
    date: "2025–present",
    stack: "Python · LLM-assisted triage",
    summary:
      "An LLM-assisted triage tool that auto-classifies Qualys findings and standardizes remediation output, cutting repetitive analyst work.",
    bullets: ["40%+ reduction in manual triage effort."],
    vuln: "analyst fatigue at scale",
    flag: "FLAG{qata_qualys_triage}",
  },
  {
    id: "malware",
    name: "Malware Detection via Ensemble Learning",
    date: "research · co-authored",
    stack: "Machine Learning",
    summary:
      "An ensemble-based malware-detection model evaluated against a single-classifier baseline.",
    bullets: ["98.5% classification accuracy vs a 75% baseline."],
    vuln: "evasive samples past a single classifier",
    flag: "FLAG{ensemble_malware_detect}",
  },
];

export const experience = {
  role: "Associate Security Engineer",
  company: "Deutsche Telekom Digital Labs",
  period: "Aug 2024 – present",
  location: "Gurugram, India",
  bullets: [
    "Led full VAPT (SAST, DAST, API, manual) on an internal DT product (OneCMS coupon platform): confirmed SQL injection with full database extraction, a public Keycloak admin console, cross-tenant BOLA via client-supplied headers, and leaked API keys — driving ~85% critical-risk reduction.",
    "Built production AI/LLM security automation (Nessus MCP server, QATA) in Python and TypeScript to auto-classify true/false positives across Nessus and Qualys — 1,000+ findings/cycle at 40%+ less analyst effort.",
    "Performed AI red teaming on LLM-powered applications (prompt injection, jailbreaks) mapped to the OWASP LLM Top 10 and MITRE ATLAS.",
    "Drove CI/CD security on the GitLab migration: weekly Checkmarx SAST/SCA with false-positive analysis (60%+ noise eliminated), pipeline-blocking secret detection, and developer remediation walkthroughs.",
    "Assessed AWS posture (EC2, IAM, Security Groups, VPC) via ION CSPM and built Metabase dashboards for cloud-security and compliance reviews.",
    "Ran 10+ Privacy & Security Assessment reviews (encryption, data retention/erasure, GDPR) producing ISO 27001 / NIST-aligned audit evidence, extending into India's DPDPA.",
  ],
};

export const skills: { group: string; items: string }[] = [
  {
    group: "AI Security",
    items:
      "AI red teaming · prompt injection & indirect prompt injection · jailbreak testing · agentic & tool-use risk · MCP server security · prompt-injection defenses (nonce-fencing, steering detection, secret masking) · OWASP LLM Top 10 · MITRE ATLAS",
  },
  {
    group: "Application & API Security",
    items:
      "VAPT · web & API penetration testing · manual exploitation (SQLi, BOLA, BFLA) · secure code review · OWASP Top 10 · SAST/DAST/SCA (Checkmarx)",
  },
  {
    group: "Cloud & Container Security",
    items: "AWS (EC2, IAM, Security Groups, VPC, STS) · CSPM · Docker · cloud-native security patterns",
  },
  {
    group: "DevSecOps",
    items: "GitLab CI/CD · SAST pipeline integration · secrets / hardcoded-credential detection · secure SDLC",
  },
  {
    group: "Vulnerability & Threat Management",
    items: "Nessus · Qualys · Checkmarx · ION CSPM · CVE/CVSS analysis · risk prioritization · VM-tool API integration",
  },
  {
    group: "Governance, Risk & Compliance",
    items: "ISO 27001 · NIST · GDPR · DPDPA · PSA / compliance reviews · audit-evidence documentation",
  },
  {
    group: "Languages & Tools",
    items: "Python · Bash · TypeScript · Node.js · SQL · Burp Suite · Nmap · Wireshark · Metabase · Jira",
  },
];

export const education = {
  degree: "B.Tech, Cybersecurity",
  school: "NIIT University",
  period: "2020–2024",
  detail: "CGPA 7.55",
};

export const certs = [
  "CEHv12 (Trainee)",
  "Burp Suite Certification: Beginner to Advanced",
  "Nullcon Workshop — Reverse Engineering & Binary Exploitation",
];
