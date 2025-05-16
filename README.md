# Invoice Manager

A modern, responsive web application to **create**, **edit**, and **manage invoices**. Built with **React**, **TypeScript**, and **Tailwind CSS**. Features a modal-based form with validation, dynamic item lists, and support for draft or finalized invoices.

---

## 🚀 Features

- 🧾 Create, edit, and delete invoices
- 📬 Save as draft or send invoices
- 🧠 Form modal supports both new and pre-filled (edit) states
- 🛠 Built with TypeScript for type safety
- 🎨 Styled using Tailwind CSS
- 💻 Fully responsive layout

---

## 📦 Tech Stack

- **React** (v18+)
- **TypeScript**
- **Tailwind CSS**
- **Vite**

---

## ✨ Modal Form Highlights

The `Form` component:

- Accepts `initialData` to support editing
- Manages state for nested address and item data
- Dynamically adds/removes items
- Uses a `dialog` element wrapped in a portal for accessibility and proper overlay rendering

---

📌 To-Do

- Add backend or local storage
- Implement invoice PDF download
- Add filters (e.g., paid, draft, overdue)
- Implement form validation with a library (like Zod or Yup)

---

🙌 Acknowledgments

Thanks to the frontend mentor community and open-source projects for inspiration.
