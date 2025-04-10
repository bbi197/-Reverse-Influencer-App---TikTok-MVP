# 🔥 Reverse Influencer App - TikTok MVP

## Overview

This is an MVP (Minimum Viable Product) for a "Reverse Influencer" concept on TikTok. The application allows users to pay influencers a certain amount of money to temporarily "silence" them. This MVP focuses on the frontend built with React, integration with Firebase for data storage, and includes basic UI elements for selecting influencers and payment tiers.

**Key Features:**

* **Browse Influencers:** Displays a list of TikTok creators fetched from Firebase.
* **View Status:** Indicates whether an influencer is currently active or silenced and until when.
* **Select Silence Duration:** Offers predefined tiers with different durations (1 hour, 6 hours, 24 hours) and corresponding prices.
* **Initiate Silence:** Allows users to "pay to silence" an influencer for a selected duration. This action updates the influencer's status in Firebase.
* **Basic Payment Placeholder:** Includes a comment indicating where the payment gateway integration (e.g., Stripe, MPESA) would be implemented.
* **Basic UI:** Utilizes `shadcn/ui` components for a clean and functional user interface.

**Technology Stack:**

* **Frontend:** React
* **UI Library:** `shadcn/ui`
* **Backend (Data Storage):** Firebase (Firestore)

## Setup and Installation

1.  **Clone the repository (if you have it on GitHub):**
    ```bash
    git clone <repository-url>
    cd reverse-influencer-app/frontend
    ```

2.  **Install frontend dependencies:**
    ```bash
    npm install  # or yarn install
    ```

3.  **Set up Firebase:**
    * Create a new project on [Firebase Console](https://console.firebase.google.com/).
    * Create a Firestore database within your project.
    * Configure your Firebase project by getting your project's configuration object. You can find this in the Firebase Console under "Project settings" -> "Your apps" (Web).
    * Create a `firebaseConfig.js` file in the `frontend/src` directory and paste your Firebase configuration:

        ```javascript
        // frontend/src/firebaseConfig.js
        import { initializeApp } from "firebase/app";
        import { getFirestore } from "firebase/firestore";

        const firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_AUTH_DOMAIN",
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_STORAGE_BUCKET",
          messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
          appId: "YOUR_APP_ID",
        };

        const app = initializeApp(firebaseConfig);
        export const db = getFirestore(app);
        ```

    * **Important:** Replace the placeholder values (`YOUR_...`) with your actual Firebase project credentials. **For production, consider using environment variables to store sensitive information.**

4.  **Start the frontend development server:**
    ```bash
    npm run dev # or yarn dev
    ```

    This will typically start the application at `http://localhost:3000`.

## Firebase Setup

This MVP relies on a Firestore collection named `creators`. Each document in this collection should represent an influencer and have at least the following fields:

* `name`: (String) The name of the influencer.
* `blockedUntil`: (Timestamp - optional) The timestamp until which the influencer is silenced. If this field doesn't exist or the timestamp is in the past, the influencer is considered active.

You'll need to manually add some initial influencer data to your Firestore `creators` collection through the Firebase Console.

## Payment Integration

The current MVP has a placeholder comment in the `payToSilence` function:

```javascript
// Optional: Call Stripe/MPESA payment flow here
// window.location.href = `/payment?amount=${tier.price}&creator=${creator.id}`;