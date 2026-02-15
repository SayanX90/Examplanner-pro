'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, BookOpen, Calendar, Search } from 'lucide-react';

export default function CustomDropdown({ options, value, onChange, placeholder = "Select an option", icon: Icon }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 border ${isOpen ? 'border-blue-500/50 ring-2 ring-blue-500/20' : 'border-slate-700'
                    } rounded-xl text-left transition-all hover:bg-slate-800/80 group`}
            >
                <div className="flex items-center gap-3 overflow-hidden">
                    {Icon && (
                        <Icon size={18} className={`flex-shrink-0 ${isOpen ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-400'}`} />
                    )}
                    <span className={`truncate ${selectedOption ? 'text-white' : 'text-slate-400'}`}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                </div>
                <ChevronDown size={18} className={`text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {/* Search Input (Optional, good for long lists) */}
                    {options.length > 5 && (
                        <div className="p-2 border-b border-slate-700">
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 pr-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                                    autoFocus
                                />
                            </div>
                        </div>
                    )}

                    {/* Options List */}
                    <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                        setSearchTerm('');
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${option.value === value
                                        ? 'bg-blue-600/20 text-blue-400 font-medium'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 truncate">
                                        {/* Optional option icon or just text */}
                                        <span className="truncate">{option.label}</span>
                                        {option.subLabel && (
                                            <span className="text-xs text-slate-500 ml-1">({option.subLabel})</span>
                                        )}
                                    </div>
                                    {option.value === value && <Check size={14} />}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-slate-500 text-center">
                                No options found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
