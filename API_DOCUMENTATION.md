# API Documentation

This document provides an overview of the REST API endpoints available in the AI Resume Builder SaaS.

## Base URL

`/api`

## Authentication

All protected endpoints require authentication. Users must be authenticated via Better Auth. Session cookies or a bearer token (if implemented) should be used for authorization.

## Endpoints

---

### 1. Referral API

**Generate a new referral code for the authenticated user.** If a user already has an active code, the existing one is returned.

*   **Endpoint:** `POST /api/referral`
*   **Authentication:** Required
*   **Request Body:** None
*   **Responses:**
    *   **`200 OK`**: Successfully returned a referral code.
        ```json
        {
          "code": "YOUR_REFERRAL_CODE"
        }
        ```
    *   **`401 Unauthorized`**: User is not authenticated.
    *   **`500 Internal Server Error`**: An unexpected error occurred.

---

### 2. Coupon API

**Validate a coupon code.** Checks if a coupon code is valid, not expired, and has not exceeded its usage limit. It also checks if the authenticated user has already used the coupon.

*   **Endpoint:** `POST /api/coupon/validate`
*   **Authentication:** Required
*   **Request Body:**
    ```json
    {
      "code": "YOUR_COUPON_CODE"
    }
    ```
*   **Responses:**
    *   **`200 OK`**: Coupon is valid.
        ```json
        {
          "id": "coupon_id_string",
          "code": "YOUR_COUPON_CODE",
          "type": "percentage" | "fixed_amount" | "free_trial",
          "value": 20 // e.g., 20 for 20% or $20
        }
        ```
    *   **`400 Bad Request`**: Coupon code not provided.
    *   **`401 Unauthorized`**: User is not authenticated.
    *   **`404 Not Found`**: Coupon not found, expired, or already used by the user.
    *   **`500 Internal Server Error`**: An unexpected error occurred.

---

### 3. AI Features API

These endpoints power the AI generation capabilities.

#### 3.1. Generate Resume

*   **Endpoint:** `POST /api/ai/generate`
*   **Authentication:** Required
*   **Credits:** 50 credits deducted per generation.
*   **Description:** Generates a full resume based on user profile data.
*   **Request Body:** (Details depend on the input structure for resume generation)
*   **Responses:**
    *   **`200 OK`**: Resume generated successfully.
    *   **`401 Unauthorized`**:
    *   **`402 Payment Required`**: Insufficient credits.
    *   **`500 Internal Server Error`**:

#### 3.2. Improve Resume Section

*   **Endpoint:** `POST /api/ai/improve`
*   **Authentication:** Required
*   **Credits:** 10 credits deducted per improvement.
*   **Description:** Enhances a specific section of a resume using AI.
*   **Request Body:** (Details depend on the input structure for section improvement)
*   **Responses:**
    *   **`200 OK`**: Section improved successfully.
    *   **`401 Unauthorized`**:
    *   **`402 Payment Required`**: Insufficient credits.
    *   **`500 Internal Server Error`**:

#### 3.3. ATS Optimization

*   **Endpoint:** `POST /api/ai/ats-optimize`
*   **Authentication:** Required
*   **Credits:** 25 credits deducted per analysis.
*   **Description:** Analyzes a resume for ATS compatibility, provides a score, keywords, and suggestions. Also generates a tailored cover letter.
*   **Request Body:** (Details depend on the input structure for ATS optimization)
*   **Responses:**
    *   **`200 OK`**: ATS analysis and cover letter generated successfully.
    *   **`401 Unauthorized`**:
    *   **`402 Payment Required`**: Insufficient credits.
    *   **`500 Internal Server Error`**:

---

### 4. Resumes API

**Import a resume from a file.** Supports PDF, DOCX, and TXT formats. Parses the resume text with AI and populates resume fields automatically.

*   **Endpoint:** `POST /api/resumes/import`
*   **Authentication:** Required
*   **Request Body:** `multipart/form-data` with the resume file.
*   **Responses:**
    *   **`200 OK`**: Resume parsed and fields populated.
    *   **`400 Bad Request`**: Invalid file format or content.
    *   **`401 Unauthorized`**:
    *   **`500 Internal Server Error`**:

---

### 5. Stripe Webhooks

**Handles Stripe events to update user subscriptions and credit balances.** This endpoint is called by Stripe, not directly by the client application.

*   **Endpoint:** `POST /api/stripe/webhook`
*   **Authentication:** Stripe webhook signature verification.
*   **Description:** Processes events such as `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, and `invoice.payment_failed`.
*   **Request Body:** Stripe event object.
*   **Responses:**
    *   **`200 OK`**: Event successfully processed.

---

### 6. Credits API

**Get the current credit statistics for the authenticated user.**

*   **Endpoint:** `GET /api/credits/stats`
*   **Authentication:** Required
*   **Request Body:** None
*   **Responses:**
    *   **`200 OK`**: Returns current credit balance and usage.
        ```json
        {
          "totalCredits": 100,
          "creditsUsed": 50,
          "remainingCredits": 50
        }
        ```
    *   **`401 Unauthorized`**:
    *   **`500 Internal Server Error`**: