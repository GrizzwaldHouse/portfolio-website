'use client';

import { motion } from 'framer-motion';
import { skills, skillsByCategory, type Skill } from '@/data/skills';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const categoryLabels: Record<string, string> = {
  language: 'Languages',
  engine: 'Engines',
  framework: 'Frameworks',
  tool: 'Tools',
  concept: 'Concepts',
};

const categoryColors: Record<string, string> = {
  language: 'var(--color-tertiary)',
  engine: 'var(--color-primary)',
  framework: 'var(--color-secondary)',
  tool: 'var(--color-secondary)',
  concept: 'var(--color-primary)',
};

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const width = (skill.proficiency / 5) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="flex items-center gap-3"
    >
      <span className="text-sm text-[var(--color-text-primary)] w-36 shrink-0 truncate">
        {skill.name}
      </span>
      <div className="flex-1 h-2.5 bg-[var(--color-bg-primary)]/60 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${width}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: index * 0.08 + 0.2, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: skill.color }}
        />
      </div>
      <span className="text-xs text-[var(--color-text-secondary)] w-12 text-right shrink-0">
        {skill.yearsUsed}y
      </span>
    </motion.div>
  );
}

function CategoryCard({
  category,
  skills: categorySkills,
  delay,
}: {
  category: string;
  skills: Skill[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay }}
      className="bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm rounded-xl border border-[var(--color-border)] p-6"
    >
      <h3
        className="text-lg font-bold mb-4"
        style={{ color: categoryColors[category] }}
      >
        {categoryLabels[category] || category}
      </h3>
      <div className="space-y-3">
        {categorySkills.map((skill, i) => (
          <SkillBar key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

// Chart data — average proficiency per category
const chartData = Object.entries(skillsByCategory).map(([cat, catSkills]) => ({
  category: categoryLabels[cat] || cat,
  proficiency: Math.round(
    (catSkills.reduce((sum, s) => sum + s.proficiency, 0) / catSkills.length) * 20
  ),
  fill: categoryColors[cat],
}));

// Static fill colors resolved at build time for Recharts
const chartFills: Record<string, string> = {
  Languages: '#3B82F6',
  Engines: '#FFCC00',
  Frameworks: '#D50032',
  Tools: '#D50032',
  Concepts: '#FFCC00',
};

export default function SkillsSection() {
  const categories = Object.keys(skillsByCategory);

  return (
    <section>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent"
      >
        Technical Expertise
      </motion.h2>

      {/* Skill Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {categories.map((cat, i) => (
          <CategoryCard
            key={cat}
            category={cat}
            skills={skillsByCategory[cat]}
            delay={i * 0.1}
          />
        ))}
      </div>

      {/* Recharts Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm rounded-xl border border-[var(--color-border)] p-6"
      >
        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6 text-center">
          Proficiency by Category
        </h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 20, right: 20, top: 0, bottom: 0 }}
          >
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="category"
              width={100}
              tick={{ fill: '#94a3b8', fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f8fafc',
              }}
              formatter={(value) => [`${value}%`, 'Proficiency']}
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            />
            <Bar dataKey="proficiency" radius={[0, 6, 6, 0]} barSize={20}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.category}
                  fill={chartFills[entry.category] || '#FFCC00'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </section>
  );
}
