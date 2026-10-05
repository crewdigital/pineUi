# Security Policy

Pine UI takes security vulnerabilities seriously. We appreciate the efforts of security researchers and engineers who responsibly disclose vulnerabilities.

---

## 1. Supported Versions

Security updates are applied to the active major and minor releases:

| Version | Supported          |
| ------- | ------------------ |
| 0.0.x   | :white_check_mark: |
| < 0.0.1 | :x:                |

---

## 2. Reporting a Vulnerability

**Please DO NOT report security vulnerabilities via public GitHub issues or discussions.**

Instead, please report security vulnerabilities through one of the following channels:
1. **GitHub Security Advisory:** Open a private security advisory through the repository's "Security" tab.
2. **Direct Email:** Send details to `security@crewdigital.com` with:
   - Component or package affected
   - Reproduction steps or proof of concept
   - Potential impact on applications consuming Pine UI
   - Suggested remediation (if known)

---

## 3. Vulnerability Response Timeline

- **Initial Acknowledgment:** Within 48 hours of receipt.
- **Triage & Assessment:** Within 5 business days.
- **Fix & Advisory Publication:** Fixes are prioritized and published in a coordinated release, along with CVE assignment if applicable.

---

## 4. Scope

In-scope areas include:
- Cross-Site Scripting (XSS) vulnerabilities in component rendering or HTML escaping.
- CSS injection or property pollution vulnerabilities in token compilation or StyleX engines.
- Prototype pollution in object merging or theme compilation utilities.
- Insecure defaults that lead to unauthorized information disclosure or bypass of user privacy.
