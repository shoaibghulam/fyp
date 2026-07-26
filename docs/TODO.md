# Anti Medi Care — Fix TODO

Actionable checklist derived from [`AUDIT.md`](./AUDIT.md). IDs map back to audit findings.
Corrected document content is in [`SRS.md`](./SRS.md).

**Status key:** `[ ]` open · `[x]` done · `[~]` in progress · `[?]` needs team decision

---

## 🔴 Critical — do before submission

- [ ] **A1** Write real System Features in §7 (functional requirements + use cases + priority). *(Done in `SRS.md`; copy into the Word/PDF.)*
- [?] **A2** Decide payment approach: (a) online gateway, (b) cash-on-delivery, (c) out-of-scope. Then document it. **Team decision needed.**
- [ ] **A3** Standardize "Modal" → **Category (Model)** wording in the SRS. *(Done in `SRS.md`.)*
- [ ] **A4** Merge the 3 hardware specs into one Minimum + one Recommended. *(Done in `SRS.md` §2.4.)*
- [ ] **A5** Fix ERD `Models→Product` from 1-1 to **1-M**.
- [?] **A6** Define vaccination-center behavior (locate-only vs bookable). **Team decision needed.**

## 🟠 High

- [ ] **B1** Add `Status` field to the **Order** entity in the ERD (it already exists in code).
- [ ] **B2** Document password hashing in §10.3 (code already hashes via passlib PBKDF2 — confirmed OK). *(Done in `SRS.md`.)*
- [ ] **B3** Expand §10.3 to protect **user PII** + encryption-in-transit + data retention. *(Done in `SRS.md`.)*
- [?] **B4** Migrate DB spec SQLite → **PostgreSQL** (doc + `settings.py`). **Confirm before changing settings.**
- [ ] **B5** Add "no product within 25 km" empty-state requirement. *(Done in `SRS.md`.)*
- [ ] **B6** Specify password-reset-via-email flow. *(Done in `SRS.md`.)*
- [?] **B7 / C1** Rename `ProductModel.UserId` → `VendorId`. **High-risk: needs migration + frontend + serializer updates. Team decision.**
- [ ] **B8** Add version/date/revision-history to the title page. *(Template in `SRS.md`.)*

## 🟡 Medium

- [ ] **C1(doc)** Add Glossary, Acronyms, References, List of Figures. *(Done in `SRS.md`.)*
- [ ] **C2** Replace "System Role Model" with a proper UML **Use Case diagram**.
- [ ] **C3** Add an order-lifecycle **sequence diagram**.
- [ ] **C4** Add user-side **order tracking / "My Orders"** requirement. *(Done in `SRS.md`.)*
- [ ] **C5** Document key **DRF endpoints** in §5. *(Table added in `SRS.md`.)*
- [ ] **C6** Add measurable NFRs (concurrent users, response time, backup). *(Done in `SRS.md`.)*
- [ ] **C7** Correct web-server entry to the real deployment stack (Nginx + Gunicorn?). **Confirm actual deploy.**

## 🟢 Low (polish)

- [ ] **D1** Standardize product name → **Anti Medi Care**; add brand rationale note.
- [ ] **D2** Fix typos: Lititude→Latitude, Webiste→Website, Oxeygen→Oxygen, Complate→Complete, "Order From"→"Order Form", requiremen, lioke.
- [ ] **D3** Standardize vendor names: **Chhipa**, Saylani, Edhi.
- [ ] **D4** Replace Lorem ipsum + `google.com` placeholders in screenshots with real content.
- [ ] **D5** Fix non-inclusive phrasing ("special kids"→"children with special needs", "disable peoples"→"people with disabilities").
- [ ] **D6** Align §2.4 and §5 tech-stack lists (include DRF in both).

---

## Optional — code hygiene (separate from the document)

> These improve the codebase but are **not** required to fix the SRS. Each needs a migration and coordinated frontend changes — do not do casually.

- [?] **C1a** `DataModels` / `ModalId` / `ModalTitle` … → `Model` / `ModelId` / `ModelTitle`.
- [?] **C1b** `WebisteModal` → `WebsiteModel`.
- [?] **C1c** `ProductModel.Lititude` → `Latitude`.
- [?] **C1d** `ProductModel.UserId` (FK to Vendor) → `VendorId`.
- [ ] **S2** Fix typo `NewPassowrd` in `views.py:448,691` (must match the frontend key or change-password breaks).
- [ ] **S3** Ensure Google Maps API key is restricted and not committed to the repo.
