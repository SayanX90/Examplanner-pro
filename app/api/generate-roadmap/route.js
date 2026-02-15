import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ========================================
// CURATED RESOURCE DATABASE (EXPANDED)
// ========================================
const CURATED_RESOURCES = {
    // --- TECH & CODING ---
    'web development': {
        name: 'freeCodeCamp Web Development',
        url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
        platform: 'freecodecamp',
        youtubeChannel: 'https://www.youtube.com/@freecodecamp',
        practiceSite: 'https://www.frontendmentor.io/challenges',
        topics: [
            'HTML Basics - Structure & Semantics',
            'CSS Fundamentals - Box Model, Flexbox, Grid',
            'Responsive Design - Media Queries',
            'JavaScript Basics - Variables, Loops, Functions',
            'DOM Manipulation - Events & Interactivity',
            'Async JavaScript - Fetch API, Promises',
            'Frontend Frameworks - React/Vue Basics',
            'State Management - Redux/Context',
            'Git & GitHub - Version Control',
            'Deployment - Netlify/Vercel'
        ]
    },
    'javascript': {
        name: 'JavaScript.info',
        url: 'https://javascript.info/',
        platform: 'documentation',
        youtubeChannel: 'https://www.youtube.com/@TraversyMedia',
        practiceSite: 'https://www.codewars.com/kata/search/javascript',
        topics: [
            'JS Fundamentals - Variables, Types',
            'Code Quality - Debugging, Testing',
            'Objects & Arrays - Methods & Properties',
            'Functions - Arrow Fn, Closures',
            'Prototypes & Classes - OOP in JS',
            'Async JS - Promises, Async/Await',
            'DOM - Document Object Model',
            'Events - Bubbling, Delegation',
            'Error Handling - Try/Catch',
            'ES6+ Features - Modules, Destructuring'
        ]
    },
    'python': {
        name: 'Python.org Official Docs',
        url: 'https://docs.python.org/3/tutorial/',
        platform: 'documentation',
        youtubeChannel: 'https://www.youtube.com/@coreyms',
        practiceSite: 'https://www.hackerrank.com/domains/python',
        topics: [
            'Python Basics - Syntax & Variables',
            'Control Flow - Loops & Conditionals',
            'Data Structures - Lists, Dicts, Sets',
            'Functions & Modules',
            'File Handling - I/O Operations',
            'OOP - Classes & Inheritance',
            'Exception Handling',
            'Standard Library - datetime, math, random',
            'Virtual Environments & Pip',
            'Testing - unittest/pytest'
        ]
    },
    'data structures': {
        name: 'GeeksforGeeks DSA',
        url: 'https://www.geeksforgeeks.org/data-structures/',
        platform: 'documentation',
        youtubeChannel: 'https://www.youtube.com/@freeCodeCamp',
        practiceSite: 'https://leetcode.com/problemset/',
        topics: [
            'Arrays & Strings',
            'Linked Lists - Singly & Doubly',
            'Stacks & Queues',
            'Trees - Binary Trees, BST',
            'Graphs - BFS, DFS',
            'Hashing & HashMaps',
            'Sorting & Searching Algorithms',
            'Recursion & Backtracking',
            'Dynamic Programming',
            'Greedy Algorithms'
        ]
    },

    // --- MEDICAL & PHARMACY ---
    'pharmacy': {
        name: 'Pharmacy Times / PubMed',
        url: 'https://www.pharmacytimes.com/',
        platform: 'article',
        youtubeChannel: 'https://www.youtube.com/@SpeedPharmacology',
        practiceSite: 'https://pharmacy-tech-test.com/',
        topics: [
            'Pharmacology Basics - Drug Classes',
            'Pharmaceutics - Dosage Forms',
            'Medicinal Chemistry - Drug Structures',
            'Pharmacokinetics - ADME',
            'Pharmacotherapy - Disease Management',
            'Pharmacy Law & Ethics',
            'Hospital Pharmacy Practice',
            'Community Pharmacy Management',
            'Drug Interactions & Contraindications',
            'Patient Counseling Skills'
        ]
    },
    'medical': {
        name: 'Osmosis / Khan Academy Medicine',
        url: 'https://www.osmosis.org/',
        platform: 'course',
        youtubeChannel: 'https://www.youtube.com/@Osmosis',
        practiceSite: 'https://www.usmle.org/practice-materials/',
        topics: [
            'Human Anatomy - Systems & Structures',
            'Human Physiology - Body Functions',
            'Biochemistry - Metabolic Pathways',
            'Pathology - Disease Mechanisms',
            'Microbiology - Bacteria, Viruses, Fungi',
            'Immunology - Immune System Response',
            'Pharmacology - Drug Mechanisms',
            'Clinical Medicine - Diagnosis & Treatment',
            'Medical Ethics & Law',
            'Public Health & Epidemiology'
        ]
    },
    'nursing': {
        name: 'RegisteredNurseRN',
        url: 'https://www.registerednursern.com/',
        platform: 'blog',
        youtubeChannel: 'https://www.youtube.com/@RegisteredNurseRN',
        practiceSite: 'https://nurseslabs.com/nclex-practice-questions/',
        topics: [
            'Nursing Fundamentals - Care & Hygiene',
            'Anatomy & Physiology for Nurses',
            'Medical-Surgical Nursing',
            'Pediatric Nursing',
            'Maternal & Child Health',
            'Psychiatric & Mental Health Nursing',
            'Pharmacology for Nurses',
            'Critical Care Nursing',
            'Nursing Leadership & Management',
            'Community Health Nursing'
        ]
    },

    // --- BUSINESS & MBA ---
    'mba': {
        name: 'Harvard Business Review / Investopedia',
        url: 'https://hbr.org/',
        platform: 'article',
        youtubeChannel: 'https://www.youtube.com/@MBA_CrystalBall',
        practiceSite: 'https://www.investopedia.com/simulator/',
        topics: [
            'Marketing Management - 4Ps, Strategy',
            'Financial Accounting - Balance Sheets',
            'Organizational Behavior - Team Dynamics',
            'Operations Management - Supply Chain',
            'Strategic Management - Competitive Advantage',
            'Corporate Finance - Valuation, Capital',
            'Human Resource Management',
            'Economics for Managers',
            'Business Ethics & Law',
            'Entrepreneurship & Innovation'
        ]
    },
    'finance': {
        name: 'CFA Institute / Investopedia',
        url: 'https://www.investopedia.com/',
        platform: 'article',
        youtubeChannel: 'https://www.youtube.com/@ThePlainBagel',
        practiceSite: 'https://www.cfainstitute.org/',
        topics: [
            'Financial Reporting & Analysis',
            'Quantitative Methods',
            'Corporate Finance',
            'Equity Investments',
            'Fixed Income',
            'Derivatives',
            'Alternative Investments',
            'Portfolio Management',
            'Ethical & Professional Standards',
            'Economics'
        ]
    },
    'marketing': {
        name: 'HubSpot Academy',
        url: 'https://academy.hubspot.com/',
        platform: 'course',
        youtubeChannel: 'https://www.youtube.com/@HubSpotMarketing',
        practiceSite: 'https://neilpatel.com/blog/',
        topics: [
            'Digital Marketing Fundamentals',
            'Content Marketing Strategy',
            'Social Media Marketing',
            'SEO (Search Engine Optimization)',
            'Email Marketing',
            'PPC & Advertising',
            'Marketing Analytics & Data',
            'Brand Management',
            'Consumer Behavior',
            'Market Research'
        ]
    },

    // --- LAW ---
    'law': {
        name: 'Legal Information Institute (LII)',
        url: 'https://www.law.cornell.edu/',
        platform: 'documentation',
        youtubeChannel: 'https://www.youtube.com/@LegalEagle',
        practiceSite: 'https://www.barbri.com/law-school-study-aids/',
        topics: [
            'Constitutional Law',
            'Contracts Law',
            'Torts & Personal Injury',
            'Criminal Law & Procedure',
            'Property Law',
            'Civil Procedure',
            'Evidence',
            'Administrative Law',
            'International Law',
            'Legal Research & Writing'
        ]
    },

    // --- SCIENCE & ENGINEERING ---
    'physics': {
        name: 'Khan Academy Physics',
        url: 'https://www.khanacademy.org/science/physics',
        platform: 'course',
        youtubeChannel: 'https://www.youtube.com/@physicsgirl',
        practiceSite: 'https://www.physicsclassroom.com/',
        topics: [
            'Classical Mechanics - Motion, Forces',
            'Thermodynamics - Heat, Energy',
            'Electromagnetism - Fields, Circuits',
            'Optics - Light, Lenses',
            'Quantum Mechanics Basics',
            'Relativity - Special & General',
            'Fluid Mechanics',
            'Waves & Oscillations',
            'Nuclear Physics',
            'Astrophysics Basics'
        ]
    },
    'chemistry': {
        name: 'Khan Academy Chemistry',
        url: 'https://www.khanacademy.org/science/chemistry',
        platform: 'course',
        youtubeChannel: 'https://www.youtube.com/@ProfessorDaveExplains',
        practiceSite: 'https://www.rsc.org/learn-chemistry',
        topics: [
            'Atomic Structure & Periodicity',
            'Chemical Bonding',
            'Stoichiometry & Reactions',
            'States of Matter',
            'Thermodynamics & Kinetics',
            'Equilibrium',
            'Acids & Bases',
            'Redox Reactions',
            'Organic Chemistry Basics',
            'Inorganic Chemistry'
        ]
    },

    // --- HUMANITIES ---
    'history': {
        name: 'CrashCourse History',
        url: 'https://www.khanacademy.org/humanities/world-history',
        platform: 'course',
        youtubeChannel: 'https://www.youtube.com/@CrashCourse',
        practiceSite: 'https://www.history.com/',
        topics: [
            'Ancient Civilizations',
            'The Middle Ages',
            'The Renaissance & Reformation',
            'Age of Exploration',
            'The Enlightenment',
            'Industrial Revolution',
            'World War I & II',
            'Cold War Era',
            'Decolonization',
            'Modern Global History'
        ]
    },
    'psychology': {
        name: 'Verywell Mind / Simply Psychology',
        url: 'https://www.simplypsychology.org/',
        platform: 'article',
        youtubeChannel: 'https://www.youtube.com/@Psych2go',
        practiceSite: 'https://www.apa.org/',
        topics: [
            'Intro to Psychology',
            'Biological Basis of Behavior',
            'Sensation & Perception',
            'Learning & Conditioning',
            'Cognitive Psychology - Memory',
            'Developmental Psychology',
            'Personality Theories',
            'Abnormal Psychology',
            'Social Psychology',
            'Research Methods in Psychology'
        ]
    },

    // Default/Generic
    'default': {
        name: 'Generic Study Resource',
        url: null,
        platform: 'generic',
        youtubeChannel: 'https://www.youtube.com/results?search_query=educational+tutorials',
        practiceSite: 'https://www.quizlet.com/',
        topics: [
            'Core Concepts Overview',
            'Fundamental Principles',
            'Key Theories & Models',
            'Historical Context',
            'Practical Applications',
            'Case Studies',
            'Current Trends',
            'Research Methods',
            'Advanced Topics',
            'Final Review & Synthesis'
        ]
    }
};

// ========================================
// SUBJECT DETECTION & RESOURCE SELECTION
// ========================================
function selectBestResource(subjectName, userProvidedLink = null) {
    const name = subjectName.toLowerCase();

    // Priority 1: User provided link (analyze it if possible)
    if (userProvidedLink) {
        return {
            name: 'Your Provided Resource',
            url: userProvidedLink,
            platform: 'custom',
            topics: [], // Will try to fetch
            isCustom: true
        };
    }

    // Priority 2: Exact match in curated database
    for (const key in CURATED_RESOURCES) {
        if (name.includes(key)) {
            return { ...CURATED_RESOURCES[key], isCustom: false };
        }
    }

    // Priority 3: Category-based matching
    // Priority 3: Category-based matching
    if (name.match(/web|html|css|frontend|responsive/)) return { ...CURATED_RESOURCES['web development'], isCustom: false };
    if (name.match(/react|next|vue|angular/)) return { ...CURATED_RESOURCES['react'], isCustom: false };
    if (name.match(/javascript|js|ecmascript/)) return { ...CURATED_RESOURCES['javascript'], isCustom: false };
    if (name.match(/dsa|data structure|algorithm/)) return { ...CURATED_RESOURCES['data structures'], isCustom: false };
    if (name.match(/python|py/)) return { ...CURATED_RESOURCES['python'], isCustom: false };
    if (name.match(/node|express|backend/)) return { ...CURATED_RESOURCES['node.js'], isCustom: false };

    // New Categories
    if (name.match(/pharmacy|drug|medicine|pharma/)) return { ...CURATED_RESOURCES['pharmacy'], isCustom: false };
    if (name.match(/nurse|nursing|patient/)) return { ...CURATED_RESOURCES['nursing'], isCustom: false };
    if (name.match(/health|doctor|mbbs|medical|biology|anatomy/)) return { ...CURATED_RESOURCES['medical'], isCustom: false };
    if (name.match(/mba|business|management|accounting|finance|economics/)) return { ...CURATED_RESOURCES['mba'], isCustom: false }; // Broad match
    if (name.match(/marketing|seo|brand/)) return { ...CURATED_RESOURCES['marketing'], isCustom: false };
    if (name.match(/law|legal|court|constitution/)) return { ...CURATED_RESOURCES['law'], isCustom: false };
    if (name.match(/physics|mechanics|thermo/)) return { ...CURATED_RESOURCES['physics'], isCustom: false };
    if (name.match(/chemistry|reaction|organic/)) return { ...CURATED_RESOURCES['chemistry'], isCustom: false };
    if (name.match(/history|civilization|war/)) return { ...CURATED_RESOURCES['history'], isCustom: false };
    if (name.match(/psychology|mind|behavior/)) return { ...CURATED_RESOURCES['psychology'], isCustom: false };

    // Fallback to default
    return { ...CURATED_RESOURCES['default'], isCustom: false };
}

// ========================================
// PROGRESSIVE TOPIC GENERATOR
// ========================================
function generateProgressiveTopics(resourceTopics, weekNumber, totalWeeks, phase, subjectName) {
    // If we have curated topics from resource, use progressive approach
    if (resourceTopics && resourceTopics.length > 0) {
        const topicsPerWeek = 3;
        const startIndex = (weekNumber - 1) * topicsPerWeek;
        const endIndex = Math.min(startIndex + topicsPerWeek, resourceTopics.length);

        const weekTopics = resourceTopics.slice(startIndex, endIndex);

        // Convert to task format
        return weekTopics.map((topic, index) => {
            const difficulty = phase === 'foundation' ? 'Easy' :
                phase === 'core' ? 'Medium' :
                    phase === 'practice' ? 'Hard' : 'Medium';

            const time = phase === 'foundation' ? '2-4 hours' :
                phase === 'core' ? '4-6 hours' :
                    phase === 'practice' ? '5-8 hours' : '4-6 hours';

            return {
                name: topic,
                difficulty: difficulty,
                time: time,
                chapter: `Topic ${startIndex + index + 1}`
            };
        });
    }

    // Fallback: Generic progressive topics (but still varied by week)
    return generateGenericProgressiveTopics(subjectName, weekNumber, phase);
}

function generateGenericProgressiveTopics(subjectName, weekNumber, phase) {
    const topics = [];

    if (phase === 'foundation') {
        topics.push(
            { name: `${subjectName} Fundamentals - Part ${weekNumber}`, difficulty: 'Easy', time: '2-4 hours', chapter: `Week ${weekNumber}` },
            { name: `Core Concepts ${weekNumber}`, difficulty: 'Easy', time: '3-4 hours', chapter: `Week ${weekNumber}` },
            { name: `Practice Basics ${weekNumber}`, difficulty: 'Easy', time: '2-3 hours', chapter: `Week ${weekNumber}` }
        );
    } else if (phase === 'core') {
        topics.push(
            { name: `Intermediate Topic ${weekNumber}`, difficulty: 'Medium', time: '4-5 hours', chapter: `Week ${weekNumber}` },
            { name: `Advanced Concepts ${weekNumber}`, difficulty: 'Medium', time: '4-6 hours', chapter: `Week ${weekNumber}` },
            { name: `Hands-on Practice ${weekNumber}`, difficulty: 'Medium', time: '3-4 hours', chapter: `Week ${weekNumber}` }
        );
    } else if (phase === 'practice') {
        topics.push(
            { name: `Problem Set ${weekNumber}`, difficulty: 'Hard', time: '5-6 hours', chapter: `Week ${weekNumber}` },
            { name: `Project Work ${weekNumber}`, difficulty: 'Hard', time: '6-8 hours', chapter: `Week ${weekNumber}` },
            { name: `Mock Assessment ${weekNumber}`, difficulty: 'Medium', time: '3 hours', chapter: `Week ${weekNumber}` }
        );
    } else {
        topics.push(
            { name: `Revision Module ${weekNumber}`, difficulty: 'Medium', time: '4-6 hours', chapter: `Week ${weekNumber}` },
            { name: `Practice Test ${weekNumber}`, difficulty: 'Hard', time: '3 hours', chapter: `Week ${weekNumber}` },
            { name: `Final Review ${weekNumber}`, difficulty: 'Easy', time: '2-3 hours', chapter: `Week ${weekNumber}` }
        );
    }

    return topics;
}

// ========================================
// ENHANCED ROADMAP GENERATOR
// ========================================
function generateEnhancedRoadmap(subject, examDate, difficulty, resource) {
    const today = new Date();
    const exam = new Date(examDate);
    const diffTime = Math.abs(exam - today);
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let totalWeeks = Math.ceil(daysRemaining / 7);
    if (totalWeeks < 4) totalWeeks = 4;
    if (totalWeeks > 20) totalWeeks = 20; // Cap at 20 weeks for practicality

    const weeks = [];

    // Phase distribution
    const foundationWeeks = Math.max(1, Math.floor(totalWeeks * 0.30));
    const coreWeeks = Math.max(1, Math.floor(totalWeeks * 0.35));
    const practiceWeeks = Math.max(1, Math.floor(totalWeeks * 0.20));
    const revisionWeeks = Math.max(1, totalWeeks - foundationWeeks - coreWeeks - practiceWeeks);

    let weekNumber = 1;

    // Foundation Phase
    for (let i = 0; i < foundationWeeks; i++) {
        const topics = generateProgressiveTopics(resource.topics, weekNumber, totalWeeks, 'foundation', subject);

        const tasks = topics.map(topic => ({
            title: topic.name,
            description: `Study from ${resource.name}`,
            book: resource.name,
            links: {
                resource: resource.url || `https://www.google.com/search?q=${encodeURIComponent(subject + ' ' + topic.name)}`,
                google: `https://www.google.com/search?q=${encodeURIComponent(subject + ' ' + topic.name + ' tutorial')}`,
                youtube: (resource.youtubeChannel && resource.name !== 'Generic Study Resource') ?
                    `https://www.youtube.com/results?search_query=${encodeURIComponent(resource.name + ' ' + topic.name + ' tutorial -shorts')}` :
                    `https://www.youtube.com/results?search_query=${encodeURIComponent(subject + ' ' + topic.name + ' tutorial -shorts')}`,
                practice: resource.practiceSite || `https://www.google.com/search?q=${encodeURIComponent(subject + ' ' + topic.name + ' practice questions')}`,
                udemy: `https://www.udemy.com/courses/search/?src=ukw&q=${encodeURIComponent(subject + ' ' + topic.name)}`,
                coursera: `https://www.coursera.org/search?query=${encodeURIComponent(subject + ' ' + topic.name)}`
            },
            time: topic.time,
            difficulty: topic.difficulty
        }));

        weeks.push({
            title: `Week ${weekNumber} - Foundation Building`,
            phase: 'PHASE 1 - FOUNDATION',
            tasks: tasks,
            suggestions: [
                'Focus on understanding basics thoroughly',
                'Take detailed notes for future reference',
                'Don\'t rush - strong foundation is crucial'
            ]
        });
        weekNumber++;
    }

    // Core Phase
    for (let i = 0; i < coreWeeks; i++) {
        const topics = generateProgressiveTopics(resource.topics, weekNumber, totalWeeks, 'core', subject);

        const tasks = topics.map(topic => ({
            title: topic.name,
            description: `Master concepts from ${resource.name}`,
            book: resource.name,
            links: {
                resource: resource.url || `https://www.google.com/search?q=${encodeURIComponent(subject + ' ' + topic.name)}`,
                google: `https://www.google.com/search?q=${encodeURIComponent(subject + ' ' + topic.name + ' tutorial')}`,
                youtube: (resource.youtubeChannel && resource.name !== 'Generic Study Resource') ?
                    `https://www.youtube.com/results?search_query=${encodeURIComponent(resource.name + ' ' + topic.name + ' tutorial -shorts')}` :
                    `https://www.youtube.com/results?search_query=${encodeURIComponent(subject + ' ' + topic.name + ' tutorial -shorts')}`,
                practice: resource.practiceSite || `https://www.google.com/search?q=${encodeURIComponent(subject + ' ' + topic.name + ' practice exercises')}`,
                udemy: `https://www.udemy.com/courses/search/?src=ukw&q=${encodeURIComponent(subject + ' ' + topic.name)}`,
                coursera: `https://www.coursera.org/search?query=${encodeURIComponent(subject + ' ' + topic.name)}`
            },
            time: topic.time,
            difficulty: topic.difficulty
        }));

        weeks.push({
            title: `Week ${weekNumber} - Core Concepts`,
            phase: `PHASE 2 - CORE LEARNING`,
            tasks: tasks,
            suggestions: [
                'Connect new topics with previous learning',
                'Practice problems after theory',
                'Review daily to retain information'
            ]
        });
        weekNumber++;
    }

    // Practice Phase
    for (let i = 0; i < practiceWeeks; i++) {
        const topics = generateProgressiveTopics(resource.topics, weekNumber, totalWeeks, 'practice', subject);

        const tasks = topics.map(topic => ({
            title: topic.name,
            description: `Apply knowledge through practice`,
            book: resource.name,
            links: {
                resource: resource.url || `https://www.google.com/search?q=${encodeURIComponent(subject + ' ' + topic.name)}`,
                google: `https://www.google.com/search?q=${encodeURIComponent(subject + ' ' + topic.name + ' tutorial')}`,
                youtube: (resource.youtubeChannel && resource.name !== 'Generic Study Resource') ?
                    `https://www.youtube.com/results?search_query=${encodeURIComponent(resource.name + ' ' + topic.name + ' tutorial -shorts')}` :
                    `https://www.youtube.com/results?search_query=${encodeURIComponent(subject + ' ' + topic.name + ' tutorial -shorts')}`,
                practice: resource.practiceSite || `https://www.google.com/search?q=${encodeURIComponent(subject + ' ' + topic.name + ' problems')}`,
                udemy: `https://www.udemy.com/courses/search/?src=ukw&q=${encodeURIComponent(subject + ' ' + topic.name)}`,
                coursera: `https://www.coursera.org/search?query=${encodeURIComponent(subject + ' ' + topic.name)}`
            },
            time: topic.time,
            difficulty: topic.difficulty
        }));

        weeks.push({
            title: `Week ${weekNumber} - Practice & Application`,
            phase: 'PHASE 3 - PRACTICE',
            tasks: tasks,
            suggestions: [
                'Focus on speed and accuracy',
                'Analyze mistakes carefully',
                'Practice variety of problem types'
            ]
        });
        weekNumber++;
    }

    // Revision Phase
    for (let i = 0; i < revisionWeeks; i++) {
        const isLastWeek = i === revisionWeeks - 1;
        const topics = generateProgressiveTopics(resource.topics, weekNumber, totalWeeks, 'revision', subject);

        const tasks = topics.map(topic => ({
            title: topic.name || `Comprehensive Revision ${i + 1}`,
            description: `Review all topics from ${resource.name}`,
            book: resource.name,
            links: {
                resource: resource.url || `https://www.google.com/search?q=${encodeURIComponent(subject + ' revision')}`,
                google: `https://www.google.com/search?q=${encodeURIComponent(subject + ' ' + topic.name + ' revision')}`,
                youtube: (resource.youtubeChannel && resource.name !== 'Generic Study Resource') ?
                    `https://www.youtube.com/results?search_query=${encodeURIComponent(resource.name + ' ' + subject + ' full course -shorts')}` :
                    `https://www.youtube.com/results?search_query=${encodeURIComponent(subject + ' full course -shorts')}`,
                practice: resource.practiceSite || `https://www.google.com/search?q=${encodeURIComponent(subject + ' mock test practice')}`,
                udemy: `https://www.udemy.com/courses/search/?src=ukw&q=${encodeURIComponent(subject + ' ' + topic.name)}`,
                coursera: `https://www.coursera.org/search?query=${encodeURIComponent(subject + ' ' + topic.name)}`
            },
            time: topic.time || '4-6 hours',
            difficulty: topic.difficulty || 'Medium'
        }));

        weeks.push({
            title: `Week ${weekNumber} - ${isLastWeek ? 'Final Revision' : 'Revision'}`,
            phase: 'PHASE 4 - REVISION',
            tasks: tasks,
            suggestions: isLastWeek ? [
                'Stay calm and confident',
                'Review key concepts and notes',
                'Get adequate rest before exam'
            ] : [
                'Identify and strengthen weak areas',
                'Quick revision of all topics',
                'Solve practice problems'
            ]
        });
        weekNumber++;
    }

    const tips = [
        `📚 Recommended Resource: ${resource.name}`,
        resource.url ? `🔗 Resource Link: ${resource.url}` : `🔍 Search for quality resources online`,
        `⏰ Total Study Plan: ${totalWeeks} weeks (${daysRemaining} days)`,
        `🎯 Focus Level: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`
    ];

    return { weeks, tips, resource };
}

// ========================================
// GEMINI AI GENERATOR
// ========================================
async function generateGeminiRoadmap(subject, examDate, difficulty, apiKey) {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
        Act as an expert study planner. Create a detailed, structured study roadmap for the subject: "${subject.name}".
        Exam Date: ${subject.examDate} (Today is ${new Date().toLocaleDateString()}).
        Difficulty Level: ${difficulty}.
        
        The roadmap should be broken down into weeks.
        Total duration should be reasonable based on the time remaining (min 4 weeks, max 12 weeks).
        
        Return the response strictly as a VALID JSON object with the following structure:
        {
            "weeks": [
                {
                    "title": "Week 1 - [Focus Area]",
                    "phase": "PHASE 1 - [Foundation/Core/Practice/Revision]",
                    "suggestions": ["Tip 1", "Tip 2", "Tip 3"],
                    "tasks": [
                        {
                            "title": "Topic Name",
                            "description": "Brief instruction",
                            "difficulty": "Easy/Medium/Hard",
                            "time": "2-4 hours",
                            "book": "Recommended Book/Resource"
                        }
                    ]
                }
            ],
            "tips": ["General study tip 1", "General study tip 2", "General study tip 3"],
            "resourceRecommendation": {
                "name": "Best Book/Course Name",
                "url": "https://example.com"
            }
        }
        
        Ensure the JSON is valid and parsable. Do not include markdown naming like \`\`\`json.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean cleanup if markdown code blocks are returned
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const data = JSON.parse(text);
        return data; // Expected to match the structure
    } catch (error) {
        console.error("Gemini Generation Failed:", error);
        return null; // Fallback to static
    }
}

// ========================================
// API ROUTE HANDLER
// ========================================
export async function POST(request) {
    try {
        const { subject } = await request.json();

        if (!subject || !subject.name || !subject.examDate) {
            return NextResponse.json({
                error: 'Missing required subject data'
            }, { status: 400 });
        }

        // 1. Try AI Generation if Key Exists
        const geminiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        let aiRoadmap = null;

        if (geminiKey && geminiKey.length > 20) { // Basic check for potentially valid key
            console.log("🤖 Attempting AI Roadmap Generation for:", subject.name);
            aiRoadmap = await generateGeminiRoadmap(subject, subject.examDate, subject.difficulty || 'medium', geminiKey);
        }

        if (aiRoadmap) {
            // Decorate AI response with links (since AI returns raw tasks)
            const weeksWithLinks = aiRoadmap.weeks.map(week => ({
                ...week,
                tasks: week.tasks.map(task => ({
                    ...task,
                    links: {
                        resource: `https://www.google.com/search?q=${encodeURIComponent(subject.name + ' ' + task.title)}`,
                        google: `https://www.google.com/search?q=${encodeURIComponent(subject.name + ' ' + task.title + ' tutorial')}`,
                        youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(subject.name + ' ' + task.title + ' tutorial')}`,
                        practice: `https://www.google.com/search?q=${encodeURIComponent(subject.name + ' ' + task.title + ' practice questions')}`,
                        udemy: `https://www.udemy.com/courses/search/?src=ukw&q=${encodeURIComponent(subject.name + ' ' + task.title)}`,
                        coursera: `https://www.coursera.org/search?query=${encodeURIComponent(subject.name + ' ' + task.title)}`
                    }
                }))
            }));

            return NextResponse.json({
                roadmap: weeksWithLinks,
                tips: aiRoadmap.tips,
                subjectInfo: {
                    id: subject.id,
                    name: subject.name,
                    examDate: subject.examDate,
                    difficulty: subject.difficulty,
                    resourceLink: aiRoadmap.resourceRecommendation?.url || subject.resourceLink,
                    recommendedResource: aiRoadmap.resourceRecommendation?.name || "AI Recommended Path"
                }
            });
        }

        // 2. Fallback to Static/Curated Generator
        console.log("📚 Using Standard Curated Generator for:", subject.name);

        // Select best resource for this subject
        const resource = selectBestResource(subject.name, subject.resourceLink);

        // Generate roadmap with progressive topics
        const { weeks, tips } = generateEnhancedRoadmap(
            subject.name,
            subject.examDate,
            subject.difficulty || 'medium',
            resource
        );

        return NextResponse.json({
            roadmap: weeks,
            tips: tips,
            subjectInfo: {
                id: subject.id,
                name: subject.name,
                examDate: subject.examDate,
                difficulty: subject.difficulty,
                resourceLink: resource.url || subject.resourceLink,
                recommendedResource: resource.name
            }
        });

    } catch (error) {
        console.error('Roadmap Generation Error:', error);
        return NextResponse.json({
            error: 'Failed to generate roadmap',
            details: error.message
        }, { status: 500 });
    }
}
