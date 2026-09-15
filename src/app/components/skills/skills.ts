import { Component } from '@angular/core';
import { Reveal } from '../../directives/reveal';
import { SkillBar } from '../../directives/skill-bar';
import { SectionHeader } from '../section-header/section-header';
import { SKILL_CATEGORIES, SKILLS } from '../../data';

@Component({
  selector: 'app-skills',
  imports: [Reveal, SkillBar, SectionHeader],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  protected readonly categories = SKILL_CATEGORIES;
  protected readonly skills = SKILLS;

  protected readonly categoryIcons: Record<string, string> = {
    Frontend: 'bi-code-square',
    Backend: 'bi-server',
    Database: 'bi-database',
    API: 'bi-link-45deg',
    Design: 'bi-palette',
    Tools: 'bi-tools',
    AI: 'bi-robot',
  };

  protected skillsFor(category: string) {
    return this.skills.filter((s) => s.category === category);
  }
}
