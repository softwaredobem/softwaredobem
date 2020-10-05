import React from 'react'
import Head from 'next/head'
import matter from 'gray-matter'

const Index = ({ projects }) => {
  return (
    <div className="h-full w-full text-center mt-12">
      <Head>
        <title>Software do Bem</title>
      </Head>
      <h1 className="bg-black text-4xl font-bold shadow-lg rounded-md p-12 inline-block">
        <img src="/software-do-bem-logo.png" alt="Sofware do Bem" />
      </h1>
      <h2>Projetos:</h2>
      <ul>
        {projects.map(project => (
          <li key={project.slug}>
            {project.title} {project.logo}
            {project.logo && <img src={project.logo} />}
          </li>
        ))}
      </ul>
    </div>
  )
}
export async function getServerSideProps() {
  const context = require.context('../content/projects', false, /\.md$/)
  const projects = []
  for (const key of context.keys()) {
    const project = key.slice(2)
    const content = await import(`../content/projects/${project}`)
    const meta = matter(content.default)
    projects.push({
      slug: project,
      title: meta.data.name,
      logo: meta.data.logo ? meta.data.logo : ''
    })
  }
  return {
    props: {
      projects
    }
  }
}
export default Index
