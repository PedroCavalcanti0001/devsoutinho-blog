import styled from 'styled-components'
import React from 'react';
import Link from "next/link";
import Footer from "../components/Footer";

const SubTitle = styled.h1`
  background-color: var(--primary);
  color: white;
  display: inline-block;
  padding: 5px;
`

export default function Home(props) {
    return (
        <div>
            <header className="headerContainer">
                <img src={props.avatar_url} alt=""/>
                <Link href="/sobre">
                    <a>
                        <h1>DevSoutinho's Blog</h1>
                    </a>
                </Link>
            </header>
            <section className="postsContainer">
                <SubTitle>Posts: </SubTitle>
                <article className="postsContainer__post">
                    <a href="/">
                        Post 1
                    </a>
                    <p>
                        apenas um teste
                    </p>
                </article>
            </section>
            <section className="postsContainer">
                <SubTitle>Repositórios favoritos</SubTitle>
                {
                    props.repos.map((project) => {
                        console.log(project != null);
                        return (
                            <article
                                key={project.repo}
                                className="postsContainer__post">
                                <a href="/">
                                    {project.repo}
                                </a>
                                <p>
                                    {project.description}
                                </p>
                            </article>
                        )
                    })
                }
            </section>

            <Footer></Footer>

        </div>
    )
}


export async function getStaticProps() {
    const gitHubResponse = await fetch("https://api.github.com/users/PedroCavalcanti0001").then(res => res.json())
    const repos = await fetch("https://gh-pinned-repos.egoist.sh/?username=PedroCavalcanti0001").then(res => res.json())

    return {
        props: {
            avatar_url: gitHubResponse.avatar_url,
            repos,
        },

    }
}