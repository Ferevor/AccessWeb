# AccessWeb - Mini-Site Web Accessible

## À Propos du Projet

Mon Projet est un mini-site web complet, performant et accessible développé en appliquant les normes **WCAG** et les bonnes pratiques de qualité web.

### Objectif
Développer un site web moderne et inclusif qui garantit une expérience utilisateur optimale pour tous, y compris les personnes en situation de handicap. Le projet démontre l'importance de l'accessibilité web et de la performance dans la création de contenu numérique de qualité.

### Contraintes
- ✅ **HTML uniquement** pour la structure
- ✅ **CSS uniquement** pour le style et la mise en page
- ✅ **JavaScript uniquement** pour l'interactivité
- ❌ **Aucun framework ou librairie externe autorisé**

## Contenu du Site

Le site est composé de 4 pages principales :

1. **Accueil** - Page d'accueil du site
2. **À Propos** - Informations sur le projet et ses objectifs
3. **Produit** - Présentation des proposés
4. **Contact** - Formulaire de contact

## Structure du Projet

```
AccessWeb/
├── accueil.html           # Page d'accueil (point d'entrée)
├── a-propos.html          # Page "À Propos"
├── produit.html           # Page "Produit"
├── contact.html           # Page "Contact"
├── README.md              # Ce fichier
│
├── css/
│   ├── common.css         # Styles communs à toutes les pages
│   ├── accueil.css        # Styles spécifiques à la page d'accueil
│   ├── a-propos.css       # Styles spécifiques à la page "À Propos"
│   ├── produit.css        # Styles spécifiques à la page "Produit"
│   └── contact.css        # Styles spécifiques à la page "Contact"
│
├── js/
│   └── script.js          # Scripts JavaScript centralisés
│
├── images/                # Dossier contenant les images du site
│
├── video/                 # Dossier contenant les vidéos du site
│
├── subtitles/             # Sous-titres pour l'accessibilité vidéo
│   ├── cc-fr.vtt          # Sous-titres en français
│   └── cc-en.vtt          # Sous-titres en anglais
│
├── Rapports Lighthouse/   # Rapports d'audit de performance
│
└── Résultat WAVE/         # Résultats d'audit d'accessibilité (WAVE)
```

## Comment Lancer le Projet

### Option 1 : Ouverture Directe
1. Accédez au dossier `AccessWeb`
2. Double-cliquez sur **`accueil.html`** pour ouvrir la page d'accueil dans votre navigateur par défaut

### Option 2 : Avec VS Code (Live Server)
1. Installez l'extension "Live Server" dans VS Code
2. Faites un clic-droit sur `accueil.html`
3. Sélectionnez "Open with Live Server"

## Page d'Accueil

La première page à ouvrir est **`accueil.html`** qui sert de point d'entrée au site et présente une vue d'ensemble du projet.

## Fonctionnalités d'Accessibilité

Le projet intègre les meilleures pratiques en matière d'accessibilité :

- ✅ **Navigation au clavier** - Utilisation complète du site sans souris
- ✅ **ARIA Labels** - Attributs ARIA pour les lecteurs d'écran
- ✅ **Contraste des couleurs** - Rapport de contraste conforme aux normes WCAG
- ✅ **Textes alternatifs** - Description des images pour les utilisateurs malvoyants
- ✅ **Structure sémantique** - Utilisation appropriée des balises HTML sémantiques
- ✅ **Sous-titrage vidéo** - Vidéos accompagnées de sous-titres (FR/EN)
- ✅ **Taille de police adéquate** - Police lisible et redimensionnable
- ✅ **Responsive Design** - Site adapté à tous les appareils

## Validation et Audits

Le projet a été validé avec les outils suivants :

- **Lighthouse** - Audit de performance et d'accessibilité (rapports disponibles dans `Rapports Lighthouse/`)
- **WAVE** - Vérification de l'accessibilité web (résultats dans `Résultat WAVE/`)

## Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Mise en page responsive et moderne
- **JavaScript Vanilla** - Interactivité sans dépendances externes

## Normes et Standards

Le projet respecte les standards suivants :

- **WCAG 2.1 Level AA** - Web Content Accessibility Guidelines
- **HTML5** - Spécifications du W3C
- **CSS3** - Spécifications du W3C
- **Bonnes pratiques de qualité web** - Performance, sécurité et maintenabilité

## Contributions

Les contributions sont bienvenues ! N'hésitez pas à :
- Signaler les bugs ou problèmes d'accessibilité
- Proposer des améliorations
- Optimiser les performances

## Licence

Ce projet est développé à titre éducatif.

---