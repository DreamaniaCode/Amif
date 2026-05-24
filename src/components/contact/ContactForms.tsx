'use client';

import { useState } from 'react';
import type { Dictionary, Locale } from '@/types';

interface ContactFormsProps {
  dict: Dictionary;
  locale: Locale;
}

type FormType = 'contact' | 'membership' | 'partnership';

export function ContactForms({ dict, locale }: ContactFormsProps) {
  const [activeForm, setActiveForm] = useState<FormType>('contact');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const d = dict.contact;

  const tabs: { key: FormType; label: string }[] = [
    { key: 'contact', label: d.formContact },
    { key: 'membership', label: d.formMembership },
    { key: 'partnership', label: d.formPartnership },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const endpoint = activeForm === 'contact'
        ? '/api/contact'
        : activeForm === 'membership'
        ? '/api/membership'
        : '/api/partnership';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Forms Switcher Tabs */}
      <div className="flex bg-light p-1.5 rounded-2xl border border-border-custom gap-1">
        {tabs.map((tab) => {
          const active = activeForm === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              className={`flex-1 py-3 px-2 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
                active 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-medium hover:text-dark hover:bg-white/50'
              }`}
              onClick={() => { setActiveForm(tab.key); setStatus('idle'); }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Submission Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>

        {/* Contact Form */}
        {activeForm === 'contact' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wide">{d.name} *</label>
                <input 
                  name="name" 
                  required 
                  className="w-full px-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                  placeholder={d.name} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wide">{d.email} *</label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  className="w-full px-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                  placeholder={d.email} 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-dark uppercase tracking-wide">{d.phone}</label>
              <input 
                name="phone" 
                type="tel" 
                className="w-full px-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                placeholder="+212 6XX XXX XXX" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-dark uppercase tracking-wide">{d.subject} *</label>
              <input 
                name="subject" 
                required 
                className="w-full px-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                placeholder={d.subject} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-dark uppercase tracking-wide">{d.message} *</label>
              <textarea 
                name="message" 
                required 
                className="w-full px-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-y min-h-[120px]" 
                placeholder={d.message} 
                rows={5} 
              />
            </div>
          </div>
        )}

        {/* Membership Form */}
        {activeForm === 'membership' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wide">{d.name} *</label>
                <input 
                  name="name" 
                  required 
                  className="w-full px-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                  placeholder={d.name} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wide">{d.email} *</label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  className="w-full px-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                  placeholder={d.email} 
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wide">{d.phone}</label>
                <input 
                  name="phone" 
                  type="tel" 
                  className="w-full px-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                  placeholder="+212 6XX XXX XXX" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wide">{d.city}</label>
                <input 
                  name="city" 
                  className="w-full px-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                  placeholder={d.city} 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-dark uppercase tracking-wide">{d.profession}</label>
              <input 
                name="profession" 
                className="w-full px-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                placeholder={d.profession} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-dark uppercase tracking-wide">{d.motivation}</label>
              <textarea 
                name="motivation" 
                className="w-full px-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-y min-h-[100px]" 
                placeholder={d.motivation} 
                rows={4} 
              />
            </div>
          </div>
        )}

        {/* Partnership Form */}
        {activeForm === 'partnership' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wide">{d.orgName} *</label>
                <input 
                  name="orgName" 
                  required 
                  className="w-full px-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                  placeholder={d.orgName} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wide">{d.contactPerson} *</label>
                <input 
                  name="contactPerson" 
                  required 
                  className="w-full px-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                  placeholder={d.contactPerson} 
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wide">{d.email} *</label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  className="w-full px-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                  placeholder={d.email} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wide">{d.phone}</label>
                <input 
                  name="phone" 
                  type="tel" 
                  className="w-full px-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                  placeholder="+212 6XX XXX XXX" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-dark uppercase tracking-wide">{d.partnershipType}</label>
              <input 
                name="partnershipType" 
                className="w-full px-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                placeholder={d.partnershipType} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-dark uppercase tracking-wide">{d.message}</label>
              <textarea 
                name="message" 
                className="w-full px-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-y min-h-[100px]" 
                placeholder={d.message} 
                rows={4} 
              />
            </div>
          </div>
        )}

        {/* Success/Error Alerts */}
        {status === 'success' && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold">
            {d.success}
          </div>
        )}
        {status === 'error' && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm font-semibold">
            {d.error}
          </div>
        )}

        {/* Submit button with loader */}
        <button
          type="submit"
          className="w-full flex items-center justify-center py-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-55 disabled:cursor-not-allowed hover:-translate-y-0.5"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            d.send
          )}
        </button>
      </form>
    </div>
  );
}
