import React, { useEffect, useState } from 'react';
import HighCharts from 'highcharts';
import ReactHighCharts from 'highcharts-react-official';
import fetchPosts from '../ajaxCalls/fetchPosts';

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const wordCount = [];

    useEffect(() => {
        getPosts();
    },[])

    const getPosts = async () => {
        try {
            const res = await fetchPosts();
            setPosts(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    const getWordCount = () => {
        if(posts){
            const res = posts.map(post => post.content.rendered.match(/\S+/gi));
            res.forEach(r => {
                if(r){
                    wordCount.push(r.length)
                }
            })
        }
    }

    getWordCount();

    const options = {
        chart: {
            type: 'column',
            zoomType: 'xy'
        },
        title: {
            text: 'Posts Word Count',
            style: {
                color: 'blue'
            }
        },
        tooltip: {
            shared: true,
            formatter(){
                return `<strong>Posts: ${this.x}</strong>
                <br /><strong>Words: ${this.y}</strong>`
            }
        },
        yAxis: {
            title: {
                text: 'Words'
            },
        },
        xAxis: {
            title: {
                text: 'Posts'
            },
        },
        credits: {
            enabled: false
        },
        series: [
            {
                name: 'Posts',
                data: wordCount
            }
        ]
    }

    if(loading){
        return <h5 className='text-center'>Loading...</h5>
    }

    return (
        <div className="container">
            <ReactHighCharts options={options} highcharts={HighCharts} />
        </div>
    )
}

export default Posts
