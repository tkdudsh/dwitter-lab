import React from 'react';
import Article from './Article.jsx';
import SkillsTitle from './SkillsTitle.jsx';
import SkillsCoding from './SkillsCoding.jsx';
import SkillsTools from './SkillsTools.jsx';

export default function SkillsContent({skills}) {
    return (
        <div className="skills">
            <Article style="skills-coding">
                <SkillsTitle title="Coding Skills" />                 
                <SkillsCoding list={skills?.coding}/>
            </Article>
            <Article style="skills-tools">
                <SkillsTitle title="Tools" />                 
                <SkillsTools list={skills?.tools} />
            </Article>
            <Article style="skills-etc">
                <SkillsTitle title="Etc" />                 
                <SkillsTools list={skills?.etc} />
            </Article>
        </div>
    );
}

