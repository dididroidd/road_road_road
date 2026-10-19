import { PRACTICE_LABELS, PRACTICES } from "@road/shared";

// Point d'entrée des imports de circuits. Les adaptateurs de sources arrivent avec T09.
console.log(`Pratiques gérées : ${PRACTICES.map((p) => PRACTICE_LABELS[p]).join(", ")}`);
