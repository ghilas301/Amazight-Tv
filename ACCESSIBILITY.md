# Guide d'Accessibilité - Amazigh TV

## Standards Respectés
- ✅ WCAG 2.1 Level AA
- ✅ Aria-labels sur tous les boutons et icônes
- ✅ Navigation au clavier complète
- ✅ Contraste texte/fond ≥ 4.5:1
- ✅ Support lecteurs d'écran (VoiceOver, NVDA)

## Améliorations Implémentées

### 1. Attributs ARIA
- `aria-label` sur tous les boutons interactifs
- `aria-modal` sur les modales pour clarifier le rôle
- `aria-hidden` pour éléments purement décorratifs (icônes visuelles)
- `role="banner"` sur le header
- `role="navigation"` sur le menu
- `role="main"` sur le contenu principal
- `role="contentinfo"` sur le footer
- `aria-current="page"` sur le lien de page actif
- `aria-live="polite"` sur les messages de statut

### 2. Navigation au Clavier
- **Tab** : Navigation entre éléments interactifs
- **Enter/Espace** : Activer boutons et liens
- **Escape** : Fermer modales
- **Flèches gauche/droite** : Navigation entre vidéos dans le lecteur
- Focus visible sur tous les éléments
- `tabindex="0"` sur les cartes de film pour inclusion dans le flux

### 3. Améliorations des Modales
- Focus trap : le focus reste dans la modale quand ouverte
- Rôle `alertdialog` pour la modale AdBlock (plus critique)
- Rôle `dialog` pour la modale vidéo
- Fermeture avec Escape (sauf AdBlock)
- Messages d'erreur avec `role="alert"`
- `aria-labelledby` pour lier titre et modale

### 4. Images
- `alt` descriptifs sur tous les posters de film
- `alt` vides pour les icônes purement décoratives
- `loading="lazy"` pour performance
- Descriptions incluent le genre et la durée

### 5. Texte et Contraste
- Taille minimale 16px sur mobile
- Ratio contraste 4.5:1 pour texte important
- Line-height ≥ 1.5 pour lisibilité
- Distinctions visuelles claires (couleurs + formes)

### 6. Sémantique HTML
- Titres hiérarchiques correctes (h1 → h2 → h3)
- `<header>`, `<main>`, `<footer>` explicites
- `<nav>` avec `aria-label`
- `<article>` pour les cartes de film
- `<section>` pour les groupes de contenu

## Tests Recommandés

### Outils Automatisés
```bash
# axe DevTools (Chrome/Firefox)
- Extension gratuite pour tester l'accessibilité
- https://www.deque.com/axe/devtools/

# Lighthouse (Chrome DevTools)
- Audit d'accessibilité intégré
- F12 → Lighthouse → Accessibility

# WAVE (WebAIM)
- https://wave.webaim.org/
- Outil web + extension navigateur

# Contrast Checker
- https://webaim.org/resources/contrastchecker/
```

### Tests Manuels
- Navigation clavier seule (Tab, Shift+Tab, Enter, Escape)
- Lecteur d'écran (VoiceOver Mac/iOS ou NVDA Windows ou JAWS)
- Zoom texte à 200% (Ctrl+Plus ou navigateur)
- Mode contraste élevé (système d'exploitation)
- Mobile avec 1 main uniquement

## Conformité et Métriques

| Élément | Conformité | Notes |
|---------|-----------|-------|
| Navigation clavier | ✅ Complète | Tab, Escape, Enter, Flèches |
| Focus visible | ✅ Oui | Outline visible sur tous les éléments |
| Couleurs | ✅ 4.5:1 minimum | Contrast ratio respecté |
| Texte | ✅ 16px minimum | Taille mobile optimisée |
| Images | ✅ Alt text | Tous les posters décrits |
| Modales | ✅ Accessible | Focus trap, ARIA labels |
| Lecteur vidéo | ✅ Accessible | Iframe avec title |

## Ressources Complémentaires

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Aria Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Blog](https://webaim.org/blog/)
- [Inclusive Components](https://inclusive-components.design/)

## Checklist de Maintenance

- [ ] Tester avec clavier uniquement chaque mois
- [ ] Vérifier contraste avec Lighthouse mensuellement
- [ ] Tester avec lecteur d'écran trimestriellement
- [ ] Mettre à jour les alt text avec les nouveaux films
- [ ] Documenter les changements d'accessibilité
