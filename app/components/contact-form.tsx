'use client';

import React, { useState } from 'react';

// Define the shape of the form data
interface FormData {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(result.message || 'Message sent successfully! I will be in touch soon.');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        setStatus('error');
        setMessage(result.message || 'Failed to send message. Please check your inputs.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setMessage('A network error occurred. Please try again.');
    }
  };

  const getStatusMessage = () => {
    if (status === 'loading') return 'Sending...';
    if (status === 'success') return message;
    if (status === 'error') return message;
    return '';
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      
      {/* Form Status Message */}
      {status !== 'idle' && (
        <div 
          className={`p-4 mb-6 rounded-lg font-medium transition-opacity ${
            status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            status === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
            'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200'
          }`}
        >
          {getStatusMessage()}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:opacity-70"
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:opacity-70"
          />
        </div>

        {/* Message Textarea */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-blue-500 focus:border-blue-500 transition-shadow resize-none disabled:opacity-70"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:bg-blue-400 dark:disabled:bg-blue-800"
        >
          {status === 'loading' ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
}