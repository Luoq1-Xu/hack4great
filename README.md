# Minimart and Voucher System Webpage Design

## Overview
The Muhammadiyah Welfare Home (MWH) is dedicated to providing care and support for boys residing on its campus, fostering a nurturing environment to help them thrive. The proposed prototype directly aligns with MWH's mission by creating a streamlined and accessible system that empowers residents through self-management of their needs and simplifies administrative operations for staff.

### Context of the Solution
MWH seeks to implement a web-based Minimart and Voucher System that will empower its residents and streamline its operations. The system aims to:

- **Enable Users (residents):**
  - View products available in the Minimart.
  - Example Interaction: A resident logs into the dashboard, browses available products, and places an order for soap and shampoo. If the item is out of stock, they can submit a preorder request, which will notify the admin for approval and restocking.

- **Support Admins (MWH staff):**
  - Add, edit, or delete products in the inventory.
  - Manage users by adding, suspending, or resetting accounts.

- **Secure Login Feature:**
  - A secure authentication system to protect resident and admin accounts, with an optional password reset via mobile.

### Reflecting Innovation for MWH's Unique Needs
The design choices focus on providing innovative solutions tailored specifically to the operations and needs of MWH. By introducing features such as a centralized inventory system and secure login, the platform empowers residents while streamlining staff workflows. This independence aligns with MWH's goal of fostering personal growth among its residents.

For the staff, tools like detailed audit logs, automated inventory management, and quick reporting functionalities streamline traditionally time-consuming administrative tasks. These features ensure efficiency, accountability, and accuracy, reducing the likelihood of human error and enabling the staff to focus more on impactful initiatives. 

---

## 1. Resident Landing Page: Dashboard
### Purpose
- Overview for residents to view products available in the Minimart.

### Design Layout
```
![alt text](telegram-cloud-photo-size-5-6075620502124217720-y.jpg)
```

---

## 2. Admin Landing Page: Product Management
### Purpose
- Allow admins to add, edit, or delete products.

### Design Layout
```
![alt text](telegram-cloud-photo-size-5-6075620502124217721-y.jpg)
```

---

## 3. Admin Landing Page: User Management
### Purpose
- Allow admins to manage resident accounts.

### Design Layout
```
![alt text](telegram-cloud-photo-size-5-6075620502124217723-y.jpg)
![alt text](telegram-cloud-photo-size-5-6075620502124217722-y.jpg)
```

---

## Design Principles
- **Responsive Design:** Ensure all pages are usable on both desktop and mobile.
- **Clear Navigation:** Keep the header consistent with relevant links for each role (Resident/Admin).
- **Action-Oriented:** Provide prominent buttons for critical actions (e.g., "Order," "Approve").
- **Visual Hierarchy:** Use larger fonts and contrasting colors for key information (e.g., "You have X vouchers").

---

## Future Plans
- **Preordering Out-of-Stock Items:** Allow residents to submit preorders, with admins prioritizing restocking.  
- **Comprehensive Reporting:** Automate weekly or monthly summaries of voucher usage, product requests, and inventory status.  
- **Auction System:** Introduce a feature where residents can bid on special items using voucher points.

---

## Acknowledgments
This project was built using the [Next.js PostgreSQL NextAuth TailwindCSS Template](https://github.com/vercel/nextjs-postgres-nextauth-tailwindcss-template) by Vercel. We extend our gratitude for their foundational work, which has enabled the creation of this tailored solution for MWH. 

<div align="center">Built with the Next.js App Router</div>
<div align="center">Built upon Next.js 15 Admin Dashboard Template - "https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs"</div>
<br />
<div align="center">
