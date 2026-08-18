"use client";
import React, { useState } from 'react';
import Reveal from "@/components/Reveal";

const AccordionItem = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button className={`accordion ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      <div className="panel" style={{ maxHeight: isOpen ? '1000px' : '0' }}>
        {children}
      </div>
    </div>
  );
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };
    // Cache feedback in localStorage
    const existing = JSON.parse(localStorage.getItem('fd_feedbacks') || '[]');
    existing.push({ ...data, date: new Date().toISOString() });
    localStorage.setItem('fd_feedbacks', JSON.stringify(existing));
    setSubmitted(true);
    form.reset();
  };


  return (
    <main className="animate-fade-in">
      <p className="heading animate-fade-in" style={{ margin: '20px' }}>Contact us</p>

      <div className="contact-form-container delay-1">
        <div className="contact-form">
          {submitted ? (
            <p style={{ color: '#06C167', fontSize: '18px', textAlign: 'center', padding: '20px' }}>
              ✓ Message sent! We&apos;ll get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleFeedback}>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required></textarea>
              <input type="submit" value="Send" name="send" />
            </form>
          )}
        </div>


      </div>

      <Reveal className="help" style={{ padding: '30px' }}>
        <p style={{ fontSize: '23px', textAlign: 'center', padding: '20px' }}>Help & FAQs?</p>
        <AccordionItem title="How to donate food?">
          <p>1) Click on &quot;Donate Food&quot; on the home page</p>
          <p>2) Fill in your food and contact details</p>
          <p>3) Click Submit — a delivery person will be assigned to collect it</p>
          <img src="/img/mobile.jpg" alt="mobile demo" width="100%" style={{ marginTop: '10px', borderRadius: '10px' }} />
        </AccordionItem>
        <AccordionItem title="How will my donation be used?">
          <p>Your donation will be distributed to nearby charities and NGOs through our admin network. Every donation is tracked to ensure it reaches those in need.</p>
        </AccordionItem>
        <AccordionItem title="What types of food can I donate?">
          <p>You can donate raw, cooked, and packed food. Please ensure cooked food is fresh and packed food is unexpired and properly sealed.</p>
        </AccordionItem>
        <AccordionItem title="What should I do if my food donation is near or past its expiration date?">
          <p>We appreciate your willingness to donate, but to ensure the safety of our clients we can&apos;t accept food that is near or past its expiration date. Please contact us for further guidance.</p>
        </AccordionItem>
      </Reveal>
    </main>
  );
}
