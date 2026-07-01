export const translations = {
  fr: {
    common: {
      back: "Retour",
      backHome: "Retour à l'accueil",
      install: "Installer l'App",
      iosInstall: "Pour installer sur iPhone : appuyez sur Partager puis 'Sur l'écran d'accueil'."
    },
    installHub: {
      title: "Choisir le mode d'installation",
      desc: "Voulez-vous installer AlexCipher comme une application native ou un raccourci ?",
      option1Title: "Liste des Applications (WebAPK)",
      option1Desc: "L'app apparaîtra dans votre tiroir d'applications Android avec les autres apps.",
      option2Title: "Écran d'Accueil",
      option2Desc: "Crée un raccourci rapide sur votre écran principal pour un accès instantané.",
      btnInstall: "Installer maintenant",
      iosNote: "Sur iOS, l'installation se fait via le menu de partage de Safari.",
      close: "Fermer"
    },
    nav: {
      dashboard: "Dashboard",
      keys: "Mes Clés",
      faq: "Aide",
      privacy: "Confidentialité",
      terms: "Conditions",
      api: "API",
      footerNote: "Fait avec ❤️ par AlexCipher",
      developer: "Développé par Alexis Mupole",
      tagline: "Sécurisez vos échanges en un clic",
      whatsapp: "WhatsApp"
    },
    agreement: {
      title: "Engagement Responsable",
      desc: "Avant d'utiliser AlexCipher, vous devez accepter nos conditions d'utilisation et vous engager à une utilisation éthique de nos outils de chiffrement.",
      check1: "J'accepte les conditions d'utilisation et la politique de confidentialité.",
      check2: "Je m'engage à utiliser cette application de façon responsable et légale.",
      btn: "Accepter et Continuer"
    },
    legal: {
      privacy: {
        title: "Politique de Confidentialité",
        desc: "Votre vie privée est notre priorité absolue. Voici comment nous protégeons vos données.",
        sections: [
          { title: "Traitement 100% Local", content: "Contrairement aux services de cloud, AlexCipher traite toutes les données directement dans votre navigateur. Aucun texte, aucune clé et aucune donnée sensible n'est envoyé à un serveur. Le chiffrement et le déchiffrement s'effectuent exclusivement sur votre appareil." },
          { title: "Aucune Collecte de Données", content: "Nous ne collectons, ne stockons ni ne partageons aucune donnée personnelle. AlexCipher ne dispose d'aucun serveur backend, base de données ou système d'authentification. Vous n'avez besoin d'aucun compte pour utiliser l'application." },
          { title: "Absence de Cookies", content: "Nous n'utilisons aucun cookie de pistage, publicitaire ou analytique. Nous utilisons uniquement le stockage local (localStorage) de votre navigateur pour mémoriser vos préférences de langue et vos clés si vous décidez de les enregistrer localement. Aucune information n'est transmise à un tiers." },
          { title: "Zéro Log", content: "Il n'existe aucun journal d'activité, aucune télémétrie et aucun suivi d'utilisation. Ce que vous chiffrez reste votre secret exclusif. Nous ne pouvons pas voir, lire ou accéder à vos messages, clés ou fichiers." },
          { title: "Conformité RGPD", content: "Conformément au Règlement Général sur la Protection des Données (RGPD) de l'Union Européenne, nous vous informons qu'aucune donnée personnelle n'est traitée, stockée ou transférée par nos soins. Vous exercez un contrôle total sur vos informations. Aucune demande de consentement n'est nécessaire car aucun traitement n'a lieu." },
          { title: "Services Tiers", content: "AlexCipher n'intègre aucun service tiers d'analyse, de publicité ou de réseaux sociaux. L'application fonctionne de manière autonome sans dépendre de ressources externes une fois chargée. Aucune donnée n'est partagée avec des partenaires ou fournisseurs." },
          { title: "Sécurité des Données", content: "Bien que nous mettions en œuvre des mesures de sécurité techniques et organisationnelles appropriées, la sécurité de vos données dépend également de la robustesse de vos clés et de vos pratiques. Utilisez des clés fortes, ne partagez jamais votre clé sur le même canal que le message chiffré, et effacez votre presse-papier après utilisation." },
          { title: "Modifications de la Politique", content: "Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page. Nous vous encourageons à consulter régulièrement cette page pour prendre connaissance des éventuelles mises à jour." }
        ]
      },
      terms: {
        title: "Conditions d'Utilisation",
        desc: "En utilisant AlexCipher, vous acceptez les règles suivantes.",
        sections: [
          { title: "Acceptation des Conditions", content: "En accédant à ou en utilisant AlexCipher, vous reconnaissez avoir lu, compris et accepté d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application." },
          { title: "Description du Service", content: "AlexCipher est un outil de chiffrement et de déchiffrement local fonctionnant entièrement dans le navigateur. Il permet aux utilisateurs de chiffrer des messages à l'aide de divers algorithmes (AES-256, RSA, Vigenère, César, etc.). L'application est fournie gratuitement et sans garantie." },
          { title: "Utilisation Responsable", content: "L'utilisateur s'engage à ne pas utiliser AlexCipher pour des activités illégales, malveillantes ou portant atteinte à autrui. Il est expressément interdit d'utiliser l'application pour enfreindre les lois applicables, notamment en matière de sécurité nationale, de propriété intellectuelle ou de protection des données." },
          { title: "Responsabilité des Clés", content: "AlexCipher est un outil de chiffrement fort. Si vous perdez votre clé secrète, les données chiffrées sont irrécupérables. Nous ne pouvons en aucun cas restaurer l'accès à vos données, car nous n'avons aucun moyen technique ou légal de le faire (absence de backdoor, de base de données ou de serveur)." },
          { title: "Propriété Intellectuelle", content: "AlexCipher est un projet open source. Le code source est mis à disposition à des fins éducatives et pratiques. Toute reproduction, modification ou distribution doit respecter la licence du projet. Le nom 'AlexCipher' et le logo sont la propriété d'Alexis Mupole." },
          { title: "Absence de Garantie", content: "L'application est fournise « en l'état », sans garantie d'aucune sorte, expresse ou implicite. Nous ne garantissons pas que l'application fonctionnera sans interruption, sans erreur ou que les algorithmes de chiffrement resteront inviolables face aux avancées technologiques futures." },
          { title: "Limitation de Responsabilité", content: "Alexis Mupole et AlexCipher ne pourront en aucun cas être tenus responsables des dommages directs, indirects, accidentels ou consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser l'application, y compris la perte de données, la perte de profits ou l'interruption d'activité." },
          { title: "Loi Applicable", content: "Les présentes conditions sont régies par le droit de la République Démocratique du Congo. Tout litige relatif à l'utilisation d'AlexCipher sera soumis à la juridiction compétente de Kinshasa." },
          { title: "Modifications des Conditions", content: "Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Les modifications prennent effet dès leur publication sur cette page. L'utilisation continue de l'application après les modifications constitue votre acceptation des nouvelles conditions." }
        ]
      }
    },
    developer: {
      title: "Développeur",
      desc: "Alexis Mupole Uwizeye — Consultant en Ingénierie Numérique",
      location: "Kinshasa, RD Congo",
      experience: "5+ Années d'Expérience",
      role: "Développeur Web",
      about: "Informaticien & Développeur (Licence en Computer Science — USA & Licence en Business Computing — Ouganda). Passionné par l'accessibilité et la sécurité numérique. Je conçois des solutions qui comblent le fossé entre la technologie complexe et l'accessibilité humaine.",
      qualifications: "Expertise & Qualifications",
      qualList: [
        "Licence en Computer Science (UoPeople, USA)",
        "Licence en Business Computing (Bugema University, Ouganda)",
        "Certifié Cisco Academy & HP IT for Business",
        "Engagement 'Life-long Learner' pour l'accessibilité numérique"
      ],
      services: "Services",
      serviceList: [
        "Développement d'Applications Web Sur Mesure",
        "Architecture Cloud & Solutions Scalables",
        "Digitalisation de Collecte de Données (Kobo/ODK)",
        "Infrastructure Réseaux (Cisco Standards)",
        "Cybersécurité & Audit",
        "Bureautique Avancée (MS 365) & Automatisation"
      ],
      contact: "Contact",
      email: "regusopus@gmail.com",
      phone: "+243 997 306 308",
      whatsapp: "WhatsApp",
      website: "alexismupole.me",
      viewPortfolio: "Voir le Portfolio Complet",
      techStack: "Technologies"
    },
    hero: {
      badge: "Nouveau : Algorithme AES-256 disponible",
      title1: "Sécurisez vos échanges",
      title2: "en un clic",
      desc: "Chiffrez vos messages et données sensibles avec des algorithmes de pointe. Simple, privé, et entièrement exécuté dans votre navigateur.",
      ctaStart: "Commencer maintenant",
      ctaHow: "Voir comment ça marche",
      features: [
        { title: "Confidentialité totale", desc: "Vos données ne transitent jamais par nos serveurs. Tout est chiffré localement." },
        { title: "Algorithmes de pointe", desc: "Utilisez AES-256, RSA ou des méthodes plus simples comme César selon vos besoins." },
        { title: "Zéro stockage", desc: "Aucun historique, aucune trace. Une fois l'onglet fermé, vos secrets disparaissent." }
      ],
      howItWorks: {
        title: "Le Processus AlexCipher",
        close: "Fermer",
        steps: [
          { title: "Saisie locale", desc: "Vous entrez votre texte. Tout reste dans la mémoire vive de votre navigateur.", icon: "Type" },
          { title: "Choix de l'arme", desc: "Sélectionnez votre algorithme : du classique Vigenère au puissant AES-256.", icon: "Cpu" },
          { title: "Verrouillage", desc: "Votre clé secrète transforme les données en un chaos mathématique indéchiffrable.", icon: "Lock" },
          { title: "Transmission", desc: "Copiez le résultat. Seul le détenteur de la clé pourra percer le mystère.", icon: "Send" }
        ]
      }
    },
    dashboard: {
      encrypt: "Chiffrer",
      decrypt: "Déchiffrer",
      labelSource: "Message Source",
      labelEncrypted: "Message Chiffré",
      placeholderSource: "Tapez votre message secret ici...",
      placeholderEncrypted: "Collez le code chiffré...",
      labelMethod: "Méthode",
      labelKey: "Clé Secrète / Mot de Passe",
      placeholderKey: "Entrez votre clé...",
      placeholderCaesar: "Nombre de décalage (ex: 3)",
      strength: ["Vide", "Très faible", "Faible", "Moyen", "Fort"],
      btnEncrypt: "Générer le message secret",
      btnDecrypt: "Révéler le message",
      btnShare: "Partager",
      btnCopy: "Copier le code",
      labelResult: "Résultat",
      placeholderResult: "Le résultat apparaîtra ici...",
      newMsg: "Nouveau message",
      techFlow: "Visualisation du flux technique",
      security: ["Chiffrement Local", "Sans Cookies", "Open Source"],
      shareText: "Déchiffrez ce message sécurisé sur AlexCipher :",
      keyManager: {
        tabs: ["Manuel", "Auto", "Thèmes"],
        warning: "Nous ne stockons aucune clé sur nos serveurs. Ne la perdez pas !",
        themes: {
          skyrim: "Dovahkiin-FUS-RO-DAH-2025",
          cyberpunk: "Choomba-NightCity-V-77",
          zelda: "It-is-Dangerous-To-Go-Alone",
          elden: "Tarnished-Maidenless-Grace-99",
          halo: "MasterChief-FinishTheFight-117"
        },
        generate: "Générer",
        themeSelect: "Choisir un univers"
      }
    },
    keys: {
      title: "Gestion des Clés",
      desc: "Générez, importez ou exportez vos clés personnalisées. Apprenez à protéger vos secrets.",
      newKey: "Nouvelle Clé",
      labelName: "Nom de la clé",
      placeholderName: "ex: Perso 2025",
      btnGenerate: "Générer une clé",
      btnExport: "Exporter",
      btnImport: "Importer",
      note: "Note: L'importation ajoute les nouvelles clés à votre liste sans écraser les existantes.",
      empty: "Aucune clé enregistrée pour le moment.",
      keyCopied: "Clé copiée !",
      keyDeleted: "Clé supprimée",
      keyAdded: "Nouvelle clé générée !",
      importSuccess: "clé(s) importée(s) !",
      importExists: "Ces clés existent déjà",
      importError: "Format de fichier invalide",
      eco: {
        title: "Éco-Conception",
        desc: "Saviez-vous que le chiffrement local consomme jusqu'à 90% moins d'énergie qu'un service cloud ? En utilisant AlexCipher, vous protégez vos données tout en préservant la planète."
      },
      edu: {
        title: "Numérique Responsable",
        subtitle: "Éduquer pour mieux protéger",
        cards: [
          { title: "Entropie & Force", desc: "La longueur d'une clé est plus importante que sa complexité. Une phrase de 20 lettres est plus dure à briser qu'un mot court avec des symboles.", icon: "Brain" },
          { title: "Souveraineté des Données", desc: "En utilisant AlexCipher (chiffrement local), vous réduisez votre empreinte carbone et reprenez le contrôle total sur vos échanges.", icon: "Leaf" },
          { title: "Zero Partage en Clair", desc: "Ne stockez jamais vos clés dans un fichier texte non chiffré ou dans vos e-mails. Utilisez un gestionnaire de mots de passe de confiance.", icon: "ShieldAlert" },
          { title: "Responsabilité Éthique", desc: "Le chiffrement est un droit humain. Utilisez-le pour protéger votre intimité, pas pour nuire à autrui.", icon: "Users" }
        ]
      }
    },
    faq: {
      title: "Aide & Sécurité",
      tagline: "Tout ce que vous devez savoir pour protéger vos secrets numériques.",
      sections: {
        faq: "Questions Fréquentes",
        tips: "Conseils d'Expert"
      },
      features: [
        { title: "100% Local", desc: "Aucun serveur ne voit vos données." },
        { title: "Anonymat", desc: "Aucun compte requis, aucune trace." },
        { title: "Sécurité", desc: "Algorithmes standards du marché." }
      ],
      items: [
        { q: "Que faire si je perds ma clé ?", a: "C'est la base de la sécurité : sans clé, le message est irrécupérable. AlexCipher n'a pas de 'porte dérobée' ni de base de données pour vous aider. Gardez vos clés précieusement !" },
        { q: "Est-ce compatible avec Discord ou WhatsApp ?", a: "Oui ! AlexCipher génère du texte brut. Vous pouvez le copier-coller dans n'importe quelle application de messagerie sans risque." },
        { q: "Pourquoi AES-256 est-il meilleur que César ?", a: "Le chiffre de César est une simple rotation (26 possibilités). Un ordinateur le casse en une fraction de seconde. AES-256 a plus de combinaisons possibles qu'il n'y a d'atomes dans l'univers." },
        { q: "Puis-je utiliser AlexCipher hors-ligne ?", a: "Tout à fait. Une fois la page chargée, tous les calculs sont faits sur votre machine. Vous pouvez couper votre internet et continuer à chiffrer." },
        { q: "Mes données sont-elles vraiment en sécurité ?", a: "Sur le plan mathématique, oui. Cependant, la sécurité dépend aussi de la force de votre mot de passe et de la manière dont vous transmettez votre clé." }
      ],
      tips: [
        { title: "Utilisez deux canaux", desc: "N'envoyez jamais le message chiffré et la clé sur la même application (ex: Message sur Discord, Clé par SMS)." },
        { title: "Privilégiez l'Auto-Génération", desc: "Les humains sont prévisibles. Les clés générées aléatoirement (onglet 'Auto') sont pratiquement incassables par force brute." },
        { title: "Évitez les mots courants", desc: "Si vous utilisez une clé manuelle, évitez les prénoms ou dates de naissance. Utilisez une phrase longue (Passphrase)." },
        { title: "Videz votre presse-papier", desc: "Une fois le message transmis, copiez autre chose pour effacer la trace de votre secret de la mémoire temporaire de votre appareil." }
      ]
    },
    toasts: {
      msgRequired: "Veuillez entrer un message",
      keyRequired: "Clé secrète requise",
      encryptSuccess: "Message chiffré avec succès !",
      decryptSuccess: "Message déchiffré avec succès !",
      decryptError: "Clé incorrecte ou format invalide",
      copied: "Copié dans le presse-papier !",
      shareNotSupported: "Partage non supporté : le code a été copié !",
      error: "Une erreur est survenue"
    }
  },
  en: {
    common: {
      back: "Back",
      backHome: "Back home",
      install: "Install App",
      iosInstall: "To install on iPhone: tap Share then 'Add to Home Screen'."
    },
    installHub: {
      title: "Choose Installation Mode",
      desc: "Do you want to install AlexCipher as a native-like app or a simple shortcut?",
      option1Title: "App List (WebAPK)",
      option1Desc: "The app will appear in your Android app drawer with all your other apps.",
      option2Title: "Home Screen",
      option2Desc: "Creates a quick shortcut on your main screen for instant access.",
      btnInstall: "Install Now",
      iosNote: "On iOS, installation is done via Safari's Share menu.",
      close: "Close"
    },
    nav: {
      dashboard: "Dashboard",
      keys: "My Keys",
      faq: "Help",
      privacy: "Privacy",
      terms: "Terms",
      api: "API",
      footerNote: "Made with ❤️ by AlexCipher",
      developer: "Developed by Alexis Mupole",
      tagline: "Secure your exchanges in one click",
      whatsapp: "WhatsApp"
    },
    agreement: {
      title: "Responsible Engagement",
      desc: "Before using AlexCipher, you must accept our terms of use and commit to an ethical use of our encryption tools.",
      check1: "I accept the terms of use and privacy policy.",
      check2: "I commit to using this application in a responsible and legal way.",
      btn: "Accept and Continue"
    },
    legal: {
      privacy: {
        title: "Privacy Policy",
        desc: "Your privacy is our top priority. Here is how we protect your data.",
        sections: [
          { title: "100% Local Processing", content: "Unlike cloud services, AlexCipher processes all data directly in your browser. No text, no key, and no sensitive data is ever sent to a server." },
          { title: "No Cookies", content: "We do not use any tracking or advertising cookies. We only use local storage (localStorage) to remember your language preferences and your keys if you decide to save them." },
          { title: "Zero Logs", content: "There are no activity logs. What you encrypt remains your exclusive secret." }
        ]
      },
      terms: {
        title: "Terms of Use",
        desc: "By using AlexCipher, you agree to the following rules.",
        sections: [
          { title: "Responsible Use", content: "The user agrees not to use AlexCipher for illegal, malicious activities or activities that harm others." },
          { title: "Key Responsibility", content: "AlexCipher is a strong encryption tool. If you lose your secret key, the encrypted data is unrecoverable. We cannot restore access to your data under any circumstances." },
          { title: "Limitation of Liability", content: "Alexis Mupole and AlexCipher cannot be held responsible for any data loss or any misuse of the application by third parties." }
        ]
      }
    },
    developer: {
      title: "Developer",
      desc: "Alexis Mupole Uwizeye — Digital Engineering Consultant",
      location: "Kinshasa, DR Congo",
      experience: "5+ Years Experience",
      role: "Web Developer",
      about: "IT Professional & Developer (BSc Computer Science — USA & BSc Business Computing — Uganda). Passionate about digital accessibility and security. I engineer solutions that bridge the gap between complex technology and human accessibility.",
      qualifications: "Expertise & Qualifications",
      qualList: [
        "BSc in Computer Science (UoPeople, USA)",
        "BSc in Business Computing (Bugema University, Uganda)",
        "Cisco Academy & HP IT for Business Certified",
        "Life-long Learner dedicated to digital accessibility"
      ],
      services: "Services",
      serviceList: [
        "Custom Web Application Development",
        "Cloud Architecture & Scalable Solutions",
        "Data Collection Digitalization (Kobo/ODK)",
        "Network Infrastructure (Cisco Standards)",
        "Cybersecurity & Audit",
        "Advanced Office (MS 365) & Automation"
      ],
      contact: "Contact",
      email: "regusopus@gmail.com",
      phone: "+243 997 306 308",
      whatsapp: "WhatsApp",
      website: "alexismupole.me",
      viewPortfolio: "View Full Portfolio",
      techStack: "Technologies"
    },
    hero: {
      badge: "New: AES-256 Algorithm available",
      title1: "Secure your exchanges",
      title2: "in one click",
      desc: "Encrypt your messages and sensitive data with state-of-the-art algorithms. Simple, private, and entirely executed in your browser.",
      ctaStart: "Get Started Now",
      ctaHow: "See how it works",
      features: [
        { title: "Total Privacy", desc: "Your data never transits through our servers. Everything is encrypted locally." },
        { title: "Pro Algorithms", desc: "Use AES-256, RSA or simpler methods like Caesar according to your needs." },
        { title: "Zero Storage", desc: "No history, no trace. Once the tab is closed, your secrets disappear." }
      ],
      howItWorks: {
        title: "The AlexCipher Process",
        close: "Close",
        steps: [
          { title: "Local Input", desc: "You enter your text. Everything stays within your browser's RAM.", icon: "Type" },
          { title: "Weapon Choice", desc: "Select your algorithm: from classic Vigenere to powerful AES-256.", icon: "Cpu" },
          { title: "Lockdown", desc: "Your secret key turns data into undecipherable mathematical chaos.", icon: "Lock" },
          { title: "Transmission", desc: "Copy the result. Only the key holder can pierce the mystery.", icon: "Send" }
        ]
      }
    },
    dashboard: {
      encrypt: "Encrypt",
      decrypt: "Decrypt",
      labelSource: "Source Message",
      labelEncrypted: "Encrypted Message",
      placeholderSource: "Type your secret message here...",
      placeholderEncrypted: "Paste the encrypted code...",
      labelMethod: "Method",
      labelKey: "Secret Key / Password",
      placeholderKey: "Enter your key...",
      placeholderCaesar: "Shift number (ex: 3)",
      strength: ["Empty", "Very weak", "Weak", "Medium", "Strong"],
      btnEncrypt: "Generate Secret Message",
      btnDecrypt: "Reveal Message",
      btnShare: "Share",
      btnCopy: "Copy code",
      labelResult: "Result",
      placeholderResult: "The result will appear here...",
      newMsg: "New Message",
      techFlow: "Technical flow visualization",
      security: ["Local Encryption", "No Cookies", "Open Source"],
      shareText: "Decrypt this secure message on AlexCipher:",
      keyManager: {
        tabs: ["Manual", "Auto", "Themes"],
        warning: "We do not store any key on our servers. Do not lose it!",
        themes: {
          skyrim: "Dovahkiin-FUS-RO-DAH-2025",
          cyberpunk: "Choomba-NightCity-V-77",
          zelda: "It-is-Dangerous-To-Go-Alone",
          elden: "Tarnished-Maidenless-Grace-99",
          halo: "MasterChief-FinishTheFight-117"
        },
        generate: "Generate",
        themeSelect: "Choose a universe"
      }
    },
    keys: {
      title: "Key Management",
      desc: "Generate, import or export your custom keys. Learn how to protect your secrets.",
      newKey: "New Key",
      labelName: "Key Name",
      placeholderName: "ex: Personal 2025",
      btnGenerate: "Generate Key",
      btnExport: "Export",
      btnImport: "Import",
      note: "Note: Importing adds new keys to your list without overwriting existing ones.",
      empty: "No keys saved yet.",
      keyCopied: "Key copied!",
      keyDeleted: "Key deleted",
      keyAdded: "New key generated!",
      importSuccess: "key(s) imported!",
      importExists: "These keys already exist",
      importError: "Invalid file format",
      eco: {
        title: "Eco-Conception",
        desc: "Did you know that local encryption uses up to 90% less energy than cloud services? By using AlexCipher, you protect your data while preserving the planet."
      },
      edu: {
        title: "Responsible Tech",
        subtitle: "Educating for better protection",
        cards: [
          { title: "Entropy & Strength", desc: "Key length is more important than complexity. A 20-letter phrase is harder to break than a short word with symbols.", icon: "Brain" },
          { title: "Data Sovereignty", desc: "By using AlexCipher (local encryption), you reduce your carbon footprint and regain total control over your exchanges.", icon: "Leaf" },
          { title: "Zero Plaintext Sharing", desc: "Never store your keys in an unencrypted text file or emails. Use a trusted password manager.", icon: "ShieldAlert" },
          { title: "Ethical Responsibility", desc: "Encryption is a human right. Use it to protect your privacy, not to harm others.", icon: "Users" }
        ]
      }
    },
    faq: {
      title: "Help & Security",
      tagline: "Everything you need to know to protect your digital secrets.",
      sections: {
        faq: "Frequently Asked Questions",
        tips: "Expert Pro-Tips"
      },
      features: [
        { title: "100% Local", desc: "No server ever sees your data." },
        { title: "Anonymity", desc: "No account required, no trace left." },
        { title: "Security", desc: "Industry-standard algorithms." }
      ],
      items: [
        { q: "What if I lose my key?", a: "This is the core of security: without the key, the message is unrecoverable. AlexCipher has no backdoors or databases. Keep your keys safe!" },
        { q: "Is it compatible with Discord or WhatsApp?", a: "Yes! AlexCipher generates plain text. You can copy-paste it into any messaging app without risk." },
        { q: "Why is AES-256 better than Caesar?", a: "Caesar is a simple rotation (26 possibilities). A computer can crack it in a millisecond. AES-256 has more combinations than there are atoms in the universe." },
        { q: "Can I use AlexCipher offline?", a: "Absolutely. Once the page is loaded, all calculations are done on your machine. You can cut your internet and keep encrypting." },
        { q: "Is my data truly secure?", a: "Mathematically, yes. However, security also depends on your password strength and how you share your key." }
      ],
      tips: [
        { title: "Use Two Channels", desc: "Never send the encrypted message and the key on the same app (e.g., Message on Discord, Key via SMS)." },
        { title: "Prefer Auto-Generation", desc: "Humans are predictable. Randomly generated keys ('Auto' tab) are practically uncrackable by brute force." },
        { title: "Avoid Common Words", desc: "If using a manual key, avoid names or birthdates. Use a long sentence (Passphrase) instead." },
        { title: "Clear Your Clipboard", desc: "Once the message is sent, copy something else to erase your secret from your device's temporary memory." }
      ]
    },
    toasts: {
      msgRequired: "Please enter a message",
      keyRequired: "Secret key required",
      encryptSuccess: "Message encrypted successfully!",
      decryptSuccess: "Message decrypted successfully!",
      decryptError: "Incorrect key or invalid format",
      copied: "Copied to clipboard!",
      shareNotSupported: "Sharing not supported: code has been copied!",
      error: "An error occurred"
    }
  }
};