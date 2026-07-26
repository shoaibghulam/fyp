# Software Requirements Specification — Anti Medi Care System

**Federal Urdu University of Arts, Sciences & Technology**
**Department of Computer Science**

| | |
|---|---|
| **Project Area** | Online Medical-Supply Locator & Ordering Platform |
| **Document version** | 1.0 |
| **Date** | 2026-07-24 |
| **Prepared by** | Shoaib Ahmed (16122004), Safdar Ali Khan (16122088), Muhammad Osama Saleem (16122035), Syed Huzaifa Abdali (16122084) |
| **Supervised by** | Dr. Farhan Shafiq |

### Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-07-24 | Team | Initial corrected SRS (from audit of `Final FYP.pdf`) |

> **Note on the product name:** the brand is written consistently as **Anti Medi Care** throughout this document. ("Anti" here is the chosen brand mark, not opposition to medical care.)

---

## Table of Contents
1. Introduction
2. Overall Description
3. External Interface Requirements
4. Hardware Interfaces
5. Software Interfaces
6. Communications Interfaces
7. System Features (Functional Requirements)
8. Use Case / Role Model
9. Entity Relationship Diagram (ERD)
10. Other Nonfunctional Requirements
11. Glossary & Acronyms
12. References
13. List of Figures

---

## 1. Introduction

Anti Medi Care is a web platform that connects the public with medical-supply vendors — welfare trusts and pharmacies such as **Saylani Welfare Trust**, **Chhipa Foundation**, and **Edhi Foundation**. Vendors register, are verified by an administrator, and then list products (oxygen cylinders, ventilator kits, vaccination-center information, and other equipment).

A user registers, verifies their email, logs in, and browses products. Selecting a product category opens a map showing vendor locations **within a 25 km radius**. The user opens a product to view its details, submits a booking form, and the vendor receives the order. On vendor acceptance the user is notified by email with pickup/delivery instructions. **If an order is not fulfilled within 6 hours it is automatically cancelled** so the user can reorder.

### 1.1 Purpose
The purpose of the system is to make it easy for the public to locate and obtain scarce medical equipment — a need highlighted during COVID-19, when many people did not know where to find oxygen cylinders or ventilators. It also helps people with disabilities and children with special needs obtain equipment not stocked by every pharmacy.

### 1.2 Intended Audience and Reading Suggestions
- **Public / Users** — locate and book medical products near them.
- **Vendors** (welfare trusts & pharmacies) — list products and manage orders.
- **Administrator** — verify vendors, manage catalog data, and monitor activity.
- **Evaluators / Supervisor** — assess the system against these requirements.

### 1.3 Product Scope
The system provides map-based discovery and ordering of medical products from verified vendors, with an administrator overseeing vendors, categories, products, and orders. Google Maps provides location and routing. **Payment handling is defined in §7.6.**

---

## 2. Overall Description

### 2.1 Product Perspective
Anti Medi Care is a standalone online health-service platform. Vendors add products (pending admin approval); users discover the nearest matching product via Google Maps and place orders; the administrator has full management rights over vendors, categories, products, and orders.

### 2.2 Product Functions

**Administrator**
- Add / edit / remove vendors; enable or disable vendor accounts
- Approve or reject vendor-submitted products
- Add / edit / delete **categories** (e.g. Oxygen Cylinder, Ventilator Kit, Vaccination Center)
- Add / edit / delete products
- View all orders across vendors
- Log in; change password

**Vendor**
- Register an account (pending admin approval)
- Add / edit / delete products
- View and manage incoming orders (New → Accepted → Completed / Cancel)
- Log in; change password; edit agency profile

**User**
- Register an account with email verification
- View products; search products within a **25 km** radius
- Place an order and track its status

### 2.3 User Classes and Characteristics
- **Admin** — controls the whole system; verifies vendors; manages categories, products, and orders; monitors suspicious activity.
- **Vendor** — adds and manages their own products and orders.
- **User** — browses, locates, and orders products.

### 2.4 Operating Environment

| Spec | Minimum | Recommended |
|------|---------|-------------|
| CPU | Intel Core i3 (8th gen) | Intel Core i5 (8th gen) |
| RAM | 4 GB | 8 GB |
| Storage | 256 GB SSD | 256 GB SSD |
| OS | Windows 10 / Linux | Windows 10 / Linux |

**Software dependencies:** Python 3.7+, Django, Django REST Framework, React.js, React Google Maps components.

### 2.5 Design and Implementation Constraints
- Must operate in near real time within the operating environment in §2.4.
- Must use widely-supported, popular tools (Python 3.7+, Django, DRF, React.js).
- Should handle concurrent requests (see §10.1 for targets).

### 2.6 Assumptions and Dependencies
1. The server is available and processes requests without undue delay.
2. The API server responds correctly so the frontend can fetch data.
3. The server is configured with: Python 3.7+, Django, Django REST Framework, React.js, and React Google Maps components.
4. A valid, usage-restricted Google Maps API key is available.

---

## 3. External Interface Requirements

### 3.1 User Interfaces
- **User Login / Registration** — email + password; email verification on sign-up; "Forgot Password" reset (see §7.5).
- **Category selection** — Oxygen Cylinder, Ventilator Kit, Vaccination Center.
- **Map view** — vendor product markers within 25 km; empty-state message when none are found (§7.2).
- **Product details** — price, address, contact, website, description, "Order Now".
- **Order form** — first/last name, email, contact, address, quantity, computed total price.

### 3.2 Vendor Panel
- Vendor login / create account.
- **Orders** page with status tabs: New / Accepted / Completed / Cancel + statistics.
- **Products** page — list, add, edit, delete.
- **Settings** — agency profile and change password.

### 3.3 Admin Panel
- Admin login.
- **Dashboard** — counts of orders, users, vendors, categories; recent products & users.
- **Orders** — all vendor orders with status.
- **Categories (Models)** — manage categories/thumbnails.
- **Products** — all vendor products; approve/reject.
- **Vendors** — manage vendor accounts.
- **Settings** — admin profile, change password, website settings.

---

## 4. Hardware Interfaces
The web application runs on a Virtual Private Server. No specialized client hardware is required beyond a device with a modern web browser and internet access.

---

## 5. Software Interfaces

| Software | Description |
|----------|-------------|
| Operating System | Windows 10 / Linux |
| Language | Python (backend), JavaScript (frontend) |
| Backend framework | Django + **Django REST Framework** (REST API) |
| Frontend | React.js |
| Database | **PostgreSQL** (recommended for concurrent multi-vendor use). *SQLite acceptable only for local development.* |
| Web/App server | Gunicorn (WSGI) behind Nginx *(confirm actual deployment)* |
| Maps | Google Maps JavaScript API + React Google Maps components |
| Design tooling | Adobe Photoshop (logo & UI assets) |

### 5.1 Representative REST Endpoints (DRF)

| Method | Endpoint (example) | Purpose |
|--------|--------------------|---------|
| POST | `/api/user/register` | User registration + verification email |
| POST | `/api/user/login` | User login |
| POST | `/api/vendor/register` | Vendor registration (pending approval) |
| GET | `/api/products?category=&lat=&lng=` | Products within 25 km of a point |
| POST | `/api/order` | Create an order |
| PATCH | `/api/order/{id}/status` | Vendor/admin updates order status |
| POST | `/api/*/change-password` | Change password |

> Endpoint names are illustrative; align with the actual `urls.py`.

---

## 6. Communications Interfaces
The system is accessed over HTTPS through a standard web browser. Transactional email (verification, order notification) is sent via SMTP/email service.

---

## 7. System Features (Functional Requirements)

Each requirement uses **FR-x** with a priority (High/Med/Low).

### 7.1 Authentication & Authorization — *High*
- **FR-1.1** Users, vendors, and admins log in with credentials; passwords are stored **hashed (PBKDF2-SHA256)**.
- **FR-1.2** New user accounts require **email verification** before login.
- **FR-1.3** New vendor accounts are **pending** until an admin approves them.
- **FR-1.4** Access is role-scoped (user / vendor / admin).

### 7.2 Product Discovery (Map + 25 km radius) — *High*
- **FR-2.1** Selecting a category shows vendor product markers within **25 km** of the user's location.
- **FR-2.2** The user can open the nearest marker to view product details.
- **FR-2.3** **Empty state:** if no product exists within 25 km, the system shows "No products found near you" and offers to widen the search or pick another category.

### 7.3 Product Management (Vendor / Admin) — *High*
- **FR-3.1** Vendors add/edit/delete products; new products are **pending** admin approval.
- **FR-3.2** Admin approves/rejects products and manages categories.
- **FR-3.3** Product quantity (`qty`) decrements on a confirmed order and blocks orders when zero.

### 7.4 Ordering & Lifecycle — *High*
- **FR-4.1** A user submits a booking form (name, email, contact, address, quantity); total price is computed as `price × quantity`.
- **FR-4.2** New orders start in status **New**; the vendor can move them to **Accepted → Completed** or **Cancel**.
- **FR-4.3** On **Accepted**, the user is emailed pickup/delivery instructions.
- **FR-4.4** **Auto-cancel:** an order not fulfilled within **6 hours** is automatically set to **Cancel**; the user may reorder.

### 7.5 Password Reset — *Medium*
- **FR-5.1** "Forgot Password" sends a time-limited reset link/OTP to the registered email.
- **FR-5.2** The user sets a new password; the old session is invalidated.

### 7.6 Payment — *High (decision required)*
- **FR-6.1** *[TEAM DECISION]* Choose one and document it:
  (a) online payment gateway (record transaction ref on the order), or
  (b) **cash on delivery / on collection** (no online payment; total price is informational), or
  (c) payment explicitly **out of scope** for this release.
- **FR-6.2** Whichever is chosen, the order stores `Price`, `Qty`, and `TotalPrice`.

### 7.7 User Order Tracking — *Medium*
- **FR-7.1** A logged-in user can view a **"My Orders"** list with current status (New/Accepted/Completed/Cancel).

### 7.8 Vaccination Center Handling — *Medium (decision required)*
- **FR-8.1** *[TEAM DECISION]* Vaccination Center is a **locate-only** category (map + info, no quantity/price/order), OR it reuses the standard order flow. Document the chosen behavior; the current order form does not fit a locate-only category.

---

## 8. Use Case / Role Model

Actors: **User**, **Vendor**, **Admin**.

| Capability | User | Vendor | Admin |
|------------|:----:|:------:|:-----:|
| Register / Login | ✅ | ✅ | ✅ |
| View products (map, 25 km) | ✅ | — | ✅ |
| Order product / track order | ✅ | — | ✅ |
| Add/Edit/Delete own products | — | ✅ | ✅ |
| Manage incoming orders | — | ✅ | ✅ |
| Add/Edit/Delete categories | — | — | ✅ |
| Approve/reject products | — | — | ✅ |
| Add/Edit/Delete/Enable/Disable vendors | — | — | ✅ |
| Website & app settings | — | — | ✅ |

> **Action item (C2):** replace this matrix in the final document with a proper UML **use case diagram** (actors → use-case ovals, include/extend), plus a **sequence diagram** for the order lifecycle (§7.4).

---

## 9. Entity Relationship Diagram (ERD)

**Corrections applied vs. the original diagram** (update the drawing to match):

- **`Category` (was "Models")** — rename entity; fields `CategoryId, Title, Description, Thumbnail`.
- **`Category → Product` is 1-to-Many** (was incorrectly 1-to-1).
- **`Order` MUST include `Status`** (New/Accepted/Completed/Cancel) — present in code, missing in the drawing.
- **`Website`** (fix spelling "Webiste") relates to **Admin/site config**, not to Product; model it as a singleton settings entity.
- **`Admin`** should be shown (it manages every entity) with `RegistrationDate`.
- Fix field spelling: **`Latitude`** (was "Litltude"/"Lititude").
- Note the denormalization: `Order` copies user contact fields *and* has a `User` FK; `Product` carries its own address/lat/lng in addition to the vendor's. Acceptable for a snapshot, but document the intent.

**Relationships**
- `Vendor 1—M Product`
- `Category 1—M Product`
- `User 1—M Order`
- `Product 1—M Order`
- `Admin` manages `Vendor`, `Category`, `Product`, `Order`, `Website` (administrative, not FK)

---

## 10. Other Nonfunctional Requirements

### 10.1 Performance
- Operates in near real time.
- **Target:** typical API response < 2 s under normal load; support at least 50 concurrent users (initial target).
- RDBMS backend (**PostgreSQL** recommended).
- Runs on the environment in §2.4; a modern web browser is required on the client.

### 10.2 Safety
- The system must not cause harm through incorrect availability data; product/status information must reflect the database. Auto-cancel (§7.4) prevents users waiting indefinitely on stale orders.

### 10.3 Security
- **Transport:** all traffic over **HTTPS/TLS**.
- **Passwords:** stored **hashed (PBKDF2-SHA256)**; never logged or returned in API responses.
- **User PII:** names, addresses, contact numbers, and medical needs are sensitive; access is role-restricted, and unnecessary data is not retained.
- **Vendor privacy:** vendor/agency data is protected; only necessary data is stored.
- **Input validation** on all API boundaries; CSRF protection on state-changing forms; **rate limiting** on auth and order endpoints.
- **Google Maps API key** must be usage-restricted and kept out of source control.
- Auth tokens must expire and be invalidated on logout/password reset.

### 10.4 Software Quality Attributes
- **Availability** — available at all times (target uptime documented in deployment).
- **Correctness** — meets the requirements in §7; bug-free for defined flows.
- **Maintainability** — modular Django apps + React components; small, cohesive files.
- **Usability** — consistent, user-friendly UI usable repeatedly without confusion.
- **Accessibility (access control)** — role-scoped access per user class.
- **Accuracy** — outputs reliably reflect stored data.
- **Stability** — deterministic output for the same input.

---

## 11. Glossary & Acronyms

| Term | Meaning |
|------|---------|
| SRS | Software Requirements Specification |
| DRF | Django REST Framework |
| ERD | Entity Relationship Diagram |
| PII | Personally Identifiable Information |
| Category (Model) | A product class such as Oxygen Cylinder, Ventilator Kit, Vaccination Center. *(Code identifier is `DataModels`/`Modal*`; conceptually this is a Category.)* |
| Vendor | A welfare trust or pharmacy that lists products |
| PBKDF2 | Password-Based Key Derivation Function (password hashing) |

---

## 12. References
1. IEEE Std 830-1998 — Recommended Practice for Software Requirements Specifications.
2. Django documentation — https://docs.djangoproject.com/
3. Django REST Framework — https://www.django-rest-framework.org/
4. React documentation — https://react.dev/
5. Google Maps JavaScript API — https://developers.google.com/maps/documentation/javascript

---

## 13. List of Figures
1. User Login
2. User Registration
3. Category selection
4. Product markers on map
5. Product selection on map
6. Order form
7. Vendor login
8. Vendor order page
9. Vendor products
10. Vendor settings
11. Admin login
12. Admin dashboard
13. Admin — all vendor orders
14. Categories (Models)
15. All vendor products
16. Vendors
17. Admin settings / website settings
18. System role model (to be replaced by UML use case diagram)
19. ERD

> Replace the Lorem ipsum text and the `https://google.com` placeholder in figures 5–6 with real content before final submission.
