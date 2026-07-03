# NEET Gujarati — Test Platform

Ye ek simple, no-backend NEET test platform hai. Sab kuch static HTML/CSS/JS hai, isliye **GitHub Pages** par directly free host ho sakta hai.

## 📁 Folder Structure

```
neet-gujarati/
├── index.html                 ← Main homepage (yahan mat chhedo, ye auto-render karta hai)
├── assets/
│   ├── css/
│   │   ├── style.css          ← Poori site ka design
│   │   └── quiz.css           ← Test/quiz page ka design
│   └── js/
│       ├── tests-data.js      ← 🌟 YE FILE EDIT KARO naya test add karne ke liye
│       ├── main.js            ← Homepage cards render karta hai (isse touch mat karo)
│       └── quiz-engine.js     ← Test lene ka engine (timer, scoring, review)
└── tests/
    ├── chapter-wise/          ← Chapter-wise tests yahan
    ├── mock-tests/            ← Mock tests yahan
    └── previous-year/         ← Purane papers yahan
        └── template.html      ← Har folder mein ek template hai, isko copy karo
```

## ➕ Naya Test Kaise Add Karein (2 Steps)

**Step 1 — Naya HTML file banao**
Jis folder mein test daalna hai (jaise `tests/chapter-wise/`), wahan `template.html` ko copy karke naya naam do:
```
tests/chapter-wise/ch3-manav-sharir.html
```
File ke andar niche `QUIZ_CONFIG` object mein apna title aur questions likh do:
```js
const QUIZ_CONFIG = {
    title: "માનવ શરીરરચના - પ્રકરણ 3",
    durationMinutes: 15,
    questions: [
        {
            q: "તમારો સવાલ?",
            options: ["A", "B", "C", "D"],
            answer: 1,               // sahi jawaab ka index (0 se shuru)
            explanation: "Optional samjhuti"
        }
    ]
};
```

**Step 2 — `assets/js/tests-data.js` mein entry add karo**
Us array mein (chapterWise / mockTests / previousYear) ek naya block add karo:
```js
{
    title: "માનવ શરીરરચના",
    icon: "fa-heart",
    color: "green",
    questions: 18,
    rating: "4.9",
    badge: "પ્રકરણ 3",
    file: "tests/chapter-wise/ch3-manav-sharir.html"
}
```
Bas — homepage automatically ye naya card dikha dega, click karne par test khulega.

## 📂 Naya Folder/Category Kaise Add Karein

1. `tests/` ke andar naya folder banao (jaise `tests/pyq-2026/`)
2. Us folder mein `template.html` copy karo (kisi bhi existing folder se)
3. `tests-data.js` mein ek naya array bana do (jaise `pyq2026: [...]`)
4. `index.html` mein ek naya tab-button + tab-content section jodo, aur `main.js` mein `renderGrid('newGridId', TESTS_DATA.pyq2026)` line add karo `renderAllTestGrids()` function ke andar.

*(Agar aapko sirf naye tests add karne hain existing 3 categories mein — chapter-wise/mock/previous-year — to yahan tak padhne ki zaroorat nahi, upar wale 2 Steps hi kaafi hain.)*

## 🚀 GitHub Pages Par Host Karna

1. Is poore folder ko GitHub repo mein push karo
2. Repo Settings → Pages → Source: `main` branch, root folder
3. Kuch minute mein `https://<username>.github.io/<repo-name>/` par live ho jayega

## ✅ Icons Available (Font Awesome)
Kisi bhi test card ke liye `icon` field mein ye jaisi values de sakte ho: `fa-dna`, `fa-leaf`, `fa-heart`, `fa-microscope`, `fa-brain`, `fa-lungs`, `fa-bolt`, `fa-eye`, `fa-flask`, `fa-history`. Poori list: https://fontawesome.com/icons
