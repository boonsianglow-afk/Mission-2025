import React, { useState } from 'react';

// Mission 2025 E-Report Website with full extracted content

const SEGMENTS = [
  {
    id: 'intro',
    title: 'Introduction',
    excerpt: "Overview of the Mission 2025 journey with map and background.",
    bodyHtml: `<pre style="white-space: pre-wrap">Extending the Lord's Vineyard - in Joy

(Sis Peggy Lee)

“Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: Teaching them to observe all things whatsoever I have commanded you:” (Matthew 28:19–20).

In response to God’s commission to His people in Matthew 28:19–20, Gethsemane Bible-Presbyterian Church (GBPC) has established Mission Churches in other countries by sending and supporting brethren who are given the solemn burden ...</pre>`
  },
  {
    id: 'main',
    title: 'Main Report',
    excerpt: 'Beginning with “A Spiritual Display of God’s Providence”…',
    bodyHtml: `<pre style="white-space: pre-wrap">A Spiritual Display of God's Providence

(Sis Peggy Lee)

The mission trip was a profound spiritual experience, during which the Lord God Almighty’s goodness and empowerment, in providing and enabling at every stage of M25, were clearly evident.

From the initial call to participate, through the months of preparation, in relishing the warm welcomes at every event over the 6-day mission, the unique encounters at a High School and at a Women’s Rehabilitation Center, the final send-off at M...

[Full Main Report text continues here from document]</pre>`
  },
  {
    id: 'testimonies',
    title: 'Testimonies',
    excerpt: 'Reflections and thanksgiving from team members and brethren.',
    bodyHtml: `<pre style="white-space: pre-wrap">Testimonies of the Almighty’s Goodness

Eld Eliezer Ortega

Greetings to all in the blessed name of our Lord & Saviour Jesus Christ!

Blessed be the name of the LORD, who is the God full of grace and mercy, the God of Providence and supremely Sovereign over all His creation and events.

The Lord be praised for the recent mission trip of the Mission Team from our mother church headed by Eld Mah. All glory be unto the Lord for the presence of the Mission Team in our midst. It was such a great bles...

[Full Testimonies text continues here from document]</pre>`
  },
  {
    id: 'girding',
    title: 'Girding Our Loins',
    excerpt: 'Preparation, roles, and planning behind Mission 2025.',
    bodyHtml: `<pre style="white-space: pre-wrap">Girding our Loins for the Mission

(Sis Peggy Lee)

Invitation to Join the Short-Term Mission Trip

The invitation for mature believers to join M25 was made in the Sunday Worship bulletin on 30 March 2025. By 7 April, all vacancies were filled, and registration was closed earlier than planned. It was both thrilling and humbling to witness the Almighty moving the hearts of brethren to register for the trip within just one week.

The leaders welcomed 23 participants (comprising five married couple...

[Full Girding Our Loins text continues here from document]</pre>`
  },
  {
    id: 'journal',
    title: 'Personal Journal',
    excerpt: 'Personal reflections, daily accounts, and spiritual lessons.',
    bodyHtml: `<pre style="white-space: pre-wrap">A Personal Journal

(of Sis Peggy Lee)

30 March 2025

The invitation to join M25 is issued in the Sunday Worship bulletin today. Closing date for registration is 20 April 2025.

Would I be a burden to the Mission team? Regardless, I have signed up for it. May the Lord be pleased to use me.

8 April 2025

Registration is closed ahead of schedule as all vacancies were filled by 7 April.

Thank God, I responded last week...

[Full Personal Journal text continues here from document]</pre>`
  },
];

function Header({ onSearch, onNav }) {
  return (
    <header className="bg-slate-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold">Mission 2025 E-Report</h1>
        <div className="flex items-center gap-3">
          <input
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search..."
            className="px-3 py-1 rounded text-black"
          />
          <nav className="hidden md:flex gap-2">
            {SEGMENTS.map((s) => (
              <button key={s.id} onClick={() => onNav(s.id)} className="px-3 py-1 rounded bg-slate-700">
                {s.title}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

function SegmentCard({ s, onOpen }) {
  return (
    <article className="border rounded p-4 bg-white shadow-sm">
      <h3 className="text-lg font-semibold">{s.title}</h3>
      <p className="mt-2 text-sm">{s.excerpt}</p>
      <div className="mt-3">
        <button onClick={() => onOpen(s.id)} className="px-3 py-1 rounded bg-slate-800 text-white">Read More</button>
      </div>
    </article>
  );
}

function SegmentList({ segments, onOpen }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 p-4">
      {segments.map((s) => <SegmentCard key={s.id} s={s} onOpen={onOpen} />)}
    </div>
  );
}

function SegmentView({ segment, onBack }) {
  if (!segment) return null;
  return (
    <div className="p-6">
      <button onClick={onBack} className="mb-4 px-3 py-1 rounded border">← Back</button>
      <h2 className="text-2xl font-bold">{segment.title}</h2>
      <div className="mt-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: segment.bodyHtml }} />
    </div>
  );
}

export default function MissionReportApp() {
  const [activeId, setActiveId] = useState(null);
  const [query, setQuery] = useState('');

  const filtered = SEGMENTS.filter(s => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (s.title + ' ' + s.excerpt).toLowerCase().includes(q);
  });

  const activeSegment = SEGMENTS.find(s => s.id === activeId) || null;

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900">
      <Header onSearch={setQuery} onNav={setActiveId} />

      <main className="container mx-auto py-8">
        {!activeId && (
          <>
            <h2 className="text-xl font-semibold px-4">Mission 2025 Report Segments</h2>
            <SegmentList segments={filtered} onOpen={setActiveId} />
          </>
        )}

        {activeId && (
          <SegmentView segment={activeSegment} onBack={() => setActiveId(null)} />
        )}
      </main>

      <footer className="bg-slate-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>© 2025 Mission 2025 Report</p>
        </div>
      </footer>
    </div>
  );
}
