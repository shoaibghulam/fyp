# Anti Medi Care — Code Audit & Fix Log

Findings from a 4-agent parallel review (django-reviewer, security-reviewer, react-reviewer, silent-failure-hunter) of the actual codebase on 2026-07-24. Verified against source, not taken on faith.

---

## ✅ FIXED (applied automatically — safe, self-contained)

| # | Fix | File | Why it mattered |
|---|-----|------|-----------------|
| F1 | `VerifyClient` now sets `Status='active'` (was `'enable'`) | `app/views.py:856` | **Showstopper:** login requires `active`; no customer could ever log in after verifying. |
| F2 | `LoginUser.get` now reads `UserModel`/`UserModelSer` (was `VendorModel`) | `app/views.py:871-872` | Customer "my profile" returned wrong/cross-role vendor data or errored. |
| F3 | `DEBUG = config("DEBUG", default=False, cast=bool)` | `fyp/settings.py:28` | Without `cast=bool`, `"False"` is truthy → debug tracebacks always leaked. |
| F4 | Search radius `<=10` → `<=25` km | `app/views.py:741` | Contradicted the 25 km spec; vendors 10–25 km away were hidden. |
| F5 | Edit-product: `setQty(e.qty)` / `setPrice(e.Price)` (was `setAddress` ×3) | `Frontend/src/view/users/UserHome.js:331-332` | Editing a product corrupted Address and dropped qty/price on save. |
| F6 | Vendor logout clears `vendorToken`/`vendorid`/`agencyName` (was `usertoken`) | `Frontend/src/layout/users/PanelNavbar.js` | Logout never ended the vendor session. |
| F7 | Admin logout now clears `admintoken`/`id`/`Fullname` | `Frontend/src/layout/dashboard/Navbar.js:185` | Admin "Logout" was a plain link — session never cleared. |
| F8 | Quantity input `type="number"` (was `"Number"`, invalid → text) | `Frontend/src/view/home/Order.js:240` | Restores min/max + numeric validation; prevented `NaN` totals. |
| F9 | Added `.env` and `db.sqlite3` to `.gitignore` | `.gitignore` | Stops future commits of the secret file (see A1 — history still needs cleaning). |

---

## ✅ FIXED — Second pass (2026-07-24, "make it 100%")

| # | Fix | File(s) | What it closes |
|---|-----|---------|----------------|
| AC1 | `RoleRequiredMixin` + `role` claim (`admin`/`vendor`/`user`) added to every JWT; enforced on all single-role endpoints | `app/views.py` | A logged-in customer can no longer reach admin/vendor endpoints. |
| AC2 | Added auth+admin guard to `RegisterUser.put`/`delete` | `app/views.py` | Anyone could previously overwrite/delete any vendor (+ cascade their products/orders). |
| AC3 | Role gate + ownership (IDOR) check on `VendorOrders.put`; admin bypasses ownership, other roles rejected | `app/views.py` | A vendor can only change status of their own orders; admin keeps full control (dual-use route). |
| AC4 | Serializers now `exclude` `Password`/`Token`; `UserRegister.post` reads verify token from `serializer.instance` | `app/serializer.py`, `app/views.py` | Password hashes / verify tokens no longer ship in any API response (incl. nested product→vendor). |
| INV1 | `OrderView.post` locks the product row (`select_for_update`), checks stock, decrements atomically | `app/views.py` | No more overselling; stock no longer drifts upward. |
| PRICE1 | `Price`/`TotalPrice` recomputed server-side from the product; client amounts ignored | `app/views.py` | Price-tampering closed. |
| CANCEL1 | Cancel restocks first inside `transaction.atomic()`; all order emails wrapped so a mail failure can't lose data | `app/views.py` | Stock is always returned on cancel even if email fails. |
| BUG-EDIT1 | `put` now writes `ProductTitle` (was the no-op `LocationTitle`) plus `Price`/`qty` | `app/views.py` | Editing a product actually saves title/price/qty now. |
| THROTTLE1 | `ScopedRateThrottle` `login`=`20/min` on all 4 login views | `fyp/settings.py`, `app/views.py` | Brute-force / credential-stuffing on login is rate-limited. |
| HOSTS1 | `ALLOWED_HOSTS` from `.env` (`Csv`), default `127.0.0.1,localhost` | `fyp/settings.py`, `.env` | App won't 400 every request once `DEBUG=False`. |
| CORS1 | `CorsMiddleware` moved directly after `SecurityMiddleware` | `fyp/settings.py` | Correct CORS header ordering. |
| ADMIN1 | Django admin hides `Password`/`Token` via `ModelAdmin(exclude=...)` | `app/admin.py` | Hashes no longer editable/visible in `/admin`. |
| SESSION1 | Removed the pre-password-check `request.session['userid']` write | `app/views.py` | No session set before credentials verified. |
| A2 | Pusher creds now `config('PUSHER_*')`; added to `.env` | `app/views.py`, `.env` | Secrets out of source (still rotate — see A1). |
| XSS1 | New `src/lib/sanitize.js` (DOMPurify); all 6 `dangerouslySetInnerHTML` sinks wrapped | 5 frontend files + `package.json` | Stored XSS via vendor descriptions neutralized. **Run `npm install` in `Frontend/` to pull `dompurify`.** |
| DEPLOY1 | `baseUrl.js` reads `REACT_APP_API_URL` with localhost fallback | `Frontend/src/baseUrl.js` | Prod build no longer hard-wired to `127.0.0.1`. |
| CRASH1 | Guarded empty `locat.state` (default to `{}`) on `/` and `/order_now` | `Home.js`, `Order.js` | No white-screen crash on refresh of those routes. |

> Verified: all edited Python files pass `python -m py_compile`. Full `python manage.py check` / `runserver` should be run in your Django environment (Django isn't on the interpreter I had here). No model fields changed → **no new migration required**.

---

## 🔴 NOT auto-fixed — REQUIRES YOUR ACTION (external services / hard to reverse)

### A1 — Rotate committed secrets *(do this first)*
`.env` (tracked since the first commit) contains `SECRET_KEY` and `jwttoken` (JWT signing secret). Anyone with the repo can forge admin/vendor/user tokens. Adding to `.gitignore` (done) does **not** remove it from history.
```bash
git rm --cached .env
git commit -m "chore: stop tracking .env"
# then ROTATE (values in git history are burned):
#  - generate a new Django SECRET_KEY and a new jwttoken, put them in local .env
#  - rotate the Pusher secret in the Pusher dashboard
#  - restrict + rotate the Google Maps key in Google Cloud Console
```
Rotating invalidates existing JWTs (desired). Share the new `.env` with teammates out-of-band, not via git.

### A2 — Move hardcoded credentials to `.env`
- **Pusher secret** hardcoded: `app/views.py:21-27` → load via `config('PUSHER_SECRET')` etc.
- **Google Maps key** hardcoded in 3 places: `Frontend/public/index.html:76`, `Frontend/src/view/home/Home.js:105`, `Order.js:198`. Client keys are always visible — the real fix is **HTTP-referrer + API restriction** in Google Cloud Console, plus a billing quota alert.

---

## 🟠 NOT auto-fixed — HIGH VALUE but needs testing with the running app

> These are correctness/security fixes I left for you because they change behavior or auth and should be verified against a live run + a migration. Each has the exact fix from the agents.

- **AC1 — Broken access control (biggest security hole).** `tokenauth()` (`views.py:471`) only checks signature/expiry, never *role*. All logins mint identical payloads with no `role` claim, so a logged-in customer can call admin endpoints (`ModelView`, `LocationViews`, `AdminStatus`, `SettingsViews`). **Fix:** add `'role': 'admin'|'vendor'|'user'` to each JWT payload at issuance, then check it in every role-specific view.
- **AC2 — Unauthenticated vendor edit/delete.** `RegisterUser.put`/`delete` (`views.py:161-219`) have **no** `tokenauth()` — anyone can overwrite or delete any vendor (cascades delete their products + orders). **Fix:** add the token guard like `.get` has.
- **AC3 — IDOR on order status.** `VendorOrders.put`/`AdminOrders.put` never check the order belongs to the caller. **Fix:** `if data.Product.UserId.pk != my_token['id']: return 403`.
- **AC4 — Password hashes + verify tokens in API responses.** Serializers use `fields='__all__'`; vendor hash ships in every public product listing (`serializer.py:29`). **Fix:** explicit field lists excluding `Password`/`Token`. *(Test frontend — the verify flow reads `UserModel.Token`.)*
- **INV1 — `qty` never decremented on order** (`OrderView.post`), only restored on cancel → stock drifts up forever, and orders can exceed stock. **Fix:** in `transaction.atomic()`, `select_for_update()` the product, check `qty >= requested`, decrement, then create the order.
- **PRICE1 — Client sends `Price`/`TotalPrice`;** server trusts them (`views.py:928-940`) → price tampering. **Fix:** recompute `TotalPrice = product.Price * Qty` server-side; stop sending it from `Order.js`.
- **CANCEL1 — Data-loss on cancel:** if the notification email throws, order is marked `Cancel` but qty is never restored, and retry returns *"Already canceled"* (success). **Fix:** wrap status+restock in `transaction.atomic()`; send email last in its own try/except.
- **AUTOCANCEL1 — The "6-hour auto-cancel" does not exist.** Only mentioned in email text. **Fix:** a scheduled job (Celery beat or a `manage.py` command via cron/Task Scheduler) that cancels + restocks `Accepted` orders older than 6h.
- **XSS1 — Stored XSS:** vendor `Description` (rich text) rendered via `dangerouslySetInnerHTML` at 6 sites with no sanitization; tokens live in `localStorage` → account takeover. **Fix:** `DOMPurify.sanitize(...)` at every render site.

---

## 🟡 NOT auto-fixed — quality / hardening (lower risk, do as time allows)

- **DEPLOY1** — `Frontend/src/baseUrl.js` hardcodes `127.0.0.1:8000`; prod build is DOA. Use `process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"`.
- **CRASH1** — `/map` (`Home.js:17`) and `/order_now` (`Order.js:19`) crash on refresh (unguarded `useLocation().state`). Guard with `|| {}` + redirect.
- **PUSHER1** — `pusher.subscribe/bind` in render body (no `useEffect`) in `VendorOrders.js`, `Orders.js`, `Category.js` → accumulating listeners / API hammering; admin channel uses `vendorid` (never set). Move into `useEffect` with cleanup.
- **REFETCH1** — `useEffect(..., [data.length])` where the effect sets `data` → double-fetch on mount, across ~10 files. Change to `[]`.
- **LOGIN-EXC1** — bare `except:` on all 4 login views masks server errors as "Invalid Credential". Catch `DoesNotExist`/`KeyError` specifically; log the rest.
- **EXC1** — ~27 endpoints return `str(e)` in an HTTP 200 with no logging; leaks internals, breaks client error handling. Return proper status codes + generic messages + `logging.exception(...)`.
- **REG-EXC1** — `UserRegister.post`, `RegisterUser.post`, `NearLocations.post` have no try/except at all → raw 500s; if the verification email fails, the account exists but the user is locked out with no recovery.
- **THROTTLE1** — no rate limiting on login endpoints; add DRF `AnonRateThrottle` (`5/min`).
- **PWVAL1** — custom auth bypasses `AUTH_PASSWORD_VALIDATORS`; a 1-char password is accepted. Call `validate_password()` before hashing.
- **HOSTS1** — `ALLOWED_HOSTS = []` will 400 every request once `DEBUG=False`. Use `config('ALLOWED_HOSTS', cast=Csv())`.
- **CORS1** — move `CorsMiddleware` to the top of `MIDDLEWARE` (`settings.py:57` → after SecurityMiddleware).
- **CASCADE1** — `OrderModel.Product on_delete=CASCADE` wipes order history when a product/vendor/category is deleted. Use `PROTECT` or `SET_NULL` + denormalize title/price onto the order.
- **N+1** — add `select_related('Product__ModalId','Product__UserId','User')` to order/product list views; add DRF pagination.
- **DEPS1** — bump `Django 4.0`, `PyJWT 1.7.1`, `Pillow 8.4.0` (known CVEs); run `pip-audit`.
- **ADMIN1** — `app/admin.py` exposes password hashes as editable text; add `ModelAdmin` with `exclude=('Password',)`.
- **SESSION1** — `LoginAdmin` sets `request.session['userid']` *before* the password check (`views.py:489`) and it's otherwise unused — remove it.
- **URLS1** — duplicate `name=` on ~6 route pairs in `urls.py` — give distinct names.
- **DEADCODE1** — delete unused `Frontend/src/view/home/Category copy.js` and `view/users/UserHome copy.js`.
- **STATUS-MISMATCH note** — the status state machine is inconsistent (`pending`/`enable`/`active`); F1 makes login work, but consider standardizing the values.

---

## What the code already does right (not flagged)
- Passwords hashed (passlib PBKDF2-SHA256). No raw SQL (no injection surface). CORS is an explicit allowlist (not wildcard). JWT decode pins `algorithms=["HS256"]`. No `dangerouslySetInnerHTML` beyond the vendor-description sites in XSS1.
