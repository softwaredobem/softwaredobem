import React from 'react'
import Head from 'next/head'
import matter from 'gray-matter'

import Header from '../components/Header'
import CodeIllustration from '../assets/illustrations/undraw-code.svg'

const Hero = props => {
  return (
    <div className="flex justify-around px-32 items-center pt-12">
      {props.children}
    </div>
  )
}

const Index = ({ projects }) => {
  return (
    <>
      <Head>
        <title>Software do Bem</title>
      </Head>
      <div className="hero-background">
        <Header />
        <Hero>
          <CodeIllustration />
          <p
            className="text-3xl text-white"
            style={{
              maxWidth: '45vw'
            }}
          >
            <span className="font-bold">Software do Bem</span> is an Open Source
            initiative that aims to be a marketplace to be the bridge between
            philanthropic institutions and the volunteers
          </p>
        </Hero>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,128L80,112C160,96,320,64,480,96C640,128,800,224,960,240C1120,256,1280,192,1360,160L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="h-full w-full text-center mt-12">
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
      <div>
        <a href="https://vercel.com/?utm_source=softwaredobem/softwaredobem&utm_campaign=oss">
          Powered by: <img src="/vercel.svg" alt="Vercel" />
        </a>
      </div>
    </>
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
