import type { Locale } from './types'

export const fr: Locale = {
  meta: {
    title: 'Daniele Mancini — Expert IT, systèmes classifiés et support VIP',
    description:
      'Daniele Mancini — expert IT en systèmes classifiés, support VIP et infrastructures d’entreprise. CV : Parlement européen, NATO SHAPE, Sogeti, Zennit IT.',
  },

  ui: {
    skip: 'Aller au contenu',
    hero: {
      role: 'Expert IT, systèmes classifiés et support VIP',
      mission:
        "Passionné d'informatique depuis l'enfance.\nDévoué à l'IT et aux nouvelles technologies, pour un monde numérique plus intelligent et plus sûr.",
      scroll: 'Défilez pour découvrir',
    },
    nav: {
      sections: 'Sections',
      experience: 'Expérience',
      education: 'Formation',
      skills: 'Compétences',
      certifications: 'Certifications',
      about: 'À propos',
      contact: 'Contact',
      language: 'Langue',
      chooseLanguage: 'Changer de langue',
    },
    experience: {
      title: 'Expérience professionnelle',
      lede: 'Six ans entre support d’entreprise, systèmes classifiés et IT parlementaire.',
      prev: 'Poste précédent',
      next: 'Poste suivant',
      track: 'Postes, par ordre chronologique inverse',
      details: 'Détails',
      now: 'Aujourd’hui',
    },
    education: {
      title: 'Formation',
    },
    skills: {
      title: 'Compétences techniques',
      lede: 'Outils, systèmes et capacités techniques de niveau entreprise.',
      languagesTitle: 'Compétences linguistiques',
      languagesLede: 'Communication multilingue internationale.',
      proficiency: 'niveau',
    },
    certifications: {
      title: 'Certifications',
      lede: 'Standards reconnus et apprentissage continu, d’ITIL à la cyberdéfense OTAN.',
      prev: 'Certifications précédentes',
      next: 'Certifications suivantes',
      track: 'Certifications, de la plus récente',
    },
    about: {
      title: 'À propos',
      lede: 'Ma façon de travailler, et d’où elle vient.',
    },
    footer: {
      title: 'Restons en contact.',
      lede: 'Écrivez-moi pour une opportunité enthousiasmante ou une discussion technique.',
      print: 'Enregistrer le CV en PDF',
      printHint:
        'Ouvre la fenêtre d’impression du navigateur \u2014 choisissez \u00ab\u00a0Enregistrer au format PDF\u00a0\u00bb.',
      rights: '\u00a9 2026 Daniele Mancini. Tous droits réservés.',
    },
    dialog: {
      close: 'Fermer',
      closeDetails: 'Fermer le détail du poste',
    },
    privacy: {
      link: 'Confidentialité et cookies',
      title: 'Confidentialité et cookies',
      updated: 'Dernière mise à jour : 25 novembre 2026',
      sections: [
        {
          title: 'Responsable du traitement',
          body: 'Ce site CV est publié par Daniele Mancini. Pour toute question sur cette politique, écrivez à contact@danielemancini.eu.',
        },
        {
          title: 'Cookies',
          body: "Ce site ne dépose aucun cookie, et c'est pourquoi aucun bandeau ne s'affiche : il n'y a ni publicité, ni profilage, ni suivi entre sites à autoriser.",
        },
        {
          title: 'Ce qui est stocké sur votre appareil',
          body: 'Deux clés dans le stockage local du navigateur, toutes deux fonctionnelles et supprimables depuis les réglages. dm-cv-lang retient la langue que vous avez choisie. dm-cv-geo retient pendant 30 jours le pays détecté lors de la première visite, afin de choisir la langue sans interroger à nouveau le réseau.',
        },
        {
          title: 'Détection de la langue',
          body: "Lors de la première visite, et seulement si vous n'avez pas déjà choisi une langue, le site demande à un service public de géolocalisation IP - api.country.is, avec get.geojs.io en secours - de quel pays vient la connexion. Votre adresse IP lui est transmise uniquement pour obtenir la réponse et n'est pas conservée par nous. Seul le code pays à deux lettres reste dans votre navigateur, pendant 30 jours. Les visiteurs de France, Belgique, Luxembourg, Canada et Monaco voient la version française, ceux d'Italie la version italienne, tous les autres l'anglaise. La base est notre intérêt légitime à présenter le CV dans la langue du visiteur ; choisir une langue dans la pastille annule définitivement la détection.",
        },
        {
          title: "Mesure d'audience",
          body: "Lorsqu'un jeton de mesure est configuré pour ce déploiement, le site charge Cloudflare Web Analytics : un compteur sans cookies ni empreinte numérique qui enregistre de façon agrégée les pages vues, les provenances, le pays et le type d'appareil. Il ne dépose aucun cookie, ne conserve aucun identifiant dans votre navigateur et ne vous suit pas sur d'autres sites : aucun bandeau n'est donc nécessaire. Cloudflare traite ces données pour notre compte.",
        },
        {
          title: 'Hébergement',
          body: 'Le site est servi par un hébergeur qui conserve les journaux standards du serveur (adresse IP, navigateur, horodatage) pour la sécurité et la fiabilité, pendant la courte durée prévue par sa propre politique.',
        },
        {
          title: 'Vos droits',
          body: "Vous pouvez demander l'accès, la rectification ou l'effacement de vos données, vous opposer au traitement ou saisir une autorité de contrôle - en Italie le Garante per la protezione dei dati personali, ailleurs votre autorité nationale. Écrivez à contact@danielemancini.eu. Le site ne conservant aucun profil sur ses serveurs, la plupart des demandes se règlent en effaçant les données du navigateur.",
        },
      ],
    },
  },

  jobs: [
    {
      id: 'ep',
      company: 'Parlement européen',
      shortCompany: 'Parlement européen',
      period: '2021 \u2014 Aujourd\u2019hui',
      summary:
        "En tant qu'agent contractuel au Parlement européen, j'ai coordonné les opérations de l'équipe, assuré un support informatique avancé, des formations utilisateurs et les relations avec les parties prenantes, tout en pilotant des projets internes de digitalisation : workflows ServiceNow, pages d'atterrissage et ressources e-learning.",
      tags: ['Support IT VIP et infrastructures', 'Gestion de projet', 'Communication audiovisuelle'],
      intro:
        "En tant que spécialiste IT à la Direction générale de l'innovation et du support technologique (DG ITEC), je gère l'architecture de l'identité numérique et l'infrastructure de support d'entreprise.",
      bullets: [
        [
          'Gestion de l’équipe et du service',
          "J'ai supervisé les opérations quotidiennes d'une petite équipe : planification, gestion des congés, assurance qualité et reporting direct à la hiérarchie.",
        ],
        [
          'Analyse des enquêtes de satisfaction',
          "J'ai conçu et analysé des enquêtes de satisfaction, en interprétant les données pour produire des recommandations concrètes visant à renforcer la motivation et la satisfaction des agents.",
        ],
        [
          'Recrutement',
          "J'ai mené des entretiens d'embauche et collaboré avec la direction pour sélectionner et intégrer des candidats qualifiés.",
        ],
        [
          'Analyse des besoins et conseil',
          "J'ai échangé avec les utilisateurs finaux pour mener des analyses de besoins et fournir des conseils d'expert dans mes domaines de responsabilité.",
        ],
        [
          'Maintenance matérielle et logicielle',
          "J'ai installé, diagnostiqué et réparé des systèmes de bureau, logiciels, matériels et périphériques, à distance comme sur site, selon les spécifications techniques.",
        ],
        [
          'Support helpdesk et gestion des tickets',
          "J'ai traité les demandes logicielles et matérielles en tenant des registres précis des échanges quotidiens, des requêtes utilisateurs, des actions correctives et des installations.",
        ],
        [
          'Développement et tests de produits TIC',
          "J'ai assisté les programmeurs d'applications, les développeurs de systèmes et les professionnels TIC dans le développement et les tests de nouveaux produits et services.",
        ],
        [
          'Documentation et formation des utilisateurs',
          "J'ai rédigé des instructions et des manuels utilisateurs, documenté les applications et contribué à améliorer la base de connaissances interne.",
        ],
        [
          'Détection des dysfonctionnements et reporting',
          "J'ai identifié les dysfonctionnements potentiels des systèmes et les nouveaux besoins des utilisateurs, en remontant les points critiques à la direction.",
        ],
        [
          'Coordination transversale',
          "J'ai coordonné les relations entre clients internes, entités externes et différents services.",
        ],
        [
          'Gestion des systèmes d’archivage',
          "J'ai mis en place et maintenu des systèmes d'archivage robustes pour l'ensemble des produits et services de l'unité.",
        ],
        [
          'Support réseaux sociaux pour les députés',
          "J'ai apporté une assistance spécialisée sur les réseaux sociaux (2FA, récupération de compte), des conseils de stratégie de campagne (analytics, ciblage, audiences) et une aide à l'obtention du badge de vérification pour prévenir l'usurpation d'identité.",
        ],
        [
          'Installation du studio d’enregistrement',
          "J'ai créé et géré un studio d'enregistrement dédié aux députés, avec des standards élevés d'éclairage et de son pour les réunions et discours à distance.",
        ],
        [
          'Mise à disposition de matériel audiovisuel',
          "J'ai déployé du matériel audiovisuel sur mesure (caméras, ring lights, micros) adapté aux besoins des utilisateurs, des événements et des lieux.",
        ],
        [
          'Conseil et configuration audiovisuelle',
          "J'ai fourni des conseils professionnels, des tutoriels et des configurations pour le matériel informatique, y compris les appareils personnels, afin d'optimiser la qualité des enregistrements.",
        ],
        [
          'Page de services interactive',
          "J'ai développé une plateforme web dédiée permettant aux députés et aux APA d'accéder de façon interactive aux services et de soumettre des demandes de support directes.",
        ],
        [
          'Développement ServiceNow',
          "J'ai créé des workflows et des modèles dans ServiceNow pour simplifier et guider les collègues dans leurs tâches quotidiennes.",
        ],
        [
          'Portail web du support IT',
          "J'ai conçu une page d'atterrissage personnalisée pour l'espace support IT, afin d'améliorer l'expérience des utilisateurs finaux.",
        ],
        [
          'Production e-learning',
          "J'ai enregistré, doublé, monté et exporté des tutoriels vidéo et des présentations pour guider les collègues dans l'utilisation des outils et logiciels internes.",
        ],
      ],
    },
    {
      id: 'sogeti',
      company: 'Sogeti',
      shortCompany: 'Sogeti (Capgemini)',
      period: '2020 \u2014 2021',
      summary:
        "Support informatique complet, administration à distance et assistance spécialisée pour les réunions du Parlement européen et les utilisateurs VIP, avec le développement de workflows automatisés et de ressources e-learning pour améliorer la qualité de service.",
      tags: [
        'Support IT et infrastructures',
        'Active Directory et administration à distance',
        'Support technique des réunions VIP',
      ],
      intro:
        'Support VIP de 2e et 3e niveau sur des infrastructures distribuées à haute disponibilité.',
      bullets: [
        [
          'Gestion des incidents et demandes IT',
          "J'ai traité les incidents informatiques et les demandes de service via l'outil de ticketing CA Service Desk Manager.",
        ],
        [
          'Préparation et clonage du matériel',
          "J'ai installé des ordinateurs, déployé des images logicielles et livré puis enregistré les appareils du Parlement européen.",
        ],
        [
          'Sécurité des données et chiffrement',
          "J'ai assuré la sécurité des postes en chiffrant les ordinateurs et en mettant en œuvre et administrant les solutions de chiffrement McAfee.",
        ],
        [
          'Dépannage général et support à distance',
          "J'ai fourni un diagnostic complet et une assistance à distance des postes via Microsoft SCCM.",
        ],
        [
          'Support réseau et connectivité',
          "J'ai résolu les problèmes réseau pour garantir une connectivité stable sur tous les appareils.",
        ],
        [
          'Support des systèmes de vote',
          'J’ai assuré le support des systèmes iVote et eVote, aujourd’hui appelés EP VOTE.',
        ],
        [
          'Authentification et gestion des accès',
          "J'ai géré les certificats WiFi, les jetons d'authentification (y compris les jetons matériels) et assuré le support de l'accès VDI Citrix.",
        ],
        [
          'Active Directory et gestion des comptes',
          "J'ai géré les comptes utilisateurs et les réinitialisations de mots de passe, et réalisé des interventions à distance sur les profils d'image Windows via des comptes Active Directory Management.",
        ],
        [
          'Support IT VIP et réunions',
          "J'ai fourni un support informatique spécialisé pour les réunions du Parlement européen, en garantissant un environnement de travail optimal aux députés et aux utilisateurs VIP à Bruxelles et Strasbourg.",
        ],
        [
          'Assistance à distance multilingue',
          "J'ai assisté les participants à distance sur des plateformes comme Interactio, en résolvant les problèmes de connexion, d'audio et de vidéo pour les députés.",
        ],
        [
          'Automatisation des processus et projets',
          "J'ai développé des projets internes visant à améliorer et automatiser la prestation des services informatiques.",
        ],
        [
          'Création de contenus d’apprentissage numérique',
          "J'ai créé des supports e-learning conçus pour faciliter la fourniture et l'usage du matériel informatique par les députés et les APA.",
        ],
        [
          'Gestion des données et modèles',
          "J'ai utilisé des tableurs Excel pour le suivi des données et conçu des modèles standardisés pour l'usage opérationnel de toute l'équipe.",
        ],
      ],
    },
    {
      id: 'zennit',
      company: 'Zennit IT',
      shortCompany: 'Zennit IT',
      period: '2019 \u2014 2020',
      summary:
        "Support d'infrastructure IT sur site et à distance, incluant matériel, réseau et migrations de serveurs, ainsi que développement web et design graphique.",
      tags: [
        'Infrastructure IT et réseau',
        'Support technique et dépannage',
        'Développement web et design',
      ],
      intro:
        'Conception matérielle et réseau, ainsi que gestion opérationnelle du cycle de vie des actifs informatiques.',
      bullets: [
        [
          'Dépannage matériel et logiciel',
          "J'ai résolu les problèmes quotidiens de logiciels et de matériels pour les ordinateurs, imprimantes et l'infrastructure réseau, y compris les tests de diagnostic et le remplacement de composants.",
        ],
        [
          'Administration Microsoft 365 et SharePoint',
          "J'ai géré le stockage de l'entreprise, les services de messagerie et les workflows de ticketing avec Microsoft Office 365 et SharePoint.",
        ],
        [
          'Support IT multi-sites',
          "J'ai hiérarchisé et résolu les incidents techniques sur les réseaux et machines de l'entreprise répartis sur plusieurs points de vente.",
        ],
        [
          'Support client et réseau sur site',
          "J'ai apporté une assistance directe sur site aux clients, y compris le diagnostic et la résolution de problèmes de réseau local dans des sites externes.",
        ],
        [
          'Développement et personnalisation web',
          "J'ai créé et maintenu des sites web professionnels avec WordPress et Elementor, avec des personnalisations graphiques avancées.",
        ],
        [
          'Design graphique et optimisation',
          "J'ai utilisé Adobe Photoshop pour la retouche graphique et l'optimisation des images web.",
        ],
        [
          'Assistance à distance',
          "J'ai assuré le dépannage à distance et la résolution de problèmes mineurs pour les clients via TeamViewer.",
        ],
        [
          'Projet de migration de serveurs (LIDL Belgique)',
          "J'ai participé au projet de migration d'entreprise faisant passer les systèmes de Windows Server 2003 à Windows Server 2012.",
        ],
        [
          'Maintenance de l’infrastructure serveur',
          "J'ai réalisé des sauvegardes physiques de serveurs, des désinstallations et des remplacements de matériel dans les points de vente LIDL.",
        ],
        [
          'Configuration réseau et switchs Cisco',
          "J'ai géré la connectivité réseau en configurant plusieurs switchs Cisco et en dédiant des ports à chaque machine en magasin.",
        ],
      ],
    },
    {
      id: 'nato',
      company: 'NATO S.H.A.P.E.',
      shortCompany: 'NATO S.H.A.P.E.',
      period: '2019',
      summary:
        "Gestion et sécurisation de systèmes TIC et de documents classifiés sous habilitation NATO Secret, administration d'Active Directory, automatisation des tâches courantes et support complet de l'infrastructure avec assistance aux utilisateurs.",
      tags: [
        'Administration de systèmes classifiés',
        'Gestion de documents classifiés',
        'Cyberdéfense',
      ],
      intro:
        'Gestion des actifs technologiques dans un environnement militaro-diplomatique de haute sécurité.',
      bullets: [
        [
          'Administration des systèmes et du réseau',
          "J'ai maintenu, configuré et garanti le bon fonctionnement des systèmes informatiques et réseau, des serveurs, des postes de travail et des périphériques.",
        ],
        [
          'Mises à niveau matérielles et logicielles',
          "J'ai installé et mis à niveau des composants et logiciels informatiques en assurant une compatibilité et une fonctionnalité strictes.",
        ],
        [
          'Automatisation des tâches',
          "J'ai automatisé les tâches administratives et techniques récurrentes afin d'améliorer l'efficacité opérationnelle et la productivité.",
        ],
        [
          'Support technique et dépannage',
          "J'ai diagnostiqué les incidents techniques et fourni aux utilisateurs finaux un support technique rapide et efficace.",
        ],
        [
          'Sécurité et intégrité des systèmes',
          "J'ai garanti une intégrité système optimale, des protocoles de sécurité, des sauvegardes fiables et des performances maximales.",
        ],
        [
          'Assistance TIC aux utilisateurs',
          "J'ai aidé les utilisateurs à résoudre divers problèmes liés aux TIC : connectivité réseau, messagerie, pannes matérielles et erreurs d'impression.",
        ],
        [
          'Systèmes classifiés et diffusion de documents',
          "J'ai administré et sécurisé des systèmes informatiques sensibles ou classifiés, et géré le traitement, le suivi et la diffusion contrôlée de documents classifiés dans le respect de protocoles de sécurité stricts.",
        ],
        [
          'Gestion des actifs et de l’inventaire',
          "J'ai géré et suivi l'inventaire de tous les équipements TIC, y compris ordinateurs, claviers, écrans et souris.",
        ],
        [
          'Microsoft Office',
          "J'ai utilisé Microsoft Office (Word, PowerPoint, Excel 2013/2016) pour la documentation et la gestion des données.",
        ],
        [
          'Présentations de formation',
          "J'ai créé et animé des présentations professionnelles Microsoft PowerPoint pour la formation et l'information du personnel.",
        ],
        [
          'Administration Active Directory',
          "J'ai administré Active Directory pour gérer les comptes utilisateurs, les unités d'organisation et les permissions d'accès granulaires.",
        ],
        [
          'Certification professionnelle',
          "J'ai poursuivi et obtenu en continu des certifications TIC pertinentes afin de renforcer mes connaissances techniques et mes compétences professionnelles.",
        ],
      ],
    },
  ],

  education: [
    {
      badge: 'Licence',
      title: 'Communication et multimédia',
      description:
        'Le cursus L-20 Communication et multimédia porte sur les stratégies de communication numérique moderne, la production de contenus web, la narration multimédia et la gestion des réseaux sociaux pour les environnements médiatiques contemporains.',
      institution: 'Universitas Mercatorum',
    },
    {
      badge: 'Baccalauréat technique',
      title: 'Informatique et télécommunications',
      description:
        'Le diplôme en informatique et télécommunications couvre l’informatique, les infrastructures réseau, les systèmes matériels et logiciels ainsi que les technologies de télécommunication.',
      institution: 'Istituto Santa Lucia',
    },
  ],

  skillRows: [
    [
      'Conception d’Active Directory et GPO',
      'Configuration des postes SCCM',
      'Support et escalade VIP en entreprise',
      'Intégration MFA et IAM Zero-Trust',
      'Workspace ONE UEM / AirWatch MDM',
      'Sécurité des postes Trellix',
      'Architecture Microsoft 365',
      'Protocoles de sécurité diplomatique',
    ],
    [
      'Gestion des SLA ServiceNow',
      'Développement front-end (HTML/CSS/JS)',
      'Stratégie Meta Ads pilotée par les données',
      'Orchestration de vidéoconférences',
      'Diagnostic réseau Cisco',
      'Reprise après sinistre et intégrité des données',
      'Déploiement macOS et iOS en entreprise',
      'TCP/IP, DNS et routage VPN',
    ],
  ],

  languages: [
    { name: 'Italien', level: 'Langue maternelle', value: 100 },
    { name: 'Anglais', level: 'C1 \u2014 Courant', value: 88 },
    { name: 'Français', level: 'C1 \u2014 Courant', value: 88 },
  ],

  certifications: [
    {
      date: '26 déc. 2020',
      issuer: 'PeopleCert',
      title: 'ITIL v4 Foundation Certificate in IT Service Management',
      description:
        'ITIL v4 est un référentiel de bonnes pratiques pour la gestion des services informatiques, axé sur la création de valeur grâce à des services efficaces et de qualité. Il met l’accent sur la collaboration, la prestation de bout en bout, l’automatisation et l’alignement entre services IT et besoins métier.',
      featured: true,
    },
    {
      date: '21 oct. 2019',
      issuer: 'OTAN \u2014 Résidentiel',
      title: 'ADL 343 Système de management de la sécurité de l’information',
      description:
        'Gestion avancée des référentiels pour sécuriser des données diplomatiques sensibles et comprendre les protocoles SMSI dans les opérations internationales.',
    },
    {
      date: '21 oct. 2019',
      issuer: 'OTAN \u2014 Résidentiel',
      title: 'ADL 344 Informatique légale et preuve numérique',
      description:
        'Techniques d’identification, de préservation, d’analyse et de présentation de preuves numériques dans des environnements sécurisés et classifiés.',
    },
    {
      date: '21 oct. 2019',
      issuer: 'OTAN \u2014 Résidentiel',
      title: 'ADL 335 Sensibilisation cyber pour administrateurs système',
      description:
        'Réduction des menaces cyber critiques et sensibilisation adaptées aux administrateurs système gérant des infrastructures vitales.',
    },
    {
      date: '21 oct. 2019',
      issuer: 'OTAN \u2014 En situation de travail',
      title: 'ADL 346 Sécurité des applications web',
      description:
        'Identification des vulnérabilités et mise en œuvre de mesures de sécurité sur des applications web complexes.',
    },
    {
      date: '30 sept. 2019',
      issuer: 'OTAN \u2014 En situation de travail',
      title: 'ADL 076 Sensibilisation à la cyberdéfense',
      description:
        'Compréhension complète des stratégies de cyberdéfense, des vecteurs d’attaque et des contre-mesures.',
    },
    {
      date: '27 août 2019',
      issuer: 'OTAN \u2014 En situation de travail',
      title: 'SHAPE IM Foundation Course',
      description:
        'Principes fondamentaux de la gestion de l’information au sein du Grand quartier général des puissances alliées en Europe.',
    },
    {
      date: '20 août 2019',
      issuer: 'OTAN \u2014 En situation de travail',
      title: 'SHAPE CiS Coordinators',
      description:
        'Coordination des systèmes de communication et d’information sur les réseaux OTAN sécurisés.',
    },
  ],

  ethos: [
    {
      title: 'Le parcours IT',
      body:
        "Passionné d'informatique depuis l'enfance et attaché à construire un avenir numérique plus intelligent et plus sûr. Avec plus de six ans d'expérience de terrain et une licence en communication et multimédia, j'ai bâti une carrière solide comme agent de support TIC et spécialiste d'entreprise. Après avoir travaillé comme administrateur système et technicien de support de 2e et 3e niveau, j'ai élargi mon expertise opérationnelle au sein de deux des plus prestigieuses organisations diplomatiques internationales : l'OTAN et le Parlement européen.",
      wide: true,
      accent: 'ink',
    },
    {
      title: 'Efficacité opérationnelle',
      body:
        'Une forte capacité à planifier, prioriser et gérer des tâches dans des environnements dynamiques et très structurés. Compétence éprouvée dans la gestion de responsabilités multiples tout en garantissant le strict respect des accords de service et des échéances grâce à des systèmes de ticketing avancés.',
      accent: 'blue',
    },
    {
      title: 'Analyse des causes racines',
      body:
        'Une attitude proactive axée sur la résolution préventive des problèmes et l’automatisation des processus. Reconnu pour la précision de l’analyse des causes racines, l’élimination des incidents récurrents et l’optimisation des flux de travail.',
      accent: 'ink',
    },
    {
      title: 'Diplomatie et support VIP',
      body:
        'Une solide expérience dans des environnements diplomatiques sous forte pression (OTAN, Parlement européen), avec un support discret, rapide et irréprochable aux utilisateurs VIP et aux dirigeants.',
      list: [
        'Lettres de remerciement et félicitations reçues pour l’excellence du service.',
        'Gestion impeccable des demandes dans des scénarios et délais hautement critiques.',
        'Coordination efficace avec les parties prenantes et les services techniques pour une résolution de bout en bout sans faille.',
      ],
      wide: true,
      accent: 'blue',
    },
  ],
}
