import React from 'react';

export function GuideView() {
  return (
    <div className="prose prose-neutral mx-auto max-w-3xl dark:prose-invert">
      <h1 className="mb-8 text-3xl font-bold">Guide</h1>

      <section className="mb-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <span>🧭</span> Getting Started
        </h2>
        <p className="mt-4 text-lg">
          Welcome to <strong>Jobzy</strong>! This guide will help you understand how to use the
          application effectively to manage your job search.
        </p>
      </section>

      <hr className="my-8" />

      <section className="mb-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <span>🗂️</span> Board Layout
        </h2>
        <p className="mt-4">
          The board is organized into columns representing different stages of your job
          application process:
        </p>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center gap-2">
            <span>📋</span>
            <strong>Job List</strong> – New opportunities you're interested in
          </li>
          <li className="flex items-center gap-2">
            <span>🤝</span>
            <strong>Waiting for Referral</strong> – Jobs where you're seeking referrals
          </li>
          <li className="flex items-center gap-2">
            <span>📤</span>
            <strong>Applied</strong> – Applications you've submitted
          </li>
          <li className="flex items-center gap-2">
            <span>📝</span>
            <strong>Online Assessment</strong> – Pending technical assessments
          </li>
          <li className="flex items-center gap-2">
            <span>🎤</span>
            <strong>Interview</strong> – Scheduled interviews
          </li>
          <li className="flex items-center gap-2">
            <span>🏆</span>
            <strong>Offer</strong> – Received job offers
          </li>
          <li className="flex items-center gap-2">
            <span>❌</span>
            <strong>Rejected</strong> – Closed opportunities
          </li>
        </ul>
      </section>

      <hr className="my-8" />

      <section className="mb-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <span>🧰</span> Managing Jobs
        </h2>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center gap-2">
            Click <strong>"Add New Job"</strong> to create a job card
          </li>
          <li className="flex items-center gap-2">
            <strong>Drag and drop</strong> cards between columns to update their status
          </li>
          <li className="flex items-center gap-2">
            <strong>Pin important jobs</strong> to keep them at the top (max 3 per column)
          </li>
          <li className="flex items-center gap-2">
            Use <strong>tags</strong> to categorize and filter your applications
          </li>
        </ul>
      </section>

      <hr className="my-8" />

      <section className="mb-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <span>🏷️</span> Tags
        </h2>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center gap-2">
            <span>🔥</span>
            <strong>Urgent</strong> – High priority applications
          </li>
          <li className="flex items-center gap-2">
            <span>🏠</span>
            <strong>Remote</strong> – Remote positions
          </li>
          <li className="flex items-center gap-2">
            <span>⭐</span>
            <strong>Dream Job</strong> – Your most desired roles
          </li>
          <li className="flex items-center gap-2">
            <span>⏳</span>
            <strong>Follow Up</strong> – Needs follow-up action
          </li>
          <li className="flex items-center gap-2">
            <span>🤝</span>
            <strong>Referred</strong> – Applications with internal referrals
          </li>
        </ul>
      </section>
    </div>
  );
}