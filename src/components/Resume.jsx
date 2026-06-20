import JobTile from './JobTile'

// Parse a date range string like 'Jun – Aug 2024' or '2021 – 2025'
// and return the number of months duration.
const MONTH_MAP = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
}

function parseDurationMonths(dateStr) {
  const parts = dateStr.split(/[–-]/).map((s) => s.trim())
  if (parts.length < 2) return 12 // fallback

  const startStr = parts[0].toLowerCase()
  const endStr   = parts[parts.length - 1].toLowerCase()

  // Year-only range e.g. '2021 – 2025'
  if (/^\d{4}$/.test(startStr) && /^\d{4}$/.test(endStr)) {
    return (parseInt(endStr) - parseInt(startStr)) * 12
  }

  // Month Year range e.g. 'Jun 2024', 'Aug 2024'
  const parseMonthYear = (s) => {
    const tokens = s.split(/\s+/)
    const monthKey = tokens[0].slice(0, 3)
    const year = parseInt(tokens[tokens.length - 1])
    return { m: MONTH_MAP[monthKey] ?? 0, y: isNaN(year) ? 0 : year }
  }

  const start = parseMonthYear(startStr)
  const end   = parseMonthYear(endStr)
  return (end.y - start.y) * 12 + (end.m - start.m)
}

const EXPERIENCE = [
  {
    title: 'Backend Engineer Intern',
    company: 'Tech Corp Inc.',
    date: 'Jun – Aug 2024',
    description:
      'Developed RESTful APIs in Node.js and Express, improving response time by 40%. Collaborated with the DevOps team to containerize services using Docker and deploy to AWS ECS.',
  },
  {
    title: 'Software Developer Co-op',
    company: 'Innovatech Solutions',
    date: 'Jan – Apr 2024',
    description:
      'Built internal tooling dashboards with React and integrated them with a Python Flask backend. Automated CI/CD pipelines using GitHub Actions, reducing deployment time by 60%.',
  },
  {
    title: 'Research Assistant',
    company: 'University Lab — AI & Vision',
    date: 'Sep – Dec 2023',
    description:
      'Assisted in developing a computer vision pipeline for real-time object detection using PyTorch and OpenCV. Published findings in a departmental proceedings paper.',
  },
]

const EDUCATION = [
  {
    title: 'B.Eng. Computer Engineering',
    company: 'University of Technology',
    date: '2021 – 2025',
    description:
      'Major in Computer Engineering with a focus on Systems and Software. Relevant coursework: Algorithms, Operating Systems, Machine Learning, Distributed Systems.',
  },
]

function withShift(items) {
  return items.map((item) => {
    const months = parseDurationMonths(item.date)
    return { ...item, shift: months <= 6 ? 'left' : 'right' }
  })
}

export default function Resume() {
  return (
    <div className="resumePage">
      <h1>RESUME</h1>

      {/* Experience */}
      <h2>Experience</h2>
      <div className="jobContainer">
        <div className="middleLine" aria-hidden="true" />
        {withShift(EXPERIENCE).map((job) => (
          <JobTile key={job.title} {...job} />
        ))}
      </div>

      {/* Education */}
      <h2>Education</h2>
      <div className="jobContainer">
        <div className="middleLine" aria-hidden="true" />
        {withShift(EDUCATION).map((edu) => (
          <JobTile key={edu.title} {...edu} />
        ))}
      </div>

      {/* Download CTA */}
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="pillBtn"
        style={{ marginTop: '40px', padding: '12px 36px', fontSize: '1rem' }}
      >
        Download PDF ↗
      </a>
    </div>
  )
}
