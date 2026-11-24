export type Job = {
  id: string
  company: string
  shortCompany: string
  period: string
  summary: string
  tags: string[]
  intro: string
  bullets: Array<[title: string, detail: string]>
}

export type Certification = {
  date: string
  issuer: string
  title: string
  description: string
  featured?: boolean
}

export type EducationEntry = {
  badge: string
  title: string
  description: string
  institution: string
}

export type EthosBox = {
  title: string
  body: string
  list?: string[]
  wide?: boolean
  accent?: 'blue' | 'ink'
}

export const jobs: Job[] = [
  {
    id: 'ep',
    company: 'European Parliament',
    shortCompany: 'European Parliament',
    period: '2021 — Present',
    summary:
      'As a Contract Agent at the European Parliament, I coordinated team operations, handled advanced IT support, user trainings, and stakeholder relations while leading internal digitalization projects such as ServiceNow workflows, landing pages, and e-learning resources.',
    tags: ['VIP IT Support & Infrastructure', 'Project Management', 'AV Communication'],
    intro:
      'As an IT Specialist at the Directorate-General for Innovation and Technological Support (DG ITEC), I manage digital identity architecture and enterprise support infrastructure.',
    bullets: [
      [
        'Team & Service Management',
        'Supervised daily operations of a small team, including planning, holiday management, quality assurance, and direct reporting to hierarchy.',
      ],
      [
        'Feedback Survey Analysis',
        'Designed and analysed feedback surveys, interpreting data to generate actionable insights focused on enhancing agent motivation and satisfaction.',
      ],
      [
        'Talent Acquisition',
        'Conducted job interviews and collaborated with leadership to select and onboard qualified candidates.',
      ],
      [
        'Needs Assessment & Consulting',
        'Interacted with end users to carry out requirements analyses and provide expert advice within relevant areas of responsibility.',
      ],
      [
        'Hardware & Software Maintenance',
        'Installed, troubleshot, and repaired office systems, software, hardware, and peripherals both remotely and in person, based on technical specifications.',
      ],
      [
        'Helpdesk & Ticketing Support',
        'Addressed software and hardware enquiries, maintaining accurate records of daily communications, user queries, remedial actions, and installations.',
      ],
      [
        'ICT Product Development & Testing',
        'Assisted application programmers, systems developers, and ICT professionals in developing and testing new products and services.',
      ],
      [
        'Documentation & User Training',
        'Authored written instructions and user manuals, documented applications, and contributed to improving the internal knowledge base.',
      ],
      [
        'Dysfunction Detection & Reporting',
        'Identified potential system dysfunctions and emerging user needs, communicating critical insights to management.',
      ],
      [
        'Cross-Departmental Coordination',
        'Coordinated relations between internal clients, external entities, and various departments.',
      ],
      [
        'Archiving System Management',
        'Implemented and maintained robust archiving systems for all unit products and services.',
      ],
      [
        'Social Media Support for MEPs',
        'Provided specialised social media troubleshooting (2FA, account recovery), campaign strategy advice (analytics, targeting, audiences), and verification badge assistance to prevent identity theft.',
      ],
      [
        'Recording Studio Setup',
        'Established and managed a dedicated recording studio for MEPs, ensuring high-quality lighting and sound standards for virtual meetings and speeches.',
      ],
      [
        'Audiovisual Equipment Provision',
        'Deployed customised AV equipment (cameras, ring lights, microphones) tailored to specific user needs, events, and venues.',
      ],
      [
        'AV Consulting & Setup',
        'Delivered professional guidance, tutorials, and setups for IT equipment, including personal devices, to maximise recording quality.',
      ],
      [
        'Interactive Services Landing Page',
        'Developed a dedicated web platform allowing MEPs and APAs to interactively access services and submit direct support requests.',
      ],
      [
        'ServiceNow Development',
        'Created workflows and templates within ServiceNow to streamline and guide colleagues through daily operations.',
      ],
      [
        'IT Support Web Portal',
        'Designed a customised web landing page for the IT Support space to elevate the end-user experience.',
      ],
      [
        'E-Learning Production',
        'Recorded, dubbed, edited, and rendered video tutorials and presentations to guide colleagues on using internal tools and software.',
      ],
    ],
  },
  {
    id: 'sogeti',
    company: 'Sogeti',
    shortCompany: 'Sogeti (Capgemini)',
    period: '2020 — 2021',
    summary:
      'Providing comprehensive IT support, remote administration, and specialised assistance for European Parliament meetings and VIP users, while developing automated workflows and e-learning resources to enhance service delivery.',
    tags: ['IT Support & Infrastructure', 'Active Directory & Remote Administration', 'VIP Meeting Technical Support'],
    intro: '2nd and 3rd level VIP support on distributed high-availability infrastructures.',
    bullets: [
      [
        'IT Incident & Request Management',
        'Handled comprehensive IT incidents and service requests using the CA Service Desk Manager ticketing system.',
      ],
      [
        'Hardware Provisioning & Imaging',
        'Installed computers, deployed software images, and delivered and enrolled European Parliament devices.',
      ],
      [
        'Data Security & Encryption',
        'Ensured endpoint security by encrypting computers and implementing and managing McAfee encryption solutions.',
      ],
      [
        'General Troubleshooting & Remote Support',
        'Provided comprehensive troubleshooting and remote assistance for endpoints using Microsoft SCCM.',
      ],
      [
        'Network & Connectivity Support',
        'Resolved networking issues to guarantee stable connectivity across all devices.',
      ],
      ['Voting System Support', 'Supported iVote and eVote systems, currently known as EP VOTE.'],
      [
        'Authentication & Access Management',
        'Managed WiFi certificates, authentication tokens (including hard tokens), and provided VDI Citrix access support.',
      ],
      [
        'Active Directory & Account Administration',
        'Handled user accounts, password resets, and performed remote fixes on Windows image profiles using Active Directory Management accounts.',
      ],
      [
        'VIP & Meeting IT Support',
        'Delivered specialised IT support for European Parliament meetings, ensuring an optimal working environment for MEPs and VIP users in Brussels and Strasbourg.',
      ],
      [
        'Multilingual Remote Platform Assistance',
        'Assisted remote participants using platforms such as Interactio, troubleshooting connection, audio, and video issues for MEPs.',
      ],
      [
        'Process Automation & Project Development',
        'Developed internal projects focused on enhancing and automating IT service delivery.',
      ],
      [
        'Digital Learning Content Creation',
        'Created e-learning materials designed to facilitate IT material delivery and usage for MEPs and APAs.',
      ],
      [
        'Data Management & Templating',
        'Used Excel spreadsheets for data tracking and designed standardised templates for team-wide operational use.',
      ],
    ],
  },
  {
    id: 'zennit',
    company: 'Zennit IT',
    shortCompany: 'Zennit IT',
    period: '2019 — 2020',
    summary:
      'Providing on-site and remote IT infrastructure support, including hardware, networking, and server migrations, alongside website development and graphic design services.',
    tags: ['IT Infrastructure & Networking', 'Technical Support & Troubleshooting', 'Web Development & Design'],
    intro: 'Hardware and network design, alongside the operational management of the IT asset lifecycle.',
    bullets: [
      [
        'Hardware & Software Troubleshooting',
        'Resolved daily software and hardware issues for computers, printers, and network infrastructure, including diagnostic testing and component replacement.',
      ],
      [
        'Microsoft 365 & SharePoint Administration',
        'Managed company storage, email services, and ticketing workflows using Microsoft Office 365 and SharePoint.',
      ],
      [
        'Multi-Site IT Support',
        'Prioritised and resolved technical issues across corporate networks and machines spanning multiple retail locations.',
      ],
      [
        'On-Site Customer & Network Support',
        'Delivered direct on-site assistance to customers, including troubleshooting and fixing local network issues at external locations.',
      ],
      [
        'Web Development & Customisation',
        'Created and maintained professional websites using WordPress and Elementor with advanced design customisation.',
      ],
      ['Graphic Design & Optimisation', 'Used Adobe Photoshop for graphic editing and web image optimisation.'],
      [
        'Remote Assistance',
        'Provided remote troubleshooting and minor issue resolution for customers using TeamViewer.',
      ],
      [
        'Server Migration Project (LIDL Belgium)',
        'Participated in the enterprise-grade migration project transitioning systems from Windows Server 2003 to Windows Server 2012.',
      ],
      [
        'Server Infrastructure Maintenance',
        'Performed physical server backups, uninstalls, and hardware replacements across LIDL retail locations.',
      ],
      [
        'Network Configuration & Cisco Switches',
        'Managed network connectivity by configuring multiple Cisco switches and setting up dedicated ports for each in-store machine.',
      ],
    ],
  },
  {
    id: 'nato',
    company: 'NATO S.H.A.P.E.',
    shortCompany: 'NATO S.H.A.P.E.',
    period: '2019',
    summary:
      'Managing and securing ICT systems and classified documents under a NATO Secret clearance, administering Active Directory, automating routine tasks, and providing comprehensive infrastructure support and user troubleshooting.',
    tags: ['Classified Systems Administration', 'Classified Document Management', 'Cyber Defence'],
    intro: 'Management of technological assets in a high-security military-diplomatic environment.',
    bullets: [
      [
        'Systems & Network Administration',
        'Maintained, configured, and ensured the reliable operation of computer and network systems, servers, workstations, and peripheral devices.',
      ],
      [
        'Hardware & Software Upgrades',
        'Installed and upgraded computer components and software while ensuring strict compatibility and functionality.',
      ],
      [
        'Task Automation',
        'Automated routine administrative and technical tasks to improve overall operational efficiency and productivity.',
      ],
      [
        'Technical Support & Troubleshooting',
        'Diagnosed technical issues and provided timely, effective technical support to end users.',
      ],
      [
        'System Security & Integrity',
        'Guaranteed optimum system integrity, security protocols, reliable data backups, and peak performance.',
      ],
      [
        'End-User ICT Assistance',
        'Assisted users in resolving diverse ICT-related issues, including network connectivity, email problems, hardware malfunctions, and printer errors.',
      ],
      [
        'Classified Systems IT & Document Release',
        'Administered and secured sensitive or classified IT systems, and managed the secure processing, tracking, and controlled release of classified documents in compliance with strict security protocols.',
      ],
      [
        'Asset & Inventory Management',
        'Managed and tracked inventory for all ICT equipment, including computers, keyboards, monitors, and mice.',
      ],
      [
        'Microsoft Office Suite',
        'Used Microsoft Office Suite (Word, PowerPoint, Excel 2013/2016) for documentation and data management tasks.',
      ],
      [
        'Training Presentation Delivery',
        'Created and delivered professional Microsoft PowerPoint presentations for staff training and information purposes.',
      ],
      [
        'Active Directory Administration',
        'Administered Active Directory to manage user accounts, organisational units, and granular access permissions.',
      ],
      [
        'Professional Certification',
        'Continuously pursued and obtained relevant ICT certifications to enhance technical knowledge and professional skills.',
      ],
    ],
  },
]

export const education: EducationEntry[] = [
  {
    badge: "Bachelor's Degree",
    title: 'Communication & Multimedia',
    description:
      'The L-20 Communication and Multimedia programme focuses on modern digital communication strategies, web content production, multimedia storytelling, and social media management for contemporary media environments.',
    institution: 'Universitas Mercatorum',
  },
  {
    badge: 'High School Diploma',
    title: 'Informatics & Telecommunications',
    description:
      'The Informatics and Telecommunications diploma focused on computer science, network infrastructure, hardware and software systems, and telecommunication technologies.',
    institution: 'Istituto Santa Lucia',
  },
]

export const skillRows: string[][] = [
  [
    'Architecting Active Directory & GPO',
    'SCCM Endpoint Configuration',
    'VIP Enterprise Escalation & Support',
    'Zero-Trust MFA & IAM Integration',
    'Workspace ONE UEM / AirWatch MDM',
    'Trellix Endpoint Security',
    'Microsoft 365 Architecture',
    'Diplomatic-Grade Security Protocols',
  ],
  [
    'ServiceNow SLA Management',
    'Frontend Craftsmanship (HTML/CSS/JS)',
    'Data-Driven Meta Ads Strategy',
    'Video Conferencing Orchestration',
    'Cisco Network Diagnostics',
    'Disaster Recovery & Data Integrity',
    'macOS & iOS Enterprise Deployment',
    'TCP/IP, DNS & VPN Routing',
  ],
]

export const languages = [
  { name: 'Italian', level: 'Mother tongue', value: 100 },
  { name: 'English', level: 'C1 — Fluent', value: 88 },
  { name: 'French', level: 'C1 — Fluent', value: 88 },
]

export const certifications: Certification[] = [
  {
    date: '26 Dec 2020',
    issuer: 'PeopleCert',
    title: 'ITIL v4 Foundation Certificate in IT Service Management',
    description:
      'ITIL v4 is a best-practice framework for IT service management focused on delivering value through efficient, high-quality IT services. Emphasises collaboration, end-to-end service delivery, automation, and alignment between IT services and business needs.',
    featured: true,
  },
  {
    date: '21 Oct 2019',
    issuer: 'NATO — Residential',
    title: 'ADL 343 Information Security Management System',
    description:
      'Advanced framework management for securing sensitive diplomatic data and understanding ISMS protocols within international operations.',
  },
  {
    date: '21 Oct 2019',
    issuer: 'NATO — Residential',
    title: 'ADL 344 Digital Forensics & Digital Evidence',
    description:
      'Techniques for identifying, preserving, analysing, and presenting digital evidence in secure and classified environments.',
  },
  {
    date: '21 Oct 2019',
    issuer: 'NATO — Residential',
    title: 'ADL 335 Cyber Awareness for System Admins',
    description:
      'Critical cyber threat mitigation and awareness tailored for system administrators managing vital infrastructure.',
  },
  {
    date: '21 Oct 2019',
    issuer: 'NATO — Work based',
    title: 'ADL 346 Web Application Security',
    description:
      'Identifying vulnerabilities and implementing security measures across complex web applications.',
  },
  {
    date: '30 Sep 2019',
    issuer: 'NATO — Work based',
    title: 'ADL 076 Cyber Defence Awareness',
    description:
      'Comprehensive understanding of cyber defence strategies, attack vectors, and counter-measures.',
  },
  {
    date: '27 Aug 2019',
    issuer: 'NATO — Work based',
    title: 'SHAPE IM Foundation Course',
    description:
      'Foundational principles of Information Management within Supreme Headquarters Allied Powers Europe.',
  },
  {
    date: '20 Aug 2019',
    issuer: 'NATO — Work based',
    title: 'SHAPE CiS Coordinators',
    description: 'Coordination of Communication and Information Systems across secure NATO networks.',
  },
]

export const ethos: EthosBox[] = [
  {
    title: 'The IT journey',
    body: 'Passionate about IT since childhood and dedicated to building a smarter, more secure digital future. With over six years of hands-on experience and a Bachelor\'s degree in Communication and Multimedia, I have built a solid career as an ICT support officer and enterprise specialist. After working as a system administrator and 2nd/3rd level support technician, I expanded my operational expertise within two of the most prestigious international diplomatic organisations: NATO and the European Parliament.',
    wide: true,
    accent: 'ink',
  },
  {
    title: 'Operational efficiency',
    body: 'A strong ability to plan, prioritise, and manage tasks in dynamic and highly structured environments. Proven skill in handling multiple responsibilities while ensuring strict adherence to service level agreements and deadlines using advanced ticketing systems.',
    accent: 'blue',
  },
  {
    title: 'Root cause analysis',
    body: 'A proactive attitude focused on preventative problem-solving and process automation. Recognised for accuracy in root-cause analysis, eliminating recurring issues, and optimising business workflows.',
    accent: 'ink',
  },
  {
    title: 'Diplomacy & VIP support',
    body: 'Extensive experience in high-pressure diplomatic environments (NATO, European Parliament), providing discreet, prompt, and exceptional support to VIP and executive users.',
    list: [
      'Received letters of appreciation and commendations for service excellence.',
      'Flawless management of requests in high-criticality scenarios and timelines.',
      'Effective coordination with stakeholders and technical departments for seamless end-to-end resolution.',
    ],
    wide: true,
    accent: 'blue',
  },
]

export const contact = {
  email: 'contact@danielemancini.eu',
  linkedin: 'https://be.linkedin.com/in/danimanci',
  site: 'https://www.danielemancini.eu',
}
