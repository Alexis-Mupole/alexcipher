
export const translations = {
  fr: {
    common: {
      back: "Retour",
      backHome: "Retour à l'accueil"
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
      tagline: "Sécurisez vos échanges en un clic"
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
          { title: "Traitement 100% Local", content: "Contrairement aux services de cloud, AlexCipher traite toutes les données directement dans votre navigateur. Aucun texte, aucune clé et aucune donnée sensible n'est envoyé à un serveur." },
          { title: "Absence de Cookies", content: "Nous n'utilisons aucun cookie de pistage ou publicitaire. Nous utilisons uniquement le stockage local (localStorage) pour mémoriser vos préférences de langue et vos clés si vous décidez de les enregistrer." },
          { title: "Zéro Log", content: "Il n'existe aucun journal d'activité. Ce que vous chiffrez reste votre secret exclusif." }
        ]
      },
      terms: {
        title: "Conditions d'Utilisation",
        desc: "En utilisant AlexCipher, vous acceptez les règles suivantes.",
        sections: [
          { title: "Utilisation Responsable", content: "L'utilisateur s'engage à ne pas utiliser AlexCipher pour des activités illégales, malveillantes ou portant atteinte à autrui." },
          { title: "Responsabilité des Clés", content: "AlexCipher est un outil de chiffrement fort. Si vous perdez votre clé secrète, les données chiffrées sont irrécupérables. Nous ne pouvons en aucun cas restaurer l'accès à vos données." },
          { title: "Limitation de Responsabilité", content: "Alexis Mupole et AlexCipher ne pourront être tenus responsables de toute perte de données ou de tout usage détourné de l'application par des tiers." }
        ]
      }
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
      labelResult: "Résultat",
      placeholderResult: "Le résultat apparaîtra ici...",
      newMsg: "Nouveau message",
      techFlow: "Visualisation du flux technique",
      security: ["Chiffrement Local", "Sans Cookies", "Open Source"],
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
      edu: {
        title: "Numérique Responsable",
        subtitle: "Éduquer pour mieux protéger",
        cards: [
          { title: "Entropie & Force", desc: "La longueur d'une clé est plus importante que sa complexité. Une phrase de 20 lettres est plus dure à briser qu'un mot court avec des symboles.", icon: "Brain" },
          { title: "Souveraineté des Données", desc: "En utilisant AlexCipher (chiffrement local), vous réduisez votre empreinte carbone et reprenez le contrôle total sur vos échanges.", icon: "Leaf" },
          { title: "Zéro Partage en Clair", desc: "Ne stockez jamais vos clés dans un fichier texte non chiffré ou dans vos e-mails. Utilisez un gestionnaire de mots de passe de confiance.", icon: "ShieldAlert" },
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
      error: "Une erreur est survenue"
    }
  },
  en: {
    common: {
      back: "Back",
      backHome: "Back home"
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
      tagline: "Secure your exchanges in one click"
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
      labelResult: "Result",
      placeholderResult: "The result will appear here...",
      newMsg: "New Message",
      techFlow: "Technical flow visualization",
      security: ["Local Encryption", "No Cookies", "Open Source"],
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
      error: "An error occurred"
    }
  }
};
