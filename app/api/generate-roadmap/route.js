import { NextResponse } from 'next/server';

// ========================================
// CURATED RESOURCE DATABASE
// ========================================
const CURATED_RESOURCES = {
    // Web Development
    'web development': {
        name: 'freeCodeCamp Web Development',
        url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
        platform: 'freecodecamp',
        youtubeChannel: 'https://www.youtube.com/@freecodecamp',
        practiceSite: 'https://www.frontendmentor.io/challenges',
        topics: [
            'HTML Basics - Learn HTML by Building a Cat Photo App',
            'CSS Fundamentals - Learn Basic CSS by Building a Cafe Menu',
            'CSS Colors - Learn CSS Colors by Building a Set of Colored Markers',
            'HTML Forms - Learn HTML Forms by Building a Registration Form',
            'CSS Box Model - Learn the CSS Box Model by Building a Rothko Painting',
            'CSS Flexbox - Learn CSS Flexbox by Building a Photo Gallery',
            'Typography - Learn Typography by Building a Nutrition Label',
            'Accessibility - Learn Accessibility by Building a Quiz',
            'CSS Pseudo Selectors - Learn More About CSS Pseudo Selectors by Building Balance Sheet',
            'Intermediate CSS - Learn Intermediate CSS by Building a Cat Painting',
            'Responsive Design - Learn Responsive Web Design by Building a Piano',
            'CSS Variables - Learn CSS Variables by Building a City Skyline',
            'CSS Grid - Learn CSS Grid by Building a Magazine',
            'CSS Transforms - Learn CSS Transforms by Building a Penguin',
            'CSS Animation - Learn CSS Animation by Building a Ferris Wheel'
        ]
    },
    'javascript': {
        name: 'JavaScript.info Modern JavaScript',
        url: 'https://javascript.info/',
        platform: 'documentation',
        youtubeChannel: 'https://www.youtube.com/@TraversyMedia',
        practiceSite: 'https://www.codewars.com/kata/search/javascript',
        topics: [
            'JavaScript Fundamentals - Variables, Data Types',
            'Code Quality - Debugging, Comments, Testing',
            'Objects: The Basics - Object Fundamentals',
            'Data Types - Methods of primitives, Numbers, Strings',
            'Arrays - Array Methods',
            'Iterables - Map and Set',
            'Functions - Function expressions, Arrow functions',
            'Advanced Functions - Recursion, Closures',
            'Object Properties - Property flags, Getters and setters',
            'Prototypes - Prototypal inheritance',
            'Classes - Class basic syntax, Inheritance',
            'Error Handling - Try...catch',
            'Promises - Async/await',
            'Generators - Iterators and generators',
            'Modules - Import/export'
        ]
    },
    'react': {
        name: 'React Official Documentation',
        url: 'https://react.dev/learn',
        platform: 'documentation',
        youtubeChannel: 'https://www.youtube.com/@CodevolutionReact',
        practiceSite: 'https://react-tutorial.app/',
        topics: [
            'Quick Start - Your First Component',
            'Thinking in React - Building UI',
            'Describing the UI - Components and Props',
            'Adding Interactivity - Responding to Events',
            'State Management - Managing State',
            'Escape Hatches - useEffect and Refs',
            'Advanced Hooks - useContext, useReducer',
            'Component Patterns - Composition vs Inheritance',
            'Performance - Memoization and Optimization',
            'Custom Hooks - Reusing Logic',
            'Advanced Patterns - Render Props, HOCs',
            'React Router - Navigation',
            'Form Handling - Controlled Components',
            'API Integration - Data Fetching',
            'Testing - Jest and Testing Library'
        ]
    },

    // Data Structures & Algorithms
    'data structures': {
        name: 'freeCodeCamp DSA Course',
        url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/',
        platform: 'freecodecamp',
        youtubeChannel: 'https://www.youtube.com/@freeCodeCamp',
        practiceSite: 'https://leetcode.com/problemset/',
        topics: [
            'Arrays - Basic Array Operations',
            'Strings - String Manipulation',
            'Searching - Linear and Binary Search',
            'Sorting Algorithms - Bubble, Selection, Insertion Sort',
            'Linked Lists - Singly and Doubly Linked Lists',
            'Stacks - Implementation and Applications',
            'Queues - Queue Operations and Variants',
            'Hash Tables - Hash Maps and Sets',
            'Trees - Binary Trees, BST',
            'Tree Traversal - Inorder, Preorder, Postorder',
            'Graphs - Graph Representation',
            'Graph Algorithms - BFS, DFS',
            'Dynamic Programming - Memoization and Tabulation',
            'Recursion - Recursive Problem Solving',
            'Advanced Algorithms - Greedy, Divide and Conquer'
        ]
    },
    'algorithms': {
        name: 'NeetCode Roadmap',
        url: 'https://neetcode.io/roadmap',
        platform: 'course',
        youtubeChannel: 'https://www.youtube.com/@NeetCode',
        practiceSite: 'https://leetcode.com/study-plan/',
        topics: [
            'Arrays & Hashing - Two Sum, Contains Duplicate',
            'Two Pointers - Valid Palindrome, Two Sum II',
            'Sliding Window - Best Time to Buy Stock',
            'Stack - Valid Parentheses',
            'Binary Search - Search in Rotated Array',
            'Linked List - Reverse Linked List, Merge Lists',
            'Trees - Invert Binary Tree, Max Depth',
            'Tries - Implement Trie',
            'Heap/Priority Queue - Kth Largest Element',
            'Backtracking - Combination Sum',
            'Graphs - Number of Islands, Clone Graph',
            'Advanced Graphs - Course Schedule',
            '1-D Dynamic Programming - Climbing Stairs',
            '2-D Dynamic Programming - Unique Paths',
            'Greedy - Maximum Subarray'
        ]
    },

    // Python
    'python': {
        name: 'Python Official Tutorial',
        url: 'https://docs.python.org/3/tutorial/',
        platform: 'documentation',
        youtubeChannel: 'https://www.youtube.com/@coreyms',
        practiceSite: 'https://www.hackerrank.com/domains/python',
        topics: [
            'Python Basics - Variables and Data Types',
            'Control Flow - If statements, Loops',
            'Data Structures - Lists, Tuples, Dictionaries',
            'Functions - Defining Functions',
            'Modules - Creating and Using Modules',
            'Input/Output - File Handling',
            'Errors and Exceptions - Error Handling',
            'Classes - Object-Oriented Programming',
            'Standard Library - Common Modules',
            'Virtual Environments - Package Management',
            'Iterators and Generators - Advanced Iteration',
            'Decorators - Function Decorators',
            'Context Managers - with statement',
            'Regular Expressions - Pattern Matching',
            'Testing - unittest and pytest'
        ]
    },

    // Backend
    'node.js': {
        name: 'Node.js Official Guide',
        url: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs',
        platform: 'documentation',
        youtubeChannel: 'https://www.youtube.com/@TraversyMedia',
        practiceSite: 'https://nodeschool.io/',
        topics: [
            'Introduction to Node.js - Getting Started',
            'NPM - Package Management',
            'Modules - CommonJS and ES Modules',
            'File System - Reading and Writing Files',
            'HTTP Module - Creating Servers',
            'Express.js - Web Framework Basics',
            'Routing - Express Router',
            'Middleware - Custom Middleware',
            'Database - MongoDB Integration',
            'Authentication - JWT and Sessions',
            'Error Handling - Try-Catch Patterns',
            'Async Operations - Promises and Async/Await',
            'REST APIs - Building RESTful Services',
            'Security - Best Practices',
            'Deployment - Production Setup'
        ]
    },

    // Default/Generic
    'default': {
        name: 'Generic Study Resource',
        url: null,
        platform: 'generic',
        youtubeChannel: 'https://www.youtube.com/results?search_query=programming+tutorials',
        practiceSite: 'https://www.codecademy.com/',
        topics: []
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
    if (name.match(/web|html|css|frontend|responsive/)) {
        return { ...CURATED_RESOURCES['web development'], isCustom: false };
    }
    if (name.match(/react|next|vue|angular/)) {
        return { ...CURATED_RESOURCES['react'], isCustom: false };
    }
    if (name.match(/javascript|js|ecmascript/)) {
        return { ...CURATED_RESOURCES['javascript'], isCustom: false };
    }
    if (name.match(/dsa|data structure|algorithm/)) {
        return { ...CURATED_RESOURCES['data structures'], isCustom: false };
    }
    if (name.match(/python|py/)) {
        return { ...CURATED_RESOURCES['python'], isCustom: false };
    }
    if (name.match(/node|express|backend/)) {
        return { ...CURATED_RESOURCES['node.js'], isCustom: false };
    }

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
                practice: resource.practiceSite || `https://www.google.com/search?q=${encodeURIComponent(subject + ' ' + topic.name + ' practice questions')}`
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
                practice: resource.practiceSite || `https://www.google.com/search?q=${encodeURIComponent(subject + ' ' + topic.name + ' practice exercises')}`
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
                practice: resource.practiceSite || `https://www.google.com/search?q=${encodeURIComponent(subject + ' ' + topic.name + ' problems')}`
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
                practice: resource.practiceSite || `https://www.google.com/search?q=${encodeURIComponent(subject + ' mock test practice')}`
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
