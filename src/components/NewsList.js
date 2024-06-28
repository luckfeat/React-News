import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "axios";
import usePromise from "../lib/usePromise";

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
    const [loading, response, error] = usePromise(() => {
        const query = category === "all" ? "" : `&category=${category}`;

        return axios.get(
            `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=3edbae58b22c415696ae9abb03a9f47e\n`,
        );
    }, [category]);

    if (loading) {
        return <NextListBlock>대기 중...</NextListBlock>;
    }

    if (!response) {
        return null;
    }

    if (error) {
        return <NextListBlock>ERROR</NextListBlock>;
    }

    const { articles } = response.data;

    return (
        <NextListBlock>
            {articles.map((article) => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NextListBlock>
    );
};

export default NewsList;
