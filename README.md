# Playwright TypeScript QA Demo

Ce repository est une vitrine démonstration QA. Il présente un framework Playwright en TypeScript avec une structure de tests claire, une configuration multiplateforme et un style propre axé sur les bonnes pratiques de test automatisé.

## 🎯 Objectif

- Montrer une architecture de tests E2E moderne avec Playwright et TypeScript
- Présenter des scénarios UI réels ciblant des cas de test robustes
- Démontrer la maintenance via un pattern Page Object Model
- Présenter l’intégration avec GitHub Actions pour l’exécution CI

## 🚀 Ce que contient ce projet

- `tests/ui/`: tests UI Playwright
- `pages/`: objets de page réutilisables
- `playwright.config.ts`: configuration Playwright multi-navigateurs
- `.github/workflows/playwright.yml`: workflow CI pour exécuter les tests
- `.github/workflows/sync-develop.yml`: workflow de synchronisation automatique de la branche `develop` à chaque évolution de `main`

## ✅ Scénarios couverts

- `tests/ui/click.spec.ts` : validation d’un scénario de clic sur un bouton qui ignore certains événements DOM, avec adaptation pour WebKit
- `tests/ui/dynamicId.spec.ts` : vérification d’un bouton avec un ID dynamique

Ce projet est en évolution continue : la base UI actuelle sera complétée par une couche de tests API dédiée et des scénarios de validation plus étendus.

## 🧱 Stack technique

- Playwright
- TypeScript
- Page Object Model
- GitHub Actions

## 📦 Installation

```bash
npm install
```

## ▶️ Exécution des tests

```bash
npx playwright test
```

### Exécuter un seul test

```bash
npx playwright test tests/ui/click.spec.ts
```

## 📁 Structure du projet

- `api/` : dossier prévu pour les tests API et clients API
- `fixtures/` : dossier pour fixtures de test partagées
- `pages/` : objets de page réutilisables
- `tests/ui/` : tests de bout en bout UI
- `playwright-report/` : rapport HTML généré après exécution
- `test-results/` : résultats des tests

## 💡 Pourquoi ce repo est une vitrine QA

Ce projet est conçu pour montrer que je maîtrise :

- la création d’un framework de test maintenable
- l’écriture de scénarios fonctionnels robustes
- l’utilisation de Playwright sur plusieurs navigateurs
- l’intégration de tests dans un pipeline GitHub Actions

## 🔧 Pour aller plus loin

- ajouter des tests API dans `tests/api`
- enrichir la stratégie de reporting et d’artefacts
- ajouter des tests mobile ou des tests cross-browser supplémentaires
- étendre le pattern Page Object Model avec des components et utilities
