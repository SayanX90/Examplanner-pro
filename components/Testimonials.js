'use client';

import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Aditi Sharma',
        role: 'IIT Aspirant',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
        rating: 5,
        text: 'The AI roadmap feature is a game changer for my JEE preparation. It broke down the vast syllabus into manageable weekly targets.',
        gradient: 'from-orange-500 to-red-500'
    },
    {
        name: 'Rahul Verma',
        role: 'Engineering Student',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
        rating: 5,
        text: 'Managing assignments and exams was a nightmare until I found this. The analytics dashboard helps me track my weak areas instantly.',
        gradient: 'from-blue-500 to-indigo-500'
    },
    {
        name: 'Priya Mehta',
        role: 'Medical Student',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150',
        rating: 5,
        text: 'With so many subjects to cover, I often felt lost. This planner keeps me disciplined and the exam countdown creates a healthy urgency.',
        gradient: 'from-teal-500 to-emerald-500'
    },
    {
        name: 'Arjun Rao',
        role: 'UPSC Aspirant',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
        rating: 5,
        text: 'The consistency heatmap is my favorite feature. It motivates me to study every single day. Highly recommended for serious aspirants.',
        gradient: 'from-purple-500 to-pink-500'
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 relative dark:bg-black overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                        Trusted by Top Students
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Join thousands of students achieving their academic goals with our smart planner.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="group relative h-full"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                            <div className="relative h-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 transition-transform duration-300 group-hover:-translate-y-1 shadow-sm">
                                <Quote className="w-10 h-10 text-gray-200 dark:text-gray-700 absolute top-8 right-8" />

                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`p-[2px] rounded-full bg-gradient-to-r ${testimonial.gradient}`}>
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-14 h-14 rounded-full object-cover border-4 border-white dark:border-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                    "{testimonial.text}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
