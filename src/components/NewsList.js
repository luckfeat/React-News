import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "axios";

const NextListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 2rem auto 0;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const NewsList = ({ category }) => {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const query = category === "all" ? "" : `&category=${category}`;
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=3edbae58b22c415696ae9abb03a9f47e\n`,
                );
                setArticles(response.data.articles);
            } catch (e) {
                console.error(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [category]);

    if (loading) {
        return <NextListBlock>대기 중...</NextListBlock>;
    }

    if (!articles) {
        return null;
    }

    return (
        <NextListBlock>
            {articles.map((article) => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NextListBlock>
    );
};

export default NewsList;
