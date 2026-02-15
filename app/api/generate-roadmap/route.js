import { NextResponse } from 'next/server';

// ========================================
// ENHANCED SUBJECT DETECTION SYSTEM
// ========================================
function detectSubjectCategory(subjectName) {
    const name = subjectName.toLowerCase();

    // Competitive Exams
    if (name.match(/jee|neet|upsc|cat|gate|clat|aiims|ca|cma|cs|banking|ssc|railway|iit|nda/)) {
        return 'competitive';
    }

    // Coding/Technical
    if (name.match(/coding|programming|development|web|app|software|javascript|python|java|react|node|data science|machine learning|ai|artificial intelligence|backend|frontend|full stack|algorithm|dsa/)) {
        return 'technical';
    }

    // Professional Courses
    if (name.match(/mba|law|pharmacy|medical|engineering|architecture|ca|cma|chartered|llb|bba|bca|mca/)) {
        return 'professional';
    }

    // Sciences
    if (name.match(/physics|chemistry|biology|zoology|botany|microbiology|biotechnology/)) {
        return 'science';
    }

    // Mathematics
    if (name.match(/math|calculus|algebra|geometry|trigonometry|statistics|probability/)) {
        return 'math';
    }

    // Humanities
    if (name.match(/history|geography|economics|political|sociology|psychology|philosophy/)) {
        return 'humanities';
    }

    // Languages
    if (name.match(/english|hindi|sanskrit|french|german|spanish|language|literature/)) {
        return 'language';
    }

    return 'general';
}

// ========================================
// RESOURCE RECOMMENDATION DATABASE
// ========================================
const bookRecommendations = {
    // Sciences
    'physics': [
        'Concepts of Physics - H.C. Verma',
        'Fundamentals of Physics - Halliday, Resnick & Walker',
        'NCERT Physics (Class 11 & 12)',
        'Understanding Physics - D.C. Pandey'
    ],
    'chemistry': [
        'Physical Chemistry - O.P. Tandon',
        'Organic Chemistry - Morrison & Boyd',
        'NCERT Chemistry (Class 11 & 12)',
        'Modern Approach to Chemical Calculations - R.C. Mukherjee'
    ],
    'biology': [
        'Biology - Campbell & Reece',
        'NCERT Biology (Class 11 & 12)',
        'Trueman\'s Elementary Biology',
        'Biology - Pradeep\'s Fundamental Physics'
    ],

    // Mathematics
    'math': [
        'RD Sharma Mathematics',
        'NCERT Mathematics',
        'Higher Algebra - Hall & Knight',
        'Objective Mathematics - R.D. Sharma'
    ],

    // Technical/Coding
    'technical': [
        'Official Documentation',
        'FreeCodeCamp Curriculum',
        'The Odin Project',
        'MDN Web Docs',
        'Eloquent JavaScript - Marijn Haverbeke'
    ],

    // Professional
    'mba': [
        'Harvard Business Review Cases',
        'Principles of Management - Koontz & Weihrich',
        'Marketing Management - Philip Kotler',
        'Financial Management - I.M. Pandey'
    ],
    'law': [
        'Bare Acts and Legal Codes',
        'Introduction to the Constitution - D.D. Basu',
        'Jurisprudence - Paton',
        'Contract Law - Pollock & Mulla'
    ],
    'pharmacy': [
        'Remington: The Science and Practice of Pharmacy',
        'Goodman & Gilman\'s Pharmacological Basis',
        'Indian Pharmacopoeia',
        'Pharmaceutical Chemistry - Chatwal'
    ],

    // Competitive Exams
    'jee': [
        'Physics - H.C. Verma',
        'Chemistry - O.P. Tandon',
        'Mathematics - R.D. Sharma',
        'Previous Year JEE Papers'
    ],
    'neet': [
        'NCERT Biology (11 & 12)',
        'Physics - H.C. Verma',
        'Chemistry - O.P. Tandon',
        'Previous Year NEET Papers'
    ],
    'upsc': [
        'NCERT (6-12 standard)',
        'Indian Polity - M. Laxmikanth',
        'India\'s Struggle for Independence - Bipan Chandra',
        'Geography - G.C. Leong'
    ]
};

// ========================================
// SMART TOPIC GENERATOR
// ========================================
function generateSmartTopics(subjectName, category, weekNumber, phase) {
    const topics = [];

    // Generate dynamic topics based on category and phase
    if (category === 'technical') {
        if (phase === 'foundation') {
            topics.push(
                { name: 'Setup Development Environment', chapter: 'Getting Started', description: 'Install required tools and configure workspace', difficulty: 'Easy', time: '2-3 hours' },
                { name: 'Basic Syntax and Structure', chapter: 'Fundamentals', description: 'Learn core language syntax and basic constructs', difficulty: 'Easy', time: '3-4 hours' },
                { name: 'Variables and Data Types', chapter: 'Core Concepts', description: 'Understand data types and variable declarations', difficulty: 'Easy', time: '2-3 hours' }
            );
        } else if (phase === 'core') {
            topics.push(
                { name: 'Functions and Scope', chapter: 'Intermediate Topics', description: 'Master function declarations and scope chain', difficulty: 'Medium', time: '4-5 hours' },
                { name: 'Object-Oriented Programming', chapter: 'OOP Fundamentals', description: 'Learn classes, objects, and inheritance', difficulty: 'Medium', time: '5-6 hours' },
                { name: 'Asynchronous Programming', chapter: 'Advanced Topics', description: 'Master async/await and promises', difficulty: 'Hard', time: '6-7 hours' }
            );
        } else if (phase === 'practice') {
            topics.push(
                { name: 'Build Mini Project', chapter: 'Hands-on Practice', description: 'Create a functional application from scratch', difficulty: 'Medium', time: '8-10 hours' },
                { name: 'Solve DSA Problems', chapter: 'Problem Solving', description: 'Practice data structures and algorithms', difficulty: 'Hard', time: '5-6 hours' },
                { name: 'Code Review and Refactoring', chapter: 'Best Practices', description: 'Improve code quality and organization', difficulty: 'Medium', time: '3-4 hours' }
            );
        } else {
            topics.push(
                { name: 'System Design Basics', chapter: 'Architecture', description: 'Learn scalable system design patterns', difficulty: 'Hard', time: '4-5 hours' },
                { name: 'Mock Interview Prep', chapter: 'Interview Preparation', description: 'Practice technical interview questions', difficulty: 'Hard', time: '6-8 hours' },
                { name: 'Portfolio Project Polish', chapter: 'Final Touches', description: 'Complete and document portfolio projects', difficulty: 'Medium', time: '5-6 hours' }
            );
        }
    } else if (category === 'science' || category === 'math') {
        const chapterNum = weekNumber;
        if (phase === 'foundation') {
            topics.push(
                { name: `Chapter ${chapterNum}: Basic Definitions`, chapter: `Chapter ${chapterNum}`, difficulty: 'Easy', time: '2-3 hours' },
                { name: `Fundamental Theorems and Laws`, chapter: `Chapter ${chapterNum}`, difficulty: 'Easy', time: '3-4 hours' },
                { name: `Solved Examples Study`, chapter: `Chapter ${chapterNum}`, difficulty: 'Easy', time: '2-3 hours' }
            );
        } else if (phase === 'core') {
            topics.push(
                { name: `Chapter ${chapterNum}: Theory Deep Dive`, chapter: `Chapter ${chapterNum}`, difficulty: 'Medium', time: '4-5 hours' },
                { name: `Derivations and Proofs`, chapter: `Chapter ${chapterNum}`, difficulty: 'Medium', time: '3-4 hours' },
                { name: `Numerical Problem Solving`, chapter: `Chapter ${chapterNum}`, difficulty: 'Medium', time: '5-6 hours' }
            );
        } else if (phase === 'practice') {
            topics.push(
                { name: `Practice Problem Set ${chapterNum}`, chapter: 'Practice', difficulty: 'Hard', time: '4-5 hours' },
                { name: `Previous Year Questions`, chapter: 'PYQ Practice', difficulty: 'Hard', time: '5-6 hours' },
                { name: `Mock Test ${weekNumber}`, chapter: 'Assessment', difficulty: 'Medium', time: '3 hours' }
            );
        } else {
            topics.push(
                { name: `Comprehensive Revision`, chapter: 'All Chapters', difficulty: 'Medium', time: '6-8 hours' },
                { name: `Formula Sheet Preparation`, chapter: 'Quick Reference', difficulty: 'Easy', time: '2-3 hours' },
                { name: `Final Mock Test`, chapter: 'Assessment', difficulty: 'Hard', time: '3 hours' }
            );
        }
    } else if (category === 'competitive') {
        if (phase === 'foundation') {
            topics.push(
                { name: 'Syllabus Analysis', chapter: 'Exam Pattern', difficulty: 'Easy', time: '2 hours' },
                { name: 'Basic Concepts Building', chapter: 'Fundamentals', difficulty: 'Easy', time: '4-5 hours' },
                { name: 'Standard Reference Study', chapter: 'Core Topics', difficulty: 'Easy', time: '3-4 hours' }
            );
        } else if (phase === 'core') {
            topics.push(
                { name: 'High-Weightage Topics', chapter: 'Important Concepts', difficulty: 'Medium', time: '5-6 hours' },
                { name: 'Previous Year Analysis', chapter: 'PYQ Study', difficulty: 'Medium', time: '4-5 hours' },
                { name: 'Speed and Accuracy Practice', chapter: 'Skill Development', difficulty: 'Medium', time: '3-4 hours' }
            );
        } else if (phase === 'practice') {
            topics.push(
                { name: 'Full-Length Mock Tests', chapter: 'Mock Series', difficulty: 'Hard', time: '3 hours' },
                { name: 'Weak Area Focus Practice', chapter: 'Targeted Practice', difficulty: 'Hard', time: '5-6 hours' },
                { name: 'Time Management Drills', chapter: 'Strategy', difficulty: 'Medium', time: '2-3 hours' }
            );
        } else {
            topics.push(
                { name: 'Rapid Revision Sessions', chapter: 'All Topics', difficulty: 'Medium', time: '4-6 hours' },
                { name: 'Last 10 Years PYQs', chapter: 'PYQ Marathon', difficulty: 'Hard', time: '6-8 hours' },
                { name: 'Exam Strategy Planning', chapter: 'Final Prep', difficulty: 'Easy', time: '2 hours' }
            );
        }
    } else {
        // General subjects
        if (phase === 'foundation') {
            topics.push(
                { name: 'Introduction and Overview', chapter: `Topic ${weekNumber}`, difficulty: 'Easy', time: '2-3 hours' },
                { name: 'Core Concepts', chapter: `Topic ${weekNumber}`, difficulty: 'Easy', time: '3-4 hours' },
                { name: 'Initial Practice', chapter: `Topic ${weekNumber}`, difficulty: 'Easy', time: '2 hours' }
            );
        } else if (phase === 'core') {
            topics.push(
                { name: 'Advanced Understanding', chapter: `Topic ${weekNumber}`, difficulty: 'Medium', time: '4-5 hours' },
                { name: 'Detailed Study', chapter: `Topic ${weekNumber}`, difficulty: 'Medium', time: '4-5 hours' },
                { name: 'Application Practice', chapter: `Topic ${weekNumber}`, difficulty: 'Medium', time: '3-4 hours' }
            );
        } else if (phase === 'practice') {
            topics.push(
                { name: 'Practice Questions', chapter: 'Practice Set', difficulty: 'Medium', time: '4-5 hours' },
                { name: 'Case Studies', chapter: 'Applications', difficulty: 'Hard', time: '5-6 hours' },
                { name: 'Self-Assessment', chapter: 'Evaluation', difficulty: 'Medium', time: '3 hours' }
            );
        } else {
            topics.push(
                { name: 'Complete Revision', chapter: 'All Topics', difficulty: 'Medium', time: '6-8 hours' },
                { name: 'Practice Test', chapter: 'Assessment', difficulty: 'Hard', time: '3 hours' },
                { name: 'Weak Points Review', chapter: 'Focused Study', difficulty: 'Medium', time: '4-5 hours' }
            );
        }
    }

    return topics;
}

// ========================================
// DYNAMIC LINK GENERATOR
// ========================================
function generateResourceLinks(subject, topic) {
    const searchQuery = `${subject} ${topic}`;

    return {
        google: `https://www.google.com/search?q=${encodeURIComponent(searchQuery + ' PDF notes')}`,
        youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery + ' explained')}`,
        practice: `https://www.google.com/search?q=${encodeURIComponent(searchQuery + ' practice questions')}`
    };
}

// ========================================
// ENHANCED ROADMAP GENERATOR
// ========================================
function generateEnhancedRoadmap(subject, examDate, difficulty) {
    const today = new Date();
    const exam = new Date(examDate);
    const diffTime = Math.abs(exam - today);
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let totalWeeks = Math.ceil(daysRemaining / 7);
    if (totalWeeks < 4) totalWeeks = 4;

    const category = detectSubjectCategory(subject);

    // Get book recommendations
    let recommendedBooks = bookRecommendations['general'] || ['Standard textbooks and online resources'];
    for (const key in bookRecommendations) {
        if (subject.toLowerCase().includes(key)) {
            recommendedBooks = bookRecommendations[key];
            break;
        }
    }
    if (category in bookRecommendations && recommendedBooks[0] === 'Standard textbooks and online resources') {
        recommendedBooks = bookRecommendations[category];
    }

    const weeks = [];

    // Phase distribution
    const foundationWeeks = Math.max(1, Math.floor(totalWeeks * 0.30));
    const coreWeeks = Math.max(1, Math.floor(totalWeeks * 0.35));
    const practiceWeeks = Math.max(1, Math.floor(totalWeeks * 0.20));
    const revisionWeeks = Math.max(1, totalWeeks - foundationWeeks - coreWeeks - practiceWeeks);

    let weekNumber = 1;

    // Foundation Phase
    for (let i = 0; i < foundationWeeks; i++) {
        const topics = generateSmartTopics(subject, category, weekNumber, 'foundation');
        const tasks = topics.map(topic => {
            const links = generateResourceLinks(subject, topic.name);
            return {
                title: topic.name,
                description: `Study ${topic.chapter} from recommended book`,
                book: recommendedBooks[Math.min(i, recommendedBooks.length - 1)],
                links: links,
                time: topic.time,
                difficulty: topic.difficulty
            };
        });

        weeks.push({
            title: `Week ${weekNumber} - Foundation Building`,
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
        const topics = generateSmartTopics(subject, category, weekNumber, 'core');
        const tasks = topics.map(topic => {
            const links = generateResourceLinks(subject, topic.name);
            return {
                title: topic.name,
                description: `Master ${topic.chapter} concepts`,
                book: recommendedBooks[Math.min(i % recommendedBooks.length, recommendedBooks.length - 1)],
                links: links,
                time: topic.time,
                difficulty: topic.difficulty
            };
        });

        weeks.push({
            title: `Week ${weekNumber} - Core Concepts`,
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
        const topics = generateSmartTopics(subject, category, weekNumber, 'practice');
        const tasks = topics.map(topic => {
            const links = generateResourceLinks(subject, topic.name);
            return {
                title: topic.name,
                description: `Intensive practice on ${topic.chapter}`,
                book: recommendedBooks[0],
                links: links,
                time: topic.time,
                difficulty: topic.difficulty
            };
        });

        weeks.push({
            title: `Week ${weekNumber} - Practice & Application`,
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
        const topics = generateSmartTopics(subject, category, weekNumber, 'revision');
        const tasks = topics.map(topic => {
            const links = generateResourceLinks(subject, topic.name);
            return {
                title: topic.name,
                description: `${topic.chapter} comprehensive review`,
                book: 'All recommended books',
                links: links,
                time: topic.time,
                difficulty: topic.difficulty
            };
        });

        weeks.push({
            title: `Week ${weekNumber} - ${isLastWeek ? 'Final Revision & Mock Tests' : 'Revision'}`,
            tasks: tasks,
            suggestions: isLastWeek ? [
                'Stay calm and confident',
                'Review formula sheets and notes',
                'Get adequate rest before exam'
            ] : [
                'Identify and strengthen weak areas',
                'Quick revision of all topics',
                'Solve previous year papers'
            ]
        });
        weekNumber++;
    }

    const tips = [
        `📚 Recommended Books: ${recommendedBooks.slice(0, 3).join(', ')}`,
        `📊 Category: ${category.charAt(0).toUpperCase() + category.slice(1)}`,
        `⏰ Total Study Plan: ${totalWeeks} weeks`,
        `🎯 Focus Level: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`
    ];

    return { weeks, tips, category, recommendedBooks };
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

        const { weeks, tips, category, recommendedBooks } = generateEnhancedRoadmap(
            subject.name,
            subject.examDate,
            subject.difficulty || 'medium'
        );

        return NextResponse.json({
            roadmap: weeks,
            tips: tips,
            subjectInfo: {
                id: subject.id,
                name: subject.name,
                examDate: subject.examDate,
                difficulty: subject.difficulty,
                category: category,
                recommendedBooks: recommendedBooks
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
