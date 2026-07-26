# Anti Medi Care — SRS Audit Report

**Document audited:** `Final FYP.pdf` (Software Requirements Specification, 20 pages)
**Project:** Anti Medi Care System — online medical-supply platform (Django + DRF + React)
**Audited:** 2026-07-24
**Cross-referenced against:** `app/models.py` (actual Django models)

> Legend — **Severity:** 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low
> **Type:** `DOC` = document only · `CODE` = also present in code · `DOC+CODE` = both

---

## Executive Summary

The SRS follows the IEEE-830 template but has significant gaps: an **empty System Features section**, **no payment specification**, **conflicting hardware requirements**, several **ERD errors**, and **security gaps around user PII and password storage**. Many naming bugs (`Modal` vs `Model`, `Lititude`, `Webiste`) exist in **both the document and the code**, so they are real, not just typos.

| Severity | Count |
|----------|-------|
| 🔴 Critical | 6 |
| 🟠 High | 8 |
| 🟡 Medium | 7 |
| 🟢 Low | 6 |

---

## A. Critical Findings 🔴

| ID | Type | Finding | Location | Fix |
|----|------|---------|----------|-----|
| A1 | DOC | **§7 "System Features" is empty** — only an intro sentence, no functional requirements, use cases, or priorities. This is the core of an SRS. | §7 | Add detailed functional requirements (see corrected `SRS.md` §7). |
| A2 | DOC | **No payment mechanism defined** anywhere, yet the order flow shows Price, Qty, Total Price, and "Complete Order". | Order flow, §7 | Document payment method OR explicitly mark it out-of-scope (cash-on-delivery on receipt). |
| A3 | DOC+CODE | **`Modal` used to mean `Model`/`Category`.** Code: `DataModels` with `ModalId`, `ModalTitle`, `ModalThumbnail`; `WebisteModal`. "Modal" = a UI popup, not a data category. | ERD, Admin Panel, §2.2, `models.py:58-64,84` | Standardize terminology to **Category (Model)** in docs; schedule code rename (see TODO C1). |
| A4 | DOC | **Three conflicting hardware specs.** §2.4: i5 / 8 GB / 256 GB SSD. §2.5: i3 / 3 GB / 256 GB. §10.1: > core i3 / > 1 GB RAM. | §2.4, §2.5, §10.1 | Consolidate to one **Minimum** + one **Recommended** spec. |
| A5 | DOC | **ERD: `Models → Product` marked 1-to-1.** Code proves it is Many-to-One (`ProductModel.ModalId = ForeignKey(DataModels)`). As drawn, a category could hold only one product. | ERD §9 | Change cardinality to **1-to-Many**. |
| A6 | DOC | **Vaccination Center does not fit the order flow** (Qty / Total Price / 6-hour auto-cancel are meaningless for a vaccination center). | Category page, order flow | Define it as a **locate-only** category or branch the flow. |

## B. High Findings 🟠

| ID | Type | Finding | Location | Fix |
|----|------|---------|----------|-----|
| B1 | DOC | **ERD omits `Order.Status`** — but the code has it (`OrderModel.Status`, choices New/Accepted/Completed/Cancel). The vendor/admin panels display these statuses. | ERD §9 vs `models.py:104` | Add `Status` to the Order entity in the ERD. |
| B2 | DOC | **Password hashing works in code but is undocumented in the SRS.** Verified: `views.py` uses passlib `django_pbkdf2_sha256` (`hash.hash()` on store, `hash.verify()` on login) — passwords are **not** plaintext. But §10.3 never states this security control. | §10.3 (doc gap); code OK at `views.py:7,148` | Document PBKDF2 hashing as a security requirement in §10.3. |
| B3 | DOC | **Security section protects only vendor privacy** — ignores **user PII** (name, address, phone, medical need). | §10.3 | Add user-PII protection, encryption-in-transit, retention policy. |
| B4 | DOC+CODE | **SQLite specified for production** multi-vendor/concurrent-order app. SQLite serializes writes. | §5, `settings.py` | Recommend **PostgreSQL**; state it in SRS. |
| B5 | DOC | **No "no product within 25 km" empty-state requirement** for the core search radius. | §1, §7 | Add empty-result behavior requirement. |
| B6 | DOC | **Password-reset flow undefined** though "Forget Password" appears in 3 screens. | §3.1, §3.2, §7 | Specify reset-via-email flow. |
| B7 | CODE | **`ProductModel.UserId` is a FK to `VendorModel`** — the field is misnamed (it holds a vendor, not a user). Confusing and error-prone. | `models.py:80` | Rename to `VendorId` (scheduled, see TODO C1). |
| B8 | DOC | **No document metadata** — no version number, no date, no revision history on the title page. | Title page | Add version/date/revision-history table. |

## C. Medium Findings 🟡

| ID | Type | Finding | Location | Fix |
|----|------|---------|----------|-----|
| C1 | DOC | No **Glossary / Acronyms**, no **References**, no **List of Figures** (≈15 screenshots unindexed). | §1, end | Add these sections. |
| C2 | DOC | **"System Role Model" is a permission matrix, not a Use Case diagram.** No actor→use-case ovals, no include/extend. | §8 | Add a proper UML use case diagram. |
| C3 | DOC | **No sequence / data-flow diagram** for the order lifecycle (book → vendor accept → email → 6h auto-cancel). | Missing | Add one sequence diagram. |
| C4 | DOC | **No user-side order tracking requirement** — user only gets an email; no "My Orders" screen. | §3.1, §7 | Add order-status visibility for users. |
| C5 | DOC | **DRF / endpoints not documented** in Software Interfaces. | §5 | List key REST endpoints and payloads. |
| C6 | DOC | **Missing NFRs**: concurrent-user target, response-time target, backup/recovery, browser matrix. | §10 | Add measurable NFRs. |
| C7 | DOC | **Web server = Apache** stated for a React SPA + DRF stack (typically Nginx + Gunicorn). | §5 | Correct to the actual deployment stack. |

## D. Low Findings 🟢 (polish — reviewers still deduct marks)

| ID | Type | Finding | Fix |
|----|------|---------|-----|
| D1 | DOC | Product name inconsistent: "Anti Medi care" / "Anti Medicare" / "Anti Medi Care" / "Anti Medical care". "Anti" literally reads as *against* care. | Standardize to **Anti Medi Care**; add a rationale note for the brand. |
| D2 | DOC+CODE | Typos: `Lititude` (Latitude), `Webiste` (Website), `Oxeygen` (Oxygen), `Complate` (Complete), "Order From" (Order Form), "requiremen", "lioke". | Fix in doc; `Lititude`/`Webiste` also in code (TODO C1). |
| D3 | DOC | Vendor names inconsistent: Chippa/Chipa (→ **Chhipa**), saylani/Saylani, edhi/Edhi. | Standardize. |
| D4 | DOC | **Lorem ipsum** placeholder text and `https://google.com` still shown in Product Details / Order screenshots. | Replace with real content before submission. |
| D5 | DOC | Non-inclusive phrasing: "special kids", "disable peoples". | Use "children with special needs", "people with disabilities". |
| D6 | DOC | §2.4 lists DRF; §5 table omits it. Tech-stack lists disagree. | Align both lists. |

---

## E. What the Code Got RIGHT (so the doc should match it)

- ✅ `OrderModel.Status` exists with proper `ORDER_STATUS` choices → **update the ERD to include it**.
- ✅ **Passwords are hashed** with passlib PBKDF2-SHA256 (`views.py`) — not plaintext.
- ✅ `Order.Date` uses `auto_now_add=True` (correct timestamp behavior).
- ✅ Foreign keys use `on_delete=models.CASCADE` consistently.
- ✅ `RegistrationDate` exists on Admin/User/Vendor (ERD omits it on Admin — minor).

> ⚠️ Minor code note: `views.py:448,691` reference `request.data['NewPassowrd']` (typo "Passowrd"). Verify the frontend sends the same misspelled key, or change-password will break.

---

## F. Recommended Next Steps

1. Apply all `DOC` fixes via the corrected **`SRS.md`** in this folder.
2. Work the prioritized **`TODO.md`** checklist.
3. Decide on the `CODE` renames (C1) — they improve clarity but require a migration + frontend updates. Do **not** rename fields casually; it breaks existing migrations and the React app.
