/* ============================================================
   TESTS-DATA.JS
   ============================================================
   YAHI FILE EDIT KARO NAYA TEST ADD KARNE KE LIYE.
   Bas neeche di gayi list mein ek naya { } object add karo,
   aur "file" path mein apni nayi HTML file ka path daalo.
   Naya folder banaya hai to yahin ek nayi array bhi bana sakte ho
   (jaise chapterWise, mockTests, previousYear ban rakhe hain).
   ============================================================ */

const TESTS_DATA = {

    // === TAB 1: પ્રકરણવાર (chapter-wise) — files go in /tests/chapter-wise/ ===
    chapterWise: [
        {
            title: "આનુવંશિકતા",
            icon: "fa-dna",
            color: "green",
            questions: 15,
            rating: "4.8",
            badge: "પ્રકરણ 1",
            file: "tests/chapter-wise/ch1-aanuvanshikta.html"
        },
        {
            title: "વનસ્પતિ શાસ્ત્ર",
            icon: "fa-leaf",
            color: "green",
            questions: 20,
            rating: "4.6",
            badge: "પ્રકરણ 2",
            file: "tests/chapter-wise/template.html"
        }
        // 👉 નવો ચેપ્ટર ઉમેરવા માટે અહીં નીચે comma પછી નવો { } બ્લોક ઉમેરો
    ],

    // === TAB 2: મોક ટેસ્ટ — files go in /tests/mock-tests/ ===
    mockTests: [
        {
            title: "મોક ટેસ્ટ – 1",
            icon: "fa-flask",
            color: "amber",
            questions: 45,
            duration: 60,
            badge: "ફુલ સિલેબસ",
            badgeClass: "blue",
            file: "tests/mock-tests/mock-1.html"
        },
        {
            title: "મોક ટેસ્ટ – 2",
            icon: "fa-flask",
            color: "amber",
            questions: 50,
            duration: 60,
            badge: "ફુલ સિલેબસ",
            badgeClass: "blue",
            file: "tests/mock-tests/template.html"
        }
    ],

    // === TAB 3: પાછલા વર્ષ — files go in /tests/previous-year/ ===
    previousYear: [
        {
            title: "NEET 2025",
            icon: "fa-history",
            color: "violet",
            questions: 50,
            year: 2025,
            badge: "પાછલું",
            file: "tests/previous-year/neet-2025.html"
        },
        {
            title: "NEET 2024",
            icon: "fa-history",
            color: "violet",
            questions: 50,
            year: 2024,
            badge: "પાછલું",
            file: "tests/previous-year/template.html"
        }
    ]
};

